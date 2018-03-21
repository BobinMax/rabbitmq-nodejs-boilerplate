class OutboundConsumer {
  constructor(data) {
    this.data = data;
  }
  async process() {
    console.log(`OUTBOUND: ${this.data.content.toString()}`);
  }
}
module.exports = OutboundConsumer;
