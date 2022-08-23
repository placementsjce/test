import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import React from "react";
import Home from './components/home';
import AboutUs from './components/aboutUs';
import PastRecruiters from './components/whySjce/PastRecruiters';
import Process from './components/process';
import Downloads from './components/downloads';
import Administration from './components/team/administration';
import CurrentTeam from './components/team/currentTeam';
import ContactUs from './components/contactUs';
import NotFound from './components/common/notFound';

import StudentWhole from "./components/StudentEnd/StudentWhole/StudentWhole";
import StudentWhole3rdyear from "./components/summerinternship/StudentWhole/StudentWhole";
import CompanyWhole from "./components/CompanyEnd/CompanyWhole/CompanyWhole";
import Ps from "./components/PsEnd/PsWhole/PsWhole";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/company" element={<CompanyWhole />}></Route>
        <Route path="/student" element={<StudentWhole />}></Route>
        <Route path="/thirdyear" element={<StudentWhole3rdyear />}></Route>
        <Route path="/ps" element={<Ps />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/" element={<Home />}></Route>

        <Route path='/about-us' element={<AboutUs />}></Route>
        {/* <Route path='/why-nsut/courses-offered' element={<CoursesOffered />}></Route> */}
        <Route path='/past-recruiters' element={<PastRecruiters />}></Route>
        {/* <Route path='/why-nsut/our-societies' element={<Societies />}></Route> */}
        <Route path='/process' element={<Process />}></Route>
        <Route path='/downloads' element={<Downloads />}></Route>
        <Route path='/team/administration' element={<Administration />}></Route>
        <Route path='/team/current' element={<CurrentTeam />}></Route>
        <Route path='/contact-us' element={<ContactUs />}></Route>
        <Route path='/not-found' element={<NotFound />}></Route>

      </Routes>
    </Router>
  );
}

export default App;
