import React from "react"
import { RouteComponentProps } from "react-router-dom"
import { observer } from "mobx-react"

import SignIn from "views/SignIn"

import Account from "stores/Account"

export interface ViewWrapperProps extends RouteComponentProps<any> {
	component: React.ComponentClass
	isPrivate: boolean
}

export interface ViewWrapperState {

}

@observer
export default
class ViewWrapper
extends React.Component<ViewWrapperProps, ViewWrapperState> {
	render() {
		var { isPrivate } = this.props
		// implement wrapping of private pages here
		return isPrivate && !Account.isAuthed
			? <SignIn {...this.props} />
			: <this.props.component {...this.props} />
	}
}