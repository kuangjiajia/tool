function repeat(target, n) {
  //二分法 提高效率
  var s = target, total = ""
  while (n > 0) {
    if (n % 2 == 1)
      total += s
    if (n === 1)
      break
    s += s
    n = n >> 1
  }
  return total
}

console.log(repeat("kjj ", 11))