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
import { createReportSalesChartOptions } from "common/chartOptions";

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
            filteredData.labels = data.map((item) => {
              const weekAbbreviation = item.dateF.substring(0, 4);
              return `${weekAbbreviation}\n${item.nameF}\n(pump${item.pump})`;
            });
            break;
          case "monthly":
            filteredData.labels = data.map(
              (item) => `${item.dateF}\n${item.nameF}\n(pump${item.pump})`,
            );
            break;
          case "yearly":
            filteredData.labels = data.map((item) => {
              const yearAbbreviation = item.dateF.substring(0, 3);
              return `${yearAbbreviation}\n${item.nameF}\n(pump${item.pump})`;
            });
            break;
          default:
            filteredData.labels = [];
            break;
        }
      }
      setChartData(filteredData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [filter, controllerId]);
  return (
    <>
      <Flex marginLeft="3%">
        <ReportSalesChartMenu filter={filter} onChange={handleMenuChange} />
      </Flex>
      <ReactApexChart
        options={createReportSalesChartOptions(chartData.labels)}
        series={chartData.datasets}
        type="bar"
        width="100%"
        height="150%"
      />
    </>
  );
};

export default ReportSalesChart;
