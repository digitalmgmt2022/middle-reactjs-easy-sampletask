import React from "react"
import { RouteComponentProps } from "react-router"
import Helmet from "react-helmet"

import "styles/views/gallery"

import Preloader from "components/Preloader"
import GalleryCard from "components/GalleryCard"

export interface GalleryProps extends RouteComponentProps<any> {}
export interface GalleryState {}

export default
class Gallery
extends React.Component<GalleryProps, GalleryState> {
	render() {
		var title = "Public Gallery"
		return <>
			<Helmet>
				<title>{title}</title>
			</Helmet>
			<main className="v-gallery u-fade-in">
				<h1>{title}</h1>
				<div className="grid">
					{[...Array(12)].map((_, i) => {
						return (
							<GalleryCard
								key={i}
								photo={{ id: i }}
							/>
						)
					})}
				</div>
			</main>
		</>
	}
}