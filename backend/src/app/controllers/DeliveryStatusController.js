import { Op } from 'sequelize';
import { isAfter, isBefore } from 'date-fns';
import Delivery from '../models/Delivery';
import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipient';
import Cache from '../../lib/Cache';

class DeliveryStatusController {
  async index(req, res) {
    const { deliveryman_id } = req.params;
    const { delivered, q, page = 1 } = req.query;

    // Verifying if deliveryman exists
    const deliverymanExists = await Deliveryman.findByPk(deliveryman_id);
    if (!deliverymanExists) {
      return res.status(404).json({ error: 'Deliveryman not find' });
    }

    // If Q paramter exists
    if (q) {
      const deliveries = await Delivery.findAll({
        where: { deliveryman_id, product: { [Op.like]: q } },
        attributes: ['id', 'product', 'start_date', 'recipient_id'],
      });
      return res.json(deliveries);
    }

    // Delivered exists in query params
    if (delivered === 'true') {
      const deliveries = await Delivery.findAndCountAll({
        where: {
          deliveryman_id,
          canceled_at: { [Op.is]: null },
          end_date: { [Op.not]: null },
        },
        limit: 20,
        offset: (page - 1) * 20,
        attributes: [
          'id',
          'product',
          'start_date',
          'end_date',
          'recipient_id',
          'createdAt',
        ],
        include: [
          {
            model: Recipient,
            as: 'recipient',
            attributes: [
              'id',
              'name',
              'street',
              'number',
              'state',
              'city',
              'cep',
            ],
          },
        ],
      });
      return res.json(deliveries);
    }

    // query to find all deliveries where are not canceled and the end_date is null
    const deliveries = await Delivery.findAndCountAll({
      where: {
        deliveryman_id,
        end_date: { [Op.is]: null },
        canceled_at: { [Op.is]: null },
      },
      limit: 20,
      offset: (page - 1) * 20,
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'id',
            'name',
            'street',
            'number',
            'state',
            'city',
            'cep',
          ],
        },
      ],
    });

    return res.json(deliveries);
  }

  async update(req, res) {
    const { id } = req.params;
    const delivery = await Delivery.findByPk(id, {
      attributes: [
        'id',
        'product',
        'canceled_at',
        'start_date',
        'end_date',
        'recipient_id',
        'deliveryman_id',
        'signature_id',
      ],
    });

    // Verifying if delivery exits
    if (!delivery) {
      return res.status(404).json({ error: 'Delivery not find' });
    }

    const { start_date, signature_id } = req.body;

    if (start_date) {
      // Check if deliveryman already made 5 deliveries
      const maxDeliverys = await Delivery.findAndCountAll({
        where: {
          start_date: { [Op.not]: null },
          created_at: {
            [Op.gt]: new Date().setHours(0, 0, 0, 0),
            [Op.lt]: new Date().setHours(23, 59, 59, 59),
          },
        },
      });
      if (maxDeliverys.count >= 5) {
        return res
          .status(401)
          .json({ error: "You can't start more than 5 deliveries per day" });
      }
      // Check Start date only permitted -> 08:00 - 18:00
      const initial_hour = new Date().setHours(6, 0, 0, 0);
      const final_hour = new Date().setHours(18, 0, 0, 0);
      const now = new Date();

      if (!(isBefore(now, final_hour) && isAfter(now, initial_hour))) {
        return res.status(401).json({
          error:
            "You can't update the start_date because you are not between 08:00 and 18:00",
        });
      }
    }

    // If the dates exists set new Date() to avoid deliveryman change the time
    await delivery.update({
      start_date: start_date ? new Date() : null,
      end_date: signature_id ? new Date() : null,
      signature_id: signature_id || null,
    });

    // Remove deliveryman cache
    await Cache.invalidate(`deliveryman:${delivery.deliveryman_id}:deliveries`);

    return res.json(delivery);
  }
}

export default new DeliveryStatusController();
