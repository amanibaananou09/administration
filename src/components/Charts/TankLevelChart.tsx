import {
  getAllTankByIdc,
  getTankLevelByPeriod,
  getTankMeasurementByPeriod,
} from "common/api/chart-api";
import { tankLevelChartConfig } from "common/chartOptions";
import {
  periodeProps,
  Tank,
  tankLevelData,
  tankMeasurementData,
} from "common/model";
import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useAuth } from "../../store/AuthContext";
import { useESSContext } from "../../store/ESSContext";
import TankChartButton from "../ChartMenu/TankChartButton";
import { formatDate } from "utils/utils";

export const TankLevelChart = ({ periode ,startDate, endDate}: periodeProps) => {
  const [chartData, setChartData] = useState({
    tankMeasurementData: [] as tankMeasurementData[],
    tankLevelData: [] as tankLevelData[],
  });

  const [selectedTank, setSelectedTank] = useState<string|number | null>(1);
  const [tanks, setTanks] = useState<Tank[]>([]);

  const [chartOptions, setChartOptions] = useState(
    tankLevelChartConfig.options,
  );
  const { user } = useAuth();
  const { selectedStation } = useESSContext();

  useEffect(() => {
    const fetchTanks = async () => {
      if (!selectedStation ) {
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
        const measurementData = await getTankMeasurementByPeriod(selectedStation, selectedTank, periode, startDate, endDate);
          setChartData((prevData) => ({
            ...prevData,
            tankMeasurementData: measurementData,
          }));

          const levelData = await getTankLevelByPeriod(selectedStation, selectedTank, periode, startDate, endDate);
          setChartData((prevData) => ({
            ...prevData,
            tankLevelData: levelData,
          }));

        } catch (error) {
          console.error("Error fetching tank data: ", error);
        }
      };
      fetchData();
    }, [periode, selectedStation, user, selectedTank , startDate, endDate]);

  // Ensure the data points are aligned
  const alignedChartData = alignDataPoints(chartData);
  console.log(alignedChartData);
  // Process and merge data for the chart
  const chartSeries = [
    {
      name: "Changed Volume",
      type: "line",
      data: alignedChartData.tankLevelData
        .filter((item) => item.tankVolumeChanges !== null)
        .map((item) => ({
          x: formatDate(item.dateTime),
          y: item.tankVolumeChanges,
        })),
    },
    {
      name: "Tank Volume",
      type: "line",
      data: alignedChartData.tankMeasurementData
        .filter((item) => item.productVolume !== null)
        .map((item) => ({
          x: formatDate(item.dateTime),
          y: item.productVolume,
        })),
    },
  ];



  return (
    <div>
      <TankChartButton
        tanks={tanks}
        selectedTank={selectedTank}
        onChange={(tank) => setSelectedTank(tank)}
      />
      {alignedChartData.tankLevelData.length > 0 &&
        alignedChartData.tankMeasurementData.length > 0 && (
          <ReactApexChart
            options={chartOptions}
            series={chartSeries}
            type="line"
            width="100%"
            height="500px"
          />
        )}
    </div>
  );
};

const alignDataPoints = (data: {
  tankMeasurementData: tankMeasurementData[];
  tankLevelData: tankLevelData[];
}): {
  tankMeasurementData: (tankMeasurementData | { dateTime: string; productVolume: null })[];
  tankLevelData: (tankLevelData | { dateTime: string; tankVolumeChanges: null })[];
} => {
  const allDatetimes = [
    ...data.tankMeasurementData.map((item) => item.dateTime),
    ...data.tankLevelData.map((item) => item.dateTime),
  ];

  // Remove duplicates by converting the array to a Set and back to an array
  const uniqueDatetimes = [...new Set(allDatetimes)];

  // Sort datetime values
  uniqueDatetimes.sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

  // Create aligned data based on unique and sorted datetime values
  const alignedData = {
    tankMeasurementData: uniqueDatetimes.map((dateTime) => {
      const measurementItem = data.tankMeasurementData.find((item) => item.dateTime === dateTime);
      return measurementItem || { dateTime, productVolume: null };
    }),
    tankLevelData: uniqueDatetimes.map((dateTime) => {
      const levelItem = data.tankLevelData.find((item) => item.dateTime === dateTime);
      return levelItem || { dateTime, tankVolumeChanges: null };
    }),
  };

  return alignedData;
};



export default TankLevelChart;
