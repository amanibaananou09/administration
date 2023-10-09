import React, { useState, useEffect, useCallback, ReactElement } from "react";
import ReactApexChart from "react-apexcharts";
import { Flex, Text, FlexProps } from "@chakra-ui/react";
import { useAuth } from "src/store/AuthContext";
import {
  getChartByFuelPumpPeriod,
  getChartByFuelTankPeriod,
} from "src/common/api";
import { useESSContext } from "src/store/ESSContext";
import ReportSalesChartMenu from "src/components/ChartMenu/ReportSalesChartMenu";
import { createReportSalesChartOptions } from "src/common/chartOptions";

interface ChartData {
  labels: string[];
  datasets: {
    name: string;
    data: number[];
    backgroundColor: string;
  }[];
}

const ReportSalesChart: React.FC = (): ReactElement => {
  const { selectedStation } = useESSContext();
  const controllerId =
    typeof selectedStation === "string" ? selectedStation : null;
  const { user } = useAuth();

  const [chartData, setChartData] = useState<ChartData>({
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

  const handleMenuChange = (newFilter: any) => {
    setFilter({ ...newFilter });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await updateChartData();
      } catch (error) {
        console.error("Error fetching data fuelgrades:", error);
      }
    };

    fetchData();
  }, [filter, controllerId]);

  const updateChartData = useCallback(async () => {
    const token = user ? user.token : null;

    const { type, fuelGrade, pump, tank, period } = filter;

    try {
      let data;
      if (type === "sale" && controllerId && token) {
        data = await getChartByFuelPumpPeriod(
          controllerId,
          fuelGrade,
          pump,
          period,
          token,
        );
      } else if (type === "purchase" && controllerId && token) {
        data = await getChartByFuelTankPeriod(
          controllerId,
          fuelGrade,
          tank,
          period,
          token,
        );
      }

      const filteredData: ChartData = {
        labels: [],
        datasets: [
          {
            name: type === "sale" ? "Sale" : "Purchase",
            data:
              type === "sale"
                ? data.map((item: { sumF: any }) => item.sumF)
                : data.map((item: { totalVolume: any }) => item.totalVolume),
            backgroundColor: data.map((item: { nameF: string }) => {
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
          },
        ],
      };

      if (data) {
        switch (period) {
          case "weekly":
            filteredData.labels = data.map(
              (item: { dateF: string; nameF: any; pump: any }) => {
                const weekAbbreviation = item.dateF.substring(0, 3);
                return `${weekAbbreviation}\n${item.nameF}\n(pump${item.pump})`;
              },
            );
            break;
          case "monthly":
            filteredData.labels = data.map(
              (item: { dateF: any; nameF: any; pump: any }) =>
                `${item.dateF}\n${item.nameF}\n(pump${item.pump})`,
            );
            break;
          case "yearly":
            filteredData.labels = data.map(
              (item: { [x: string]: any; dateF: string; nameF: any }) => {
                const yearAbbreviation = item.dateF.substring(0, 3);
                const typeLabel = filter.type === "sale" ? "pump" : "tank";
                return `${yearAbbreviation}\n${item.nameF}\n(${typeLabel}${item[typeLabel]})`;
              },
            );
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
  }, [filter, controllerId, user]);

  return (
    <>
      <Flex style={{ marginLeft: "3%" }}>
        <ReportSalesChartMenu filter={filter} onChange={handleMenuChange} />
      </Flex>
      <ReactApexChart
        options={createReportSalesChartOptions(chartData.labels)}
        series={chartData.datasets}
        type="bar"
        width="100%"
        height="150%"
      />
      <Flex justifyContent="center" color="white" flexDirection="row">
        <Text style={{ marginRight: "10px" }}>Type: {filter.type}</Text>
        <Text style={{ marginRight: "10px" }}>
          Fuel Grade: {filter.fuelGrade}
        </Text>
        {filter.type === "sale" ? (
          <Text style={{ marginRight: "10px" }}>Pump: {filter.pump}</Text>
        ) : (
          <Text style={{ marginRight: "10px" }}>Tank: {filter.tank}</Text>
        )}
        <Text style={{ marginRight: "10px" }}>Period: {filter.period}</Text>
      </Flex>
    </>
  );
};

export default ReportSalesChart;
