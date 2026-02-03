/**
 * File: 06-async-await.js
 *
 * Mục đích:
 * - Hiểu async / await thực chất là Promise
 *
 * INPUT:
 * - async function
 * - await Promise.resolve()
 *
 * PROCESS:
 * - await làm dừng function tại chỗ
 * - Phần code sau await chạy sau (Microtask)
 *
 * OUTPUT:
 * A
 * C
 * B
 */

async function demoAsync() {
  console.log("A");

  // chờ Promise resolve
  await Promise.resolve();

  console.log("B");
}

demoAsync();
console.log("C");
