import React, { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Loader from "../../Loading/Skeleton";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import { styled, alpha } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import {InputBase} from "@mui/material";
import {Typography} from "@mui/material";
import Fuse from "fuse.js";
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

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.black, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));
const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

function AllFeedback() {
  const [loading, setLoader] = useState(true);

  const [feedbackSearch, setfeedbackSearch] = useState("");
  let [totalFeedback, settotalFeedback] = useState([{}]);
  const [expanded, setExpanded] = React.useState(false);

  const handleChange2 = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  useEffect(() => {
    fetch(
      apiLink+"student/feedbacks/details",
      {
        method: "GET",
        headers: {
          accept: "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        settotalFeedback(data);
        setLoader(false);
      });
  }, []);

  const options = {
    includeScore: true,
    keys: [
      "ctc",
      "role",
      "cname",
      "sname",
      "base",
      "branch",
      "passing_year",
      "location",
    ],
  };

  const fuse = new Fuse(totalFeedback, options);

  return (
    <div>
      <Search sx={{ marginBottom: "5px" }}>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          onChange={(event) => {
            setfeedbackSearch(event.target.value);
          }}
          placeholder="Search ..."
          inputProps={{ "aria-label": "search" }}
          sx={{ width: "100%" }}
        />
      </Search>
      {loading ? (
        <Loader height={50} />
      ) : feedbackSearch.length ? (
        fuse.search(feedbackSearch)?.map((oncamp, i) => {
          return (
            <>
              <Accordion expanded={expanded === i} onChange={handleChange2(i)}>
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
                    <strong>{oncamp.item.cname}</strong>
                  </Typography>
                  <Typography
                    sx={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "spaceBetween",
                      flexShrink: 1,
                    }}
                  >
                    <strong>{oncamp.item.sname}</strong>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    <div className="detailscomapny">
                      <br />
                      <div>
                        <strong>Name:</strong>
                        {oncamp.item.sname}
                      </div>
                      <div>
                        <strong>Company Name:</strong>
                        {oncamp.item.cname}
                      </div>
                      <div>
                        <strong>CTC:</strong>
                        {oncamp.item.ctc}
                      </div>
                      <div>
                        <strong>Branch:</strong>
                        {oncamp.item.branch}
                      </div>
                      <div>
                        <strong>Role:</strong>
                        {oncamp.item.role}
                      </div>
                      <div>
                        <strong>Base:</strong>
                        {oncamp.item.base}
                      </div>
                      <div>
                        <strong>Stipend:</strong>
                        {oncamp.item.stipend}
                      </div>
                      <div>
                        <strong>Overall Experience:</strong>
                        {oncamp.item.overall_experience}
                      </div>
                      <div>
                        <strong>Technical Rounds:</strong>
                        {oncamp.item.technical_round}
                      </div>
                      <div>
                        <strong>Passing Year:</strong>
                        {oncamp.item.passing_year}
                      </div>
                      <div>
                        <strong>HR Round:</strong>
                        {oncamp.item.hr_round}
                      </div>
                      <div>
                        <strong>Full Time:</strong>
                        {oncamp.item.full_time}
                      </div>
                      <div>
                        <strong>Tips:</strong>
                        {oncamp.item.tips}
                      </div>
                      <div>
                        <strong>Summer Internship:</strong>
                        {oncamp.item.summer_internship}
                      </div>
                      <div>
                        <strong>Topics Covered:</strong>
                        {oncamp.item.topics_covered}
                      </div>
                      <div>
                        <strong>Coding Round Difficlty:</strong>
                        {oncamp.item.codinground_difficulty}
                      </div>
                      <div>
                        <strong>Location:</strong>
                        {oncamp.item.location}
                      </div>
                      <div>
                        <strong>Mode:</strong>
                        {oncamp.item.mode}
                      </div>
                      <div>
                        <strong>Interview Difficulty:</strong>
                        {oncamp.item.interview_difficulty}
                      </div>
                    </div>
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </>
          );
        })
      ) : (
        totalFeedback?.map(function (oncamp, i) {
          return (
            <>
              <Accordion expanded={expanded === i} onChange={handleChange2(i)}>
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
                    <strong>{oncamp.cname}</strong>
                  </Typography>
                  <Typography
                    sx={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "spaceBetween",
                      flexShrink: 1,
                    }}
                  >
                    <strong>{oncamp.sname}</strong>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    <div className="detailscomapny">
                      <br />
                      <div>
                        <strong>Name:</strong>
                        {oncamp.sname}
                      </div>
                      <div>
                        <strong>Company Name:</strong>
                        {oncamp.cname}
                      </div>
                      <div>
                        <strong>CTC:</strong>
                        {oncamp.ctc}
                      </div>
                      <div>
                        <strong>Branch:</strong>
                        {oncamp.branch}
                      </div>
                      <div>
                        <strong>Role:</strong>
                        {oncamp.role}
                      </div>
                      <div>
                        <strong>Base:</strong>
                        {oncamp.base}
                      </div>
                      <div>
                        <strong>Stipend:</strong>
                        {oncamp.stipend}
                      </div>
                      <div>
                        <strong>Overall Experience:</strong>
                        {oncamp.overall_experience}
                      </div>
                      <div>
                        <strong>Technical Rounds:</strong>
                        {oncamp.technical_round}
                      </div>
                      <div>
                        <strong>Passing Year:</strong>
                        {oncamp.passing_year}
                      </div>
                      <div>
                        <strong>HR Round:</strong>
                        {oncamp.hr_round}
                      </div>
                      <div>
                        <strong>Full Time:</strong>
                        {oncamp.full_time}
                      </div>
                      <div>
                        <strong>Tips:</strong>
                        {oncamp.tips}
                      </div>
                      <div>
                        <strong>Summer Internship:</strong>
                        {oncamp.summer_internship}
                      </div>
                      <div>
                        <strong>Topics Covered:</strong>
                        {oncamp.topics_covered}
                      </div>
                      <div>
                        <strong>Coding Round Difficlty:</strong>
                        {oncamp.codinground_difficulty}
                      </div>
                      <div>
                        <strong>Location:</strong>
                        {oncamp.location}
                      </div>
                      <div>
                        <strong>Mode:</strong>
                        {oncamp.mode}
                      </div>
                      <div>
                        <strong>Interview Difficulty:</strong>
                        {oncamp.interview_difficulty}
                      </div>
                    </div>
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </>
          );
        })
      )}
    </div>
  );
}

export default AllFeedback;
