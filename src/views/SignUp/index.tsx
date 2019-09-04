import React from "react"
import { RouteComponentProps } from "react-router"
import Helmet from "react-helmet"

import "styles/views/sign"

import Form from "components/Forms/Form"
import Input, { InputFormEvent } from "components/Forms/Input"

export type SignUpData = {
	username: string,
	password: string,
	password_confirm: string
}

export interface SignUpProps extends RouteComponentProps<any> {

}

export interface SignUpState {
	password: string
}

export default
class SignUp
extends React.Component<SignUpProps, SignUpState> {
	state = {
		password: ""
	}

	handleSubmit = (data: SignUpData) => {

	}

	handlePasswordInput = (event: InputFormEvent): string => {
		var { value } = event.currentTarget
		this.setState({ password: value })
		return value
	}

	render() {
		// Page should redirect to /account
		// if user signed in

		var title = "Sign up to Instask"
		return <>
			<Helmet>
				<title>{title}</title>
			</Helmet>
			<main className="v-sign-up u-fade-in">
				<h1>{title}</h1>
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
						onChange={this.handlePasswordInput}
					/>
					<Input
						label="Confirm password"
						type="password"
						name="password_confirm"
						required
						placeholder="Confirm your password"
						pattern={this.state.password}
						renderInvalidMessage={key => {
							return "Passwords do not match"
						}}
					/>
					{/* Use preloader when form data is being processed */}
					<button className="u-button">
						Sign up right now!
					</button>
				</Form>
			</main>
		</>
	}
}