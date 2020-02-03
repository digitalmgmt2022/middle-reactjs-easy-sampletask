import React from "react"
import { RouteComponentProps } from "react-router"
import Helmet from "react-helmet"
import Superagent from "superagent"

import "styles/views/gallery"

import Preloader from "components/Preloader"
import GalleryStore from "stores/Gallery"
import GalleryCard from "components/GalleryCard"
import { GalleryPhoto } from "typings/Global"
import { BASE_URL } from "consts/index"
import { observer } from "mobx-react"
import { toJS } from "mobx"

export interface GalleryProps extends RouteComponentProps<any> {}
export interface GalleryState {}

@observer
export default
class Gallery
extends React.Component<GalleryProps, GalleryState> {

	componentDidMount() {
		Superagent
			.get(`${BASE_URL}/photo`)
			.set({})
			.then(res => {
				GalleryStore.setPhotos(res.body)
			})
			.catch(err => {
				console.log("ERROR", err)
			})

	}

	render() {
		var title = "Public Gallery"
		return <>
			<Helmet>
				<title>{title}</title>
			</Helmet>
			<main className="v-gallery u-fade-in">
				<h1>{title}</h1>
				<div className="grid">
					{!GalleryStore.ready
						? <Preloader/>
						: GalleryStore.items.map((item, i) => {
							return (
								<GalleryCard
									key={i}
									photo={item}
								/>
							)
						})
					}
				</div>
			</main>
		</>
	}
}