import React, { Component } from "react";
import Chart from "react-apexcharts";
import { CHART_STAT_VENT_ENDPOINT } from "common/api.js";

class BarChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        labels: [],
        datasets: [
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
      },
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    const token = localStorage.getItem("token");
    const url = `${CHART_STAT_VENT_ENDPOINT}`;
    const dataSet1 = [];
    const dataSet2 = [];
    const dataSet3 = [];
    const uniqueUserIds = new Set();

    try {
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const res = await response.json();

      if (Array.isArray(res)) {
        for (const val of res) {
          if (val.fuelGradeName === "Gasoil") {
            dataSet1.push(val.sumVolume);
          } else if (val.fuelGradeName === "Super Sans Plomb") {
            dataSet2.push(val.sumVolume);
          } else if (val.fuelGradeName === "Gasoil Sans Soufre") {
            dataSet3.push(val.sumVolume);
          }
          if (val.userId) {
            uniqueUserIds.add(val.userId);
          }
        }
      } else {
        console.error("res is not an array:", res);
      }

      const labelSet = [...uniqueUserIds].map((userId) => `user ${userId}`);

      this.setState({
        data: {
          labels: labelSet,
          datasets: [
            {
              label: "Gasoil",
              data: dataSet1,
              backgroundColor: "rgba(32,178,170,0.6)",
              borderWidth: 1,
            },
            {
              label: "Super Sans Plomb",
              data: dataSet2,
              borderWidth: 1,
              backgroundColor: "rgba(53, 162, 235, 0.5)",
            },
            {
              label: "Gasoil Sans Soufre",
              data: dataSet3,
              borderWidth: 1,
              backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
          ],
        },
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  render() {
    const { data } = this.state;

    const barChartOptions = {
      chart: {
        stacked: true,
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      xaxis: {
        categories: data.labels,
        labels: {
          style: {
            colors: "#A0AEC0",
            fontSize: "12px",
          },
        },
        axisBorder: {
          show: false,
        },
      },
      yaxis: {
        show: true,
        color: "#A0AEC0",
        labels: {
          show: true,
          style: {
            colors: "#A0AEC0",
            fontSize: "14px",
          },
        },
      },
    };

    return (
      <Chart
        options={barChartOptions}
        series={data.datasets}
        type="bar"
        width="100%"
        height="150%"
      />
    );
  }
}

export default BarChart;
