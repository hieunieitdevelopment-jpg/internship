/** Node.js */
const http = require("http");
/** 
 * http là module có sẵn của node 
 * cho phép tạo server
 * nhận request từ client
 * trả response
 * require() = cách Node import module (CommonJS)
*/

const server = http.createServer((req, res)=> {

})

/**
 * http.createServer tạo ra 1 HTTP server
 * Hàm callback (req, res) sẽ run mỗi khi có request send tới
 *    req (request): thông tin client gửi lên (URL, method, headers…)
 *    res (response): thứ server trả về cho client
*/

res.end("Hello from Node.js");
/**
 * res.end(): gửi data về client
 * kết thúc response
 * trong trường hợp không call res.end() thì browser chờ mãi 
*/

server.listen(3000,() => {
    console.log("server running at http://localhost:3000 ");
});
/**
 * listen(3000): lắng nghe cổng 3000
*/

/**
 * ================
 * Non-blocking I/O
 * ================
*/

setTimeout(() => {
    console.log("hiếu");
}, 2000);
/**
 * nhiệm vụ của code sau 2s thì sẽ in ra hiếu
 * nó sẽ khác hoàn toàn với console.log("hiếu")-> nó in ra ngay lập tức sẽ không quan tâm đến thời gian chờ
 * setTimeout = async task
*/

const fs = require("fs");
/**
 * fs: file system, cho phép read file, write file, delete file
*/

/**
 * ==========
 * Event Loop
 * ==========
*/

console.log("1");

setTimeout(() => {
  console.log("2 - timeout");
}, 0);

Promise.resolve().then(() => {
  console.log("3 - promise");
});

console.log("4");
/**
 * node bắt đầu chạy file sẽ output ra 1 sau khi in thì call stack trống
 * bước tiếp theo sẽ đến setTimeout node sẽ không run ngay lăp tức chỉ đăng ký hẹn giờ, sau khi tời gian hết  callback được đưa vào Timer Queue( 0ms  khác với run ngay), call stack sẽ trống, trong Time Queue: đã có console("2 - timeout")
 * bước 3 gặp Promise, promise đucợ resolve ngay lặp tức, Callback .then() được đưa vào Microtask Queue
 * .then():Nhận callback, Callback này sẽ chạy sau khi Promise resolve( nhưng sẽ không run ngay lặp tức)
*/

/**
 * ======================
 * MODULE & CẤU TRÚC FILE
 * ======================
*/

/* Ví dụ để hiểu thêm hơn về module*/
/*file message.js*/
function getMessage() {
  return "Hello from module";
}

module.exports = getMessage;
/** 
 * vai trò module.exports là:Thứ mà file này cho phép file khác sử dụng
 * File message.js chỉ export 1 thứ, Thứ đó là function getMessage
-> nếu Ai require file này sẽ nhận được function getMessage
*/

/*file app.js*/
const getMessage = require("./message");

console.log(getMessage());
/**
 * nó sẽ search file message.js cùng thư mục
 * sau đó nó sẽ call function getMessage() và nhận về "Hello from module"
*/

/**
 * ===============================
 * EXPORT NHIỀU THỨ TRONG 1 MODULE
 * ===============================
*/
/** file  math.js */

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

module.exports = {
  add,
  subtract
};
/** 
 * khai báo Function cộng 2 số và trừ 2 số
 * module.exports = {
  add,
  subtract
    };
 *  Export 1 object
    Object đó có 2 key:
        add → function add
        subtract → function subtract
*/

/** file app.js */
const math = require("./math");

console.log(math.add(5, 3));
console.log(math.subtract(10, 4));
/**
 * nó sẽ search trong file math và lấy module.exports gồm có add: [Function],
  subtract: [Function]
 * gán vào biến math: math.add → function add
 * math.subtract → function subtract
 * trường hợp export từng cái thì chỉ có dòng cuối có hiệu lực
*/

/** 
 * ======================
 * DESTRUCTURING REQUIRE 
 * ======================
*/
/** file  math.js */

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

module.exports = {
  add,
  subtract
};

/** file app.js */
const { add, subtract } = require("./math");

console.log(add(2, 1));
console.log(subtract(5, 3));

/**
 * trước tiên nó sẽ requite("./math"); 
 * sẽ output {
    add: [Function],
    subtract: [Function]
 *  const { add, subtract } = {
    add: [Function],
    subtract: [Function]
    };
    nó sẽ tương đương với :
    const add = object.add;
    const subtract = object.subtract;
    }
 * việc này sex giúp gọn, đọc nhanh
*/

/**
 * ================
 * EXPORT 1 FUNCTION
 * ================
 */

/** File logger.js */
module.exports = function log(message) {
  console.log("LOG:", message);
};
/**
 * từ đay em nhận tháy rằng module.exports không bắt buộc là object , mà nó có thể function,object, string, number, class
*/

/** file app.js */
const log = require("./logger");

log("Server started");
log("User login");
/** 
 * Chạy logger.js,Lấy module.exports, module.exports là function log, Gán function đó vào biến log
*/

/**
 * ====
 * fs
 * ====
*/

/** file data.txt */
/*Hello from file system/


/** file app.js */

const fs = require("fs");

console.log("Start");

fs.readFile("data.txt", "utf8", (err, data) => {
  console.log(" File content:", data);
});

console.log(" End");

