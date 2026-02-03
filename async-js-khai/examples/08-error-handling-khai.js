/**
 * File: 08-error-handling.js
 *
 * Mục đích:
 * - Xử lý lỗi trong Promise và async/await
 *
 * INPUT:
 * - asyncTask(true / false)
 *
 * PROCESS:
 * - resolve → then
 * - reject → catch
 *
 * OUTPUT:
 * Promise error: ERROR
 * Async/Await result: OK
 */

function asyncTask(success) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      if (success) {
        resolve("OK");
      } else {
        reject("ERROR");
      }
    }, 1000);
  });
}

// dùng Promise theo kiểu then/catch
asyncTask(false)
  .then(function (result) {
    console.log(result);
  })
  .catch(function (error) {
    console.log("Promise error:", error);
  });

// dùng async / await
(async function () {
  try {
    const result = await asyncTask(true);
    console.log("Async/Await result:", result);
  } catch (error) {
    console.log(error);
  }
})();
