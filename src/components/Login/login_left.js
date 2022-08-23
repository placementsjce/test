import React from 'react';
import logo from './jss_logo.png';
import './login_left.css'
import plalogo from '../Login/sjce_pla.png';
export default function loginleft(){
    
    
        return (
          <div class="left_text">
            <h2 class='fontl jss1'>JSS MAHAVIDYAPEETHA</h2>
            <h2 class='fontl jss2'>JSS SCIENCE & TECHNOLOGY UNIVERSITY</h2>
            <h2 class='fontl sri'>SRI JAYACHAMARAJENDRA COLLEGE OF ENGINEERING</h2>
            {/* <img src={logo} alt="Logo" width={160} class="logomain"
            /> */}
            <div class="restdetails">
              <h2 class='fontl'>PLACEMENT & TRAINING CELL</h2>
              <img src={plalogo} alt='pla_logo'/>
            </div>
          </div>
        );
      
}