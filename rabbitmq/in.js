class InboundConsumer {
  constructor(data) {
    this.data = data;
  }

  async process() {
    console.log(`INBOUND: ${this.data.content.toString()}`);
  }
}

module.exports = InboundConsumer;
