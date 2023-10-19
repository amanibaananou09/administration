import { Flex, Text } from "@chakra-ui/react";
import { getChartByFuelPumpPeriod, getChartByFuelTankPeriod } from "common/api";
import { createReportSalesChartOptions } from "common/chartOptions";
import { ChartData, Filter } from "common/model";
import ReportSalesChartMenu from "components/ChartMenu/ReportSalesChartMenu";
import { useCallback, useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useAuth } from "store/AuthContext";
import { useESSContext } from "store/ESSContext";

const ReportSalesChart = () => {
  const {
    selectedStation: { controllerId },
  } = useESSContext();

  const { user } = useAuth();
  const token = user?.token || "";

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

  const [filter, setFilter] = useState<Filter>({
    type: "sale",
    fuelGrade: "all",
    pump: "all",
    tank: "all",
    period: "weekly",
    chartType: "amount",
  });

  const handleMenuChange = (newFilter: Filter) => {
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
            borderWidth: 1,
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
  }, [filter, controllerId, token]);
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
      <Flex justifyContent="center" color="white" flexDirection="row">
        <Text marginRight="10px">Type: {filter.type}</Text>
        <Text marginRight="10px">Fuel Grade: {filter.fuelGrade}</Text>
        {filter.type === "sale" ? (
          <Text marginRight="10px">Pump: {filter.pump}</Text>
        ) : (
          <Text marginRight="10px">Tank: {filter.tank}</Text>
        )}
        <Text marginRight="10px">Period: {filter.period}</Text>
      </Flex>
    </>
  );
};

export default ReportSalesChart;
