import React, { useRef, useLayoutEffect } from "react";

import * as am4core from "@amcharts/amcharts4/core";
import * as am4plugins_timeline from "@amcharts/amcharts4/plugins/timeline";
import * as am4plugins_bullets from "@amcharts/amcharts4/plugins/bullets";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

export const Timline = (props) => {
 /**
 * ---------------------------------------
 * This demo was created using amCharts 4.
 * 
 * For more information visit:
 * https://www.amcharts.com/
 * 
 * Documentation is available at:
 * https://www.amcharts.com/docs/v4/
 * ---------------------------------------
 */

// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end
useLayoutEffect(() => {
// Create chart instance
var chart = am4core.create("timelinediv", am4charts.XYChart);

// Add data
chart.data = [{
	"Day": "1",
	"value": 60
},{
	"Day": "2",
	"value": 50
},{
	"Day": "3",
	"value": 90
},{
	"Day": "4",
	"value": 70
},{
	"Day": "5",
	"value": 60
},{
	"Day": "5",
	"value": 30
},{
	"Day": "6",
	"value": 75
},{
	"Day": "7",
	"value": 74
},{
	"Day": "8",
	"value": 60
},{
	"Day": "9",
	"value": 60
},{
	"Day": "10",
	"value": 60
},{
	"Day": "11",
	"value": 60
},{
	"Day": "12",
	"value": 40
},{
	"Day": "13",
	"value": 70
},{
	"Day": "14",
	"value": 74
},{
	"Day": "15",
	"value": 20
},{
	"Day": "16",
	"value": 66
},{
	"Day": "17",
	"value": 60
},{
	"Day": "18",
	"value": 71
},{
	"Day": "19",
	"value": 85
},{
	"Day": "20",
	"value": 41
},{
	"Day": "21",
	"value": 35
},{
	"Day": "22",
	"value": 15
},{
	"Day": "23",
	"value": 90
},{
	"Day": "24",
	"value": 48
},{
	"Day": "25",
	"value": 75
},{
	"Day": "26",
	"value": 15
},{
	"Day": "27",
	"value": 89
},{
	"Day": "28",
	"value": 78
},{
	"Day": "29",
	"value": 64
},{
	"Day": "30",
	"value": 26
}, ];

// Populate data
for (var i = 0; i < (chart.data.length - 1); i++) {
	chart.data[i].valueNext = chart.data[i + 1].value;
}

// Create axes
var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
categoryAxis.dataFields.category = "Day";
categoryAxis.renderer.grid.template.location = 0;
categoryAxis.renderer.minGridDistance = 30;

var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
valueAxis.min = 0;

// Create series
var series = chart.series.push(new am4charts.ColumnSeries());
series.dataFields.valueY = "value";
series.dataFields.categoryX = "Day";

// Add series for showing variance arrows
var series2 = chart.series.push(new am4charts.ColumnSeries());
series2.dataFields.valueY = "valueNext";
series2.dataFields.openValueY = "value";
series2.dataFields.categoryX = "Day";
series2.columns.template.width = 1;
series2.fill = am4core.color("#555");
series2.stroke = am4core.color("#555");

// Add a triangle for arrow tip
var arrow = series2.bullets.push(new am4core.Triangle);
arrow.width = 10;
arrow.height = 10;
arrow.horizontalCenter = "middle";
arrow.verticalCenter = "top";
arrow.dy = -1;

// Set up a rotation adapter which would rotate the triangle if its a negative change
arrow.adapter.add("rotation", function(rotation, target) {
	return getVariancePercent(target.dataItem) < 0 ? 180 : rotation;
});

// Set up a rotation adapter which adjusts Y position
arrow.adapter.add("dy", function(dy, target) {
	return getVariancePercent(target.dataItem) < 0 ? 1 : dy;
});

// Add a label
var label = series2.bullets.push(new am4core.Label);
label.padding(10, 10, 10, 10);
label.text = "";
label.fill = am4core.color("#0c0");
label.strokeWidth = 0;
label.horizontalCenter = "middle";
label.verticalCenter = "bottom";
label.fontWeight = "bolder";

// Adapter for label text which calculates change in percent
label.adapter.add("textOutput", function(text, target) {
	var percent = getVariancePercent(target.dataItem);
	return percent ? percent + "%" : text;
});

// Adapter which shifts the label if it's below the variance column
label.adapter.add("verticalCenter", function(center, target) {
	return getVariancePercent(target.dataItem) < 0 ? "top" : center;
});

// Adapter which changes color of label to red
label.adapter.add("fill", function(fill, target) {
	return getVariancePercent(target.dataItem) < 0 ? am4core.color("#c00") : fill;
});

function getVariancePercent(dataItem) {
	if (dataItem) {
		var value = dataItem.valueY;
		var openValue = dataItem.openValueY;
		var change = value - openValue;
		return Math.round(change / openValue * 100);
	}
	return 0;
}

}, []);

  return (
    <div id="timelinediv" style={{ width: "100%", height: "500px" }}></div>
  );
};
