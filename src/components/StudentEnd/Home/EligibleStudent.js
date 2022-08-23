import React, { useEffect, useState } from "react";

import { styled } from "@mui/material/styles";
import { apiLink } from "../../../mainurl";
import Box from "@mui/material/Box";

import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import { Button, Typography } from "@mui/material";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Loader from "../../Loading/Skeleton";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

function EligibleStudent() {
  const [loading, setLoader] = useState(true);

  const [open, setOpen] = useState(false);
  const [no, setNo] = useState(1);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRegisterConfirm = (cid) => {
    fetch(
      apiLink +
        "student/home/eligible/cid/register_to_company/" +
        localStorage.getItem("usn") +
        "/" +
        cid,
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setOpen(false);
        if (data === false) {
          toast.success("Already Registered!", {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
          fetch(
            apiLink +
              "student/home/eligible/register/" +
              localStorage.getItem("usn"),
            {
              method: "POST",
              headers: {
                accept: "application/json",
              },
            }
          )
            .then((response) => response.json())
            .then((data) => {
              settotalnoofcomp(data);
              fetch(
                apiLink +
                  "student/home/eligible/register/" +
                  localStorage.getItem("usn"),
                {
                  method: "POST",
                  headers: {
                    accept: "application/json",
                  },
                }
              )
                .then((response) => response.json())
                .then((data) => {
                  settotalnoofcomp(data);
                  setLoader(false);
                  toast.success("Registered Successfully!", {
                    position: "bottom-left",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  });
                });
            });
        }
      });
  };
  const [expanded, setExpanded] = useState(false);
  const [nullEligible, setNullEligible] = useState(true);

  const handleChange1 = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const [totalnoofcomp, settotalnoofcomp] = useState([{}]);
  console.log(totalnoofcomp);

  useEffect(() => {
    fetch(
      apiLink + "student/home/eligible/register/" + localStorage.getItem("usn"),
      {
        method: "POST",
        headers: {
          accept: "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        settotalnoofcomp(data);
        setLoader(false);
      });
  }, []);

  return (
    <div>
      {loading ? (
        <Loader height={75} />
      ) : (
        totalnoofcomp?.company_details?.map(function (allcomp, i) {
          if (totalnoofcomp.eligible[i] || totalnoofcomp.is_registered[i])
            return (
              <>
                <Accordion
                  expanded={expanded === allcomp.cname}
                  onChange={handleChange1(allcomp.cname)}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                  >
                    {nullEligible ? setNullEligible(false) : null}
                    <Typography
                      sx={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "spaceBetween",
                        flexShrink: 1,
                        fontWeight:600,
                      }}
                    >
                      {allcomp.cname}
                    </Typography>
                    {totalnoofcomp.is_registered[i] ? (
                      <Button variant="contained" color="success" disabled>
                        Registered
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => {
                          handleClickOpen();
                          setNo(i);
                        }}
                      >
                        Register
                      </Button>
                    )}
                  </AccordionSummary>
                  <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">
                      {"Are you Sure you want to Register ?"}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        <div className="detailscomapny">
                          <div>
                            <strong>Company:</strong>
                            {totalnoofcomp?.company_details[no]?.cname}
                          </div>
                          <div>
                            <strong>Category:</strong>
                            {totalnoofcomp?.company_details[no]?.category}
                          </div>
                          <div>
                            <strong>Date:</strong>
                            {totalnoofcomp?.company_details[no]?.date?.slice(0,10)?.split('-')?.reverse()?.join('-')}
                          </div>
                          <div>
                            <strong>Fulltime CTC:</strong>
                            {totalnoofcomp?.company_details[no]?.package}
                          </div>
                          <div>
                            <strong>Deadline:</strong>
                            {totalnoofcomp?.company_details[no]?.deadline?.slice(0,10)?.split('-')?.reverse()?.join('-')}
                          </div>
                          <div>
                            <strong>Internship Stipend:</strong>
                            {
                              totalnoofcomp?.company_details[no]
                                ?.internship_stipend
                            }
                          </div>
                          <div>
                            <strong>Backlogs Allowed:</strong>
                            {totalnoofcomp?.company_details[no]?.backlogs?"Yes":"No"}
                          </div>
                          <div>
                            <strong>Cutoff-SSLC:</strong>
                            {totalnoofcomp?.company_details[no]?.ssc}
                          </div>
                          <div>
                            <strong>Cutoff-PUC:</strong>
                            {totalnoofcomp?.company_details[no]?.hsc}
                          </div>
                          <div>
                            <strong>Cutoff-BE:</strong>
                            {totalnoofcomp?.company_details[no]?.ug}
                          </div>
                          <div>
                            <strong>Cutoff-PG:</strong>
                            {totalnoofcomp?.company_details[no]?.pg}
                          </div>
                        </div>
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose}>No </Button>
                      <Button
                        onClick={() => {
                          handleRegisterConfirm(
                            totalnoofcomp?.company_details[no]?.cid
                          );
                        }}
                        autoFocus
                      >
                        Yes
                      </Button>
                    </DialogActions>
                  </Dialog>
                  <AccordionDetails>
                    <Typography>
                      <div className="detailscomapny">
                        <div>
                          <strong>Category:</strong>
                          {allcomp.category}
                        </div>
                        <div>
                          <strong>Date:</strong>
                          {allcomp.date?.slice(0,10)?.split('-')?.reverse()?.join('-')}
                        </div>
                        <div>
                          <strong>Fulltime CTC:</strong>
                          {allcomp.package}
                        </div>
                        <div>
                          <strong>Deadline:</strong>
                          {allcomp.deadline?.slice(0,10)?.split('-')?.reverse()?.join('-')}
                        </div>
                        <div>
                          <strong>Internship Stipend:</strong>
                          {allcomp.internship_stipend}
                        </div>
                        <div>
                          <strong>Backlogs Allowed:</strong>
                          {allcomp.backlogs?"Yes":"No"}
                        </div>
                        <div>
                          <strong>Cutoff-SSLC:</strong>
                          {allcomp.ssc}
                        </div>
                        <div>
                          <strong>Cutoff-PUC:</strong>
                          {allcomp.hsc}
                        </div>
                        <div>
                          <strong>Cutoff-BE:</strong>
                          {allcomp.ug}
                        </div>
                        <div>
                          <strong>Cutoff-PG:</strong>
                          {allcomp.pg}
                        </div>
                      </div>
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </>
            );
        })
      )}
      {loading ? null : nullEligible ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          No Eligible Companies
        </Box>
      ) : (
        <></>
      )}
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
    </div>
  );
}

export default EligibleStudent;
