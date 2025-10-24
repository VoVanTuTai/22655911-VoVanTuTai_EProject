# Sử dụng image Node.js 18 làm nền (phiên bản nhẹ)
FROM node:18-alpine

# Cài đặt netcat để kiểm tra port (dùng trong script wait-for-rabbit.sh)
RUN apk add --no-cache netcat-openbsd

# Thiết lập thư mục làm việc bên trong container
WORKDIR /app

# Sao chép file package.json và package-lock.json trước (tăng hiệu quả cache)
COPY package*.json ./

# Cài đặt thư viện Node.js
RUN npm install

# Sao chép toàn bộ mã nguồn vào container
COPY . .

# Thêm script chờ RabbitMQ khởi động
COPY wait-for-rabbit.sh /app/wait-for-rabbit.sh
RUN chmod +x /app/wait-for-rabbit.sh

# Mở cổng ứng dụng
EXPOSE 3002

# Dùng script để đợi RabbitMQ trước khi chạy app
CMD ["sh", "/app/wait-for-rabbit.sh"]
