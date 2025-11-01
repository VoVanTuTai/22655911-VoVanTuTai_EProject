require('dotenv').config();

module.exports = {
  // ✅ Lấy đúng tên biến từ .env (khớp với docker-compose)
  mongoURI: process.env.MONGO_URI || 'mongodb://order-db:27017/order_db',

  // ✅ Lấy RabbitMQ URI từ biến môi trường
  rabbitMQURI: process.env.RABBITMQ_URI || 'amqp://rabbitmq:5672',

  // ✅ Tên queue vẫn giữ nguyên
  rabbitMQQueue: 'orders',

  port: process.env.PORT || 3002,
};
