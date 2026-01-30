# Node.js Intern Learning Report

## Môi trường
- Server: AWS EC2
- OS: Amazon Linux 2023
- Runtime: Node.js
- Tool: npm, Express.js

## Express.js

- Khởi tạo project Node.js bằng npm.
- Tạo file app.js để chạy Express server.
- Sử dụng express.json() để parse request body.
- Tạo API test để kiểm tra server hoạt động.

## Middleware

- Tạo middleware để log request (method, url).
- Áp dụng middleware toàn cục trong app.js.
- Hiểu vai trò và thứ tự chạy của middleware.

## Project Structure

- Tổ chức source code theo mô hình:
  - routes
  - controllers
  - services
  - middlewares
  - models
- Route chỉ điều hướng request, không xử lý logic trực tiếp.

## Database

- Tạo model để mô tả cấu trúc dữ liệu người dùng.
- Hiểu vai trò của model/schema trong backend.
- Chưa kết nối database thật, tập trung vào luồng xử lý.

## Authentication cơ bản

- Tìm hiểu luồng đăng nhập (login).
- Tạo auth controller và auth middleware.
- Middleware dùng để kiểm tra token trước khi truy cập API.

## Environment & Security

- Sử dụng file .env để lưu biến môi trường.
- Không hardcode các thông tin nhạy cảm.
- Tạo file .env.example để mô tả cấu hình cho project.
