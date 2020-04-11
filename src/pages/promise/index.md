---
title: 动手实现一个promise
date: '2019-11-07'
spoiler: 动手实现一个简易的promise
---

### 实现前的思考
- promise具有三个状态, pending, resolved, rejected
- promise是thenable的
- 链式调用
- 链式调用回调函数的返回可以是基本类型，对象，函数甚至是一个promise

### 代码实现

```jsx
const myPromise = function (constructor) {
  let status = 'pending'
  let value = null
  let reason = null
  // 使用订阅者模式来解决异步任务的执行
  let onFullfilledArray = []
  let onRejectedArray = []
  let resolve = value => {
    if (this.status === 'pending') {
      this.value = value
      this.status = 'resolved'
      this.onFullfilledArray.forEach(f => f(this.value))
    }
  }
  let reject = reason => {
    if (this.status === 'pending') {
      this.value = value
      this.status = 'resolved'
      this.onRejectedArray.forEach(f => f(this.reason))
    }
  }
  try{
    constructor(resolve, reject)
  }catch (error) {
    reject(error)
  }
}
myPromise.prototype.then = function (onFullfiled, onRejected) {
  let promise = null
  switch(this.status) {
    case 'pending':
      promise = new myPromise((resolve, reject) => {
        this.onFullfilledArray.push(() => {
          // 使用setTimeout防止阻塞后面的代码执行
          setTimeout(() => {
            try{
              let temp = onFullfiled(this.value)
              resolvePromise(promise, temp, resolve, reject)
            }catch (e) {
              reject(e)
            }
          })
        })
        this.onRejectedArray.push(() => {
          setTimeout(() => {
            try{
              let temp = onRejected(this.reason)
              resolvePromise(promise, temp, resolve, reject)
            }catch (e) {
              reject(e)
            }
          })
        })
      })
      break
    case 'resolved':
      promise = new Promise((resolve, reject) => {
        setTimeout(() => {
          try{
            let temp = onFullfilled(this.value)
            resolvePromise(promise, temp, resolve, reject)
          }catch(e) {
            reject(e)
          }
        })
      })
      break
    case 'rejected':
      promise = new Promise((resolve, reject) => {
        setTimeout(() => {
          try{
            let temp = onRejected(this.reason)
            resolvePromise(promise, temp, resolve, reject)
          }catch(e) {
            reject(e)
          }
        })
      })
      break
    default:
      break
  }
  return promise
}
// then链式调用的时候，上一个then回调返回的可以是一个对象，函数甚至是一个新的promise
function resolvePromise (promise, x, resolve, reject) {
  // 如果返回的promise就是当前的promise，就返回一个TypeErr
  if(promise === x) {
    throw new TypeError("type error")
  }
  let isUsed = false
  if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
    try{
      if(typeof x.then === 'function') {
        // 如果返回的是一个promise
        let then = x.then
        then.call(x, value => {
          if (isUsed) return
          isUsed = false
          resolvePromise(promise, value, resolve, reject)
        }, e => {
          reject(e)
        })
      } else {
        // 一个普通的函数或者对象，直接resolve即可
        if (isUsed) return
        isUsed = false
        resolve(x)
      }
    } catch(e) {
      reject(e)
    }
  } else {
    // 返回的基本类型，直接resolve
    resolve(x)
  }
} 
```

### 收获了什么

  - 对不同的状态需要不同处理，对于异步任务需要在pending状态的时候

参考资料:
- [实现一个完美符合Promise/A+规范的Promise](https://github.com/YvetteLau/Blog/issues/2)
- [Promise的源码实现（完美符合Promise/A+规范](https://github.com/forthealllight/blog/issues/4)

