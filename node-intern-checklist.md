### Node.js Intern Checklist ###

### Node.js là gì, dùng khi nào
    Node.js là môi trường cho phép chạy JavaScript ở phía server.
    Node thường được dùng để xây dựng:
    - Backend API
    - Web service
    - Server xử lý dữ liệu
    Node phù hợp với hệ thống có nhiều request, realtime (chat, notification, API).

### Non-blocking I/O là gì
    Non-blocking I/O nghĩa là:
    - Khi xử lý tác vụ tốn thời gian (đọc file, query DB)
    - Node **không chờ xong mới chạy tiếp**
    - Nó chuyển tác vụ đó cho hệ thống xử lý
    ==> Giúp server xử lý được nhiều request cùng lúc.

### Event Loop (khái niệm)
    Event Loop là cơ chế giúp Node:

    - Quản lý các tác vụ bất đồng bộ
    - Đưa callback / promise vào hàng đợi
    - Thực thi khi call stack rỗng
    (Event Loop giúp Node chạy async)

## MODULE & CẤU TRÚC FILE

### require / import
    - require: CommonJS
    - import: ES Module

    Ví dụ:
        const fs = require('fs');

### module.exports / export
    vi du:
        module.exports = sum;

### Tách file theo chức năng

    Ví dụ:
    - routes/
    - controllers/
    - services/
    - utils/

## CORE MODULES (PHẢI TỪNG DÙNG)

### fs – đọc / ghi file
    - readFile
    - writeFile

### path – xử lý đường dẫn
    - path.join
    - path.extname

### process.env
    - Lưu biến môi trường
    - Bảo mật thông tin (PORT, PASSWORD)

### http
    - Tạo server thuần không dùng Express

## ASYNC / AWAIT (BẮT BUỘC)

### Callback vs Promise
    - Callback: dễ rối, callback hell
    - Promise: rõ ràng hơn

### async / await
    Giúp code async nhìn giống code đồng bộ.

### try / catch
    Dùng để bắt lỗi trong async function.

### Promise.all
    Chạy nhiều promise song song.

### Xử lý lỗi async
    - Luôn có try/catch
    - Không để lỗi làm sập server
