import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { Flex } from "@chakra-ui/react";
import { useAuth } from "store/AuthContext";
import {
  getAllTankByIdc,
  getChartTankLevel,
  getTankLevelSelected,
} from "common/api.js";
import { useESSContext } from "store/ESSContext";
import TankChartMenu from "components/ChartMenu/TankChartMenu";

const TankLevelChat = () => {
  const [selectedTank, setSelectedTank] = useState("all");
  const [tankData, setTankData] = useState([]);
  const [chartOptions, setChartOptions] = useState({
    chart: {
      id: "dashed-line",
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: [],
      style: {
        fontSize: "10px",
      },
    },
    yaxis: {
      beginAtZero: true,
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
        ticks: {
          stepSize: 100,
        },
      },
    },
  });
  const [chartData, setChartData] = useState([
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
  ]);

  const {
    user: { token },
  } = useAuth();

  const {
    selectedStation: { controllerId },
  } = useESSContext();

  useEffect(() => {
    tankFetchData();
  }, [selectedTank, token, controllerId]);

  const tankFetchData = async () => {
    try {
      const tankData = await getAllTankByIdc(controllerId, token);
      setTankData(tankData);
      updateChartData(token, tankData);
    } catch (error) {
      console.error("Error fetching data tank:", error);
    }
  };

  const updateChartData = async (token, data) => {
    try {
      let fetchedData;
      if (selectedTank === "all") {
        fetchedData = await getChartTankLevel(token);
      } else {
        fetchedData = await getTankLevelSelected(selectedTank, token);
      }

      const filteredData = {
        categories: fetchedData.map((item) => {
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
            name: "Tank Level",
            data: fetchedData.map((item) => item.tankVolumeChanges),
          },
        ],
      };

      setChartOptions({
        ...chartOptions,
        xaxis: {
          categories: filteredData.categories,
        },
      });
      setChartData(filteredData.series);
    } catch (error) {
      console.error("Error fetching data :", error);
    }
  };

  return (
    <>
      <Flex marginLeft="3%">
        <TankChartMenu
          tank={selectedTank}
          setTank={setSelectedTank}
          tankData={tankData}
        />
      </Flex>
      <ReactApexChart
        options={chartOptions}
        series={chartData}
        type="line"
        width="100%"
        height="500px"
      />
    </>
  );
};

export default TankLevelChat;
