const express = require('express');
const config = require('./config.js');
const RabbitMQ = require('./rabbitmq');

const rabbitmq = new RabbitMQ();

const {
  exchangeName,
  inboundQueueName,
  outboundQueueName,
} = config.rabbitmq;

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/', (req, res) => {
  res.send('Hello world\n');
});

app.get('/publish/inbound', async (req, res) => {
  await rabbitmq.channel.publish(
    exchangeName,
    inboundQueueName,
    Buffer.from(JSON.stringify({ test: 'inbound', query: req.query })),
    { deliveryMode: 2 },
  );
  res.send('Publish inbound is OK\n');
});

app.get('/publish/outbound', async (req, res) => {
  await rabbitmq.channel.publish(
    exchangeName,
    outboundQueueName,
    Buffer.from(JSON.stringify({ test: outboundQueueName, query: req.query })),
    { deliveryMode: 2 },
  );
  res.send('Publish inbound is OK\n');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
