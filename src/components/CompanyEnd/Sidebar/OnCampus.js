import React, { useState,useEffect } from 'react';
import './Sidebar.css';
import {apiLink} from '../../../mainurl'

function Sidebar() {

const [oncampus,setOnCampus]=useState([{}]);
useEffect(() => {
  fetch(apiLink+"student/home/upcoming_companies" , {
    method: 'GET',
    headers: {
        'accept': 'application/json',
        Authorization: "Bearer "+localStorage.getItem('access-token')
    }
  }).then(response => response.json())
  .then(data => {
    setOnCampus(data)
  })
},[]);


  return <div>
      <div className='header_company'>ON CAMPUS</div>
            <div className="upcomingcompanies">
            {oncampus?.map(function(oncamp) {return<><div className='eachupcomingcompany'><div className='upcomingcompanyname'>{oncamp.cname}</div>:<div className='datea'>{oncamp?.date?.slice(0,10)?.split('-')?.reverse()?.join('-')}</div></div></>})}
            </div>
  </div>;
}

export default Sidebar;
