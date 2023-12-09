export const createReportSalesChartOptions = (labels: string[]): object => {return {
  chart: {
    toolbar: {
      show: false,
    },
    legend: {
      position: "top",
      horizontalAlign: "center",
      fontSize: "14px",
      fontWeight: 400,
      fontFamily: "inherit",
      colors: ["#f7f7f7"],
      markers: {
        width: 8,
        height: 8,
      },
      itemMargin: {
        horizontal: 15,
        vertical: 8,
      },
    },
  },
  tooltip: {
    theme: "dark",
  },
  dataLabels: {
    enabled: true,
    formatter: function (val: any) {
      return Number(val).toLocaleString("en-US").replace(/,/g, " ");
    },
    style: {
      colors: ['#fff'],
    },
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
      formatter: function (value: number) {
        const formattedValue = value.toLocaleString("en-US").replace(/,/g, " ");
        return formattedValue;
      },
      style: {
        colors: "#fff",
        fontSize: "14px",
      },
    },
    responsive: true,
    maxTicksLimit: 10,
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
    opacity: 1,
  },
  plotOptions: {
    bar: {
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
