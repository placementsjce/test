import React,{useState} from 'react';
import './Sidebar.css';
import {apiLink} from '../../../mainurl'

function Sidebar() {
  const [totalcompno,setTotalcompno]=useState(0);
  fetch(
    apiLink+"stats/download/admin/total_company",
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
      setTotalcompno(data);
    })

    const [compsofar,setcompsofar]=useState(0);
  fetch(
    apiLink+"stats/download/admin/companies_so_far",
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
      setcompsofar(data);
    })
    
    
    const [offers,setoffers]=useState(0);
  fetch(
    apiLink+"stats/download/admin/offers",
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
      setoffers(data);
    })
const [placedcount,setplacedcount]=useState(0);
  fetch(
    apiLink+"stats/download/admin/placed_count",
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
      setplacedcount(data);
    })

  return <div>
      <div className='header_company'>Company Stats</div>
            <div className="upcomingcompanies">
                <div className='eachupcomingcompany'><div className='upcomingcompanyname'>Total Companies</div>:<div>{totalcompno}</div></div>
                <div className='eachupcomingcompany'><div className='upcomingcompanyname'>Companies So Far</div>:<div>{compsofar}</div></div>
                <div className='eachupcomingcompany'><div className='upcomingcompanyname'>Offers</div>:<div>{offers}</div></div>
                <div className='eachupcomingcompany'><div className='upcomingcompanyname'>Student Placed</div>:<div>{placedcount}</div></div>
                

            </div>
  </div>;
}

export default Sidebar;
