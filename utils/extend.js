// 简单的浅拷贝实现

// Object.assign = Object.assign || function (target, ...restObj) {
//   var from
//   var to
//   to = target

//   for (var i = 0, len = restObj.length; i < len; i++) {
//     from = restObj[i]
//     for (var prop in from) {
//       to[prop] = from[prop]
//     }
//   }
//   return to
// }


// var kjj = {}
// var zzx = {
//   name: "zzx",
//   info: {
//     age: 20
//   }
// }
// var lx = {
//   age: 20
// }
// Object.assign(kjj, zzx, lx)
// zzx.info.age = 30
// console.log(kjj)

