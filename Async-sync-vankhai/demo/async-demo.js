console.log("Start");

setTimeout(() => {
  console.log("setTimeout callback");
}, 0);

Promise.resolve().then(() => {
  console.log("Promise then");
});

async function demoAsync() {
  console.log("Inside async function");
  await new Promise(resolve => setTimeout(resolve, 1000));
  console.log("After await");
}

demoAsync();

console.log("End");
