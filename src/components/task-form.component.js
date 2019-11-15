import React from 'react';

class TaskForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isNew: true,
			form: {
				id: null,
				title: null,
				description: null,
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

	submitForm = (e) => {
		e.preventDefault();

		let id = this.state.form.id;
		let title = this.state.form.title;
		let description = this.state.form.description;

		let queryBody = {
			query: `
				mutation {
					updateTask(taskId: "${ id }", taskInput: { title: "${ title }", description: "${ description }" }) {
						_id
						title
					}
				}
			`
		}

		if (this.state.isNew) {
			queryBody = {
				query: `
					mutation {
						createTask(taskInput: { title: "${ title }", description: "${ description }" }) {
							_id
							title
						}
					}
				`
			}
		}

		fetch('http://localhost:4200/', {
			method: 'POST',
			body: JSON.stringify(queryBody),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(res => {
			if (res.status !== 200 && res.status !== 201) {
				throw new Error('Error!');
			}

			return res.json();
		}).then(user => {
			console.log(user);
		}).catch(err => {
			console.log(err);
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
				{/* <div>
					<label>Password</label>
					<input type="password" id="password" placeholder="password" ref={ this.password } />
				</div> */}
				<input type="submit"/>
			</form>
		);
	}
}

export default TaskForm;
