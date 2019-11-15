import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import TaskForm from '../../components/task-form.component';
import { NavLink } from 'react-router-dom';
import api from '../../services/web-api.service';

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
		let requestBody = `
			tasks {
				_id
				title
				description
				isDone
				finishedAt
				createdAt
			}`
		;

		let response = await api.query(requestBody);

		this.setState({ tasks: response.data.data.tasks });
	}

	toggleModal = () => this.setState({ showModal: !this.state.showModal });

	create = () => {
		this.setState({ task: null });

		this.toggleModal();
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
			</Modal>
		);
	}

	render() {
		let taskList = this.state.tasks.map((task) =>
			<NavLink to={`/task/${ task._id }`} key={ task._id } className="list-group-item list-group-item-action">
				<div className="d-flex w-100 justify-content-between">
					<h5 className="d-inline-block text-truncate mw-100 mb-1">
						{ task.title }
						{task.isDone &&
							<i className="fa fa-check text-success ml-2"></i>
						}
					</h5>
				</div>
				<small className="d-inline-block text-truncate mw-100">{ task.description }</small>
			</NavLink>
		);

		return (
			<div>
				<button type="button" className="btn btn-primary btn-sm float-right" onClick={ this.create }>Create task</button>
				<h5 className="card-title">Tasks</h5>
				<hr/>

				<ul className="list-group">{ taskList }</ul>

				{this.renderModal()}
			</div>
		);
	}
}

export default TaskListPage;
