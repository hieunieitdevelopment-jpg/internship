# Node.js
## Node.js là gì? Dùng khi nào?
- Node.js là environment runtime cho phép chạy JavaScript phía server, thường dùng để build backend và các công cụ server-side
## node dùng để làm gì:
- backend API
- server realtime 
- xử lý nhiều request cùng lúc 
- write tool CLI
- thường sẽ không use cho các app tính toán nặng
--> em hiểu được rằng node mạnh ở I/O nhiều - handle nhanh - không nhặn luồng
## Non-blocking I/O là gì?
- I/O là gì? 
    - tương đương input/ output
    - VD: read file, call database, call API, send request HTTP
- Blocking: read file -> chờ xong -> wolk khác
- Non-blocking: read file -> wolk khác khi xong file -> quay lại handle
--> Node.js sử dụng model non-blocking I/O giúp xử lý nhiều request đồng thời với hiệu năng cao.
## Event Loop là gì?
- Event Loop giúp Node hanlde bất đồng bộ và non-blocking bằng cách manage hàng đợi các task.
## Call Stack 
- nơi run code js bình thường
- run từ trên xuống dưới
## Queue
- là nơi chờ việc async
- có 2 loại cụ thể:
    - Microtask Queue → Promise
    - Macrotask / Timer Queue → setTimeout
## Node.js khác gì JavaScript trên Browser?
- node run trên Server/máy, mục đích sử dụng backend, không có dom, truy cập file , connect db, module commonjs/es module

# MODULE & CẤU TRÚC FILE
## Module là gì?
- Module giống như “phòng ban” trong công ty – ai wolk nấy, giao tiếp qua cửa chính.là một đơn vị code đọc lập , có trách nhiệm rõ ràng
- trong mỗi file js = với một module, các module sẽ không nhìn thấy nhau, nếu muốn use code của cacs module khác thì phải export & import
## vì sao phải có module?
- Nếu không có module sẽ khó read file, khó edit file, fail 1 chỗ ảnh hưởng đến tất cả
- trường hợp có module: mỗi phần sẽ dc tách riêng ra , edit logic không affect đến server, nếu thêm tích năng không bị phá code cũ
## module.exports là gì?
- đây chính là thứ để file này allow file khác use
- trường hợp gán gì vào module.exports, file khác require vào sẽ không nhận được gì
## require() là gì?
- nó không chỉ là “import file” nó có thể : search file , run file đó 1 lần duy nhất, lấy module.exports,Cache lại (lần sau không chạy lại)
## import / export là gì?
- là chuẩn module chính thức của javaScript
- dùng cho Browser, node
- nó sẽ khác với Commonjs: phải declare rõ ràng, Phân tích được khi build (static)
## Vì sao KHÔNG viết logic vào 1 file?
- vì khi edit chỗ này affect chỗ khác, không test được vì logic dính HTTP, không teamwork được

# CORE MODULES
## fs – FILE SYSTEM (read / write FILE)
- fs dùng để làm gì?
    - dungf để  làm việc với file trên máy/ server
    - nó có thể read file, write file, create file, delete file, read thư mục
    -> Browser KHÔNG ĐƯỢC PHÉP làm mấy việc này vì lý do bảo mật.
## path – XỬ LÝ ĐƯỜNG DẪN
- path dùng để nối đường dẫn đúng, không thể read file , path chỉ sử lý string đường dẫn 

## process.env – BIẾN MÔI TRƯỜNG
- là config nằm ngoài code , ví dụ như :PORT, DB_PASSWORD, API_KEY
- Node lấy process.env từ đâu?
    - os sẽ provide variable environment, node sẽ read và đưa vào process.env
    - tại sao lại quan trọng: vì 1 code run nhiều environment (local, staging, production) mỗi environment config khác nhau
## http – SERVER
- http dùng để tạo server backend
- cách wolk : 
    - lắng nghe port
    - có request đến
    - node: 
        - req (request)
        - res (response)
    - gọi callback của bạn
- role của http: là nền móng của web server Node
- vì sao hiếm khi dùng trực tiếp:
    - phải tự parse URL
    - tự handl method
    - tự routing

---

# ASYNC / AWAIT
- Async trong Node là cách handle các công việc mất time như đọc file, query database hay gọi API mà không làm environment đứng chờ. Những công việc này chậm hơn CPU rất nhiều, nên nếu chờ trực tiếp thì server sẽ bị đơ và không handle được nhiều request cùng lúc.

## Callback vs Promise
- Callback là khi nào xong wolk thì gọi lại function để tiếp tục 
- Callback dễ dẫn đến code lồng nhau nhiều tầng, rất khó đọc, khó bảo trì và đặc biệt là xử lý lỗi phức tạp. Khi project lớn lên, code kiểu này khiến lập trình viên rất dễ rối.
## Promise sinh ra để làm gì?
- Promise đại diện cho một kết quả sẽ có trong tương lai. Nó có ba trạng thái: đang chờ, thành công hoặc thất bại. Promise giúp code rõ ràng hơn và xử lý lỗi dễ hơn so với callback.
## async / await là gì?
- async / await là cách viết Promise sao cho nhìn giống code synchronous, giúp lập trình viên đọc và viết dễ hơn, nhưng bản chất vẫn là bất đồng bộ.
- async nghĩa là gì?
    - Khi một function được khai báo là async, Node hiểu rằng function này luôn trả về một Promise, kể cả khi trong function chỉ return một giá trị bình thường.
- await làm gì?
    - await cho phép stop việc execute bên trong hàm async để chờ Promise hoàn thành, nhưng nó không block Event Loop hay toàn bộ chương trình.
## try / catch trong async
- Khi một Promise bị reject, nó tương đương với việc throw error. Nếu không bắt lỗi, ứng dụng có thể bị crash. Vì vậy, mọi câu lệnh await đều nên nằm trong try / catch để đảm bảo lỗi được xử lý an toàn.
## Promise.all – chạy song song
- Promise.all được dùng khi có nhiều job độc lập cần thực hiện cùng lúc. Nó cho phép run các Promise song song và đợi tất cả hoàn thành, giúp environment nhanh hơn so với làm tuần tự. Tuy nhiên, chỉ cần một Promise bị fail thì toàn bộ Promise.all sẽ thất bại, nên phải luôn handle fail.
## Xử lý lỗi async
- Lỗi async không tự được bắt như lỗi sync. Vì vậy, khi làm việc với Promise, cần dùng .catch() hoặc try / catch kết hợp với await. Intern cần nhớ rằng async luôn có khả năng lỗi, mọi await đều phải được bảo vệ, và không được để Promise bị reject mà không xử lý.
