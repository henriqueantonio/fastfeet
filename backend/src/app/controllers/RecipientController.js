import { Op } from 'sequelize';
import Recipient from '../models/Recipient';

class RecipientController {
  async index(req, res) {
    const { q, page = 1 } = req.query;
    // Filtiring recipient by name
    if (q) {
      const recipients = await Recipient.findAll({
        where: { name: { [Op.like]: q } },
      });
      return res.json(recipients);
    }

    const recipients = await Recipient.findAndCountAll({
      limit: 20,
      offset: (page - 1) * 20,
    });
    const totalPages = Math.floor(recipients.count / 20) + 1;
    return res.json({ rows: recipients.rows, totalPages });
  }

  async store(req, res) {
    const recipient = await Recipient.create(req.body);

    return res.json(recipient);
  }

  async update(req, res) {
    const { id } = req.params;

    const recipient = await Recipient.findByPk(id);
    await recipient.update(req.body);
    return res.json(recipient);
  }

  async destroy(req, res) {
    const { id } = req.params;
    const recipient = await Recipient.findByPk(id);

    await recipient.destroy();

    return res.json({ success: 'Recipient deleted' });
  }
}

export default new RecipientController();
