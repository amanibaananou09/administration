import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { getAllTankByIdc } from "common/api";
import { useAuth } from "../../store/AuthContext";
import { useESSContext } from "../../store/ESSContext";
import { Tank, tankLevelData, tankMeasurementData } from "common/model";
import { chartOptions2 } from "components/Charts/ChartOptions2";
import TankChartMenu from "components/ChartMenu/TankChartMenu";

const ChartComponent = () => {
  const [chartData, setChartData] = useState({
    tankMeasurementData: [] as tankMeasurementData[],
    tankLevelData: [] as tankLevelData[],
  });
  const [selectedTank, setSelectedTank] = useState<string | null>(null);
  const [tanks, setTanks] = useState<Tank[]>([]);
  const [chartOptions, setChartOptions2] = useState(
    chartOptions2.options,
  );

  const { user } = useAuth();
  const token = user?.token;
  const {
    selectedStation: {
      controllerPts: { id: controllerId },
    },
  } = useESSContext();

  useEffect(() => {
    const fetchTanks = async () => {
      try {
        const tankList = await getAllTankByIdc(controllerId, token);
        setTanks(tankList);

        // Select default Tank
        if (tankList.length > 0) {
          setSelectedTank(tankList[0].idConf);
        }
      } catch (error) {
        console.error("Error fetching data tank:", error);
      }
    };

    fetchTanks();
  }, [token, controllerId]);

  /*  useEffect(() => {
     // Fetch tank measurement data for the selected tank
    if (selectedTank) {
       getTankMeasurementByPeriod(controllerId, token, selectedTank)
         .then((measurementData) => {
           setChartData((prevData) => ({ ...prevData, tankMeasurementData: measurementData }));
         })
         .catch((error) => {
           console.error('Error fetching tank measurement data: ', error);
         });

       // Fetch tank level data for the selected tank
       getTankLevelByPeriod(token, controllerId, selectedTank)
         .then((levelData) => {
           setChartData((prevData) => ({ ...prevData, tankLevelData: levelData }));
         })
         .catch((error) => {
           console.error('Error fetching tank level data: ', error);
         });
     }
   }, [controllerId, token, selectedTank]);*/

  // Process and merge data for the chart
  const chartSeries = [
    {
      name: 'Tank Level',
      type: 'line',
      data: chartData.tankLevelData.map((item) => ({
        x: new Date(item.dateTime).getTime(),
        y: item.tankVolumeChanges,
      })),
    },
    {
      name: 'Fuel Volume',
      type: 'line',
      data: chartData.tankMeasurementData.map((item) => ({
        x: new Date(item.dateTime).getTime(),
        y: item.productVolume,
      })),
    },
  ];

  // Function to handle tank selection
  const handleTankSelect = (tankId: string) => {
    setSelectedTank(tankId);
  };

  return (
/*    <div>
      <TankChartMenu
        tanks={tanks}
        selectedTank={selectedTank}
        onChange={handleTankSelect}
      />*/
      <ReactApexChart
        options={chartOptions}
        series={chartSeries}
        type="line"
        width="100%"
        height="500px"
      />
    // </div>
  );
};

export default ChartComponent;
