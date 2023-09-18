import React from "react";
import ReactApexChart from "react-apexcharts";
import { Flex, Select, Button } from "@chakra-ui/react";
import {
  PUMP_CONFIG_READ_ALL_ENDPOINT,
  TANK_CONFIG_READ_ALL_ENDPOINT,
  CHART_ENDPOINT,
  CHART_TANK_ENDPOINT,
  getAllFuelGrades,
} from "common/api.js";

class LineChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chartData: {
        labels: [],
        datasets: [
          {
            name: "",
            data: [],
          },
        ],
      },
      type: "sale",
      fuelGrade: "all",
      pump: "all",
      tank: "all",
      period: "weekly",
      pumpData: [],
      fuelGradesData: [],
      tankData: [],
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    try {
      const token = localStorage.getItem("token");
      const { type, fuelGrade, pump, tank, period } = this.state;

      // Fetch pumpData
      const responsePump = await fetch(PUMP_CONFIG_READ_ALL_ENDPOINT, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      const pumpData = await responsePump.json();

      // Fetch fuelGradeData
      const fuelGradesData = await getAllFuelGrades(token);

      // Fetch tankData (conditionally based on type)
      let tankData = [];
      if (type === "purchase") {
        const responseTank = await fetch(TANK_CONFIG_READ_ALL_ENDPOINT, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        });
        tankData = await responseTank.json();
      }

      this.setState({ pumpData, fuelGradesData, tankData });
    } catch (error) {
      console.error("Error fetching data fuelgrades:", error);
    }
  }

  updateChartData = async () => {
    try {
      const { type, fuelGrade, pump, tank, period } = this.state;
      const token = localStorage.getItem("token");
      const idCtr = localStorage.getItem("idCtr");

      let endpoint = ``;
      if (type === "sale") {
        endpoint = `${CHART_ENDPOINT}/${fuelGrade}/${pump}/${period}/${idCtr}`;
      } else if (type === "purchase") {
        endpoint = `${CHART_TANK_ENDPOINT}/${fuelGrade}/${tank}/${period}/${idCtr}`;
      }

      // Fetch data from the API based on selected options
      const response = await fetch(endpoint, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      const data = await response.json();
      console.log("data fin gread:", data);
      // Process data and update the state
      const filteredData = {
        labels: [],
        datasets: [
          {
            label: type === "sale" ? "Sale" : "Purchase",
            data:
              type === "sale"
                ? data.map((item) => item.sumF)
                : data.map((item) => item.totalVolume),
            backgroundColor: data.map((item) => {
              if (item.nameF === "Gasoil Sans Soufre") {
                return "rgba(255, 99, 132, 0.5)";
              } else if (item.nameF === "Super Sans Plomb") {
                return "rgba(53, 162, 235, 0.5)";
              } else if (item.nameF === "Gasoil") {
                return "rgba(32, 178, 170, 0.6)";
              } else {
                return "rgba(75, 192, 192, 0.6)";
              }
            }),
            borderWidth: 1,
          },
        ],
      };
      switch (period) {
        case "weekly":
        case "monthly":
        case "yearly":
          filteredData.labels = data.map(
            (item) => `${item.dateF} ${item.nameF}`,
          );
          break;
        default:
          filteredData.labels = ["Apy", "May", "Jun", "Jul", "Aug"];
          break;
      }
      this.setState({ chartData: filteredData });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  render() {
    const {
      chartData,
      type,
      fuelGrade,
      pump,
      tank,
      period,
      pumpData,
      fuelGradesData,
      tankData,
    } = this.state;

    const lineChartOptions = {
      chart: {
        toolbar: {
          show: false,
        },
      },
      tooltip: {
        theme: "dark",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        categories: chartData.labels,
        labels: {
          style: {
            colors: "#fff",
            fontSize: "12px",
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: "#fff",
            fontSize: "12px",
          },
        },
        responsive: true,
        maxTicksLimit: 5,
        beginAtZero: true,
      },
      legend: {
        show: false,
        position: "bottom",
      },
      grid: {
        strokeDashArray: 5,
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "light",
          type: "vertical",
          shadeIntensity: 0.5,
          inverseColors: true,
          opacityFrom: 0.8,
          opacityTo: 0,
          stops: [],
        },
        colors: ["#fff", "#3182CE"],
      },
      colors: ["#fff", "#3182CE"],
      plugins: {
        grouped: {
          groupBy: "nameF",
        },
      },
    };

    return (
      <>
        <Flex flexDirection="row" spacing="24px" mb="20px">
          <Flex p="0px" align="center" justify="center" w="30%" mb="25px">
            <Select
              color="black"
              value={type}
              onChange={(e) => this.setState({ type: e.target.value })}
            >
              <option value="sale">Sale</option>
              <option value="purchase">Purchase</option>
            </Select>
          </Flex>
          <Flex
            value={fuelGrade}
            onChange={(e) =>
              this.setState({ fuelGrade: e.target.value }, this.fetchData)
            }
            align="center"
            p="5px"
            justify="center"
            w="30%"
            mb="25px"
          >
            <Select color="black">
              <option value="all">All Fuel Grades</option>
              {fuelGradesData.map((fuel) => (
                <option key={fuel.name} value={fuel.name}>
                  {fuel.name}
                </option>
              ))}
            </Select>
          </Flex>
          {type === "sale" ? (
            <Flex align="center" p="5px" justify="center" w="30%" mb="25px">
              <Select
                color="black"
                value={pump}
                onChange={(e) => this.setState({ pump: e.target.value })}
              >
                <option value="all">All Pump</option>
                {pumpData.map((pump) => (
                  <option key={pump.id} value={pump.id}>
                    Pump {pump.id}
                  </option>
                ))}
              </Select>
            </Flex>
          ) : (
            <Flex align="center" p="5px" justify="center" w="30%" mb="25px">
              <Select
                color="black"
                value={tank}
                onChange={(e) => this.setState({ tank: e.target.value })}
              >
                <option value="all">All Tank</option>
                {tankData.map((tank) => (
                  <option key={tank.id} value={tank.id}>
                    Tank {tank.id}
                  </option>
                ))}
              </Select>
            </Flex>
          )}
          <Flex align="center" p="5px" justify="center" w="30%" mb="25px">
            <Select
              color="black"
              value={period}
              onChange={(e) => this.setState({ period: e.target.value })}
            >
              <option value="option1">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </Select>
          </Flex>
        </Flex>
        <Flex justify="center">
          <Button variant="primary" onClick={this.updateChartData}>
            SEE ALL
          </Button>
        </Flex>
        <ReactApexChart
          options={lineChartOptions}
          series={chartData.datasets}
          type="area"
          width="100%"
          height="100%"
        />
      </>
    );
  }
}

export default LineChart;
