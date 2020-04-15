import { isAfter, isBefore } from 'date-fns';
import Delivery from '../models/Delivery';
import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipient';
import File from '../models/File';
import Queue from '../../lib/Queue';
import DeliveryCreationMail from '../jobs/DeliveryCreationMail';
import Cache from '../../lib/Cache';

class DeliveryController {
  async index(req, res) {
    const { page = 1 } = req.query;

    // Finding all Delivermen with File, Recipient with file too
    const deliveries = await Delivery.findAndCountAll({
      include: [
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['name', 'avatar_id'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'url', 'path'],
            },
          ],
        },
        {
          model: Recipient,
          as: 'recipient',
          attributes: ['name', 'state', 'city', 'street', 'number', 'cep'],
        },
        {
          model: File,
          as: 'signature',
          attributes: ['id', 'url', 'path'],
        },
      ],
      limit: 20,
      offset: (page - 1) * 20,
    });

    const totalPages = Math.floor(deliveries.count / 20) + 1;
    return res.json({ rows: deliveries.rows, totalPages });
  }

  async store(req, res) {
    const { product, deliveryman_id, recipient_id } = req.body;

    const deliveryman = await Deliveryman.findByPk(deliveryman_id);
    const recipient = await Recipient.findByPk(recipient_id);

    // Verifying if deliveryman or recipient not exits
    if (!(deliveryman || recipient)) {
      return res
        .status(404)
        .json({ error: 'Deliveryman or recipient not exists' });
    }

    const { id } = await Delivery.create(req.body);

    // Send e-mail
    await Queue.add(DeliveryCreationMail.key, {
      deliveryman,
      recipient,
      product,
    });

    // Invalidate Deliveries cache
    await Cache.invalidate('deliveries');
    return res.json({ id, recipient_id, deliveryman_id, product });
  }

  async update(req, res) {
    const { id } = req.params;

    const delivery = await Delivery.findByPk(id);

    // Verifying if delivery exists
    if (!delivery) {
      return res.status(404).json({ error: 'Delivery not find' });
    }

    // Start date only permitted -> 08:00 - 18:00
    const { start_date, canceled_at, end_date } = req.body;
    // To things if start_date are in the body
    if (start_date) {
      const initial_hour = new Date().setHours(6, 0, 0, 0);
      const final_hour = new Date().setHours(18, 0, 0, 0);
      // Verifyng if the start_date is between 8:00 and 18:00
      if (
        !(isBefore(new Date(), final_hour) && isAfter(new Date(), initial_hour))
      ) {
        return res.status(401).json({
          error:
            "You can't update the start_date because you are not between 08:00 and 18:00",
        });
      }
    }

    if (start_date) {
      req.body = { ...req.body, start_date: new Date() };
    }

    if (end_date) {
      req.body = { ...req.body, end_date: new Date() };
    }

    if (canceled_at) {
      req.body = { ...req.body, canceled_at: new Date() };
    }

    await delivery.update(req.body);
    return res.json(delivery);
  }

  async delete(req, res) {
    const { id } = req.params;
    const delivery = await Delivery.findByPk(id);

    // Verifying if delivery exists
    if (!delivery) {
      return res.status(404).json({ error: 'Delivery not find' });
    }

    await delivery.destroy();

    // Remove deliveries cache
    await Cache.invalidate('deliveries');
    return res.json({ success: 'Delivery deleted' });
  }
}

export default new DeliveryController();
