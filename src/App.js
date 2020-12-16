import React, { useState, useEffect } from 'react'
import { FaAngleDoubleRight } from 'react-icons/fa'

const url = 'https://course-api.com/react-tabs-project'

function App() {
	let [loading, setLoading] = useState(true)
	let [jobs, setJobs] = useState([])
	let [value, setValue] = useState(0)

	// data fetching
	let fetchJobs = async () => {
		let response = await fetch(url)
		let newJobs = await response.json()
		setJobs(newJobs)
		setLoading(false)
	}

	useEffect(() => {
		fetchJobs()
	}, [])

	// loading condition
	if (loading) {
		return (
			<section className='section loading'>
				<h1>loading...</h1>
			</section>
		)
	}

	// main section
	let { company, dates, duties, title } = jobs[value]
	return (
		<section className='section'>
			<div className='title'>
				<h2>experience</h2>
				<div className='underline'></div>
			</div>
			<div className='jobs-center'>
				<div className='btn-container'>
					{jobs.map((item, index) => {
						return (
							<button
								key={item.id}
								onClick={() => setValue(index)}
								className={`job-btn ${
									index === value && 'active-btn'
								}`}
							>
								{item.company}
							</button>
						)
					})}
				</div>
				<article className='job-info'>
					<h3>{title}</h3>
					<h4>{company}</h4>
					<p className='job-date'>{dates}</p>
					{duties.map((duty, index) => {
						return (
							<div key={index} className='job-desc'>
								<FaAngleDoubleRight className='job-icon' />
								<p>{duty}</p>
							</div>
						)
					})}
				</article>
			</div>
		</section>
	)
}

export default App
