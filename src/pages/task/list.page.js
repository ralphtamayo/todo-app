import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import TaskForm from '../../components/task-form.component';
import { NavLink } from 'react-router-dom';

class TaskListPage extends React.Component {
	state = {
		task: null,
		tasks: [],
		isLoading: false,
		showModal: false,
	};

	isActive = true;

	componentDidMount() {
		this.fetchTasks();
	}

	fetchTasks() {
		this.setState({ isLoading: true });

		fetch('http://localhost:4200/', {
			method: 'POST',
			body: JSON.stringify({
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
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(res => {
			if (res.status !== 200 && res.status !== 201) {
				throw new Error('Failed!');
			}

			return res.json();
		}).then(resData => {
			if (this.isActive) {
				this.setState({ tasks: resData.data.tasks, isLoading: false });
			}
		}).catch(err => {
			console.log(err);

			if (this.isActive) {
				this.setState({ isLoading: false });
			}
		});
	}

	componentWillUnmount() {
		this.isActive = false;
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

	delete = (task) => {
		fetch('http://localhost:4200/', {
			method: 'POST',
			body: JSON.stringify({
				query: `
					mutation {
						deleteTask (taskId: "${ task._id }") {
							title
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
		}).then(task => {
			console.log(task);
		}).catch(err => {
			console.log(err);
		});
	}

	renderModal() {
		return (
			<Modal show={this.state.showModal} onHide={ this.toggleModal }>
				<Modal.Header closeButton>
					<Modal.Title>Create a new task</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<TaskForm task={ this.state.task } />
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
