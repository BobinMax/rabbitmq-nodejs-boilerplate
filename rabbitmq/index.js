const amqp = require('amqplib');
const config = require('../config.js');

const InboundConsumer = require('./in');
const OutboundConsumer = require('./out');

const {
  schema,
  host,
  port,
  exchangeName,
  exchangeType,
  inboundQueueName,
  outboundQueueName,
  durable,
  autoDelete,
  noAck,
  user,
  pass,
} = config.rabbitmq;

class RabbitMQ {
  constructor() {
    this.initialize();
  }

  async initialize() {
    try {
      const url = `${schema}${user}:${pass}@${host}:${port}`;
      this.conn = await amqp.connect(url);
      this.channel = await this.conn.createChannel();
      const inboundConsumer = d => (new InboundConsumer(d)).process();
      const outboundConsumer = d => (new OutboundConsumer(d)).process();

      await Promise.all([
        this.channel.assertExchange(exchangeName, exchangeType, { durable }),
        this.channel.assertQueue(inboundQueueName, { durable, autoDelete }),
        this.channel.assertQueue(outboundQueueName, { durable, autoDelete }),
      ]);

      await Promise.all([
        this.channel.bindQueue(inboundQueueName, exchangeName, inboundQueueName),
        this.channel.bindQueue(outboundQueueName, exchangeName, outboundQueueName),
        this.channel.consume(inboundQueueName, inboundConsumer, { noAck }),
        this.channel.consume(outboundQueueName, outboundConsumer, { noAck }),
      ]);
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = RabbitMQ;
