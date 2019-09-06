import React from "react"
import { RouteComponentProps, Redirect } from "react-router-dom"
import Helmet from "react-helmet"
import { observer } from "mobx-react"

import "styles/views/sign"

import Form from "components/Forms/Form"
import Input, { InputFormEvent } from "components/Forms/Input"
import Preloader from "components/Preloader"

import { signup, signin } from "api/user"

import Account from "stores/Account"
import { Response } from "superagent"

export type SignUpData = {
	login: string,
	password: string,
	password_confirm: string
}

export interface SignUpProps extends RouteComponentProps<any> {

}

export interface SignUpState {
	password: string,
	loading: boolean,
	error: boolean
}

@observer
export default
class SignUp
extends React.Component<SignUpProps, SignUpState> {
	state = {
		password: "",
		loading: false,
		error: false
	}

	signup = signup()
	signin = signin()

	componentWillUnmount() {
		this.signup.abort()
		this.signin.abort()
	}

	handleSubmit = (data: SignUpData) => {
		this.setState({
			loading: true,
			error: false
		})
		this.signup.run({
			login: data.login,
			password: data.password
		}).then((response: Response) => {
			Account.setUserData(response.body)
		}).catch(e => 
			this.setState({
				error: true,
				loading: false
			})
		)
	}

	handlePasswordInput = (event: InputFormEvent): string => {
		var { value } = event.currentTarget
		this.setState({ password: value })
		return value
	}

	render() {
		// Page should redirect to /account
		// if user signed in
		if (Account.isAuthed)
			return <Redirect to="/account" />

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
						label="Your login"
						name="login"
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
					{this.state.error &&
						<p 
							className="u-subtext"
							style={{ color: "red" }}
						>
							This user is already exist
						</p>
					}
					{this.state.loading
						? <Preloader />
						: <button className="u-button">
							Sign up right now!
						</button>
					}
				</Form>
			</main>
		</>
	}
}