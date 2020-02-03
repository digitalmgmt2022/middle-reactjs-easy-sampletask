import React from "react"
import { RouteComponentProps, Redirect } from "react-router"
import Helmet from "react-helmet"
import Superagent from "superagent"

import "styles/views/sign"

import Form from "components/Forms/Form"
import Input, { InputFormEvent } from "components/Forms/Input"
import { observer } from "mobx-react"
import Account from "stores/Account"
import { BASE_URL } from "consts"

export type SignUpData = {
	username: string,
	password: string,
	password_confirm: string
}

export interface SignUpProps extends RouteComponentProps<any> {

}

export interface SignUpState {
	password: string,
	loading: boolean
}

@observer
export default
class SignUp
extends React.Component<SignUpProps, SignUpState> {
	state = {
		password: "",
		loading: false
	}

	handleSubmit = (data: SignUpData) => {
		this.setState({
			loading: true
		})
		Superagent
			.post(`${BASE_URL}/user`)
			.set({})
			.send({
				login: data.username,
				password: data.password
			})
			.then(res => {
				Account.setUserData(res.body)

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
						this.props.history.push("/account")
					})
					.catch(err => {
						console.log("ERROR AUTH", err)
					})
			})
			.catch(err => {
				console.warn("ERROR SignUp", err)
			})
	}

	handlePasswordInput = (event: InputFormEvent): string => {
		var { value } = event.currentTarget
		this.setState({ password: value })
		return value
	}

	render() {
		let { loading } = this.state

		var title = "Sign up to Instask"
		return (Account.ready
			? <Redirect to="/account" />
			: <>
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
						<button 
							className="u-button"
							disabled={loading}
						>
							Sign up right now!
						</button>
					</Form>
				</main>
			</>)
	}
}