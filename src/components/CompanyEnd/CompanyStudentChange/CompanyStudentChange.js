import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import {TextField} from '@mui/material';


import './CompanyStudentChange.css';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import {apiLink} from '../../../mainurl'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import {Typography} from '@mui/material';


import OnCampus from '../Sidebar/OnCampus'
import StudentDetails from '../Sidebar/StudentDetails'
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import DialogContent from '@mui/material/DialogContent';


function CompanyAdd() {
  const [value, setValue] = useState("1");

 

  const [expanded, setExpanded] = useState(false);



const [openeditStudentDetails, setopeneditStudentDetails] = useState(false);
  const [studentdetails,setStidentDetails]=useState('');

  const handleregisterdowload = () => {
    fetch(
      apiLink+"stats/download/downloadstudenttable" ,
      {
        method: "GET",
        headers: {
          'accept': "application/json",
          'Content-Type': 'text/csv',
        },
      }
    ).then((response) => response.blob())
    .then((blob) => URL.createObjectURL(blob))
    .then((href) => {
      Object.assign(document.createElement('a'), {
        href,
        download: 'downloadstudent.xlsx',
      }).click();
    });
  };

  const handleunregisterdowload = () => {
    fetch(
      apiLink+"stats/download/downloadregisteredbutnotplaced" ,
      {
        method: "GET",
        headers: {
          'accept': "application/json",
          'Content-Type': 'text/csv',
        },
      }
    ).then((response) => response.blob())
    .then((blob) => URL.createObjectURL(blob))
    .then((href) => {
      Object.assign(document.createElement('a'), {
        href,
        download: 'downloadregisteredbutnotplaced.xlsx',
      }).click();
    });
  };

  const handleClickopeneditStudentDetails = () => {
    fetch(apiLink+"student/home/myprofile"+valuess.usnn , {
      method: 'GET',
      headers: {
          'accept': 'application/json',
          Authorization: "Bearer "+localStorage.getItem('access-token')
      }
    }).then(response => response.json())
    .then(data => {
      setStidentDetails(data)
      setopeneditStudentDetails(true);
    })
  };

  const handleCloseopeneditStudentDetails = () => {
    setopeneditStudentDetails(false);
  };


  const [valuess, setValuess] = useState({
    usnn: ''
  });
  const handleChangess = (prop) => (event) => {
    setValuess({ ...valuess, [prop]: event.target.value });
  };

  const handleChangesss = (prop) => (event) => {
    setStidentDetails({ ...studentdetails, [prop]: event.target.value });
  };

 

  const updateStudentDetails=()=>
  {
    const data = JSON.stringify(studentdetails);

    fetch(apiLink+"auth/student/edit_student/"+valuess.usnn.toUpperCase() , {
      method: 'PUT',
      body:data,
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(response => response.json())
    .then(data => {
      setopeneditStudentDetails(false);
      toast.success(data.message, {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    })
  }
  return <div>
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
              Update Student Details
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
               {(studentdetails)? (
                 <TextField 
                  onChange={handleChangesss('full_name')}
                id="outlined-disabled"
                label="Full Name"
                value={studentdetails.full_name}
                 style={{marginBottom:"1rem"}} fullWidth />
                 ):null}

                 {(studentdetails)? (
                 <TextField 
                 onChange={handleChangesss('first_name')}

                id="outlined-disabled"
                label="First Name"
                value={studentdetails.first_name}
                 style={{marginBottom:"1rem"}} fullWidth />
                 ):null}

                 {(studentdetails)? (
                 <TextField 
                                  onChange={handleChangesss('middle_name')}

                id="outlined-disabled"
                label="Middle Name"
                value={studentdetails.middle_name}
                 style={{marginBottom:"1rem"}} fullWidth />
                 ):null}

                 {(studentdetails)? (
                 <TextField 
                                  onChange={handleChangesss('last_name')}
                id="outlined-disabled"
                label="Last Name"
                value={studentdetails.last_name}
                 style={{marginBottom:"1rem"}} fullWidth />
                 ):null}

                 {(studentdetails)? (
                 <TextField 
                                                  onChange={handleChangesss('usn')}

                id="outlined-disabled"
                label="USN"
                value={studentdetails.usn}
                 style={{marginBottom:"1rem"}} fullWidth />
                 ):null}

                 {(studentdetails)? (
                 <TextField 
                                                  onChange={handleChangesss('branch')}
                id="outlined-disabled"
                label="Branch"
                value={studentdetails.branch}
                 style={{marginBottom:"1rem"}} fullWidth />
                 ):null}

                 {(studentdetails)? (
                 <TextField 
                                                  onChange={handleChangesss('dob')}
                id="outlined-disabled"
                label="Date of Birth"
                value={studentdetails.dob}
                 style={{marginBottom:"1rem"}} fullWidth />
                 ):null}

                 {(studentdetails)? (
                 <TextField 
                                                  onChange={handleChangesss('gender')}
                id="outlined-disabled"
                label="Gender"
                value={studentdetails.gender}
                 style={{marginBottom:"1rem"}} fullWidth />
                 ):null}

                 {(studentdetails)? (
                 <TextField 
                                                  onChange={handleChangesss('Category')}
                id="outlined-disabled"
                label="Category"
                value={studentdetails.category}
                 style={{marginBottom:"1rem"}} fullWidth />
                 ):null}

                 {(studentdetails)? (
                 <TextField 
                                                                  onChange={handleChangesss('native')}

                id="outlined-disabled"
                label="Native"
                value={studentdetails.native}
                 style={{marginBottom:"1rem"}} fullWidth />
                 ):null}

                 {(studentdetails)? (
                 <TextField 
                                                                  onChange={handleChangesss('parents_name')}
                id="outlined-disabled"
                label="Parent's Name"
                value={studentdetails.parents_name}
                 style={{marginBottom:"1rem"}} fullWidth />
                 ):null}

                 {(studentdetails)? (
                 <TextField 
                                                                  onChange={handleChangesss('present_addr')}
                id="outlined-disabled"
                label="Present Address"
                value={studentdetails.present_addr}
                 style={{marginBottom:"1rem"}} fullWidth />
                 ):null}

                 {(studentdetails)? (
                 <TextField 
                                                                  onChange={handleChangesss('permanent_addr')}
                id="outlined-disabled"
                label="Permanent Address"
                value={studentdetails.permanent_addr}
                 style={{marginBottom:"1rem"}} fullWidth />
                 ):null}

                 {(studentdetails)? (
                 <TextField 
                                                                                  onChange={handleChangesss('phone')}

                id="outlined-disabled"
                label="Phone"
                value={studentdetails.phone}
                 style={{marginBottom:"1rem"}} fullWidth />
                 ):null}

                 {(studentdetails)? (
                 <TextField 
                                                                                  onChange={handleChangesss('secondary_phone')}
                id="outlined-disabled"
                label="Secondary Phone"
                value={studentdetails.secondary_phone}
                 style={{marginBottom:"1rem"}} fullWidth />
                 ):null}

               {(studentdetails)? (
                 <TextField 
                                                                                  onChange={handleChangesss('email')}
                id="outlined-disabled"
                label="Email address"
                value={studentdetails.email}
                 style={{marginBottom:"1rem"}} fullWidth />
                 ):null}
                 
                 {(studentdetails)? (
                 <TextField 
                                                                                  onChange={handleChangesss('ssc')}
                id="outlined-disabled"
                label="SSC Marks"
                value={studentdetails.ssc}
                 style={{marginBottom:"1rem"}} fullWidth />
                 ):null}
                 
                 {(studentdetails)? (
                 <TextField 
                                                                                  onChange={handleChangesss('hsc')}
                id="outlined-disabled"
                label="HSC Marks"
                value={studentdetails.hsc}
                 style={{marginBottom:"1rem"}} fullWidth />
                 ):null}
                 
                 {(studentdetails)? (
                 <TextField 
                                                                                  onChange={handleChangesss('ug')}
                id="outlined-disabled"
                label="Undergraduate"
                value={studentdetails.ug}
                 style={{marginBottom:"1rem"}} fullWidth />
                 ):null}
                 
                 {(studentdetails)? (
                 <TextField 
                                                                                  onChange={handleChangesss('pg')}
                id="outlined-disabled"
                label="Postgraduate"
                value={studentdetails.pg}
                 style={{marginBottom:"1rem"}} fullWidth />
                 ):null}
                 
                 {(studentdetails)? (
                 <TextField 
                                                                                  onChange={handleChangesss('ug_percentage')}
                id="outlined-disabled"
                label="UG Percentage"
                value={studentdetails.ug_percentage}
                 style={{marginBottom:"1rem"}} fullWidth />
                 ):null}
                 
                 {(studentdetails)? (
                 <TextField 
                                                                                  onChange={handleChangesss('backlogs')}
                id="outlined-disabled"
                label="Backlogs"
                value={studentdetails.backlogs}
                 style={{marginBottom:"1rem"}} fullWidth />
                 ):null}
                 
                 {(studentdetails)? (
                 <TextField 
                                                                                  onChange={handleChangesss('sem1')}
                id="outlined-disabled"
                label="SEM 1"
                value={studentdetails.sem1}
                 style={{marginBottom:"1rem"}} fullWidth />
                 ):null}
                 
                 
                 {(studentdetails)? (
                 <TextField 
                                                                                  onChange={handleChangesss('sem2')}
                id="outlined-disabled"
                label="SEM 2"
                value={studentdetails.sem2}
                 style={{marginBottom:"1rem"}} fullWidth />
                 ):null}
                 
                 
                 {(studentdetails)? (
                 <TextField 
                                                                                  onChange={handleChangesss('sem3')}
                id="outlined-disabled"
                label="SEM 3"
                value={studentdetails.sem3}
                 style={{marginBottom:"1rem"}} fullWidth />
                 ):null}
                 
                 {(studentdetails)? (
                 <TextField 
                                                                                  onChange={handleChangesss('sem4')}
                id="outlined-disabled"
                label="SEM 4"
                value={studentdetails.sem4}
                 style={{marginBottom:"1rem"}} fullWidth />
                 ):null}
                 
                 {(studentdetails)? (
                 <TextField 
                                                                                  onChange={handleChangesss('sem5')}
                id="outlined-disabled"
                label="SEM 5"
                value={studentdetails.sem5}
                 style={{marginBottom:"1rem"}} fullWidth />
                 ):null}
                 
                 
                 {(studentdetails)? (
                 <TextField 
                                                                                  onChange={handleChangesss('sem6')}
                id="outlined-disabled"
                label="SEM 6"
                value={studentdetails.sem6}
                 style={{marginBottom:"1rem"}} fullWidth />
                 ):null}
                 
                 {(studentdetails)? (
                 <TextField 
                                                                                  onChange={handleChangesss('sem7')}
                id="outlined-disabled"
                label="SEM 7"
                value={studentdetails.sem7}
                 style={{marginBottom:"1rem"}} fullWidth />
                 ):null}
                 
                 
                 {(studentdetails)? (
                 <TextField 
                                                                                  onChange={handleChangesss('sem8')}
                id="outlined-disabled"
                label="SEM 8"
                value={studentdetails.sem8}
                 style={{marginBottom:"1rem"}} fullWidth />
                 ):null}
                 
                 {(studentdetails)? (
                 <TextField 
                                                                                  onChange={handleChangesss('current_backlogs')}
                id="outlined-disabled"
                label="Current Backlogs"
                value={studentdetails.current_backlogs}
                 style={{marginBottom:"1rem"}} fullWidth />
                 ):null}
                 
                 
                 {(studentdetails)? (
                 <TextField 
                                                                                  onChange={handleChangesss('history_backlogs')}
                id="outlined-disabled"
                label="History Backlogs"
                value={studentdetails.history_backlogs}
                 style={{marginBottom:"1rem"}} fullWidth />
                 ):null}
                 
                 {(studentdetails)? (
                 <TextField 
                                                                                  onChange={handleChangesss('no_of_x_grades')}
                id="outlined-disabled"
                label="No. of X Grades"
                value={studentdetails.no_of_x_grades}
                 style={{marginBottom:"1rem"}} fullWidth />
                 ):null}
                 
                 {(studentdetails)? (
                 <TextField 
                                                                                  onChange={handleChangesss('other_grades')}
                id="outlined-disabled"
                label="Other Grades"
                value={studentdetails.other_grades}
                 style={{marginBottom:"1rem"}} fullWidth />
                 ):null}
                 
                 {(studentdetails)? (
                 <TextField 
                                                                                  onChange={handleChangesss('ug_start_year')}
                id="outlined-disabled"
                label="UG START YEAR"
                value={studentdetails.ug_start_year}
                 style={{marginBottom:"1rem"}} fullWidth />
                 ):null}
                 
                 {(studentdetails)? (
                 <TextField 
                                                                                  onChange={handleChangesss('ug_end_year')}
                id="outlined-disabled"
                label="UG END YEAR"
                value={studentdetails.ug_end_year}
                 style={{marginBottom:"1rem"}} fullWidth />
                 ):null}
                 
                 
                 {(studentdetails)? (
                 <TextField 
                                                                                  onChange={handleChangesss('ssc_board')}
                id="outlined-disabled"
                label="SSC BOARD"
                value={studentdetails.ssc_board}
                 style={{marginBottom:"1rem"}} fullWidth />
                 ):null}
                 
                 {(studentdetails)? (
                 <TextField 
                                                                                  onChange={handleChangesss('hsc_board')}
                id="outlined-disabled"
                label="HSC BOARD"
                value={studentdetails.hsc_board}
                 style={{marginBottom:"1rem"}} fullWidth />
                 ):null}
                 
                 {(studentdetails)? (
                 <TextField 
                                                                                  onChange={handleChangesss('hsc_start_year')}
                id="outlined-disabled"
                label="HSC START YEAR "
                value={studentdetails.hsc_start_year}
                 style={{marginBottom:"1rem"}} fullWidth />
                 ):null}
                 
                 {(studentdetails)? (
                 <TextField 
                                                                                  onChange={handleChangesss('hsc_end_year')}
                id="outlined-disabled"
                label="HSC END YEAR "
                value={studentdetails.hsc_end_year}
                 style={{marginBottom:"1rem"}} fullWidth />
                 ):null}
                 
                 
                 {(studentdetails)? (
                 <TextField 
                                                                                  onChange={handleChangesss('ssc_start_year')}
                id="outlined-disabled"
                label="SSC START YEAR "
                value={studentdetails.ssc_start_year}
                 style={{marginBottom:"1rem"}} fullWidth />
                 ):null}
                 
                 {(studentdetails)? (
                 <TextField 
                                                                                  onChange={handleChangesss('ssc_end_year')}
                id="outlined-disabled"
                label="SSC START YEAR "
                value={studentdetails.ssc_end_year}
                 style={{marginBottom:"1rem"}} fullWidth />
                 ):null}
                 
                 {(studentdetails)? (
                 <TextField 
                                                                                  onChange={handleChangesss('entry_to_college')}
                id="outlined-disabled"
                label="ENTRY TO COLLEGE"
                value={studentdetails.entry_to_college}
                 style={{marginBottom:"1rem"}} fullWidth />
                 ):null}
                 
                 {(studentdetails)? (
                 <TextField 
                                                                                  onChange={handleChangesss('rank')}
                id="outlined-disabled"
                label="Rank"
                value={studentdetails.rank}
                 style={{marginBottom:"1rem"}} fullWidth />
                 ):null}
                 
                 {(studentdetails)? (
                 <TextField 
                                                                                  onChange={handleChangesss('gap_in_studies')}
                id="outlined-disabled"
                label="Gap in Studies"
                value={studentdetails.gap_in_studies}
                 style={{marginBottom:"1rem"}} fullWidth />
                 ):null}
                 
                 {(studentdetails)? (
                 <TextField 
                                                                                  onChange={handleChangesss('summer_internship')}
                id="outlined-disabled"
                label="Summer Internship"
                value={studentdetails.summer_internship}
                 style={{marginBottom:"1rem"}} fullWidth />
                 ):null}
                 
                 {(studentdetails)? (
                 <TextField 
                                                                                  onChange={handleChangesss('internship')}
                id="outlined-disabled"
                label="Internship"
                value={studentdetails.internship}
                 style={{marginBottom:"1rem"}} fullWidth />
                 ):null}
                 
                 {(studentdetails)? (
                 <TextField 
                                                                                  onChange={handleChangesss('verified')}
                id="outlined-disabled"
                label="Verified"
                value={studentdetails.verified}
                 style={{marginBottom:"1rem"}} fullWidth />
                 ):null}

               

{/* <div className="header_company">Resume</div>
              <br></br>
              <Box>
                <Button
                  variant="contained"
                  component="label"
                  sx={{ margin: "1rem 0", width: "100%" }}
                >
                  Upload File &nbsp;
                  <input type="file" />
                </Button>
              <br></br>
              <br></br>
              <br></br>

              </Box> */}



<div style={{width:'100%',display:'flex',alignItems:'center'}}>
              <Button variant="contained" style={{margin:'0 auto'}} 
              onClick={updateStudentDetails}
              >UPDATE</Button>

              </div>
                </Box>
                
                
              </div>
          </DialogContent>
          
        </Dialog>
      <Container maxWidth="lg" sx={{display:'flex',flexDirection:'row'}}>
      <Box sx={{width:'25%',margin:'0 2rem'}}>
              <StudentDetails/>
              <hr/>
              <OnCampus/>
          </Box>

      <Box sx={{width:'75%',margin:'0 2rem'}}>
      <Box sx={{  margin: '5vh 0' }}>
            <div className='header_company'>CHANGE STUDENT DETAILS</div>
              <Box sx={{  bgcolor: 'background.paper'}} style={{padding:'1rem'}}>
             
            </Box>
              
             
              
              <div className='companyaddform'>
                <Box
                  sx={{
                    width: 800,
                    maxWidth: '100%',
                  }}
                >
               

                <TextField fullWidth label="USN" id="fullWidth" placeholder="USN" style={{marginBottom:"1rem"}} 
               value={valuess.usnn}
              onChange={handleChangess('usnn')}
                />

                <div style={{width:'100%',display:'flex',alignItems:'centre'}}>
              <Button variant="contained" onClick={handleClickopeneditStudentDetails} style={{margin:'0 auto'}} >UPDATE</Button>

              </div>
                

                </Box>
                

              </div>
              <div style={{width:'100%',display:'flex',alignItems:'center'}}>
              {/* <Button variant="contained" style={{margin:'0 auto'}}>SUBMIT</Button> */}

              </div>

              </Box>
              {/* <Box sx={{  margin: '5vh 0' }}>
            <div className='header_company'>ADD STUDENT</div>
              <Box sx={{  bgcolor: 'background.paper'}} style={{padding:'1rem'}}>
              
            </Box>
              
             
              
              <div className='companyaddform'>
                <Box
                  sx={{
                    width: 800,
                    maxWidth: '100%',
                  }}
                >
               

               <TextField fullWidth label="USN" id="fullWidth" placeholder="USN" style={{marginBottom:"1rem"}}/>
               <TextField fullWidth label="EMAIL" id="fullWidth" placeholder="Email ID" style={{marginBottom:"1rem"}}/>


                <div style={{width:'100%',display:'flex',alignItems:'centre'}}>
              <Button variant="contained" style={{margin:'0 auto'}}>ADD</Button>

              </div>
                </Box>
                

              </div>
              

              </Box> */}
              <Box sx={{  margin: '5vh 0' }}>
            <div className='header_company'>DOWNLOADS</div>
              <Box sx={{  bgcolor: 'background.paper'}} style={{padding:'1rem'}}>
              
            </Box>
              
             
              
                    <Accordion expanded={expanded === 'panel1'} >
                      {/* add onchange version */}
                        <AccordionSummary
                        
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                        >
                        <Typography 
                        sx={{ width:'100%',display:'flex',alignItems:'center',justifyContent:'spaceBetween', flexShrink: 1 }}>
                            Download Student List :
                        </Typography>
                          <Stack direction="row" spacing={2}>
        <Button variant="contained" onClick={handleregisterdowload}>Registered</Button>
        <Button variant="contained" onClick={handleunregisterdowload}>
          Unregistered
        </Button>
      </Stack>
                        </AccordionSummary>
                        <AccordionDetails>
                        <Typography>
                            Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
                            Aliquam eget maximus est, id dignissim quam.
                        </Typography>
                        </AccordionDetails>
                    </Accordion>
                    
              </Box>
              </Box>

            </Container>
  </div>;
}

export default CompanyAdd;
