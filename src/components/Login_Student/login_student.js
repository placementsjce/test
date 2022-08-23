import  React,{useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import {TextField} from '@mui/material';
import FormControl from '@mui/material/FormControl';
import {InputLabel} from '@mui/material';
import {InputAdornment} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import {Input} from '@mui/material';
import Button from '@mui/material/Button';
import '../Login_Student/login_student.css';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';
import Loader from '../Loading/Loading'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import {apiLink} from '../../mainurl'
export default function BasicTextFields() {
  const [loading,setLoader]=useState(false);

  const [valuesLogin, setValuesLogin] = useState({
    password: '',
    usn: '',
    email:''
  });
  let history = useNavigate()
  const [isForgot,setForgot]=useState(true);



  const handleChange = (prop) => (event) => {
    setValuesLogin({ ...valuesLogin, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValuesLogin({
      ...valuesLogin,
      showPassword: !valuesLogin.showPassword,
    });
  };
 


  const [ps,setps]=useState(false);
  const [admin,setadmin]=useState(false);

  const handleLogin =()=>{
    setLoader(true);
    console.log(valuesLogin)
    const details = {
      "usn":valuesLogin.usn,
      "password":valuesLogin.password
    }
    if(valuesLogin.usn==="HEAD123456")
    {
      fetch(apiLink+"auth/auth/head_pslogin?usn="+valuesLogin.usn+"&password="+valuesLogin.password , {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
          },
        })
        .then(response=>{
          if(response.status === 400){
            response.json()
            setLoader(false);
            setps(true);
            
          }else if(response.status === 200){
            response.json()
            .then(data => {
              console.log(data)
                localStorage.setItem('access-token', data.access)
                localStorage.setItem('person', "hps")
                history("/ps")
                setLoader(false);
                setps(false);
                setadmin(false);
              })
        }else{
          setLoader(false);
          toast.success("Server Error", {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            })
    
        }
        }
    ).catch((error) => console.error('Error:', error))
    }else if(valuesLogin.usn==="pslogin12345")
    {
      fetch(apiLink+"auth/auth/pslogin?usn="+valuesLogin.usn+"&password="+valuesLogin.password , {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
          },
        })
        .then(response=>{
          if(response.status === 400){
            response.json()
            setLoader(false);
            setps(true);
            
          }else if(response.status === 200){
            response.json()
            .then(data => {
              console.log(data)
                localStorage.setItem('access-token', data.access)
                localStorage.setItem('person', "ps")
                history("/ps")
                setLoader(false);
                setps(false);
                setadmin(false);
              })
        }else{
          setLoader(false);
          toast.success("Server Error", {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            })
    
        }
        }
    ).catch((error) => console.error('Error:', error))
    }else if(valuesLogin.usn==="alliswell123")
    {
      fetch(apiLink+"admin/login", {
        method: "POST",
        body: "grant_type=&username="+valuesLogin.usn+"&password="+valuesLogin.password+"&scope=&client_id=&client_secret=",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
    })
    .then(response=>{
      if(response.status === 400){
        response.json()
        setLoader(false);
        setadmin(true);
        
      }else if(response.status === 200){
        response.json()
        .then(data => {
          toast.success("Welcome", {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            })
            localStorage.setItem('access-token', data.access_token)
            localStorage.setItem('person', "admin")
            history("/company")
            setLoader(false);
            setadmin(false);
            setps(false);
          })
    }else{
      setLoader(false);
      toast.success("Server Error", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        })

    }
    }
    )
    .catch((error) => console.error('Error:', error))
    }else{
      const data = JSON.stringify(details);
      fetch(apiLink+"auth/login?usn="+details.usn+"&password="+details.password , {
        method: 'POST',
        body: data ,
         headers: {
          'Content-Type': 'application/json'
      },})
      .then(response=>{
        if(response.status === 400){
          response.json()
          toast.warn("Wrong usn or password", {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            })
          setLoader(false);
        }else if(response.status === 200){
          response.json()
          
          .then(data => {
            localStorage.setItem('access-token', data.access)
            localStorage.setItem('usn', details.usn)
            localStorage.setItem('person','student')
            toast.success("Welcome"+details.usn, {
              position: "bottom-left",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              })
              
              setLoader(false);
            }).then(()=>{
            
              history("/student")
  
            })
      }
      else{
        toast.warning("Server Error,try later", {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          })
        setLoader(false);
  
      }}
      )
      .catch((error) => console.error('Error:', error))
    }
    if (ps || admin) {toast.warn("Invalid Password", {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      })}
  }

  const handleForgot =()=>{
    setLoader(true);
    const details = {
      "usn":valuesLogin.usn,
      "email":valuesLogin.email
    }
    fetch(apiLink+"auth/auth/forgot_password?usn="+details.usn+"&email="+details.email , {
        method: 'POST',
         headers: {
          'Content-Type': 'application/json'
      },
    })
    .then(response=>{
      if(response.status === 422){
        response.json()
        toast.warn("Invalid data format", {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          })
        setLoader(false);
      }else if(response.status === 200){
        response.json()
        
        .then(data => {
          toast.success(data.message, {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            })
            localStorage.setItem('access-token', data.access)
            localStorage.setItem('usn', details.usn)
            localStorage.setItem('pass', details.password)
            setLoader(false);
          }).then(()=>{
          })
    }
    else{
      toast.warning("Server Error,try later", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        })
      setLoader(false);

    }}
    )
    .catch((error) => console.error('Error:', error))
  }
  

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      console.log('do validate')
    }
  }
  
  return (<>
    <Box
      component="form"
      noValidate
      autoComplete="off"
    >
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
        <div className="loginstudent__whole">
            <TextField id="standard-basic" label="USN" variant="standard" values={valuesLogin.usn}               
            onChange={handleChange('usn')}
            inputProps={{ maxLength: 14 }}
            sx={{paddingBottom:'0'}}
              />
              {isForgot?(<FormControl sx={{ m: 1, width: '45ch',maxWidth:'100%' ,marginLeft:'0'}} variant="standard">
            <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
            <Input
              id="standard-adornment-password"
              type={valuesLogin.showPassword ? 'text' : 'password'}
              value={valuesLogin.password}
              onChange={handleChange('password')}
              onKeyUp={(event) => {
                    if (event.key=== 'Enter')
                        handleLogin()
                }}
                autoFocus={true}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {valuesLogin.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
            }
          />{loading?<Loader/>:null}

          </FormControl>):(<>
          <TextField id="standard-basic" label="Email" variant="standard" onKeyUp={(event) => {
                    if (event.key=== 'Enter')
                        handleForgot()
                }}
                autoFocus={true}
                values={valuesLogin.email}               
            onChange={handleChange('email')}
            sx={{paddingBottom:'0', m: 1, width: '45ch',maxWidth:'100%' ,marginLeft:'0'}}
              />{loading?<Loader/>:null}</>)
          }
            
            {isForgot?(
            
              <Button onClick={()=>{setForgot(!isForgot)}}>Forgot Password?</Button>
            ):(
              <Button onClick={()=>{setForgot(!isForgot)}} >Login Now</Button>
            )}
            {isForgot?(
              
              <Button variant="contained" onClick={handleLogin}     disabled={(loading)?true:false} size="medium" sx={{width:'50%',margin:'0 auto'}}>
              Sign In
            </Button>
            ):
            (<Button variant="contained" onClick={handleForgot} disabled={(loading)?true:false} size="medium" sx={{width:'50%',margin:'0 auto'}}>
              Send Mail
            </Button>)}
            
        </div>
        
        
      
    </Box></>
  );
}