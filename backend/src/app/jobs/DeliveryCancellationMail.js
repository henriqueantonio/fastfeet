import Mail from '../../lib/Mail';

class DeliveryCancellationMail {
  get key() {
    return 'DeliveryCancellationMail';
  }

  async handle({ data }) {
    const { description, delivery } = data;
    await Mail.sendMail({
      to: `${delivery.deliveryman.name} <${delivery.deliveryman.email}>`,
      subject: 'Entrega cancelada',
      template: 'delivery_cancellation',
      context: {
        deliveryman: delivery.deliveryman.name,
        description,
        product_name: delivery.product,
        delivery_id: delivery.id,
      },
    });
  }
}

export default new DeliveryCancellationMail();
