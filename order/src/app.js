const express = require("express");
const mongoose = require("mongoose");
const Order = require("./models/order");
const amqp = require("amqplib");
const config = require("./config");

class App {
  constructor() {
    this.app = express();
    this.channel = null;
    this.connection = null;
  }

  async connectDB() {
    try {
      console.log("🔗 Connecting to MongoDB:", config.mongoURI);
      await mongoose.connect(config.mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("✅ MongoDB connected");
    } catch (err) {
      console.error("❌ MongoDB connection error:", err.message);
      process.exit(1);
    }
  }

  async setupRabbitMQ() {
    const maxRetries = 10;
    let retries = 0;

    while (retries < maxRetries) {
      try {
        console.log(`🔗 Connecting to RabbitMQ: ${config.rabbitMQURI}`);
        this.connection = await amqp.connect(config.rabbitMQURI);
        this.channel = await this.connection.createChannel();
        await this.channel.assertQueue(config.rabbitMQQueue);
        console.log("✅ Connected to RabbitMQ");
        return;
      } catch (err) {
        retries++;
        console.warn(
          `⚠️ Failed to connect to RabbitMQ (${retries}/${maxRetries}): ${err.message}`
        );
        await new Promise((res) => setTimeout(res, 5000)); // chờ 5s rồi thử lại
      }
    }

    console.error("❌ RabbitMQ connection failed after retries. Exiting...");
    process.exit(1);
  }

  async setupOrderConsumer() {
    await this.channel.consume(config.rabbitMQQueue, async (data) => {
      try {
        console.log("📦 Received order message");

        const { products, username, orderId } = JSON.parse(data.content);
        const newOrder = new Order({
          products,
          user: username,
          totalPrice: products.reduce((acc, p) => acc + p.price, 0),
        });

        await newOrder.save();
        this.channel.ack(data);

        console.log(`✅ Order ${orderId || newOrder._id} saved, sending to products queue`);

        const payload = {
          orderId: orderId || newOrder._id,
          user: newOrder.user,
          products: newOrder.products,
          totalPrice: newOrder.totalPrice,
        };

        this.channel.sendToQueue("products", Buffer.from(JSON.stringify(payload)));
      } catch (err) {
        console.error("❌ Error processing order:", err.message);
      }
    });
  }

  async start() {
    await this.connectDB();
    await this.setupRabbitMQ();
    await this.setupOrderConsumer();

    this.server = this.app.listen(config.port, () =>
      console.log(`🚀 Order service running on port ${config.port}`)
    );
  }

  async stop() {
    await mongoose.disconnect();
    if (this.connection) await this.connection.close();
    if (this.channel) await this.channel.close();
    this.server.close();
    console.log("🛑 Order service stopped");
  }
}

module.exports = App;
