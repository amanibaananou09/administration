import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";
import { columnChartData, columnChartOption } from "variables/charts";

class ColumnChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: [],
      chartOptions: {},
    };
  }

  componentDidMount() {
    this.setState({
      chartData: columnChartData,
      chartOptions: columnChartOption,
    });
  }

  render() {
    return (
        <ReactApexChart
          options={this.state.chartOptions}
          series={this.state.chartData}
          type="bar"
          width="100%"
          height="100%"
        />
    );
  }
}

export default ColumnChart;
