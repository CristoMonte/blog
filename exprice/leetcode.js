// 通过二分法来求第k个元素
function findKthEle(arr1, arr2, k) {
  var l1 = arr1 && arr1.length;
  var l2 = arr2 && arr2.length;
  if (k < 1 || k > l1 + l2) {
    return;
  }
  var left = Math.max(0, k - l2);
  var right = Math.min(l1, k);
  while (left < right) {
    var mid = left + ((right - left) >> 1);
    if (arr2[k - mid - 1] > arr1[mid]) {
      left = mid + 1;
    } else {
      // 代码来到这个地方，其实证明已经找到了正确的答案
      // 那我感觉这个代码根本不是利用了二分法
      right = mid;
    }
  }
  arr1Left = left === 0 ? -Infinity : arr1[left - 1];
  arr2Left = left === k ? -Infinity : arr2[k - left - 1];
  return Math.max(arr1Left, arr2Left);
}
console.log(findKthEle([1, 3, 5], [2, 4, 5, 6, 7], 8));

function findMedianSortedArrays(arr1, arr2) {
  const l1 = arr1.length;
  const l2 = arr2.length;
  if ((l1 + l2) % 2) {
    return findKthEle(arr1, arr2, (l1 + l2) >> 1);
  } else {
    console.log((l1 + l2) >> 1);
    console.log(((l1 + l2) >> 1) + 1);
    return (
      (findKthEle(arr1, arr2, (l1 + l2) >> 1) +
        findKthEle(arr1, arr2, ((l1 + l2) >> 1) + 1)) /
      2
    );
  }
}
console.log(findMedianSortedArrays([1, 3, 5], [2, 4, 5, 6, 7]));

/**
 * @param {number} dividend
 * @param {number} divisor
 * @return {number}
 */
var divide = function(dividend, divisor) {
  // 先确定符号和规定范围
  const isPositive = dividend > 0 === divisor > 0;
  const MAX_SIZE = Math.pow(2, 31);
  let res = divideCore(Math.abs(dividend), Math.abs(divisor));
  if (res >= MAX_SIZE) {
    return isPositive ? MAX_SIZE - 1 : MAX_SIZE * -1;
  } else if (res === 0) {
    return 0;
  } else {
    return isPositive ? res : -1 * res;
  }
};

function divideCore(dividend, divisor) {
  if (dividend === 0 || dividend < divisor) {
    return 0;
  }
  if (divisor === 1) {
    return dividend;
  }
  if (dividend === divisor) {
    return 1;
  }
  let left = 1,
    right = dividend;
  count = binarySearch(dividend, divisor);
  console.log(count, 'count');
  console.log(2 << count, 'divisor << count');
  console.log(dividend - (divisor << count) - divisor, 'dsdsdsd');
  if (dividend - (divisor << count) - divisor > divisor) {
    count += binarySearch(dividend - (divisor << left), divisor);
  } else {
    const res = dividend - (divisor << left) - divisor > 0 ? 1 : 0;
    // 右移1位代表被除数乘以2
    return count + 1 + res;
  }
}

function binarySearch(dividend, divisor) {
  let left = 1,
    right = dividend > 31 ? 31 : dividend;
  while (left < right) {
    const mid = left + ((right - left) >> 1);
    // 当 mid 超级大的时候，使用位移运算存在问题
    // 2 << 1073741824 => 2
    const divisorTemp = divisor << mid;
    console.log(divisorTemp, 'divisorTemp');
    if (dividend <= divisorTemp + divisor) {
      return left;
    }
    if (dividend < divisorTemp) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }
  console.log(left);
  return left;
}

console.log(divide(2147483647, 2));

// 使用hashMap来实现查找
var intersection = function(nums1, nums2) {
  let tempArray = [];
  for (let i = 0; i < nums1.length; i++) {
    tempArray[nums1[i]] = nums1[i];
  }
  let result = [];
  for (let j = 0; j < nums2.length; j++) {
    if (tempArray[nums2[j]] !== undefined) {
      result.push(nums2[j]);
      // 这一步保证唯一值
      tempArray[nums2[j]] = undefined;
    }
  }
  return result;
};
console.log(intersection([1, 2, 2, 1, 0], [2, 2, 0, 0]));

