import * as React from "react";
import { useTheme } from "@mui/material/styles";
// import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';/
import Title from "./Title";
import { PieChart } from "@mui/x-charts/PieChart";

// Generate Sales Data
function createData(time, amount) {
  return { time, amount };
}

const data = [
  createData("00:00", 0),
  createData("03:00", 300),
  createData("06:00", 600),
  createData("09:00", 800),
  createData("12:00", 1500),
  createData("15:00", 2000),
  createData("18:00", 2400),
  createData("21:00", 2400),
  createData("24:00", undefined),
];

export default function Chart() {
  const theme = useTheme();

  return (
    <React.Fragment>
      <Title>Storage</Title>

      <PieChart
        series={[
          {
            data: [
              { value: 30, color: "blue", label : 'images' },
              { value: 30, color: "purple" , label : 'videos'},
              { value: 30, color: "skyBlue" , label :'files'},
              { value: 100, color: "lightblue", label : 'available storage' },
            ],
            
            highlightScope: { faded: 'global', highlighted: 'item' },
            
            innerRadius: 30,
            outerRadius: 70,
            paddingAngle: 3,
            cornerRadius: 5,
            startAngle: 0,
            endAngle: 360,
            // cx: 200,
            // cy: 70,
          },
        ]}
      />
    </React.Fragment>
  );
}
