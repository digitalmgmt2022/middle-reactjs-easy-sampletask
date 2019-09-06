import React from "react"
import { RouteComponentProps } from "react-router"
import Helmet from "react-helmet"
import { observer } from "mobx-react"
import { Link } from "react-router-dom"

import "styles/views/homepage"

import AccountStore from "stores/Account"

export interface HomepageProps extends RouteComponentProps<any> {}
export interface HomepageState {}

@observer
export default
class Homepage
extends React.Component<HomepageProps, HomepageState> {
	render() {
		var title = "Welcome to Instask"
		return <>
			<Helmet>
				<title>{title}</title>
			</Helmet>
			<main className="v-homepage u-fade-in">
				<h1>
					{title},<br/>
					{/* If user is not signed up, show "Anonymous" string */}
					{AccountStore.username}!
				</h1>
				<p className="u-subtext">
					Good luck and have fun!
				</p>
				<div className="actions">
					<Link to="/gallery" className="u-button">
						View gallery
					</Link>

					{/* Do not render this button if user is signed in */}
					{!AccountStore.isAuthed &&
						<Link to="/sign-up" className="u-button blue">
							Sign up
						</Link>
					}
				</div>
			</main>
		</>
	}
}