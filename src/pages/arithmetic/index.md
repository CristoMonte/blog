---
title: arithmetic knowledge
date: '2020-04-10'
spoiler: 总结在leetcode刷题的时候遇到的一些算法知识，主要作基本的指导说明用，具体案例可以查看leetcode题解
---

## 二分法查找(Binary Search)

- 二分查找也叫折半查找，是针对有序数组的一种查找方法；类似的还有插值查找和斐波那契查找；二分查找适合分布不均匀的数组，插值查找对于数量大，分布均匀的数组有着更高的优势；

- 二分查找的思想不难，但是写代码的适合，边界处理往往不是那么容易；对于不同的边界处理方式，这里说得很详细，[具体可以点击这里](https://www.zhihu.com/question/36132386)

```jsx
// 二分查找的原则就是，尽可能的缩小可查找的范围
function BinarySearch (array) {
  let left = 0
  let right = array.length
  while(left < right) {
    // mid = (left + right) / 2 , 但是采用这种写法，left + right可能会存在溢出
    // 位移的效率更高，而且位置是32为整数运算，也就是说，最后的结果一定是整数（才用向下取整）
    const mid = left + (right - left) >> 2
    if (/* 满足条件*/) {
      return left
    }
    if (some condition) {
      left = mid + 1
    } else {
      right = mid
    }
    return left
  }
}
```

## 排序

- 冒泡排序，选择排序，直接插入排序，希尔排序，归并排序，快速排序，堆排序，计数排序，桶排序

### 冒泡排序
> 冒泡排序是最简单的排序方法，重复遍历数组中的元素，将相邻的两个元素两两比较，如果两个元素排序错误就交换过来，直到所有元素排序全部正确。因为每一趟只能保证一个元素的位置是完全正确的，所有元素全部排序正确需要n趟，每趟排序都需要比较n次，时间复杂度是O(n^2), 属于稳定排序

```jsx
function bubbleSort (arr) {
  console.time('sort')
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i; j++) {
      if (arr[j] > arr[j+1]) {
        let temp = arr[j]
        arr[j] = arr[j + 1]
        arr[j + 1] = temp
      }
    }
  }
  console.timeEnd('sort')
  return arr
}
let array = [3,44,38,5,47,15,36,26,27,44,46,4,19,50,48]
// let array = [3, 2, 1, 4, 5, 6, 7, 8]
console.log(bubbleSort(array))


// 改进冒泡排序： 
// 例如数组: [3, 2, 1, 4, 5, 6, 7, 8]
// 数组后面的4， 5， 6， 7， 8是有序的，第一趟排序之后，需要排序的就只有前面的三个数字
// 所以每一趟排序之后都想办法记录这个值，这样能明显减少排序时间，提高排序效率

function bubbleSort2 (arr) {
  console.time('sort2')
  let i = arr.length - 1
  while(i >= 0) {
    let pos = 0
    for (let j = 0; j < i; j++) {
      if(arr[j] > arr[j + 1]) {
        let pos = j
        let temp = arr[j]
        arr[j] = arr[j + 1]
        arr[j + 1] = temp
      }
    }
    i = pos
  }
  console.timeEnd('sort2')
  return arr
}
console.log(bubbleSort(array))
```

### 选择排序
> 选择排序，从数组中找出最大/最小的元素，放置在头部/尾部，再从余下的数组中找到最大/最小的元素，放置在之前位置的相邻位置，是稳定排序，时间复杂度是O(n^2)

```jsx
function selectionSort (arr) {
  let i = arr.length - 1
  while (i > 0) {
    let maxIndex = 0
    for (let j = 0; j <= i; j++) {
      if (arr[j] > arr[maxIndex]) {
        maxIndex = j
      }
    }
    swap(arr, i, maxIndex)
    i--
  }
  return arr
}

function swap (arr, i, j) {
  let temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
}
let array = [3,44,38,5,47,15,36,26]
// let array = [3,44,38,5,47,15,36,26,27,44,46,4,19,50,48]
console.log(selectionSort(array))

// 使用双指针优化排序，同时查找最大元素和最小元素，最大元素排在末尾，最小元素排在头部
// 一趟排序两次交换真的很容易出现问题，很可能出现，本来就交换的元素，刚上被上一次交换给换走了位置
// 也可能出现，两次要交换的位置都是这两个，交换两次之后又回到了原来的样子，所以感觉一趟排序两次原地交换根本就行不通
// 至少下面的代码是根本行不通的，还没有想到解决方案，这个思想是很好的，现在已经不是双指针了，是同时需要维护四个指针
// 三个指针已经很难维护了，感觉同时维护4个指针几乎是不可能的
function selectionSort (arr) {
  let i = 0
  while(i < Math.ceil(arr.length / 2)) {
    let maxIndex = arr.length - 1 - i
    let right = arr.length - 1 - i
    let minIndex = i
    let left = i
    for (let j = left; j <= right; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j
      } else if (arr[j] > arr[maxIndex]) {
        maxIndex = j
      }
    }
    // 两次交换非常容易出现问题
    swap(arr, right, maxIndex)
    swap(arr, left, minIndex)
    console.log(arr)
    i++
  }
  return arr
}
```
### 直接插入排序
> 将未排序的元素插入到已排序的元素中合适的位置，稳定排序
```jsx
function insertionSort (arr) {
  console.time('insertion sort')
  let preIndex, current
  for (let i = 0; i < arr.length; i++) {
    current = i
    preIndex = current - 1
    while(preIndex >= 0) {
      if (arr[preIndex] > arr[current]) {
        [arr[preIndex], arr[current]] = [arr[current], arr[preIndex]]
        current = preIndex
      }
      preIndex--
    }
  }
  console.timeEnd('insertion sort')
  return arr
}

var array = [10, 9 ,8 ,7, 6, 5, 4, 3, 2, 1];
// var array = [3,44,38,5,47,15,36,26,27,44,46,4,19,50,48];
console.log(insertionSort(array));
```

### 希尔排序
> 希尔排序是改进版的插入排序，插入排序跨度单位是1，如果最小元素刚好在最末尾，那么要使这个元素找到正确的位置就要经历n次比较, 改进后的希尔排序将将据以跨度分组，先将组内的数据排序，然后逐渐缩小跨度，直到将所有的元素排序完成。前面的分组排序能明显将较小的元素排在前面，到最后跨度变成1的时候，每个元素到底正确位置的时间会小很多

```jsx 
function shellSort (arr) {
  console.time('shell sort')
  for (let gap = Math.floor(arr.length / 2); gap > 0; gap = Math.floor(gap / 2)) {
    for (let i = gap; i < arr.length; i++) {
      let current = i
      preIndex = current - gap
      while(preIndex >= 0 && arr[preIndex] > arr[current]) {
          [arr[preIndex], arr[current]] = [arr[current], arr[preIndex]]
          current = preIndex
          preIndex = preIndex - gap
      }
    }
  }
  console.timeEnd('shell sort')
  return arr
}

var array = [10, 9 ,8 ,7, 6, 5, 4, 3, 2, 1];
// var array = [3,44,38,5,47,15,36,26,27,44,46,4,19,50,48]
console.log(shellSort(array))
```

### 快速排序
> 快速排序，先找到一个标志，将要排序数组以标志元素分成左右两部分，然后再将左右两部分的数据按照同样的方法排序。
```jsx
function quickSort(nums, l, h) {
  // 找到递归结束的条件
  if (l < h) {
    let index = partition(nums, l, h)
    quickSort(nums, l, index - 1)
    quickSort(nums, index + 1, h)
  }
  return nums
}

function partition (nums, l, h) {
  let pivot = l
  // 一定要从右边开始，注意顺序
  while (l < h) {
    while (l < h && nums[h] >= nums[pivot]) {
      h--
    }
    while (l < h && nums[l] <= nums[pivot]) {
      l++
    }
    swap(nums, l, h)
  }
  // 将标志位复原
  swap(nums, pivot, l)
  return l
}

function swap (nums, i, j) {
  const temp = nums[i]
  nums[i] = nums[j]
  nums[j] = temp
  return nums
}
var arr=[3,44,38,5,47,15,36,26,27,2,46,4,19,50,48]
console.log(quickSort(arr, 0, arr.length - 1))
```

### 堆排序
> 先将待排序数组构造成一个大顶堆，将堆定元素和末位元素交换，再将剩余元素重新构造成一个大顶堆，将大顶堆的堆顶元素和倒数第二个元素交换...重复上述过程。当然，选择大顶堆和小顶堆都是可以的

```jsx
function headSort(nums) {
  // 先构建大顶堆
  for(let i = Math.floor(nums.length) - 1; i >= 0; i--) {
      headAjust(nums, i, nums.length)
  }
  
  // 替换当前大顶堆的顶点和最后一个节点，再将剩下的节点重新构建大顶堆
  for (let i = nums.length - 1; i > 0; i--) {
      swap(nums, 0 , i)
      headAjust(nums, 0, i)
  }
  return nums
}

function swap (nums, i, j) {
  const temp = nums[i]
  nums[i] = nums[j]
  nums[j] = temp
  return nums
}

function headAjust (nums, i, length) {
  for(let j = 2*i+1; j < length; j = 2*j+1) {
    const temp = nums[i]
    if (j + 1 < length && nums[j] < nums[j + 1]) {
      j = j + 1
    }
    if (nums[j] > nums[i]) {
      swap(nums, i, j)
      i = j
    }
  }
  return nums
}
```

### 计数排序

## 贪心思想
贪心思想指在解决问题时，总是采用当下最优解；贪心思想没有固定的算法框架，算法设计的关键时贪心策略的选择。但是要注意的时，局部的最优解合起来不一定就是整体的最优解，所有能够使用贪心算法需要具备一定的条件：
1 整个问题能够划分成不同的子问题；
2 整体最优解能够通过局部最优解组合而成；

贪心算法的基本思路：

- 建立数学模型来描述问题；

- 把求解的问题分成若干个子问题；

- 对每个子问题求解，得到每个子问题的最优解；

- 将子问题的最优解合并称为一个解，得到最优解；
