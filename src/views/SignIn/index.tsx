import React from "react"
import { RouteComponentProps } from "react-router"
import Helmet from "react-helmet"

import "styles/views/sign"

import SignInForm from "components/Forms/SignInForm"

export interface SignInProps extends RouteComponentProps<any> {
	title?: string
}

export interface SignInState {}

export default
class SignIn
extends React.Component<SignInProps, SignInState> {
	static defaultProps = {
		title: "Sign in to Instask"
	}

	render() {
		var { title } = this.props
		return <>
			<Helmet>
				<title>{title}</title>
			</Helmet>
			<main className="v-sign-in u-fade-in">
				<h1>{title}</h1>
				<SignInForm />
			</main>
		</>
	}
}