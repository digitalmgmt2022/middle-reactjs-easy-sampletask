import React from "react"

import "styles/components/forms/input"

export type InputFormEvent = React.FormEvent<HTMLInputElement>
export type ValidityMessage = keyof ValidityState

export interface InputProps {
	label?: React.ReactNode,
	name?: string,
	required?: boolean,
	placeholder?: string,
	type?: "text" | "password",
	defaultValue?: string,
	pattern?: string
	onChange?: (event: InputFormEvent) => string,
	onInvalid?: (event: InputFormEvent) => void,
	renderInvalidMessage?: (key: ValidityMessage) => string
}

export interface InputState {
	value: string,
	error: ValidityMessage
}

export default
class Input
extends React.Component<InputProps, InputState> {
	static defaultProps = {
		type: "text",
		required: false,
		defaultValue: "",
		onChange: (event: InputFormEvent) => event.currentTarget.value,
		renderInvalidMessage: (key: ValidityMessage) => key
	}

	state = {
		value: this.props.defaultValue,
		error: undefined as ValidityMessage
	}

	lastError: ValidityMessage = "valueMissing"

	getInvalidMessage = (input: HTMLInputElement): ValidityMessage => {
		var validationMessage: ValidityMessage
		for (validationMessage in input.validity) {
			if (input.validity[validationMessage]) {
				break
			}
		}
		return validationMessage
	}

	handleInvalid = (event: InputFormEvent) => {
		event.preventDefault()
		
		this.lastError = this.getInvalidMessage(event.currentTarget) 
		this.setState({ 
			error: this.lastError
		})
	}

	handleChange = (event: InputFormEvent) => {
		this.setState({
			value: this.props.onChange(event),
			error: undefined
		})
	}

	render() {
		var { value, error } = this.state
		return (
			<div className={`c-input ${error ? "invalid" : ""}`}>
				{this.props.label &&
					<label htmlFor={this.props.name}>
						{this.props.label}
					</label>
				}
				<input 
					type={this.props.type}
					id={this.props.name}
					name={this.props.name}
					required={this.props.required}
					pattern={this.props.pattern}
					placeholder={this.props.placeholder}
					value={value}
					onChange={this.handleChange}
					onInvalid={this.handleInvalid}
					autoComplete="off"
				/>
				<p className={`error ${error ? "" : "hidden"}`}>
					{this.props.renderInvalidMessage(this.lastError)}
				</p>
			</div>
		)
	}
}