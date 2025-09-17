/**
 * Merge elements from two arrays interleavingly.
 * If arrays are of unequal length, remaining elements are added at the end.
 * @param {Array} a - First array
 * @param {Array} b - Second array
 * @returns {Array} - Interleaved merged array
 */
function mergeTwoArray(a, b) {
  if (!Array.isArray(a) || !Array.isArray(b)) {
    throw new TypeError("Both inputs must be arrays.");
  }

  const result = [];
  const maxLength = Math.max(a.length, b.length);

  for (let i = 0; i < maxLength; i++) {
    if (i < a.length) result.push(a[i]);
    if (i < b.length) result.push(b[i]);
  }

  return result;
}

module.exports = mergeTwoArray;
