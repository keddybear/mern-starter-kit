import React from 'react';
import { Redirect } from 'react-router-dom';
import { shallowEqual } from 'helpers/shallowEqual';

import Button from './Button';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import NotImplemented from './NotImplemented';

class App extends React.Component {
	constructor(props) {
		super(props);
		const { location, history } = this.props;

		this.appPath = location.pathname;
		this.unlisten = history.listen((currLocation, action) => {
			if (action === 'POP' && currLocation.pathname === this.appPath) {
				if (currLocation.state) {
					this.setState(currLocation.state);
				} else {
					this.setState({ display: 1 });
				}
			}
		});
		this.redirect = (location.state && location.state.referrer) || '/welcome';

		this.state = { display: 1 };
		if (history.action === 'POP' && location.pathname === this.appPath) {
			this.state = location.state || this.state;
		}

		this.setDisplay = (i) => {
			// 1: Login, 2: Signup, 3: Recovery
			if (this.state.display !== i) {
				history.push({
					pathname: '/',
					state: { display: i }
				});
				this.setState({ display: i });
			}
		};
		this.toLogin = () => this.setDisplay(1);
		this.toSignup = () => this.setDisplay(2);
		this.toRecover = () => this.setDisplay(3);
	}

	shouldComponentUpdate(nextProps, nextState) {
		return !(this.state === nextState) ||
		!shallowEqual(this.props, nextProps, ['location', 'history']);
	}

	componentWillUnmount() {
		this.unlisten();
	}

	render() {
		if (this.props.global.auth.level > 0) {
			return <Redirect to={this.redirect} />;
		}

		const { global } = this.props;
		let form;

		if (this.state.display === 1) {
			form = <LoginForm toRecover={this.toRecover} global={global} />;
		} else if (this.state.display === 2) {
			form = <SignupForm global={global} />;
		} else if (this.state.display === 3) {
			form = <NotImplemented />; // Should be password recovery form
		}

		return (
			<div>
				<div className='rblock login-ops'>
					<div className='col-abs-6'>
						<Button isLogin showLogin={this.state.display} onClick={this.toLogin} />
					</div>
					<div className='col-abs-6'>
						<Button isLogin={false} showLogin={this.state.display} onClick={this.toSignup} />
					</div>
				</div>
				{ form }
			</div>
		);
	}
}

export default App;
