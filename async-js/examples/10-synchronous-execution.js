/**
 * CASE: Synchronous Execution in JavaScript
 *
 * Input:
 * - Hai function synchronous
 * - first() gọi second() bên trong
 *
 * Mục tiêu:
 * - Thấy rõ cơ chế push / pop của Call Stack
 * - Hiểu vì sao function bên trong phải chạy xong trước
 *
 * Expected Output:
 * first start
 * second
 * first end
 */

/**
 * Function first
 * - Là function được gọi đầu tiên
 * - Bên trong gọi function second
 */
function first() {
  console.log("first start");

  // Khi gặp dòng này, JS PHẢI chạy second() trước
  second();

  // Dòng này chỉ chạy sau khi second() kết thúc
  console.log("first end");
}

/**
 * Function second
 * - Được call từ bên trong first()
 * - Phải run xong thì JS mới quay lại first()
 */
function second() {
  console.log("second");
}

// Entry point của chương trình
first();

/**
 * Lifecycle giải thích:
 *
 * 1. JS load file và create global execution context
 * 2. Gặp first() đưa push first() vào Call Stack
 * 3. Trong lúc first() đang run, nó gặp second() nên JS phải push second() lên stack và chạy nó trước.
 * 4. Sau khi second() chạy xong thì nó bị pop khỏi stack.
 * 5. Lúc đó JS quay lại tiếp tục thực thi phần còn lại của first().
 * 6. Khi first() chạy xong thì nó cũng bị pop khỏi stack.”
 *
 * Conclusion:
 * - Đây là synchronous execution
 * - Function bên trong phải chạy xong trước
 * - Call Stack hoạt động theo cơ chế LIFO
 * - Không có chạy song song
 */