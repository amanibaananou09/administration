import { Flex } from "@chakra-ui/react";
import { getAllTankByIdc, getTankLevelSelected } from "common/api";
import { tankSalesChartConfig } from "common/chartOptions";
import TankChartMenu from "components/ChartMenu/TankChartMenu";
import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useAuth } from "store/AuthContext";
import { useESSContext } from "store/ESSContext";
type TankType = string | number | null;

const TankSalesChart = () => {
  const { user } = useAuth();
  const token = user?.token || "";

  const {
    selectedStation: {
      controllerPts: { id: controllerId },
    },
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