var lengthOfLongestSubstring = function(s) {
  if (typeof s !== 'string') return;
  var str = '',
    index = -1,
    len = s.length,
    letter,
    maxLong = 0,
    _index;
  while (++index < len) {
    letter = s[index];
    _index = str.indexOf(letter);
    if (_index > -1) str = str.slice(_index + 1);
    str += letter;
    console.log(str, 'str +');
    maxLong = Math.max(maxLong, str.length);
  }
  return maxLong;
};
console.log(lengthOfLongestSubstring('hehpwall'));
console.log(lengthOfLongestSubstring('hehpwell'));
console.log(lengthOfLongestSubstring('jiandshd'));
console.log(lengthOfLongestSubstring(''));
console.log(lengthOfLongestSubstring(' '));
console.log(lengthOfLongestSubstring('abcabc'));

// 一下这些题目我暂时不知道分配在哪一个目录之下，暂时晾在这
// ###  1  无重复字符的最长子串

// 给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。

// 示例 1:

// 输入: "abcabcbb"
// 输出: 3
// 解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
// 示例 2:

// 输入: "bbbbb"
// 输出: 1
// 解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。
// 示例 3:

// 输入: "pwwkew"
// 输出: 3
// 解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
//      请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。

// mycode: timeout 4728ms
// ```js
//  /**
//  * @param {string} s
//  * @return {number}
//  */
// var lengthOfLongestSubstring = function(s) {
//     if (!s.length) {
//         return 0
//     }
//     if (s.length === 1) {
//         return 1
//     }
//    let result = [],
//        len = s.length,
//        str = ''
//    for (let i = 0; i < len; i++) {
//        if (str) result.push(str)
//        for (let j = 0; j <= len; j++) {
//            str = s.slice(i, j)
//            if (str.includes(s[j])) {
//                break
//            }
//        }
//    }
//     result = result.sort((next, current) => current.length - next.length)
//     return result[0] && result[0].length
// };
// ```
// some excellent code: timeout 96ms
// ```js
//  * @param {string} s
//  * @return {number}
//  */
// var lengthOfLongestSubstring = function(s) {
//   if (typeof s !== 'string') return
//   var str = '', index = -1, len = s.length, letter, maxLong = 0, _index
//   while(++index < len) {
//     letter = s[index]
//     _index = str.indexOf(letter)
//     if (_index > -1) str = str.slice(_index + 1)
//     str += letter
//     maxLong = Math.max(maxLong, str.length)
//   }
//   return maxLong
// };
// lengthOfLongestSubstring('jiandshd')
// lengthOfLongestSubstring('')
// lengthOfLongestSubstring(' ')
// lengthOfLongestSubstring('abcabc')
// ```

// [解题思路](https://github.com/azl397985856/leetcode/blob/master/problems/3.longestSubstringWithoutRepeatingCharacters.md)

// 个人收获：
// 1 最简单最粗暴的方法肯定是两层for循环，也就是我一开始的思路去实现，和后面的方法差距之大，从时间上就可以体现出来
// 2 通过维护一个滑动窗口来找到最大特异性字符串，窗口中出现了重复的字符串，窗口就往后移动一个位置；

// ### 2 有效的括号

// 给定一个`只包括` '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效

// 有效字符串需满足：

// 左括号必须用相同类型的右括号闭合。
// 左括号必须以正确的顺序闭合。
// 注意空字符串可被认为是有效字符串。
// ```jsx
// '([{}])' // true
// '{[}]' // false
// ']' // false
// ```

// 解析思路

// ```jsx

// function isValid(s) {
//     let stack = []
//     let map = new Map([['(', ')'], ['[', ']'], ['{', '}']])
//     // let mapper = {
//     //     '(': ')'.
//     //     '[': ']',
//     //     '{': '}'
//     // }
//     for(let i = 0; i < s.length; i++) {
//         // 右括号
//         if (!map.get(s[i])) {
//             if (stack.length === 0) {
//                 return false
//             }
//             if (map.get(stack.pop()) !== s[i]) {
//                 return false
//             }
//         } else {
//             // 左括号
//             stack.push(s[i])
//         }
//     }
// }
// ```

