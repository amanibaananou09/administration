import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { getAllTankByIdc, getTankLevelSelected } from "common/api.js";
import { useAuth } from "store/AuthContext";
import { Flex } from "@chakra-ui/react";
import { useESSContext } from "store/ESSContext";
import TankChartMenu from "components/ChartMenu/TankChartMenu";

const TankSalesChart = () => {
  const [selectedTankColumn, setSelectedTankColumn] = useState(null);
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

        // select default Tank
        if (!selectedTankColumn && tankData.length > 0) {
          setSelectedTankColumn(tankData[0].idConf);
        }

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

  return (
    <>
      <Flex marginLeft="3%">
        <TankChartMenu
          tank={selectedTankColumn}
          setTank={setSelectedTankColumn}
          tankData={tankDataFuite}
        />
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

export default TankSalesChart;
