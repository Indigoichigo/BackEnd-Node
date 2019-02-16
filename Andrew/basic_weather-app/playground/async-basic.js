// // 執行順序1
// console.log('starting app');

// // 執行順序4
// setTimeout(() => {
//   console.log('Inside of Callback');
// }, 2000);

// // 執行順序3
// setTimeout(() => {
//   console.log('Second of Callback');
// }, 0);

// // 執行順序2
// console.log('Finishing up');

let total = 1;

for (let i = 0; i <= 1000000; i++) {
  total += i;
}

console.log(total);

setTimeout(() => {
  console.log('setTimeout');
}, 0);
