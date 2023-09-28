export const createReportSalesChartOptions = (labels) => {
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
