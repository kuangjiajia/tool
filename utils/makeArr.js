// Array.prototype.slice.call(0,)

function makeArr(obj) {
  var arr = []
  if (obj !== null) {
    var len = obj.length
    if (len === null || typeof obj === "string" || obj instanceof Function)
      arr[0] = obj
    else
      while (len) {
        arr[--len] = obj[len]
      }
  }
  return arr
}

var arr = makeArr("1")
console.log(arr)
var arr2 = makeArr({
  "0": 1,
  "1": 2,
  "2": 3,
  "length": 3
})
console.log(arr2)