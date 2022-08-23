import React, { useState,useEffect } from 'react';
import Header from '../../Header/Header';
import {Tabs} from '@mui/material';
import {Tab} from '@mui/material';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import CompanyAndRegList from '../CompanyAndRegList/CompanyAndRegList';
import Analytics from '../Analytics/analytics';
import CompanyStudentChange from '../CompanyStudentChange/CompanyStudentChange';
import Others from '../Others/Other';
import { useNavigate } from 'react-router-dom';
import {apiLink} from '../../../mainurl'
import Footer from '../../common/footer'


// sajdsakjdlksajdklaj

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
      if(localStorage.getItem('person')!=='admin')
        history("/login");
      }, [])

  return(
       <div>
        <Header/>
        <TabContext value={value}>
        <Box sx={{  bgcolor: 'background.paper'}} 
         style={{
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
        <Tab label="COMPANY" value="1" />
        <Tab label="STUDENT" value="2"/>
        <Tab label="ANALYTICS" value="3" />
        <Tab label="SUMMER INTERNSHIP" value="4"/>
        <Button variant="contained" style={{margin:'0rem 1rem'}} onClick={handleLogout}>Logout</Button>
        {(localStorage.getItem('person')==='ps')?(<Button variant="contained">Placement Secretary</Button>):null}
        {(localStorage.getItem('person')==='admin')?(<Button variant="contained">Admin</Button>):null}
      </Tabs>
      </Box>
        <TabPanel value="1" ><CompanyAndRegList/></TabPanel>
        <TabPanel value="2"><CompanyStudentChange/></TabPanel>
        <TabPanel value="3"><Analytics/></TabPanel>
        <TabPanel value="4"><Others/></TabPanel>

      </TabContext>
			<Footer />

  </div>);
}

export default CompanyWhole;
