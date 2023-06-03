import React, { useRef, useLayoutEffect, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { itemsSelector, getItems } from "../../../store/user/userSlice";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import axios from "axios";

am4core.useTheme(am4themes_animated);

export const Chart = () => {
  // set up dispatch
  const dispatch = useDispatch();

  // fetch data from our store
  const { loading, error, items } = useSelector(itemsSelector);

  // hook to fetch items
  useEffect(() => {
    dispatch(getItems());
  }, []);

  am4core.useTheme(am4themes_animated);
  useLayoutEffect(() => {
    var chart = am4core.create("chartsdiv", am4charts.PieChart);
    console.log("data111", items.data);
    chart.data = items.data.dataCharts

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
  }, [items]);

  return <div id="chartsdiv" style={{ width: "100%", height: "500px" }}></div>;
};
