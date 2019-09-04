import { observable, action, computed } from "mobx"

class AccountStore {
	@observable 
	userData: UserData

	@observable 
	private _checked: boolean = false

	@computed
	get ready(): boolean {
		return this._checked
	}
	set ready(isReady: boolean) {
		this._checked = isReady
	}

	@action
	setUserData = (userData: UserData) => {
		this.userData = userData
	}

	@action
	unsetUserData = () => {
		this.userData = undefined
	}
}

export default new AccountStore()