import React from 'react';

class TaskListPage extends React.Component {
	state = {
		tasks: [],
		isLoading: false,
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

	render() {
		const taskList = this.state.tasks.map((task) =>
			<li key={ task._id }>{ task.title }</li>
		);

		return (
			<div>
				<h1>Task listing page</h1>

				<ul>{ taskList }</ul>
			</div>
		);
	}
}

export default TaskListPage;
