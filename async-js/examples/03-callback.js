/**
 * CASE: callback
 * Input:
 * - Một callback function
 *
 * Output:
 * start
 * end
 * callback executed
 */

console.log("start");

function doAsyncTask(callback) {
  setTimeout(() => {
    callback();
  }, 2000);
}

doAsyncTask(() => {
  console.log("callback executed");
});

console.log("end");

/**
 * Lifecycle giải thích:
 * console.log("start")đucợ execute ngay
 * do gặp doAsyncTask((), trong hàm này có settimeout được đăng ký với web api
 * hàm này sẽ kết thúc và pop khỏi call stack
 * end đuco thực thi 
 * sau time đăng ký 2s  callback được đưa vào task queue
 * event loop đảy callback vào callstack khi stack rỗng
 * callback được execute
 * 
 * Callback giúp JavaScript xử lý bất đồng bộ bằng cách gọi lại một function khi task hoàn thành, thay vì chặn Call Stack
 */