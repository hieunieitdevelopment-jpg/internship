/**
 * File: 05-microtask-vs-macro.js
 *
 * Mục đích:
 * - So sánh Microtask và Macrotask
 *
 * INPUT:
 * - Promise.resolve().then(...)
 * - setTimeout(..., 0)
 *
 * PROCESS:
 * - Promise.then() → Microtask Queue
 * - setTimeout() → Task Queue
 * - Event Loop chạy Microtask trước
 *
 * OUTPUT:
 * sync
 * promise
 * timeout
 */

setTimeout(function () {
  console.log("timeout");
}, 0);

Promise.resolve().then(function () {
  console.log("promise");
});

console.log("sync");
