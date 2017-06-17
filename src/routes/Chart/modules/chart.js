import * as d3 from 'd3';

export const ADD_SAMPLE_DATA = 'ADD_SAMPLE_DATA';

export const getSampleData = () => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      d3.tsv('//rrag.github.io/react-stockcharts/data/MSFT.tsv', (err, data) => {
        /* change MSFT.tsv to MSFT_full.tsv above to see how this works with lots of data points */
        if (data) resolve(data);
        else reject(err);
      });
    }).then((data) => {
      data.forEach((d, i) => {
        d.date = new Date(d3.timeParse('%Y-%m-%d')(d.date).getTime());
        d.open = +d.open;
        d.high = +d.high;
        d.low = +d.low;
        d.close = +d.close;
        d.volume = +d.volume;
      });

      dispatch({
        type : ADD_SAMPLE_DATA,
        payload: data,
      });
    }).catch((err) => {
      console.log('Error fetching sample data: ', err);
    });
  };
};

const ACTION_HANDLERS = {
  [ADD_SAMPLE_DATA] : (state, action) => Object.assign({}, state, { sampleData: action.payload }),
};

export default function chartReducer(state = {}, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
