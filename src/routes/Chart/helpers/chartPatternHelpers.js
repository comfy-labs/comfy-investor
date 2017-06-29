/**
 * Checks dataset for a prior uptrend of at least 30%
 * @param  {Array} data OHLC and volume data points
 * @return {Object | Number}      Returns {startIndex, finishIndex} or -1 if no prior uptrend exists
 */
export const findPriorUptrend = (data) => {
  // Loop through data
    // track highest and lowest indices
  // Check if at least 30% from lowest
  // Return indices if true or -1 if false

  const lowHighIndices = data.reduce((pointers, ohlcv, dataIndex, originalData) => [
    ohlcv.low < originalData[pointers[0]] ? dataIndex : pointers[0],
    ohlcv.high > originalData[pointers[1]] ? dataIndex : pointers[1],
  ], [data[0].low, 0]);
  const hasPriorUptrend = (lowHighIndices[1] - lowHighIndices[0]) / lowHighIndices[0] >= 0.3;

  return hasPriorUptrend ? lowHighIndices : -1;
};

export const findCup = () => {};

export const findHandle = () => {};
