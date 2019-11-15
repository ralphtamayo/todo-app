import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from 'react-bootstrap';

class TaskShowPage extends React.Component {
	state = {
		task: null,
	}

	componentDidMount = () => {
		this.getTask(this.props.match.params.id);
	}

	getTask = (taskId) => {
		fetch('http://localhost:4200/', {
			method: 'POST',
			body: JSON.stringify({
				query: `
					query {
						task (taskId: "${ taskId }") {
							title
							description
							createdAt
						}
					}
				`
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(res => {
			if (res.status !== 200 && res.status !== 201) {
				throw new Error('Failed!');
			}

			return res.json();
		}).then(res => {
			this.setState({ task: res.data.task });
		}).catch(err => {
			console.log(err);
		});
	}

	render() {
		if(this.state.task == null){
			return null
		}

		return (
			<div>
				<h1>Task Show page</h1>

				<div>
					<label>Title</label>
					<p>{ this.state.task.title }</p>

					<label>Description</label>
					<p>{ this.state.task.description }</p>

					<label>Created at</label>
					<p>{ this.state.task.createdAt }</p>
				</div>

				<NavLink to="/task">
					<Button variant="primary">Back to list</Button>
				</NavLink>
			</div>
		);
	}
}

export default TaskShowPage;
