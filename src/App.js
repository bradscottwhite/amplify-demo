import logo from './logo.svg';
import './App.css';

import Amplify, { API } from 'aws-amplify'
import React, { useEffect, useState } from 'react'

const myAPI = 'demoapi'
const path = '/customers/'

const App = () => {
	const [ input, setInput ] = useState('')
	const [ customers, setCustomers ] = useState([])

	const getCustomer = e => {
		let customerId = e.input
		API.get(myAPI, path + customerId)
			.then(res => {
				console.log(res)
				let newCustomers = [ ...customers ]
				newCustomers.push(res)
				setCustomers(newCustomers)
			})
			.catch(err => {
				console.log(err)
			})
		setInput('')
	}


	return (
		<div className='App'>
			<h1>Super simple React/AWS app</h1>
			<div>
				<input placeholder='customer id' type='text' value={input} onChange={e => setInput(e.target.value)} />
			</div>
			<br/>
			<button onClick={() => getCustomer({ input })}>
				Get customer from backend
			</button>

			<h2 style={{ visibility: customers.length > 0 ? 'visible' : 'hidden' }}>
				Response
			</h2>
			{
				customers.map((thisCustomer, index) => (
					<div key={thisCustomer.customerId}>
						<span><b>CustomerId:</b> {thisCustomer.customerId} + <b>CustomerName:</b> {thisCustomer.customerName}</span>
					</div>
				))
			}
		</div>
	)
}

export default App;
