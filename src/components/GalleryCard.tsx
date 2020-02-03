import React from "react"
import { Link } from "react-router-dom"
import Superagent from "superagent"

import "styles/components/gallery-card"

import SmartImage from "components/SmartImage"
import Like, { LikeProps } from "components/Like"
import { GalleryPhoto } from "typings/Global"
import { observer } from "mobx-react"
import { toJS } from "mobx"
import { BASE_URL } from "consts"
import Account from "stores/Account"

export interface GalleryCardProps {
	photo: GalleryPhoto // should be overriden in `typings/Global.ts`
}

export interface GalleryCardState {
	scale: boolean,
	count: number
}

@observer
export default
class GalleryCard
extends React.Component<GalleryCardProps, GalleryCardState> {
	state = {
		scale: false,
		count: this.props.photo.likes.length
	}

	handleLikeClick = (
		event: React.MouseEvent<HTMLDivElement>, 
		shouldBecomeLiked: boolean
	) => {
		event.preventDefault()
		if (typeof shouldBecomeLiked == "boolean")
			Superagent
				.post(`${BASE_URL}/like/${this.props.photo.id}`)
				.set({
					"Authorization": `Bearer ${Account.token}`
				})
				.then(res => {
					console.log(res)
					
					if(res.body.affected){
						this.setState({count: 0})
					} else {
						this.setState({count: 1})
					}
				})
				.catch(err => {
					console.log("err like", err)
					
				})
			// alert(`Okay, now this picture should be ${
			// 	shouldBecomeLiked ? "liked" : "unliked"
			// }`)
		else
			alert("Hey, you are not allowed to like photos!")
	}

	scale = () => {
		this.setState({
			scale: !this.state.scale
		})
	}

	render() {
		var { photo } = this.props
		var { scale, count } = this.state
		return (
			<div 
				// to={`/gallery/${photo.id}`} 
				className={`c-gallery-card ${
					scale ? "scale" : ""
				}`}
			>
				<div className="image-wrapper" onClick={this.scale}>
					<SmartImage
						photo={photo}
						aspectRatio={1}
						
					/>
				</div>
				{Account.ready
					? <div className="actions">
						<Like
							style={count ? "liked" : "default"}
							onClick={this.handleLikeClick}
						/>
						<div className="likes-count">
							{count}
						</div>
					</div>
					: null
				}
			</div>
		)
	}
}