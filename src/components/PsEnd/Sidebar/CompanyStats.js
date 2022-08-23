import React from 'react';
import './Sidebar.css';

function Sidebar() {
  return <div>
      <div className='header_company'>Company Stats</div>
            <div className="upcomingcompanies">
                <div className='eachupcomingcompany'><div className='upcomingcompanyname'>Total Companies</div>:<div>223</div></div>
                <div className='eachupcomingcompany'><div className='upcomingcompanyname'>Companies So Far</div>:<div>142</div></div>
                <div className='eachupcomingcompany'><div className='upcomingcompanyname'>Offers</div>:<div>712</div></div>
                <div className='eachupcomingcompany'><div className='upcomingcompanyname'>Student Placed</div>:<div>572</div></div>
                

            </div>
  </div>;
}

export default Sidebar;
