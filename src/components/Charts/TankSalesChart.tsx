import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { getAllTankByIdc, getTankLevelSelected } from "src/common/api";
import { useAuth } from "src/store/AuthContext";
import { Flex } from "@chakra-ui/react";
import { useESSContext } from "src/store/ESSContext";
import TankChartMenu from "src/components/ChartMenu/TankChartMenu";
import { tankSalesChartConfig } from "src/common/chartOptions";

interface TankSalesChartProps {}

const TankSalesChart: React.FC<TankSalesChartProps> = () => {
  const {
    user: { token },
  } = useAuth();

  const {
    selectedStation: { controllerId },
  } = useESSContext();

  const [selectedTank, setSelectedTank] = useState<number | null>(null);
  const [tanks, setTanks] = useState<any[]>([]);
  const [chartOptions, setChartOptions] = useState<any>(
    tankSalesChartConfig.options
  );
  const [chartSeries, setChartSeries] = useState<any>(
    tankSalesChartConfig.series
  );

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
                (item: any) => item.salesVolume - item.changedVolume
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
      updateChart(token, tanks);
    }
  }, [selectedTank]);

  return (
    <>
      <Flex marginLeft="3%">
        <TankChartMenu
          tanks={tanks}
          selectedTank={selectedTank}
          onChange={(tank: number) => setSelectedTank(tank)}
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