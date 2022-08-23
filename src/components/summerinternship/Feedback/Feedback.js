import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Loader from "../../Loading/Loading";

import {Tabs} from "@mui/material";
import {Tab} from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import "./Feedback.css";
import AllFeedback from "../Feedback/AllFeedback.js";
import {apiLink} from '../../../mainurl';

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function CompanyAdd() {
  const [valuerat1, setValuerat1] = useState("1");
  const [valuerat2, setValuerat2] = useState("1");
  const [valuerat3, setValuerat3] = useState("1");
  const [companyList, setCompanyList] = useState([]);
  const [company, setCompany] = useState("");
  const [loading, setLoader] = useState(false);
  const [feedbackG, setFeedbackG] = useState(false);



  useEffect(() => {
    fetch(
      apiLink+"student/home/status_cname" +
        localStorage.getItem("usn"),
      {
        method: "GET",
        headers: {
          accept: "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setCompanyList(data);
      });

    fetch(
      apiLink+"student/home/status_category" +
        localStorage.getItem("usn"),
      {
        method: "GET",
        headers: { 
          accept: "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) setFeedbackG(true);
      });
  }, []);

  const [value, setValue] = useState("1");
  const handleChange1 = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

        <Box sx={{ width: "100%", margin: "0 auto" }} class="oncamp_restt">
          <div className="header_company">Feedback</div>{" "}
          {loading ? <Loader /> : null}
          <TabContext value={value}>
            <Box
              sx={{ bgcolor: "background.paper" }}
              style={{ padding: "1rem" }}
            >
              <Tabs value={value} onChange={handleChange1} centered>
                {/* <Tab label="Add Feedback" value="1" /> */}
                <Tab label="View Feedback" value="1" />
              </Tabs>
            </Box>
            <TabPanel value="1">
              <AllFeedback />
            </TabPanel>
          </TabContext>
        </Box>
    </div>
  );
}

export default CompanyAdd;
