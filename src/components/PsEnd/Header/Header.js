import React from 'react';
import logo from '../Login/download.png';
import '../Header/Header.css';

function Header() {
  return <div className='header_whole'>
  
      <div className='header_jss'>
      

        <div className='header_jss'><img src={logo} className='jss_logo' alt="logo"/>JSS MAHAVIDYAPEETHA</div>
        <div className='header_science'>JSS SCIENCE & TECHNOLOGY UNIVERSITY</div>
        <hr/>
        <div className='header_placement'>PLACEMENT & TRAINING CELL</div>
      </div>
  </div>
}

export default Header;
