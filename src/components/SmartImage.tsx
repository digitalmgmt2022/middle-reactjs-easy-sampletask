import React from "react"

import "styles/components/smart-image"

import Preloader from "components/Preloader"
import BrokenImage from "components/BrokenImage"
import { GalleryPhoto } from "typings/Global"

// If SmartImageProps.aspectRatio is "natural",
// then "c-smart-image" should fit the parent element
// and the image should contain inside the wrapper
//
// SmartImageProps.aspectRatio as number means the result
// of aspect ratio (AR) calculation, e.g.:
// - if AR is 16:9, then pass 16/9 as expression => ~1.78
// - if AR is 12:6, then pass 12/6 as expression => 2
// - if AR is 1:1, then pass 1

export interface SmartImageProps {
	photo: GalleryPhoto,
	aspectRatio: number | "natural"
}

export interface SmartImageState {
	// place your state properties here, if needed
	
}

export default
class SmartImage
extends React.Component<SmartImageProps, SmartImageState> {
	state = {
		
	}

	// use "u-fade-in" className for smooth appearing of the image
	render() {
		let { photo } = this.props
		return (
			<div className="c-smart-image ">
				<div className="smart-image-wrapper">
						{!photo
							? <Preloader light />
							: !photo.src
								? <BrokenImage/>
								: <img 
									src={`${photo.src}`} 
									alt=""
									className="u-fade-in" 
								/>
						}
						{/* <Preloader light /> */}
						{/* <BrokenImage /> */}
				</div>
			</div>
		)
	}
}