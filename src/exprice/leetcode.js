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
