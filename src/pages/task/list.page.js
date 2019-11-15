import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import TaskForm from '../../components/task-form.component';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

class TaskListPage extends React.Component {
	state = {
		task: null,
		tasks: [],
		showModal: false,
	};

	componentDidMount() {
		this.fetchTasks();
	}

	async fetchTasks() {
		let response = await axios.post('http://localhost:4200/', {
			query: `
				query {
					tasks {
						_id
						title
						description
						createdAt
					}
				}
			`
		}, { headers: {
			'Content-Type': 'application/json'
		}});

		this.setState({ tasks: response.data.data.tasks });
	}

	toggleModal = () => this.setState({ showModal: !this.state.showModal });

	create = () => {
		this.setState({ task: null });

		this.toggleModal();
	}

	edit = (task) => {
		this.setState({ task: task });

		this.toggleModal();
	}

	delete = async (task) => {
		let requestBody = {
			query: `
				mutation {
					deleteTask (taskId: "${ task._id }") {
						title
					}
				}
			`
		};

		await axios.post('http://localhost:4200/', requestBody,{ headers: {'Content-Type': 'application/json'}})
		.then(response => {
			if (response.status === 200) {
				this.fetchTasks();
			}
		});
	}

	renderModal() {
		return (
			<Modal show={ this.state.showModal } onHide={ this.toggleModal }>
				<Modal.Header closeButton>
					<Modal.Title>Create a new task</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<TaskForm task={ this.state.task } fetchTasks={ this.fetchTasks.bind(this) } toggleModal={ this.toggleModal } />
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={ this.toggleModal }>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
		);
	}

	render() {
		const taskList = this.state.tasks.map((task) =>
			<li key={ task._id }>
				{ task.title }
				<NavLink to={`/task/${ task._id }`}>
					<Button variant="primary">
						View
					</Button>
				</NavLink>
				<Button variant="primary" onClick={ () => this.edit(task) }>
					Edit
				</Button>
				<Button variant="danger" onClick={ () => this.delete(task) }>
					Delete
				</Button>
			</li>
		);

		return (
			<div>
				<h1>Task listing page</h1>
				<Button variant="primary" onClick={ this.create }>
					Create task
				</Button>

				<ul>{ taskList }</ul>

				{this.renderModal()}
			</div>
		);
	}
}

export default TaskListPage;
