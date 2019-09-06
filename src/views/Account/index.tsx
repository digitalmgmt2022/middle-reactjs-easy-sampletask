import React from "react"
import { RouteComponentProps } from "react-router"
import Helmet from "react-helmet"
import { Link } from "react-router-dom"

import "styles/views/account"

import AccountStore from "stores/Account"

export interface AccountProps extends RouteComponentProps<any> {}

export interface AccountState {}

export default
class Account
extends React.Component<AccountProps, AccountState> {
	render() {
		var title = "Welcome in your account"
		return <>
			<Helmet>
				<title>{title}</title>
			</Helmet>
			<main className="v-account u-fade-in">
				<h1>
					{title},<br/>
					{AccountStore.username}
				</h1>
				<div className="actions">
					<Link to="/gallery" className="u-button">
						View gallery
					</Link>
					<div className="u-button blue">
						Sign out
					</div>
				</div>
			</main>
		</>
	}
}