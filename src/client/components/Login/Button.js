import React from 'react';
import { shallowEqual } from 'helpers/shallowEqual';

class Button extends React.Component {
	shouldComponentUpdate(nextProps) {
		return !shallowEqual(this.props, nextProps);
	}

	render() {
		const { isLogin, showLogin, onClick } = this.props;
		let button;
		let name;

		if (isLogin) {
			name = 'Log In';
		} else {
			name = 'Sign Up';
		}

		if ((showLogin === 1 && isLogin) || (showLogin === 2 && !isLogin)) {
			button = (
				<div className='de-btn-active'>
					<span>{name}</span>
				</div>
			);
		} else {
			button = (
				<div className='de-btn' onClick={onClick} onKeyPress={() => {}} tabIndex='-1' role='button'>
					<span>{name}</span>
				</div>
			);
		}

		return (
			<div>
				{button}
			</div>
		);
	}
}

export default Button;
