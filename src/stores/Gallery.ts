import { computed, observable, action } from "mobx"
import AccountStore from "stores/Account"

class GalleryStore {
	@observable 
	items: GalleryPhoto[]
	
	@computed
	get ready(): boolean {
		return !!this.items
	}

	@action
	setPhotos = (photos: GalleryPhoto[]) => {
		this.items = photos
	}

	getPhoto = (photoId: number): GalleryPhoto | void => {
		return this.items 
			&& this.items.find(photo => photo.id == photoId)
	}

	isLiked = (photoId: number): boolean => {
		// implement own like detection here
		return false
	}

	@action
	toggleLike = (photoId: number) => {
		if (AccountStore.userData) {
			var photo = this.getPhoto(photoId)
			if (photo) {
				// implement like / unlike logic here
			}
		}

	}
}

export default new GalleryStore()