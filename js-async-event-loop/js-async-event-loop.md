### ASYNCHRONOUS & PROMISE TRONG JAVASCRIPT
# Synchronous là gì?
- tức là mọi việc đều được handle theo thứ tự từng bước, chỉ khi nào bước đầu tiên xong thì bước thứ hai mới được thực hiện.
    - Ưu điểm:
        - programme sẽ run theo thứ tự trên xuống, có rules rõ ràng nên nếu có lỗi chúng ta có thể dễ dàng tìm ra lỗi và handle nó
        - Synchronous dễ dàng kiểm soát quá trình handle
    - Khuyết điểm:
        - khi handle theo thứ tự nó sẽ sinh ra status chờ, nếu máy lệnh run quá lâu thì lẵng phí time của các lệnh dưới
        - Khi nói về UX, cảm giác lag cho người dùng 

# Asynchronous là gì?
- tức là mọi việc đều được handle cùng lúc chớ không phải chờ đợi nhau như Synchronous, trong trường hợp này rõ ràng xử lí bất đồng bộ chiếm ưu thế hơn handle Synchronous
    - Ưu điểm:
        - handle nhiều job cùng lúc mà không cần phải chờ đợi theo thứ tự
        - Tối ưu time chạy và handle của program
        - Tối ưu sức mạnh của resources
    - Khuyết điểm:
        - Do các câu lệnh được thực hiện đồng thời, và kết quả cũng được output một cách không theo thứ tự nên rất khó kiểm soát cũng như debug.

# JavaScript là single-threaded
- JavaScript chỉ có một luồng execute duy nhất, nghĩa là tại một time chỉ có thể thực hiện một task. Nhưng nhờ có cơ chế asynchronous, nó vẫn handle được nhiều job mà không bị blocking.
# Event Loop là gì?
- Event Loop là mechanism giúp JavaScript handle các task asynchronous. Nó liên tục check:
    - Call Stack (ngăn xếp lời gọi): Nơi execute code synchronous.
    - Task Queue (hàng đợi tác vụ): Chứa các callback từ setTimeout, setInterval, I/O.
    - Microtask Queue: Chứa Promises, queueMicrotask (ưu tiên cao hơn). 
# Quy trình hoạt động:
- Bước 1: Code synchronous được đưa vào Call Stack và execute ngay.
- Bước 2: Các tác vụ asynchronous (setTimeout, fetch, Promise) được giao cho Web APIs handle.
- Bước 3: Khi hoàn thành, callback được đưa vào Queue tương ứng.
- Bước 4: Event Loop check - nếu Call Stack trống:
    - Ưu tiên lấy từ Microtask Queue trước.
    - Sau đó mới lấy từ Task Queue. 

# Trong Javascript, bất đồng bộ xảy ra khi chúng ta thực hiện các thao tác asynchronous:
- Call API, setTimeout, setInterval
- XMLHttpRequest, file reading,
- RequestAnimationFrame

# Tại sao cần bất đồng bộ?
- Tránh blocking UI khi thực hiện các task tốn time (API calls, đọc file, timer).
- Tăng hiệu suất ứng dụng.
- Cải thiện trải nghiệm người dùng.

# JavaScript đồng bộ – Cơ chế hoạt động của ngăn xếp thực thi hàm ( Call Stack )
- Khi công cụ JavaScript call một functon, nó sẽ thêm function đó vào ngăn xếp và quá trình execute start.
- Nếu function đang được execute gọi một hàm khác, công cụ sẽ thêm hàm thứ hai vào ngăn xếp và bắt đầu execute nó.
- Sau khi hoàn thành việc execute hàm thứ hai, công cụ sẽ loại bỏ nó khỏi ngăn xếp.
- Quá trình điều khiển quay trở lại để tiếp tục thực thi hàm đầu tiên từ điểm mà nó đã stop lần trước.
- Sau khi quá trình execute hàm đầu tiên kết thúc, công cụ sẽ loại bỏ nó khỏi ngăn xếp.
- Tiếp tục theo cách tương tự cho đến khi không còn gì để đưa vào ngăn xếp nữa.

# Callback
- là một function được truyền vào một function khác trong role ,function callback này sẽ được execute khi gọi function chính và function chính kết thúc
- nhờ đặc tả Higher Order Function của javascript:
    - tham số của function có thể là một function
    - hàm có thể return function khác, or functions khác
    - hàm callback/or function return có thể truy cập và save data/state của function cha, kể cả function kết thúc nhờ closure

# Tại sao lại dùng callback?
- Synchronous: callback nguyên tắc DRY(Don't reepeat yourself). callback đucợ thiết kế trong việc viết code theo nguyên tắc DRY tránh lặp lại code => callback pattern
- Asynchronous: vì javascript là single-threaded : thực hiện chỉ việc trong cùng thời điểm. để tránh bị blocking khi gặp các task "nặng" và tiếp tục run (non-blocking) code khác trên callstack 
    

# Promise
-  là "lời hứa" đại diện cho 1 task nào đó chưa hoàn thành ngay được và ở 1 thời điểm, promise sẽ output và giá tị resolve or reject
- Promise nhận vào một hàm callback gồm 2 tham số:
    - resolve: một function sẽ được call nếu đoạn code bất đồng bộ trong Promise run thành công.
    - reject: sẽ ngược lại, lỗi xảy ra 
- Promise cũng cung cấp cho chúng ta 2 phương thức để handle sau khi được thực hiện:
    - then(): dùng đẻ handle sau khi promise thực hiện thành công
    - catch(): dùng để handle sai khi promise gặp bất kỳ fail 
    - finally(): dùng để handle sau khi promise được thực hiện thành công hoặc thất bại (resolve hoặc reject được gọi)

# Async await
- Async: Được đặt trước 1 function để khai báo bất đồng bộ cho cho function.
    - Kết quả trả về của async function luôn luôn là 1 Promise
    - Khi call tới hàm async nó sẽ handle mọi thứ và được trả về kết quả trong function của nó.
    - Async cho phép sử dụng Await
- Await: Được sử dụng khi muốn tạm dừng việc thực hiện các hàm async 
    - Khi được đặt trước một Promise, nó sẽ đợi cho đến khi Promise kết thúc và trả về kết quả.
    - Await chỉ làm việc với Promises, nó không hoạt động với callbacks.
    - Await chỉ có thể được sử dụng bên trong các function async.
# Async Await không thể thay thế hoàn toàn Prosime
- sử dụng Async/Await chính là đang sử dụng Promise ngầm, và Async/Await không thể nào thay thế được Promise. Và chúng ta hoàn toàn có thể sử dung cả hai cùng lúc, 