import React from 'react';
import NavBar from '../common/navbar';
import Footer from '../common/footer';
import {  Container } from 'react-bootstrap';
import Box from "@mui/material/Box";
import {Typography} from "@mui/material";
import CarouselPage1 from "./CarouselPage";


export default function PastRecruiters() {
	return (
		<div>
			<NavBar />
			<div
				className='banner past-recruiters'
				style={{ backgroundImage: `url("/why-sjce/recruitment.png")` }}>
				<h1>PAST RECRUITERS</h1>
			</div>
			<Container style={{ marginTop: '5vh' }}>
				<div class='recruiters' style={{ marginBottom: '7vh' }}>
					<center>
						<p>
							The batch profile consists of students from computer science and
							electronics background. Students at SJCE Mysore throughout
							their graduation and Post-Graduation indulge into various skill
							development programs, internships, training, and cultural as well
							as technical contests. Students have continued to receive
							placement & internship offers from various reputed companies from
							different sectors of the industry.
						</p>
						<Box>
        <Typography
          sx={{
            margin: "0 auto",
            fontSize: "1.6rem",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Our Esteemed Recruiters
        </Typography>
        <br />
        <CarouselPage1 />
      </Box>
					</center>
				</div>
			</Container>
			<Footer />
		</div>
	);
}
