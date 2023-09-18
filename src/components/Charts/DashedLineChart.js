import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";
import { Flex, Select, Button } from "@chakra-ui/react";

import {
  CHART_TANK_ALL_BY_IDC,
  CHART_TANK_LEVEL_ALL,
  CHART_TANK_LEVEL_ENDPOINT,
} from "common/api.js";

class DashedLineChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTank: "all",
      tankData: [],
      chartOptions: {
        chart: {
          id: "dashed-line",
        },
        xaxis: {
          categories: [],
          style: {
            fontSize: "10px",
          },
        },
        yaxis: {
          beginAtZero: true,
          min: 0,
          max: 200,
          tickAmount: 12,
          labels: {
            formatter: function (value) {
              return value.toFixed(2);
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            min: 0,
            max: 200,
            ticks: {
              stepSize: 10,
            },
          },
        },
      },
      chartData: [
        {
          name: "Gasoil",
          data: [],
        },
        {
          name: "Super Sans Plomb",
          data: [],
        },
        {
          name: "Gasoil Sans Soufre",
          data: [],
        },
      ],
    };
  }

  componentDidMount() {
    this.tankFetchData();
  }

  async tankFetchData() {
    const { selectedTank } = this.state;
    console.log("select", selectedTank);

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${CHART_TANK_ALL_BY_IDC}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      const tankData = await response.json();
      this.setState({ tankData });
      this.updateChartData(tankData);
    } catch (error) {
      console.error("Error fetching data tank:", error);
    }
  }

  async updateChartData(data) {
    const { selectedTank, tankData } = this.state;
    try {
      let endpoint = CHART_TANK_LEVEL_ALL;
      if (selectedTank === "all") {
        endpoint = CHART_TANK_LEVEL_ALL;
      } else {
        endpoint = `${CHART_TANK_LEVEL_ENDPOINT}/${selectedTank}`;
      }

      const token = localStorage.getItem("token");
      const response = await fetch(endpoint, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      const data = await response.json();

      const filteredData = {
        categories: data.map((item) => {
          const date1 = new Date(item.dateTime);
          return date1.toLocaleString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
            hour: "numeric",
          }) ;
        }),
        series: [
          {
            name: "Tank Level",
            data: data.map((item) => item.tankVolumeChanges),
          },
          {
            name: "Minimum",
            data: data.map(() => 100),
          },
          {
            name: "Maximum",
            data: data.map(() => 5000),
          },
        ],
      };

      this.setState({
        chartOptions: {
          ...this.state.chartOptions,
          xaxis: {
            categories: filteredData.categories,
          },
        },
        chartData: filteredData.series,
      });
    } catch (error) {
      console.error("Error fetching data :", error);
    }
  }

  render() {
    const { selectedTank, tankData } = this.state;
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
              value={selectedTank}
              onChange={(e) => this.setState({ selectedTank: e.target.value })}
            >
              <option value="all">All Tank</option>
              {tankData.map((tank) => (
                <option key={tank.id} value={tank.id}>
                  Tank {tank.id}
                </option>
              ))}
            </Select>
          </Flex>
          <Flex p="5px">
            <Button variant="primary" onClick={() => this.updateChartData()}>
              SEE ALL
            </Button>
          </Flex>
        </Flex>
        <ReactApexChart
          options={this.state.chartOptions}
          series={this.state.chartData}
          type="line"
          width="100%"
          height="400px"
        />
      </>
    );
  }
}

export default DashedLineChart;
