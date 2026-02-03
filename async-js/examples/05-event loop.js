/**
 * CASE: EVENT LOOP
 * input:
 * Một macrotask (setTimeout)
 * Một microtask (Promise.then)
 * 
 * output:
 * start
 * end
 * promise
 * timeout

*/
console.log("start");

setTimeout(() => {
  console.log("timeout");
}, 0);

Promise.resolve().then(() => {
  console.log("promise");
});

console.log("end");

/**
 * LIFECYCLE:
 * console.log("start") được push vào Call Stack và execute
 * setTimeout được push vào Call Stack, đăng ký với Web API rồi pop ra
 * Promise.then được đăng ký, callback đưa vào Microtask Queue
 * console.log("end") được thực thi
 * Call Stack rỗng
 * Event Loop kiểm tra Microtask Queue trước
 * Callback của Promise được đẩy vào Call Stack và chạy
 * Sau khi Microtask Queue rỗng, Event Loop xử lý Task Queue
 * Callback của setTimeout được đẩy vào Call Stack và chạy
 * 
 * 
 * Conclusion:
 * Event Loop là cơ chế điều phối bất đồng bộ trong JavaScript.
 * Nó liên tục theo dõi Call Stack và đưa callback từ các queue vào khi stack rỗng.
 * Microtask Queue có độ ưu tiên cao hơn Task Queue, vì vậy Promise.then luôn được thực thi trước setTimeout.
 * Nhờ Event Loop, JavaScript có thể xử lý async hiệu quả dù chỉ chạy trên một thread.
 */
