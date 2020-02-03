import React from "react"
import { RouteComponentProps, Switch, Route } from "react-router-dom"
import Superagent from "superagent"

import "styles/main"
import "styles/universal"

import NotFound from "views/NotFound"
import Homepage from "views/Homepage"
import Gallery from "views/Gallery"
import SignUp from "views/SignUp"
import SignIn from "views/SignIn"
import Account from "views/Account"
import ViewWrapper from "views/ViewWrapper"

import Navbar from "components/Navbar"
import { BASE_URL } from "consts"
import AccountStore from "stores/Account"

export interface ApplicationProps extends RouteComponentProps<any> {}
export interface ApplicationState {}

export default
class Application
extends React.Component<ApplicationProps, ApplicationState> {
	componentDidMount() {
		Superagent
			.patch(`${BASE_URL}/auth`)
			.set({
				"Authorization": `Bearer ${localStorage.getItem("token")}`
			})
			.then(res => {
				AccountStore.setToken(res.body.token)
			})
			.catch(err => {
				console.log(err)
			})
	}
	
	render() {
		return <>
			<Navbar {...this.props} />
			<Switch>
				<Route
					path="/"
					exact
					render={props => {
						return (
							<ViewWrapper 
								{...props} 
								isPrivate={false}
								component={Homepage}
							/>
						)
					}}
				/>
				<Route
					path="/gallery" // modify if needed
					exact
					render={props => {
						return (
							<ViewWrapper 
								{...props} 
								isPrivate={false}
								component={Gallery}
							/>
						)
					}}
				/>
				<Route
					path="/sign-up"
					exact
					render={props => {
						return (
							<ViewWrapper
								{...props}
								isPrivate={false}
								component={SignUp}
							/>
						)
					}}
				/>
				<Route
					path="/sign-in"
					exact
					render={props => {
						return (
							<ViewWrapper
								{...props}
								isPrivate={false}
								component={SignIn}
							/>
						)
					}}
				/>
				<Route
					path="/account"
					exact
					render={props => {
						return (
							<ViewWrapper
								{...props}
								isPrivate={true}
								component={Account}
							/>
						)
					}}
				/>
				<Route component={NotFound} />
			</Switch>
		</>
	}
}