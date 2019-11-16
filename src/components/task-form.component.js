import React from 'react';
import AuthContext from '../context/auth.context';
import api from '../services/web-api.service';

class TaskForm extends React.Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);

    this.state = {
      isNew: true,
      error: null,
      form: {
        id: null,
        title: '',
        description: '',
      },
    };

    const { task } = props;

    if (task != null) {
      this.state.isNew = false;
      this.state.form.id = task._id;
      this.state.form.title = task.title;
      this.state.form.description = task.description;
    }
  }

  handleInputChange = e => {
    const { name } = e.target;
    const { value } = e.target;

    const updatedForm = {
      ...this.state.form,
    };

    updatedForm[name] = value;

    this.setState({ form: updatedForm });
  };

  submitForm = async e => {
    e.preventDefault();

    const { id } = this.state.form;
    const { title } = this.state.form;
    const { description } = this.state.form;

    let requestBody = `
      updateTask(taskId: "${id}", taskInput: { title: "${title}", description: "${description}" }) {
        _id
        title
      }`;
    if (this.state.isNew) {
      requestBody = `
        createTask(taskInput: { title: "${title}", description: "${description}" }) {
          _id
          title
        }`;
    }

    await api.mutation(requestBody, response => {
      if (response.data.errors != null) {
        this.setState({ error: response.data.errors[0].message });
      } else {
        this.props.toggleModal();

        if (this.props.fetchTasks != null) {
          this.props.fetchTasks();
        }

        if (this.props.getTask != null) {
          this.props.getTask(this.props.task._id);
        }
      }
    }, this.context);
  };

  render() {
    return (
      <form onSubmit={this.submitForm}>
        <div className="form-group">
          {this.state.error != null &&
            <div className="alert alert-danger" role="alert">{ this.state.error }</div>
          }
          <label>Title</label>
          <input
            type="text"
            className="form-control"
            name="title"
            placeholder="Title"
            value={this.state.form.title}
            onChange={this.handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            className="form-control"
            name="description"
            placeholder="description"
            value={this.state.form.description}
            onChange={this.handleInputChange}
          />
        </div>
        <div className="float-right">
          <button type="submit" className="btn btn-primary mr-2">
            Submit
          </button>
          <button type="button" className="btn btn-secondary" onClick={this.props.toggleModal}>
            Close
          </button>
        </div>
      </form>
    );
  }
}

export default TaskForm;
