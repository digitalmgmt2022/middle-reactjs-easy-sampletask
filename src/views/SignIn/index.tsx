import React from "react"
import { RouteComponentProps, Redirect } from "react-router-dom"
import Helmet from "react-helmet"
import { observer } from "mobx-react"

import "styles/views/sign"

import SignInForm from "components/Forms/SignInForm"
import Account from "stores/Account"

export interface SignInProps extends RouteComponentProps<any> {
	title?: string
}

export interface SignInState {}

@observer
export default
class SignIn
extends React.Component<SignInProps, SignInState> {
	static defaultProps = {
		title: "Sign in to Instask"
	}

	render() {
		if (Account.isAuthed)
			return <Redirect to="/account" />

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