export const chartOptions2 : any = {
  options: {
  chart: {
    height: 350,
    type: 'line', // Specify 'line' as the chart type
    stacked: false,
  },
  xaxis: {
    type: 'datetime',
  },
  yaxis: [
    {
      title: {
        text: 'Tank Level',
      },
    },
    {
      opposite: true,
      title: {
        text: 'Fuel Volume',
      },
    },
  ],
    title: {
      text: 'Tank Data',
      align: 'left',
    },
    subtitle: {
      text: 'Tank level and fuel volume over time',
      align: 'left',
    },
    dataLabels: {
      enabled: true,
    },
    tooltip: {
      enabled: true,
      x: {
        format: 'dd/MM/yy HH:mm',
      },
    },
    legend: {
      show: true,
    },
    colors: ['#008FFB', '#FF4560'],
    grid: {
      row: {
        colors: ['transparent', 'transparent'],
        opacity: 0.2,
      },
    },
    markers: {
      size: 6,
    },
  },
};
