/* eslint-disable */
import React from 'react';
import renderer from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';

import Button from 'components/Login/Button';

// Test Button after refactoring Login/Signup Button into one
it('Toggle Login/Signup Button', () => {
	const LoginButtonActive = renderer.create(
		<Button isLogin showLogin={1} />
	);

	const LoginButtonInactive = renderer.create(
		<Button isLogin showLogin={2} />
	);

	const LoginButtonInactive2 = renderer.create(
		<Button isLogin showLogin={3} />
	);

	const SignupButtonActive = renderer.create(
		<Button isLogin={false} showLogin={2} />
	);

	const SignupButtonInactive = renderer.create(
		<Button isLogin={false} showLogin={1} />
	);

	const SignupButtonInactive2 = renderer.create(
		<Button isLogin={false} showLogin={3} />
	);

	expect(LoginButtonActive.toJSON()).toMatchSnapshot();
	expect(LoginButtonInactive.toJSON()).toMatchSnapshot();
	expect(LoginButtonInactive2.toJSON()).toMatchSnapshot();
	expect(SignupButtonActive.toJSON()).toMatchSnapshot();
	expect(SignupButtonInactive.toJSON()).toMatchSnapshot();
	expect(SignupButtonInactive2.toJSON()).toMatchSnapshot();
});
