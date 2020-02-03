// Feel free to update these typings

export type GalleryPhoto = {
	id: number,
	src?: string,
	createAt?: string,
	updateAt?: string,
	likes?: number[] | string[]
}

export type UserData = {
	id: number,
	login: string,
	password: string,
	createdAt: string,
	updatedat: string
}