// [解题思路](https://github.com/azl397985856/leetcode/blob/master/problems/20.validParentheses.md)

// 个人收获：
// 1 本题利用了栈先进后出的特点，javascript中没有现成的栈结构，所有使用数组push和pop来模拟；
// 2 审题要清晰
// 3 这个题目使用map还是对象，差别都不是很大。

// ### 3 使用二分法实现findIndex
// 1 要求使用二分法
// 2 数组是已经排好序的数组

// ```js
// const findIndex = function (array, value) {
//   var first = 0
//   var last = array.length - 1
//   while(first < last) {
//     let mid = Math.floor((first + last) / 2)
//     if (array[mid] === value) {
//       return mid
//     } else if (array[mid] < value) {
//       first = mid + 1
//     } else {
//       last = mid
//     }
//   }
//   return array[first] === value ? first : -1
// }
// ```

// 以上是我自己的实现，下面是更好的实现
// [参考资料](https://github.com/julycoding/The-Art-Of-Programming-By-July/blob/master/ebook/zh/04.01.md)

// ```js
// function findIndex (array, value) {
//   let left = 0
//   // 如果这里是length - 1 的话，下面的条件也需要改成left <= right; right = mid -1
//   let right = array.length
//   while (left < right) {
//     //防止溢出，移位也更高效。同时，每次循环都需要更新。
//     // 右移一位相当于除2，同时向下取整
//     let mid = left + ((right - left) >> 1)
//     if (array[mid] < value) {
//       left = mid + 1
//     } else if (array[mid] > value) {
//       right = mid
//     } else {
//     //如果每次循环都判断一下是否相等，将耗费时间，数组中不相等的情况更多
//       return mid
//     }
//   }
//   return -1
// }
// ```

// 个人收获：
// 1 移位，能防止溢出，也更加高效
// 2 二分查找的区间，是左闭右开还是左闭右闭需要在每次循环的时候初始化，范围，循环终止条件，这三者都需要保持一致，不然程序就会出错
// 3 对应条件
//   - `right = length; left < right; right = mid`
//   - `right = length -1; left <= right; right = mid - 1`

// 4 二分查找是针对有序数组查找特定某个元素的搜索算法；

// ### 4 合并两个有序链表

// 将两个有序链表合并为一个新的有序链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的

// 解题思路
// ```js
// function mergeTwoLists (l1, l2) {
//   if (!l1) {
//     return l2
//   } else if (!l2) {
//     return l1
//   } else if (l1.val < l2.val) {
//     l1.next = mergeTwoLists(l1.next, l2)
//     return l1
//   } else {
//     l2.next = mergeTwoLists(l1, l2.next)
//     return l2
//   }
// }
// ```

// 个人收获：
// 1 栈是一个先进后出的压入push和弹出pop式数据结构；队列是一个先进先出的压入push和挤出shift式数据结构；
// 2 [递归调用](https://blog.csdn.net/qiujunchao/article/details/)

// ### 5 利用二分查找来实现在两个有序链表中找到第k个元素

// ### 6 求两个数组的交集（hashMap）

// 利用了哈希表存储来实现查找，哈希表存储结构在去重，求交集的时候具有很大的优势，虽然是以空间换时间的做法，但数据中有非常大的数字的时候，对于空间的浪费很大，但是只是小的数字的时候，是可取的。

// ```jsx
//   function intersection (arr1, arr2) {
//     let tempArr = []
//     for (let i = 0; i < arr1.length; i++) {
//       tempArr[arr1[i]] = arr1[i]
//     }
//     let result = []
//     for (let j = 0; j < arr2.length; j++) {
//       if (tempArr[arr1[j]] !== undefined) {
//         result.push(arr1[j])
//         // 当在第二个数组中找到了重复元素的时候，就要在数组当中删除，这是保证之后结果中唯一性的关键
//         tempArr[arr1[j]] = undefined
//       }
//     }
//   }
// ```
