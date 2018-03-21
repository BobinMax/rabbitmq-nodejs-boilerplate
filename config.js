module.exports = {
  rabbitmq: {
    schema: 'amqp://',
    host: 'rabbitmq',
    port: '5672',
    exchangeName: 'email_messages',
    exchangeType: 'direct',
    inboundQueueName: 'inbound',
    outboundQueueName: 'outbound',
    durable: true,
    autoDelete: false,
    noAck: true,
    messageExpTime: 3600,
    user: 'guest',
    pass: 'guest',
  },
};
