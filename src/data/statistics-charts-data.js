import { chartsConfig } from "@/configs";

const websiteViewsChart = {
  type: "bar",
  height: 220,
  series: [
    {
      name: "Leads",
      data: [50, 20, 10, 22, 50, 10, 40],
    },
  ],
  options: {
    ...chartsConfig,
    colors: "#388e3c",
    plotOptions: {
      bar: {
        columnWidth: "16%",
        borderRadius: 5,
      },
    },
    xaxis: {
      ...chartsConfig.xaxis,
      categories: ["M", "T", "W", "T", "F", "S", "S"],
    },
  },
};

const dailySalesChart = {
  type: "line",
  height: 220,
  series: [
    {
      name: "Sales",
      data: [50, 40, 300, 320, 400, 350, 200, 230, 500,100,600,0],
    },
  ],
  options: {
    ...chartsConfig,
    colors: ["#0288d1"],
    stroke: {
      lineCap: "round",
    },
    markers: {
      size: 5,
    },
    xaxis: {
      ...chartsConfig.xaxis,
      categories: [
        "Jan",
        "Feb",
        "March",
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
    },
  },
};

const completedTaskChart = {
  type: "line",
  height: 220,
  series: [
    {
      name: "Profit",
      data: [50, 40, 300, 320, 500, 350, 200, 230, 500, 100,0,550],
    },
  ],
  options: {
    ...chartsConfig,
    colors: ["#388e3c"],
    stroke: {
      lineCap: "round",
    },
    markers: {
      size: 5,
    },
    xaxis: {
      ...chartsConfig.xaxis,
      categories: [
        "Jan",
        "Feb",
        "March",
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
    },
  },
};
const completedTasksChart = {
  ...completedTaskChart,
  series: [
    {
      name: "Clients",
      data: [50, 40, 300, 220, 500, 250, 400, 230, 500, 200,10,0],
    },
  ],
};

export const statisticsChartsData = [
  {
    color: "white",
    title: "Leads",
    description: "Leads closed per week",
    footer: "Last successful call - 5 hours ago",
    chart: websiteViewsChart,
  },
  {
    color: "white",
    title: "Profit",
    description: "Profit made per month",
    footer: "updated 4 hours ago",
    chart: dailySalesChart,
  },
  {
    color: "white",
    title: "Client Performance",
    description: "Clients boarded per month",
    footer: "just updated",
    chart: completedTasksChart,
  },
];

export default statisticsChartsData;
