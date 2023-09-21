import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { getAllTankByIdc, getTankLevelSelected } from "common/api.js";
import { useAuth } from "store/AuthContext";
import { Flex, Select } from "@chakra-ui/react";
import { useESSContext } from "store/ESSContext";

const TankSalesColumnChart = () => {
  const [selectedTankColumn, setSelectedTankColumn] = useState("all");
  const [tankDataFuite, setTankDataFuite] = useState([]);
  const [
    TankSalesColumnChartOptions,
    setTankSalesColumnChartOptions,
  ] = useState({
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
  });
  const [TankSalesColumnChartData, setTankSalesColumnChartData] = useState([
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
  ]);
  const {
    user: { token },
  } = useAuth();

  const {
    selectedStation: { controllerId },
  } = useESSContext();

  useEffect(() => {
    const tankFuiteFetchData = async () => {
      try {
        const tankData = await getAllTankByIdc(controllerId, token);
        setTankDataFuite(tankData);
        updateChart(tankData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const updateChart = async () => {
      try {
        const chartData = await getTankLevelSelected(selectedTankColumn, token);

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
        setTankSalesColumnChartOptions({
          ...TankSalesColumnChartOptions,
          xaxis: {
            categories: filteredData.categories,
          },
        });
        setTankSalesColumnChartData(filteredData.series);
      } catch (error) {
        console.error("Error fetching data de fuite:", error);
      }
    };

    tankFuiteFetchData();
  }, [selectedTankColumn, token, controllerId]);

  const handleTankColumnChange = (e) => {
    setSelectedTankColumn(e.target.value);
  };

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
          <Select value={selectedTankColumn} onChange={handleTankColumnChange}>
            <option value="all">All Tank</option>
            {tankDataFuite.map((tank) => (
              <option key={tank.idConf} value={tank.idConf}>
                Tank {tank.idConf}
              </option>
            ))}
          </Select>
        </Flex>
      </Flex>
      <ReactApexChart
        options={TankSalesColumnChartOptions}
        series={TankSalesColumnChartData}
        type="bar"
        width="100%"
        height="490px"
      />
    </>
  );
};

export default TankSalesColumnChart;
