import React from 'react';
import { reduxForm, Field } from 'redux-form';

class StreamForm extends React.Component {
	renderInput = ({ input, label, meta }) => {
		const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
		return (
			<div className={className}>
				<label>{label}</label>
				<input {...input} />
				{this.renderError(meta)}
			</div>
		);
	};

	renderError = ({ error, touched }) => {
		if (touched && error) {
			return (
				<div className="ui error message">
					<div className="header">{error}</div>
				</div>
			);
		}
	};

	render() {
		return (
			<form onSubmit={this.props.handleSubmit(this.props.onSubmit)} className="ui form error">
				<Field name="title" component={this.renderInput} label="Enter a title" />
				<Field name="description" component={this.renderInput} label="Enter a description" />
				<button className="ui button primary">Submit</button>
			</form>
		);
	}
}

const validate = (formValues) => {
	const errors = {};
	if (!formValues.title) {
		errors.title = 'please enter a title';
	}

	if (!formValues.description) {
		errors.description = 'please enter a description';
	}
	return errors;
};

export default reduxForm({
	form: 'streamForm',
	validate
})(StreamForm);
