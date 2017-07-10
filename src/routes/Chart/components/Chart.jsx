import React from 'react';
// import ReactDOM from 'react-dom';
import * as d3 from 'd3';
import ChartCanvas from 'react-stockcharts/lib/ChartCanvas';
import Chart from 'react-stockcharts/lib/Chart';
import { OHLCSeries, BarSeries, LineSeries, AreaSeries } from 'react-stockcharts/lib/series';
import { discontinuousTimeScaleProvider } from 'react-stockcharts/lib/scale';
import {
  CrossHairCursor,
  MouseCoordinateX,
  MouseCoordinateY,
  CurrentCoordinate,
} from 'react-stockcharts/lib/coordinates';
import { OHLCTooltip, MovingAverageTooltip } from 'react-stockcharts/lib/tooltip';
import { XAxis, YAxis } from 'react-stockcharts/lib/axes';
import { ema, sma } from 'react-stockcharts/lib/indicator';
import { fitDimensions, fitWidth, TypeChooser } from 'react-stockcharts/lib/helper';
import { Card, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import Toggle from 'material-ui/Toggle';

export class CandleStickChartWithMA extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    };
  }

  componentWillMount() {
    this.props.getSampleData();
  }

  handleExpandChange = (expanded) => {
    this.setState({ expanded });
  };

  handleToggle = (event, toggle) => {
    this.setState({ expanded: toggle });
  };

  handleExpand = () => {
    this.setState({ expanded: true });
  };

  handleReduce = () => {
    this.setState({ expanded: false });
  };

  renderPlaceholder = () => (
    <div
      style={{
        height: '400px',
        margin: '10px',
        position: 'relative',
        width: '780px',
      }}
    >
      <div className='loader' />
    </div>
  );

  renderChart = () => {
    const { data, type, width, ratio } = this.props;

    const ema20 = ema()
      .windowSize(20) // optional will default to 10
      .sourcePath('close') // optional will default to close as the source
      .skipUndefined(true) // defaults to true
      .merge((d, c) => { d.ema20 = c; }) // Required, if not provided, log a error
      .accessor(d => d.ema20) // Required, if not provided, log an error during calculation
      .stroke('blue'); // Optional

    const sma20 = sma()
      .windowSize(20)
      .sourcePath('close')
      .merge((d, c) => { d.sma20 = c; })
      .accessor(d => d.sma20);

    const ema50 = ema()
      .windowSize(50)
      .sourcePath('close')
      .merge((d, c) => { d.ema50 = c; })
      .accessor(d => d.ema50);

    const smaVolume50 = sma()
      .windowSize(50)
      .sourcePath('volume')
      .merge((d, c) => { d.smaVolume50 = c; })
      .accessor(d => d.smaVolume50)
      .stroke('#4682B4')
      .fill('#4682B4');

    return !data.length ? this.renderPlaceholder() : (
      <ChartCanvas
        ratio={ratio} width={width} height={400}
        margin={{ left: 70, right: 70, top: 10, bottom: 30 }} type={type}
        seriesName='MSFT'
        data={data} calculator={[sma20, ema20, ema50, smaVolume50]}
        xAccessor={d => d.date}
        xScaleProvider={discontinuousTimeScaleProvider}
        xExtents={[new Date(2012, 0, 1), new Date(2012, 6, 2)]}
      >
        <Chart
          id={1}
          yExtents={[d => [d.high, d.low], sma20.accessor(), ema20.accessor(), ema50.accessor()]}
          padding={{ top: 10, bottom: 20 }}
        >
          <XAxis axisAt='bottom' orient='bottom' />
          <YAxis axisAt='right' orient='right' ticks={5} />

          <MouseCoordinateY
            at='right'
            orient='right'
            displayFormat={d3.format('.2f')}
          />

          <OHLCSeries stroke={d => d.close > d.open ? '#6BA583' : 'red'} />
          <LineSeries yAccessor={sma20.accessor()} stroke={sma20.stroke()} />
          <LineSeries yAccessor={ema20.accessor()} stroke={ema20.stroke()} />
          <LineSeries yAccessor={ema50.accessor()} stroke={ema50.stroke()} />
          <CurrentCoordinate yAccessor={sma20.accessor()} fill={sma20.stroke()} />
          <CurrentCoordinate yAccessor={ema20.accessor()} fill={ema20.stroke()} />
          <CurrentCoordinate yAccessor={ema50.accessor()} fill={ema50.stroke()} />

          <OHLCTooltip origin={[-40, 0]} />
          <MovingAverageTooltip
            onClick={e => console.log(e)} origin={[-38, 15]}
            calculators={[sma20, ema20, ema50]}
          />
        </Chart>
        <Chart
          id={2}
          yExtents={[d => d.volume, smaVolume50.accessor()]}
          height={150} origin={(w, h) => [0, h - 150]}
        >
          <YAxis axisAt='left' orient='left' ticks={5} tickFormat={d3.format('.0s')} />

          <MouseCoordinateX
            at='bottom'
            orient='bottom'
            displayFormat={d3.timeFormat('%Y-%m-%d')}
          />
          <MouseCoordinateY
            at='left'
            orient='left'
            displayFormat={d3.format('.4s')}
          />

          <BarSeries yAccessor={d => d.volume} fill={d => d.close > d.open ? '#6BA583' : 'red'} />
          <AreaSeries yAccessor={smaVolume50.accessor()} stroke={smaVolume50.stroke()} fill={smaVolume50.fill()} />
          <CurrentCoordinate yAccessor={smaVolume50.accessor()} fill={smaVolume50.stroke()} />
          <CurrentCoordinate yAccessor={d => d.volume} fill='#9B0A47' />
        </Chart>
        <CrossHairCursor />
      </ChartCanvas>
    );
  }

  render() {
    return (
      <div style={{ maxWidth: '800px', margin: '20px' }}>
        <Card expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
          <CardHeader
            actAsExpander
            showExpandableButton
            subtitle='NASDAQ: MSFT'
            title='Microsoft Corporation'
          />
          <CardMedia>
            {this.renderChart()}
          </CardMedia>
          <CardText>
            <Toggle
              toggled={this.state.expanded}
              onToggle={this.handleToggle}
              labelPosition='right'
              label='Company Fundamentals'
            />
          </CardText>
          <CardTitle
            expandable
            title='Key Fundamentals'
            subtitle='Description about Green/Yellow/Red light system.'
          />
          <CardText expandable>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
            Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
            Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
          </CardText>
        </Card>
      </div>
    );
  }
}

CandleStickChartWithMA.propTypes = {
  data: React.PropTypes.array.isRequired,
  getSampleData: React.PropTypes.func.isRequired,
  ratio: React.PropTypes.number.isRequired,
  type: React.PropTypes.oneOf(['svg', 'hybrid']).isRequired,
  width: React.PropTypes.number.isRequired,
};

CandleStickChartWithMA.defaultProps = {
  type: 'svg',
};

// const fitWidthCandleStickChartWithMA = fitWidth(CandleStickChartWithMA);
const fitDimensionsProps = {
  width: 800
};
const fitWidthCandleStickChartWithMA = fitDimensions(CandleStickChartWithMA, fitDimensionsProps);

export default fitWidthCandleStickChartWithMA;
