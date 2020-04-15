import Mail from '../../lib/Mail';

class DeliveryCreationMail {
  get key() {
    return 'DeliveryCreationMail';
  }

  async handle({ data }) {
    const { deliveryman, recipient, product } = data;
    await Mail.sendMail({
      to: `${deliveryman.name} <${deliveryman.email}>`,
      subject: 'Uma entrega pra você!',
      template: 'delivery_creation',
      context: {
        deliveryman_name: deliveryman.name,
        recipient,
        product,
      },
    });
  }
}

export default new DeliveryCreationMail();
