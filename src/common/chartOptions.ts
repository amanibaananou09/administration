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
