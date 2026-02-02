# Synchronous và Asynchronous trong JavaScript

---

## 1. Lý do

Trong quá trình học JavaScript và làm quen với Node.js, em gặp khá nhiều ví dụ liên quan đến async, Promise và async/await. Ban đầu khi đọc code, em thấy thứ tự chạy không giống như thứ tự viết trong file nên khá rối.

Vì vậy em viết lại file ghi chú này theo cách hiểu của bản thân, chủ yếu để:
- Nhớ lại kiến thức khi cần
- Hiểu rõ hơn cơ chế chạy code của JavaScript
- Tránh nhầm lẫn khi làm backend sau này

---

## 2. JavaScript là ngôn ngữ single-thread

Theo những gì em tìm hiểu, JavaScript là ngôn ngữ **single-thread**, nghĩa là tại một thời điểm chỉ xử lý một công việc thông qua Call Stack.

Điều này có nghĩa là:
- Các dòng code không chạy song song
- Nếu một đoạn code chạy lâu thì các đoạn phía sau phải chờ

Do đó JavaScript cần cơ chế bất đồng bộ để xử lý các tác vụ như gọi API, đọc file hoặc query database mà không làm chương trình bị đứng.

---

## 3. Synchronous (đồng bộ)

Synchronous là cách chạy code theo thứ tự từ trên xuống dưới. Dòng sau chỉ chạy khi dòng trước đã chạy xong.

### Ví dụ:
```js
console.log("A");
console.log("B");
console.log("C");
```

Kết quả:
```
A
B
C
```

Theo em thấy, synchronous khá dễ đọc và dễ hiểu, nhưng nếu dùng cho các tác vụ mất nhiều thời gian thì sẽ gây block chương trình.

---

## 4. Asynchronous (bất đồng bộ)

Asynchronous cho phép JavaScript xử lý các tác vụ mất thời gian mà không làm dừng chương trình chính. Khi gặp một tác vụ async, JavaScript sẽ giao việc đó cho hệ thống xử lý và tiếp tục chạy các đoạn code khác.

### Ví dụ:
```js
console.log("A");

setTimeout(() => {
  console.log("B");
}, 1000);

console.log("C");
```

Kết quả:
```
A
C
B
```

Trong ví dụ trên, `setTimeout` chạy bất đồng bộ nên không chặn việc in ra `C`.

---

## 5. Các thành phần liên quan đến async JavaScript

Qua tìm hiểu, để hiểu async JS cần nắm một số thành phần sau:
- Call Stack
- Web APIs (hoặc Node APIs)
- Callback Queue
- Microtask Queue
- Event Loop

---

## 6. Call Stack

Call Stack là nơi JavaScript thực thi các đoạn code đồng bộ. Call Stack hoạt động theo cơ chế vào sau ra trước (LIFO).

Khi Call Stack còn đang xử lý code thì các task async vẫn phải chờ trong queue.

---

## 7. Web APIs, Callback Queue và Microtask Queue

Các hàm như `setTimeout`, `fetch`, `fs.readFile` không chạy trực tiếp trong Call Stack mà được đưa sang Web APIs xử lý.

Sau khi xử lý xong:
- Callback của `setTimeout`, I/O sẽ được đưa vào **Callback Queue**
- Các hàm `.then()` của Promise sẽ được đưa vào **Microtask Queue**

Theo tài liệu em đọc thì Microtask Queue luôn được ưu tiên xử lý trước Callback Queue.

---

## 8. Event Loop

Event Loop có nhiệm vụ kiểm tra Call Stack. Khi Call Stack rỗng thì:
1. Thực thi toàn bộ Microtask Queue
2. Sau đó mới lấy task từ Callback Queue đưa vào Call Stack

Nhờ cơ chế này mà JavaScript có thể xử lý được nhiều tác vụ bất đồng bộ mà không bị block.

---

## 9. Ví dụ minh hoạ thứ tự chạy

```js
console.log("Start");

setTimeout(() => {
  console.log("setTimeout");
}, 0);

Promise.resolve().then(() => {
  console.log("Promise then");
});

console.log("End");
```

Kết quả:
```
Start
End
Promise then
setTimeout
```

Qua ví dụ này, em hiểu rằng Promise có độ ưu tiên cao hơn `setTimeout`.

---

## 10. Promise

Promise là đối tượng đại diện cho kết quả của một tác vụ bất đồng bộ trong tương lai. Promise có 3 trạng thái:
- Pending: đang chờ xử lý
- Fulfilled: xử lý thành công
- Rejected: xử lý thất bại

### Ví dụ:
```js
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Hoàn thành");
  }, 1000);
});
```

---

## 11. async / await

`async / await` là cú pháp giúp viết code bất đồng bộ dễ đọc hơn so với việc dùng nhiều `.then()`.

```js
async function getData() {
  const data = await fetchData();
  return data;
}
```

Theo em hiểu thì `await` chỉ dừng function hiện tại, chứ không làm dừng toàn bộ chương trình.

---

## 12. Phần em còn chưa hiểu rõ

Trong quá trình học, em vẫn còn một số chỗ chưa thật sự chắc:
- Khi nào nên dùng Promise chaining, khi nào nên dùng async/await trong project thực tế
- Cơ chế Event Loop trong các trường hợp I/O phức tạp của Node.js
- Những tình huống nào có thể làm Event Loop bị block

Những phần này em sẽ tiếp tục tìm hiểu thêm trong quá trình học.

---

## 13. Tổng kết

Qua việc ghi chú lại phần này, em rút ra:
- JavaScript là single-thread nên cần cơ chế bất đồng bộ
- Event Loop và Promise là kiến thức rất quan trọng khi làm backend
- Hiểu async giúp em đọc code Node.js dễ hơn và tránh lỗi block chương trình

---

### HIEU Add the missing content.

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

# Tại sao lại dùng callback?
- Synchronous: callback nguyên tắc DRY(Don't reepeat yourself). callback đucợ thiết kế trong việc viết code theo nguyên tắc DRY tránh lặp lại code => callback pattern
- Asynchronous: vì javascript là single-threaded : thực hiện chỉ việc trong cùng thời điểm. để tránh bị blocking khi gặp các task "nặng" và tiếp tục run (non-blocking) code khác trên callstack 

# JavaScript đồng bộ – Cơ chế hoạt động của ngăn xếp thực thi hàm ( Call Stack )
- Khi công cụ JavaScript call một functon, nó sẽ thêm function đó vào ngăn xếp và quá trình execute start.
- Nếu function đang được execute gọi một hàm khác, công cụ sẽ thêm hàm thứ hai vào ngăn xếp và bắt đầu execute nó.
- Sau khi hoàn thành việc execute hàm thứ hai, công cụ sẽ loại bỏ nó khỏi ngăn xếp.
- Quá trình điều khiển quay trở lại để tiếp tục thực thi hàm đầu tiên từ điểm mà nó đã stop lần trước.
- Sau khi quá trình execute hàm đầu tiên kết thúc, công cụ sẽ loại bỏ nó khỏi ngăn xếp.
- Tiếp tục theo cách tương tự cho đến khi không còn gì để đưa vào ngăn xếp nữa.


# Tại sao cần bất đồng bộ?
- Tránh blocking UI khi thực hiện các task tốn time (API calls, đọc file, timer).
- Tăng hiệu suất ứng dụng.
- Cải thiện trải nghiệm người dùng.


# Synchronous and Asynchronous 
- liệt kê ra ưa và nhược điểm của Synchronous and Asynchronous