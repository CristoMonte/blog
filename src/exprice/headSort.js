function headSort(nums) {
  // 先构建大顶堆
  for (let i = Math.floor(nums.length) - 1; i >= 0; i--) {
    headAjust(nums, i, nums.length);
  }

  // 替换当前大顶堆的顶点和最后一个节点，再将剩下的节点重新构建大顶堆
  for (let i = nums.length - 1; i > 0; i--) {
    swap(nums, 0, i);
    headAjust(nums, 0, i);
  }
  return nums;
}

function swap(nums, i, j) {
  const temp = nums[i];
  nums[i] = nums[j];
  nums[j] = temp;
  return nums;
}

function headAjust(nums, i, length) {
  for (let j = 2 * i + 1; j < length; j = 2 * j + 1) {
    const temp = nums[i];
    if (j + 1 < length && nums[j] < nums[j + 1]) {
      j = j + 1;
    }
    if (nums[j] > nums[i]) {
      swap(nums, i, j);
      i = j;
    }
  }
  return nums;
}
