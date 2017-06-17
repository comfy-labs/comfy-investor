import { injectReducer } from '../../store/reducers';

export default store => ({
  path: 'chart',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const Chart = require('./containers/ChartContainer').default;
      const reducer = require('./modules/chart').default;

      injectReducer(store, { key: 'chart', reducer });

      cb(null, Chart);
    }, 'chart');
  },
});
