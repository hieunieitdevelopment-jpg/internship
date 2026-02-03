/**
 * CASE 1: BLOCKING (Synchronous - Blocking)
 *
 * Input:
 * - Một vòng while chạy lâu
 *
 * Expected Output:
 * start
 * (đợi ~3s)
 * end
 *
 * => Trong lúc while chạy, JS KHÔNG làm được việc gì khác
*/
console.log("start");

const startTime = Date.now();
while (Date.now() - startTime < 3000) {
}

console.log("end");

/**
 * Lifecycle giải thích:
 * console.log("start"); được execute ngay
 * tiếp theo đến vong lặp while và đưa vào stack
 * vòng lặp này sẽ diễn ra khá lâu, trong lúc này không thể handle các job khác
 * sau khi vòng lặp kết thúc thì mới execute
 * 
 * 
 * Conclusion:
 * Với **blocking code**, Call Stack bị chiếm trong time dài, không thể execute các task khác.
 */