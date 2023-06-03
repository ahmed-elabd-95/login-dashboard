import React, { useRef, useLayoutEffect } from "react";
import { TabPanel } from "react-tabs";
import Taps from "../../Components/Tabs/Tabs";
import { Chart } from "../../Components/Graphs/Charts/Chart";
import { ChartsTable } from "../../Components/Graphs/Charts/ChartsTable";
import { Timline } from "../../Components/Graphs/Timline/Timline";
import { Bars } from "../../Components/Graphs/Bars/Bars";
import { Relations } from "../../Components/Graphs/Relations";
import { TimlineTable } from "../../Components/Graphs/Timline/TimlineTable";
import { BarsTable } from "../../Components/Graphs/Bars/BarsTable";
import "./Dashboard.css";

export const Dashboard = (props) => {
  return (
    <>
      <p className="chart-title">Pie Chart</p>
      <Taps>
        <TabPanel>
          <Chart />
        </TabPanel>
        <TabPanel>
          <ChartsTable />
        </TabPanel>
      </Taps>
      <p className="chart-title">TimeLine Chart</p>
      <Taps>
        <TabPanel>
          <Timline />
        </TabPanel>
        <TabPanel>
          <TimlineTable />
        </TabPanel>
      </Taps>
      <p className="chart-title">Bars Chart</p>
      <Taps>
        <TabPanel>
          <Bars />
        </TabPanel>
        <TabPanel>
          <BarsTable />
        </TabPanel>
        <p className="chart-title">Relations Chart</p>
      </Taps>
      <div>
        <Relations />
      </div>
    </>
  );
};
