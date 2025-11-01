require("dotenv").config();

module.exports = {
  port: process.env.PORT || 3001,

  // ✅ Đọc đúng biến theo docker-compose
  mongoURI: process.env.MONGO_URI || "mongodb://product-db:27017/product_db",

  // ✅ RabbitMQ trong Docker Compose
  rabbitMQURI: process.env.RABBITMQ_URI || "amqp://rabbitmq:5672",

  // ✅ Cho phép override qua biến môi trường (tùy chọn)
  exchangeName: process.env.RABBITMQ_EXCHANGE || "products",
  queueName: process.env.RABBITMQ_QUEUE || "products_queue",
};
