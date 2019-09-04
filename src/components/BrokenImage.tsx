import React from "react"

import "styles/components/broken-image"

export default
class BrokenImage
extends React.Component<any, any> {
	render() {
		return (
			<div className="c-broken-image">
				<img src="/static/images/broken.svg" alt=""/>
			</div>
		)
	}
}