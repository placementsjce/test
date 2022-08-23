import React from 'react';
import logo from '../Login/sjce_pla.png';
import '../Header/Header.css';

function Header() {
  return <div className='header_whole'>
  
      <div className='header_jss'>
      

        <div className='header_jss'><img src={logo} className='jss_logo' alt="logo"/>TRAINING AND PLACEMENT CELL</div>
        <div className='header_science'>SJCE Mysore</div>
      </div>
  </div>
}

export default Header;
