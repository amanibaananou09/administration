import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { getAllTankByIdc, getTankLevelSelected } from "src/common/api";
import { useAuth } from "src/store/AuthContext";
import { Flex } from "@chakra-ui/react";
import { useESSContext } from "src/store/ESSContext";
import TankChartMenu from "src/components/ChartMenu/TankChartMenu";
import { tankSalesChartConfig } from "src/common/chartOptions";
type TankType = string | number | null;

interface TankSalesChartProps {}

const TankSalesChart: React.FC<TankSalesChartProps> = () => {
  const { user } = useAuth();

  const {
    selectedStation: { controllerId },
  } = useESSContext();

  const [selectedTank, setSelectedTank] = useState<string | null>(null);
  const [tanks, setTanks] = useState<any[]>([]);
  const [chartOptions, setChartOptions] = useState<any>(
    tankSalesChartConfig.options,
  );
  const [chartSeries, setChartSeries] = useState<any>(
    tankSalesChartConfig.series,
  );

  useEffect(() => {
    const fetchTanks = async () => {
      if (typeof user !== "string") {
        console.error("User is not a string");
        return;
      }
      const token = user;
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
  }, [controllerId]);

  useEffect(() => {
    const updateChart = async () => {
      try {
        if (typeof user !== "string") {
          console.error("User is not a string");
          return;
        }
        const token = user;
        const chartData = await getTankLevelSelected(selectedTank, token);

        const filteredData = {
          categories: chartData.map((item: any) => {
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
              data: chartData.map((item: any) => item.salesVolume),
            },
            {
              name: "Change Volume",
              data: chartData.map((item: any) => -item.changedVolume),
            },
            {
              name: "Leak",
              data: chartData.map(
                (item: any) => item.salesVolume - item.changedVolume,
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
        console.error("Error fetching data de fuite:", error);
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
        type="bar"
        width="100%"
        height="490px"
      />
    </>
  );
};

export default TankSalesChart;
