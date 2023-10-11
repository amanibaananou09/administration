import ApexOptions from "react-apexcharts";
import  Series  from "react-apexcharts";

export const createReportSalesChartOptions = (labels: string[]): object => {
  return {
    chart: {
      toolbar: {
        show: false,
      },
      legend: {
        show: true,
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
      categories: labels,
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
};

export const tankSalesChartConfig: object = {
  options: {
    chart: {
      height: 350,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        columnWidth: "80%",
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: [],
    },
    yaxis: [
      {
        labels: {
          formatter: function (value: number) {
            return value.toFixed(2);
          },
        },
      },
    ],
    colors: ["#F15B46", "#FEB019", "#38B2AC"],
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
  },
  series: [
    {
      name: "Sales Volume",
      data: [],
    },
    {
      name: "Change Volume",
      data: [],
    },
    {
      name: "Leak",
      data: [],
    },
  ],
};