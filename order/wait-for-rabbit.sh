#!/bin/sh
echo "⏳ Waiting for RabbitMQ to be ready at rabbitmq:5672..."

while ! nc -z rabbitmq 5672; do
  sleep 2
done

echo "✅ RabbitMQ is ready, starting Order service..."
node index.js
