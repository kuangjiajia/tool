//emmmm..... 太久没写promise了，再复习一下



new Promise((resolve, reject) => {
  console.log("resolve")
  resolve(123)
}).then(res => {

})

const PENDING = Symbol("PENDING")
const RESOLVE = Symbol("RESOLVE")
const REJECT = Symbol("REJECT")

class Promise {
  constructor(exec) {
    this.status = PENDING
    this.val = null
    this.reason = null
    //resolve
    this.onFulfilledCallbacks = []
    //reject
    this.onRejectedCallbacks = []
    const resolve = v => {
      if (v instanceof Promise) {
        v.then(resolve, reject)
      }
      setTimeout(() => {
        if (this.status === PENDING) {
          this.status = RESOLVE
          this.val = v
          this.onFulfilledCallbacks.forEach(cb => {
            cb(this.v)
          })
        }
      })
    }
    const reject = r => {
      setTimeout(() => {
        if (r.status === PENDING) {
          this.status = REJECT
          this.reason = r
          this.onRejectedCallbacks.forEach(cb => {
            cb(this.reason)
          })
        }
      })
    }
    try {
      exec(resolve, reject)
    } catch (e) {
      reject(e)
    }
  }
  then(onFulFilled, onRejected) {
    let newPromise
    onFulFilled = typeof onFulFilled === "function" ? onFulFilled : v => v
    onRejected = typeof onRejected === "function" ? onRejected : e => { throw e }
    if (this.status === RESOLVE) {
      newPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
          try {
            let x = onFulFilled(this.val)
            resolvePromise(newPromise, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      })
    } else if (this.status === REJECT) {
      newPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason)
            resolvePromise(newPromise, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      })
    } else if (this.status === PENDING) {
      newPromise = new Promise((resolve, reject) => {
        this.onFulfilledCallbacks.push(v => {
          try {
            let x = onFulfilled(v);
            resolvePromise(newPromise, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        })

        this.onRejectedCallbacks.push(r => {
          try {
            let x = onRejected(r)
            resolvePromise(newPromise, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })

      })
    }
    return newPromise
  }
}


function resolvePromise(promise2, x, resolve, reject) {
  if (x === promise2) {
    reject(new TypeError('循环引用'));
  }
  if (x instanceof AjPromise) {
    if (x.state === PENDING) {
      x.then(
        y => {
          resolvePromise(promise2, y, resolve, reject);
        },
        reason => {
          reject(reason);
        }
      );
    } else {
      x.then(resolve, reject);
    }
  } else if (x && (typeof x === 'function' || typeof x === 'object')) {
    let called = false;
    try {
      let then = x.then;
      if (typeof then === 'function') {
        then.call(
          x,
          y => {
            if (called) return;
            called = true;
            resolvePromise(promise2, y, resolve, reject);
          },
          r => {
            if (called) return;
            called = true;
            reject(r);
          }
        );
      } else {
        resolve(x);
      }
    } catch (e) {
      if (called) return;
      called = true;
      reject(e);
    }
  } else {
    resolve(x);
  }
}
