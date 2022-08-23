import React, { useEffect, useState } from "react";

import { styled } from "@mui/material/styles";

import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import { Button, Typography } from "@mui/material";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Loader from "../../Loading/Skeleton";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {apiLink} from '../../../mainurl';

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
  const [expanded, setExpanded] = useState(false);

  const handleChange1 = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const [totalnoofcomp, settotalnoofcomp] = useState([{}]);

  useEffect(() => {
    fetch(
      apiLink+"student/home/thirdyear/all_companies",
      {
        method: "GET",
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
        totalnoofcomp?.map(function (allcomp, i) {
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
                  <Typography
                    sx={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "spaceBetween",
                      flexShrink: 1,
                    }}
                  >
                    {allcomp.cname}
                  </Typography>
                  <Button variant="contained" color="success" disabled>
                    -
                  </Button>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    <div className="detailscomapny">
                      <div>
                        <strong>Category:</strong>
                        {allcomp.category}
                      </div>
                      <div>
                        <strong>Date:</strong>
                        {allcomp.date.slice(0, 10)}
                      </div>
                      <div>
                        <strong>Fulltime CTC:</strong>
                        {allcomp.package}
                      </div>
                      <div>
                        <strong>Deadline:</strong>
                        {allcomp.deadline.slice(0, 10)}
                      </div>
                      <div>
                        <strong>Internship Stipend:</strong>
                        {allcomp.internship_stipend}
                      </div>
                      <div>
                        <strong>Backlogs Allowed:</strong>
                        {allcomp.backlogs}
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
