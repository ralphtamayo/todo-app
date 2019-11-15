import React from 'react';
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

			if (this.props.fetchTasks != null) {
				this.props.fetchTasks();
			}

			if (this.props.getTask != null) {
				this.props.getTask(this.props.task._id);
			}
		});
	};

	render() {
		return (
			<form onSubmit={ this.submitForm }>
				<div className="form-group">
					<label>Title</label>
					<input type="text" className="form-control" name='title' placeholder="Title" value={ this.state.form.title } onChange={ this.handleInputChange } />
				</div>
				<div className="form-group">
					<label>Description</label>
					<textarea className="form-control" name='description' placeholder="description" value={ this.state.form.description } onChange={ this.handleInputChange }></textarea>
				</div>
				<div className="float-right">
					<button type="submit" className="btn btn-primary mr-2">Submit</button>
					<button type="button" className="btn btn-secondary" onClick={ this.props.toggleModal }>Close</button>
				</div>
			</form>
		);
	}
}

export default TaskForm;
