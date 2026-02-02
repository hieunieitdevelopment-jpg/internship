console.log("===== SYNCHRONOUS =====");

function syncTask(name) {
  console.log("Start sync task:", name);
  for (let i = 0; i < 1e7; i++) {}
  console.log("End sync task:", name);
}

syncTask("Task 1");
syncTask("Task 2");

console.log("\n===== ASYNC setTimeout =====");

console.log("Start");

setTimeout(() => {
  console.log("setTimeout callback");
}, 0);

console.log("End");

console.log("\n===== CALLBACK =====");

function fetchDataCallback(callback) {
  console.log("Fetching data with callback...");
  setTimeout(() => {
    callback(null, { id: 1, name: "Khai" });
  }, 1000);
}

fetchDataCallback((err, data) => {
  if (err) {
    console.log("Error:", err);
    return;
  }
  console.log("Callback result:", data);
});

console.log("\n===== PROMISE =====");

function fetchDataPromise() {
  return new Promise((resolve, reject) => {
    console.log("Fetching data with promise...");
    setTimeout(() => {
      resolve({ id: 2, name: "Async JS" });
    }, 1000);
  });
}

fetchDataPromise()
  .then((data) => {
    console.log("Promise then:", data);
  })
  .catch((err) => {
    console.log("Promise catch:", err);
  })
  .finally(() => {
    console.log("Promise finished");
  });

console.log("\n===== MICROTASK vs MACROTASK =====");

console.log("Script start");

setTimeout(() => {
  console.log("Macrotask: setTimeout");
}, 0);

Promise.resolve().then(() => {
  console.log("Microtask: Promise.then");
});

console.log("Script end");

console.log("\n===== ASYNC / AWAIT =====");

function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  }, ms);
}

async function demoAsync() {
  console.log("Inside async function");

  await delay(1000);
  console.log("After await 1s");

  await delay(500);
  console.log("After await 0.5s");

  return "Async done";
}

demoAsync().then((res) => {
  console.log(res);
});

console.log("\n===== ERROR HANDLING =====");

function errorPromise() {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject("Something went wrong");
    }, 500);
  });
}

async function handleError() {
  try {
    await errorPromise();
  } catch (err) {
    console.log("Caught error:", err);
  }
}

handleError();

console.log("\n===== END =====");
