import React from 'react';
import { Link } from 'react-router-dom';

const NoMatch = () => (
	<div>
		<div
			style={{
				color: '#9290ff',
				textAlign: 'center',
				margin: '50px'
			}}
		>
			<h1 style={{ fontSize: '64px' }} >404</h1>
			<h3>&#x00af;&#x005c;&#x005f;&#x0028;&#x30c4;&#x0029;&#x005f;&#x002f;&#x00af;</h3>
		</div>
		<Link
			to='/'
			style={{
				display: 'block',
				color: 'white',
				backgroundColor: '#9290ff',
				width: '100px',
				textAlign: 'center',
				padding: '10px',
				borderRadius: '5px',
				margin: 'auto',
				textDecoration: 'none'
			}}
		>
			Home
		</Link>
	</div>
);

export default NoMatch;
