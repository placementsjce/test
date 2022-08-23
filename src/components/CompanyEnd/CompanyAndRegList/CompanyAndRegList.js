import React, { useState, useEffect } from "react";
import {Container} from "@mui/material";
import Box from "@mui/material/Box";
import {TextField} from "@mui/material";
import {Tabs} from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Tab} from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";
import Slide from "@mui/material/Slide";
import TabContext from "@mui/lab/TabContext";
import "./CompanyAndRegList.css";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import {InputLabel} from "@mui/material";
import {MenuItem} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormLabel from "@mui/material/FormLabel";
import Button from "@mui/material/Button";
//import './Home.css';
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import {Typography} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Fuse from "fuse.js";
import {apiLink} from '../../../mainurl'
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import Stack from "@mui/material/Stack";
import SearchIcon from "@mui/icons-material/Search";

import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import CloseIcon from "@mui/icons-material/Close";

import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import {InputBase} from "@mui/material";

import OnCampus from "../Sidebar/OnCampus";
import CompanyStats from "../Sidebar/CompanyStats";

// import Sidebar from '../Sidebar/Sidebar'

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import EditIcon from "@mui/icons-material/Edit";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


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
  },
}));

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


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


function CompanyAdd() {
  const [value, setValue] = useState("1");
  let [dateRemind,setRemind ] = useState('');
  const handleDateRemind=(e)=>{
    setRemind(e.target.value)
  }
  const [values, setValues] = useState({
    cname: "",
    category: "",
    package: 0,
    internship_stipend: "",
    deadline: "",
    date: "",
    ssc: 0,
    hsc: 0,
    ug: 0,
    pg: 0,
    branch: "",
    backlogs: 0,
    status: 0,
  });

  const [dialogno, setDialogNo] = useState();

  let [totalregis, setTotalRegis] = useState([{}]);
  let [totalregiscount, setTotalRegCount] = useState();
  let [totalplacount, setTotalPlaCount] = useState();

  const[allbranch,setAllBranch]=useState('');
  const[content,setContent]=useState('');
  const[sub1,setSub1]=useState('');
  const[email1,setEmail1]=useState('');
  const[email2,setEmail2]=useState('');
  const [selectedFile1,setStateFileSelect1]=useState();
  const [selectedFile2,setStateFileSelect2]=useState();
  const [selectedFile3,setStateFileSelect3]=useState();

  const  onFileChange1 = event => {
    
    setStateFileSelect1( event.target.files[0] );
  
  };

  const  onFileChange2 = event => {
    
    setStateFileSelect2( event.target.files[0] );
  
  };

  const  onFileChange3 = event => {
    
    setStateFileSelect3( event.target.files[0] );
  
  };
  
  useEffect(() => {
    fetch(apiLink+"admin/status", {
      method: "GET",
      headers: {
        accept: "application/json",
            Authorization: "Bearer "+localStorage.getItem('access-token')
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setTotalRegis(data);
      });
      fetch(apiLink+"admin/status_compny_reg_count", {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: "Bearer "+localStorage.getItem('access-token')
          },
        })
          .then((response) => response.json())
          .then((data) => {
            setTotalRegCount(data);
          });
        fetch(apiLink+"admin/status_compny_count", {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: "Bearer "+localStorage.getItem('access-token')
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setTotalPlaCount(data);
        });
  }, [totalregis.length]);
  const [valuesEdit, setValuesEdit] = useState({
    cname: "",
    category: "",
    package: 0,
    internship_stipend: "",
    deadline: "",
    date: "",
    ssc: 0,
    hsc: 0,
    ug: 0,
    pg: 0,
    branch: [],
    backlogs: 0,
    status: 0,
  });

  const options = {
    includeScore: true,
    // Search in `author` and in `tags` array
    keys: ["cname"],
  };
  
  const options1 = {
    includeScore: true,
    // Search in `author` and in `tags` array
    keys: ["usn","full_name","branch"]
  };
  const [noofPlace, setNoOfPlace] = useState();
  const [placedStudent, setPlacedStudent] = useState([]);
  const [registeredStudent, setRegisteredStudent] = useState([]);
  const [placedStudentStatusCategory, setPlacedStudentStatusCategory] = useState([]);
  const [placedStudentStatusCompanyName, setPlacedStudentStatusCompanyName] = useState([]);
  const [placedCategory, setCategoryPlaced] = useState('');
  const [placedCategory2, setCategoryPlaced2] = useState('');
  const [selectComapnySearch, setSelectComapnySearch] = useState([]);
  const [unplacecid, setUnplaceCid] = useState([]);

  const fuse = new Fuse(totalregis, options);
  const fuse1 = new Fuse(registeredStudent, options1);
  const [searchCompany, setCompany] = useState("");
  const [placestudentusn, setplacestudentusn] = useState([]);


  const [placedstudentcid, setplacedstudentcid] = useState("");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  function handleBacklogs(event) {
    setValues({ ...values, ["backlogs"]: event.target.value });
  }


  const [expanded, setExpanded] = useState(false);

  const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: "1px solid rgba(0, 0, 0, .125)",
  }));

  const handleChange1 = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const [openPlacedStudentDialog, setOpenPlacedStudentDialog] = useState(false);
  const [openRemindStudentDialog, setOpenRemindStudentDialog] = useState(false);

  const handleClickOpenRemindStudentDialog = (cid,i) => {
    setNoOfPlace(i)
    setOpenRemindStudentDialog(true);

  };

  const handleClickOpenPlacedStudentDialog = (cid,i) => {

    setNoOfPlace(i)
    setplacedstudentcid(cid)
    fetch(
      apiLink+"admin/company/registrations/place_students/placed_students_info" +
        cid,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer "+localStorage.getItem('access-token')
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setPlacedStudent(data);
        setOpenPlacedStudentDialog(true);
      })

      fetch(
        apiLink+"admin/company/registrations/place_students/Select_students" +
          cid,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: "Bearer "+localStorage.getItem('access-token')
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setRegisteredStudent(data);
        })
       
          
          fetch(
          apiLink+"admin/company/registrations/place_students/placed_students_info/cname" +
            cid,
          {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization: "Bearer "+localStorage.getItem('access-token')
            },
          }
        )
          .then((response) => response.json())
          .then((data) => {
            setPlacedStudentStatusCompanyName(data);

            fetch(
              apiLink+"admin/company/registrations/place_students/placed_students_info/status" +
                cid,
              {
                method: "GET",
                headers: {
                  Accept: "application/json",
                  Authorization: "Bearer "+localStorage.getItem('access-token')
                },
              }
            )
              .then((response) => response.json())
              .then((data) => {
                setPlacedStudentStatusCategory(data);
                fetch(
                  apiLink+"admin/company/registrations/place_students/placed_students_info/cid_name" +
                    cid,
                  {
                    method: "GET",
                    headers: {
                      accept: "application/json",
                      Authorization: "Bearer "+localStorage.getItem('access-token')
                    },
                  }
                )
                  .then((response) => response.json())
                  .then((data) => {
                    setUnplaceCid(data);
                  })
              })
          })

  };

  let anyBoxesChecked = [];
  for (var i = 0; i < registeredStudent.length; i++) {
    anyBoxesChecked.push(false);
  }

  const [checkplace, setCheck] = useState(Array(registeredStudent.length).fill(false))

  const toggleCheckboxValue = (i,usn) => {
    
    checkplace[i]=!checkplace[i]
    if(checkplace[i]){placestudentusn.push(usn)}
    else {
      placestudentusn=placestudentusn.filter(word => word!==usn);
    }
       

  }
  const handleCloseRemindStudentDialog = () => {
    setOpenRemindStudentDialog(false);
  };

  const handleClosePlacedStudentDialog = () => {
    setOpenPlacedStudentDialog(false);
  };

  const handleChangeTextField = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleChangeDialogTextField = (prop) => (event) => {
    setValuesEdit({ ...valuesEdit, [prop]: event.target.value });
  };

  const [openAddCompanyDialog, setOpenAddCompanyDialog] = useState(false);


  // console.log(valuesEdit.branch);
  // console.log(values.branch)
  const [selectedFile,setStateFileShort]=useState();

