function isArray(arr) {
  return arr instanceof Array
}

function isNaN(obj) {
  return obj !== obj
}

function isNull(obj) {
  return obj === null
}

function isUndefined(obj) {
  return obj === void 0
}

function isPlainObject(obj) {
  return typeof obj === "object" && Object.getPrototypeOf(obj) === Object.prototype
}

function isWindow(obj) {
  return obj !== null && obj === obj.window
}