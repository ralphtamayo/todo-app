import React from 'react';
import axios from 'axios';
import AuthContext from '../context/auth.context';
import api from '../services/web-api.service';

class TaskForm extends React.Component {
	static contextType = AuthContext;

	constructor(props) {
		super(props);

		this.state = {
			isNew: true,
			form: {
				id: null,
				title: "",
				description: "",
			}
		}

		let task = props.task;

		if (task != null) {
			this.state.isNew = false;
			this.state.form.id = task._id;
			this.state.form.title = task.title;
			this.state.form.description = task.description;
		}
	}

	handleInputChange = (e) => {
		let name = e.target.name;
		let value = e.target.value;

		const updatedForm = {
			...this.state.form
		};

		updatedForm[name] = value;

		this.setState({ form: updatedForm });
	}

	submitForm = async (e) => {
		e.preventDefault();

		let id = this.state.form.id;
		let title = this.state.form.title;
		let description = this.state.form.description;

		let requestBody = `
			updateTask(taskId: "${ id }", taskInput: { title: "${ title }", description: "${ description }" }) {
				_id
				title
			}`
		;

		if (this.state.isNew) {
			requestBody = `
				createTask(taskInput: { title: "${ title }", description: "${ description }" }) {
					_id
					title
				}`
			;
		}

		await api.mutation(requestBody, (response) => {
			this.props.toggleModal();
			this.props.fetchTasks();
		});
	};

	render() {
		return (
			<form onSubmit={ this.submitForm }>
				<div>
					<label>Title</label>
					<input type="text" name='title' placeholder="title" value={ this.state.form.title } onChange={ this.handleInputChange } />
				</div>
				<div>
					<label>Description</label>
					<input type="text" name='description' placeholder="description" value={ this.state.form.description } onChange={ this.handleInputChange } />
				</div>
				<input type="submit"/>
			</form>
		);
	}
}

export default TaskForm;
