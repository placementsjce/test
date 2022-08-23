import React, { useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

import {Tabs} from "@mui/material";
import {Tab} from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import "./Home.css";
import EligibleStudent from "./EligibleStudent";

function Home() {
  const [value, setValue] = useState("1");


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  return (
    <div>
        <Box sx={{ width: "100%", margin: "0 auto" }} class="oncamp_restt">
          <div className="header_company">Summer Internship</div>
          <TabContext value={value}>
            <Box
              sx={{ bgcolor: "background.paper" }}
              style={{ padding: "1rem" }}
            >
              <Tabs value={value} onChange={handleChange} centered>
                <Tab label="Company List" value="1" />
              </Tabs>
            </Box>
            <TabPanel value="1">
              <EligibleStudent />
            </TabPanel>
          </TabContext>
        </Box>
    </div>
  );
}

export default Home;
