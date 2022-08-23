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
import { apiLink } from "../../../mainurl";
import Button from '@mui/material/Button';
import { DialogContent, TextField } from "@mui/material";

import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';

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
    fetch(apiLink + "student/feedbacks/details", {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    })
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
  const [openeditStudentDetails, setopeneditStudentDetails] = useState(false);

  const [feedbackdetail, setfeedbackdetail] = useState({});

  const handleCloseopeneditStudentDetails = () => {
    setopeneditStudentDetails(false);
  };
  const handleClickopeneditStudentDetails = (oncamp) => {
      setopeneditStudentDetails(true);
      setfeedbackdetail(oncamp)

  };

  const [openeditStudentDetails2, setopeneditStudentDetails2] = useState(false);


  const handleCloseopeneditStudentDetails2 = () => {
    setopeneditStudentDetails2(false);
  };
  const handleClickopeneditStudentDetails2 = (oncamp) => {
      setopeneditStudentDetails2(true);
      setfeedbackdetail(oncamp)
  };
  const fuse = new Fuse(totalFeedback, options);
  return (
    <div>
       <Dialog
          fullScreen
          open={openeditStudentDetails}
          onClose={handleCloseopeneditStudentDetails}
          // TransitionComponent={Transition}
          // sx={{width:'100%',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'}}
        >
          <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleCloseopeneditStudentDetails}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Feedback Details of {feedbackdetail.sname}
            </Typography>
          </Toolbar>
        </AppBar>
          <DialogContent>
          <div className='companyaddform'>
                <Box
                  sx={{
                    width: 800,
                    maxWidth: '100%',
                  }}
                >

                <TextField
                      fullWidth
                      label="Name"
                      id="fullWidth"
                      style={{ marginBottom: "1rem" }}
                      value={feedbackdetail.sname}
                    />
                <TextField
                      fullWidth
                      label="Company Name"
                      id="fullWidth"
                      style={{ marginBottom: "1rem" }}
                      value={feedbackdetail.cname}
                    />
                    <TextField
                      fullWidth
                      label="CTC"
                      id="fullWidth"
                      style={{ marginBottom: "1rem" }}
                      value={feedbackdetail.ctc}
                    />
                    <TextField
                      fullWidth
                      label="Branch"
                      id="fullWidth"
                      style={{ marginBottom: "1rem" }}
                      value={feedbackdetail.branch}
                    />

                    <TextField
                      fullWidth
                      label="Role"
                      id="fullWidth"
                      style={{ marginBottom: "1rem" }}
                      value={feedbackdetail.role}
                    />

                    <TextField
                      fullWidth
                      label="Base"
                      id="fullWidth"
                      style={{ marginBottom: "1rem" }}
                      value={feedbackdetail.base}
                    />
                    <TextField
                      fullWidth
                      label="Stipend"
                      id="fullWidth"
                      style={{ marginBottom: "1rem" }}
                      value={feedbackdetail.stipend}
                    />
                    <TextField
                      fullWidth
                      label="Overall Experience(Out of 5)"
                      id="fullWidth"
                      style={{ marginBottom: "1rem" }}
                      value={feedbackdetail.overall_experience}
                    />

                  <TextField
                      fullWidth
                      label="Technical Round"
                      id="fullWidth"
                      multiline
                      rows={10}
                      style={{ marginBottom: "1rem" }}
                      value={feedbackdetail.technical_round}
                    />

                    <TextField
                      fullWidth
                      label="Passing Year"
                      id="fullWidth"
                      style={{ marginBottom: "1rem" }}
                      value={feedbackdetail.passing_year}
                    />
                      <TextField
                      fullWidth
                      label="HR Round"
                      id="fullWidth"
                      multiline
                      rows={7}
                      style={{ marginBottom: "1rem" }}
                      value={feedbackdetail.hr_round}
                    />
                        <TextField
                      fullWidth
                      label="Full Time"
                      id="fullWidth"
                      style={{ marginBottom: "1rem" }}
                      value={feedbackdetail.full_time}
                    />
                 <TextField
                      fullWidth
                      label="Tips"
                      id="fullWidth"
                      multiline
                      rows={5}
                      style={{ marginBottom: "1rem" }}
                      value={feedbackdetail.tips}
                    />
 <TextField
                      fullWidth
                      label="Summer Internship"
                      id="fullWidth"
                      style={{ marginBottom: "1rem" }}
                      value={feedbackdetail.summer_internship}
                    />
                 <TextField
                      fullWidth
                      label="Topics Covered"
                      id="fullWidth"
                      multiline
                      rows={2}
                      style={{ marginBottom: "1rem" }}
                      value={feedbackdetail.topics_covered}
                    />
<TextField
                      fullWidth
                      label="Coding Round Difficulty(Out of 5)"
                      
                      id="fullWidth"
                      style={{ marginBottom: "1rem" }}
                      value={feedbackdetail.codinground_difficulty}
                    />
 <TextField
                      fullWidth
                      label="Location"
                      id="fullWidth"
                      style={{ marginBottom: "1rem" }}
                      value={feedbackdetail.location}
                    />
                 <TextField
                      fullWidth
                      label="Mode"
                      id="fullWidth"
                      style={{ marginBottom: "1rem" }}
                      value={feedbackdetail.mode}
                    />
