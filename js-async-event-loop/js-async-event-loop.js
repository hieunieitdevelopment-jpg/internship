/**
 * ==============================
 * JS Async & Event Loop Practice
 * ==============================
*/
console.log('1');
setTimeout(() => console.log('2'),0);
Promise.resolve().then(() => console.log('3'));
console.log('4');
// kết quả sẽ là 1,4,3,2
// 1 và 4: code đồng bộ sẽ chạy ngay, 3 promise(microtask): ưa tiên cao, 2 setTimeout (macrotask) chạy sau cùng.


/** 
 * ===========
 * Call Stack
 * ===========
*/
function f1(){

}
function f2(){

}
function f3(){

}

// Invoke the functions one by one
f1();
f2();
f3();

// f1() sẽ được đưa vào ngăn xếp, execute và output, sau đó f2() nó cũng làm tương tự và cuối cùng là function f3() sau đó ngăn xếp sẽ rỗng không còn gì để execute nữa

//vd khác 
function f1() {
}
function f2() {
  f1();
}
function f3() {
  f2();
}
f3();
//  f3()được đưa vào ngăn xếp, call một function f2(). Vì vậy, bây giờ f2()var được đưa vào bên trong trong khi biến còn lại f3()vẫn nằm trong ngăn xếp. f2()Hàm này call var f1(). Vì vậy, đã đến lúc f1()biến được đưa vào bên trong ngăn xếp cùng với cả biến f2()và f3()vẫn nằm bên trong.
//  f1()nó hoàn thành quá trình thực thi và được lấy ra khỏi ngăn xếp. Ngay sau khi quá trình đó f2()kết thúc, và cuối cùng là f3()

/**
 * callback bất đồng bộ
*/
setTimeout(() => console.log("hello hiếu"), 1000);

let ketqua = 0; 
for(let i = 0; i< 30000000; i++){
  ketqua = ketqua + i;
}
console.log(ketqua);
console.log("tạm biệt hiếu")
// => dẫy số, tạm biệt hiếu, sau 1s sẽ thực thi ra hello hiếu
/**
 * ==================================
 * Cách xử lý API trình duyệt/API web
 * ==================================
*/

function printMe() {
  console.log('print me');
}

setTimeout(printMe, 2000);
// function này setTimeoutthực thi một hàm khác sau khi một khoảng time nhất định trôi qua. Trong đoạn mã trên, văn bản print međược ghi vào bảng điều khiển sau độ trễ 2 giây.

/**
 * ===========================
 *Synchronous trong Javascript
 * ===========================
*/
console.log("Start")

for (let i=0; i<20; i++){
    console.log(i)
}
console.log("End")

//=> kết quả ( start 0 1 2 3 4 5 6 7 8 9 end)
// Step 1: câu lệnh console.log("Start") được push vào call stack, và sau đó pop ra ngoài
// Step 2: câu lệnh console.log(i) với giá trị i đầu tiên là 0 được push vào call stack và pop ra ngoài
// Step 3: câu lệnh console.log(i) với giá trị i = 1 được push vào call stack và pop ra ngoài
// Step 11: câu lệnh console.log(i) với giá trị i = 9 được push vào call stack và pop ra ngoài
// Step 12: câu lệnh console.log("End") được push vào call stack, và sau đó pop ra ngoài
//=> từ đay mới tháy, dòng lệnh console.log('end ) không hề được thực hiện cho đến khi vòng lặp được kết thúc 
// trong trường hợp nếu số vòng lặp 10,000 thì nó sẽ tạo ra blocking khiến các câu lệnh sau trong đó như consle.log("end") rất lâu mới thuccj hiện đucợ 

/**
 * =============================
 * Asynchronous trong Javascript
 * =============================
*/

console.log("Start")
 
setTimeout(()=>{
   console.log("Middle")
}, 1000)

console.log("End")// => Start End Middle
// Step 1: câu lệnh console.log("Start") được push vào call stack, và sau đó pop ra ngoài
// Step 2: câu lệnh setTimeout() được push vào call stack nhưng không được execute và lập tức được send sang WebAPIs để handle, lúc này WebAPIs sẽ chứa 1 timer 1000ms và một callback function và sau 1000ms, funtion này sẽ được send sang Callback Queue để chờ được handle
// Step 3: câu lệnh console.log("End") được push vào call stack, và sau đó pop ra ngoài
// Step 4: sau 1000ms, Event Loop check Callback Queue và thấy tồn tại callback, lúc này check thấy callstack đang trống nên nó push callback vào trong callstack và thực hiện handle
// sau 1000ms, Event Loop check Callback Queue và thấy tồn tại callback, lúc này check thấy callstack đang trống nên nó push callback vào trong callstack và thực hiện handle

/**
 * ========
 * Promise
 * ========
*/

const randomNumber = new Promise((resolve, reject) => {
  //một Promise object được tạo ra, một Promise object được tạo ra lúc này status là pending
   const url = 'https://www.random.org/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new';
   let request = new XMLHttpRequest();
   // tạo url, và object XMLHttpRequest
   

   request.open('GET', url);
   // cấu hình HTTP request.
   request.onload = function() {
      if (request.status == '200') {
         resolve(request.response);
      } else {
         reject(Error(request.statusText)); 
      }
   };
   //chỉ được đăng ký để browser gọi lại khi request hoàn tất hoặc lỗi.

   request.onerror = function() {
      reject(Error('Error fetching data.'));
   };

   request.send();
   // gửi HTTP request cho browser xử lý
   // Request chạy bên ngoài luồng JavaScript
   // JavaScript không chờ kết quả
   // execute function stop, status pending
});

randomNumber
    .then((res) => {
       console.log("Success");
       console.log("Random number: ", res);
    })
    .catch((err) => {
       console.log("Error: ", err.message);
    })

// JavaScript chỉ đăng ký callback sẽ chạy khi Promise được resolve hoặc reject.Chưa có callback nào được thực thi tại thời điểm này
// trong trường hơp thành công gọi onload nếu thất bại call onerror Bên trong các hàm này, resolve() hoặc reject() được gọi, làm Promise chuyển status từ pending sang fulfilled hoặc rejected.
// Sau khi Promise được resolve hoặc reject:callback trong .then() hoặc .catch() được đưa vào microtask queue, nhưng chưa chạy ngay
// khi call stack trống: Event Loop lấy callback từ microtask queue, đưa vào call stack để thực thi, lúc này then() or catch() mới chạy
// thành công randomn sô ngẫu nhiên, fail: error

/**
 * tính chất chain của promise
*/
doSomething()
    .then(result => doSomethingElse(result))
    .then(newResult => doThirdThing(newResult))
    .then(finalResult => {
          console.log(`Got the final result: ${finalResult}`);
     })
    .catch(failureCallback);

/**
 * ===========
 * Async await
 * ===========
*/

//Async/await giúp bạn chạy các promise 1 cách tuần tự:
const myFunc = async () => {  
   var result1 = await promise1();
   var result2 = await promise2(result1);
   var result3 = await promise3(result2);
}

// Async/await có thể sử dụng try catch như xử lí đồng bộ
const makeRequest = async () => {
  try {
    // this parse may fail
    const data = JSON.parse(await getJSON())
    console.log(data)
  } catch (err) {
    console.log(err)
  }
}

