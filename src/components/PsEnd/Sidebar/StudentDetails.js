import React from 'react';
import './Sidebar.css';

function Sidebar() {
  return <div>
      <div className='header_company'>STUDENT DETAILS</div>
            <div className="upcomingcompanies">
                <div className='eachupcomingcompany'><div className='upcomingcompanyname'>Verified</div>:<div>1400</div></div>
                <div className='eachupcomingcompany'><div className='upcomingcompanyname'>Total</div>:<div>800</div></div>
                
            </div>
  </div>;
}

export default Sidebar;
