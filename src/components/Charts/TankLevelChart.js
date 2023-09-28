import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { Flex } from "@chakra-ui/react";
import { useAuth } from "store/AuthContext";
import { getAllTankByIdc, getTankLevelSelected } from "common/api.js";
import { useESSContext } from "store/ESSContext";
import TankChartMenu from "components/ChartMenu/TankChartMenu";
import { tankLevelChartConfig } from "common/chartOptions";

const TankLevelChart = () => {
  const [selectedTank, setSelectedTank] = useState(null);
  const [tanks, setTanks] = useState([]);
  const [chartOptions, setChartOptions] = useState(
    tankLevelChartConfig.options,
  );
  const [chartSeries, setChartSeries] = useState(tankLevelChartConfig.series);

  const {
    user: { token },
  } = useAuth();

  const {
    selectedStation: { controllerId },
  } = useESSContext();

  useEffect(() => {
    const fetchTanks = async () => {
      try {
        const tankList = await getAllTankByIdc(controllerId, token);

        setTanks(tankList);

        // select default Tank
        if (tankList.length > 0) {
          setSelectedTank(tankList[0].idConf);
        }
      } catch (error) {
        console.error("Error fetching data tank:", error);
      }
    };

    fetchTanks();
  }, [token, controllerId]);

  useEffect(() => {
    const updateChart = async () => {
      try {
        const fetchedData = await getTankLevelSelected(selectedTank, token);

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
        setChartSeries(filteredData.series);
      } catch (error) {
        console.error("Error fetching data :", error);
      }
    };

    if (selectedTank) {
      updateChart(token, tanks);
    }
  }, [selectedTank]);

  return (
    <>
      <Flex marginLeft="3%">
        <TankChartMenu
          tanks={tanks}
          selectedTank={selectedTank}
          onChange={(tank) => setSelectedTank(tank)}
        />
      </Flex>
      <ReactApexChart
        options={chartOptions}
        series={chartSeries}
        type="line"
        width="100%"
        height="500px"
      />
    </>
  );
};

export default TankLevelChart;
