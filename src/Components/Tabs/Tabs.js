import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

const Taps = ({ children}) => {    
  return (
    <Tabs>
      <TabList>
        <Tab>Chart</Tab>
        <Tab>Table</Tab>
      </TabList>

     {children}
    </Tabs>
  );
};

export default Taps;