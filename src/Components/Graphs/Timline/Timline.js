import React, { useEffect, useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { itemsSelector, getItems } from "../../../store/user/userSlice";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { data } from "../../../data/data";

export const Timline = (props) => {
  // set up dispatch
  const dispatch = useDispatch();

  // fetch data from our store
  const { loading, error, items } = useSelector(itemsSelector);

  // hook to fetch items
  useEffect(() => {
    dispatch(getItems());
  }, []);

  // Themes begin
  am4core.useTheme(am4themes_animated);
  // Themes end
  useLayoutEffect(() => {
    // Create chart instance
    var chart = am4core.create("timelinediv", am4charts.XYChart);

    // Add data
    console.log(data.dataTimline);
    chart.data = items.dataTimline?.map((item, index) => {
      return { ...item, valueNext: data.dataTimline[index + 1]?.value };
    });
    console.log("chart", chart.data);

    // Create axes
    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "day";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 30;

    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.min = 0;

    // Create series
    var series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = "value";
    series.dataFields.categoryX = "day";

    // Add series for showing variance arrows
    var series2 = chart.series.push(new am4charts.ColumnSeries());
    series2.dataFields.valueY = "valueNext";
    series2.dataFields.openValueY = "value";
    series2.dataFields.categoryX = "day";
    series2.columns.template.width = 1;
    series2.fill = am4core.color("#555");
    series2.stroke = am4core.color("#555");

    // Add a triangle for arrow tip
    var arrow = series2.bullets.push(new am4core.Triangle());
    arrow.width = 10;
    arrow.height = 10;
    arrow.horizontalCenter = "middle";
    arrow.verticalCenter = "top";
    arrow.dy = -1;

    // Set up a rotation adapter which would rotate the triangle if its a negative change
    arrow.adapter.add("rotation", function (rotation, target) {
      return getVariancePercent(target.dataItem) < 0 ? 180 : rotation;
    });

    // Set up a rotation adapter which adjusts Y position
    arrow.adapter.add("dy", function (dy, target) {
      return getVariancePercent(target.dataItem) < 0 ? 1 : dy;
    });

    // Add a label
    var label = series2.bullets.push(new am4core.Label());
    label.padding(10, 10, 10, 10);
    label.text = "";
    label.fill = am4core.color("#0c0");
    label.strokeWidth = 0;
    label.horizontalCenter = "middle";
    label.verticalCenter = "bottom";
    label.fontWeight = "bolder";

    // Adapter for label text which calculates change in percent
    label.adapter.add("textOutput", function (text, target) {
      var percent = getVariancePercent(target.dataItem);
      return percent ? percent + "%" : text;
    });

    // Adapter which shifts the label if it's below the variance column
    label.adapter.add("verticalCenter", function (center, target) {
      return getVariancePercent(target.dataItem) < 0 ? "top" : center;
    });

    // Adapter which changes color of label to red
    label.adapter.add("fill", function (fill, target) {
      return getVariancePercent(target.dataItem) < 0
        ? am4core.color("#c00")
        : fill;
    });

    function getVariancePercent(dataItem) {
      if (dataItem) {
        var value = dataItem.valueY;
        var openValue = dataItem.openValueY;
        var change = value - openValue;
        return Math.round((change / openValue) * 100);
      }
      return 0;
    }
  }, [items]);

  return (
    <div id="timelinediv" style={{ width: "100%", height: "500px" }}></div>
  );
};
