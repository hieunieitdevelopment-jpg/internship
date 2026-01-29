# Node.js Intern Learning Report

---

## 1. Tổng quan Node.js

Node.js là môi trường cho phép chạy JavaScript ở phía server.
Em sử dụng Node.js để xây dựng backend API và xử lý request từ client.

Node.js hoạt động theo mô hình non-blocking I/O, giúp server có thể xử lý nhiều request cùng lúc mà không bị chờ.

Event Loop có nhiệm vụ quản lý và xử lý các tác vụ bất đồng bộ như Promise, setTimeout, I/O.

---

## 2. Module & cấu trúc file

Trong quá trình học, em đã biết cách chia code thành nhiều file theo từng chức năng thay vì viết toàn bộ trong một file.

* Sử dụng `require` / `module.exports`
* Hoặc `import` / `export`

Việc tách file giúp code dễ đọc, dễ bảo trì và thuận tiện khi làm việc nhóm.

---

## 3. Core Modules

Em đã thực hành sử dụng một số core module của Node.js:

* `fs`: đọc và ghi file
* `path`: xử lý đường dẫn an toàn
* `process.env`: sử dụng biến môi trường
* `http`: tạo server Node.js thuần

Thông qua việc thực hành, em hiểu cách Node.js xử lý request và response cơ bản.

---

## 4. Async / Await

Em đã phân biệt được sự khác nhau giữa:

* Callback
* Promise
* Async / Await

Khi xử lý bất đồng bộ, em sử dụng `try/catch` để bắt lỗi.

Ngoài ra, em cũng tìm hiểu và thực hành `Promise.all` để chạy nhiều tác vụ cùng lúc.

Đây là phần em tập trung luyện tập nhiều vì rất quan trọng khi làm backend.

---

## 5. Express.js

Em đã tạo Express application và xây dựng REST API cơ bản gồm:

* GET
* POST
* PUT
* DELETE

Em biết cách sử dụng:

* `req.params`
* `req.query`
* `req.body`

Và trả về HTTP status code phù hợp cho từng trường hợp.

---

## 6. Middleware

Middleware là các hàm được chạy ở giữa request và response.

Em đã hiểu được thứ tự chạy của middleware trong Express.

Một số middleware em đã thực hành:

* Log request
* Kiểm tra đăng nhập (auth middleware)
* Error-handling middleware

---

## 7. Cấu trúc project

Em đã học cách tổ chức project theo mô hình rõ ràng:

* routes
* controllers
* services
* models
* middlewares

Route chỉ dùng để nhận request.
Controller xử lý logic.
Service làm việc với database.

Em không viết SQL hoặc logic database trực tiếp trong route.

---

## 8. Database

Em sử dụng một hệ quản trị cơ sở dữ liệu (MySQL / PostgreSQL / MongoDB).

* Kết nối database bằng biến môi trường
* Thực hiện CRUD cơ bản
* Xử lý lỗi khi thao tác với database

---

## 9. Authentication

Em tìm hiểu luồng xác thực người dùng cơ bản:

* Hash password bằng bcrypt
* Login và tạo JWT
* Middleware kiểm tra token trước khi truy cập API

---

## 10. Environment & Security

Em sử dụng file `.env` để lưu các thông tin quan trọng:

* Database URL
* JWT Secret

Không hardcode các thông tin nhạy cảm trực tiếp trong source code.

---

## 11. Run & Deploy

Project có thể chạy bằng:

* `npm start`
* `node app.js`

Em chạy project trên môi trường Linux (EC2),
biết cách xem log khi xảy ra lỗi
và test API bằng Postman.

---

## 12. Git với Node.js

Trong quá trình làm việc với Node.js, em sử dụng Git để quản lý source code:

* Sử dụng `.gitignore` để loại bỏ `node_modules` và `.env`
* Commit nhỏ, rõ ràng
* Push code lên GitHub để làm việc nhóm

---

**Tổng kết:**

Thông qua quá trình học và thực hành Node.js, em đã nắm được các kiến thức backend cơ bản cần thiết cho vị trí thực tập sinh, đồng thời hiểu được cách tổ chức project và làm việc trong môi trường thực tế.
