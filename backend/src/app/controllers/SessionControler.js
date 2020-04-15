import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth';

import User from '../models/User';

class SessionControler {
  async store(req, res) {
    const { email, password } = req.body;

    // Verifying if user exists
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: 'User not find' });
    }

    // Verifying if password matches
    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const { id, name } = user;

    // Sending user information and token
    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionControler();
