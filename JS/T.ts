// 数组->最小值

// function getMinArray(arr) {
//   let minArr = arr[0]
//   for(let i = 0; i<arr.length; i++) {
//     if (minArr > arr[i]){
//       minArr = arr[i]
//     }
//   }
//   return minArr
// }
// console.log(getMinArray([1,3,4,22,2]))

// function getMinArray(arr:number[]):number {
//   let min = arr[0]
//   arr.forEach(v => {
//     if(min > v) {
//       min = v
//     }
//   }) 
//   return min
// }
// console.log(      getMinArray([1,3,4,22,2])        )

// 字符串->最小值
// function getMinString(arr:string[]):string {
//   let min = arr[0]
//   arr.forEach(v => {
//     if (min > v) {
//       min = v
//     }
//   })
//   return min
// }
// console.log(        getMinString(['a','c','A','b'])        )

// function getMin<T>(arr:T[]):T{
//   let min = arr[0]
//   arr.forEach(v => {
//     if(min > v){
//       min = v
//     }
//   })
//   return min
// }

// console.log('%c最小值是:','color:red', getMin([ 3, 4, 22, 2]))


// function Fn<T>(arg: T) :T{
//   return arg
// }

// var fn1 = Fn(123)
// var fn2 = Fn('abc')

class GetMin <T>{
  arr: T[] = [];
  add(ele: T) {
    this.arr.push(ele)
  }
  min(): T {
    let min = this.arr[0]
    this.arr.forEach(v => {
      if (v < min) {
        min = v
      }
    })
    return min
  }
}

let getMinNumber = new GetMin<number>()
getMinNumber.add(1)
getMinNumber.add(4)
getMinNumber.add(8)
getMinNumber.min()


interface Len{
  length: number
}
function fn<T extends Len>(arg: T): T {
  console.log(arg.length)
  return arg
}
fn('pdeng')