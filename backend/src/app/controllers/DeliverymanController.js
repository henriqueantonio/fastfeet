import { Op } from 'sequelize';
import Deliveryman from '../models/Deliveryman';
import File from '../models/File';

class DeliverymanController {
  async index(req, res) {
    const { q, id, page = 1 } = req.query;

    // Find filtering name
    if (q) {
      const deliverymen = await Deliveryman.findOne({
        where: { name: { [Op.like]: q } },
      });
      return res.json(deliverymen);
    }

    // Find filtering id
    if (id) {
      const deliverymen = await Deliveryman.findByPk(parseInt(id, 10), {
        include: [
          {
            model: File,
            as: 'avatar',
            attributes: ['url', 'id', 'path'],
          },
        ],
        attributes: ['id', 'name', 'email', 'createdAt', 'avatar_id'],
      });
      // Verifying if deliveryman exists
      if (!deliverymen) {
        return res.status(404).json({ error: 'Deliveryman not find' });
      }
      return res.json(deliverymen);
    }

    // Finding with no filters
    const deliverymen = await Deliveryman.findAndCountAll({
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['url', 'id', 'path'],
        },
      ],
      attributes: ['id', 'name', 'email', 'createdAt', 'avatar_id'],
      limit: 20,
      offset: (page - 1) * 20,
    });

    const totalPages = Math.floor(deliverymen.count / 20) + 1;
    return res.json({ rows: deliverymen.rows, totalPages });
  }

  async store(req, res) {
    const { email } = req.body;

    // Verifying if email exists
    const emailExists = await Deliveryman.findOne({ where: { email } });
    if (emailExists) {
      return res.status(401).json({ error: 'Email already exists' });
    }

    const deliveryman = await Deliveryman.create(req.body);
    return res.json(deliveryman);
  }

  async update(req, res) {
    const deliveryman = await Deliveryman.findByPk(req.params.id);

    // Verifying if deliveryman exists
    if (!deliveryman) {
      return res.status(404).json({ error: 'Deliveryman not find' });
    }

    const { email } = req.body;

    // Updating if email exists in body
    if (email) {
      // Verifying if email exists
      const emailExists = await Deliveryman.findOne({ where: { email } });
      if (emailExists && email !== deliveryman.email) {
        return res.status(401).json({ error: 'Email already exists' });
      }
    }

    await deliveryman.update(req.body);

    return res.json(deliveryman);
  }

  async delete(req, res) {
    const deliveryman = await Deliveryman.findByPk(req.params.id);

    // Verifying if deliveryman exists
    if (!deliveryman) {
      return res.status(404).json({ error: 'Deliveryman not find' });
    }

    await deliveryman.destroy();

    return res.json({ success: 'Deliveryman delted' });
  }
}

export default new DeliverymanController();
