import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import {TextField} from "@mui/material";
import Loader from "../../Loading/Loading";

import {Tabs} from "@mui/material";
import {Tab} from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import "./Feedback.css";
import AllFeedback from "../Feedback/AllFeedback.js";

import FormControlLabel from "@mui/material/FormControlLabel";

import {InputLabel} from "@mui/material";
import {MenuItem} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { apiLink } from "../../../mainurl";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormLabel from "@mui/material/FormLabel";
import Button from "@mui/material/Button";

import Rating from "@mui/material/Rating";
import {Typography} from "@mui/material";
import OnCampus from "../Sidebar/OnCampus";

function CompanyAdd() {
  const [valuerat1, setValuerat1] = useState("1");
  const [valuerat2, setValuerat2] = useState("1");
  const [valuerat3, setValuerat3] = useState("1");
  const [companyList, setCompanyList] = useState([]);
  const [company, setCompany] = useState("");
  const [loading, setLoader] = useState(false);
  const [feedbackG, setFeedbackG] = useState(false);

  const [feedback, setFeedback] = useState({
    branch: "",
    role: "",
    ctc: 0,
    base: 0,
    technical_round: "",
    hr_round: "",
    tips: "",
    topics_covered: "",
    codinground_difficulty: valuerat1,
    interview_difficulty: valuerat2,
    overall_experience: valuerat3,
    passing_year: "",
    full_time: true,
    summer_internship: false,
    stipend: 0,
    location: "",
    mode: "",
  });

  // useEffect(() => {
  //   if (feedback.full_time === "true") {
  //     feedback.summer_internship = false;
  //     feedback.full_time = true;
  //   } else {
  //     feedback.summer_internship = true;
  //     feedback.full_time = false;
  //   }
  // }, [feedback.full_time, feedback.summer_internship]);
  useEffect(() => {
    fetch(apiLink + "student/home/status_cname" + localStorage.getItem("usn"), {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCompanyList(data);
      });

    fetch(
      apiLink + "student/home/status_category" + localStorage.getItem("usn"),
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

  const handleChange = (prop) => (event) => {
    setFeedback({ ...feedback, [prop]: event.target.value });
  };

  const handleChangecname = (prop) => (event) => {
    setCompany({ [prop]: event.target.value });
  };

  const handleFeedbackSubmit = () => {
    if (
      feedback.branch === "" ||
      feedback.role === "" ||
      feedback.ctc === "" ||
      feedback.base === "" ||
      feedback.stipend === "" ||
      feedback.technical_round === "" ||
      feedback.hr_round === "" ||
      feedback.tips === "" ||
      feedback.topics_covered === "" ||
      feedback.passing_year === "" ||
      feedback.location === "" ||
      feedback.mode === ""
    ) {
      toast.error("Field Empty!!", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      setLoader(true);
      const data = JSON.stringify(feedback);

      fetch(
        apiLink +
          "student/home/feedback/" +
          localStorage.getItem("usn") +
          "?cname=" +
          company.company,
        {
          method: "POST",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
          body: data,
        }
      )
        .then((response) => response.json())
        .then((data) => {
          toast.success(data.message, {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setLoader(false);
        });
    }
  };
console.log(feedback)
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

      <Container maxWidth="lg" sx={{ display: "flex", flexDirection: "row" }}>
        <Box sx={{ width: "22%", margin: "0 2rem" }} class="oncamp_side">
          <OnCampus />
        </Box>
        <Box sx={{ width: "78%", margin: "0 2rem" }} class="oncamp_rest">
          <div className="header_company">Feedback</div>{" "}
          {loading ? <Loader /> : null}
          <TabContext value={value}>
            <Box
              sx={{ bgcolor: "background.paper" }}
              style={{ padding: "1rem" }}
            >
              <Tabs value={value} onChange={handleChange1} centered>
                <Tab label="Add Feedback" value="1" />
                <Tab label="View Feedback" value="2" />
              </Tabs>
            </Box>
            {/* <Box > */}
            {loading ? null : feedbackG ? (
              <TabPanel value="1">
                <Box
                  sx={{ bgcolor: "background.paper" }}
                  style={{ padding: "1rem" }}
                ></Box>

                <div className="companyaddform">
                  <Box
                    sx={{
                      width: 800,
                      maxWidth: "100%",
                    }}
                  >
                    <FormControl style={{ marginBottom: "1rem" }} fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Company
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={company.company}
                        label="Company"
                        onChange={handleChangecname("company")}
                      >
                        {companyList?.map(function (allcomp) {
                          return (
                            <MenuItem value={allcomp[0]}>{allcomp[0]}</MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>


                    <TextField
                      fullWidth
                      label="Role"
                      id="fullWidth"
                      style={{ marginBottom: "1rem" }}
                      value={feedback.role}
                      onChange={handleChange("role")}
                    />

                    <TextField
                      fullWidth
                      label="CTC"
                      id="fullWidth"
                      placeholder="XX.XX"
                      style={{ marginBottom: "1rem" }}
                      value={feedback.ctc}
                      onChange={handleChange("ctc")}
                    />

                    <TextField
                      fullWidth
                      label="Base Package"
                      id="fullWidth"
                      placeholder="XX.XX"
                      style={{ marginBottom: "1rem" }}
                      value={feedback.base}
                      onChange={handleChange("base")}
                    />

                    <TextField
                      fullWidth
                      label="Stipend"
                      id="fullWidth"
                      placeholder="XX.XX"
                      style={{ marginBottom: "1rem" }}
                      value={feedback.stipend}
                      onChange={handleChange("stipend")}
                    />

                    <TextField
                      fullWidth
                      label="Branch"
                      id="fullWidth"
                      style={{ marginBottom: "1rem" }}
                      value={feedback.branch}
                      onChange={handleChange("branch")}
                    />

                    <TextField
                      fullWidth
                      label="Location"
                      id="fullWidth"
                      style={{ marginBottom: "1rem" }}
                      value={feedback.location}
                      onChange={handleChange("location")}
                    />

                    <TextField
                      fullWidth
                      label="Passing Year"
                      id="fullWidth"
                      style={{ marginBottom: "1rem" }}
                      value={feedback.passing_year}
                      onChange={handleChange("passing_year")}
                    />
                  </Box>
                </div>

                <div className="header_company">INTERVIEW DETAILS</div>
                <Box
                  sx={{ bgcolor: "background.paper" }}
                  style={{ padding: "1rem" }}
                >
                  {/* <Tab label="Registrations" value="1" /> */}
                </Box>

                <div className="companyaddform">
                  <Box
                    sx={{
                      width: 800,
                      maxWidth: "100%",
                    }}
                  >
                 
                    <TextField
                      fullWidth
                      label="Technical Questions"
                      id="fullWidth"
                      multiline
                      rows={6}
                      inputProps={{ minLength: 100 }}
                      style={{ marginBottom: "1rem" }}
                      value={feedback.technical_round}
                      onChange={handleChange("technical_round")}
                    />

                    <TextField
                      fullWidth
                      label="HR Questions"
                      id="fullWidth"
                      multiline
                      rows={4}
                      style={{ marginBottom: "1rem" }}
                      value={feedback.hr_round}
                      onChange={handleChange("hr_round")}
                    />
<FormControl style={{ marginBottom: "1rem" }}>
                      <FormLabel id="demo-row-radio-buttons-group-label">
                        Test Type
                      </FormLabel>
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        onChange={handleChange("mode")}
                        value={feedback.mode}
                      >
                        <FormControlLabel
                          value="Online"
                          control={<Radio />}
                          label="Online"
                        />
                        <FormControlLabel
                          value="Offline"
                          control={<Radio />}
                          label="Offline"
                        />
                      </RadioGroup>
                    </FormControl>
                    <TextField
                      fullWidth
                      label="Subjects Covered Comma Separated"
                      multiline
                      rows={4}
                      id="fullWidth"
                      style={{ marginBottom: "1rem" }}
                      value={feedback.topics_covered}
                      onChange={handleChange("topics_covered")}
                    />

                    <TextField
                      fullWidth
                      label="Other Information/Tips"
                      multiline
                      rows={4}
                      id="fullWidth"
                      style={{ marginBottom: "1rem" }}
                      value={feedback.tips}
                      onChange={handleChange("tips")}
                    />

                    <FormControl style={{ marginBottom: "1rem" }} fullWidth>
                      <Typography component="legend">
                        Test Difficulty Level
                      </Typography>
                      <Rating
                        value={valuerat1}
                        name="Test Difficulty Level"
                        onChange={(event, newValue) => {
                          setValuerat1(newValue);
                          setFeedback({
                            ...feedback,
                            ["codinground_difficulty"]: newValue,
                          });
                        }}
                      />
                    </FormControl>

                    <FormControl style={{ marginBottom: "1rem" }} fullWidth>
                      <Typography component="legend">
                        Interview Difficulty Level
                      </Typography>
                      <Rating
                        value={valuerat2}
                        name="Test Difficulty Level"
                        onChange={(event, newValue) => {
                          setValuerat2(newValue);
                          setFeedback({
                            ...feedback,
                            ["interview_difficulty"]: newValue,
                          });
                        }}
                      />
                    </FormControl>

                    <FormControl style={{ marginBottom: "1rem" }} fullWidth>
                      <Typography component="legend">
                        Overall Experience
                      </Typography>
                      <Rating
                        value={valuerat3}
                        name="Test Difficulty Level"
                        onChange={(event, newValue) => {
                          setValuerat3(newValue);
                          setFeedback({
                            ...feedback,
                            ["overall_experience"]: newValue,
                          });
                        }}
                      />
                    </FormControl>
                  </Box>
                </div>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Button
                    variant="contained"
                    style={{ margin: "0 auto" }}
                    onClick={handleFeedbackSubmit}
                    disabled={loading ? true : false}
                  >
                    SUBMIT
                  </Button>
                </div>
              </TabPanel>
            ) : (
              <TabPanel value="1">
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  Need to be placed to post feedback
                </Box>
              </TabPanel>
            )}
            <TabPanel value="2">
              <AllFeedback />
            </TabPanel>
          </TabContext>
        </Box>
      </Container>
    </div>
  );
}

export default CompanyAdd;
