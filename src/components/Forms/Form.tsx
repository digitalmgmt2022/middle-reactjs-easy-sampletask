import React from "react"

export interface FormProps {
	className?: string
	onSubmit?: (data: any) => void
}

export interface FormState {

}

export default
class Form
extends React.Component<FormProps, FormState> {
	static defaultData = {
		className: "",
		onSubmit: () => {}
	}

	handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		try {
			var data = {}
			const form = event.currentTarget
			;[...form.elements].forEach((element: HTMLInputElement) => {
				if (element.name)
					data[element.name] = element.value
			})
			console.log("Data submitted! :)", data)
			this.props.onSubmit(data)
		} catch (e) {
			console.error(`Error occured while collecting form data:`, e)
		}

		return false
	}

	render() {
		return (
			<form 
				className={this.props.className} 
				onSubmit={this.handleSubmit}
			>
				{this.props.children}
			</form>
		)
	}
}