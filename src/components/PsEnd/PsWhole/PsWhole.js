import React, { useState,useEffect } from 'react';
import Header from '../../Header/Header';
import {Tabs} from '@mui/material';
import {Tab} from '@mui/material';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import { useNavigate } from 'react-router-dom';
import PsWhole from '../PSStudentEnd/PSStudent'
import Footer from '../../common/footer'



function CompanyWhole() {
    const [value, setValue] = useState("1");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    let history = useNavigate()

    const handleLogout =(event)=>{
      localStorage.clear();
      history("/");
    }

    useEffect(() => {
      console.log(localStorage.getItem('person'))
      if(!(localStorage.getItem('person')==='ps'||localStorage.getItem('person')==='hps'))
        history("/login");
      }, [])
  return(
       <div>
        <Header/>
        <TabContext value={value}>
        <Box sx={{  bgcolor: 'background.paper'}}  style={{
            padding: "1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
  
        <Tabs
        value={value}
        onChange={handleChange}
        centered
        variant="scrollable"
            scrollButtons
            allowScrollButtonsMobile
        >
        <Tab label="STUDENT EDIT" value="1" />
        <Button variant="contained" style={{margin:'0rem 1rem'}} onClick={handleLogout}>Logout</Button>
        {(localStorage.getItem('person')==='hps')?(<Button style={{minWidth:'auto'}} variant="contained">Head Placement Secretary</Button>):null}
        {(localStorage.getItem('person')==='ps')?(<Button style={{minWidth:'auto'}} variant="contained">Placement Secretary</Button>):null}
        {(localStorage.getItem('person')==='admin')?(<Button style={{margin:'0rem 1rem'}} variant="contained">Admin</Button>):null}
      </Tabs>
      </Box>
        <TabPanel value="1" ><PsWhole/></TabPanel>


      </TabContext>
			<Footer />

  </div>);
}

export default CompanyWhole;
