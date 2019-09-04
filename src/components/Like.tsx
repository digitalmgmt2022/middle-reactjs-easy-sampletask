import React from "react"

import "styles/components/like"

export interface LikeProps {
	style: "default" | "liked" | "disabled",
	onClick: (
		event: React.MouseEvent<HTMLDivElement>, 
		shouldBecomeLiked?: boolean
	) => void
}

export interface LikeState {

}

export default
class Like 
extends React.Component<LikeProps, LikeState> {
	handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
		var { style } = this.props
		if (style != "disabled") {
			this.props.onClick(event, style == "default")
		} else {
			this.props.onClick(event)
		}
	}

	render() {
		return (
			<div 
				className={`c-like ${this.props.style}`} 
				onClick={this.handleClick}
			>
				<svg viewBox="-3 -3 56 56">
					<path
						d="M51.911,16.242C51.152,7.888,45.239,1.827,37.839,1.827c-4.93,0-9.444,2.653-11.984,6.905 c-2.517-4.307-6.846-6.906-11.697-6.906c-7.399,0-13.313,6.061-14.071,14.415c-0.06,0.369-0.306,2.311,0.442,5.478 c1.078,4.568,3.568,8.723,7.199,12.013l18.115,16.439l18.426-16.438c3.631-3.291,6.121-7.445,7.199-12.014 C52.216,18.553,51.97,16.611,51.911,16.242z"
					/>
				</svg>
			</div>
		)
	}
}