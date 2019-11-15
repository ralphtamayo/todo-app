import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import axios from 'axios';

class TaskShowPage extends React.Component {
	state = {
		task: null,
	}

	componentDidMount = () => {
		this.getTask(this.props.match.params.id);
	}

	getTask = async (taskId) => {
		let requestBody = {
			query: `
				query {
					task (taskId: "${ taskId }") {
						title
						description
						createdAt
					}
				}
			`
		}

		let response = await axios.post('http://localhost:4200/', requestBody, { headers: {
			'Content-Type': 'application/json'
		}});

		this.setState({ task: response.data.data.task });
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
