import React,{useEffect, useState} from 'react';
import Navbar from '../common/navbar';
import Footer from '../common/footer';
import { Form, Button } from 'react-bootstrap';
import emailjs from '@emailjs/browser';


const ContactUs = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [message, setMessage] = useState('');
	const [success, setSuccess] = useState('');
	const [error, setError] = useState('');

	useEffect(() => {
		emailjs.init('zmxtLJK_mxc708L5m');
	}, [])
	
	return (
		<div className='contact-us'>
			<Navbar />
			<div
				className='heading'
				style={{ backgroundImage: `url("/contact-us/bg.png")` }}>
				<h1>Contact Us</h1>
			</div>
			<div className='content container'>
				<div className='address'>
					<img src='/icons/address.svg' alt='' />
					<h2>Our Address</h2>
					<p>Placement Cell SJCE Mysore</p>
				</div>
				<div className='email'>
					<img src='/icons/email.svg' alt='' />
					<h2>Email Us</h2>
					<p>
						<a
							href='mailto:placement@sjce.ac.in'
							target='_blank'
							rel='noreferrer'>
							placement@sjce.ac.in
						</a>
					</p>
					{/* <p>
						<a
							href='mailto:placementsjce2022@gmail.com'
							target='_blank'
							rel='noreferrer'>
							placement@sjce.ac.in
						</a>
					</p> */}
				</div>
				<div className='call'>
					<img src='/icons/call.svg' alt='' />
					<h2>Call Us</h2>
					<a href='tel:+91xxxxxxxxxx'>+91 xxxxxxxxxx</a>
				</div>
				<div
					className='linkedin'
					onClick={() =>
						window.open(
							'https://www.linkedin.com/in/pradeep-manjunath-a531359/',
							'_blank'
						)
					}>
					<img src='/icons/linkedin.svg' alt='' />
					<h2>LinkedIn</h2>
				</div>
			</div>
			<div className='email-form container'>
				<h2>Get in touch</h2>
				<Form
					onSubmit={async event => {
						event.preventDefault();
						setSuccess('');
						setEmail('');

						try {
							await emailjs.send('service_7m09m9f', 'template_58z2oo8', {
								from_name: name,
								from_email: email,
								reply_to: 'placementsjce2022@gmail.com',
								message: message,
							});
							setSuccess("We've received your email!");
							setEmail('');
							setName('');
							setMessage('');
						} catch (ex) {
							setError('An error occurred, please try again!'+ex);
						}
					}}>
					<Form.Group controlId='name'>
						<Form.Label>Name</Form.Label>
						<Form.Control
							value={name}
							onChange={e => setName(e.currentTarget.value)}
							type='text'
							placeholder='Enter name'
							required
						/>
					</Form.Group>
					<Form.Group controlId='formBasicEmail'>
						<Form.Label>Email address</Form.Label>
						<Form.Control
							value={email}
							onChange={e => setEmail(e.currentTarget.value)}
							type='email'
							placeholder='Enter email'
							required
						/>
					</Form.Group>

					<Form.Group controlId='message'>
						<Form.Label>Message</Form.Label>
						<Form.Control
							value={message}
							onChange={e => setMessage(e.currentTarget.value)}
							as='textarea'
							rows={3}
							required
						/>
					</Form.Group>
					{success && <p className='success'>{success}</p>}
					{error && <p className='error'>{error}</p>}

					<Button variant='success' type='submit'>
						Submit
					</Button>
				</Form>
			</div>
			<div className='map container'>
				<iframe
					src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3898.0373525747245!2d76.6112378141217!3d12.313271491290186!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baf7ae94fffffff%3A0x1ad797cbfc78d07a!2sJSS%20Science%20and%20Technology%20University%2C%20Mysuru.!5e0!3m2!1sen!2sin!4v1651440939595!5m2!1sen!2sin'
					allowFullScreen={true}
					loading='lazy'
					title='Placement Cell JSSSTU'
				/>
			</div>
			<Footer />
		</div>
	);
};

export default ContactUs;
