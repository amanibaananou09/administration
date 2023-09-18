export const barChartData = [
  {
    name: "Gasoil",
    data: [15, 22],
  },
  {
    name: "Gasoil sans soufre",
    data: [39],
  },
  {
    name: "super sans plomb",
    data: [70],
  },
];
export const stackedBarChartData = barChartData.map((series) => ({
  name: series.name,
  data: series.data.map((value) => ({
    x: series.name,
    y: value,
  })),
}));
export const barChartOptions = {
  chart: {
    stacked: true,
    toolbar: {
      show: false,
    },
  },
  plotOptions: {
    bar: {
      horizontal: true,
    },
  },
  xaxis: {
    categories: ["user 1", "user 2"],
    labels: {
      style: {
        colors: "#A0AEC0",
        fontSize: "12px",
      },
    },
    axisBorder: {
      show: false,
    },
  },
  yaxis: {
    show: true,
    color: "#A0AEC0",
    labels: {
      show: true,
      style: {
        colors: "#A0AEC0",
        fontSize: "14px",
      },
    },
  },
  fill: {
    opacity: 1,
  },
  grid: {
    strokeDashArray: 5,
  },
};
export const lineChartData = [
  {
    name: "Mobile apps",
    data: [50, 40, 300, 220, 500, 250, 400, 230, 500],
  },
  {
    name: "Websites",
    data: [30, 90, 40, 140, 290, 290, 340, 230, 400],
  },
];

export const lineChartOptions = {
  chart: {
    toolbar: {
      show: false,
    },
  },
  tooltip: {
    theme: "dark",
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
  },
  xaxis: {
    type: "datetime",
    categories: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    axisTicks: {
      show: false,
    },
    axisBorder: {
      show: false,
    },
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
  },
  legend: {
    show: false,
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
    colors: ["#fff", "#3182CE"],
  },
  colors: ["#fff", "#3182CE"],
};

export const dashedlineOption = {
  chart: {
    height: 350,
    zoom: {
      enabled: false,
    },
    toolbar: {
      show: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    width: [5, 7, 5],
    curve: "straight",
    dashArray: [0, 8, 5],
  },
  legend: {
    tooltipHoverFormatter: function (val, opts) {
      return (
        val +
        " - " +
        opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
        ""
      );
    },
  },
  markers: {
    size: 0,
    hover: {
      sizeOffset: 6,
    },
  },
  xaxis: {
    categories: [
      "01 Jan",
      "02 Jan",
      "03 Jan",
      "04 Jan",
      "05 Jan",
      "06 Jan",
      "07 Jan",
      "08 Jan",
      "09 Jan",
      "10 Jan",
      "11 Jan",
      "12 Jan",
    ],
  },
  tooltip: {
    y: [
      {
        title: {
          formatter: function (val) {
            return val + " (mins)";
          },
        },
      },
      {
        title: {
          formatter: function (val) {
            return val + " per session";
          },
        },
      },
      {
        title: {
          formatter: function (val) {
            return val;
          },
        },
      },
    ],
  },
  grid: {
    borderColor: "#f1f1f1",
  },
};
export const dashedlineData = [
  {
    name: "Session Duration",
    data: [45, 52, 38, 24, 33, 26, 21, 20, 6, 8, 15, 10],
  },
  {
    name: "Page Views",
    data: [35, 41, 62, 42, 13, 18, 29, 37, 36, 51, 32, 35],
  },
  {
    name: "Total Visits",
    data: [87, 57, 74, 99, 75, 38, 62, 47, 82, 56, 45, 47],
  },
];

export const columnChartOption = {
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
  yaxis: {
    labels: {
      formatter: function (y) {
        return y.toFixed(0);
      },
    },
  },
  xaxis: {
    type: "datetime",
    categories: [],
    labels: {
      rotate: -90,
    },
  },
  colors: ["#F15B46", "#FEB019", "#38B2AC"],
  stroke: {
    show: true,
    width: 2,
    colors: ["transparent"],
  },
};

export const columnChartData = [
  {
    name: "Sales Volume",
    data: [
      -18.2,
      -14.16,
      -11.1,
      -6.09,
      0.34,
      3.88,
      13.07,
      -27.03,
      -54.4,
      -47.2,
      -43.3,
      -18.6,
      -41.1,
      -39.6,
      -37.6,
      -29.4,
      -21.4,
      -2.4,
    ],
  },
  {
    name: "Change Volume",
    data: [1.45, 5.42, 5.9, -0.42, -12.6, -18.1, -18.2, -14.16, -11.1, -6.09],
  },
  {
    name: "Leak",
    data: [
      0.34,
      3.88,
      13.07,
      5.8,
      2,
      7.37,
      8.1,
      13.57,
      15.75,
      17.1,
      19.8,
      -27.03,
      -54.4,
      -47.2,
      -43.3,
      -18.6,
      -48.6,
      -41.1,
      -39.6,
      -37.6,
      -29.4,
      -21.4,
      -2.4,
    ],
  },
];
