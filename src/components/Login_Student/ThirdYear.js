import React, { useState } from "react";
import Box from "@mui/material/Box";
import {TextField} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import {InputLabel} from "@mui/material";
import {InputAdornment} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {Input} from "@mui/material";
import Button from "@mui/material/Button";
import "../Login_Student/login_student.css";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import Loader from "../Loading/Loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { apiLink } from "../../mainurl";

export default function BasicTextFields() {
  const [loading, setLoader] = useState(false);

  const [valuesLogin, setValuesLogin] = useState({
    password: "",
    usn: "",
    email: "",
  });
  let history = useNavigate();
  const [isForgot, setForgot] = useState(true);

  const handleChange = (prop) => (event) => {
    setValuesLogin({ ...valuesLogin, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValuesLogin({
      ...valuesLogin,
      showPassword: !valuesLogin.showPassword,
    });
  };

  const handleLogin = (event) => {
    setLoader(true);
    const details = {
      usn: valuesLogin.usn,
      password: valuesLogin.password,
    };
    const data = JSON.stringify(details);
    console.log("data", data);
    fetch(
      apiLink +
        "auth/auth/third_year_login?usn=" +
        details.usn +
        "&password=" +
        details.password,
      {
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (response.status === 400) {
          response.json();
          toast.warn("Wrong usn or password", {
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
              toast.success("Welcome" + details.usn, {
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
              localStorage.setItem("person", "junior");
              setLoader(false);
            })
            .then(() => {
              history("/thirdyear");
            });
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

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <Box component="form" noValidate autoComplete="off">
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
            values={valuesLogin.usn}
            onChange={handleChange("usn")}
            inputProps={{ maxLength: 14 }}
            sx={{ paddingBottom: "0" }}
          />
          {isForgot ? (
            <FormControl
              sx={{ m: 1, width: "45ch", maxWidth: "100%", marginLeft: "0" }}
              variant="standard"
            >
              <InputLabel htmlFor="standard-adornment-password">
                Password
              </InputLabel>
              <Input
                id="standard-adornment-password"
                type={valuesLogin.showPassword ? "text" : "password"}
                value={valuesLogin.password}
                autoFocus={true}
                onChange={handleChange("password")}
                onKeyUp={(event) => {
                    if (event.key=== 'Enter')
                    handleLogin()
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {valuesLogin.showPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {loading ? <Loader /> : null}
            </FormControl>
          ) : (
            <>
              <TextField
                id="standard-basic"
                label="Email"
                variant="standard"
                values={valuesLogin.email}
                onChange={handleChange("email")}
                sx={{
                  paddingBottom: "0",
                  m: 1,
                  width: "45ch",
                  maxWidth: "100%",
                  marginLeft: "0",
                }}
              />
              {loading ? <Loader /> : null}
            </>
          )}

          <Button
            variant="contained"
            onClick={(event) => handleLogin(event)}
            disabled={loading ? true : false}
            size="medium"
            sx={{ width: "50%", margin: "0 auto" }}
          >
            Sign In
          </Button>
        </div>
      </Box>
    </>
  );
}
