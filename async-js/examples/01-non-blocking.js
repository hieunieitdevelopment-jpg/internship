/**
 * CASE 2: NON-BLOCKING (Asynchronous)
 *
 * Input:
 * - setTimeout (async)
 *
 * Expected Output:
 * start
 * end
 * timeout done
 */

console.log("start");

setTimeout(()=>{
    console.log("timeout done")
}, 3000);

console.log("end");

/**
 * Lifecycle giải thích:
 * console.log("start") được execute ngay
 * sau đó gặp settimeout push nó vào call stack
 * sau đó settimeout đăng ký time với web api rồi bị pop ra stack
 * tiếp tục thực thi end mà không chờ time 
 * khi time kết thúc, callback được đưa vào task queue
 * eventloop kiểm tra call stack, thấy rỗng thì đẩy callback vào
 * Callback được execute và output timeout done
 * 
 * Conclusion:
 * Với **non-blocking code**, JavaScript đẩy tác vụ sang Web APIs, giải phóng Call Stack để tiếp tục chạy code khác.
 */