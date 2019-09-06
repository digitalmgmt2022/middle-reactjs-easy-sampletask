import React from "react"

import { signin, identity } from "api/user"

import Form from "components/Forms/Form"
import Input from "components/Forms/Input"
import Preloader from "components/Preloader"

import Account from "stores/Account"
import { Response } from "superagent"

export type SignInData = {
	login: string,
	password: string
}

export interface SignInFormState {
	loading: boolean,
	error: boolean
}

export default
class SignInForm
extends React.Component<any, any> {
	state = {
		loading: false,
		error: false
	}

	signin = signin()

	componentWillUnmount() {
		this.signin.abort()
	}

	handleSubmit = (data: SignInData) => {
		this.setState({ 
			loading: true,
			error: false
		})
		this.signin.run(data).then((response: Response) => {
			Account.setUserData(response.body)
		}).catch(error => {
			this.setState({
				error: true,
				loading: false
			})
		})
	}

	render() {
		return (
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
				/>
				{this.state.error &&
					<p 
						className="u-subtext" 
						style={{ color: "red" }}
					>
						There is no such user!
					</p>
				}
				{this.state.loading
					? <Preloader />
					: <button className="u-button">
						Sign in
					</button>
				}
			</Form>
		)
	}
}