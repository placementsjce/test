import React from 'react';
import Navbar from '../common/navbar';
import Footer from '../common/footer';
import { Carousel, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home = () => {
	return (
		<div className='home'>
			<Navbar />
			<Carousel>
				<Carousel.Item>
					<img
						className='d-block w-100'
						src='/campus/admin.jpg'
						alt='First '
					/>

					<Carousel.Caption></Carousel.Caption>
				</Carousel.Item>
				<Carousel.Item>
					<img
						className='d-block w-100'
						src='/campus/goldenjublee.JPG'
						alt='Second'
					/>

					<Carousel.Caption></Carousel.Caption>
				</Carousel.Item>
				<Carousel.Item>
					<img
						className='d-block w-100'
						src='/campus/library.jpeg'
						alt='Third '
					/>

					<Carousel.Caption></Carousel.Caption>
				</Carousel.Item>
				<Carousel.Item>
					<img
						className='d-block w-100'
						src='/campus/openair.JPG'
						alt='Third'
					/>

					<Carousel.Caption></Carousel.Caption>
				</Carousel.Item>
			</Carousel>
			<section
				className='aboutSJCE container-fluid'
				style={{ backgroundImage: `url("/campus/bloom.jpg")` }}>
				<div className='container'>
					<div className='text'>
						<h1>Our Campus</h1>
						<p>
						JSS STU University is built on a strong reputation of SJCE, Mysuru, and passionately committed for providing 
						education in Science, Technology, Engineering & Mathematics (STEM) and Management. It is Steadfast to find 
						solutions to some of the great challenges of our time through scientific research and technological innovations.
						 
						</p>
						{/* <p>The foundation Stone of this campus was laid by the Honorable Chief Minister of Delhi Mrs. Sheila Dixit on 24th May 2006. The campus was built in a record time of 18 months by the Public Works Department (PWD). The students have access to all facilities like Centralized Air-Conditioned Labs, well-equipped Library, Student Study Center, RO System, lush green playground, and Rain harvesting system.</p> */}
						<p>
						The institution also has the reputation of academic excellence in professionally oriented programs, and equal
						 proficiency in extra-curricular activities, which makes it a lucrative option for students from all over the country, 
						 especially those staying in remote places eyeing at Science and Engineering career.
						</p>
						<p>
						Education has always been India’s prime priority. Mysuru is the holy land for educational institutions.
						 Education is the basic necessity for wellbeing and development of a Nation. A well-established higher
						  education system forms the flagship for transforming to meet the global needs. Yet, a large chunk of people
						   in India need literacy and many more need to acquire employable skills to suit the emerging modern India.
						</p>

						<Link
							to='/about-us'
							onClick={() => window.scrollTo(0, 0)}
							className='redirect-btn'>
							Learn more
						</Link>
					</div>
					<div className='about-img'>
						<img
							// className="d-block"
							src='/campus/goldenjublee.JPG'
							alt='Campus'
						/>
					</div>
				</div>
			</section>
			<section className='whySJCE container'>
				<h1>Why SJCE ?</h1>
				<div className='f-row'>
					<div className='f-col'>
						<div className='image-wrapper'>
							<img src='/icons/courses.svg' />
						</div>

						<div>
							<h2>Courses Offered</h2>
							<p>
								SJCE offers courses at the undergraduate and
								Graduate level in streams of Engineering and Technology.
							</p>
							<p>
								The institute is well known for offering traditional B.Tech and
								M.Tech Programs in domains of Computer Science and Electronics.
							</p>
							<p>
								SJCE has now introduced innovative and popular
								Undergraduate courses such as Computer Science and Bussiness Systems (CSBS).
							</p>

							<Link
								to='/about-us'
								onClick={() => window.scrollTo(0, 0)}
								className='learn'>
								Learn more
							</Link>
						</div>
					</div>
					<div className='f-col'>
						<div className='image-wrapper'>
							<img src='/icons/alumni.svg' />
						</div>

						<div>
							<h2>Our Alumni</h2>
							<p>
								From Amazon to Microsoft, our alumni have marked
								their presence in the innovative world. At SJCE,
								we're defining our future while still being committed to
								excellence. Our mission shapes our vision. But our alumni make
								that vision a reality. They ensure our students’ success and
								help us forge a bold new chapter in our extraordinary story
								creating a better world together.
							</p>
							<Link
								to='/about-us'
								onClick={() => window.scrollTo(0, 0)}
								className='learn'>
								Learn more
							</Link>
						</div>
					</div>
				</div>
				<div className='f-row'>
					<div className='f-col'>
						<div className='image-wrapper'>
							<img src='/icons/societies.svg' />
						</div>

						<div>
							<h2>Societies and Events</h2>
							<p>
								Culture is intricately interwoven into life at SJCE.
								Extracurricular activities provide a setting to become involved
								and to interact with other students, thus leading to increased
								learning and inclusive development.
							</p>
							<p>
								Here, when people lead a busy life, the multifarious clubs bring
								a breeze of happiness, relaxation, pleasure, and many joyous
								moments.
							</p>
							<Link
								to='/about-us'
								onClick={() => window.scrollTo(0, 0)}
								className='learn'>
								Learn more
							</Link>
						</div>
					</div>
					<div className='f-col'>
						<div className='image-wrapper'>
							<img src='/icons/recruiters.svg' />
						</div>
						<div>
							<h2>Past Recruiters</h2>
							<p>
								The batch profile consists of students from computer science and
								electronics background. Students at SJCE throughout
								their graduation and Post-Graduation indulge into various skill
								development programs, internships, training, and cultural as
								well as technical contests. Students have continued to receive
								placement & internship offers from various reputed companies
								from different sectors of the industry.
							</p>
							<Link
								to='/past-recruiters'
								onClick={() => window.scrollTo(0, 0)}
								className='learn'>
								Learn more
							</Link>
						</div>
					</div>
				</div>
			</section>
			<Footer />
		</div>
	);
};

export default Home;