<TextField
                      fullWidth
                      label="Interview Difficulty(Out of 5)"
                      id="fullWidth"
                      style={{ marginBottom: "1rem" }}
                      value={feedbackdetail.interview_difficulty}
                    />

                </Box>
                
                
              </div>
          </DialogContent>
          
        </Dialog>
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
                      </div>
                      <Typography
                    sx={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "spaceBetween",
                      flexShrink: 1,
                    }}
                  >
                  <Button variant="contained"  style={{margin:'0 auto'}} onClick={()=>{handleClickopeneditStudentDetails(oncamp.item)}} >VIEW FULL FEEDBACK</Button>
                  </Typography>
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
                      </div>
                      <Typography
                    sx={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "spaceBetween",
                      flexShrink: 1,
                    }}
                  >
                  <Button variant="contained"  style={{margin:'0 auto'}} onClick={()=>{handleClickopeneditStudentDetails2(oncamp)}} >VIEW FULL FEEDBACK</Button>
                  </Typography>
                    
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </>
          );
        })
      )}
      <Dialog
          fullScreen
          open={openeditStudentDetails2}
          onClose={handleCloseopeneditStudentDetails2}
          // TransitionComponent={Transition}
          // sx={{width:'100%',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'}}
        >
          <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleCloseopeneditStudentDetails2}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Feedback Details of {feedbackdetail.sname}
            </Typography>
          </Toolbar>
        </AppBar>
          <DialogContent>
          <div className='companyaddform'>
                <Box
                  sx={{
                    width: 800,
                    maxWidth: '100%',
                  }}
                >

                <TextField
                      fullWidth
                      label="Name"
                      id="fullWidth"
                      style={{ marginBottom: "1rem" }}
                      value={feedbackdetail.sname}
                    />
                <TextField
                      fullWidth
                      label="Company Name"
                      id="fullWidth"
                      style={{ marginBottom: "1rem" }}
                      value={feedbackdetail.cname}
                    />
                    <TextField
                      fullWidth
                      label="CTC"
                      id="fullWidth"
                      style={{ marginBottom: "1rem" }}
                      value={feedbackdetail.ctc}
                    />
                    <TextField
                      fullWidth
                      label="Branch"
                      id="fullWidth"
                      style={{ marginBottom: "1rem" }}
                      value={feedbackdetail.branch}
                    />

                    <TextField
                      fullWidth
                      label="Role"
                      id="fullWidth"
                      style={{ marginBottom: "1rem" }}
                      value={feedbackdetail.role}
                    />

                    <TextField
                      fullWidth
                      label="Base"
                      id="fullWidth"
                      style={{ marginBottom: "1rem" }}
                      value={feedbackdetail.base}
                    />
                    <TextField
                      fullWidth
                      label="Stipend"
                      id="fullWidth"
                      style={{ marginBottom: "1rem" }}
                      value={feedbackdetail.stipend}
                    />
                    <TextField
                      fullWidth
                      label="Overall Experience(Out of 5)"
                      id="fullWidth"
                      style={{ marginBottom: "1rem" }}
                      value={feedbackdetail.overall_experience}
                    />

                  <TextField
                      fullWidth
                      label="Technical Round"
                      id="fullWidth"
                      multiline
                      rows={10}
                      style={{ marginBottom: "1rem" }}
                      value={feedbackdetail.technical_round}
                    />

                    <TextField
                      fullWidth
                      label="Passing Year"
                      id="fullWidth"
                      style={{ marginBottom: "1rem" }}
                      value={feedbackdetail.passing_year}
                    />
                      <TextField
                      fullWidth
                      label="HR Round"
                      id="fullWidth"
                      multiline
                      rows={7}
                      style={{ marginBottom: "1rem" }}
                      value={feedbackdetail.hr_round}
                    />
                        <TextField
                      fullWidth
                      label="Full Time"
                      id="fullWidth"
                      style={{ marginBottom: "1rem" }}
                      value={feedbackdetail.full_time}
                    />
                 <TextField
                      fullWidth
                      label="Tips"
                      id="fullWidth"
                      multiline
                      rows={5}
                      style={{ marginBottom: "1rem" }}
                      value={feedbackdetail.tips}
                    />
 <TextField
                      fullWidth
                      label="Summer Internship"
                      id="fullWidth"
                      style={{ marginBottom: "1rem" }}
                      value={feedbackdetail.summer_internship}
                    />
                 <TextField
                      fullWidth
                      label="Topics Covered"
                      id="fullWidth"
                      multiline
                      rows={2}
                      style={{ marginBottom: "1rem" }}
                      value={feedbackdetail.topics_covered}
                    />
<TextField
                      fullWidth
                      label="Coding Round Difficulty(Out of 5)"
                      
                      id="fullWidth"
                      style={{ marginBottom: "1rem" }}
                      value={feedbackdetail.codinground_difficulty}
                    />
 <TextField
                      fullWidth
                      label="Location"
                      id="fullWidth"
                      style={{ marginBottom: "1rem" }}
                      value={feedbackdetail.location}
                    />
                 <TextField
                      fullWidth
                      label="Mode"
                      id="fullWidth"
                      style={{ marginBottom: "1rem" }}
                      value={feedbackdetail.mode}
                    />
<TextField
                      fullWidth
                      label="Interview Difficulty(Out of 5)"
                      id="fullWidth"
                      style={{ marginBottom: "1rem" }}
                      value={feedbackdetail.interview_difficulty}
                    />

                </Box>
                
                
              </div>
          </DialogContent>
          
        </Dialog>
    </div>
  );
}

export default AllFeedback;
