import DeliveryProblem from '../models/DeliveryProblem';
import Delivery from '../models/Delivery';
import Deliveryman from '../models/Deliveryman';
import Queue from '../../lib/Queue';
import DeliveryCancellationMail from '../jobs/DeliveryCancellationMail';

class DeliveryProblemController {
  async get(req, res) {
    const { delivery_id } = req.params;
    // Finding delivery problem of a delivery
    const deliveryProblem = await DeliveryProblem.findAll({
      where: { delivery_id },
      attributes: ['id', 'description', 'updated_at'],
    });

    return res.json(deliveryProblem);
  }

  async index(req, res) {
    const { page = 1 } = req.query;

    // Finding delivery problem of a delivery
    const deliveryProblem = await DeliveryProblem.findAndCountAll({
      attributes: ['id', 'description', 'updated_at'],
      limit: 20,
      offset: (page - 1) * 20,
    });

    const totalPages = Math.floor(deliveryProblem.count / 20) + 1;
    return res.json({ rows: deliveryProblem.rows, totalPages });
  }

  async store(req, res) {
    const { delivery_id } = req.params;

    // Verifying if delivery exits
    const delivery = await Delivery.findByPk(delivery_id);
    if (!delivery) {
      return res.status(404).json({ error: 'Delivery not find' });
    }

    const { description } = req.body;
    const deliveryProblem = await DeliveryProblem.create({
      delivery_id,
      description,
    });

    return res.json(deliveryProblem);
  }

  async delete(req, res) {
    const { problem_id } = req.params;
    // Finding in database the delivery problem
    const deliveryProblem = await DeliveryProblem.findByPk(problem_id, {
      attributes: ['id', 'description', 'delivery_id'],
      include: [
        {
          model: Delivery,
          as: 'delivery',
          attributes: ['id', 'product', 'deliveryman_id'],
          include: [
            {
              model: Deliveryman,
              as: 'deliveryman',
              attributes: ['id', 'name', 'email'],
            },
          ],
        },
      ],
    });

    // Checking if deliveryproblem exists
    if (!deliveryProblem) {
      return res.status(404).json({ error: 'Delivery problem not find' });
    }

    const { delivery, description } = deliveryProblem;

    // Send e-mail
    await Queue.add(DeliveryCancellationMail.key, {
      description,
      delivery,
    });

    // updating delivery canceled_at
    delivery.canceled_at = new Date();
    await delivery.save();

    await deliveryProblem.destroy();

    return res.json(deliveryProblem);
  }
}

export default new DeliveryProblemController();
