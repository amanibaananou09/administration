export const chartOptions2: any = {
  options: {
    chart: {
      id: "dashed-line",
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: [],
    },
    yaxis: {
      beginAtZero: true,
      labels: {
        formatter: function (value: number) {
          return value !== undefined ? value.toFixed(2) : "";
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
};
