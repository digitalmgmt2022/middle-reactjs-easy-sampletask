import React from "react"
import { RouteComponentProps } from "react-router";

export interface ViewWrapperProps extends RouteComponentProps<any> {
	component: React.ComponentClass
	isPrivate: boolean
}

export interface ViewWrapperState {

}

export default
class ViewWrapper
extends React.Component<ViewWrapperProps, ViewWrapperState> {
	render() {
		var { isPrivate } = this.props
		// implement wrapping of private pages here
		return <this.props.component {...this.props} />
	}
}