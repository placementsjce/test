import React,{useState} from 'react';
import '../Login/Login.css'
import {Tab} from '@mui/material';
import Box from '@mui/material/Box';
import TabPanel from '@mui/lab/TabPanel';
import TabList from '@mui/lab/TabList';
import TabContext from '@mui/lab/TabContext';
import StudentTab from '../Login_Student/login_student'
import Register from '../Login_Student/Register'
import LoginLeft from './login_left'
import ThirdyearTab from '../Login_Student/ThirdYear'
import Navbar from '../common/navbar'
import Footer from '../common/footer'

function Login() {
    const [value, setValue] = useState('2');

const handleChange = (event, newValue) => {
  setValue(newValue);
};
    return (
        <div>
			<Navbar />
        <div className="login__main">
            {/* <div className="login__left">
                <LoginLeft/>
            </div> */}
            <div className="login__right">
            <Box sx={{  typography: 'body1' ,maxWidth:'100%'}}>
                <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider',maxWidth:'100%' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="Register" value="1" sx={{width:'33%',maxWidth:'33%'}} />
                        <Tab label="Login" value="2" sx={{width:'34%',maxWidth:'34%'}} />
                        <Tab label="Junior Login" value="3" sx={{width:'33%',maxWidth:'33%'}} />
                    </TabList>
                </Box>
                    <TabPanel value="1"><Register/></TabPanel>
                    <TabPanel value="2"><StudentTab/></TabPanel>
                    <TabPanel value="3"><ThirdyearTab/></TabPanel>
                </TabContext>
            </Box>
            </div>
        </div>
			<Footer />
        </div>
    )
}

export default Login
