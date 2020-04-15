import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      start_date: Yup.string(),
      end_date: Yup.string(),
      signature_id: Yup.number().when(
        'end_date',
        (end_date, field) => (end_date ? field.required() : field) // Search how to trow an error here
      ),
    });

    await schema.validate(req.body, { abortEarly: false });
    return next();
  } catch (err) {
    return res.status(400).json({ error: 'Validations fail' });
  }
};
