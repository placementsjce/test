import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import {TextField} from "@mui/material";
import "./StudentProfile.css";
import Button from "@mui/material/Button";
import OnCampus from "../Sidebar/OnCampus";
import Loader from "../../Loading/Skeleton";
import Loader2 from "../../Loading/Loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { apiLink } from "../../../mainurl";

function StudentProfile() {
  const [loading, setLoader] = useState(true);
  const [loading2, setLoader2] = useState(false);
  const [loading3, setLoader3] = useState(false);
  const [selectedFile, setStateFileSelect] = useState();

  const [pass, setNewPass] = useState({
    oldpass: "",
    newpass: "",
    confmnew: "",
  });

  const handleChangePass = (prop) => (event) => {
    setNewPass({ ...pass, [prop]: event.target.value });
  };
  const onFileChange = (event) => {
    setStateFileSelect(event.target.files[0]);
  };

  const onFileUpload = () => {
    // setLoader3(true);
    const formdata = new FormData();

    formdata.append("file", selectedFile);
    fetch(apiLink + "student/home/file/upload/" + localStorage.getItem("usn"), {
      method: "POST",
      body: formdata,
      headers: {
        accept: "application/json",
      },
    })
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

        setLoader3(false);
      });
  };

  const onFileView =()=>{
    fetch(apiLink + "student/home/file/show_resume/" + localStorage.getItem("usn"), {
      method: "POST",
      headers: {
        accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
          if(data===false)
          {
            toast.warning("Not uploaded resume", {
              position: "bottom-left",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }else{
            window.open(
              data, "_blank");
          }
      });
  }
  const handleChangePassClick = (e) => {
    if (pass.newpass === "" || pass.confmnew === "" || pass.oldpass === "") {
      toast.error("Field Required", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      setLoader2(true);
      if (pass.newpass === pass.confmnew) {
        fetch(
          apiLink +
            "auth/home/password/changepassword/" +
            localStorage.getItem("usn") +
            "?oldpass=" +
            pass.oldpass +
            "&newpass=" +
            pass.newpass,
          {
            method: "POST",
            headers: {
              accept: "application/json",
            },
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

            setLoader2(false);
          });
      } else {
        setLoader2(false);
        toast.warning("New password must match with confirmed password!", {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  };
  const [studentdetails, setStidentDetails] = useState("");
  useEffect(() => {
    fetch(apiLink + "student/home/myprofile" + localStorage.getItem("usn"), {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setStidentDetails(data);
        setLoader(false);
      });
  }, [studentdetails.length]);

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
          <Box>
            <div className="header_company">STUDENT DETAILS</div>

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
                {loading ? <Loader height={75} /> : null}
                {studentdetails ? (
                  <TextField
                    disabled
                    id="outlined-disabled"
                    label="Full Name"
                    value={studentdetails.full_name}
                    style={{ marginBottom: "1rem" }}
                    fullWidth
                  />
                ) : null}

                {studentdetails ? (
                  <TextField
                    disabled
                    id="outlined-disabled"
                    label="First Name"
                    value={studentdetails.first_name}
                    style={{ marginBottom: "1rem" }}
                    fullWidth
                  />
                ) : null}

                {studentdetails ? (
                  <TextField
                    disabled
                    id="outlined-disabled"
                    label="Middle Name"
                    value={studentdetails.middle_name}
                    style={{ marginBottom: "1rem" }}
                    fullWidth
                  />
                ) : null}

                {studentdetails ? (
                  <TextField
                    disabled
                    id="outlined-disabled"
                    label="Last Name"
                    value={studentdetails.last_name}
                    style={{ marginBottom: "1rem" }}
                    fullWidth
                  />
                ) : null}

                {studentdetails ? (
                  <TextField
                    disabled
                    id="outlined-disabled"
                    label="USN"
                    value={studentdetails.usn}
                    style={{ marginBottom: "1rem" }}
                    fullWidth
                  />
                ) : null}

                {studentdetails ? (
                  <TextField
                    disabled
                    id="outlined-disabled"
                    label="Branch"
                    value={studentdetails.branch}
                    style={{ marginBottom: "1rem" }}
                    fullWidth
                  />
                ) : null}

                {studentdetails ? (
                  <TextField
                    disabled
                    id="outlined-disabled"
                    label="Date of Birth"
                    value={studentdetails.dob.slice(0, 10)}
                    style={{ marginBottom: "1rem" }}
                    fullWidth
                  />
                ) : null}

                {studentdetails ? (
                  <TextField
                    disabled
                    id="outlined-disabled"
                    label="Gender"
                    value={studentdetails.gender}
                    style={{ marginBottom: "1rem" }}
                    fullWidth
                  />
                ) : null}

                {studentdetails ? (
                  <TextField
                    disabled
                    id="outlined-disabled"
                    label="Category"
                    value={studentdetails.category}
                    style={{ marginBottom: "1rem" }}
                    fullWidth
                  />
                ) : null}

                {studentdetails ? (
                  <TextField
                    disabled
                    id="outlined-disabled"
                    label="Native"
                    value={studentdetails.native}
                    style={{ marginBottom: "1rem" }}
                    fullWidth
                  />
                ) : null}

                {studentdetails ? (
                  <TextField
                    disabled
                    id="outlined-disabled"
                    label="Parent's Name"
                    value={studentdetails.parents_name}
                    style={{ marginBottom: "1rem" }}
                    fullWidth
                  />
                ) : null}

                {studentdetails ? (
                  <TextField
                    disabled
                    id="outlined-disabled"
                    label="Present Address"
                    value={studentdetails.present_addr}
                    style={{ marginBottom: "1rem" }}
                    fullWidth
                  />
                ) : null}

                {studentdetails ? (
                  <TextField
                    disabled
                    id="outlined-disabled"
                    label="Permanent Address"
                    value={studentdetails.permanent_addr}
                    style={{ marginBottom: "1rem" }}
                    fullWidth
                  />
                ) : null}

                {studentdetails ? (
                  <TextField
                    disabled
                    id="outlined-disabled"
                    label="Phone"
                    value={studentdetails.phone}
                    style={{ marginBottom: "1rem" }}
                    fullWidth
                  />
                ) : null}

                {studentdetails ? (
                  <TextField
                    disabled
                    id="outlined-disabled"
                    label="Secondary Phone"
                    value={studentdetails.secondary_phone}
                    style={{ marginBottom: "1rem" }}
                    fullWidth
                  />
                ) : null}

                {studentdetails ? (
                  <TextField
                    disabled
                    id="outlined-disabled"
                    label="Email address"
                    value={studentdetails.email}
                    style={{ marginBottom: "1rem" }}
                    fullWidth
                  />
                ) : null}

                {studentdetails ? (
                  <TextField
                    disabled
                    id="outlined-disabled"
                    label="SSC Marks"
                    value={studentdetails.ssc}
                    style={{ marginBottom: "1rem" }}
                    fullWidth
                  />
                ) : null}

                {studentdetails ? (
                  <TextField
                    disabled
                    id="outlined-disabled"
                    label="HSC Marks"
                    value={studentdetails.hsc}
                    style={{ marginBottom: "1rem" }}
                    fullWidth
                  />
                ) : null}

                {studentdetails ? (
                  <TextField
                    disabled
                    id="outlined-disabled"
                    label="Undergraduate"
                    value={studentdetails.ug}
                    style={{ marginBottom: "1rem" }}
                    fullWidth
                  />
                ) : null}

                {studentdetails ? (
                  <TextField
                    disabled
                    id="outlined-disabled"
                    label="Postgraduate"
                    value={studentdetails.pg}
                    style={{ marginBottom: "1rem" }}
                    fullWidth
                  />
                ) : null}

                {studentdetails ? (
                  <TextField
                    disabled
                    id="outlined-disabled"
                    label="UG Percentage"
                    value={studentdetails.ug_percentage}
                    style={{ marginBottom: "1rem" }}
                    fullWidth
                  />
                ) : null}

                {studentdetails ? (
                  <TextField
                    disabled
                    id="outlined-disabled"
                    label="Backlogs"
                    value={studentdetails.backlogs}
                    style={{ marginBottom: "1rem" }}
                    fullWidth
                  />
                ) : null}

                {studentdetails ? (
                  <TextField
                    disabled
                    id="outlined-disabled"
                    label="SEM 1"
                    value={studentdetails.sem1}
                    style={{ marginBottom: "1rem" }}
                    fullWidth
                  />
                ) : null}

                {studentdetails ? (
                  <TextField
                    disabled
                    id="outlined-disabled"
                    label="SEM 2"
                    value={studentdetails.sem2}
                    style={{ marginBottom: "1rem" }}
                    fullWidth
                  />
                ) : null}

                {studentdetails ? (
                  <TextField
                    disabled
                    id="outlined-disabled"
                    label="SEM 3"
                    value={studentdetails.sem3}
                    style={{ marginBottom: "1rem" }}
                    fullWidth
                  />
                ) : null}

                {studentdetails ? (
                  <TextField
                    disabled
                    id="outlined-disabled"
                    label="SEM 4"
                    value={studentdetails.sem4}
                    style={{ marginBottom: "1rem" }}
                    fullWidth
                  />
                ) : null}

                {studentdetails ? (
                  <TextField
                    disabled
                    id="outlined-disabled"
                    label="SEM 5"
                    value={studentdetails.sem5}
                    style={{ marginBottom: "1rem" }}
                    fullWidth
                  />
                ) : null}

                {studentdetails ? (
                  <TextField
                    disabled
                    id="outlined-disabled"
                    label="SEM 6"
                    value={studentdetails.sem6}
                    style={{ marginBottom: "1rem" }}
                    fullWidth
                  />
                ) : null}

                {studentdetails ? (
                  <TextField
                    disabled
                    id="outlined-disabled"
                    label="SEM 7"
                    value={studentdetails.sem7}
                    style={{ marginBottom: "1rem" }}
                    fullWidth
                  />
                ) : null}

                {studentdetails ? (
                  <TextField
                    disabled
                    id="outlined-disabled"
                    label="SEM 8"
                    value={studentdetails.sem8}
                    style={{ marginBottom: "1rem" }}
                    fullWidth
                  />
                ) : null}

                {studentdetails ? (
                  <TextField
                    disabled
                    id="outlined-disabled"
                    label="Current Backlogs"
                    value={studentdetails.current_backlogs}
                    style={{ marginBottom: "1rem" }}
                    fullWidth
                  />
                ) : null}

                {studentdetails ? (
                  <TextField
                    disabled
                    id="outlined-disabled"
                    label="History Backlogs"
                    value={studentdetails.history_backlogs}
                    style={{ marginBottom: "1rem" }}
                    fullWidth
                  />
                ) : null}

                {studentdetails ? (
                  <TextField
                    disabled
                    id="outlined-disabled"
                    label="No. of X Grades"
                    value={studentdetails.no_of_x_grades}
                    style={{ marginBottom: "1rem" }}
                    fullWidth
                  />
                ) : null}

                {studentdetails ? (
                  <TextField
                    disabled
                    id="outlined-disabled"
                    label="Other Grades"
                    value={studentdetails.other_grades}
                    style={{ marginBottom: "1rem" }}
                    fullWidth
                  />
                ) : null}

                {studentdetails ? (
                  <TextField
                    disabled
                    id="outlined-disabled"
                    label="UG START YEAR"
                    value={studentdetails.ug_start_year}
                    style={{ marginBottom: "1rem" }}
                    fullWidth
                  />
                ) : null}

                {studentdetails ? (
                  <TextField
                    disabled
                    id="outlined-disabled"
                    label="UG END YEAR"
                    value={studentdetails.ug_end_year}
                    style={{ marginBottom: "1rem" }}
                    fullWidth
                  />
                ) : null}

                {studentdetails ? (
                  <TextField
                    disabled
                    id="outlined-disabled"
                    label="SSC BOARD"
                    value={studentdetails.ssc_board}
                    style={{ marginBottom: "1rem" }}
                    fullWidth
                  />
                ) : null}

                {studentdetails ? (
                  <TextField
                    disabled
                    id="outlined-disabled"
                    label="HSC BOARD"
                    value={studentdetails.hsc_board}
                    style={{ marginBottom: "1rem" }}
                    fullWidth
                  />
                ) : null}

                {studentdetails ? (
                  <TextField
                    disabled
                    id="outlined-disabled"
                    label="HSC START YEAR "
                    value={studentdetails.hsc_start_year}
                    style={{ marginBottom: "1rem" }}
                    fullWidth
                  />
                ) : null}

                {studentdetails ? (
                  <TextField
                    disabled
                    id="outlined-disabled"
                    label="HSC END YEAR "
                    value={studentdetails.hsc_end_year}
                    style={{ marginBottom: "1rem" }}
                    fullWidth
                  />
                ) : null}

                {studentdetails ? (
                  <TextField
                    disabled
                    id="outlined-disabled"
                    label="SSC START YEAR "
                    value={studentdetails.ssc_start_year}
                    style={{ marginBottom: "1rem" }}
                    fullWidth
                  />
                ) : null}

                {studentdetails ? (
                  <TextField
                    disabled
                    id="outlined-disabled"
                    label="SSC START YEAR "
                    value={studentdetails.ssc_end_year}
                    style={{ marginBottom: "1rem" }}
                    fullWidth
                  />
                ) : null}

                {studentdetails ? (
                  <TextField
                    disabled
                    id="outlined-disabled"
                    label="ENTRY TO COLLEGE"
                    value={studentdetails.entry_to_college}
                    style={{ marginBottom: "1rem" }}
                    fullWidth
                  />
                ) : null}

                {studentdetails ? (
                  <TextField
                    disabled
                    id="outlined-disabled"
                    label="Rank"
                    value={studentdetails.rank}
                    style={{ marginBottom: "1rem" }}
                    fullWidth
                  />
                ) : null}

                {studentdetails ? (
                  <TextField
                    disabled
                    id="outlined-disabled"
                    label="Gap in Studies"
                    value={studentdetails.gap_in_studies}
                    style={{ marginBottom: "1rem" }}
                    fullWidth
                  />
                ) : null}
              </Box>
            </div>
            <div
              style={{ width: "100%", display: "flex", alignItems: "center" }}
            ></div>
          </Box>

          <div className="header_company">Resume</div>
          <br></br>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              // justifyContent: "center",
            }}
          >
            <Button
              variant="contained"
              component="label"
              sx={{ margin: "1rem 0", width: "100%" }}
            >
              Upload File &nbsp;
              <input type="file" onChange={(event) => onFileChange(event)} />
            </Button>
            <Box
            sx={{
              // display: "flex",
              alignItems: "center",
              justifyContent: "space-equally",
            }}
          >
            <Button
              variant="contained"
              onClick={onFileUpload}
              disabled={loading3 ? true : false}
              sx={{margin:'0 1rem'}}
            >
              UPLOAD
            </Button>
            <Button
              variant="contained"
              onClick={onFileView}
              disabled={loading3 ? true : false}
            >
              VIEW RESUME
            </Button>
            </Box>
            <br></br>
          </Box>

          <Box>
            <div className="header_company">CHANGE PASSWORD</div>
            {loading2 ? <Loader2 /> : null}
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
                <TextField
                  fullWidth
                  label="Current Password"
                  id="fullWidth"
                  placeholder="Current Password"
                  type="password"
                  value={pass.oldpass}
                  onChange={handleChangePass("oldpass")}
                  style={{ marginBottom: "1rem" }}
                />

                <TextField
                  fullWidth
                  label="New Password"
                  id="fullWidth"
                  placeholder="New Password"
                  type="password"
                  value={pass.newpass}
                  onChange={handleChangePass("newpass")}
                  style={{ marginBottom: "1rem" }}
                />

                <TextField
                  fullWidth
                  label="Re-enter New Password"
                  id="fullWidth"
                  placeholder="Re-enter New Password"
                  value={pass.confmnew}
                  onChange={handleChangePass("confmnew")}
                  type="password"
                  style={{ marginBottom: "1rem" }}
                />
              </Box>
            </div>
            <div
              style={{ width: "100%", display: "flex", alignItems: "center" }}
            >
              <Button
                variant="contained"
                style={{ margin: "0 auto" }}
                onClick={(event) => handleChangePassClick(event)}
                disabled={loading2 ? true : false}
              >
                UPDATE
              </Button>
            </div>
          </Box>
        </Box>
      </Container>
    </div>
  );
}

export default StudentProfile;