/**
 * const fs = require("fs"); Load core module fs, Không cần ./ vì nó là module sẵn
 * console.log("Start"); dòng này sẽ run ngay
 * Khi chạy fs.readFile(...), Node không tự đọc file mà nhờ hệ điều hành đọc giúp. Ngay lúc gửi yêu cầu đó xong, Node không đứng chờ kết quả. Nó chỉ ghi nhớ rằng: “khi nào đọc xong thì gọi lại hàm callback này cho tao”. Callback được đưa vào Event Loop để chờ xử lý sau.
 * fs.readFile("data.txt", "utf8", (err, data) => {
   console.log(" File content:", data);
   });
   Trong lúc hệ điều hành đang đọc file, Node tiếp tục chạy các dòng code phía dưới. Khi việc đọc file hoàn tất và toàn bộ code sync đã chạy xong, Event Loop mới lấy callback ra và thực thi, lúc đó nội dung file mới được in ra.
 * readFile là non-blocking nen kết qua 132
*/

/**
 * ====
 * path
 * ====
 */

/** file app.js */
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "data.txt");

fs.readFile(filePath, "utf8", (err, data) => {
  console.log(data);
});
/**
 * __dirname là: Đường dẫn thư mục chứa file hiện tại,Do Node tự cung cấp(vd:/home/app/path-demo
 )
 *path.join(...):Lấy path thư mục hiện tại,  Nối thêm "data.txt", Tự dùng / hay \ đúng OS
 * Vì sao không nối string?: vì Sai trên Windows, Lỗi slash, Code xấu, dễ bug
 * Mọi thao tác với file trong Node đều nên dùng absolute path, và absolute path nên được tạo bằng path.join với __dirname.
*/


/** 
 * =====
 * env
 * =====
*/
console.log(process.env.PORT);
 /*output sẽ là 3000/
/**
 * process: thông tin tiến trình Node
 * env: object chứa biến môi trường
 * PORT: key do OS cung cấp
 */


/**
 * ================================
 * ASYNC / AWAIT
 * ================================
*/

/**
 * CALLBACK
 * setTimeout là 1 async function dùng callback
 * Node giao việc cho Timer (OS)
 * Sau 1s callback mới được đưa vào Event Loop
*/
setTimeout(() => {
  console.log("Done callback");
}, 1000);
/**
 * Khi đọc code callback:
 * Não phải tự nhớ: "1 giây sau mới chạy"
 * Code không thể hiện rõ thứ tự
 */

/**
 * PROMISE
 * Promise đại diện cho KẾT QUẢ trong tương lai
 * Nó chưa chạy liền, chỉ là một "lời hứa"
 */
const waitPromise = new Promise((resolve) => {
  /**
   * resolve = hàm báo cho Promise biết:
   * "làm xong rồi, đây là kết quả"
   */
  setTimeout(() => {
    resolve("Done promise");
  }, 1000);
});

/**
 * .then():
 * - Đăng ký hàm sẽ chạy khi Promise resolve
 * - then KHÔNG chạy ngay
 * - Chờ Promise xong mới chạy
*/
waitPromise.then((result) => {
  console.log(result);
});

/**
 * 
 * - Callback: phải tự nhớ thứ tự
 * - Promise: code tự nói lên thứ tự
*/

/**
 * =================================
 *  async / await
 * =================================
 */

/**
 * Hàm wait():
 * - Trả về Promise
 * - Sau 1s Promise sẽ resolve
 */
function wait() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Xong rồi");
    }, 1000);
  });
}

/**
 * async function:
 * - Node tự bọc return thành Promise
 * - Cho phép dùng await bên trong
 */
async function runAsyncAwait() {
  /**
   * console.log là sync
   * ->chạy ngay
   */
  console.log("Start");

  /**
   * await wait():
   * - Chỉ DỪNG function runAsyncAwait
   * - KHÔNG block toàn bộ chương trình
   * - Event Loop vẫn chạy bình thường
   */
  const result = await wait();

  /**
   * Dòng này chỉ chạy khi Promise resolve
   */
  console.log(result);

  /**
   * Chạy tiếp như code sync
   */
  console.log("End");
}

runAsyncAwait();

/**
 * - await làm code nhìn như sync
 * - Nhưng thực chất vẫn là async
 * - Event Loop không bị đứng
*/

/**
 * =================================
 * try / catch (bắt lỗi async)
 * =================================
*/

/**
 * Hàm fail():
 * - Trả về Promise
 * - Promise này LUÔN reject
 */
function fail() {
  return new Promise((_, reject) => {
    reject("Something went wrong");
  });
}

async function runWithError() {
  try {
    /**
     * await fail():
     * - Promise reject
     * - await sẽ THROW error
     * - Nhảy ngay vào catch
     */
    await fail();
  } catch (err) {
    /**
     * catch bắt được lỗi async
     * Nếu không có catch:
     * → Promise reject trôi
     * → app crash
     */
    console.log("Caught error:", err);
  }
}

runWithError();

/**
 * - Promise reject ≈ throw error
 * - Mọi await đều có khả năng lỗi
 * - Đi làm: KHÔNG BAO GIỜ await trần
 */

/**
 * =================================
 * Promise.all (chạy song song)
 * =================================
 */

/**
 * task():
 * - Giả lập 1 công việc async
 * - Mỗi task mất time ms
 */
function task(name, time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(name);
    }, time);
  });
}

async function runPromiseAll() {
  /**
   * Promise.all:
   * - Gửi TẤT CẢ Promise đi cùng lúc
   * - Không đợi cái này xong mới chạy cái kia
   */
  const results = await Promise.all([
    task("A", 1000),
    task("B", 1000),
    task("C", 1000),
  ]);

  /**
   * results là mảng kết quả
   * Thứ tự giống thứ tự Promise truyền vào
   */
  console.log(results);
}

runPromiseAll();

/**
 * - await từng cái → chạy tuần tự → chậm
 * - Promise.all → chạy song song → nhanh
 */
