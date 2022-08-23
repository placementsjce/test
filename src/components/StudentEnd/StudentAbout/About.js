import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import {Typography} from "@mui/material";
import CarouselPage1 from "./CarouselPage";

export default function BasicGrid() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item>
          <Box
            component="span"
            sx={{
              display: "inline-block",
              mx: "2px",
              transform: "scale(0.8)",
              borderStyle: "solid",
              borderWidth: "thin",
              borderColor: "#FFFFFF",
            }}
          >
            <Box sx={{ minWidth: 275 }}>
              <>
                <CardContent>
                  <Typography
                    variant="h5"
                    sx={{ fontSize: "30px" }}
                    component="div"
                    color="#35589A"
                  >
                    DO's
                  </Typography>
                  <br />
                  <Typography variant="body2" sx={{ fontSize: "18px" }}>
                    <ul>
                      <li>Check your emails regularly.</li>
                      <li>Make sure your CV is professional and up to Date.</li>
                      <li>Follow the placement policy strictly.</li>
                      <li>Always attend the company presentation.</li>
                      <li>
                        Research about the company before registering. Never
                        register blindly.
                      </li>
                    </ul>
                  </Typography>
                </CardContent>
              </>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box
            component="span"
            sx={{
              display: "inline-block",
              mx: "2px",
              transform: "scale(0.8)",
              borderStyle: "solid",
              borderWidth: "thin",
              borderColor: "#FFFFFF",
            }}
          >
            <Box sx={{ minWidth: 275 }}>
              <>
                <CardContent>
                  <Typography
                    variant="h5"
                    component="div"
                    sx={{ fontSize: "30px" }}
                    color="#35589A"
                  >
                    DONT's
                  </Typography>
                  <br />
                  <Typography variant="body2" sx={{ fontSize: "18px" }}>
                    <ul>
                      <li>
                        Malpractises during online and offline tests, interviews
                        and various other rounds.
                      </li>
                      <li>Registering and missing the company Process</li>
                      <li>Faking interviews</li>
                      <li>Not following deadlines</li>
                    </ul>
                  </Typography>
                </CardContent>
              </>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box
            component="span"
            sx={{
              display: "inline-block",
              mx: "2px",
              transform: "scale(0.8)",
              borderStyle: "solid",
              borderWidth: "thin",
              borderColor: "#FFFFFF",
            }}
          >
            <Box sx={{ minWidth: 275 }}>
              <>
                <CardContent>
                  <Typography
                    variant="h5"
                    component="div"
                    sx={{ fontSize: "30px" }}
                    color="#35589A"
                  >
                    FAQ
                  </Typography>
                  <br />
                  <Typography sx={{ fontWeight: "bold" }}>
                    How do i register for a company?
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: "18px" }}>
                    List of the companies you are eligible will be displayed in
                    the HOME tab with a reister button. Click on the register
                    button to register.
                  </Typography>
                  <br />
                  <Typography sx={{ fontWeight: "bold" }}>
                    How can I edit my details displayed in the portal?
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: "18px" }}>
                    Contact your respective branch placement Secretaires for any
                    updations to academic details. Email ID, password and
                    contact can be edited in the portal.
                  </Typography>
                  <br />
                  <Typography sx={{ fontWeight: "bold" }}>
                    How can I login if I forget my password?
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: "18px" }}>
                    Follow the Forgot Password link to change the password.
                  </Typography>
                </CardContent>
              </>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Box>
        <Typography
          sx={{
            margin: "0 auto",
            fontSize: "1.6rem",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Our Esteemed Recruiters
        </Typography>
        <br />
        <CarouselPage1 />
      </Box>
    </Box>
  );
}
