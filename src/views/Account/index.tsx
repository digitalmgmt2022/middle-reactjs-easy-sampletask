import React from "react"
import { RouteComponentProps, Redirect } from "react-router"
import Helmet from "react-helmet"
import { Link } from "react-router-dom"
import { observer } from "mobx-react"

import "styles/views/account"

import AccountStore from "stores/Account"

export interface AccountProps extends RouteComponentProps<any> {}

export interface AccountState {}

@observer
export default
class Account
extends React.Component<AccountProps, AccountState> {
	render() {
		var title = "Welcome in your account"
		return (!AccountStore.ready
			? <Redirect to="/"/>
			: <>
				<Helmet>
					<title>{title}</title>
				</Helmet>
				<main className="v-account u-fade-in">
					<h1>{title}, Username</h1>
					<div className="actions">
						<Link to="/gallery" className="u-button">
							View gallery
						</Link>
						<div 
							className="u-button blue"
							onClick={AccountStore.signOut}
						>
							Sign out
						</div>
					</div>
				</main>
			</>)
	}
}