import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { getAllTankByIdc, getTankLevelSelected } from "common/api.js";
import { useAuth } from "store/AuthContext";
import { Flex } from "@chakra-ui/react";
import { useESSContext } from "store/ESSContext";
import TankChartMenu from "components/ChartMenu/TankChartMenu";
import { tankSalesChartConfig } from "common/chartOptions";
const TankSalesChart = () => {
    const { user: { token }, } = useAuth();
    const { selectedStation: { controllerId }, } = useESSContext();
    const [selectedTank, setSelectedTank] = useState(null);
    const [tanks, setTanks] = useState([]);
    const [chartOptions, setChartOptions] = useState(tankSalesChartConfig.options);
    const [chartSeries, setChartSeries] = useState(tankSalesChartConfig.series);
    useEffect(() => {
        const fetchTanks = async () => {
            try {
                const tankList = await getAllTankByIdc(controllerId, token);
                setTanks(tankList);
                // select default Tank
                if (tankList.length > 0) {
                    setSelectedTank(tankList[0].idConf);
                }
            }
            catch (error) {
                console.error("Error fetching data tank:", error);
            }
        };
        fetchTanks();
    }, [token, controllerId]);
    useEffect(() => {
        const updateChart = async () => {
            try {
                const chartData = await getTankLevelSelected(selectedTank, token);
                const filteredData = {
                    categories: chartData.map((item) => {
                        const date1 = new Date(item.dateTime);
                        return date1.toLocaleString("en-US", {
                            weekday: "short",
                            month: "short",
                            day: "numeric",
                            hour: "numeric",
                        });
                    }),
                    series: [
                        {
                            name: "Sales Volume",
                            data: chartData.map((item) => item.salesVolume),
                        },
                        {
                            name: "Change Volume",
                            data: chartData.map((item) => -item.changedVolume),
                        },
                        {
                            name: "Leak",
                            data: chartData.map((item) => item.salesVolume - item.changedVolume),
                        },
                    ],
                };
                setChartOptions({
                    ...chartOptions,
                    xaxis: {
                        categories: filteredData.categories,
                    },
                });
                setChartSeries(filteredData.series);
            }
            catch (error) {
                console.error("Error fetching data de fuite:", error);
            }
        };
        if (selectedTank) {
            updateChart(token, tanks);
        }
    }, [selectedTank]);
    return (React.createElement(React.Fragment, null,
        React.createElement(Flex, { marginLeft: "3%" },
            React.createElement(TankChartMenu, { tanks: tanks, selectedTank: selectedTank, onChange: (tank) => setSelectedTank(tank) })),
        React.createElement(ReactApexChart, { options: chartOptions, series: chartSeries, type: "bar", width: "100%", height: "490px" })));
};
export default TankSalesChart;
