import { Box, Text } from "@chakra-ui/react";
import {
  getAllTankByIdc,
  getTankLevelByPeriod,
  getTankMeasurementByPeriod,
} from "common/api/chart-api";
import { tankLevelChartConfig } from "common/chartOptions";
import { Tank, tankLevelData, tankMeasurementData } from "common/model";
import { Filter } from "components/Filter/DashBoardFilter";
import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useTranslation } from "react-i18next";
import { formatDate } from "utils/utils";
import { useAuth } from "../../store/AuthContext";
import { useESSContext } from "../../store/ESSContext";
import TankChartButton from "../ChartMenu/TankChartButton";

export const TankLevelChart = ({ fromDate, toDate }: Filter) => {
  const [chartData, setChartData] = useState({
    tankMeasurementData: [] as tankMeasurementData[],
    tankLevelData: [] as tankLevelData[],
  });
  const { t } = useTranslation("dashboard");

  const [selectedTank, setSelectedTank] = useState<string | number | null>(1);
  const [tanks, setTanks] = useState<Tank[]>([]);

  const [chartOptions, setChartOptions] = useState(
    tankLevelChartConfig.options,
  );
  const { user } = useAuth();
  const { selectedStation } = useESSContext();

  useEffect(() => {
    const fetchTanks = async () => {
      if (!selectedStation) {
        return;
      }
      try {
        const tankList = await getAllTankByIdc(selectedStation);
        setTanks(tankList);
      } catch (error) {
        console.error("Error fetching data tank:", error);
      }
    };

    fetchTanks();
  }, [selectedStation]);

  useEffect(() => {
    if (!selectedStation || !user || !selectedTank) {
      return;
    }
    const fetchData = async () => {
      try {
        const measurementData = await getTankMeasurementByPeriod(
          selectedStation,
          selectedTank,
          fromDate,
          toDate,
        );
        setChartData((prevData) => ({
          ...prevData,
          tankMeasurementData: measurementData,
        }));

        const levelData = await getTankLevelByPeriod(
          selectedStation,
          selectedTank,
          fromDate,
          toDate,
        );
        setChartData((prevData) => ({
          ...prevData,
          tankLevelData: levelData,
        }));
      } catch (error) {
        console.error("Error fetching tank data: ", error);
      }
    };
    fetchData();
  }, [selectedStation, user, selectedTank, fromDate, toDate]);

  // Ensure the data points are aligned
  const alignedChartData = alignDataPoints(chartData);
  // Process and merge data for the chart
  const chartSeries = [
    {
      name: t("tankLevelChart.changedVolume"),
      type: "line",
      data: alignedChartData.tankLevelData.map((item) => ({
        x: formatDate(item.dateTime),
        y: item.tankVolumeChanges,
      })),
    },
    {
      name: t("tankLevelChart.tankVolume"),
      type: "line",
      data: alignedChartData.tankMeasurementData.map((item) => ({
        x: formatDate(item.dateTime),
        y: item.productVolume,
      })),
    },
  ];

  return (
    <>
      {tanks.length === 0 && (
        <Text textAlign="center" py="10px">
          {t("tankLevelChart.nodata")}
        </Text>
      )}
      {tanks.length > 0 && (
        <Box>
          <TankChartButton
            tanks={tanks}
            selectedTank={selectedTank}
            onChange={(tank) => setSelectedTank(tank)}
          />
          {alignedChartData.tankLevelData.length > 0 &&
            alignedChartData.tankMeasurementData.length > 0 && (
              <Box>
                <ReactApexChart
                  options={chartOptions}
                  series={chartSeries}
                  type="line"
                  width="100%"
                  height="500px"
                />
              </Box>
            )}
        </Box>
      )}
    </>
  );
};

const alignDataPoints = (data: {
  tankMeasurementData: tankMeasurementData[];
  tankLevelData: tankLevelData[];
}): {
  tankMeasurementData: tankMeasurementData[];
  tankLevelData: tankLevelData[];
} => {
  return data;
};

export default TankLevelChart;
