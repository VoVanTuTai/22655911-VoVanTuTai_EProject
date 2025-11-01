Hệ thống mô phỏng quy trình đặt hàng E-commerce bằng kiến trúc Microservices (gồm Auth, Product, Order) với API Gateway làm cổng định tuyến, sử dụng RabbitMQ để giao tiếp bất đồng bộ (Publisher-Subscriber) giữa Product và Order Service, đồng thời mỗi dịch vụ duy trì Database riêng biệt.
Data in MongoCompass
Hiển thị bằng cách ánh xạ cổng từ docker ra ngoài
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/4910f24a-830b-4f60-b032-466dad471bb7" />
Đăng ký thành công
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/77e226ad-c1cd-4d59-ade7-0c70ef1a705e" />
Đăng ký trùng
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/a755bfcb-03a7-492b-a6eb-9c04852e983e" />
Đăng ký thiếu thông tin
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/34755a1a-51cd-4c28-a197-8a67e3c7396b" />
Đăng nhập thành công
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/98632799-3dbd-4256-b19d-f1412f1ebea4" />
Đăng nhập sai
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/85d42199-1eee-4361-aff6-0a6023d68d2f" />
Xem Product (Chưa có dữ liệu trả về danh sách rỗng '[]')
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/d7b8f885-6c09-4989-9a26-f5dda50410e6" />
Thêm Product 
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/11edcafb-ed5a-41f6-8a09-ef4ad5e6aec4" />
Xem danh sách product sau khi thêm vài cái Product
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/806026ee-54a4-41fe-b31b-7aa07bc21f8f" />
Đặt hàng Order
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/76c61097-9c66-449e-ac34-086833ef59bf" />
Dữ liệu được ánh xạ ra ngoài mongoCompass
Service Auth
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/6c6830e1-9da9-429c-985f-3b2fb7896fb3" />
Service Product
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/823c4e12-0b31-4a81-8eed-2c4c29015001" />
Service Order
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/cec57335-4f08-4dbe-aa1e-6f5eea9466a3" />
Github Actions
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/78b8cdbe-5c26-420d-9cfc-fe3141a59974" />










