import React, { useState } from "react";
import Box from "@mui/material/Box";
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";
import "../Login_Student/login_student.css";
import Loader from "../Loading/Loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { apiLink } from "../../mainurl";

function Register() {
  const [loading, setLoader] = useState(false);

  const [valueRegister, setValuesRegister] = useState({
    usn: "",
    email: "",
  });

  const handleChange = (prop) => (event) => {
    setValuesRegister({ ...valueRegister, [prop]: event.target.value });
  };

  const handleRegister = (event) => {
    setLoader(true);
    const details = {
      usn: valueRegister.usn,
      email: valueRegister.email,
    };
    fetch(
      apiLink +
        "auth/auth/register?usn=" +
        details.usn +
        "&email=" +
        details.email,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (response.status === 422) {
          response.json();
          toast.warn("Wrong format entered", {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setLoader(false);
        } else if (response.status === 200) {
          response
            .json()
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
              localStorage.setItem("access-token", data.access);
              localStorage.setItem("usn", details.usn);
              localStorage.setItem("pass", details.password);
              setLoader(false);
            })
            .then(() => {});
        } else {
          toast.warning("Server Error,try later", {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setLoader(false);
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "45ch", maxWidth: "100%" },
        }}
        noValidate
        autoComplete="off"
      >
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
        <div className="loginstudent__whole">
          <TextField
            id="standard-basic"
            label="USN"
            variant="standard"
            values={valueRegister.usn}
            onChange={handleChange("usn")}
            onKeyUp={(event) => {
                    if (event.key=== 'Enter')
                    handleRegister()
                }}
            sx={{ paddingBottom: "0", maxWidth: "100%" }}
            inputProps={{ maxLength: 14 }}
          />
          <TextField
            id="standard-basic"
            label="Email"
            variant="standard"
            values={valueRegister.email}
            autoFocus={true}
            onKeyUp={(event) => {
                    if (event.key=== 'Enter')
                    handleRegister()
                }}
            onChange={handleChange("email")}
            sx={{ paddingBottom: "0", marginBottom: "0", maxWidth: "100%" }}
          />{" "}
          {loading ? <Loader /> : null}
          <Button
            variant="contained"
            onClick={(event) => handleRegister(event)}
            disabled={loading ? true : false}
            size="medium"
            sx={{ width: "50%", margin: "0 auto" }}
          >
            Register
          </Button>
        </div>
      </Box>
    </>
  );
}

export default Register;
