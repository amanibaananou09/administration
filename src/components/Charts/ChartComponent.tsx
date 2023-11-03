import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { getAllTankByIdc, getTankLevelByPeriod, getTankMeasurementByPeriod } from "common/api";
import { useAuth } from "../../store/AuthContext";
import { useESSContext } from "../../store/ESSContext";
import { Filter, Tank, tankLevelData, tankMeasurementData } from "common/model";
import { chartOptions2 } from "components/Charts/ChartOptions2";
import TankChartMenu from "../ChartMenu/TankChartMenu";
type TankType = string | number | null;

const ChartComponent = () => {
  const [chartData, setChartData] = useState({
    tankMeasurementData: [] as tankMeasurementData[],
    tankLevelData: [] as tankLevelData[],
  });

  const [selectedTank, setSelectedTank] = useState<string | null>("");
  const [tanks, setTanks] = useState<Tank[]>([]);
  const [chartOptions, setChartOptions2] = useState(chartOptions2.options);
  const [periode, setPeriode] = useState<string>("");
  const { user } = useAuth();
  const token = user?.token;
  const {
    selectedStation} = useESSContext();

  useEffect(() => {
    const fetchTanks = async () => {
 if (!selectedStation || !user) {
        return;
      }
        try {
        const tankList = await getAllTankByIdc(selectedStation, user);
        setTanks(tankList);

        if (tankList.length > 0) {
          setSelectedTank(tankList[0].idConf);
        }
      } catch (error) {
        console.error("Error fetching data tank:", error);
      }
    };

    fetchTanks();
  }, [user, selectedStation]);

  useEffect(() => {
  if (!selectedStation || !user) {
          return;
        }
    if (selectedTank) {
      getTankMeasurementByPeriod(selectedStation, user, selectedTank, periode)
        .then((measurementData) => {
          setChartData((prevData) => ({ ...prevData, tankMeasurementData: measurementData }));
        })
        .catch((error) => {
          console.error('Error fetching tank measurement data: ', error);
        });

      getTankLevelByPeriod(user, selectedStation, selectedTank, periode)
        .then((levelData) => {
          setChartData((prevData) => ({ ...prevData, tankLevelData: levelData }));
        })
        .catch((error) => {
          console.error('Error fetching tank level data: ', error);
        });
    }
  }, [selectedStation, user, selectedTank]);

  // Ensure the data points are aligned
  const alignedChartData = alignDataPoints(chartData);

  // Process and merge data for the chart
  const chartSeries = [
    {
      name: 'Changed Volume',
      type: 'line',
      data: alignedChartData.tankLevelData.map((item) => ({
        x: item.dateTime,
        y: item.tankVolumeChanges,
      })),
    },
    {
      name: 'Tank Volume',
      type: 'line',
      data: alignedChartData.tankMeasurementData.map((item) => ({
        x: item.dateTime,
        y: item.productVolume,
      })),
    },
  ];

  return (
    <div>
      <TankChartMenu
        tanks={tanks}
        selectedTank={selectedTank}
        onChange={(tank) => setSelectedTank(tank ? tank.toString() : null)}
      />
      {alignedChartData.tankLevelData.length > 0 && alignedChartData.tankMeasurementData.length > 0 && (
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
  tankMeasurementData: tankMeasurementData[];
  tankLevelData: tankLevelData[];
} => {
  return data;
};

export default ChartComponent;
