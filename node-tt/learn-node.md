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

---

### Hiếu update 

## REST API là gì?
- REST API là quy ước thiết kế API, REST coi mọi thứ trong system là resources và biểu diễn chúng bằng URL(VD: users or users/:id ), URL chỉ đại diện cho resources, còn 
act lên resources quyết định bởi HTTP method 
- REST:
    - GET: use để read data
    - POST: create resources
    - PUT: update resources
    - DELETE: delete resources
- trong trường hợp client call GET /users server hiểu là lấy list user, còn lại sẽ tương đương
- điểm mạnh help thiết kế API rõ ràng nhất quán và dễ đoán, frontend chỉ cần nhìn method và URL là hiểu nghiệp vụ, backend dễ bảo trì và mở rộng khi hệ thống lớn dần.

## req.params, req.query, req.body
- req.params dùng để identify chính xác resources mà client muốn operation, data nằm trong URL và thường bắt buộc
    - vd: GET /users/5 thì 5 ở đây chỉ dùng đẻ chỉ ra user cụ thể đang truy cập, trường hợp không có params thì server không biết ddag wolk với object nào
- req.query dùng cho điều kiện phụ, không làm thay đổi bản chất của resources. Nó thường phục vụ việc lọc, search, sắp xếp hoặc phân trang.
    - vd: ví dụ GET /users?role=admin&page=1. Dù có hay không có query, resources vẫn là users, chỉ khác cách hiển thị kết quả.
- req.body dùng để gửi data để server handle hoặc lưu trữ. Đây là nơi chứa thông tin chính khi create hoặc update resources
    - ví dụ khi POST /users, data như tên hay tuổi được đặt trong body vì chúng không phù hợp để đưa lên URL và thường có cấu trúc phức tạp.

## Vì sao cần Auth?

# ENV – CONFIG – SECURITY
## .env là gì?
- là file dùng để lưu cấu hình và thông tin nhạy cảm , tách ra khỏi code , nhưng code thì dùng chung, vè phần cấu hình tùy môi trường 

## Vì sao không hardcode secret?
- Không hardcode secret vì code có thể bị lộ, nhưng secret thì không được phép lộ.
Khi ghi thẳng secret trong code, chỉ cần push repo hoặc share file là toàn bộ hệ thống mất an toàn, và cũng không thể đổi secret theo môi trường khi deploy.


## Config theo môi trường
- Config theo environment là cách để cùng một code run đúng ở nhiều nơi khác nhau, mỗi environment dùng DB, secret và mức log riêng, nhưng không cần sửa code

## NODE_ENV là gì?
- NODE_ENV là biến environment cho ứng dụng node.js đang run trên environment, cùng một code nhưng dev thì debug nhiều, prod thì tối ưu và bảo mật hơn.
