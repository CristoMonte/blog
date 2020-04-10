---
title: my leetcode 题解
date: '2020-04-10'
spoiler: 一些关于leetcode解题的思路和学习
---

## 双指针
> 双指针主要用于遍历数组，两个指针指向不同的元素，从而协同完成任务，一般适用于在数组中寻找两个满足某种条件的指定元素这种类型的题目。

### 1 有序数组的Two Sum （easy）
  [力扣](https://leetcode-cn.com/problems/two-sum-ii-input-array-is-sorted/description/)

  ```jsx
    var twoSum = function (a, target) {
      let left = 0,
        // right直接使用index，在后面的代码中不容易混淆
        right = a.length - 1
      while (left <= right) {
        if (a[left] + a[right] === target) {
          return [left+1, right+1]
        } else if (a[left] + a[right] > target) {
          right--
        } else {
          left++
        }
      }
    }
  ```
### 2 两数的平方和(easy)
  [力扣](https://leetcode-cn.com/problems/sum-of-square-numbers/description/)
  ```jsx
    var judgeSquareSum = function (c) {
      let left = 0,
        // right直接使用Math.sqrt(c)开平方
        right = Math.floor(Math.sqrt(c))
      while (left <= right) {
        if (left * left + right * right = c) {
          return true
        } else if (left * left + right * right < c) {
          left++
        } else {
          right--
        }
      }
    }
  ```
###  3 反转字符串中的元音字符(easy)
  [力扣](https://leetcode-cn.com/problems/reverse-vowels-of-a-string/)
  反转可以通过双指针交换位置得到，这样反转的时间复杂度可以为O(lgn)
  ```jsx
    var reverseVowels = function (s) {
      // 大写字符也属于元音字母
      const vowels = ['a', 'e', 'o', 'i', 'u', 'A', 'E', 'O', 'I', 'U']
      let left = 0,
        right = s.length
      // 字符串的值确定之后不可以再更改
      // eg: var s = 'life' s[0] = '3' console.log(s) => 'life'
      s = s.split('')
      while (left <= right) {
        if (vowels.includes(s[left]) && vowels.includes(s[right])) {
            let t = s[left]
            s[left++] = s[right]
            s[right--] = t
        } else if (vowels.includes(s[left])) {
            right--
        } else if (vowels.includes(s[right])) {
            left++
        } else {
            left++
            right--
        }
      }
    }
  ```

  ### 4 验证回文字符串
  [力扣](https://leetcode-cn.com/problems/valid-palindrome-ii/)
  这题主要考虑的是可以删除一个字符，再验证是否是回文字符串。

  ```js
    // 在解决这道题目的时候学到的主要是解题思路，这个题目在解决的时候主要考虑的是特殊情况，从不相等的情况着手解决
    var validPalindrome = function(s) {
      let left = 0,
        right = s.length - 1
      while (left < right) {
        if (s[left] !== s[right]) {
          // 我自己在思考的时候，只想到了全局标识来判断这执行一次，没有想到过这种写法
          return isPalindrome(s, left, right - 1) || isPalindrome(s, left + 1, right)
        }
        left++
        right--
      }
      return true
    }
    // 双指针判断回文字
    function isPalindrome(s, left, right) {
      while(left < right) {
        if(s[left] !== s[right]) {
          return false
        }
        left++
        right--
      }
      return true
    }

  ```

### 5 归并两个有序数组
  [力扣](https://leetcode-cn.com/problems/merge-sorted-array/solution/)
这一题的两个指针分别在两个数组上，而不是在一个数组的两端；
遍历的时候需要从后往前遍历，这样不会覆盖未被遍历的值；
```jsx
  // m, n 分别指num1和num2的元素数量
  function merge(nums1, m, nums2, n) {
    let mIndex = m - 1
      nIndex = n -1
      mergeIndex = m + n - 1
    while (mIndex >= 0 || nIndex >= 0) {
      if (mIndex < 0) {
        nums1[mergeIndex--] = nums2[nIndex--]
      } else if (nIndex < 0) {
        nums1[mergeIndex--] = nums1[mIndex--]
      } else if (nums1[mIndex] < nums2[nIndex]) {
        nums1[mergeIndex--] = nums2[nIndex--]
      } else {
        nums1[mergeIndex--] = nums1[mIndex--]
      }
    }
    return nums1
  }
```

### 6 环形链表
  [力扣](https://leetcode-cn.com/problems/linked-list-cycle/)
这题主要有两种思路解决，哈希链表和快慢指针；
```jsx
var hasCycle = function (head) {
  // 先行判断head本身，否则后续的赋值会出现错误
  if (head === null) {
    return false
  }
  let l1 = head,
      l2 = head.next
  while (l1 !== null && l2 !== null && l2.next !== null) {
    if (l1 === l2) {
      return true
    }
    l1 = l1.next
    l2 = l2.next.next
  }
  return false
}
```

### 7 最长子序列
[力扣](https://leetcode-cn.com/problems/longest-word-in-dictionary-through-deleting/submissions/)
从一个字符串数组中找到给定字符串的最大子集，最大子集可以是通过删除给定字符串的某些字符得到的。
这题主要使用双指针判断目标字符串是否是给定字符串的子集。

```jsx
  var findLongestWord = function(s, d) {
    // 可以直接使用forEach循环遍历，也可以使用普通循环（for/while）
    let longestWord = ''
    d = d.sort().forEach((item) => {
        if (longestWord.length < item.length) {
            if (isSubstr(s, item)) {
                longestWord = item
            }
        }
    })
    // for (let i = 0; i < d.sort().length; i++) {
    // 这里学会了continue的使用方法，如果条件不符合，那么就直接执行i++继续循环，如果这里使用了break那么会直接退出循环体
    // 但是如果是使用continue，循环仍然继续，但是不会执行continue之后的代码了，而是直接执行了i++
    //     if (longestWord.length >= d[i].length) {
    //         continue
    //     }
    //     if (isSubstr(s, d[i])) {
    //         longestWord = d[i]
    //     }
    // }
    return longestWord
};

function isSubstr (s, target) {
    let i = 0,
        j = 0
    while(i < s.length && j < target.length) {
        if (s[i] === target[j]) {
            j++
        }
        i++
    }
    return j === target.length
}
```

以上7个题目都是属于双指针的典型用法，两个有序数组的排序，反转，回文，在有序目标中寻找两个满足条件的元素，快慢指针，判断是否是子集，这些类型的题目都可以通过双指针来实现。

## 排序
> 经典的排序算法： 快速排序，冒泡排序，堆排序，桶排序, 直接插入排序，希尔排序，归并排序...

### 1 数组中的第K个最大元素（堆排序）
堆排序的主要思想：
- 将未排序的元素构造成一个大顶堆
- 将第一个节点和最后一个节点交换位置，剩余节点（交换后的最后一个节点不参与）重新构造一个大顶堆
- 重复上述步骤
  [力扣](https://leetcode-cn.com/problems/kth-largest-element-in-an-array/)
```jsx
  var findKthLargest = function (nums, k) {
    if (!nums) return undefined
    if (k > nums.length || k < 0) return null
    nums = headSort(nums)
    return nums[nums.length - k]
  }
  function headSort(arr) {
    // 先构造大顶堆, 大顶堆从叶子节点开始构造
    // 二叉树的节点是从1开始，但是索引一般都是从0开始，所以一些表示上需要注意
    for(let i = Math.floor(nums.length / 2) - 1; i <= 0; i--) {
      arr = headAjust(arr, i, length)
    }

    // 将首节点和末尾节点交换，然后将剩余节点继续构造成大顶堆
    // 同样也是倒序遍历，由于之前已经将无序数组构造成了大顶堆，所以最后一个元素不需要参与
    for (let i = nums.length - 1; i > 0; i--) {
      swap(arr, 0, i)
      headAjust(arr, 0, i)
    }
    return arr
  }
  function swap (arr, a, b) {
    // object和函数是通过引用赋值来赋值/传递的
    // 所以这里的更改会直接更改到传递进来的数组本身
    let t = arr[a]
    arr[a] = arr[b]
    arr[b] = t
  }
  function headAjust(arr, i, length) {
    // 构建大顶堆的具体过程
    // 先构造最后一个大顶堆，依次往上，直至全部完成
    // 根据完全二叉树的特点，双亲节点的右子树的序号是2i + 1, 但是由于索引的特殊性，2i + 1是双亲节点的左子树
    for (let j = 2*i + 1; j < length; j = 2*j + 1) {
      let temp = arr[i]
      if (j + 1 < length && arr[j] < arr[j + 1]) {
        j++
      }
      if (arr[j] > temp) {
        swap(arr, i, j)
        // 这个很重要，这个思想也很重要，一次循环会把i节点一下的节点构建成大顶堆
        i = j
      } else {
        // 一次循环只要将i节点以下的节点构建成大顶堆就可以了，i节点以上的节点无法通过一次循环就完成，通过外层的循环就好了，所以这里是直接退出
        break
      }
    }
  }
```

### 2 出现频率最多的 k 个元素（计数排序/桶排序）
- 使用计数排序的时候需要注意的是，要避免解决数据元素是负数的情况
  [力扣](https://leetcode-cn.com/problems/top-k-frequent-elements/description/)
```jsx
var topKFrequent = function(nums, k) {
    if (nums.length <= 1) {
        return nums
    }
  // 先创建函数映射关系
  var obj = {}
  nums.forEach(item => {
    if (obj.hasOwnProperty(item)) {
      obj[item]++
    } else {
      obj[item] = 1
    }
  })
  var buckets = []
  for(let key in obj) {
    if (buckets[obj[key]]) {
      buckets[obj[key]].push(+key)
    } else {
      buckets[obj[key]] = []
      buckets[obj[key]].push(+key)
    }
  }
  var result = []
  for (let i = buckets.length - 1; i >= 0; i--) {
    if (result.length >= k) return result
    buckets[i] = buckets[i] || []
    for (let j = 0; j < buckets[i].length; j++) {
      if (result.length >= k) return result
      result.push(buckets[i][j])
    }
  }
}
```

###  3 根据字符出现频率排序(桶排序)
[力扣](https://leetcode-cn.com/problems/sort-characters-by-frequency/description/)
```jsx
var frequencySort = function(s) {
    if (!s || s.length <= 1) {
        return s
    }
    var obj = {}
    for (let i = 0; i < s.length; i++) {
        if (obj.hasOwnProperty(s[i])) {
            obj[s[i]]++
        } else {
            obj[s[i]] = 1
        }
    }
    let buckets = []
    for (let key in obj) {
       if(buckets[obj[key]]) {
           buckets[obj[key]].push(key)
       } else {
           buckets[obj[key]] = []
           buckets[obj[key]].push(key)
       }
    }
    let result = ''
    for (let i = buckets.length - 1; i >= 0; i--) {
       if (buckets[i]) {
           var index = -1
           while(++index < buckets[i].length) {
               var innerIndex = -1
               while(++innerIndex < i) {
                   result = result + buckets[i][index]
               }
           }
       } 
    }
    return result
};
```

## 荷兰国旗问题（多指针问题）
> 荷兰国旗问题包括三种颜色： 红，白，蓝，三色的小球需要按照正确的颜色顺序来排列，它其实是三向切分快使排序的变种，在三向切分快速排序中，每次都将数组分成三个区间，小于切分元素，等于切分元素，大于切分元素。
[力扣](https://leetcode-cn.com/problems/sort-colors/description/)
```jsx
function sortColor (nums) {
  let zero = 0
  let left = 0
  let right = nums.length - 1
  if (left <= right) {
    if (nums[left] === 0) {
      [nums[zero], nums[left]] = [nums[left], nums[zero]]
      zero++
      left++
    } else if (nums[left] === 2) {
      [nums[left], nums[right]] = [nums[right], nums[left]]
      right--
    } else {
      left++
    }
  }
  return nums
}
```

## 贪心思想
> 整体最优解可以由每一个子最优解得到

### 1 分发饼干
[力扣](https://leetcode-cn.com/problems/assign-cookies/description/)

```jsx
  function findContentChildren (g, s) {
    g = g.sort((next, prev) => next - prev)
    s = s.sort((next, prev) => next - prev)
    let gi = 0, si = 0
    while(gi < g.length && si < s.length) {
      if (g[gi] <= s[si]) {
        gi++
      }
      si++
    }
    return gi
  }
```

### 2 不重叠的区间个数