const handleShortDetails = (cid) => {
    fetch(
      apiLink+"/stats/download/regcid_list_short/" +
        cid,
      {
        method: "GET",
        headers: {
          'accept': "application/json",
          'Content-Type': 'text/csv',
            // Authorization: "Bearer "+localStorage.getItem('access-token')
        },
      }
    ).then((response) => response.blob())
    .then((blob) => URL.createObjectURL(blob))
    .then((href) => {
      Object.assign(document.createElement('a'), {
        href,
        download: 'registredstudentsshort.xlsx',
      }).click();
    });
  };


  const   handleDetailedDetails = (cid) => {
    fetch(
      apiLink+"stats/download/regcid_list_detailed/" +
        cid,
      {
        method: "GET",
        headers: {
          'accept': "application/json",
            Authorization: "Bearer "+localStorage.getItem('access-token'),
          'Content-Type': 'text/csv'
        },
      }
    ).then((response) => response.blob())
    .then((blob) => URL.createObjectURL(blob))
    .then((href) => {
      Object.assign(document.createElement('a'), {
        href,
        download: 'detailedlist.xlsx',
      }).click();
    });
  };

  const   handleDownloadDetails = (cid) => {
    fetch(
      apiLink+"stats/download/placedbycompany/?cid=" +
        cid,
      {
        method: "GET",
        headers: {
          'accept': "application/json",
          'Content-Type': 'text/csv',
          Authorization: "Bearer "+localStorage.getItem('access-token')
        },
      }
    ).then((response) => response.blob())
    .then((blob) => URL.createObjectURL(blob))
    .then((href) => {
      Object.assign(document.createElement('a'), {
        href,
        download: 'download.xlsx',
      }).click();
    });
  };

  
  const placestudent = (usn) => {
    if(placedCategory===''||placedCategory2==='')
    {
      toast.warn("Category not selected", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }else
    if(placedStudent)
    {
      fetch(
        apiLink+"admin/company/registrations/place_students/" +placedstudentcid + "?student_list=" + usn.toString() +"&category_placed=" + placedCategory,
        {
          method: "POST",
          headers: {
            "accept": "application/json",
            Authorization: "Bearer "+localStorage.getItem('access-token')

          },
        }
      )
        .then((response) => {
          if (response.status === 422) {
            response.json().then((data) => {
              toast.warn("Wrong Data Sent", {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            });
          } else if (response.status === 201) {
            response.json().then((data) => {
              if(!data)
              {
                toast.success("Already Placed", {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
              }else{
                toast.success("Placed Successfully", {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
              }
              
            });
          } else if (response.status === 500) {
            toast.warn("Server Error", {
              position: "bottom-left",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        }).then((data)=>{
          fetch(
            apiLink+"admin/company/registrations/place_students/placed_students_info" +
            placedstudentcid,
            {
              method: "GET",
              headers: {
                Accept: "application/json",
                Authorization: "Bearer "+localStorage.getItem('access-token')
              },
            }
          )
            .then((response) => response.json())
            .then((data) => {
              setPlacedStudent(data);
              fetch(
                apiLink+"admin/company/registrations/place_students/placed_students_info/cname" +
                placedstudentcid,
                {
                  method: "GET",
                  headers: {
                    Accept: "application/json",
                    Authorization: "Bearer "+localStorage.getItem('access-token')
                  },
                }
              )
                .then((response) => response.json())
                .then((data) => {
                  setPlacedStudentStatusCompanyName(data);
      
                  fetch(
                    apiLink+"admin/company/registrations/place_students/placed_students_info/status" +
                    placedstudentcid,
                    {
                      method: "GET",
                      headers: {
                        Accept: "application/json",
                        Authorization: "Bearer "+localStorage.getItem('access-token')
                      },
                    }
                  )
                    .then((response) => response.json())
                    .then((data) => {
                      setPlacedStudentStatusCategory(data);
                      fetch(
                        apiLink+"admin/company/registrations/place_students/placed_students_info/cid_name" +
                        placedstudentcid,
                        {
                          method: "GET",
                          headers: {
                            Accept: "application/json",
                            Authorization: "Bearer "+localStorage.getItem('access-token')
                          },
                        }
                      )
                        .then((response) => response.json())
                        .then((data) => {
                          setUnplaceCid(data);
                        })
                    })
                })
            })
        })
    }else{
      fetch(
        apiLink+"admin/company/registrations/place_students/" +placedstudentcid + "?student_list=" + usn.toString() +"&category_placed=" + placedCategory2,
        {
          method: "POST",
          headers: {
            "accept": "application/json",
            Authorization: "Bearer "+localStorage.getItem('access-token')
          },
        }
      )
        .then((response) => {
          if (response.status === 422) {
            response.json().then((data) => {
              toast.warn("Wrong Data Sent", {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            });
          } else if (response.status === 201) {
            response.json().then((data) => {
              if(!data)
              {
                toast.success("Already Placed", {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
              }else{
                toast.success("Placed Successfully", {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
              }
              
            });
          } else if (response.status === 500) {
            toast.warn("Server Error", {
              position: "bottom-left",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        }).then((data)=>{
          fetch(
            apiLink+"admin/company/registrations/place_students/placed_students_info" +
            placedstudentcid,
            {
              method: "GET",
              headers: {
                Accept: "application/json",
                Authorization: "Bearer "+localStorage.getItem('access-token')
              },
            }
          )
            .then((response) => response.json())
            .then((data) => {
              setPlacedStudent(data);
              fetch(
                apiLink+"admin/company/registrations/place_students/placed_students_info/cname" +
                placedstudentcid,
                {
                  method: "GET",
                  headers: {
                    Accept: "application/json",
                    Authorization: "Bearer "+localStorage.getItem('access-token')
                  },
                }
              )
                .then((response) => response.json())
                .then((data) => {
                  setPlacedStudentStatusCompanyName(data);
      
                  fetch(
                    apiLink+"admin/company/registrations/place_students/placed_students_info/status" +
                    placedstudentcid,
                    {
                      method: "GET",
                      headers: {
                        Accept: "application/json",
                        Authorization: "Bearer "+localStorage.getItem('access-token')
                      },
                    }
                  )
                    .then((response) => response.json())
                    .then((data) => {
                      setPlacedStudentStatusCategory(data);
                      fetch(
                        apiLink+"admin/company/registrations/place_students/placed_students_info/cid_name" +
                        placedstudentcid,
                        {
                          method: "GET",
                          headers: {
                            Accept: "application/json",
                            Authorization: "Bearer "+localStorage.getItem('access-token')
                          },
                        }
                      )
                        .then((response) => response.json())
                        .then((data) => {
                          setUnplaceCid(data);
                        })
                    })
                })
            })
        })
    }
   
  };
 
  const remind=(cid)=>{
        const data= [
      {
          "datesir": dateRemind+":00.000Z",
              "cid": cid
       }
     ]
    const final=JSON.stringify(data)
    fetch(
      apiLink+"stats/home/send_reminder/" +cid,
      {
        method: "POST",
        body:final,
        headers: {
          "accept": "application/json",
          "Content-Type": "application/json"
        },
      }
    )
      .then((response) => {
        if (response.status === 422) {
          response.json().then((data) => {
            toast.warn("Format error", {
              position: "bottom-left",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          });
        } else if (response.status === 200) {
          response.json().then((data) => {
              toast.success("Reminder sent!!", {
              position: "bottom-left",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              })            
          });
        } else if (response.status === 500) {
          toast.warn("Server Error", {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      })
  }
  const unplacestudent = (usn,cid) => {
    fetch(
      apiLink+"admin/company/registrations/unplace" + usn+"/"+cid,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer "+localStorage.getItem('access-token')
        },
      }
    )
    .then((response) => {
      if (response.status === 422) {
        response.json().then((data) => {
          toast.warn("Wrong Data Sent", {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
      } else if (response.status === 201) {
        response.json().then((data) => {
          toast.success("UnPlaced Successfully", {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
      } else if (response.status === 500) {
        toast.warn("Server Error", {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }).then((data)=>{
      fetch(
        apiLink+"admin/company/registrations/place_students/placed_students_info" +
        placedstudentcid,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: "Bearer "+localStorage.getItem('access-token')
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setPlacedStudent(data);
          fetch(
            apiLink+"admin/company/registrations/place_students/placed_students_info/cname" +
            placedstudentcid,
            {
              method: "GET",
              headers: {
                Accept: "application/json",
                Authorization: "Bearer "+localStorage.getItem('access-token')
              },
            }
          )
            .then((response) => response.json())
            .then((data) => {
              setPlacedStudentStatusCompanyName(data);
  
              fetch(
                apiLink+"admin/company/registrations/place_students/placed_students_info/status" +
                placedstudentcid,
                {
                  method: "GET",
                  headers: {
                    Accept: "application/json",
                    Authorization: "Bearer "+localStorage.getItem('access-token')
                  },
                }
              )
                .then((response) => response.json())
                .then((data) => {
                  setPlacedStudentStatusCategory(data);
                  fetch(
                    apiLink+"admin/company/registrations/place_students/placed_students_info/cid_name" +
                    placedstudentcid,
                    {
                      method: "GET",
                      headers: {
                        Accept: "application/json",
                        Authorization: "Bearer "+localStorage.getItem('access-token')
                      },
                    }
                  )
                    .then((response) => response.json())
                    .then((data) => {
                      setUnplaceCid(data);
                    })
                })
            })
        })
    })
  }
  const unregisterstudent = (usn,cid) => {
    fetch(
      apiLink+"admin/company/registrations/unregister" + usn+"/"+cid,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer "+localStorage.getItem('access-token')
        },
      }
    )
    .then((response) => {
      if (response.status === 422) {
        response.json().then((data) => {
          toast.warn("Wrong Data Sent", {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
      } else if (response.status === 201) {
        response.json().then((data) => {
          toast.success("Unregister Student Successfully", {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
      } else if (response.status === 500) {
        toast.warn("Server Error", {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }).then((data)=>{
      fetch(
        apiLink+"admin/company/registrations/place_students/placed_students_info" +
        placedstudentcid,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: "Bearer "+localStorage.getItem('access-token')
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setPlacedStudent(data);
          fetch(
            apiLink+"admin/company/registrations/place_students/placed_students_info/cname" +
            placedstudentcid,
            {
              method: "GET",
              headers: {
                Accept: "application/json",
                Authorization: "Bearer "+localStorage.getItem('access-token')
              },
            }
          )
            .then((response) => response.json())
            .then((data) => {
              setPlacedStudentStatusCompanyName(data);
  
              fetch(
                apiLink+"admin/company/registrations/place_students/placed_students_info/status" +
                placedstudentcid,
                {
                  method: "GET",
                  headers: {
                    Accept: "application/json",
                    Authorization: "Bearer "+localStorage.getItem('access-token')
                  },
                }
              )
                .then((response) => response.json())
                .then((data) => {
                  setPlacedStudentStatusCategory(data);
                  fetch(
                    apiLink+"admin/company/registrations/place_students/placed_students_info/cid_name" +
                    placedstudentcid,
                    {
                      method: "GET",
                      headers: {
                        Accept: "application/json",
                        Authorization: "Bearer "+localStorage.getItem('access-token')
                      },
                    }
                  )
                    .then((response) => response.json())
                    .then((data) => {
                      setUnplaceCid(data);
                      fetch(
                        apiLink+"admin/company/registrations/place_students/Select_students" +
                          cid,
                        {
                          method: "GET",
                          headers: {
                            Accept: "application/json",
                            Authorization: "Bearer "+localStorage.getItem('access-token')
                          },
                        }
                      )
                        .then((response) => response.json())
                        .then((data) => {
                          setRegisteredStudent(data);
                        })
                    })
                })
            })
        })
    })
  }
  const handleCloseAddCompanyDialog = () => {
    setOpenAddCompanyDialog(false);
    setCheckCS(false)
    setCheckCSBS(false)
    setCheckIS(false)
    setCheckECE(false)
    setCheckEI(false)
    setCheckEEE(false)
    setCheckME(false)
    setCheckIP(false)
    setCheckCV(false)
    setCheckCTM(false)
    setCheckPS(false)
    setCheckBT(false)
    setCheckEV(false)
    setCheckBCA(false)
    setCheckMSC(false)
    setCheckMCA(false)
    setCheckCE(false)
    setCheckSE(false)
    setCheckDS(false)
    setCheckBSP(false)
    setCheckNIE(false)
    setCheckIE(false)
    setCheckPSG(false)
    setCheckESM(false)
    setCheckMEP(false)
    setCheckAE(false)
    setCheckISP(false)
    setCheckIEM(false)
    setCheckEP(false)
    setCheckHSWT(false)
    setCheckMS(false)
    setCheckMBAF(false)
    setCheckMBAHR(false)
    setCheckMBAM(false)
    setCheckCF(false)
    setCheckDM(false)
    setCheckRM(false)
    values.branch=""
  };

  // CS
  const [checkCS, setCheckCS] = useState(false);

  function toggleCS() {
    if (!checkCS) {
      if (values.branch.length === 0) values.branch += "CSE";
      else values.branch += ",CSE";
    } else {
      values.branch = values.branch.replace(",CSE,", ",");
      values.branch = values.branch.replace("CSE,", "");
      values.branch = values.branch.replace(",CSE", "");
      values.branch = values.branch.replace("CSE", "");
    }
    setCheckCS(!checkCS);
  }

  // CSBS
  const [checkCSBS, setCheckCSBS] = useState(false);

  function toggleCSBS() {
    if (!checkCSBS) {
      if (values.branch.length === 0) values.branch += "CSBS";
      else values.branch += ",CSBS";
    } else {
      values.branch = values.branch.replace(",CSBS,", ",");
      values.branch = values.branch.replace("CSBS,", "");
      values.branch = values.branch.replace(",CSBS", "");
      values.branch = values.branch.replace("CSBS", "");
    }
    setCheckCSBS(!checkCSBS);
  } 
  // IS
  const [checkIS, setCheckIS] = useState(false);

  function toggleIS() {
    if (!checkIS) {
      if (values.branch.length === 0) values.branch += "ISE";
      else values.branch += ",ISE";
    } else {
      values.branch = values.branch.replace(",ISE,", ",");
      values.branch = values.branch.replace("ISE,", "");
      values.branch = values.branch.replace(",ISE", "");
      values.branch = values.branch.replace("ISE", "");
    }
    setCheckIS(!checkIS);
  }
  // ECE
  const [checkECE, setCheckECE] = useState(false);

  function toggleECE() {
    if (!checkECE) {
      if (values.branch.length === 0) values.branch += "ECE";
      else values.branch += ",ECE";
    } else {
      values.branch = values.branch.replace(",ECE,", ",");
      values.branch = values.branch.replace("ECE,", "");
      values.branch = values.branch.replace(",ECE", "");
      values.branch = values.branch.replace("ECE", "");
    }
    setCheckECE(!checkECE);
  }
  // EEE
  const [checkEEE, setCheckEEE] = useState(false);

  function toggleEEE() {
    if (!checkEEE) {
      if (values.branch.length === 0) values.branch += "EEE";
      else values.branch += ",EEE";
    } else {
      values.branch = values.branch.replace(",EEE,", ",");
      values.branch = values.branch.replace("EEE,", "");
      values.branch = values.branch.replace(",EEE", "");
      values.branch = values.branch.replace("EEE", "");
    }
    setCheckEEE(!checkEEE);
  }
  // EI
  const [checkEI, setCheckEI] = useState(false);

  function toggleEI() {
    if (!checkEI) {
      if (values.branch.length === 0) values.branch += "EI";
      else values.branch += ",EI";
    } else {
      values.branch = values.branch.replace(",EI,", ",");
      values.branch = values.branch.replace("EI,", "");
      values.branch = values.branch.replace(",EI", "");
      values.branch = values.branch.replace("EI", "");
    }
    setCheckEI(!checkEI);
  }
  // ME
  const [checkME, setCheckME] = useState(false);

  function toggleME() {
    if (!checkME) {
      if (values.branch.length === 0) values.branch += "MECH";
      else values.branch += ",MECH";
    } else {
      values.branch = values.branch.replace(",MECH,", ",");
      values.branch = values.branch.replace("MECH,", "");
      values.branch = values.branch.replace(",MECH", "");
      values.branch = values.branch.replace("MECH", "");
    }
    setCheckME(!checkME);
  }
  // IP
  const [checkIP, setCheckIP] = useState(false);

  function toggleIP() {
    if (!checkIP) {
      if (values.branch.length === 0) values.branch += "IP";
      else values.branch += ",IP";
    } else {
      values.branch = values.branch.replace(",IP,", ",");
      values.branch = values.branch.replace("IP,", "");
      values.branch = values.branch.replace(",IP", "");
      values.branch = values.branch.replace("IP", "");
    }
    setCheckIP(!checkIP);
  }
  // CV
  const [checkCV, setCheckCV] = useState(false);

  function toggleCV() {
    if (!checkCV) {
      if (values.branch.length === 0) values.branch += "CV";
      else values.branch += ",CV";
    } else {
      values.branch = values.branch.replace(",CV,", ",");
      values.branch = values.branch.replace("CV,", "");
      values.branch = values.branch.replace(",CV", "");
      values.branch = values.branch.replace("CV", "");
    }
    setCheckCV(!checkCV);
  }
  // CTM
  const [checkCTM, setCheckCTM] = useState(false);

  function toggleCTM() {
    if (!checkCTM) {
      if (values.branch.length === 0) values.branch += "CTM";
      else values.branch += ",CTM";
    } else {
      values.branch = values.branch.replace(",CTM,", ",");
      values.branch = values.branch.replace("CTM,", "");
      values.branch = values.branch.replace(",CTM", "");
      values.branch = values.branch.replace("CTM", "");
    }
    setCheckCTM(!checkCTM);
  }
  // PS
  const [checkPS, setCheckPS] = useState(false);

  function togglePS() {
    if (!checkPS) {
      if (values.branch.length === 0) values.branch += "PST";
      else values.branch += ",PST";
    } else {
      values.branch = values.branch.replace(",PST,", ",");
      values.branch = values.branch.replace("PST,", "");
      values.branch = values.branch.replace(",PST", "");
      values.branch = values.branch.replace("PST", "");
    }
    setCheckPS(!checkPS);
  }
  //pSG
  const [checkPSG, setCheckPSG] = useState(false);

  function togglePSG() {
    if (!checkPSG) {
      if (values.branch.length === 0) values.branch += "Polymer_Science";
      else values.branch += ",Polymer_Science";
    } else {
      values.branch = values.branch.replace(",Polymer_Science,", ",");
      values.branch = values.branch.replace("Polymer_Science,", "");
      values.branch = values.branch.replace(",Polymer_Science", "");
      values.branch = values.branch.replace("Polymer_Science", "");
    }
    setCheckPSG(!checkPSG);
  }
  // BT
  const [checkBT, setCheckBT] = useState(false);

  function toggleBT() {
    if (!checkBT) {
      if (values.branch.length === 0) values.branch += "BT";
      else values.branch += ",BT";
    } else {
      values.branch = values.branch.replace(",BT,", ",");
      values.branch = values.branch.replace("BT,", "");
      values.branch = values.branch.replace(",BT", "");
      values.branch = values.branch.replace("BT", "");
    }
    setCheckBT(!checkBT);
  }
  // EV
  const [checkEV, setCheckEV] = useState(false);

  function toggleEV() {
    if (!checkEV) {
      if (values.branch.length === 0) values.branch += "ENV";
      else values.branch += ",ENV";
    } else {
      values.branch = values.branch.replace(",ENV,", ",");
      values.branch = values.branch.replace("ENV,", "");
      values.branch = values.branch.replace(",ENV", "");
      values.branch = values.branch.replace("ENV", "");
    }
    setCheckEV(!checkEV);
  }
  // MSC
  const [checkMSC, setCheckMSC] = useState(false);

  function toggleMSC() {
    if (!checkMSC) {
      if (values.branch.length === 0) values.branch += "MSC";
      else values.branch += ",MSC";
    } else {
      values.branch = values.branch.replace(",MSC,", ",");
      values.branch = values.branch.replace("MSC,", "");
      values.branch = values.branch.replace(",MSC", "");
      values.branch = values.branch.replace("MSC", "");
    }
    setCheckMSC(!checkMSC);
  }
  
  // MCA
  const [checkMCA, setCheckMCA] = useState(false);

  function toggleMCA() {
    if (!checkMCA) {
      if (values.branch.length === 0) values.branch += "MCA";
      else values.branch += ",MCA";
    } else {
      values.branch = values.branch.replace(",MCA,", ",");
      values.branch = values.branch.replace("MCA,", "");
      values.branch = values.branch.replace(",MCA", "");
      values.branch = values.branch.replace("MCA", "");
    }
    setCheckMCA(!checkMCA);
  }
  // CE
  const [checkCE, setCheckCE] = useState(false);

  function toggleCE() {
    if (!checkCE) {
      if (values.branch.length === 0) values.branch += "Computer_Engineering";
      else values.branch += ",Computer_Engineering";
    } else {
      values.branch = values.branch.replace(",Computer_Engineering,", ",");
      values.branch = values.branch.replace("Computer_Engineering,", "");
      values.branch = values.branch.replace(",Computer_Engineering", "");
      values.branch = values.branch.replace("Computer_Engineering", "");
    }
    setCheckCE(!checkCE);
  }
  // SE
  const [checkSE, setCheckSE] = useState(false);

  function toggleSE() {
    if (!checkSE) {
      if (values.branch.length === 0) values.branch += "Software_Engineering";
      else values.branch += ",Software_Engineering";
    } else {
      values.branch = values.branch.replace(",Software_Engineering,", ",");
      values.branch = values.branch.replace("Software_Engineering,", "");
      values.branch = values.branch.replace(",Software_Engineering", "");
      values.branch = values.branch.replace("Software_Engineering", "");
    }
    setCheckSE(!checkSE);
  }
  // MBAF
  const [checkMBAF, setCheckMBAF] = useState(false);

  function toggleMBAF() {
    if (!checkMBAF) {
      if (values.branch.length === 0) values.branch += "MBA_Finance";
      else values.branch += ",MBA_Finance";
    } else {
      values.branch = values.branch.replace(",MBA_Finance,", ",");
      values.branch = values.branch.replace("MBA_Finance,", "");
      values.branch = values.branch.replace(",MBA_Finance", "");
      values.branch = values.branch.replace("MBA_Finance", "");
    }
    setCheckMBAF(!checkMBAF);
  }
  // MBAM
  const [checkMBAM, setCheckMBAM] = useState(false);

  function toggleMBAM() {
    if (!checkMBAM) {
      if (values.branch.length === 0) values.branch += "MBA_Marketing";
      else values.branch += ",MBA_Marketing";
    } else {
      values.branch = values.branch.replace(",MBA_Marketing,", ",");
      values.branch = values.branch.replace("MBA_Marketing,", "");
      values.branch = values.branch.replace(",MBA_Marketing", "");
      values.branch = values.branch.replace("MBA_Marketing", "");
    }
    setCheckMBAM(!checkMBAM);
  }
  // MBHR
  const [checkMBAHR, setCheckMBAHR] = useState(false);

  function toggleMBAHR() {
    if (!checkMBAHR) {
      if (values.branch.length === 0) values.branch += "MBA_HR";
      else values.branch += ",MBA_HR";
    } else {
      values.branch = values.branch.replace(",MBA_HR,", ",");
      values.branch = values.branch.replace("MBA_HR,", "");
      values.branch = values.branch.replace(",MBA_HR", "");
      values.branch = values.branch.replace("MBA_HR", "");
    }
    setCheckMBAHR(!checkMBAHR);
  }
  // DS
  const [checkDS, setCheckDS] = useState(false);

  function toggleDS() {
    if (!checkDS) {
      if (values.branch.length === 0) values.branch += "Data_Science";
      else values.branch += ",Data_Science";
    } else {
      values.branch = values.branch.replace(",Data_Science,", ",");
      values.branch = values.branch.replace("Data_Science,", "");
      values.branch = values.branch.replace(",Data_Science", "");
      values.branch = values.branch.replace("Data_Science", "");
    }
    setCheckDS(!checkDS);
  }
  // CF
  const [checkCF, setCheckCF] = useState(false);

  function toggleCF() {
    if (!checkCF) {
      if (values.branch.length === 0) values.branch += "Corporate_Finance";
      else values.branch += ",Corporate_Finance";
    } else {
      values.branch = values.branch.replace(",Corporate_Finance,", ",");
      values.branch = values.branch.replace("Corporate_Finance,", "");
      values.branch = values.branch.replace(",Corporate_Finance", "");
      values.branch = values.branch.replace("Corporate_Finance", "");
    }
    setCheckCF(!checkCF);
  }
  // RM
  const [checkRM, setCheckRM] = useState(false);

  function toggleRM() {
    if (!checkRM) {
      if (values.branch.length === 0) values.branch += "Retail_Marketing";
      else values.branch += ",Retail_Marketing";
    } else {
      values.branch = values.branch.replace(",Retail_Marketing,", ",");
      values.branch = values.branch.replace("Retail_Marketing,", "");
      values.branch = values.branch.replace(",Retail_Marketing", "");
      values.branch = values.branch.replace("Retail_Marketing", "");
    }
    setCheckRM(!checkRM);
  }
  // DM
  const [checkDM, setCheckDM] = useState(false);

  function toggleDM() {
    if (!checkDM) {
      if (values.branch.length === 0) values.branch += "Digital_Marketing";
      else values.branch += ",Digital_Marketing";
    } else {
      values.branch = values.branch.replace(",Digital_Marketing,", ",");
      values.branch = values.branch.replace("Digital_Marketing,", "");
      values.branch = values.branch.replace(",Digital_Marketing", "");
      values.branch = values.branch.replace("Digital_Marketing", "");
    }
    setCheckDM(!checkDM);
  }
  // BSP
  const [checkBSP, setCheckBSP] = useState(false);

  function toggleBSP() {
    if (!checkBSP) {
      if (values.branch.length === 0) values.branch += "Biomedical_Signal_Processing";
      else values.branch += ",Biomedical_Signal_Processing";
    } else {
      values.branch = values.branch.replace(",Biomedical_Signal_Processing,", ",");
      values.branch = values.branch.replace("Biomedical_Signal_Processing,", "");
      values.branch = values.branch.replace(",Biomedical_Signal_Processing", "");
      values.branch = values.branch.replace("Biomedical_Signal_Processing", "");
    }
    setCheckBSP(!checkBSP);
  }
  // IE
  const [checkIE, setCheckIE] = useState(false);

  function toggleIE() {
    if (!checkIE) {
      if (values.branch.length === 0) values.branch += "Industrial_Electronics";
      else values.branch += ",Industrial_Electronics";
    } else {
      values.branch = values.branch.replace(",Industrial_Electronics,", ",");
      values.branch = values.branch.replace("Industrial_Electronics,", "");
      values.branch = values.branch.replace(",Industrial_Electronics", "");
      values.branch = values.branch.replace("Industrial_Electronics", "");
    }
    setCheckIE(!checkIE);
  }
  // NIE
  const [checkNIE, setCheckNIE] = useState(false);

  function toggleNIE() {
    if (!checkNIE) {
      if (values.branch.length === 0) values.branch += "Networking_Internet_Engineering";
      else values.branch += ",Networking_Internet_Engineering";
    } else {
      values.branch = values.branch.replace(",Networking_Internet_Engineering,", ",");
      values.branch = values.branch.replace("Networking_Internet_Engineering,", "");
      values.branch = values.branch.replace(",Networking_Internet_Engineering", "");
      values.branch = values.branch.replace("Networking_Internet_Engineering", "");
    }
    setCheckNIE(!checkNIE);
  }
  // PSP
  const [checkBCA, setCheckBCA] = useState(false);

  function toggleBCA() {
    if (!checkBCA) {
      if (values.branch.length === 0) values.branch += "BCA";
      else values.branch += ",BCA";
    } else {
      values.branch = values.branch.replace(",BCA,", ",");
      values.branch = values.branch.replace("BCA,", "");
      values.branch = values.branch.replace(",BCA", "");
      values.branch = values.branch.replace("BCA", "");
    }
    setCheckBCA(!checkBCA);
  }
  // MEP
  const [checkMEP, setCheckMEP] = useState(false);

  function toggleMEP() {
    if (!checkMEP) {
      if (values.branch.length === 0) values.branch += "Mechanical_Engineering_PG";
      else values.branch += ",Mechanical_Engineering_PG";
    } else {
      values.branch = values.branch.replace(",Mechanical_Engineering_PG,", ",");
      values.branch = values.branch.replace("Mechanical_Engineering_PG,", "");
      values.branch = values.branch.replace(",Mechanical_Engineering_PG", "");
      values.branch = values.branch.replace("Mechanical_Engineering_PG", "");
    }
    setCheckMEP(!checkMEP);
  }
  // ESM
  const [checkESM, setCheckESM] = useState(false);

  function toggleESM() {
    if (!checkESM) {
      if (values.branch.length === 0) values.branch += "Energy_Systems_Management";
      else values.branch += ",Energy_Systems_Management";
    } else {
      values.branch = values.branch.replace(",Energy_Systems_Management,", ",");
      values.branch = values.branch.replace("Energy_Systems_Management,", "");
      values.branch = values.branch.replace(",Energy_Systems_Management", "");
      values.branch = values.branch.replace("Energy_Systems_Management", "");
    }
    setCheckESM(!checkESM);
  }
  

  // IEM
  const [checkIEM, setCheckIEM] = useState(false);

  function toggleIEM() {
    if (!checkIEM) {
      if (values.branch.length === 0) values.branch += "Infrastructure_Engineering_Management";
      else values.branch += ",Infrastructure_Engineering_Management";
    } else {
      values.branch = values.branch.replace(",Infrastructure_Engineering_Management,", ",");
      values.branch = values.branch.replace("Infrastructure_Engineering_Management,", "");
      values.branch = values.branch.replace(",Infrastructure_Engineering_Management", "");
      values.branch = values.branch.replace("Infrastructure_Engineering_Management", "");
    }
    setCheckIEM(!checkIEM);
  }
  // AE
  const [checkAE, setCheckAE] = useState(false);

  function toggleAE() {
    if (!checkAE) {
      if (values.branch.length === 0) values.branch += "Automotive_Electronics";
      else values.branch += ",Automotive_Electronics";
    } else {
      values.branch = values.branch.replace(",Automotive_Electronics,", ",");
      values.branch = values.branch.replace("Automotive_Electronics,", "");
      values.branch = values.branch.replace(",Automotive_Electronics", "");
      values.branch = values.branch.replace("Automotive_Electronics", "");
    }
    setCheckAE(!checkAE);
  }
  // ISP
  const [checkISP, setCheckISP] = useState(false);

  function toggleISP() {
    if (!checkISP) {
      if (values.branch.length === 0) values.branch += "Industrial_Structures";
      else values.branch += ",Industrial_Structures";
    } else {
      values.branch = values.branch.replace(",Industrial_Structures,", ",");
      values.branch = values.branch.replace("Industrial_Structures,", "");
      values.branch = values.branch.replace(",Industrial_Structures", "");
      values.branch = values.branch.replace("Industrial_Structures", "");
    }
    setCheckISP(!checkISP);
  }

  // HSWT
  const [checkHSWT, setCheckHSWT] = useState(false);

  function toggleHSWT() {
    if (!checkHSWT) {
      if (values.branch.length === 0) values.branch += "Health_Science_Water_Treatment";
      else values.branch += ",Health_Science_Water_Treatment";
    } else {
      values.branch = values.branch.replace(",Health_Science_Water_Treatment,", ",");
      values.branch = values.branch.replace("Health_Science_Water_Treatment,", "");
      values.branch = values.branch.replace(",Health_Science_Water_Treatment", "");
      values.branch = values.branch.replace("Health_Science_Water_Treatment", "");
    }
    setCheckHSWT(!checkHSWT);
  }
  // EP
  const [checkEP, setCheckEP] = useState(false);

  function toggleEP() {
    if (!checkEP) {
      if (values.branch.length === 0) values.branch += "Environmental_PG";
      else values.branch += ",Environmental_PG";
    } else {
      values.branch = values.branch.replace(",Environmental_PG,", ",");
      values.branch = values.branch.replace("Environmental_PG,", "");
      values.branch = values.branch.replace(",Environmental_PG", "");
      values.branch = values.branch.replace("Environmental_PG", "");
    }
    setCheckEP(!checkEP);
  }
  // MS
  const [checkMS, setCheckMS] = useState(false);

  function toggleMS() {
    if (!checkMS) {
      if (values.branch.length === 0) values.branch += "Material_Science";
      else values.branch += ",Material_Science";
    } else {
      values.branch = values.branch.replace(",Material_Science,", ",");
      values.branch = values.branch.replace("Material_Science,", "");
      values.branch = values.branch.replace(",Material_Science", "");
      values.branch = values.branch.replace("Material_Science", "");
    }
    setCheckMS(!checkMS);
  }

  const [checkSelectall, setSelectall] = useState(false);

  function Selectall() {
    if (!checkSelectall) {
      values.branch='';
      values.branch+='CSE,CSBS,IS,EC,EE,EI,ME,IP,CV,CTM,PST,BT,EV,MSC,BSC,MBA,MCA,CE,SE,MBAF,MBAM,MBAHR,DS,CF,RM,DM,BSP,IE,NIE,PSP,MEP,ESM,IEM,AE,ISP,HSWT,EP,MS';

    } else {
      values.branch = '';

    }
    setSelectall(!checkSelectall);
  }
  const handleChangeCategory = (event) => {
    values.category = event.target.value;
  };

  const handleChangeGender = (event) => {
    values.gender = event.target.value;
  };
  values.branch = values.branch.toString();

  const handleUpdateCompany = () => {
    valuesEdit.branch =values.branch;
    if(valuesEdit.cname===''||valuesEdit.category===''||valuesEdit.package===''||valuesEdit.internship_stipend===''||valuesEdit.deadline===''||valuesEdit.date===''||valuesEdit.ssc===''||valuesEdit.hsc===''||valuesEdit.ug===''||valuesEdit.pg===''||valuesEdit.branch===''||valuesEdit.backlogs===''||valuesEdit.status==='')
    {
       toast.warn("Field Required!!", {
         position: "bottom-left",
         autoClose: 5000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined,
       });
    }else{
    valuesEdit.ug = parseInt(valuesEdit.ug);
    valuesEdit.pg = parseInt(valuesEdit.pg);
    valuesEdit.ssc = parseInt(valuesEdit.ssc);
    valuesEdit.hsc = parseInt(valuesEdit.hsc);
    valuesEdit.package = parseFloat(valuesEdit.package);
    valuesEdit.backlogs = parseInt(valuesEdit.backlogs);
    valuesEdit.status = parseInt(valuesEdit.status);
    valuesEdit.branch = values.branch;
    const data = JSON.stringify(valuesEdit);
    fetch(
      apiLink+"admin/company/edit_company/" +
        dialogno,
      {
        method: "PUT",
        body: data,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer "+localStorage.getItem('access-token')
        },
      }
    )
      .then((response) => {
        if (response.status === 400) {
          response.json().then((data) => {
            toast.warn("Error Updating Company", {
              position: "bottom-left",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          });
        } else if (response.status === 201) {
          const formdata = new FormData();

          formdata.append("file", selectedFile1===undefined?"":selectedFile1)
          formdata.append("", "\\")
          formdata.append("file1", selectedFile2===undefined?"":selectedFile2)
          formdata.append("", "\\")
          formdata.append("file2", selectedFile3===undefined?"":selectedFile3)
          formdata.append("", "\\")
          formdata.append("subject", sub1===undefined?"":sub1)
          formdata.append("", "\\")
          formdata.append("body", content)
          formdata.append("", "\\")
          formdata.append("email",email1)
          formdata.append("", "\\")
          formdata.append("email2",email2===undefined?"":email2)
          fetch(apiLink+"admin/update_send_file", {
            method: 'POST',
            body:formdata,
            headers: {
              'accept': 'application/json',
              Authorization: "Bearer "+localStorage.getItem('access-token')
              }
          }).then(response => response.json())
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
            })
            fetch(apiLink+"admin/status_compny_reg_count", {
              method: "GET",
              headers: {
                Accept: "application/json",
                Authorization: "Bearer "+localStorage.getItem('access-token')
              },
            })
              .then((response) => response.json())
              .then((data) => {
                setTotalRegCount(data);
              });
            fetch(apiLink+"admin/status_compny_count", {
            method: "GET",
            headers: {
              Accept: "application/json",
              Authorization: "Bearer "+localStorage.getItem('access-token')
            },
          })
            .then((response) => response.json())
            .then((data) => {
              setTotalPlaCount(data);
            });
          setValues({
            cname: "",
            category: "",
            package: 0,
            internship_stipend: "",
            deadline: "",
            date: "",
            ssc: 0,
            hsc: 0,
            ug: 0,
            pg: 0,
            branch: "",
            backlogs: 0,
            status: 0,
          });
          response.json().then((data) => {
            toast.success("Company Updated", {
              position: "bottom-left",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          });
          setOpenAddCompanyDialog(false);
          fetch(apiLink+"admin/status", {
            method: "GET",
            headers: {
              accept: "application/json",
                  Authorization: "Bearer "+localStorage.getItem('access-token')
            },
          })
            .then((response) => response.json())
            .then((data) => {
              setTotalRegis(data);
            });
            fetch(apiLink+"admin/status_compny_reg_count", {
                method: "GET",
                headers: {
                  Accept: "application/json",
                  Authorization: "Bearer "+localStorage.getItem('access-token')
                },
              })
                .then((response) => response.json())
                .then((data) => {
                  setTotalRegCount(data);
                });
              fetch(apiLink+"admin/status_compny_count", {
              method: "GET",
              headers: {
                accept: "application/json",
                Authorization: "Bearer "+localStorage.getItem('access-token')
              },
            })
              .then((response) => response.json())
              .then((data) => {
                setTotalPlaCount(data);
              });
        } else if (response.status === 500) {
          toast.warn("Server Error", {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
        
      })
      .catch((error) => console.error("Error:", error));
    }
  };

  const handleAddCompany = (event) => {
   if(values.cname===''||values.category===''||values.package===''||values.internship_stipend===''||values.deadline===''||values.date===''||values.ssc===''||values.hsc===''||values.ug===''||values.pg===''||values.branch===''||values.backlogs===''||values.status==='')
   {
      toast.warn("Field Required!!", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
   }else{
    values.ug = parseInt(values.ug);
    values.pg = parseInt(values.pg);
    values.ssc = parseInt(values.ssc);
    values.hsc = parseInt(values.hsc);
    values.package = parseFloat(values.package);
    values.backlogs = parseInt(values.backlogs);
    values.status = parseInt(values.status);
    const data = JSON.stringify(values);
    fetch(
      apiLink+"admin/company/add_company",
      {
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer "+localStorage.getItem('access-token')
        },
      }
    )
      .then((response) => {
        if (response.status === 400) {
          response.json().then((data) => {
            toast.warn("Error Adding Company", {
              position: "bottom-left",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          });
        } else if (response.status === 201) {
          setValues({
            cname: "",
            category: "",
            package: 0,
            internship_stipend: "",
            deadline: "",
            date: "",
            ssc: 0,
            hsc: 0,
            ug: 0,
            pg: 0,
            branch: "",
            backlogs: 0,
            status: 0,
          });
              const formdata = new FormData();

              formdata.append("file", selectedFile1===undefined?"":selectedFile1)
              formdata.append("", "\\")
              formdata.append("file1", selectedFile2===undefined?"":selectedFile2)
              formdata.append("", "\\")
              formdata.append("file2", selectedFile3===undefined?"":selectedFile3)
              formdata.append("", "\\")
              formdata.append("subject", sub1===undefined?"":sub1)
              formdata.append("", "\\")
              formdata.append("body", content)
              formdata.append("", "\\")
              formdata.append("email",email1)
              formdata.append("", "\\")
              formdata.append("email2",email2===undefined?"":email2)
              fetch(apiLink+"admin/send_file", {
                method: 'POST',
                body:formdata,
                headers: {
                  'accept': 'application/json',
                  Authorization: "Bearer "+localStorage.getItem('access-token')
                  }
              }).then(response => response.json())
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
                })



          response.json().then((data) => {
            toast.success("Company Added", {
              position: "bottom-left",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          });
        } else if (response.status === 500) {
          toast.warn("Server Error", {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      }).then((data)=>{
        fetch(apiLink+"admin/status", {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: "Bearer "+localStorage.getItem('access-token')
          },
        })
          .then((response) => response.json())
          .then((data) => {
            setTotalRegis(data);
          });
          fetch(apiLink+"admin/status_compny_reg_count", {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: "Bearer "+localStorage.getItem('access-token')
          },
        })
          .then((response) => response.json())
          .then((data) => {
            setTotalRegCount(data);
          });
        fetch(apiLink+"admin/status_compny_count", {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer "+localStorage.getItem('access-token')
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setTotalPlaCount(data);
        });
      })
      .catch((error) => console.error("Error:", error));
   }
   
    
  };

  // setTotalRegis()
  const startReg = (cid) => {
    fetch(
      apiLink+"admin/company/registrations/StartRegistrations" +
        cid,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer "+localStorage.getItem('access-token')
        },
      }
    )
      .then((response) => {
        if (response.status === 400) {
          response.json().then((data) => {
            toast.warn("Error Occurered", {
              position: "bottom-left",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          });
        } else if (response.status === 200) {
          response
            .json()

            .then((data) => {
              toast.success("Registration Started", {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            });
        } else {
          toast.warn("Server Error", {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      }).then((data)=>{
        fetch(apiLink+"admin/status", {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: "Bearer "+localStorage.getItem('access-token')
          },
        })
          .then((response) => response.json())
          .then((data) => {
            setTotalRegis(data);
          });
          fetch(apiLink+"admin/status_compny_reg_count", {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: "Bearer "+localStorage.getItem('access-token')
          },
        })
          .then((response) => response.json())
          .then((data) => {
            setTotalRegCount(data);
          });
        fetch(apiLink+"admin/status_compny_count", {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer "+localStorage.getItem('access-token')
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setTotalPlaCount(data);
        });
      })
      .catch((error) => console.error("Error:", error));
  };

  const endreg = (cid) => {
    fetch(
      apiLink+"admin/company/registrations/EndRegistrations" +
        cid,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer "+localStorage.getItem('access-token')
        },
      }
    )
      .then((response) => {
        if (response.status === 400) {
          response.json().then((data) => {
            toast.warn("Error Occurered", {
              position: "bottom-left",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          });
        } else if (response.status === 200) {
          response.json().then((data) => {
            toast.success("Registration Ended", {
              position: "bottom-left",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          });
        } else {
          toast.warn("Server Error", {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      }).then((data)=>{
        fetch(apiLink+"admin/status", {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: "Bearer "+localStorage.getItem('access-token')
          },
        })
          .then((response) => response.json())
          .then((data) => {
            setTotalRegis(data);
          });
          fetch(apiLink+"admin/status_compny_reg_count", {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: "Bearer "+localStorage.getItem('access-token')
          },
        })
          .then((response) => response.json())
          .then((data) => {
            setTotalRegCount(data);
          });
        fetch(apiLink+"admin/status_compny_count", {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer "+localStorage.getItem('access-token')
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setTotalPlaCount(data);
        });
      })
      .catch((error) => console.error("Error:", error));
  };
  const handleClickOpenAddCompanyDialog = (cid, i) => {
    values.branch="";
    setDialogNo(cid);
    fetch(
      apiLink+"admin/company/registrations/details" +
        cid,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer "+localStorage.getItem('access-token')
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
            setValuesEdit(data);  
            values.branch=data.branch

          }).finally(()=>{
            fetch(
              apiLink+"admin/company/company_branch/" +
                cid,
              {
                method: "GET",
                headers: {
                  Accept: "application/json",
                  Authorization: "Bearer "+localStorage.getItem('access-token')
                },
              }
            )
              .then((response) => response.json())
              .then((data) => {
                    if(data.is_true[0])       
                    {
                      setCheckCS(true)
                    }  
                    if(data.is_true[1])       
                    {
                      setCheckCSBS(true)
                    }
                    if(data.is_true[2])       
                    {
                      setCheckIS(true)
                    }
                    if(data.is_true[3])       
                    {
                      setCheckECE(true)
                    }
                    if(data.is_true[4])       
                    {
                      setCheckEI(true)
                    }
                    if(data.is_true[5])       
                    {
                      setCheckEEE(true)
                    }
                    if(data.is_true[6])       
                    {
                      setCheckME(true)
                    }
                    if(data.is_true[7])       
                    {
                      setCheckIP(true)
                    }
                    if(data.is_true[8])       
                    {
                      setCheckCV(true)
                    }
                    if(data.is_true[9])       
                    {
                      setCheckCTM(true)
                    }
                    if(data.is_true[10])       
                    {
                      setCheckPS(true)
                    }
                    if(data.is_true[11])       
                    {
                      setCheckBT(true)
                    }
                    if(data.is_true[12])       
                    {
                      setCheckEV(true)
                    }
                    if(data.is_true[13])       
                    {
                      setCheckBCA(true)
                    }
                    if(data.is_true[14])       
                    {
                      setCheckMSC(true)
                    }
                    if(data.is_true[15])       
                    {
                      setCheckMCA(true)
                    }
                    if(data.is_true[16])       
                    {
                      setCheckCE(true)
                    }
                    if(data.is_true[17])       
                    {
                      setCheckSE(true)
                    }
                    if(data.is_true[18])       
                    {
                      setCheckDS(true)
                    }
                    if(data.is_true[19])       
                    {
                      setCheckBSP(true)
                    }
                    if(data.is_true[20])       
                    {
                      setCheckNIE(true)
                    }
                    if(data.is_true[21])       
                    {
                      setCheckIE(true)
                    }
                    if(data.is_true[22])       
                    {
                      setCheckPSG(true)
                    }
                    if(data.is_true[23])       
                    {
                      setCheckESM(true)
                    }
                    if(data.is_true[24])       
                    {
                      setCheckMEP(true)
                    }
                    if(data.is_true[25])       
                    {
                      setCheckAE(true)
                    }
                    if(data.is_true[26])       
                    {
                      setCheckISP(true)
                    }
                    if(data.is_true[27])       
                    {
                      setCheckIEM(true)
                    }
                    if(data.is_true[28])       
                    {
                      setCheckEP(true)
                    }
                    if(data.is_true[29])       
                    {
                      setCheckHSWT(true)
                    }
                    if(data.is_true[30])       
                    {
                      setCheckMS(true)
                    }
                    if(data.is_true[31])       
                    {
                      setCheckMBAF(true)
                    }
                    if(data.is_true[32])       
                    {
                      setCheckMBAHR(true)
                    }
                    if(data.is_true[33])       
                    {
                      setCheckMBAM(true)
                    }
                    if(data.is_true[34])       
                    {
                      setCheckCF(true)
                    }
                    if(data.is_true[35])       
                    {
                      setCheckDM(true)
                    }
                    if(data.is_true[36])       
                    {
                      setCheckRM(true)
                    }
                  }).finally(()=>{
                    setOpenAddCompanyDialog(true);
  
                  });
          });
         
  };

  const endpro = (cid) => {
    fetch(
      apiLink+"admin/company/registrations/EndProcess" +
        cid,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer "+localStorage.getItem('access-token')
        },
      }
    )
      .then((response) => {
        if (response.status === 400) {
          response.json().then((data) => {
            toast.warn("Error Occurered", {
              position: "bottom-left",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          });
        } else if (response.status === 200) {
          response.json().then((data) => {
            toast.success("Process Ended", {
              position: "bottom-left",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          });
        } else {
          toast.warn("Server Error", {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      }).then((data)=>{
        fetch(apiLink+"admin/status", {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: "Bearer "+localStorage.getItem('access-token')
          },
        })
          .then((response) => response.json())
          .then((data) => {
            setTotalRegis(data);
          });
          fetch(apiLink+"admin/status_compny_reg_count", {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: "Bearer "+localStorage.getItem('access-token')
          },
        })
          .then((response) => response.json())
          .then((data) => {
            setTotalRegCount(data);
          });
        fetch(apiLink+"admin/status_compny_count", {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: "Bearer "+localStorage.getItem('access-token')
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setTotalPlaCount(data);
        });
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div>
    <Dialog
        fullScreen
        open={openRemindStudentDialog}
        onClose={handleCloseRemindStudentDialog}
        TransitionComponent={Transition}
        sx={{width:'100%',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'}}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleCloseRemindStudentDialog}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Remind for {totalregis[noofPlace]?.cname} 
            </Typography>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <DialogContentText>
              <TextField
                style={{ marginBottom: "1rem" }}
                id="datetime-local"
                label="Remind Date"
                type="datetime-local"
                focused
                onChange={(e)=>{handleDateRemind(e)}}
                defaultValue={dateRemind}
                sx={{ width: 800, maxWidth: "100%" }}
              />
          </DialogContentText>
              <Box
                sx={{width:'100%',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'}}
              >
              <Button
              variant="contained"
              color="success"
              sx={{ width: "8rem", margin: "0 auto",height: "3rem" }}
              size="small"
              onClick={() => {remind(totalregis[noofPlace]?.cid)}}
            >
              Remind
            </Button>
              </Box>

             
        </DialogContent>
        </Dialog>

      {/* Place student dialog */}
      <Dialog
        fullScreen
        open={openPlacedStudentDialog}
        onClose={handleClosePlacedStudentDialog}
        TransitionComponent={Transition}
        sx={{width:'100%',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'}}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClosePlacedStudentDialog}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Place Students for {totalregis[noofPlace]?.cname} 
            </Typography>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <DialogContentText>
            <Search sx={{ margin: "1vh 0" }}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search by Name,Usn,Branch..."
                onChange={(event) => {
                  setSelectComapnySearch(event.target.value);
                }}
                inputProps={{ "aria-label": "search" }}
                sx={{ width: "100%", }}
              />
            </Search>
            {/* <br />
            Selected Student(s):
            <br />
            <br />
            <Stack direction="row" spacing={1}>
              <Chip label="Shomik Ghosh" onDelete={handleDelete} />
              <Chip label="Naman Oli" onDelete={handleDelete} />
            </Stack> */}
            <br />
            Role:
            <br />
            <br />

            <FormControl style={{ display:"flex",flexDirection:'center',justifyContent:'center',marginBottom:'2rem'}} >
                <InputLabel id="demo-simple-select-label">
                  Category-1
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Category"
                  // value={values.category}

                  onChange={(event)=>{setCategoryPlaced(event.target.value);setCategoryPlaced2(null)}}
                  value={placedCategory}
                >
                  <MenuItem value={''}>None</MenuItem>
                  <MenuItem value={"tier1"}>Tier-1</MenuItem>
                  <MenuItem value={"tier2"}>Tier-2</MenuItem>
                  <MenuItem value={"internship"}>Internship</MenuItem>
                  <MenuItem value={"dream"}>Dream</MenuItem>
                  <MenuItem value={"special"}>Special</MenuItem>
                </Select>
              </FormControl>
              <FormControl style={{ display:"flex",flexDirection:'center',justifyContent:'center'}} >
                <InputLabel id="demo-simple-select-label">
                  Category-2
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Category"
                  // value={values.category}

                  onChange={(event)=>{setCategoryPlaced2(event.target.value);setCategoryPlaced(null)}}
                  value={placedCategory2}
                >
                  <MenuItem value={''}>None</MenuItem>
                  <MenuItem value={"accenture"}>Accenture</MenuItem>
                  <MenuItem value={"tcs"}>TCS</MenuItem>
                  <MenuItem value={"cognizant"}>Cognizant</MenuItem>
                  <MenuItem value={"infosys"}>Infosys</MenuItem>
                  <MenuItem value={"mtech_interns+tier1"}>Mtech Interns+tier1</MenuItem>
                  <MenuItem value={"mtech_interns+tier2"}>Mtech Interns+tier2</MenuItem>
                </Select>
              </FormControl> 


            <br />
            <br />
            
              
              <FormControl>
              {/* <FormHelperText>You can display an error</FormHelperText> */}
            <br />
            <br />
              
              {/* <Button
                variant="contained"
                sx={{ width: "8rem", margin: "0 auto", height: "3rem" }}
                size="small"
                onClick={ () => {handlestudentplaceclick()}}
              >
                Place
              </Button> */}
              <br />
              Placed Students :
              <br />
              <br />
              <div
                style={{
                  width: "100%",
                  textAlign: "center",
                  margin: "auto",
                }}
              >
                  <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>USN</TableCell>
                        <TableCell align="center">Student Name</TableCell>
                        <TableCell align="center">Branch</TableCell>
                        <TableCell align="right">Category</TableCell>
                        <TableCell align="right">Company Name</TableCell>
                         <TableCell align="center">Unplace</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                    {placedStudent?.map((row,i) => {
                  return placedStudentStatusCategory[i]?.map((row1,j) => (
                    <TableRow
                          key={row.j}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell component="th" scope="row">
                            {row.usn}
                          </TableCell>
                          <TableCell align="center">{row.name}</TableCell>
                          <TableCell align="center">{row.branch}</TableCell>
                          <TableCell align="center">{row1}</TableCell>
                          <TableCell align="center">{placedStudentStatusCompanyName?placedStudentStatusCompanyName[i][j]:null}</TableCell>
                          <TableCell align="center"><Button
                              variant="contained"
                              color="error"
                              sx={{ width: "8rem", margin: "0 auto", height: "3rem" }}
                              size="small"
                              onClick={() => {unplacestudent(row.usn,unplacecid?unplacecid[i][j]:null)}}
                            >
                              Unplace
                            </Button>
                            </TableCell>
                        </TableRow>
                      ))
                    })}
                      
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
              <br />
              Select Students :
              {/* {JSON.stringify(anyBoxesChecked)} */}
              <br />
              <br />
              <div style={{  width: "100%" }}>
              <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>USN</TableCell>
                        <TableCell align="center">Student Name</TableCell>
                        <TableCell align="center">Branch</TableCell>
                        <TableCell align="center">Select</TableCell>                       
                         <TableCell align="center">Unregister</TableCell>
                       {/*  <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {selectComapnySearch.length?(
                        fuse1.search(selectComapnySearch)?.map((row,i) => (
                          <TableRow
                            key={row.item.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell component="th" scope="row">
                              {row.item.usn}
                            </TableCell>
                            <TableCell align="center">{row.item.full_name}</TableCell>
                            <TableCell align="center">{row.item.branch}</TableCell>
                            <TableCell align="center"><Button
                              variant="contained"
                              color="success"
                              sx={{ width: "8rem", margin: "0 auto", height: "3rem" }}
                              size="small"
                              onClick={() => {placestudent(row.item.usn)}}
                            >
                              Place
                            </Button></TableCell>
                            <TableCell align="center"><Button
                              variant="contained"
                              color="primary"
                              sx={{ width: "8rem", margin: "0 auto", height: "3rem" }}
                              size="small"
                              onClick={() => {unregisterstudent(row.item.usn,placedstudentcid)}}
                            >
                              Unregister
                            </Button></TableCell>
                          </TableRow>
                        ))
                      ):(
                        registeredStudent?.map((row,i) => (
                          <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell component="th" scope="row">
                              {row.usn}
                            </TableCell>
                            <TableCell align="center">{row.full_name}</TableCell>
                            <TableCell align="center">{row.branch}</TableCell>
                            <TableCell align="center"><Button
                              variant="contained"
                              color="success"
                              sx={{ width: "8rem", margin: "0 auto", height: "3rem" }}
                              size="small"
                              onClick={() => {placestudent(row.usn)}}
                            >
                              Place
                            </Button></TableCell>
                            <TableCell align="center"><Button
                              variant="contained"
                              color="primary"
                              sx={{ width: "8rem", margin: "0 auto", height: "3rem" }}
                              size="small"
                              onClick={() => {unregisterstudent(row.usn,placedstudentcid)}}
                            >
                              Unregister
                            </Button></TableCell>
                          </TableRow>
                        ))
                      )}
                    
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </FormControl>
          </DialogContentText>
        </DialogContent>
        {/* <DialogActions>
            <Button autoFocus onClick={handleClosePlacedStudentDialog}>
              Disagree
            </Button>
            <Button onClick={handleClosePlacedStudentDialog} autoFocus>
              Agree
            </Button>
          </DialogActions> */}
      </Dialog>

      <Container maxWidth="lg" sx={{ display: "flex", flexDirection: "row" }}>
        <Box sx={{ width: "25%", margin: "0 2rem" }} class="oncamp_side">
          <CompanyStats />
          <hr />
          <OnCampus />
        </Box>

        <Box sx={{ width: "75%", margin: "0 2rem" }} class="oncamp_rest">
          <div className="header_company">COMPANY</div>
          <TabContext value={value}>
            <Box
              sx={{ bgcolor: "background.paper" }}
              style={{ padding: "1rem" }}
            >
              <Tabs value={value} onChange={handleChange} centered>
                <Tab label="Registrations" value="1" />
                <Tab label="Add Company" value="2" />
              </Tabs>
            </Box>
            <TabPanel value="1">
              <div
                sx={{ bgcolor: "background.paper" }}
                style={{ padding: "1rem" }}
              >
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    onChange={(event) => {
                      setCompany(event.target.value);
                    }}
                    placeholder="Search…"
                    inputProps={{ "aria-label": "search" }}
                    sx={{ width: "100%" }}
                  />
                </Search>
              </div>
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
              {searchCompany.length
                ? fuse.search(searchCompany)?.map((oncamp, i) => {
                    return (
                      <>
                        <Accordion
                          expanded={expanded === oncamp.item.cname}
                          onChange={handleChange1(oncamp.item.cname)} 
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
                                flexShrink: 1,fontWeight:'700',
                              }} 
                            >
                              {oncamp.item.cname}
                            </Typography>
                            <Stack direction="row" spacing={2}  >
                              <Button
                                variant="contained"
                                sx={{ height: "40px" }}
                                color="error"
                                size="small"
                              >
                               {totalplacount?.map((t)=>{if(t.cid===oncamp.item.cid){return(<>{t.count}</>)}})}/{totalregiscount?.map((t)=>{if(t.cid===oncamp.item.cid){return(<>{t.count}</>)}})}
                              </Button>

                              {oncamp.item.status === 0 ? (
                                <Button
                                  variant="contained"
                                  sx={{ height: "40px", width: "100%" }}
                                  color="success"
                                >
                                  Start
                                </Button>
                              ) : null}
                              {oncamp.item.status === 1 ? (
                                <Button
                                  variant="contained"
                                  sx={{ height: "40px", width: "100%" }}
                                  color="secondary"
                                >
                                  Going On{" "}
                                </Button>
                              ) : null}
                              {oncamp.item.status === 2 ? (
                                <Button
                                  variant="contained"
                                  sx={{ height: "40px", width: "100%" }}
                                  color="error"
                                >
                                  Ended{" "}
                                </Button>
                              ) : null}
                              {oncamp.item.status === 3 ? (
                                <Button
                                  variant="contained"
                                  color="success"
                                >
                                  Process Complete{" "}
                                </Button>
                              ) : null}

                            </Stack>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Typography>
                              <div className="detailscomapny">
                              
                               <div>
                               
                                  <Stack direction="row" spacing={1} >
                                  
                                    <IconButton
                                      sx={{color:"white",backgroundColor:'#35589A'}}
                                      color="secondary"
                                      aria-label="edit"
                                      onClick={() => {
                                        handleClickOpenAddCompanyDialog(
                                          oncamp.item.cid,
                                          i
                                        );
                                      }}
                                    >
                                      <EditIcon />
                                    </IconButton>
                                  </Stack>
                                </div>
                                <br />
                                <div>
                                  <strong>Category:</strong>
                                  {oncamp.item.category}
                                </div>
                                <div>
                                  <strong>Date:</strong>
                                  {oncamp.item.date?.slice(0,10)?.split('-')?.reverse()?.join('-')}
                                </div>
                                <div>
                                  <strong>Fulltime CTC:</strong>
                                  {oncamp.item.package}
                                </div>
                                <div>
                                  <strong>Deadline:</strong>
                                  {oncamp.item.deadline?.slice(0,10)?.split('-')?.reverse()?.join('-')}
                                </div>
                                <div>
                                  <strong>Internship Stipend:</strong>
                                  {oncamp.item.internship_stipend}
                                </div>
                                <div>
                                  <strong>Backlogs Allowed:</strong>
                                  {oncamp.item.backlogs?"Yes":"No"}
                                </div>
                                <div>
                                  <strong>Cutoff-SSLC:</strong>
                                  {oncamp.item.ssc}
                                </div>
                                <div>
                                  <strong>Cutoff-PUC:</strong>
                                  {oncamp.item.hsc}
                                </div>
                                <div>
                                  <strong>Cutoff-BE:</strong>
                                  {oncamp.item.ug}
                                </div>
                                <div>
                                  <strong>Cutoff-PG:</strong>
                                  {oncamp.item.pg}
                                </div>
                              </div>
                              <div className="deatailscompanybuttons">
                                <div>
                                  <strong>Registration:</strong>
                                  <div>
                                  <Button
                                      variant="contained"
                                      sx={{ height: "40px" }}
                                      varient="outlined"
                                      onClick={()=>{
                                         handleClickOpenRemindStudentDialog(oncamp.item.cid,i)
                                      } 
                                      }
                                    >
                                      Remind
                                    </Button>
                                      <Button
                                        variant="contained"
                                        sx={{ height: "40px" }}
                                        onClick={() => {
                                          startReg(oncamp.item.cid);
                                        }}
                                        varient="outlined"

                                      >
                                        Start
                                      </Button>
                                      <Button
                                        variant="contained"
                                        sx={{ height: "40px" }}
                                        varient="outlined"
                                        onClick={() => {
                                          endreg(oncamp.item.cid);
                                        }}
                                      >
                                        End
                                      </Button>
                                  </div>
                                </div>
                                <div>
                                  <strong>Downloadlist:</strong>
                                  <div>
                                    <Button
                                      variant="contained"
                                      sx={{ height: "40px" }}
                                      varient="outlined"
                                      onClick={()=>{
                                        handleShortDetails(oncamp.item.cid)
                                      }}
                                    >
                                      Short
                                    </Button>
                                    <Button
                                      variant="contained"
                                      sx={{ height: "40px" }}
                                      varient="outlined"
                                      onClick={()=>{
                                        handleDetailedDetails(oncamp.item.cid)
                                      }}
                                    >
                                      Detail
                                    </Button>
                                    <Button
                                      variant="contained"
                                      sx={{ height: "40px" }}
                                      varient="outlined"
                                      onClick={()=>{
                                        handleDownloadDetails(oncamp.item.cid)
                                      }}
                                    >
                                      Download
                                    </Button>
                                  </div>
                                </div>
                                <div>
                                  <strong>Final:</strong>
                                  <div>
                                    <Button
                                      variant="contained"
                                      sx={{ height: "40px" }}
                                      varient="outlined"
                                      onClick={()=>
                                        {
                                          handleClickOpenPlacedStudentDialog(oncamp.item.cid,i)

                                        }
                                      }
                                    >
                                      Place Students
                                    </Button>
                                      <Button
                                        variant="contained"
                                        sx={{ height: "40px" }}
                                        varient="outlined"
                                        onClick={() => {
                                          endpro(oncamp.item.cid);
                                        }}
                                      >
                                        End Process
                                      </Button>
                                  </div>
                                </div>
                              </div>
                            </Typography>
                          </AccordionDetails>
                        </Accordion>
                      </>
                    );
                  })
                : totalregis?.map(function (oncamp, i) {
                  return(

                      <>
                        <Accordion
                          expanded={expanded === oncamp.cname}
                          onChange={handleChange1(oncamp.cname)}
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
                                fontWeight:'700',
                              }}
                            >
                              {oncamp.cname}
                            </Typography>
                            <Stack direction="row" spacing={2}>
                              <Button
                                variant="contained"
                                sx={{ height: "40px" }}
                                color="error"
                                size="small"
                              >
                               {totalplacount?.map((t)=>{if(t.cid===oncamp.cid){return(<>{t.count}</>)}})}/{totalregiscount?.map((t)=>{if(t.cid===oncamp.cid){return(<>{t.count}</>)}})}
                              </Button>

                              {oncamp.status === 0 ? (
                                <Button
                                  variant="contained"
                                  sx={{ height: "40px", width: "100%" }}
                                  color="success"
                                >
                                  Start
                                </Button>
                              ) : null}
                              {oncamp.status === 1 ? (
                                <Button
                                  variant="contained"
                                  sx={{ height: "40px", width: "100%" }}
                                  color="secondary"
                                >
                                  Going On{" "}
                                </Button>
                              ) : null}
                              {oncamp.status === 2 ? (
                                <Button
                                  variant="contained"
                                  sx={{ height: "40px", width: "100%" }}
                                  color="error"
                                >
                                  Ended{" "}
                                </Button>
                              ) : null}
                              {oncamp.status === 3 ? (
                                <Button
                                  variant="contained"
                                  // sx={{ width: "40px"}}
                                  color="success"
                                >
                                  Process Complete{" "}
                                </Button>
                              ) : null}

                            </Stack>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Typography>
                              <div className="detailscomapny">
                                <div>
                                  <Stack direction="row" spacing={1}>
                                    <IconButton
                                      sx={{color:"white",backgroundColor:'#35589A'}}
                                      color="secondary"
                                      aria-label="edit"
                                      onClick={() => {
                                        handleClickOpenAddCompanyDialog(
                                          oncamp.cid,
                                          i
                                        );
                                      }}
                                    >
                                      <EditIcon />
                                    </IconButton>
                                  </Stack>
                                </div>
                                <br />
                                <div>
                                  <strong>Category:</strong>
                                  {oncamp.category}
                                </div>
                                <div>
                                  <strong>Date:</strong>
                                  {oncamp.date?.slice(0,10)?.split('-')?.reverse()?.join('-')}
                                </div>
                                <div>
                                  <strong>Fulltime CTC:</strong>
                                  {oncamp.package}
                                </div>
                                <div>
                                  <strong>Deadline:</strong>
                                  {oncamp.deadline?.slice(0,10)?.split('-')?.reverse()?.join('-')}
                                </div>
                                <div>
                                  <strong>Internship Stipend:</strong>
                                  {oncamp.internship_stipend}
                                </div>
                                <div>
                                  <strong>Backlogs Allowed:</strong>
                                  {oncamp.backlogs?"Yes":"No"}
                                </div>
                                <div>
                                  <strong>Cutoff-SSLC:</strong>
                                  {oncamp.ssc}
                                </div>
                                <div>
                                  <strong>Cutoff-PUC:</strong>
                                  {oncamp.hsc}
                                </div>
                                <div>
                                  <strong>Cutoff-BE:</strong>
                                  {oncamp.ug}
                                </div>
                                <div>
                                  <strong>Cutoff-PG:</strong>
                                  {oncamp.pg}
                                </div>
                              </div>
                              <div className="deatailscompanybuttons">
                                <div>
                                  <strong>Registration:</strong>
                                  <div>
                                  <Button
                                      variant="contained"
                                      sx={{ height: "40px" }}
                                      varient="outlined"
                                      onClick={()=>{
                                         handleClickOpenRemindStudentDialog(oncamp.cid,i)
                                      } 
                                      }
                                    >
                                      Remind
                                    </Button>
                                      <Button
                                        variant="contained"
                                        sx={{ height: "40px" }}
                                        varient="outlined"
                                        onClick={() => {
                                          startReg(oncamp.cid);
                                        }}
                                      >
                                        Start
                                      </Button>
                                      <Button
                                        variant="contained"
                                        sx={{ height: "40px" }}
                                        varient="outlined"
                                        onClick={() => {
                                          endreg(oncamp.cid);
                                        }}
                                      >
                                        End
                                      </Button>
                                  </div>
                                </div>
                                <div>
                                  <strong>Downloadlist:</strong>
                                  <div>
                                    <Button
                                      variant="contained"
                                      sx={{ height: "40px" }}
                                      varient="outlined"
                                      onClick={()=>{handleShortDetails(oncamp.cid)}}
                                    >
                                      Short
                                    </Button>
                                    <Button
                                      variant="contained"
                                      sx={{ height: "40px" }}
                                      varient="outlined"
                                      onClick={()=>{
                                        handleDetailedDetails(oncamp.cid)
                                      }}
                                    >
                                      Detail
                                    </Button>
                                    <Button
                                      variant="contained"
                                      sx={{ height: "40px" }}
                                      varient="outlined"
                                      onClick={()=>{
                                        handleDownloadDetails(oncamp.cid)
                                      }}
                                    >
                                      Download
                                    </Button>
                                  </div>
                                </div>
                                <div>
                                  <strong>Final:</strong>
                                  <div>
                                    <Button
                                      variant="contained"
                                      sx={{ height: "40px" }}
                                      varient="outlined"
                                      onClick={()=>{
                                         handleClickOpenPlacedStudentDialog(oncamp.cid,i)
                                      } 
                                      }
                                    >
                                      Place Students
                                    </Button>
                                      <Button
                                        variant="contained"
                                        sx={{ height: "40px" }}
                                        varient="outlined"
                                        onClick={() => {
                                          endpro(oncamp.cid);
                                        }}
                                      >
                                        End Process
                                      </Button>
                                  </div>
                                </div>
                              </div>
                            </Typography>
                          </AccordionDetails>
                        </Accordion>
                      </>
                  )
                  })}
              <Dialog
                fullScreen
                open={openAddCompanyDialog}
                onClose={handleCloseAddCompanyDialog}
                TransitionComponent={Transition}
                // sx={{width:'100%',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'}}
              >
                <AppBar sx={{ position: "relative" }}>
                  <Toolbar>
                    <IconButton
                      edge="start"
                      color="inherit"
                      onClick={handleCloseAddCompanyDialog}
                      aria-label="close"
                    >
                      <CloseIcon />
                    </IconButton>
                    <Typography
                      sx={{ ml: 2, flex: 1 }}
                      variant="h6"
                      component="div"
                    >
                      Update Company Details
                    </Typography>
                  </Toolbar>
                </AppBar>
                <DialogContent>
                  <div className="companyaddform">
                    <Box
                      sx={{
                        width: 800,
                        maxWidth: "100%",
                      }}
                    >
                      <TextField
                        fullWidth
                        label="Company Name"
                        id="fullWidth"
                        onChange={handleChangeDialogTextField("cname")}
                        defaultValue={valuesEdit.cname}
                        style={{ marginBottom: "1rem" }}
                      />
                      <TextField
                        fullWidth
                        label="Full Time CTC"
                        id="fullWidth"
                        onChange={handleChangeDialogTextField("package")}
                        defaultValue={valuesEdit.package}
                        placeholder="XX.XX"
                        style={{ marginBottom: "1rem" }}
                      />
                      <TextField
                        fullWidth
                        label="Internship Stipend"
                        id="fullWidth"
                        onChange={handleChangeDialogTextField(
                          "internship_stipend"
                        )}
                        defaultValue={valuesEdit.internship_stipend}
                        style={{ marginBottom: "1rem" }}
                      />
                      Branches
                      <FormGroup style={{ marginBottom: "1rem" }}>
                      <FormControlLabel
                      control={<Checkbox onChange={toggleCS}
                      checked={checkCS} />}
                      label="Computer Science"
                    />
                    <FormControlLabel
                      control={<Checkbox onChange={toggleCSBS}
                      checked={checkCSBS} />}
                      label="Computer Science & Business Systems"
                    />
                    <FormControlLabel
                      control={<Checkbox onChange={toggleIS} 
                      checked={checkIS}
                      />}
                      label="Information Science"
                    />
                    <FormControlLabel
                      control={<Checkbox onChange={toggleECE} 
                      checked={checkECE}
                      />}
                      label="Electronics & Communications"
                    />
                    <FormControlLabel
                      control={<Checkbox onChange={toggleEI}
                      checked={checkEI} />}
                      label="Electronics & Instrumentation"
                    />
                    <FormControlLabel
                      control={<Checkbox onChange={toggleEEE} 
                        checked={checkEEE}
                      />}
                      label="Electronics & Electrical"
                    />
                    <br/>
                    <br/>
                    <FormControlLabel
                      control={<Checkbox onChange={toggleME}
                      checked={checkME}
                       />}
                      label="Mechanical"
                    />
                    <FormControlLabel
                      control={<Checkbox onChange={toggleIP}
                      checked={checkIP}
                       />}
                      label="Industrial Production"
                    />
                    <FormControlLabel
                      control={<Checkbox onChange={toggleCV} 
                      checked={checkCV}
                      />}
                      label="Civil"
                    />
                    <FormControlLabel
                      control={<Checkbox onChange={toggleCTM}
                      checked={checkCTM}
                     />}
                      label="Construction Technology"
                    />
                    <FormControlLabel
                      control={<Checkbox onChange={togglePS} 
                      checked={checkPS}
                      />}
                      label="Polymer Science & Technology"
                    />
                    <FormControlLabel
                      control={<Checkbox onChange={toggleBT}
                      checked={checkBT}
                     />}
                      label="Biotechnology"
                    />
                    <FormControlLabel
                      control={<Checkbox onChange={toggleEV} 
                      checked={checkEV}
                      />}
                      label="Environmental"
                    />
                    <br/>
                    <br/>
                    <FormControlLabel
                      control={<Checkbox onChange={toggleBCA}
                      checked={checkBCA}  
                       />}
                      label="BCA"
                    />
                    <FormControlLabel
                      control={<Checkbox onChange={toggleMSC} 
                      checked={checkMSC}                         
                      />}
                      label="MSC"
                    />
                    <FormControlLabel
                      control={<Checkbox onChange={toggleMCA}
                      checked={checkMCA}                                              
                       />}
                      label="MCA"
                    />
                    <FormControlLabel
                      control={<Checkbox onChange={toggleCE} 
                      checked={checkCE}                                              
                      />}
                      label="Computer Engineering (PG)"
                    /> 
                    <FormControlLabel
                      control={<Checkbox onChange={toggleSE} 
                      checked={checkSE}                                                  
                      />}
                      label="Software Engineering (PG)"
                    />
                    <FormControlLabel
                      control={<Checkbox onChange={toggleDS}
                      checked={checkDS}                                                               
                       />}
                      label="Data Science (PG)"
                    />
                     <FormControlLabel
                      control={<Checkbox onChange={toggleBSP}
                      checked={checkBSP}                                                                       
                       />}
                      label="Biomedical Signal Processing (PG)"
                    />
                    <FormControlLabel
                      control={<Checkbox onChange={toggleNIE}
                      checked={checkNIE}                                                                          
                       />}
                      label="Network & Internet Engineering (PG)"
                    />
                    <FormControlLabel
                      control={<Checkbox onChange={toggleIE}
                      checked={checkIE}                                                                                                
                       />}
                      label="Industrial Electronics (PG)"
                    />
                    <FormControlLabel
                      control={<Checkbox onChange={togglePSG}
                      checked={checkPSG}                                                                                                            
                       />}
                      label="Polymer Science (PG)"
                    />
                    <FormControlLabel
                      control={<Checkbox onChange={toggleESM}
                      checked={checkESM}                                                                                                                                  
                       />}
                      label="Energy Systems & Management (PG)"
                    />
                    <FormControlLabel
                      control={<Checkbox onChange={toggleMEP} 
                      checked={checkMEP}                                                                                                                                          
                      />}
                      label="Mechanical Engineering (PG)"
                    />
                    <FormControlLabel
                      control={<Checkbox onChange={toggleAE} 
                      checked={checkAE}                                                                                                                                                    
                      />}
                      label="Automotive Electronics (PG)"
                    />
                    <FormControlLabel
                      control={<Checkbox onChange={toggleISP}
                      checked={checkISP}                                                                                                                                                                  
                       />}
                      label="Industrial Structures (PG)"
                    />
                    <FormControlLabel
                      control={<Checkbox onChange={toggleIEM} 
                      checked={checkIEM}                                                                                                                                                                   
                     />}
                      label="Infrastructure Engineering & Management (PG)"
                    />
                    <FormControlLabel
                      control={<Checkbox onChange={toggleEP} 
                      checked={checkEP}                                                                                                                                                                   
                      />}
                      label="Environmental (PG)"
                    />
                    <FormControlLabel
                      control={<Checkbox onChange={toggleHSWT}
                      checked={checkHSWT}                                                                                                                                                                   
                       />}
                      label="Health Science & Water Treatment (PG)"
                    />
                    <FormControlLabel
                      control={<Checkbox onChange={toggleMS}
                      checked={checkMS}                                                                                                                                                                   
                       />}
                      label="Material Science and Eng (PG)"
                    />
                    <FormControlLabel
                      control={<Checkbox onChange={toggleMBAF}
                      checked={checkMBAF}                                                                                                                                                                   
                       />}
                      label="MBA - Finance"
                    />
                    <FormControlLabel
                      control={<Checkbox onChange={toggleMBAHR} 
                      checked={checkMBAHR}                                                                                                                                                                   
                      />}
                      label="MBA - Human Recourse"
                    />
                    <FormControlLabel
                      control={<Checkbox onChange={toggleMBAM} 
                      checked={checkMBAM}                                                                                                                                                                   
                      />}
                      label="MBA - Marketing"
                    />
                    <FormControlLabel
                      control={<Checkbox onChange={toggleCF}
                      checked={checkCF}                                                                                                                                                                            
                       />}
                      label="Corporate Finance"
                    />
                    <FormControlLabel
                      control={<Checkbox onChange={toggleDM}
                      checked={checkDM}                                                                                                                                                                                                 
                       />}
                      label="Digital Marketing"
                    />
                    <FormControlLabel
                      control={<Checkbox onChange={toggleRM} 
                      checked={checkRM}                                                                                                                                                                                                 
                      />}
                      label="Retail Marketing"
                    />
                    {/* <FormControlLabel
                      control={<Checkbox onChange={toggleMBA} />}
                      label="MBA"
                    />
                    <FormControlLabel
                      control={<Checkbox onChange={toggleBSC} />}
                      label="BSC"
                    /> */}
                      </FormGroup>
                      <FormControl style={{ marginBottom: "1rem" }} fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Category
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          label="Category"
                          // value={values.category}
                          onChange={handleChangeDialogTextField("category")}
                          defaultValue={valuesEdit.category}
                        >
                          <MenuItem value={"tier1"}>TIER 1</MenuItem>
                          <MenuItem value={"tier2"}>TIER 2</MenuItem>
                          <MenuItem value={"internship"}>INTERNSHIP</MenuItem>
                          <MenuItem value={"summer_internship"}>
                            SUMMER INTERNSHIP
                          </MenuItem>
                          <MenuItem value={"mtech_intern"}>
                            MTECH INTERN
                          </MenuItem>
                          <MenuItem value={"dream"}>DREAM</MenuItem>
                          <MenuItem value={"core"}>CORE</MenuItem>
                          <MenuItem value={"special"}>SPECIAL</MenuItem>
                        </Select>
                      </FormControl>
                      <LocalizationProvider
                        dateAdapter={AdapterDateFns}
                        style={{ marginBottom: "1rem" }}
                      >
                        <TextField
                          style={{ marginBottom: "1rem" }}
                          id="datetime-local"
                          label="Date"
                          type="datetime-local"
                          focused
                          onChange={handleChangeDialogTextField("date")}
                          defaultValue={valuesEdit.date}
                          sx={{ width: 800, maxWidth: "100%" }}
                        />
                      </LocalizationProvider>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <TextField
                          style={{ marginBottom: "1rem" }}
                          id="datetime-local"
                          label="Deadline"
                          type="datetime-local"
                          focused
                          onChange={handleChangeDialogTextField("deadline")}
                          defaultValue={valuesEdit.deadline}
                          sx={{ width: 800, maxWidth: "100%" }}
                        />
                      </LocalizationProvider>
                      <div>Cutoff</div>
                      <TextField
                        fullWidth
                        label="SSC"
                        id="fullWidth"
                        placeholder="XX.XX"
                        onChange={handleChangeDialogTextField("ssc")}
                        defaultValue={valuesEdit.ssc}
                        style={{ marginBottom: "1rem", marginTop: "1rem" }}
                      />
                      <TextField
                        fullWidth
                        label="HSC"
                        id="fullWidth"
                        placeholder="XX.XX"
                        onChange={handleChangeDialogTextField("hsc")}
                        defaultValue={valuesEdit.hsc}
                        style={{ marginBottom: "1rem" }}
                      />
                      <TextField
                        fullWidth
                        label="UG"
                        id="fullWidth"
                        placeholder="XX.XX"
                        onChange={handleChangeDialogTextField("ug")}
                        defaultValue={valuesEdit.ug}
                        style={{ marginBottom: "1rem" }}
                      />
                      <TextField
                        fullWidth
                        label="PG"
                        id="fullWidth"
                        placeholder="XX.XX/0"
                        onChange={handleChangeDialogTextField("pg")}
                        defaultValue={valuesEdit.pg}
                        style={{ marginBottom: "1rem" }}
                      />
                      <FormControl style={{ marginBottom: "1rem" }} fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Gender
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          label="Category"
                          // value={values.category}

                          onChange={handleChangeDialogTextField("gender")}
                          defaultValue={valuesEdit.gender}
                        >
                          <MenuItem value={"M"}>Male</MenuItem>
                          <MenuItem value={"F"}>Female</MenuItem>
                          <MenuItem value={"M,F"}>Both</MenuItem>
                        </Select>
                      </FormControl>
                      <FormControl>
                        <FormLabel id="demo-row-radio-buttons-group-label">
                          Backlogs
                        </FormLabel>
                        <RadioGroup
                          row
                          aria-labelledby="demo-row-radio-buttons-group-label"
                          name="row-radio-buttons-group"
                          onChange={handleChangeDialogTextField("backlogs")}
                          defaultValue={valuesEdit.backlogs.toString()}
                        >
                          <FormControlLabel
                            value="1"
                            control={<Radio />}
                            label="Allowed"
                          />
                          <FormControlLabel
                            value="0"
                            control={<Radio />}
                            label="Not Allowed"
                          />
                        </RadioGroup>
                      </FormControl>
                      <div className="header_company">JOB DETAILS</div>
                      <br></br>
                      <br></br>
                      <Box>
                      <TextField
                          id="outlined"
                          fullWidth
                          label="Subject"
                          placeholder="Subject"
                          rows={1}
                          
                          onChange={(event)=>setSub1(event.target.value)}
                  value={sub1}
                /><br/><br/>
                      <TextField
                          id="outlined"
                          fullWidth
                          label="Email ID"
                          placeholder="Email ID"
                          rows={1}
                          
                          onChange={(event)=>setEmail1(event.target.value)}
                  value={email1}
                />
                <br></br><br></br>
                <TextField
                          id="outlined"
                          fullWidth
                          label="Alternate Email ID"
                          placeholder="Alternate Email ID"
                          rows={1}
                          
                          onChange={(event)=>setEmail2(event.target.value)}
                  value={email2}
                />
                <br></br><br></br>
                        <TextField
                          id="outlined-multiline-flexible"
                          fullWidth
                          label="Content"
                          multiline
                          maxRows={6}
                          onChange={(event)=>setContent(event.target.value)}
                          value={content}
                          placeholder="Content"
                          rows={4}
                        />
                        
                        <Button
                          variant="contained"
                          component="label"
                          sx={{ margin: "1rem 0", width: "100%" }}
                        >
                          Upload File &nbsp;
                          <input type="file"  onChange={event=>onFileChange1(event)}/>
                        </Button>
                        <Button
                          variant="contained"
                          component="label"
                          sx={{ margin: "1rem 0", width: "100%" }}
                        >
                          Upload File &nbsp;
                          <input type="file"  onChange={event=>onFileChange2(event)}/>
                        </Button>
                        <Button
                          variant="contained"
                          component="label"
                          sx={{ margin: "1rem 0", width: "100%" }}
                        >
                          Upload File &nbsp;
                          <input type="file"  onChange={event=>onFileChange3(event)}/>
                        </Button>
                      </Box>
                    </Box>
                  </div>
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Button
                      variant="contained"
                      style={{ margin: "0 auto" }}
                      onClick={(event) => handleUpdateCompany()}
                    >
                      UPDATE
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </TabPanel>
            <TabPanel value="2">
              <div className="companyaddform">
                <Box
                  sx={{
                    width: 800,
                    maxWidth: "100%",
                  }}
                >
                  <TextField
                    fullWidth
                    label="Company Name"
                    id="fullWidth"
                    onChange={handleChangeTextField("cname")}
                    value={values.cname}
                    style={{ marginBottom: "1rem" }}
                  />
                  <TextField
                    fullWidth
                    label="Full Time CTC"
                    id="fullWidth"
                    onChange={handleChangeTextField("package")}
                    value={values.package}
                    placeholder="XX.XX"
                    style={{ marginBottom: "1rem" }}
                  />
                  <TextField
                    fullWidth
                    label="Internship Stipend"
                    id="fullWidth"
                    onChange={handleChangeTextField("internship_stipend")}
                    value={values.internship_stipend}
                    style={{ marginBottom: "1rem" }}
                  />
                  Branches
                  <FormGroup style={{ marginBottom: "1rem" }}>
                    <FormControlLabel
                      control={<Checkbox onChange={toggleCS} />}
                      label="Computer Science"
                    />
                    <FormControlLabel
                      control={<Checkbox onChange={toggleCSBS} />}
                      label="Computer Science & Business Systems"
                    />
                    <FormControlLabel
                      control={<Checkbox onChange={toggleIS} />}
                      label="Information Science"
                    />
                    <FormControlLabel
                      control={<Checkbox onChange={toggleECE} />}
                      label="Electronics & Communications"
                    />
                    <FormControlLabel
                      control={<Checkbox onChange={toggleEI} />}
                      label="Electronics & Instrumentation"
                    />
                    <FormControlLabel
                      control={<Checkbox onChange={toggleEEE} />}
                      label="Electronics & Electrical"
                    />
                    <br/>
                    <br/>
                    <FormControlLabel
                      control={<Checkbox onChange={toggleME} />}
                      label="Mechanical"
                    />
                    <FormControlLabel
                      control={<Checkbox onChange={toggleIP} />}
                      label="Industrial Production"
                    />
                    <FormControlLabel
                      control={<Checkbox onChange={toggleCV} />}
                      label="Civil"
                    />
                    <FormControlLabel
                      control={<Checkbox onChange={toggleCTM} />}
                      label="Construction Technology"
                    />
                    <FormControlLabel
                      control={<Checkbox onChange={togglePS} />}
                      label="Polymer Science & Technology"
                    />
                    <FormControlLabel
                      control={<Checkbox onChange={toggleBT} />}
                      label="Biotechnology"
                    />
                    <FormControlLabel
                      control={<Checkbox onChange={toggleEV} />}
                      label="Environmental"
                    />
                    <br/>
                    <br/>
                    <FormControlLabel
                      control={<Checkbox onChange={toggleBCA} />}
                      label="BCA"
                    />
                    <FormControlLabel
                      control={<Checkbox onChange={toggleMSC} />}
                      label="MSC"
                    />
                    <FormControlLabel
                      control={<Checkbox onChange={toggleMCA} />}
                      label="MCA"
                    />
                    <FormControlLabel
                      control={<Checkbox onChange={toggleCE} />}
                      label="Computer Engineering (PG)"
                    /> 
                    <FormControlLabel
                      control={<Checkbox onChange={toggleSE} />}
                      label="Software Engineering (PG)"
                    />
                    <FormControlLabel
                      control={<Checkbox onChange={toggleDS} />}
                      label="Data Science (PG)"
                    />
                     <FormControlLabel
                      control={<Checkbox onChange={toggleBSP} />}
                      label="Biomedical Signal Processing (PG)"
                    />
                    <FormControlLabel
                      control={<Checkbox onChange={toggleNIE} />}
                      label="Network & Internet Engineering (PG)"
                    />
                    <FormControlLabel
                      control={<Checkbox onChange={toggleIE} />}
                      label="Industrial Electronics (PG)"
                    />
                    <FormControlLabel
                      control={<Checkbox onChange={togglePSG} />}
                      label="Polymer Science (PG)"
                    />
                    <FormControlLabel
                      control={<Checkbox onChange={toggleESM} />}
                      label="Energy Systems & Management (PG)"
                    />
                    <FormControlLabel
                      control={<Checkbox onChange={toggleMEP} />}
                      label="Mechanical Engineering (PG)"
                    />
                    <FormControlLabel
                      control={<Checkbox onChange={toggleAE} />}
                      label="Automotive Electronics (PG)"
                    />
                    <FormControlLabel
                      control={<Checkbox onChange={toggleISP} />}
                      label="Industrial Structures (PG)"
                    />
                    <FormControlLabel
                      control={<Checkbox onChange={toggleIEM} />}
                      label="Infrastructure Engineering & Management (PG)"
                    />
                    <FormControlLabel
                      control={<Checkbox onChange={toggleEP} />}
                      label="Environmental (PG)"
                    />
                    <FormControlLabel
                      control={<Checkbox onChange={toggleHSWT} />}
                      label="Health Science & Water Treatment (PG)"
                    />
                    <FormControlLabel
                      control={<Checkbox onChange={toggleMS} />}
                      label="Material Science and Eng (PG)"
                    />
                    <FormControlLabel
                      control={<Checkbox onChange={toggleMBAF} />}
                      label="MBA - Finance"
                    />
                    <FormControlLabel
                      control={<Checkbox onChange={toggleMBAHR} />}
                      label="MBA - Human Recourse"
                    />
                    <FormControlLabel
                      control={<Checkbox onChange={toggleMBAM} />}
                      label="MBA - Marketing"
                    />
                    <FormControlLabel
                      control={<Checkbox onChange={toggleCF} />}
                      label="Corporate Finance"
                    />
                    <FormControlLabel
                      control={<Checkbox onChange={toggleDM} />}
                      label="Digital Marketing"
                    />
                    <FormControlLabel
                      control={<Checkbox onChange={toggleRM} />}
                      label="Retail Marketing"
                    />
                    {/* <FormControlLabel
                      control={<Checkbox onChange={toggleMBA} />}
                      label="MBA"
                    />
                    <FormControlLabel
                      control={<Checkbox onChange={toggleBSC} />}
                      label="BSC"
                    /> */}
                  </FormGroup>
                  <FormControl style={{ marginBottom: "1rem" }} fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Category
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Category"
                      // value={values.category}

                      onChange={handleChangeCategory}
                    >
                      <MenuItem value={"tier1"}>TIER 1</MenuItem>
                      <MenuItem value={"tier2"}>TIER 2</MenuItem>
                      <MenuItem value={"internship"}>INTERNSHIP</MenuItem>
                      <MenuItem value={"summer_internship"}>
                        SUMMER INTERNSHIP
                      </MenuItem>
                      <MenuItem value={"mtech_intern"}>MTECH INTERN</MenuItem>
                      <MenuItem value={"dream"}>DREAM</MenuItem>
                      <MenuItem value={"core"}>CORE</MenuItem>
                      <MenuItem value={"special"}>SPECIAL</MenuItem>
                    </Select>
                  </FormControl>
                  <LocalizationProvider
                    dateAdapter={AdapterDateFns}
                    style={{ marginBottom: "1rem" }}
                  >
                    <TextField
                      style={{ marginBottom: "1rem" }}
                      id="datetime-local"
                      label="Date"
                      type="datetime-local"
                      focused
                      onChange={handleChangeTextField("date")}
                      value={values.date}
                      sx={{ width: 800, maxWidth: "100%" }}
                    />
                  </LocalizationProvider>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <TextField
                      style={{ marginBottom: "1rem" }}
                      id="datetime-local"
                      label="Deadline"
                      type="datetime-local"
                      focused
                      onChange={handleChangeTextField("deadline")}
                      value={values.deadline}
                      sx={{ width: 800, maxWidth: "100%" }}
                    />
                  </LocalizationProvider>
                  <div>Cutoff</div>
                  <TextField
                    fullWidth
                    label="SSC"
                    id="fullWidth"
                    placeholder="XX.XX"
                    onChange={handleChangeTextField("ssc")}
                    value={values.ssc}
                    style={{ marginBottom: "1rem", marginTop: "1rem" }}
                  />
                  <TextField
                    fullWidth
                    label="HSC"
                    id="fullWidth"
                    placeholder="XX.XX"
                    onChange={handleChangeTextField("hsc")}
                    value={values.hsc}
                    style={{ marginBottom: "1rem" }}
                  />
                  <TextField
                    fullWidth
                    label="UG"
                    id="fullWidth"
                    placeholder="XX.XX"
                    onChange={handleChangeTextField("ug")}
                    value={values.ug}
                    style={{ marginBottom: "1rem" }}
                  />
                  <TextField
                    fullWidth
                    label="PG"
                    id="fullWidth"
                    placeholder="XX.XX/0"
                    onChange={handleChangeTextField("pg")}
                    value={values.pg}
                    style={{ marginBottom: "1rem" }}
                  />
                  <FormControl style={{ marginBottom: "1rem" }} fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Gender
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Category"
                      // value={values.category}
                      defaultValue="" 
                      onChange={handleChangeGender}
                    >
                      <MenuItem value={"M"}>Male</MenuItem>
                      <MenuItem value={"F"}>Female</MenuItem>
                      <MenuItem value={"M,F"}>Both</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">
                      Backlogs
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                      onChange={handleBacklogs}
                      value={values.backlogs}
                    >
                      <FormControlLabel
                        value="1"
                        control={<Radio />}
                        label="Allowed"
                      />
                      <FormControlLabel
                        value="0"
                        control={<Radio />}
                        label="Not Allowed"
                      />
                    </RadioGroup>
                  </FormControl>
                </Box>
              </div>

              <br></br>
              <br></br>

              <div className="header_company">JOB DETAILS</div>
              <br></br>
              <br></br>
              <Box>
              <TextField
                          id="outlined"
                          fullWidth
                          label="Subject"
                          placeholder="Subject"
                          rows={1}
                          
                          onChange={(event)=>setSub1(event.target.value)}
                  value={sub1}
                /><br/><br/>
              <TextField
                          id="outlined"
                          fullWidth
                          label="Email ID"
                          placeholder="Email ID"
                          rows={1}
                          onChange={(event)=>setEmail1(event.target.value)}
                  value={email1}
                />
                <br></br><br></br>
                <TextField
                          id="outlined"
                          fullWidth
                          label="Alternate Email ID"
                          placeholder="Alternate Email ID"
                          rows={1}
                          onChange={(event)=>setEmail2(event.target.value)}
                  value={email2}
                />
                <br></br><br></br>
                <TextField
                  id="outlined-multiline-flexible"
                  fullWidth
                  label="Content"
                  multiline
                  maxRows={6}
                  onChange={(event)=>setContent(event.target.value)}
                  value={content}
                  placeholder="Content"
                  rows={4}
                />
                
                <Button
                  variant="contained"
                  component="label"
                  sx={{ margin: "1rem 0", width: "100%" }}
                >
                  Upload File &nbsp;
                  <input type="file"  onChange={event=>onFileChange1(event)}/>
                </Button>
                <Button
                  variant="contained"
                  component="label"
                  sx={{ margin: "1rem 0", width: "100%" }}
                >
                  Upload File &nbsp;
                  <input type="file"  onChange={event=>onFileChange2(event)}/>
                </Button>
                <Button
                  variant="contained"
                  component="label"
                  sx={{ margin: "1rem 0", width: "100%" }}
                >
                  Upload File &nbsp;
                  <input type="file"  onChange={event=>onFileChange3(event)}/>
                </Button>
              </Box>

              <div
                style={{ width: "100%", display: "flex", alignItems: "center" }}
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
                <Button
                  variant="contained"
                  style={{ margin: "0 auto" }}
                  onClick={(event) => handleAddCompany(event)}
                >
                  Add
                </Button>
              </div>
            </TabPanel>
          </TabContext>
        </Box>
      </Container>
    </div>
  );
}

export default CompanyAdd;
