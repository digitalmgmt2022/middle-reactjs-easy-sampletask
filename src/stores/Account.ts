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

	@computed
	get username(): string {
		return this.userData
			? this.userData.login
			: "Anonymous"
	}

	@computed
	get isAuthed(): boolean {
		return this.ready && !!this.userData
	}

	@action
	setUserData = (userData: UserData) => {
		this.userData = userData
		this.ready = true
	}

	@action
	unsetUserData = () => {
		this.userData = undefined
	}
}

export default new AccountStore()