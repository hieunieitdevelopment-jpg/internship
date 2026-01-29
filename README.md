# Internship Training 


---

## Giai đoạn 1 – Làm quen môi trường Linux

### Nội dung đã thực hành

* Cài đặt và sử dụng Linux theo recommendation của mentor
* Làm việc trực tiếp trên Linux server thông qua SSH
* Hiểu sự khác nhau giữa:

  * Điều khiển server từ xa
  * Sử dụng Linux làm môi trường làm việc chính

### Linux Command Line

**Lệnh cơ bản:**

* `ls`, `cd`, `pwd`, `mkdir`, `rm`
* `cp`, `mv`, `cat`, `nano`, `vim`

**Lệnh nâng cao:**

* `echo`, `find`, `grep`
* `awk`, `sed`
* `ip addr`, `ping`, `ssh`

### Quản lý user & group

* `sudo`
* `chmod`
* `chown`

### Permissions

* Hiểu mô hình quyền:

  * owner
  * group
  * others
* Hiểu permission dạng octal (rwx)

**Thực hành:**

* Tạo file chỉ đọc (read-only)
* Phân quyền cho thư mục
* Phân quyền user & group

### Kết quả

* Sử dụng Linux command line thành thạo hơn
* Hiểu cơ chế phân quyền trong môi trường server
* Có thể tự debug các lỗi permission cơ bản

---

## Giai đoạn 2 – Docker căn bản

### Nội dung tìm hiểu

* Bản chất Docker trên Linux:

  * Namespace
  * Cgroup

* Phân biệt:

  * Image
  * Container

* Logging trong container

* Restart policy

* Data persistence

### Kết quả

* Hiểu cách Docker hoạt động trên hệ điều hành Linux
* Nắm được kiến thức nền để phục vụ cho backend sau này

---

## Giai đoạn 3 – Git & Gitflow

### Nội dung đã thực hành

* Cài đặt Git trên Linux
* Cấu hình `user.name` và `user.email`

### Git cơ bản

* Init repository
* Clone / Fork
* Branch
* Commit
* Push / Pull
* Merge / Rebase
* Conflict handling

### Git workflow

* Mỗi thành viên làm việc trên một branch riêng
* Tạo Pull Request
* Review code cho nhau
* Merge vào branch master

### Kết quả

* Hiểu quy trình làm việc nhóm với Git
* Thực hành xử lý conflict
* Làm quen với GitHub Flow trong thực tế

---

## Giai đoạn 4 – Database trên Linux

### Nội dung đã thực hành

* Cài đặt và quản lý:

  * PostgreSQL
  * MongoDB

### Các nội dung chính

* Tạo database
* Tạo user
* Phân quyền truy cập
* Kết nối database
* Kiểm tra trạng thái service
* Xem log khi database gặp lỗi
* Backup & restore dữ liệu

### Mục tiêu đạt được

* Database chạy được trên Linux
* Khi DB lỗi biết cách kiểm tra log
* Có thể backup / restore dữ liệu mà không phụ thuộc người khác

---

## Giai đoạn 5 – SQL Practicing

### Nội dung

* Thiết kế database **StoreManagement**
* Thực hành SQL theo các mức:

  * Easy
  * Medium
  * Hard

### Kỹ năng luyện tập

* JOIN nhiều bảng
* GROUP BY
* HAVING
* Subquery
* Tổng hợp dữ liệu theo nghiệp vụ thực tế

### Kết quả

* Hiểu cách xây dựng query phục vụ nghiệp vụ
* Biết cách đọc yêu cầu và chuyển thành câu SQL

---

## Giai đoạn 6 – Node.js Backend

### Nội dung đang ôn luyện

* Node.js core
* Module system
* Async / Await
* Error handling

### Express.js

* REST API
* Middleware
* Project structure

### Cấu trúc backend chuẩn

* routes
* controllers
* services
* models

### Mục tiêu tiếp theo

* Xây dựng REST API hoàn chỉnh
* Kết nối database
* Triển khai authentication bằng JWT