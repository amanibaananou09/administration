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

export const tankLevelChartConfig: any = {
  options: {
    chart: {
      id: "dashed-line",
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: [],
      style: {
        fontSize: "10px",
      },
    },
    yaxis: {
      beginAtZero: true,
      tickAmount: 12,
      labels: {
        formatter: function (value: number) {
          return value.toFixed(2);
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 100,
        },
      },
    },
  },
  series: [
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
};

export const tankSalesChartConfig = {
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