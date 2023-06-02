import React, { useRef, useLayoutEffect } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

export const Chart = (props) => {
  am4core.useTheme(am4themes_animated);
  useLayoutEffect(() => {

  var chart = am4core.create("chartsdiv", am4charts.PieChart);

  chart.data = [
    {
      review: "Positive",
      number: 501.9,
    },
    {
      review: "negative",
      number: 301.9,
    },
    {
      review: "Neutral",
      number: 201.1,
    },
  ];


  var pieSeries = chart.series.push(new am4charts.PieSeries());
  pieSeries.dataFields.value = "number";
  pieSeries.dataFields.category = "review";
  pieSeries.slices.template.stroke = am4core.color("#fff");
  pieSeries.slices.template.strokeOpacity = 1;

  // This creates initial animation
  pieSeries.hiddenState.properties.opacity = 1;
  pieSeries.hiddenState.properties.endAngle = -90;
  pieSeries.hiddenState.properties.startAngle = -90;

  chart.hiddenState.properties.radius = am4core.percent(0);
}, []);

  return <div id="chartsdiv" style={{ width: "100%", height: "500px" }}></div>;
};
