import React from "react"

import Form from "components/Forms/Form"
import Input from "components/Forms/Input"
import Superagent from "superagent"
import Account from "stores/Account"
import { BASE_URL } from "consts"
import { observer } from "mobx-react"
import { Redirect } from "react-router"

export type SignInData = {
	username: string,
	password: string
}

@observer
export default
class SignInForm
extends React.Component<any, any> {
	identity = (data: SignInData) => {
		Superagent
			.post(`${BASE_URL}/auth`)
			.set({})
			.send({
				login: data.username,
				password: data.password
			})
			.then(res => {
				Account.setToken(res.body.token)
				Account.isCheked()
			})
			.catch(err => {
				console.log("ERROR AUTH", err)
			})
	}

	render() {
		return (Account.ready
			? <Redirect to="/gallery" />
			: <Form 
				className="u-form"
				onSubmit={this.identity}
			>
				<Input
					label="Your login"
					name="username"
					required
					placeholder="Enter your login"
					pattern="[A-Za-z0-9]{3,24}"
					renderInvalidMessage={key => {
						return key == "patternMismatch"
							? "Username should contains [a-zA-Z0-9] from 3 to 24 chars"
							: key
					}}
				/>
				<Input
					label="Your password"
					type="password"
					name="password"
					required
					placeholder="Enter your password"
					pattern="[A-Za-z0-9]{6,99}"
					renderInvalidMessage={key => {
						return key == "patternMismatch"
							? "Password should contains [a-zA-Z0-9] from 6 to 99 chars"
							: key
					}}
				/>
				{/* Use preloader when form data is being processed */}
				<button className="u-button">
					Sign in
				</button>
			</Form>
		)
	}
}