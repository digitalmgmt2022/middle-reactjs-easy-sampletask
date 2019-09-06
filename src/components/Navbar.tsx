import React, { Children } from "react"
import { RouteComponentProps, matchPath } from "react-router"
import { Link, NavLink } from "react-router-dom"
import { observer } from "mobx-react"

import "styles/components/navbar"

import AccountStore from "stores/Account"

export interface NavbarProps extends RouteComponentProps<any>{}
export interface NavbarState {}

@observer
export default
class Navbar
extends React.Component<NavbarProps, NavbarState> {
	get isHomepage(): boolean {
		return !!matchPath(
			this.props.location.pathname, 
			{ path: "/", exact: true }
		)
	}

	logoWrapper: React.FunctionComponent = (props) => {
		return this.isHomepage
			? <div className="logo active">
				{props.children}
			</div>
			: <NavLink to="/" exact className="logo">
				{props.children}
			</NavLink>
	}

	render() {
		return <>
			<nav className="c-navbar">
				<div className="left">
					<this.logoWrapper>
						Instask
					</this.logoWrapper>
					<NavLink to="/gallery" exact>
						Gallery
					</NavLink>
				</div>
				<div className="right">
					{!AccountStore.isAuthed
						? <div className="sign-actions">
							<Link className="u-link" to="/sign-in">
								Sign in
							</Link>
							&nbsp;or&nbsp; 
							<Link className="u-button" to="/sign-up">
								Sign up
							</Link>
						</div>
						: <div className="user-actions">
							<div className="avatar" />
							<span>{AccountStore.username}</span>
							<Link to="/account" className="u-button">
								View account
							</Link>
						</div>
					}
				</div>
			</nav>
		</>
	}
}