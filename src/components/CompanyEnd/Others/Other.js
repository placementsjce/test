import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
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
import "./Other.css";
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

import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import Stack from "@mui/material/Stack";
import SearchIcon from "@mui/icons-material/Search";
import {apiLink} from '../../../mainurl'

import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import CloseIcon from "@mui/icons-material/Close";

import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";

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
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
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

  const [values, setValues] = useState({
    cname: "",
    category: "summer_internship",
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

  const[content,setContent]=useState('');
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
    fetch(apiLink+"admin/summer_status", {
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
            accept: "application/json",
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
  console.log(totalregiscount?totalregiscount[0]:'hi')
  const [valuesEdit, setValuesEdit] = useState({
    cname: "",
    category: "summer_internship",
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
  const [valuesSummerStudents, setSummerInternStudent] = useState({
    cid: "",
    name: "",
    usn : "",
    branch : "",
    gender : "",
    email : "",
    phone : ""
  });
  const handleClickOpenPlacedStudentDialog = (cid,i) => {
    setNoOfPlace(i)
    setplacedstudentcid(cid)
    valuesSummerStudents.cid=cid
    fetch(
      apiLink+"admin/company/registrations/place_students/placed_students_info" +
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
        setPlacedStudent(data);
        setOpenPlacedStudentDialog(true);
      })

      fetch(
        apiLink+"admin/company/registrations/place_students/Select_students" +
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
                  accept: "application/json",
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

  const handleClosePlacedStudentDialog = () => {
    setOpenPlacedStudentDialog(false);
  };

  const handleChangeTextField = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleChangeSummerInternPlace = (prop) => (event) => {
    setSummerInternStudent({ ...valuesSummerStudents, [prop]: event.target.value });
  };
  const handleChangeDialogTextField = (prop) => (event) => {
    setValuesEdit({ ...valuesEdit, [prop]: event.target.value });
  };

  const [openAddCompanyDialog, setOpenAddCompanyDialog] = useState(false);
  
  const handleClickOpenAddCompanyDialog = (cid, i) => {
    setDialogNo(cid);
    fetch(
      apiLink+"admin/company/registrations/details" +
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
        setValuesEdit(data);
        setOpenAddCompanyDialog(true);
        values.branch='';
      });
  };
  const [selectedFile,setStateFileShort]=useState();




  

  const   handleDownloadDetails = (cid) => {
    fetch(
      apiLink+"stats/download/placed_list/" +
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
        download: 'filename.xlsx',
      }).click();
    });
  };

  
  
  const handlePlaceSummerIntern =()=>{
    console.log(valuesSummerStudents)
    if(valuesSummerStudents.cid===''||valuesSummerStudents.name===''||valuesSummerStudents.usn===''||valuesSummerStudents.branch===''||valuesSummerStudents.gender===''||valuesSummerStudents.email===''||valuesSummerStudents.phone==='')
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
      fetch(
        apiLink+"admin/company/registrations/place_summer_interns/"+valuesSummerStudents.cid+"?name="+valuesSummerStudents.name+"&usn="+valuesSummerStudents.usn+"&branch="+valuesSummerStudents.branch+"&gender="+valuesSummerStudents.gender+"&email="+valuesSummerStudents.email+"&phone="+valuesSummerStudents.phone ,
        {
          method: "POST",
          headers: {
            accept: "application/json",
            Authorization: "Bearer "+localStorage.getItem('access-token')
          },
        }
      )
        .then((response) =>
        {
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
              toast.success(data.message, {
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
        })
        .then((data) => {
          fetch(
            apiLink+"admin/company/registrations/place_students/placed_students_info/cname" +
            placedstudentcid,
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
                placedstudentcid,
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
                  setPlacedStudentStatusCategory(data);
                  fetch(
                    apiLink+"admin/company/registrations/place_students/placed_students_info/cid_name" +
                    placedstudentcid,
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
        })
    }
  }
  const convertstudent=(usn,cid)=>{
    fetch(
      apiLink+"admin/company/registrations/convert/"+cid+"?usn="+usn,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: "Bearer "+localStorage.getItem('access-token')
        },
      }
    )
      .then((response) =>
      {
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
            toast.success(data.message, {
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
      })
      .then((data) => {
        fetch(
          apiLink+"admin/company/registrations/place_students/placed_students_info/cname" +
          placedstudentcid,
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
              placedstudentcid,
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
                setPlacedStudentStatusCategory(data);
                fetch(
                  apiLink+"admin/company/registrations/place_students/placed_students_info/cid_name" +
                  placedstudentcid,
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
      })
  }
  const unplacestudent = (usn,cid) => {
    fetch(
      apiLink+"admin/company/registrations/unplace" + usn+"/"+cid,
      {
        method: "GET",
        headers: {
          accept: "application/json",
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
            accept: "application/json",
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
                placedstudentcid,
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
                  setPlacedStudentStatusCategory(data);
                  fetch(
                    apiLink+"admin/company/registrations/place_students/placed_students_info/cid_name" +
                    placedstudentcid,
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
        })
    })
  }
  const handleCloseAddCompanyDialog = () => {
    setOpenAddCompanyDialog(false);
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
    }
    setCheckCSBS(!checkCSBS);
  } 
  // IS
  const [checkIS, setCheckIS] = useState(false);

  function toggleIS() {
    if (!checkIS) {
      if (values.branch.length === 0) values.branch += "IS";
      else values.branch += ",IS";
    } else {
      values.branch = values.branch.replace(",IS,", ",");
      values.branch = values.branch.replace("IS,", "");
      values.branch = values.branch.replace(",IS", "");
    }
    setCheckIS(!checkIS);
  }
  // ECE
  const [checkECE, setCheckECE] = useState(false);

  function toggleECE() {
    if (!checkECE) {
      if (values.branch.length === 0) values.branch += "EC";
      else values.branch += ",EC";
    } else {
      values.branch = values.branch.replace(",EC,", ",");
      values.branch = values.branch.replace("EC,", "");
      values.branch = values.branch.replace(",EC", "");
    }
    setCheckECE(!checkECE);
  }
  // EEE
  const [checkEEE, setCheckEEE] = useState(false);

  function toggleEEE() {
    if (!checkEEE) {
      if (values.branch.length === 0) values.branch += "EE";
      else values.branch += ",EE";
    } else {
      values.branch = values.branch.replace(",EE,", ",");
      values.branch = values.branch.replace("EE,", "");
      values.branch = values.branch.replace(",EE", "");
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
    }
    setCheckEI(!checkEI);
  }
  // ME
  const [checkME, setCheckME] = useState(false);

  function toggleME() {
    if (!checkME) {
      if (values.branch.length === 0) values.branch += "ME";
      else values.branch += ",ME";
    } else {
      values.branch = values.branch.replace(",ME,", ",");
      values.branch = values.branch.replace("ME,", "");
      values.branch = values.branch.replace(",ME", "");
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
    }
    setCheckPS(!checkPS);
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
    }
    setCheckBT(!checkBT);
  }
  // EV
  const [checkEV, setCheckEV] = useState(false);

  function toggleEV() {
    if (!checkEV) {
      if (values.branch.length === 0) values.branch += "EV";
      else values.branch += ",EV";
    } else {
      values.branch = values.branch.replace(",EV,", ",");
      values.branch = values.branch.replace("EV,", "");
      values.branch = values.branch.replace(",EV", "");
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
    }
    setCheckMSC(!checkMSC);
  }
  // BSC
  const [checkBSC, setCheckBSC] = useState(false);

  function toggleBSC() {
    if (!checkBSC) {
      if (values.branch.length === 0) values.branch += "BSC";
      else values.branch += ",BSC";
    } else {
      values.branch = values.branch.replace(",BSC,", ",");
      values.branch = values.branch.replace("BSC,", "");
      values.branch = values.branch.replace(",BSC", "");
    }
    setCheckBSC(!checkBSC);
  }
  // MBA
  const [checkMBA, setCheckMBA] = useState(false);

  function toggleMBA() {
    if (!checkMBA) {
      if (values.branch.length === 0) values.branch += "MBA";
      else values.branch += ",MBA";
    } else {
      values.branch = values.branch.replace(",MBA,", ",");
      values.branch = values.branch.replace("MBA,", "");
      values.branch = values.branch.replace(",MBA", "");
    }
    setCheckMBA(!checkMBA);
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
    }
    setCheckMCA(!checkMCA);
  }
  // CE
  const [checkCE, setCheckCE] = useState(false);

  function toggleCE() {
    if (!checkCE) {
      if (values.branch.length === 0) values.branch += "CE";
      else values.branch += ",CE";
    } else {
      values.branch = values.branch.replace(",CE,", ",");
      values.branch = values.branch.replace("CE,", "");
      values.branch = values.branch.replace(",CE", "");
    }
    setCheckCE(!checkCE);
  }
  // SE
  const [checkSE, setCheckSE] = useState(false);

  function toggleSE() {
    if (!checkSE) {
      if (values.branch.length === 0) values.branch += "SE";
      else values.branch += ",SE";
    } else {
      values.branch = values.branch.replace(",SE,", ",");
      values.branch = values.branch.replace("SE,", "");
      values.branch = values.branch.replace(",SE", "");
    }
    setCheckSE(!checkSE);
  }
  // MBAF
  const [checkMBAF, setCheckMBAF] = useState(false);

  function toggleMBAF() {
    if (!checkMBAF) {
      if (values.branch.length === 0) values.branch += "MBAF";
      else values.branch += ",MBAF";
    } else {
      values.branch = values.branch.replace(",MBAF,", ",");
      values.branch = values.branch.replace("MBAF,", "");
      values.branch = values.branch.replace(",MBAF", "");
    }
    setCheckMBAF(!checkMBAF);
  }
  // MBAM
  const [checkMBAM, setCheckMBAM] = useState(false);

  function toggleMBAM() {
    if (!checkMBAM) {
      if (values.branch.length === 0) values.branch += "MBAM";
      else values.branch += ",MBAM";
    } else {
      values.branch = values.branch.replace(",MBAM,", ",");
      values.branch = values.branch.replace("MBAM,", "");
      values.branch = values.branch.replace(",MBAM", "");
    }
    setCheckMBAM(!checkMBAM);
  }
  // MBHR
  const [checkMBAHR, setCheckMBAHR] = useState(false);

  function toggleMBAHR() {
    if (!checkMBAHR) {
      if (values.branch.length === 0) values.branch += "MBAHR";
      else values.branch += ",MBAHR";
    } else {
      values.branch = values.branch.replace(",MBAHR,", ",");
      values.branch = values.branch.replace("MBAHR,", "");
      values.branch = values.branch.replace(",MBAHR", "");
    }
    setCheckMBAHR(!checkMBAHR);
  }
  // DS
  const [checkDS, setCheckDS] = useState(false);

  function toggleDS() {
    if (!checkDS) {
      if (values.branch.length === 0) values.branch += "DS";
      else values.branch += ",DS";
    } else {
      values.branch = values.branch.replace(",DS,", ",");
      values.branch = values.branch.replace("DS,", "");
      values.branch = values.branch.replace(",DS", "");
    }
    setCheckDS(!checkDS);
  }
  // CF
  const [checkCF, setCheckCF] = useState(false);

  function toggleCF() {
    if (!checkCF) {
      if (values.branch.length === 0) values.branch += "CF";
      else values.branch += ",CF";
    } else {
      values.branch = values.branch.replace(",CF,", ",");
      values.branch = values.branch.replace("CF,", "");
      values.branch = values.branch.replace(",CF", "");
    }
    setCheckCF(!checkCF);
  }
  // RM
  const [checkRM, setCheckRM] = useState(false);

  function toggleRM() {
    if (!checkRM) {
      if (values.branch.length === 0) values.branch += "RM";
      else values.branch += ",RM";
    } else {
      values.branch = values.branch.replace(",RM,", ",");
      values.branch = values.branch.replace("RM,", "");
      values.branch = values.branch.replace(",RM", "");
    }
    setCheckRM(!checkRM);
  }
  // DM
  const [checkDM, setCheckDM] = useState(false);

  function toggleDM() {
    if (!checkDM) {
      if (values.branch.length === 0) values.branch += "DM";
      else values.branch += ",DM";
    } else {
      values.branch = values.branch.replace(",DM,", ",");
      values.branch = values.branch.replace("DM,", "");
      values.branch = values.branch.replace(",DM", "");
    }
    setCheckDM(!checkDM);
  }
  // BSP
  const [checkBSP, setCheckBSP] = useState(false);

  function toggleBSP() {
    if (!checkBSP) {
      if (values.branch.length === 0) values.branch += "BSP";
      else values.branch += ",BSP";
    } else {
      values.branch = values.branch.replace(",BSP,", ",");
      values.branch = values.branch.replace("BSP,", "");
      values.branch = values.branch.replace(",BSP", "");
    }
    setCheckBSP(!checkBSP);
  }
  // IE
  const [checkIE, setCheckIE] = useState(false);

  function toggleIE() {
    if (!checkIE) {
      if (values.branch.length === 0) values.branch += "IE";
      else values.branch += ",IE";
    } else {
      values.branch = values.branch.replace(",IE,", ",");
      values.branch = values.branch.replace("IE,", "");
      values.branch = values.branch.replace(",IE", "");
    }
    setCheckIE(!checkIE);
  }
  // NIE
  const [checkNIE, setCheckNIE] = useState(false);

  function toggleNIE() {
    if (!checkNIE) {
      if (values.branch.length === 0) values.branch += "NIE";
      else values.branch += ",NIE";
    } else {
      values.branch = values.branch.replace(",NIE,", ",");
      values.branch = values.branch.replace("NIE,", "");
      values.branch = values.branch.replace(",NIE", "");
    }
    setCheckNIE(!checkNIE);
  }
  // PSP
  const [checkPSP, setCheckPSP] = useState(false);

  function togglePSP() {
    if (!checkPSP) {
      if (values.branch.length === 0) values.branch += "PSP";
      else values.branch += ",PSP";
    } else {
      values.branch = values.branch.replace(",PSP,", ",");
      values.branch = values.branch.replace("PSP,", "");
      values.branch = values.branch.replace(",PSP", "");
    }
    setCheckPSP(!checkPSP);
  }
  // MEP
  const [checkMEP, setCheckMEP] = useState(false);

  function toggleMEP() {
    if (!checkMEP) {
      if (values.branch.length === 0) values.branch += "MEP";
      else values.branch += ",MEP";
    } else {
      values.branch = values.branch.replace(",MEP,", ",");
      values.branch = values.branch.replace("MEP,", "");
      values.branch = values.branch.replace(",MEP", "");
    }
    setCheckMEP(!checkMEP);
  }
  // ESM
  const [checkESM, setCheckESM] = useState(false);

  function toggleESM() {
    if (!checkESM) {
      if (values.branch.length === 0) values.branch += "ESM";
      else values.branch += ",ESM";
    } else {
      values.branch = values.branch.replace(",ESM,", ",");
      values.branch = values.branch.replace("ESM,", "");
      values.branch = values.branch.replace(",ESM", "");
    }
    setCheckESM(!checkESM);
  }

  // IEM
  const [checkIEM, setCheckIEM] = useState(false);

  function toggleIEM() {
    if (!checkIEM) {
      if (values.branch.length === 0) values.branch += "IEM";
      else values.branch += ",IEM";
    } else {
      values.branch = values.branch.replace(",IEM,", ",");
      values.branch = values.branch.replace("IEM,", "");
      values.branch = values.branch.replace(",IEM", "");
    }
    setCheckIEM(!checkIEM);
  }
  // AE
  const [checkAE, setCheckAE] = useState(false);

  function toggleAE() {
    if (!checkAE) {
      if (values.branch.length === 0) values.branch += "AE";
      else values.branch += ",AE";
    } else {
      values.branch = values.branch.replace(",AE,", ",");
      values.branch = values.branch.replace("AE,", "");
      values.branch = values.branch.replace(",AE", "");
    }
    setCheckAE(!checkAE);
  }
  // ISP
  const [checkISP, setCheckISP] = useState(false);

  function toggleISP() {
    if (!checkISP) {
      if (values.branch.length === 0) values.branch += "ISP";
      else values.branch += ",ISP";
    } else {
      values.branch = values.branch.replace(",ISP,", ",");
      values.branch = values.branch.replace("ISP,", "");
      values.branch = values.branch.replace(",ISP", "");
    }
    setCheckISP(!checkISP);
  }

  // HSWT
  const [checkHSWT, setCheckHSWT] = useState(false);

  function toggleHSWT() {
    if (!checkHSWT) {
      if (values.branch.length === 0) values.branch += "HSWT";
      else values.branch += ",HSWT";
    } else {
      values.branch = values.branch.replace(",HSWT,", ",");
      values.branch = values.branch.replace("HSWT,", "");
      values.branch = values.branch.replace(",HSWT", "");
    }
    setCheckHSWT(!checkHSWT);
  }
  // EP
  const [checkEP, setCheckEP] = useState(false);

  function toggleEP() {
    if (!checkEP) {
      if (values.branch.length === 0) values.branch += "EP";
      else values.branch += ",EP";
    } else {
      values.branch = values.branch.replace(",EP,", ",");
      values.branch = values.branch.replace("EP,", "");
      values.branch = values.branch.replace(",EP", "");
    }
    setCheckEP(!checkEP);
  }
  // MS
  const [checkMS, setCheckMS] = useState(false);

  function toggleMS() {
    if (!checkMS) {
      if (values.branch.length === 0) values.branch += "MS";
      else values.branch += ",MS";
    } else {
      values.branch = values.branch.replace(",MS,", ",");
      values.branch = values.branch.replace("MS,", "");
      values.branch = values.branch.replace(",MS", "");
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
    valuesEdit.branch = values.branch;
    console.log(valuesEdit)
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
    valuesEdit.package = parseInt(valuesEdit.package);
    valuesEdit.backlogs = parseInt(valuesEdit.backlogs);
    valuesEdit.status = parseInt(valuesEdit.status);
    valuesEdit.branch = values.branch;
    const data = JSON.stringify(valuesEdit);
    fetch(
      apiLink+"admin/company/edit_company/" +
        dialogno,
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
          formdata.append("body", content)
          formdata.append("", "\\")
          formdata.append("email",email1)
          formdata.append("", "\\")
          formdata.append("email2",email2===undefined?"":email2)
          fetch(apiLink+"auth/auth/update_send_file", {
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
                accept: "application/json",
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
          fetch(apiLink+"admin/summer_status", {
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
                  accept: "application/json",
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
    values.package = parseInt(values.package);
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
              formdata.append("body", content)
              formdata.append("", "\\")
              formdata.append("email",email1)
              formdata.append("", "\\")
              formdata.append("email2",email2===undefined?"":email2)
              fetch(apiLink+"auth/auth/send_file", {
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
        fetch(apiLink+"admin/summer_status", {
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
            accept: "application/json",
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
    }
  };

  // setTotalRegis()
  const startReg = (cid) => {
    fetch(
      apiLink+"admin/company/registrations/StartRegistrations" +
        cid,
      {
        method: "POST",
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
        fetch(apiLink+"admin/summer_status", {
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
            accept: "application/json",
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

  const endreg = (cid) => {
    fetch(
      apiLink+"admin/company/registrations/EndRegistrations" +
        cid,
      {
        method: "POST",
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
        fetch(apiLink+"admin/summer_status", {
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
            accept: "application/json",
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

  const endpro = (cid) => {
    fetch(
      apiLink+"admin/company/registrations/EndProcess" +
        cid,
      {
        method: "POST",
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
        fetch(apiLink+"admin/summer_status", {
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
            accept: "application/json",
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
            <br />
            <TextField
                        fullWidth
                        label="Cid"
                        id="fullWidth"
                        onChange={handleChangeSummerInternPlace("cid")}
                        value={valuesSummerStudents.cid}
                        style={{ marginBottom: "1rem" }}
                        disabled
                      />
                       <TextField
                        fullWidth
                        label="Name"
                        id="fullWidth"
                        onChange={handleChangeSummerInternPlace("name")}
                        value={valuesSummerStudents.name}
                        style={{ marginBottom: "1rem" }}
                      />
                       <TextField
                        fullWidth
                        label="USN"
                        id="fullWidth"
                        onChange={handleChangeSummerInternPlace("usn")}
                        value={valuesSummerStudents.usn}
                        style={{ marginBottom: "1rem" }}
                      />
                       <TextField
                        fullWidth
                        label="Branch"
                        id="fullWidth"
                        onChange={handleChangeSummerInternPlace("branch")}
                        value={valuesSummerStudents.branch}
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

                          onChange={handleChangeSummerInternPlace("gender")}
                          value={valuesSummerStudents.gender}
                        >
                          <MenuItem value={"M"}>Male</MenuItem>
                          <MenuItem value={"F"}>Female</MenuItem>
                        </Select>
                      </FormControl>
                       <TextField
                        fullWidth
                        label="Email"
                        id="fullWidth"
                        onChange={handleChangeSummerInternPlace("email")}
                        value={valuesSummerStudents.email}
                        style={{ marginBottom: "1rem" }}
                      />
                       <TextField
                        fullWidth
                        label="Phone"
                        id="fullWidth"
                        onChange={handleChangeSummerInternPlace("phone")}
                        value={valuesSummerStudents.phone}
                        style={{ marginBottom: "1rem" }}
                      />

                      <br/>
                      <br/>

              <Button
                variant="contained"
                sx={{ width: "8rem", margin: "0 auto", height: "3rem" }}
                size="small"
                onClick={ () => {handlePlaceSummerIntern()}}
              >
                Add
              </Button>
              
              <FormControl>
              {/* <FormHelperText>You can display an error</FormHelperText> */}
            <br />
            <br />
              
              
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
                         <TableCell align="center">Convert</TableCell>
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
                            <TableCell align="center"><Button
                              variant="contained"
                              color="success"
                              sx={{ width: "8rem", margin: "0 auto", height: "3rem" }}
                              size="small"
                              onClick={() => {convertstudent(row.usn,unplacecid?unplacecid[i][j]:null)}}
                            >
                              Convert
                            </Button>
                            </TableCell>
                        </TableRow>
                      ))
                    })}
                      
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
        <Box sx={{ width: "25%", margin: "0 2rem" }}>
          <CompanyStats />
          <hr />
          <OnCampus />
        </Box>

        <Box sx={{ width: "75%", margin: "0 2rem" }}>
          <div className="header_company">SUMMER INTERNSHIP</div>
          <TabContext value={value}>
            <Box
              sx={{ bgcolor: "background.paper" }}
              style={{ padding: "1rem" }}
            >
              <Tabs value={value} onChange={handleChange} centered>
                <Tab label="Registrations" value="1" />
                {/* <Tab label="Add Company" value="2" /> */}
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
                                flexShrink: 1,
                              }}
                            >
                              {oncamp.item.cname}
                            </Typography>
                            <Stack direction="row" spacing={2}>
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
                                  sx={{ height: "40px", width: "100%" }}
                                  color="success"
                                >
                                  Process Complete{" "}
                                </Button>
                              ) : null}

                              <Button
                                variant="contained"
                                sx={{ height: "40px" }}
                                varient="outlined"
                              >
                                Details
                              </Button>
                            </Stack>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Typography>
                              <div className="detailscomapny">
                                <div>
                                  <Stack direction="row" spacing={1}>
                                    <IconButton
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
                                  {oncamp.item.date}
                                </div>
                                <div>
                                  <strong>Fulltime CTC:</strong>
                                  {oncamp.item.package}
                                </div>
                                <div>
                                  <strong>Deadline:</strong>
                                  {oncamp.item.deadline}
                                </div>
                                <div>
                                  <strong>Internship Stipend:</strong>
                                  {oncamp.item.internship_stipend}
                                </div>
                                <div>
                                  <strong>Backlogs Allowed:</strong>
                                  {oncamp.item.backlogs}
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
                                  sx={{ height: "40px", width: "100%" }}
                                  color="success"
                                >
                                  Process Complete{" "}
                                </Button>
                              ) : null}

                              <Button
                                variant="contained"
                                sx={{ height: "40px" }}
                                varient="outlined"
                              >
                                Details
                              </Button>
                            </Stack>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Typography>
                              <div className="detailscomapny">
                                <div>
                                  <Stack direction="row" spacing={1}>
                                    <IconButton
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
                                  {oncamp.date}
                                </div>
                                <div>
                                  <strong>Fulltime CTC:</strong>
                                  {oncamp.package}
                                </div>
                                <div>
                                  <strong>Deadline:</strong>
                                  {oncamp.deadline}
                                </div>
                                <div>
                                  <strong>Internship Stipend:</strong>
                                  {oncamp.internship_stipend}
                                </div>
                                <div>
                                  <strong>Backlogs Allowed:</strong>
                                  {oncamp.backlogs}
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
                        label="Internship Stipend"
                        id="fullWidth"
                        onChange={handleChangeDialogTextField(
                          "internship_stipend"
                        )}
                        defaultValue={valuesEdit.internship_stipend}
                        style={{ marginBottom: "1rem" }}
                      />
                      Branches - Select Branches Again
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
                        <FormControlLabel
                          control={<Checkbox onChange={toggleMCA} />}
                          label="MCA"
                        />
                        <FormControlLabel
                          control={<Checkbox onChange={toggleMBA} />}
                          label="MBA"
                        />
                        <FormControlLabel
                          control={<Checkbox onChange={toggleBSC} />}
                          label="BSC"
                        />
                        <FormControlLabel
                          control={<Checkbox onChange={toggleMSC} />}
                          label="MSC"
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
                          control={<Checkbox onChange={togglePSP} />}
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
                          label="MBA - Marketinge"
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
                      </FormGroup>
                      <TextField
                    fullWidth
                    label="Category"
                    id="fullWidth"
                    value={"SUMMER INTERNSHIP"}
                    style={{ marginBottom: "1rem", marginTop: "1rem" }}
                  />
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
                    <FormControlLabel
                      control={<Checkbox onChange={toggleMCA} />}
                      label="MCA"
                    />
                    <FormControlLabel
                      control={<Checkbox onChange={toggleMBA} />}
                      label="MBA"
                    />
                    <FormControlLabel
                      control={<Checkbox onChange={toggleBSC} />}
                      label="BSC"
                    />
                    <FormControlLabel
                      control={<Checkbox onChange={toggleMSC} />}
                      label="MSC"
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
                      control={<Checkbox onChange={togglePS} />}
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
                      label="MBA - Marketinge"
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
                  </FormGroup>
                   <TextField
                    fullWidth
                    label="Category"
                    id="fullWidth"
                    value={"SUMMER INTERNSHIP"}
                    style={{ marginBottom: "1rem", marginTop: "1rem" }}
                  />
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
