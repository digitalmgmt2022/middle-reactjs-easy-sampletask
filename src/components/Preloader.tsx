import React from "react"

import "styles/components/preloader"

export interface PreloaderProps {
	light?: boolean
}

export default
class Preloader
extends React.Component<PreloaderProps, any> {
	static defaultProps = {
		light: false
	}

	render() {
		return (
			<div className={`c-preloader ${this.props.light ? "light" : ""}`}>
				<div className="circle" />
			</div>
		)
	}
}