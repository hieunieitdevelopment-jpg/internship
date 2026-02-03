/**
 * CASE: Promise
 * Input:
 * - Promise resolve sau 2s
 *
 * Output:
 * start
 * end
 * success
*/

console.log("start");

const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("success");
  }, 2000);
});

promise.then(result => {
  console.log(result);
});

console.log("end");

/**
 * Lifecycle giải thích:
 * console.log("start") chạy ngay
 * sau đó promise được tạo , execute chạy ngay (sync)
 * setTimeout được đăng ký với Web API
 *.then() được đăng ký nhưng chưa chạy
 * tiếp tục chạy ra end
 * sau 2s, promise được resolve
 * Callback của .then() được đưa vào Microtask Queue
 * Event Loop ưu tiên Microtask  đẩy .then() vào Call Stack
 * .then() chạy trong Microtask, không phải Task
 */
