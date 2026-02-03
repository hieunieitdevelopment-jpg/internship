/**
 * File: 03-callback.js
 *
 * Mục đích:
 * - Hiểu callback là gì
 * - Hiểu cách setTimeout hoạt động
 *
 * INPUT:
 * - setTimeout(callback, 0)
 *
 * PROCESS:
 * - setTimeout đưa callback sang Web API
 * - Sau delay, callback vào Task Queue
 * - Event Loop đẩy callback vào Call Stack
 *   khi Call Stack rỗng
 *
 * OUTPUT:
 * Start
 * End
 * Timeout callback
 */

console.log("Start");

setTimeout(function () {
  console.log("Timeout callback");
}, 0);

console.log("End");
