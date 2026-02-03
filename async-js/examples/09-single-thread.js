/**
 * CASE: JavaScript single-thread
 *
 * Input:
 * - Hai function synchronous: taskA, taskB
 * - Mỗi function chỉ gồm các câu lệnh console.log
 * 
 * Expected Output:
 * A start
 * A end
 * B start
 * B end
 *
 * 
 * - js chỉ chạy 1 function tại một thời điểm khi taskA() chạy xong thì taskB() mới được chạy
 * 
 * * Lifecycle:
 * Step 1: JS load file và bắt đầu thực thi global code
 * Step 2: taskA() được push vào Call Stack
 * Step 3: taskA() chạy từng dòng và kết thúc
 * Step 4: taskA() bị pop khỏi Call Stack
 * Step 5: taskB() được push vào Call Stack
 * Step 6: taskB() chạy xong và bị pop khỏi Call Stack
 *
 * Conclusion:
 * - Tại một thời điểm chỉ có 1 function tồn tại trên Call Stack
 * - JS không thể chạy taskA và taskB song song
 * - Đây là lý do JS được gọi là single-thread
*/

function taskA() {
  console.log("A start");
  console.log("A end");
}

function taskB() {
  console.log("B start");
  console.log("B end");
}

taskA();
taskB();