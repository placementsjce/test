import React from 'react';
import { useNavigate  } from 'react-router-dom';

const Footer = () => {
	const history = useNavigate();
	return (
		<div className='sjce-footer'>
			<img
				src='/jssstulogo2.jpg'
				className='d-inline-block align-top'
				alt='JSSSTU logo'
				onClick={() => {
					history.push('/');
					window.scrollTo(0, 0);
				}}
			/>

			<div className='footer-content'>
				<h1>Training and Placement Cell</h1>
				<h2>JSS Science And Technology University, Mysore</h2>
				<div className='footer-links'>
					<div
						className='image-wrapper'
						onClick={() =>
							window.open(
								'https://www.linkedin.com/school/jss-science-and-technology-university/',
								'_blank'
							)
						}>
						<img src='/icons/linkedin.svg'></img>
					</div>
					<div
						className='image-wrapper'
						onClick={() =>
							window.open('mailto:placementsjce2022@gmail.com', '_blank')
						}>
						<img src='/icons/envelope.svg'></img>
					</div>
					
				</div>
			</div>
		</div>
	);
};

export default Footer;
