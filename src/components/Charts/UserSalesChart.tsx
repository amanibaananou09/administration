import { useColorModeValue } from "@chakra-ui/react";
import { getAllStatVent } from "common/api/chart-api";
import { PeriodeProps } from "common/react-props";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { useAuth } from "store/AuthContext";
import { useESSContext } from "store/ESSContext";
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
    datasets: [
      {
        name: "Gasoil",
        data: [],
      },
      {
        name: "Super Sans Plomb",
        data: [],
      },
      {
        name: "Gasoil Sans Soufre",
        data: [],
      },
    ],
  });
  const textColor = useColorModeValue("gray.700", "white");

  useEffect(() => {
    const fetchData = async () => {
      const dataSet1: number[] = [];
      const dataSet2: number[] = [];
      const dataSet3: number[] = [];
      const uniqueUserIds = new Set<number>();
      if (!user) {
        return;
      }
      if (selectedStation) {
        const res = await getAllStatVent(
          selectedStation,
          periode,
          startDate,
          endDate,
        );

        try {
          if (Array.isArray(res)) {
            for (const val of res) {
              if (val.fuelGradeName === "Gasoil") {
                dataSet1.push(val.sumVolume);
              } else if (val.fuelGradeName === "Super Sans Plomb") {
                dataSet2.push(val.sumVolume);
              } else if (val.fuelGradeName === "Gasoil Sans Soufre") {
                dataSet3.push(val.sumVolume);
              }
              if (val.userId) {
                uniqueUserIds.add(val.userId);
              }
            }
          } else {
            console.error("res is not an array:", res);
          }

          const labelSet = [...uniqueUserIds].map((userId) => `user ${userId}`);
          setData({
            labels: labelSet,
            datasets: [
              {
                name: "Gasoil",
                data: dataSet1,
                backgroundColor: "rgba(32,178,170,0.6)",
                borderWidth: 1,
              },
              {
                name: "Super Sans Plomb",
                data: dataSet2,
                borderWidth: 1,
                backgroundColor: "rgba(53, 162, 235, 0.5)",
              },
              {
                name: "Gasoil Sans Soufre",
                data: dataSet3,
                borderWidth: 1,
                backgroundColor: "rgba(255, 99, 132, 0.5)",
              },
            ],
          });
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();
  }, [selectedStation, periode, startDate, endDate]);

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
