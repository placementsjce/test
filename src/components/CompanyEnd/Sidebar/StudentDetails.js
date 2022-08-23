import React,{useState} from 'react';
import './Sidebar.css';
import {apiLink} from '../../../mainurl'

function Sidebar() {
  const [totalverify,setTotalVerified]=useState(0);
  fetch(
    apiLink+"stats/download/student/verified",
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
      setTotalVerified(data);
    })

    const [total,setTotal]=useState(0);
    fetch(
      apiLink+"stats/download/student/total",
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
        setTotal(data);
      })
  return <div>
      <div className='header_company'>STUDENT DETAILS</div>
            <div className="upcomingcompanies">
                <div className='eachupcomingcompany'><div className='upcomingcompanyname'>Verified</div>:<div>{totalverify}</div></div>
                <div className='eachupcomingcompany'><div className='upcomingcompanyname'>Total</div>:<div>{total}</div></div>
                
            </div>
  </div>;
}

export default Sidebar;
