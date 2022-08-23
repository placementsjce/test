import React, { useEffect, useState } from "react";
import Header from "../../Header/Header";
import {Tabs} from "@mui/material";
import {Tab} from "@mui/material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import StudentFeedback from "../Feedback/Feedback";
import Home from "../Home/Home";
import About from "../StudentAbout/About";
import { useNavigate } from "react-router-dom";
import Footer from '../../common/footer';


function StudentWhole() {
  const [value, setValue] = useState("1");
  let history = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleLogout = (event) => {
    localStorage.clear();
    history("/");
  };
  useEffect(() => {
    if(localStorage.getItem('person')!=='junior')
      history("/login");
    }, [])
  return (
    <div>
      <Header />
      <TabContext value={value}>
        <Box
          sx={{ bgcolor: "background.paper" }}
          style={{
            padding: "1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            centered
            variant="scrollable"
            scrollButtons
            allowScrollButtonsMobile
          >
            <Tab label="HOME" value="1" />
            <Tab label="FEEDBACK" value="2" />
            <Tab label="ABOUT" value="3" />
            <Button
              variant="contained"
              style={{ width: "0rem 1rem", margin: "0 1rem" }}
              onClick={handleLogout}
            >
              Logout
            </Button>
            {localStorage.getItem("usn") ? (
              <Button
                style={{ padding: "0rem 4rem", margin: "0 1rem" }}
                variant="contained"
              >
                {localStorage.getItem("usn").toUpperCase()}
              </Button>
            ) : null}
          </Tabs>
        </Box>
        <TabPanel value="1">
          <Home />
        </TabPanel>
        <TabPanel value="2">
          <StudentFeedback />
        </TabPanel>
        <TabPanel value="3">
          <About />
        </TabPanel>
      </TabContext>
			<Footer />
    </div>
  );
}

export default StudentWhole;
