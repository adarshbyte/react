import React from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";


const LineChart = () => {
  const options = {
    title: { text: "Multiple Series Example" },
    xAxis: {
      type: "datetime", // important for timeseries
    },
    series: [
      {
        name: "Temperature",
        data: [
          [Date.UTC(2025, 0, 1), 5],
          [Date.UTC(2025, 0, 2), 7],
          [Date.UTC(2025, 0, 3), 3],
        ],
        color: "red",
      },
      {
        name: "Humidity",
        data: [
          [Date.UTC(2025, 0, 1), 55],
          [Date.UTC(2025, 0, 2), 60],
          [Date.UTC(2025, 0, 3), 58],
        ],
        color: "blue",
      },
    ],
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};
export default LineChart;
