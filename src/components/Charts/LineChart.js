import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { Flex, Select, Button } from "@chakra-ui/react";
import { useAuth } from "store/AuthContext";
import {
  getAllPump,
  getAllTank,
  getChartByFuelPumpPeriod,
  getChartByFuelTankPeriod,
  getAllFuelGrades,
} from "common/api.js";
import { useESSContext } from "store/ESSContext";

const LineChart = () => {
  const {
    selectedStation: { controllerId },
  } = useESSContext();

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        name: "",
        data: [],
      },
    ],
  });
  const [type, setType] = useState("sale");
  const [fuelGrade, setFuelGrade] = useState("all");
  const [pump, setPump] = useState("all");
  const [tank, setTank] = useState("all");
  const [period, setPeriod] = useState("weekly");
  const [pumpData, setPumpData] = useState([]);
  const [fuelGradesData, setFuelGradesData] = useState([]);
  const [tankData, setTankData] = useState([]);
  const {
    user: { token },
  } = useAuth();
  useEffect(() => {
    fetchData();
  }, [fuelGrade, pump, tank, period, type]);

  const fetchData = async () => {
    try {
      const pumpData = await getAllPump(controllerId, token);

      const fuelGradesData = await getAllFuelGrades(controllerId, token);

      const tankData = await getAllTank(controllerId, token);

      setPumpData(pumpData);
      setFuelGradesData(fuelGradesData);
      setTankData(tankData);
      updateChartData();
    } catch (error) {
      console.error("Error fetching data fuelgrades:", error);
    }
  };

  const updateChartData = async () => {
    try {
      let data;
      if (type === "sale") {
        data = await getChartByFuelPumpPeriod(
          controllerId,
          fuelGrade,
          pump,
          period,
          token,
        );
      } else if (type === "purchase") {
        data = await getChartByFuelTankPeriod(
          controllerId,
          fuelGrade,
          tank,
          period,
          token,
        );
      }

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
      if (data) {
        switch (period) {
          case "weekly":
            filteredData.labels = data.map(
              (item) => `${item.dateF} ${item.nameF}`,
            );
            break;
          case "monthly":
            filteredData.labels = data.map(
              (item) => `${item.dateF} ${item.nameF}`,
            );
            break;
          case "yearly":
            filteredData.labels = data.map(
              (item) => `${item.dateF} ${item.nameF}`,
            );
            break;
          default:
            filteredData.labels = ["Apy", "May", "Jun", "Jul", "Aug"];
            break;
        }
      }
      setChartData(filteredData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

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
            color="white"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="sale" style={{ color: "black" }}>
              Sale
            </option>
            <option value="purchase" style={{ color: "black" }}>
              Purchase
            </option>
          </Select>
        </Flex>
        <Flex
          value={fuelGrade}
          onChange={(e) => setFuelGrade(e.target.value)}
          align="center"
          p="5px"
          justify="center"
          w="30%"
          mb="25px"
        >
          <Select color="white">
            <option value="all" style={{ color: "black" }}>
              All Fuel Grades
            </option>
            {fuelGradesData.map((fuel) => (
              <option
                style={{ color: "black" }}
                key={fuel.name}
                value={fuel.name}
              >
                {fuel.name}
              </option>
            ))}
          </Select>
        </Flex>
        {type === "sale" ? (
          <Flex align="center" p="5px" justify="center" w="30%" mb="25px">
            <Select
              color="white"
              value={pump}
              onChange={(e) => setPump(e.target.value)}
            >
              <option value="all" style={{ color: "black" }}>
                All Pump
              </option>
              {pumpData.map((pump) => (
                <option
                  key={pump.id}
                  value={pump.id}
                  style={{ color: "black" }}
                >
                  Pump {pump.id}
                </option>
              ))}
            </Select>
          </Flex>
        ) : (
          <Flex align="center" p="5px" justify="center" w="30%" mb="25px">
            <Select
              color="white"
              value={tank}
              onChange={(e) => setTank(e.target.value)}
            >
              <option value="all" style={{ color: "black" }}>
                All Tank
              </option>
              {tankData.map((tank) => (
                <option
                  key={tank.idConf}
                  value={tank.idConf}
                  style={{ color: "black" }}
                >
                  Tank {tank.idConf}
                </option>
              ))}
            </Select>
          </Flex>
        )}
        <Flex align="center" p="5px" justify="center" w="30%" mb="25px">
          <Select
            color="white"
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
          >
            <option value="weekly" style={{ color: "black" }}>
              Weekly
            </option>
            <option value="monthly" style={{ color: "black" }}>
              Monthly
            </option>
            <option value="yearly" style={{ color: "black" }}>
              Yearly
            </option>
          </Select>
        </Flex>
      </Flex>
      <ReactApexChart
        options={lineChartOptions}
        series={chartData.datasets}
        type="area"
        width="100%"
        height="90%"
      />
    </>
  );
};

export default LineChart;
