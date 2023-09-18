import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";
import {
  CHART_TANK_ALL_BY_IDC,
  CHART_TANK_LEVEL_ENDPOINT,
} from "common/api.js";
import { Flex, Select, Button } from "@chakra-ui/react";

class ColumnChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTankColumn: "all",
      tankDataFuite: [],
      columnChartOptions: {
        chart: {
          height: 350,
          toolbar: {
            show: false,
          },
        },
        plotOptions: {
          bar: {
            columnWidth: "80%",
          },
        },
        dataLabels: {
          enabled: false,
        },
        xaxis: {
          categories: [],
        },
        yaxis: [
          {
            labels: {
              formatter: function (value) {
                return value.toFixed(2);
              },
            },
          },
        ],
        colors: ["#F15B46", "#FEB019", "#38B2AC"],
        stroke: {
          show: true,
          width: 2,
          colors: ["transparent"],
        },
      },
      columnChartData: [
        {
          name: "Sales Volume",
          data: [],
        },
        {
          name: "Change Volume",
          data: [],
        },
        {
          name: "Leak",
          data: [],
        },
      ],
    };
  }

  componentDidMount() {
    this.tankFuiteFetchData();
  }

  async tankFuiteFetchData() {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(CHART_TANK_ALL_BY_IDC, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      const tankDataFuite = await response.json();
      this.setState({ tankDataFuite });
      this.updateChart(tankDataFuite);
      console.log("La chart de fuite est", tankDataFuite);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async updateChart(data) {
    try {
      const { selectedTankColumn } = this.state;
      const endpoint = `${CHART_TANK_LEVEL_ENDPOINT}/${selectedTankColumn}`;
      const token = localStorage.getItem("token");
      const response = await fetch(endpoint, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      const chartData = await response.json();
      console.log("La valeur de tank", chartData);

      const filteredData = {
        categories: chartData.map((item) => {
          const date1 = new Date(item.dateTime);
          return date1.toLocaleString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
            hour: "numeric",
          });
        }),
        series: [
          {
            name: "Sales Volume",
            data: chartData.map((item) => item.salesVolume),
          },
          {
            name: "Change Volume",
            data: chartData.map((item) => -item.changedVolume),
          },
          {
            name: "Leak",
            data: chartData.map(
              (item) => item.salesVolume - item.changedVolume,
            ),
          },
        ],
      };

      this.setState({
        columnChartOptions: {
          ...this.state.columnChartOptions,
          xaxis: {
            categories: filteredData.categories,
          },
        },
        columnChartData: filteredData.series,
      });
    } catch (error) {
      console.error("Error fetching data de fuite:", error);
    }
  }

  render() {
    const { selectedTankColumn, tankDataFuite } = this.state;
    return (
      <>
        <Flex flexDirection="row" spacing="24px">
          <Flex
            align="center"
            mx={{ md: "39" }}
            p="5px"
            justify="center"
            w="40%"
            mb="25px"
          >
            <Select
              value={selectedTankColumn}
              onChange={(e) =>
                this.setState({ selectedTankColumn: e.target.value })
              }
            >
              <option value="all">All Tank</option>
              {tankDataFuite.map((tank) => (
                <option key={tank.id} value={tank.id}>
                  Tank {tank.id}
                </option>
              ))}
            </Select>
          </Flex>
          <Flex p="5px">
            <Button variant="primary" onClick={() => this.updateChart()}>
              SEE ALL
            </Button>
          </Flex>
        </Flex>
        <ReactApexChart
          options={this.state.columnChartOptions}
          series={this.state.columnChartData}
          type="bar"
          width="100%"
          height="490px"
        />
      </>
    );
  }
}

export default ColumnChart;
