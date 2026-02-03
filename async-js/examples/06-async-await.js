/**
 * CASE: async / await
 * Input:
 * - Một Promise resolve sau 2s
 *
 * Output:
 * start
 * end
 * result: success
 */

console.log("start");

function fetchData() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve("success");
    }, 2000);
  });
}

async function main() {
  const result = await fetchData();
  console.log("result:", result);
}

main();

console.log("end");

/**
 * console.log("start") chạy
 * main() được gọi → push vào Call Stack
 * Gặp await fetchData() Promise được tạo
 * fetchData() đăng ký setTimeout với Web API
 * main() tạm dừng và bị pop khỏi Call Stack
 * end sẽ được execute
 * Promise resolve → kết quả vào Microtask Queue
 * Event Loop đẩy phần còn lại của main() vào Call Stack
 * console.log("result") được thực thi
 * await chỉ dừng function hiện tại, không block JS
 * 
 * Conclusion:
 * async/await là cú pháp bọc Promise giúp code dễ đọc và dễ bảo trì hơn.
 *await chỉ tạm dừng function hiện tại và không block Call Stack.
 *Bên dưới, async/await vẫn hoạt động dựa trên Promise và Event Loop.
 */