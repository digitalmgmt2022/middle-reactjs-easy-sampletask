import Superagent, { Response } from "superagent"

export type CustomRequestValue = {
	run: (params?: any, headers?: any) => Promise<any>,
	abort: () => void
}

export type UserAuthData = {
	login: string,
	password: string
}

export type CustomRequest = () => CustomRequestValue

export const identity: CustomRequest = () => {
	var request = Superagent.get(`/api/user`)
	var authHeader = typeof localStorage != "undefined"
		&& { Authorization: `Bearer ${localStorage.getItem("auth")}` }
	return {
		run: (params) => 
			request.set(authHeader).query(params),
		abort: () => request.abort()
	}
}

export const signup: CustomRequest = () => {
	var request = Superagent.post(`/api/user`)
	var login = signin()
	return {
		run: (params: UserAuthData) => {
			return new Promise((resolve, reject) => {
				request.send(params).then((resp: Response) => {
					login.run(params).then(resolve).catch(reject)
				}).catch(reject)
			})
		},
		abort: () => {
			request.abort()
			login.abort()
		}
	}
}

export const signin: CustomRequest = () => {
	var request = Superagent.post(`/api/auth`)
	var id = identity()
	return {
		run: (params: UserAuthData) => {
			return new Promise((resolve, reject) => {
				request.send(params).then((data: Response) => {
					localStorage.setItem("auth", data.body.token)
					id.run().then((resp: Response) => {
						resolve(resp)
					}).catch(reject)
				}).catch(reject)
			})
		},
		abort: () => {
			request.abort()
			id.abort()
		}
	}
}