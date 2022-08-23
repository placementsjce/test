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
  const [nullNotEligible, setNullNotEligible] = useState(true);

  const [expanded, setExpanded] = useState(false);

  const handleChange1 = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const [totalnoofcomp, settotalnoofcomp] = useState("");

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
          if (!totalnoofcomp.eligible[i]&&!totalnoofcomp.is_registered[i])
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
                    {nullNotEligible ? setNullNotEligible(false) : null}
                    <Typography
                      sx={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "spaceEvenly",
                        flexShrink: 1,
                        fontWeight:600,
                      }}
                    >
                      {allcomp.cname}
                    </Typography>
                    <Button variant="contained" color="success" disabled>
                      NE
                    </Button>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      <div className="detailscomapny">
                        <div>
                          <strong>Category:</strong>&nbsp;&nbsp;&nbsp;&nbsp;
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
      {loading ? null : nullNotEligible ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          No Uneligible Companies
        </Box>
      ) : (
        <></>
      )}
    </div>
  );
}

export default EligibleStudent;
