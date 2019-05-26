import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: [],
      taskName: '',
      startDate: '',
      finishDate: '',
      taskType: '',
      taskDescription: '',
      openInput: false,
      openEdit: false
    };
  }

  // Obtener las tareas de la API
  componentDidMount = () => {
    fetch('/dev/task-type')
    .then(response => response.json())
    .then(myJson => {
      this.setState({ tasks: myJson.data });
    });
  }

  // Guardar nueva tarea creada
  newTask = event => {
    event.preventDefault();

    if (this.state.tasks.every(task => task.task_name !== this.state.taskName)) {
      this.setState({ 
        tasks: [...this.state.tasks, { 
          name: this.state.taskName, 
          start_date: this.state.startDate,
          finish_date: this.state.finishDate,
          task_type: this.state.taskType,
          task_description: this.state.taskDescription 
        }], 
        taskName: '',
        startDate: '',
        finishDate: '',
        taskType: '',
        taskDescription: '',
        openInput: false 
      });
    }
  }

  // Verificar si tareas son seleccionadas para borrar o actualizar
  updateCheckbox = event => {
    let checkedTasks = this.state.tasks.map(task => {
      if (task.name === event.target.name) {
        task.checked = event.target.checked;
      }

      if (task.checked) {
        task.value = 'delete'
      } else {
        task.value = 'live'
      }

      return task;
    });

    this.setState({ tasks: checkedTasks });
  }

  // Borrar tareas seleccionadas
  deleteTask = event => {
    let deletedTasks = this.state.tasks.filter(task => task.value !== 'delete');

    this.setState({ tasks: deletedTasks });
  }

  // Editar tarea seleccionada
  editName = event => {
    if (event.key === 'Enter' && event.target.value !== '') {
      let editedTasks = this.state.tasks.map(task => {
        if (task.name === event.target.name) {
          task.name = event.target.value;
        }

        return task;
      });

      this.setState({ 
        tasks: editedTasks,
        openEdit: false
      });
    }
  }
                     
  render() {
    return (
      <div className="App">

        {/* Inicia Contenedor CRUD de Tareas */}
        <div className="container__crud">

          <div className="container__edit_delete">
            <div className="div_edit-button">
              <button className="edit-button" onClick={() => this.setState({ openEdit: true })}>
                Editar Tarea
              </button>
            </div>
            <div className="div_delete-button">
              <button className="delete-button" onClick={this.deleteTask}>
                Borrar Tarea
              </button>
            </div>
          </div>

          <div className="container__newTask">
            <button className="button_newTask" onClick={() => this.setState({ openInput: true })}>
              Crear Tarea
            </button>
          </div>

        </div>
        {/* Termina Contenedor CRUD de Tareas */}

        {/* Inicia Contenedor Lista de Tareas */}
        <div className="container__tasks">
          {/* Formulario para crear nueva tarea */}
          <div className="container__input-task">
            {this.state.openInput && <form onSubmit={this.newTask}>
              <input className="input_task" required type="text" 
              placeholder="Nombre de la tarea" 
              value={this.state.taskName} 
              onChange={event => this.setState({ taskName: event.target.value })}/>
              <input className="input_start" required type="text" 
              placeholder="Fecha en que inicia la tarea"
              value={this.state.startDate} 
              onChange={event => this.setState({ startDate: event.target.value })}/>
              <input className="input_deadline" required type="text" 
              placeholder="Fecha en que termina la tarea" 
              value={this.state.finishDate} 
              onChange={event => this.setState({ finishDate: event.target.value })}/>
              <input className="input_type" required type="number" 
              placeholder="Tipo de tarea" 
              value={this.state.taskType} 
              onChange={event => this.setState({ taskType: event.target.value })}/>
              <input className="input_description" required type="text" 
              placeholder="Descripcion de la tarea" 
              value={this.state.taskDescription} 
              onChange={event => this.setState({ taskDescription: event.target.value })}/>
              <input className="button_save" type="submit" value="Enviar"/>
            </form>}
          </div>
          {/* Lista de tareas (nombre y descripcion) */}
          <div className="container__taskList">
            <ul>
            {this.state.tasks.map((task, index) =>
              <li key={index}>
                <input className="input-checkbox" type="checkbox" name={task.name} 
                onChange={this.updateCheckbox}/>

                <span className="task">{task.name} - {task.task_description}</span>
                
                {this.state.openEdit && task.checked &&
                <input className="inputToEdit" required type='text' name={task.name}  
                onKeyPress={this.editName} placeholder="Nuevo nombre de la tarea"/>}
              </li>
            )}
            </ul>
          </div>

        </div>
        {/* Termina Contenedor Lista de Tareas */}
      </div>
    );
  }
}

export default App;