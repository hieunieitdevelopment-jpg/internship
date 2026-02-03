/**
 * File: 04-promise.js
 *
 * Mục đích:
 * - Hiểu Promise hoạt động như thế nào
 *
 * INPUT:
 * - new Promise(...)
 * - promise.then(...)
 *
 * PROCESS:
 * - Phần code trong Promise constructor chạy ngay
 * - then() không chạy ngay mà đưa vào Microtask Queue
 *
 * OUTPUT:
 * Before promise
 * Inside promise
 * After promise
 * Promise resolved
 */

console.log("Before promise");

const myPromise = new Promise(function (resolve, reject) {
  console.log("Inside promise");
  resolve();
});

myPromise.then(function () {
  console.log("Promise resolved");
});

console.log("After promise");
