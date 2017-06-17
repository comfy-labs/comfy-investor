import { connect } from 'react-redux';
import { getSampleData } from '../modules/chart';

import Chart from '../components/Chart';

const mapDispatchToProps = {
  getSampleData,
};

const mapStateToProps = state => ({
  data: state.chart.sampleData || [],
});

export default connect(mapStateToProps, mapDispatchToProps)(Chart);
