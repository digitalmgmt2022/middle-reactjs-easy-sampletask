import React from "react"

import Form from "components/Forms/Form"
import Input from "components/Forms/Input"

export type SignInData = {
	username: string,
	password: string
}

export default
class SignInForm
extends React.Component<any, any> {
	handleSubmit = (data: SignInData) => {

	}

	render() {
		return (
			<Form 
				className="u-form"
				onSubmit={this.handleSubmit}
			>
				<Input
					label="Your name"
					name="username"
					required
					placeholder="Enter your name"
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