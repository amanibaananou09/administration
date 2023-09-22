import React, { useState, useEffect, useCallback } from "react";
import ReactApexChart from "react-apexcharts";
import { Flex } from "@chakra-ui/react";
import { useAuth } from "store/AuthContext";
import {
  getChartByFuelPumpPeriod,
  getChartByFuelTankPeriod,
} from "common/api.js";
import { useESSContext } from "store/ESSContext";
import ReportSalesChartMenu from "components/ChartMenu/ReportSalesChartMenu";

const ReportSalesChart = () => {
  const {
    selectedStation: { controllerId },
  } = useESSContext();

  const { user } = useAuth();

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        name: "",
        data: [],
        backgroundColor: "",
      },
    ],
  });

  const [filter, setFilter] = useState({
    type: "sale",
    fuelGrade: "all",
    pump: "all",
    tank: "all",
    period: "weekly",
  });

  const handleMenuChange = (newFilter) => {
    setFilter({ ...newFilter });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        updateChartData();
      } catch (error) {
        console.error("Error fetching data fuelgrades:", error);
      }
    };

    fetchData();
  }, [filter, controllerId]);

  const updateChartData = useCallback(async () => {
    const { token } = user;

    const { type, fuelGrade, pump, tank, period } = filter;

    try {
      let data;
      if (type === "sale") {
        data = await getChartByFuelPumpPeriod(
          controllerId,
          fuelGrade,
          pump,
          period,
          token,
        );
      } else if (type === "purchase") {
        data = await getChartByFuelTankPeriod(
          controllerId,
          fuelGrade,
          tank,
          period,
          token,
        );
      }

      const filteredData = {
        labels: [],
        datasets: [
          {
            label: type === "sale" ? "Sale" : "Purchase",
            data:
              type === "sale"
                ? data.map((item) => item.sumF)
                : data.map((item) => item.totalVolume),
            backgroundColor: data.map((item) => {
              if (item.nameF === "Gasoil Sans Soufre") {
                return "rgba(0, 255, 0, 0.5)";
              } else if (item.nameF === "Super Sans Plomb") {
                return "rgba(255, 0, 0, 0.5)";
              } else if (item.nameF === "Gasoil") {
                return "rgba(0, 0, 255, 0.5)";
              } else {
                return "rgba(75, 192, 192, 0.6)";
              }
            }),
            borderWidth: 1,
          },
        ],
      };
      if (data) {
        switch (period) {
          case "weekly":
            filteredData.labels = data.map(
              (item) => `${item.dateF}\n${item.nameF}`,
            );
            break;
          case "monthly":
            filteredData.labels = data.map(
              (item) => `${item.dateF}\n${item.nameF}`,
            );
            break;
          case "yearly":
            filteredData.labels = data.map(
              (item) => `${item.dateF}\n${item.nameF}`,
            );
            break;
          default:
            filteredData.labels = ["Apy", "May", "Jun", "Jul", "Aug"];
            break;
        }
      }
      setChartData(filteredData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [filter, controllerId]);

  const reportSalesBarChartOptions = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    tooltip: {
      theme: "dark",
    },
    dataLabels: {
      enabled: true,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      categories: chartData.labels,
      labels: {
        style: {
          colors: "#fff",
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#fff",
          fontSize: "12px",
        },
      },
      responsive: true,
      maxTicksLimit: 5,
      beginAtZero: true,
    },
    legend: {
      show: true,
      position: "bottom",
    },
    grid: {
      strokeDashArray: 5,
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        type: "vertical",
        shadeIntensity: 0.5,
        inverseColors: true,
        opacityFrom: 0.8,
        opacityTo: 0,
        stops: [],
      },
      //colors: ["#fff", "#3182CE"],
    },
    // colors: ["#fff", "#3182CE"],
    plugins: {
      grouped: {
        groupBy: "nameF",
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        dataLabels: {
          position: "top",
        },
      },
    },
  };

  return (
    <>
      <Flex marginLeft="3%">
        <ReportSalesChartMenu filter={filter} onChange={handleMenuChange} />
      </Flex>
      <ReactApexChart
        options={reportSalesBarChartOptions}
        series={chartData.datasets}
        type="bar"
        width="100%"
        height="150%"
      />
    </>
  );
};

export default ReportSalesChart;
