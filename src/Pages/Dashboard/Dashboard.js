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

export const Dashboard = (props) => {
  return (
    <>
      <Taps>
        <TabPanel>
          <Chart />
        </TabPanel>
        <TabPanel>
          <ChartsTable />
        </TabPanel>
      </Taps>
      <Taps>
        <TabPanel>
          <Timline />
        </TabPanel>
        <TabPanel>
          <TimlineTable />
        </TabPanel>
      </Taps>
      <Taps>
        <TabPanel>
          <Bars />
        </TabPanel>
        <TabPanel>
          <BarsTable />
        </TabPanel>
      </Taps>
      <div>
        <Relations />
      </div>
    </>
  );
};
