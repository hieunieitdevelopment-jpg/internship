/**
 * File: 02-blocking.js
 *
 * Mục đích:
 * - Hiểu blocking là gì trong JavaScript
 * - Khi bị block, JS không thể làm việc khác
 *
 * INPUT:
 * - blockForSeconds(3)
 *
 * PROCESS:
 * - while loop chạy liên tục
 * - Chiếm Call Stack trong 3 giây
 *
 * OUTPUT (sau ~3 giây):
 * Start blocking...
 * End blocking
 */

function blockForSeconds(seconds) {
  const startTime = Date.now();

  // Vòng lặp block CPU, không cho JS làm việc khác
  while (Date.now() - startTime < seconds * 1000) {
  }
}

console.log("Start blocking...");
blockForSeconds(3);
console.log("End blocking");
