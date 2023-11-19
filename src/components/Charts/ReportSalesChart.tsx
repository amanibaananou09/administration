import { useEffect, useState } from "react";
import { useAuth } from "store/AuthContext";

import { Flex, Text } from "@chakra-ui/react";
import { getChartByFuelPumpPeriod } from "common/api/chart-api";
import { createReportSalesChartOptions } from "common/chartOptions";
import { ChartData, Filter } from "common/model";
import { PeriodeProps } from "common/react-props";
import ReportSalesChartMenu from "components/ChartMenu/ReportSalesChartMenu";
import ReactApexChart from "react-apexcharts";
import { useESSContext } from "store/ESSContext";

export const ReportSalesChart = ({ periode, startDate, endDate }: PeriodeProps) => {
  const { selectedStation } = useESSContext();
  const { user } = useAuth();

  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    datasets: [
      {
        name: "",
        data: [],
      },
    ],
  });

  const [filter, setFilter] = useState<Filter>({
    fuelGrade: "all",
    pump: "all",
    chartType: "amount",
  });

  const handleMenuChange = (newFilter: Filter) => {
    setFilter({ ...newFilter });
  };

  const updateChartData = async () => {
    const { fuelGrade, pump, chartType } = filter;
    if (!selectedStation || !user) {
      return;
    }
    try {
      const data = await getChartByFuelPumpPeriod(
        selectedStation,
        filter,
        periode,
        startDate,
        endDate,
      );

      const filteredData: ChartData = {
        labels: data.map((item: { date: string; dateF: string }) => {
          if (chartType === "amount" && pump === "all" && fuelGrade === "all") {
            return item.date;
          } else if (
            (chartType === "amount" && pump !== "all" && fuelGrade !== "all") ||
            chartType === "volume"
          ) {
            return item.dateF;
          } else {
            return item.date;
          }
        }),

        datasets: [
          {
            name: chartType === "amount" ? "Amount" : "Volume",
            data: data.map((item: { sum: number; sumF: number }) => {
              if (
                chartType === "amount" &&
                pump === "all" &&
                fuelGrade === "all"
              ) {
                return item.sum;
              } else if (
                (chartType === "amount" &&
                  pump !== "all" &&
                  fuelGrade !== "all") ||
                chartType === "volume"
              ) {
                return item.sumF;
              } else {
                return item.sum;
              }
            }),
            borderWidth: 1,
          },
        ],
      };
      setChartData(filteredData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    // Fetch data when filter or periode changes
    updateChartData();
  }, [filter, selectedStation, user, periode, startDate, endDate]);

  return (
    <>
      <ReportSalesChartMenu filter={filter} onChange={handleMenuChange} />

      <ReactApexChart
        options={createReportSalesChartOptions(chartData.labels)}
        series={chartData.datasets}
        type="bar"
        width="100%"
        height="150%"
      />

      <Flex justifyContent="center" color="white" flexDirection="row">
        <Text marginRight="10px">Type: {filter.chartType}</Text>
        {filter.chartType === "amount" ? null : (
          <Text marginRight="10px">Fuel Grade: {filter.fuelGrade}</Text>
        )}
        <Text marginRight="10px">Pump: {filter.pump}</Text>
      </Flex>
    </>
  );
};

export default ReportSalesChart;
