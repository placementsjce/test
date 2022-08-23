import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import "./StudentStatus.css";
import Loader from "../../Loading/Skeleton";
import { apiLink } from "../../../mainurl";

import {Typography} from "@mui/material";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import OnCampus from "../Sidebar/OnCampus";

function CompanyAdd() {
  const [expanded, setExpanded] = React.useState(false);

  const [loading, setLoader] = useState(true);

  const [status_cat, setSetcat] = useState([""]);
  const [status_sti, setSetsti] = useState([""]);
  const [status_cname, setSetcname] = useState([""]);
  const [status_package, setSetpackage] = useState([""]);
  const [status_tier, setSettier] = useState([""]);

  useEffect(() => {
    fetch(apiLink + "student/home/status_cname" + localStorage.getItem("usn"), {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setSetcname(data);
        fetch(
          apiLink + "student/home/status_package" + localStorage.getItem("usn"),
          {
            method: "GET",
            headers: {
              accept: "application/json",
            },
          }
        )
          .then((response) => response.json())
          .then((data) => {
            setSetpackage(data);
            fetch(
              apiLink +
                "student/home/status_tier" +
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
                setSettier(data);
                fetch(
                  apiLink +
                    "student/home/status_category" +
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
                    setSetcat(data);
                    fetch(
                      apiLink +
                        "student/home/status_stipend" +
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
                        setSetsti(data);
                        setLoader(false);
                      });
                  });
              });
          });
      });
  }, []);

  console.log(status_tier);

  const handleChange1 = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
      <Container maxWidth="lg" sx={{ display: "flex", flexDirection: "row" }}>
        <Box sx={{ width: "22%", margin: "0 2rem" }} class="oncamp_side">
          <OnCampus />
        </Box>
        <Box sx={{ width: "78%", margin: "0 2rem" }} class="oncamp_rest">
          <div className="header_company">STATUS</div>

          <Box
            sx={{ bgcolor: "background.paper" }}
            style={{ padding: "1rem" }}
          ></Box>

          <Box
            sx={{
              // width: 800,
              maxWidth: "100%",
            }}
          >
            {/* <TabPanel> */}
            {loading === true ? (
              <Loader height={75} />
            ) : (
              status_cat?.map(function (allcomp, i) {
                return (
                  <>
                    <Accordion
                      expanded={expanded === allcomp}
                      onChange={handleChange1(allcomp)}
                      sx={{ margin: "1rem 0" }}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                      >
                        <Typography
                          sx={{
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "spaceBetween",
                            flexShrink: 1,
                          }}
                        >
                          {status_cname[i] ? status_cname[i] : null}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography>
                          <div className="detailscomapny" height="50vh">
                            <div>
                              <strong>Category:</strong>
                              {allcomp}
                            </div>
                            <div>
                              <strong>Tier:</strong>
                              {status_tier[i]?.category_placed
                                ? status_tier[i]?.category_placed
                                : null}
                            </div>
                            <div>
                              <strong>Fulltime CTC:</strong>
                              {status_package[i] ? status_package[i] : null}
                            </div>
                            <div>
                              <strong>Internship Stipend:</strong>
                              {status_sti[i] ? status_sti[i] : null}
                            </div>
                          </div>
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                  </>
                );
              })
            )}
            {loading ? null : status_sti.length ? (
              <></>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "50vh"
                }}
              >
                Not yet placed
              </Box>
            )}
          </Box>

          {/* </TabPanel> */}

          {/* <div style={{ width: "100%", display: "flex", alignItems: "center" }}> */}
            {/* <Button variant="contained" style={{margin:'0 auto'}}>SUBMIT</Button> */}
          {/* </div> */}
        </Box>
      </Container>
    </div>
  );
}

export default CompanyAdd;
