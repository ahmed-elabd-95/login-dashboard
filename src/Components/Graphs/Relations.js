
  import React, { useRef, useLayoutEffect } from "react";
  import * as am4core from "@amcharts/amcharts4/core";
  import * as am4plugins_timeline from "@amcharts/amcharts4/plugins/timeline"; 
  import * as am4plugins_forceDirected from "@amcharts/amcharts4/plugins/forceDirected.js";
  import * as am4charts from "@amcharts/amcharts4/charts";
  import am4themes_animated from "@amcharts/amcharts4/themes/animated";
  
  
  export const Relations = (props) => {
  
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


var chart = am4core.create("relationdiv", am4plugins_forceDirected.ForceDirectedTree);
var networkSeries = chart.series.push(new am4plugins_forceDirected.ForceDirectedSeries())

chart.data = [
  {
    name: "Distributer",
    children: [
      {
        name: "Seller 1",
        children: [
          { name: "A1", value: 100 },
          { name: "A2", value: 80 },
          { name: "A3", value: 60 },
          { name: "A4", value: 70 },
          { name: "A5", value: 50 },
          { name: "A6", value: 40 },
          { name: "A7", value: 30 },
          { name: "A8", value: 20 },
          { name: "A9", value: 10 },
          { name: "A10", value: 60 }
        ]
      },
      {
        name: "Seller 2",
        children: [
          { name: "B1", value: 135 },
          { name: "B2", value: 165 },
          { name: "B3", value: 115 },
          { name: "B4", value: 178 },
          { name: "B5", value: 187 },
          { name: "B6", value: 152 },
          { name: "B7", value: 139 },
          { name: "B8", value: 120 },
          { name: "B9", value: 35 },
          { name: "B10", value: 98 }
        ]
      },
      {
        name: "Seller 3",
        children: [
          { name: "c1", value: 50 },
          { name: "c2", value: 135 },
          { name: "c3", value: 195 },
          { name: "c4", value: 250 },
          { name: "c5", value: 260 },
          { name: "c6", value: 270 },
          { name: "c7", value: 280 },
          { name: "c8", value: 135 },
          { name: "c9", value: 120 },
          { name: "c10", value: 100 }
        ]
      }
      
      

    ]
  }
];

networkSeries.dataFields.value = "value";
networkSeries.dataFields.name = "name";
networkSeries.dataFields.children = "children";
networkSeries.nodes.template.tooltipText = "{name}:{value}";
networkSeries.nodes.template.fillOpacity = 1;

networkSeries.nodes.template.label.text = "{name}"
networkSeries.fontSize = 10;

networkSeries.links.template.strokeWidth = 1;

var hoverState = networkSeries.links.template.states.create("hover");
hoverState.properties.strokeWidth = 3;
hoverState.properties.strokeOpacity = 1;

networkSeries.nodes.template.events.on("over", function(event) {
  event.target.dataItem.childLinks.each(function(link) {
    link.isHover = true;
  })
  if (event.target.dataItem.parentLink) {
    event.target.dataItem.parentLink.isHover = true;
  }

})

networkSeries.nodes.template.events.on("out", function(event) {
  event.target.dataItem.childLinks.each(function(link) {
    link.isHover = false;
  })
  if (event.target.dataItem.parentLink) {
    event.target.dataItem.parentLink.isHover = false;
  }
})
}, []);
    return <div id="relationdiv" style={{ width: "100%", height: "500px" }}></div>;
  };
  
  

