import React from "react"
import { Link } from "react-router-dom"

import "styles/components/gallery-card"

import SmartImage from "components/SmartImage"
import Like, { LikeProps } from "components/Like"

export interface GalleryCardProps {
	photo: GalleryPhoto // should be overriden in `typings/Global.ts`
}

export interface GalleryCardState {

}

export default
class GalleryCard
extends React.Component<GalleryCardProps, GalleryCardState> {
	// you should remove next two following properties 
	// when everything is chained
	__likeStatesForDemonstration: LikeProps["style"][] = [
		"default", 
		"liked", 
		"disabled"
	]
	__getRandomInt = (max: number) => {
		return Math.round(Math.random() * max)
	}
	__getRandomState = (): LikeProps["style"] => {
		const index = this.__getRandomInt(2)
		console.log(index)
		return this.__likeStatesForDemonstration[index]
	}

	handleLikeClick = (
		event: React.MouseEvent<HTMLDivElement>, 
		shouldBecomeLiked: boolean
	) => {
		event.preventDefault()
		if (typeof shouldBecomeLiked == "boolean")
			alert(`Okay, now this picture should be ${
				shouldBecomeLiked ? "liked" : "unliked"
			}`)
		else
			alert("Hey, you are not allowed to like photos!")
	}

	render() {
		var { photo } = this.props
		return (
			<Link 
				to={`/gallery/${photo.id}`} 
				className="c-gallery-card"
			>
				<div className="image-wrapper">
					<SmartImage
						photo={photo}
						aspectRatio={1} // images should be square
					/>
				</div>
				<div className="actions">
					<Like
						style={this.__getRandomState()}
						onClick={this.handleLikeClick}
					/>
					<div className="likes-count">
						{/* This counter should also react on your likes */}
						{this.__getRandomInt(1000)} likes
					</div>
				</div>
			</Link>
		)
	}
}