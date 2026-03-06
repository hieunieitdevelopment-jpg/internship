# HỆ THỐNG TRA CỨU ĐỊA CHỈ HÀNH CHÍNH

## Problem

- Hiện nay theo Nghị quyết 60, Việt Nam đang thực hiện việc sáp nhập các đơn vị hành chính, số lượng tỉnh thành giảm từ 63 xuống còn 34.

    - Điều này dẫn đến nhiều thay đổi như:

    - Nhiều xã/phường bị đổi tên

    - Một số đơn vị bị sáp nhập

    - Một số đơn vị bị tách ra

- Hệ quả: 
    - vd: người dân cần biết địa chỉ đã thay đổi khi làm giấy tờ pháp lý, hay muốn mua đồ trên các trang thương mại điện tử họ cần cập nhật lại địa chỉ hiện tại, hay cần chỉnh sửa lại địa chỉ trên giấy tờ , cần đăng ký kinh doanh 

--> vì vậy chúng em muốn xây dựng một hệ thống tra cứu và chuyển đổi địa chỉ hành chính.


## Objective
- Project của nhóm em được xây dựng với mục tiêu:
    - 1. Tra cứu địa chỉ cũ → địa chỉ mới
    - 2. Tra cứu địa chỉ mới → địa chỉ cũ
    - 3. Hiển thị lịch sử thay đổi hành chính
    - 4. Cung cấp REST API để các hệ thống khác tích hợp


## Solution

Để giải quyết vấn đề này, nhóm em xây dựng một web application kết hợp với REST API cho phép người dùng tra cứu và chuyển đổi địa chỉ hành chính.

- Hệ thống hỗ trợ:
    - 1. Người dùng nhập địa chỉ cũ
        → hệ thống trả về địa chỉ mới tương ứng
    - 2. Tìm kiếm đơn vị hành chính
    - 3. Xem lịch sử thay đổi
    - 4. Cho phép các hệ thống khác gọi API

## System Architecture

User ->  Frontend (Web UI)  ->  Backend API ->  Database

- Về phần Frontend:
    - Giao diện web cho người dùng
    - Cho phép nhập địa chỉ
    - Hiển thị kết quả tra cứu
    - Cho phép người dùn xem lịch sử thay đổi
    - cung cấp bản đồ để nhìn trực quan hơn khi đã thay đổi 

- Về phần backend:
    - Cung cấp REST API
    - Xử lý logic chuyển đổi địa chỉ
    - Truy vấn dữ liệu

- Database:
    - Lưu trữ:
        - đơn vị hành chính
        - lịch sử thay đổi
        - mapping địa chỉ

---

## Tech Stack

- Về công nghệ, nhóm em lựa chọn các công nghệ phổ biến trong phát triển web hiện nay để đảm bảo hệ thống dễ mở rộng và dễ bảo trì.

### Backend
- Backend được xây dựng bằng:
    - Node.js với NestJS để phát triển REST API.
    - Prisma ORM để làm việc với database một cách type-safe và dễ quản lý dữ liệu.
- NestJS được lựa chọn vì:
    - cấu trúc project rõ ràng
    - dễ mở rộng
    - phù hợp với các hệ thống backend lớn.
Server có thể được triển khai trên các môi trường như Deno Deploy hoặc cloud server.


### Frontend
- Frontend được xây dựng bằng:
    - ReactJS với TypeScript để phát triển giao diện người dùng.
    - Zustand hoặc Redux được sử dụng để quản lý state của ứng dụng.
    - Normalize.css giúp đảm bảo giao diện hiển thị nhất quán trên các trình duyệt khác nhau.
- Frontend sẽ được deploy trên các nền tảng hosting như Vercel.


### Database
- Hệ thống sử dụng:
    - PostgreSQL làm database chính để lưu trữ dữ liệu.
- PostgreSQL phù hợp với hệ thống này vì:
    - hỗ trợ dữ liệu quan hệ phức tạp
    - hiệu năng tốt
    - khả năng mở rộng cao.
- Việc truy cập database được thực hiện thông qua Prisma ORM.
- Database có thể được triển khai trên các nền tảng như:
    - Deno Deploy


### DevOps & Deployment

Để đảm bảo hệ thống dễ triển khai và quản lý, nhóm em sử dụng các công cụ DevOps cơ bản.

- Docker
    - Hệ thống được container hóa bằng:
        - Docker
        - Docker Compose
    - Docker giúp:
        - chuẩn hóa môi trường development và production
        - đảm bảo code chạy giống nhau trên mọi môi trường.
- Toàn bộ ứng dụng sẽ được build và chạy trong Docker container.

### CI/CD

Hệ thống sử dụng GitHub Actions để xây dựng pipeline CI/CD.

- Pipeline sẽ thực hiện:
    - build code
    - chạy test
    - kiểm tra chất lượng code
