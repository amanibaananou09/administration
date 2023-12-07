import { getAllStatVent } from "common/api/chart-api";
import { Filter } from "components/Filter/DashBoardFilter";
import useRefresher from "hooks/use-refresher";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { useAuth } from "store/AuthContext";
import { useESSContext } from "store/ESSContext";
import { formatNumber } from "../../utils/utils";

const UserSalesChart = ({ fromDate, toDate }: Filter) => {
  const { refresh } = useRefresher();
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
        const res = await getAllStatVent(selectedStation, fromDate, toDate);
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
                data: [Number(formatNumber(val.sumVolume))],
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
  }, [selectedStation, fromDate, toDate, user, refresh]);

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
      colors: ["gray.700"],
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
          colors: "gray.700",
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
    />
  );
};

export default UserSalesChart;
