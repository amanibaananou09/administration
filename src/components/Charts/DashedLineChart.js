import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";
import { dashedlineData, dashedlineOption } from "variables/charts";

class DashedLineChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: [],
      chartOptions: {},
    };
  }

  componentDidMount() {
    this.setState({
      chartData: dashedlineData,
      chartOptions: dashedlineOption,
    });
  }

  render() {
    return (
      <ReactApexChart
        options={this.state.chartOptions}
        series={this.state.chartData}
        type="line"
        width="100%"
        height="100%"
      />
    );
  }
}

export default DashedLineChart;