- Sau đó hệ thống sẽ:
    - tự động deploy lên môi trường development
    - tự động deploy production khi merge vào main branch

---

## Testing

- Để đảm bảo chất lượng code, project sử dụng:
    - Jest cho unit testing và integration testing.
- Việc test giúp:
    - phát hiện lỗi sớm
    - đảm bảo hệ thống hoạt động đúng khi thay đổi code.

---

## Design & UI/UX

Trong giai đoạn thiết kế hệ thống, nhóm em sử dụng các công cụ sau:

- UI/UX Design
    - Excalidraw để sketch ý tưởng giao diện ban đầu.
    - Figma để thiết kế UI chi tiết.

### System Design

- Các sơ đồ kiến trúc và flow hệ thống được vẽ bằng:
    - draw.io
    - Excalidraw
- Những công cụ này giúp team dễ dàng trao đổi ý tưởng và thống nhất thiết kế hệ thống.

---

## Repository & Source Control

Source code của project được quản lý trên GitHub.

### Branching Strategy
- Nhóm em có thể sử dụng một trong hai chiến lược:
    - Gitflow
    - Trunk-based development

### Code Review
- Mọi thay đổi code đều phải thông qua:
    - Pull Request
    - Code Review
- Quá trình review có thể sử dụng thêm các công cụ như:
    - SonarQube để kiểm tra chất lượng code.
- Điều này giúp đảm bảo code đạt chất lượng tốt trước khi merge.

---

## API Design & Documentation
Hệ thống API được thiết kế theo chuẩn RESTful API.

- Các nguyên tắc chính:
    - resource-based URL
    - sử dụng HTTP method chuẩn (GET, POST, PUT, DELETE)
    - chuẩn hóa response format.
- Để hỗ trợ developer dễ sử dụng API, hệ thống sử dụng:
    - OpenAPI Specification
    - Swagger
- để tự động tạo tài liệu API.

---

## Security
Mục tiêu của phần Security là đảm bảo hệ thống an toàn, kiểm soát quyền truy cập và bảo vệ dữ liệu người dùng.
### Authentication
- Hệ thống sử dụng JWT (JSON Web Token) để xác thực người dùng.
    - Khi người dùng đăng nhập, hệ thống sẽ tạo JWT token.
    - Token này sẽ được gửi kèm trong các request để xác thực quyền truy cập.

- JWT giúp:
    - Xác thực người dùng
    - Bảo vệ API
    - Giảm tải cho server (stateless authentication)

### Access Control
Có 2 loại người dùng chính:
- Public User:
    Không cần đăng nhập vẫn có thể sử dụng các chức năng chính của hệ thống.
    - Quyền:
        - Tra cứu địa chỉ cũ → địa chỉ mới
        - Xem thông tin đơn vị hành chính
        - Xem lịch sử thay đổi

- Admin:
    Admin có quyền quản trị hệ thống và quản lý dữ liệu.
    - Quyền:
        - Quản lý người dùng
        - Import dữ liệu hành chính
        - Chỉnh sửa dữ liệu hệ thống
        - Theo dõi logs

---

## AI Support
Ngoài các chức năng chính, hệ thống có thể tích hợp AI để cải thiện trải nghiệm người dùng.

- Ví dụ:
    - AI chatbot hỗ trợ tra cứu địa chỉ
    - Smart search giúp tìm kiếm nhanh hơn
    - Auto generate content
    - hỗ trợ phản hồi nhanh với các từ khóa đơn giản từ người dùng.
- AI cũng có thể hỗ trợ trong quá trình phát triển thông qua các công cụ như GitHub Copilot để hỗ trợ code review và tăng tốc độ phát triển.

---

## Integration
- Hệ thống có thể tích hợp thêm:
    - Google Maps API
- để hiển thị vị trí địa lý hoặc hỗ trợ lập kế hoạch địa chỉ.

---

## Development Process

Để quản lý quá trình phát triển phần mềm một cách hiệu quả, nhóm áp dụng Agile methodology và sử dụng Jira để quản lý công việc và theo dõi tiến độ dự án.

### Agile Methodology

Nhóm áp dụng phương pháp Agile để phát triển hệ thống theo từng giai đoạn nhỏ.
- Đặc điểm:
    - Chia dự án thành các Sprint ngắn (1–2 tuần)
    - Mỗi Sprint sẽ hoàn thành một số feature cụ thể
    - Sau mỗi Sprint sẽ có review và cải thiện hệ thống
- Agile giúp:
    - Phát triển nhanh
    - Dễ dàng thay đổi khi có yêu cầu mới
    - Nhận phản hồi sớm từ mentor

### Task Management
Nhóm sử dụng Jira để quản lý tất cả công việc trong dự án.

- Các loại công việc trong Jira gồm:
    - Epic – Nhóm chức năng lớn
    - Story – Một tính năng cụ thể
    - Task – Công việc cần thực hiện
    - Bug – Lỗi cần sửa


