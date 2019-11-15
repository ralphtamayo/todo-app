import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';
import api from '../../services/web-api.service';
import TaskForm from '../../components/task-form.component';

class TaskShowPage extends React.Component {
	state = {
		task: null,
		showModal: false,
	}

	componentDidMount = () => {
		this.getTask(this.props.match.params.id);
	}

	getTask = async (taskId) => {
		let requestBody = `
			task (taskId: "${ taskId }") {
				_id
				title
				description
				isDone
			}`
		;

		console.log(taskId);

		await api.query(requestBody, response => {
			this.setState({ task: response.data.data.task });
		});
	}

	edit = () => {
		this.toggleModal();
	}

	delete = async (task) => {
		let requestBody = `
			deleteTask (taskId: "${ task._id }") {
				title
			}`
		;

		await api.mutation(requestBody, response => {
			this.props.history.push('/task');
		});
	}

	toggleCompletion = async task => {
		let requestBody = `
			toggleTaskCompletion (taskId: "${ task._id }", isDone: ${ task.isDone }) {
				_id
				title
				description
				isDone
			}`
		;

		await api.mutation(requestBody, response => {
			this.setState({ task: response.data.data.toggleTaskCompletion });
		});
	}

	toggleModal = () => this.setState({ showModal: !this.state.showModal });

	renderModal() {
		return (
			<Modal show={ this.state.showModal } onHide={ this.toggleModal }>
				<Modal.Header closeButton>
					<Modal.Title>Edit { this.state.task.title }</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<TaskForm task={ this.state.task } getTask={ this.getTask.bind(this) } toggleModal={ this.toggleModal } />
				</Modal.Body>
			</Modal>
		);
	}

	render() {
		let task = this.state.task;

		if(task == null){
			return null
		}

		return (
			<div>
				<h5 className="card-title">
					{ task.title }
					{ task.isDone &&
						<i className="fa fa-check text-success ml-2"></i>
					}
				</h5>
				<hr/>

				<p>{ task.description }</p>
				<p>{ task.isDone }</p>

				<div className="btn-group" role="group" aria-label="Basic example">
					<NavLink className="btn btn-primary" to="/task">
						Back to list
					</NavLink>

					{ task.isDone &&
						<Button variant="light" onClick={ () => this.toggleCompletion(task) }>
							{ task.isDone ? "Mark as incomplete" : "Mark as complete"}
						</Button>
					}

					{ !task.isDone &&
						<div className="btn-group" role="group">
							<button type="button" className="btn btn-light dropdown-toggle" data-toggle="dropdown">
								Actions
							</button>
							<div className="dropdown-menu">
								<Button className="dropdown-item" variant="primary" onClick={ () => this.toggleCompletion(task) }>
									{ task.isDone ? "Mark as incomplete" : "Mark as complete"}
								</Button>
								<Button className="dropdown-item" variant="primary" onClick={ this.edit }>
									Edit
								</Button>
								<Button className="dropdown-item" variant="danger" onClick={ () => this.delete(task) }>
									Delete
								</Button>
							</div>
						</div>
					}
				</div>

				{ this.renderModal() }
			</div>
		);
	}
}

export default TaskShowPage;
