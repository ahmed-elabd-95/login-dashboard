import React, { useRef, useLayoutEffect } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4plugins_timeline from "@amcharts/amcharts4/plugins/timeline";
import * as am4plugins_bullets from "@amcharts/amcharts4/plugins/bullets";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

export const Bars = (props) => {
  /* Chart code */
  // Themes begin
  am4core.useTheme(am4themes_animated);
  // Themes end
  useLayoutEffect(() => {
    // Create chart instance

    let chart = am4core.create("barsdiv", am4charts.XYChart);
    chart.colors.step = 2;

    chart.legend = new am4charts.Legend();
    chart.legend.position = "top";
    chart.legend.paddingBottom = 20;
    chart.legend.labels.template.maxWidth = 95;

    let xAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    xAxis.dataFields.category = "category";
    xAxis.renderer.cellStartLocation = 0.1;
    xAxis.renderer.cellEndLocation = 0.9;
    xAxis.renderer.grid.template.location = 0;

    let yAxis = chart.yAxes.push(new am4charts.ValueAxis());
    yAxis.min = 0;

    function createSeries(value, name) {
      let series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueY = value;
      series.dataFields.categoryX = "category";
      series.name = name;

      series.events.on("hidden", arrangeColumns);
      series.events.on("shown", arrangeColumns);

      let bullet = series.bullets.push(new am4charts.LabelBullet());
      bullet.interactionsEnabled = false;
      bullet.dy = 30;
      bullet.label.text = "{valueY}";
      bullet.label.fill = am4core.color("#ffffff");

      return series;
    }

    chart.data = [
      {
        category: "Day #1",
        first: 40,
        second: 55,
        third: 60,
      },
      {
        category: "Day #2",
        first: 30,
        second: 78,
        third: 69,
      },
      {
        category: "Day #3",
        first: 27,
        second: 40,
        third: 45,
      },
      {
        category: "Day #4",
        first: 50,
        second: 33,
        third: 22,
      },
      {
        category: "Day #5",
        first: 60,
        second: 73,
        third: 42,
      },
      {
        category: "Day #6",
        first: 40,
        second: 55,
        third: 14,
      },
      {
        category: "Day #7",
        first: 50,
        second: 33,
        third: 22,
      },
      {
        category: "Day #8",
        first: 50,
        second: 33,
        third: 22,
      },
      {
        category: "Day #9",
        first: 40,
        second: 34,
        third: 32,
      },
      {
        category: "Day #10",
        first: 54,
        second: 25,
        third: 41,
      },
    ];

    createSeries("first", "Metal Material");
    createSeries("second", "Plastic");
    createSeries("third", "Glass");

    function arrangeColumns() {
      let series = chart.series.getIndex(0);

      let w =
        1 -
        xAxis.renderer.cellStartLocation -
        (1 - xAxis.renderer.cellEndLocation);
      if (series.dataItems.length > 1) {
        let x0 = xAxis.getX(series.dataItems.getIndex(0), "categoryX");
        let x1 = xAxis.getX(series.dataItems.getIndex(1), "categoryX");
        let delta = ((x1 - x0) / chart.series.length) * w;
        if (am4core.isNumber(delta)) {
          let middle = chart.series.length / 2;

          let newIndex = 0;
          chart.series.each(function (series) {
            if (!series.isHidden && !series.isHiding) {
              series.dummyData = newIndex;
              newIndex++;
            } else {
              series.dummyData = chart.series.indexOf(series);
            }
          });
          let visibleCount = newIndex;
          let newMiddle = visibleCount / 2;

          chart.series.each(function (series) {
            let trueIndex = chart.series.indexOf(series);
            let newIndex = series.dummyData;

            let dx = (newIndex - trueIndex + middle - newMiddle) * delta;

            series.animate(
              { property: "dx", to: dx },
              series.interpolationDuration,
              series.interpolationEasing
            );
            series.bulletsContainer.animate(
              { property: "dx", to: dx },
              series.interpolationDuration,
              series.interpolationEasing
            );
          });
        }
      }
    }
  }, []);

  return <div id="barsdiv" style={{ width: "100%", height: "500px" }}></div>;
};