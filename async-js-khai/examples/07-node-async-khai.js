/**
 * File: 07-node-async.js
 *
 * Mục đích:
 * - Tìm hiểu async trong Node.js với I/O
 *
 * INPUT:
 * - fs.readFile
 *
 * PROCESS:
 * - fs.readFile chạy ở libuv (không chạy trong Call Stack)
 * - Callback được đưa vào Task Queue
 *
 * OUTPUT:
 * Start
 * End
 * File read done
 */

const fs = require("fs");

console.log("Start");

fs.readFile(__filename, "utf8", function () {
  console.log("File read done");
});

console.log("End");
