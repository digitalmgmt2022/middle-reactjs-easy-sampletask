import { observable, action, computed, toJS, autorun } from "mobx"
import { UserData } from "typings/Global"
import { TOKEN } from "consts"

class AccountStore {
	@observable userData: UserData
	@observable private _checked: boolean = false
	@observable token: string = undefined as string

	@computed
	get ready(): boolean {
		return this._checked
	}
	set ready(isReady: boolean) {
		this._checked = isReady
	}

	@action
	setToken(token: string) {
		this.token = token
		this._checked = true
		this.setTokenLS()
	}

	isCheked = () => {
		this._checked = true
	}

	setTokenLS = () => {
		if (typeof localStorage != "undefined")
			localStorage.setItem(TOKEN, toJS(this.token))
	}

	@action
	setUserData = (userData: UserData) => {
		this.userData = userData
		this._checked = true
	}

	@action
	signOut = () => {
		this.userData = undefined
		this.token = undefined
		this._checked = false
		localStorage.removeItem(TOKEN)
	}

}

export default new AccountStore()