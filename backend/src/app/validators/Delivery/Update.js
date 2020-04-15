import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      recipient_id: Yup.number(),
      deliveryman_id: Yup.number(),
      signature_id: Yup.number(),
      product: Yup.string(),
      canceled_at: Yup.bool(),
      start_date: Yup.bool(),
      end_date: Yup.bool(),
    });

    await schema.validate(req.body, { abortEarly: false });
    return next();
  } catch (err) {
    return res.status(400).json({ error: 'Validations fail' });
  }
};
