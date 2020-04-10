function quickSort(nums, l, h) {
  // 找到递归结束的条件
  if (l < h) {
    let index = partition(nums, l, h);
    quickSort(nums, l, index - 1);
    quickSort(nums, index + 1, h);
  }
  return nums;
}

function partition(nums, l, h) {
  let pivot = l;
  // 一定要从右边开始，注意顺序
  while (l < h) {
    while (l < h && nums[h] >= nums[pivot]) {
      h--;
    }
    while (l < h && nums[l] <= nums[pivot]) {
      l++;
    }
    swap(nums, l, h);
  }
  // 将标志位复原
  swap(nums, pivot, l);
  return l;
}

function swap(nums, i, j) {
  const temp = nums[i];
  nums[i] = nums[j];
  nums[j] = temp;
  return nums;
}
var arr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];
console.log(quickSort(arr, 0, arr.length - 1));
