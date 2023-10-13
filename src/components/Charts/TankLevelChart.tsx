import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { Flex } from "@chakra-ui/react";
import { useAuth } from "src/store/AuthContext";
import { getAllTankByIdc, getTankLevelSelected } from "src/common/api";
import { useESSContext } from "src/store/ESSContext";
import TankChartMenu from "src/components/ChartMenu/TankChartMenu";
import { tankLevelChartConfig } from "src/common/chartOptions";
type TankType = string | number | null;
interface Tank {
  idConf: string;
}

const TankLevelChart: React.FC = () => {
  const [selectedTank, setSelectedTank] = useState<string | null>(null);
  const [tanks, setTanks] = useState<Tank[]>([]);
  const [chartOptions, setChartOptions] = useState(
    tankLevelChartConfig.options,
  );
  const [chartSeries, setChartSeries] = useState(tankLevelChartConfig.series);

  const { user } = useAuth();
  const token = user?.token;
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
          categories: fetchedData.map(
            (item: { dateTime: string | number | Date }) => {
              const date1 = new Date(item.dateTime);
              return date1.toLocaleString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
                hour: "numeric",
              });
            },
          ),
          series: [
            {
              name: "Tank Level",
              data: fetchedData.map(
                (item: { tankVolumeChanges: any }) => item.tankVolumeChanges,
              ),
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
      updateChart();
    }
  }, [selectedTank]);
  const handleSelectedTankChange = (tank: TankType) => {
    setSelectedTank((prevTank) => {
      if (typeof tank === "number") {
        // Convert number to string
        return tank.toString();
      } else {
        return tank;
      }
    });
  };
  return (
    <>
      <Flex marginLeft="3%">
        <TankChartMenu
          tanks={tanks}
          selectedTank={selectedTank}
          onChange={(tank) => handleSelectedTankChange(tank)}
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
