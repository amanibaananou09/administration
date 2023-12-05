import { useEffect, useState } from "react";
import { useAuth } from "store/AuthContext";

import { Box, Stack, Text } from "@chakra-ui/react";
import { getChartByFuelPumpPeriod } from "common/api/chart-api";
import { REFRESHER_TOPIC } from "common/api/WebSocketTopics";
import { createReportSalesChartOptions } from "common/chartOptions";
import { ChartData, ChartFilter } from "common/model";
import ReportSalesChartMenu from "components/ChartMenu/ReportSalesChartMenu";
import { Filter } from "components/Filter/DashBoardFilter";
import ReactApexChart from "react-apexcharts";
import { useTranslation } from "react-i18next";
import { useSubscription } from "react-stomp-hooks";
import { useESSContext } from "store/ESSContext";
import { formatNumber } from "../../utils/utils";

export const ReportSalesChart = ({ period, fromDate, toDate }: Filter) => {
  const [refresh, setRefresh] = useState<boolean>(false);
  const { selectedStation } = useESSContext();
  const { user } = useAuth();
  const { t } = useTranslation("dashboard");

  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    datasets: [
      {
        name: "",
        data: [],
      },
    ],
  });

  const [filter, setFilter] = useState<ChartFilter>({
    fuelGrade: "all",
    pump: "all",
    chartType: "amount",
  });

  const handleMenuChange = (newFilter: ChartFilter) => {
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
        period,
        fromDate,
        toDate,
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
                return formatNumber(item.sum);
              } else if (
                (chartType === "amount" &&
                  pump !== "all" &&
                  fuelGrade !== "all") ||
                chartType === "volume"
              ) {
                return formatNumber(item.sumF);
              } else {
                return formatNumber(item.sum);
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

  useSubscription(REFRESHER_TOPIC, () => {
    setRefresh((prev) => !prev);
  });

  useEffect(() => {
    // Fetch data when filter or periode changes
    updateChartData();
  }, [filter, selectedStation, user, period, fromDate, toDate, refresh]);

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

      <Box
        p="2"
        bg="blue.500"
        width="80%"
        mt="4"
        m="0 auto"
        borderRadius="lg"
        boxShadow="0px 4px 8px rgba(0, 0, 0, 0.1)"
      >
        <Stack direction="row" spacing="10" justify="center" color="white">
          <Text fontSize="lg">
            {t("common.type")}:{" "}
            {filter.chartType === "amount"
              ? t("common.amount")
              : filter.chartType}
          </Text>
          {filter.chartType === "amount" ? null : (
            <Text fontSize="lg">
              {t("common.fuelGrades")}:{" "}
              {filter.fuelGrade === "all" ? t("common.all") : filter.fuelGrade}
            </Text>
          )}
          <Text fontSize="lg">
            {t("common.pump")}:{" "}
            {filter.pump === "all" ? t("common.all") : filter.pump}
          </Text>
        </Stack>
      </Box>
    </>
  );
};

export default ReportSalesChart;
