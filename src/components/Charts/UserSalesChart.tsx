import { useColorModeValue } from "@chakra-ui/react";
import { getAllStatVent } from "common/api/chart-api";
import { PeriodeProps } from "common/react-props";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { useAuth } from "store/AuthContext";
import { useESSContext } from "store/ESSContext";
import { formatNumber } from "../../utils/utils";

const UserSalesChart = ({ periode, startDate, endDate }: PeriodeProps) => {
  const { selectedStation } = useESSContext();
  const { user } = useAuth();
  const [data, setData] = useState<{
    labels: string[];
    datasets: {
      name: string;
      data: number[];
      backgroundColor?: string;
      borderWidth?: number;
    }[];
  }>({
    labels: [],
    datasets: [],
  });
  const textColor = useColorModeValue("gray.700", "white");

  function getRandomColor(): string {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  useEffect(() => {
    const fetchData = async () => {
      if (!user || !selectedStation) return;

      try {
        const res = await getAllStatVent(
          selectedStation,
          periode,
          startDate,
          endDate,
        );
        if (Array.isArray(res)) {
          const uniqueUserIds = new Set<number>();
          const datasets: {
            name: string;
            data: number[];
            backgroundColor?: string;
            borderWidth?: number;
          }[] = [];

          res.forEach((val) => {
            const datasetIndex = datasets.findIndex(
              (dataset) => dataset.name === val.fuelGradeName,
            );

            if (datasetIndex === -1) {
              datasets.push({
                name: val.fuelGradeName,
                data: [formatNumber(val.sumVolume, 2)],
                backgroundColor: getRandomColor(),
                borderWidth: 1,
              });
            } else {
              datasets[datasetIndex].data.push(val.sumVolume);
            }

            if (val.userId) {
              uniqueUserIds.add(val.userId);
            }
          });

          const labelSet = [...uniqueUserIds].map((userId) => `ID ${userId}`);
          setData({
            labels: labelSet,
            datasets,
          });
        } else {
          console.error("res is not an array:", res);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedStation, periode, startDate, endDate, user]);

  // Options for the chart
  const UserSalesBarChartOptions = {
    chart: {
      stacked: true,
      toolbar: {
        show: false,
      },
    },
    stroke: {
      width: 1,
      colors: [textColor],
    },
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
    xaxis: {
      categories: data.labels,
      labels: {
        style: {
          colors: textColor,
          fontSize: "12px",
        },
      },
      axisBorder: {
        show: false,
      },
    },
    yaxis: {
      show: false,
    },
    dataLabels: {
      enabled: true,
    },
    grid: {
      show: false,
    },
  };

  return (
    <Chart
      options={UserSalesBarChartOptions}
      series={data.datasets}
      type="bar"
      width="100%"
      height="150%"
    />
  );
};

export default UserSalesChart;
