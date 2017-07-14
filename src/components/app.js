/**
 * Created by Wilterson Garcia on 13/07/2017.
 */

import React from 'react';
import AddTodo from './add-todo';
import TodosList from './todos-list';
import {Button, Icons, Tabs, Tab} from 'react-materialize'

const todos = [
    {
        task: 'Lavar o Carro',
        isComplete: true
    },
    {
        task: 'Comprar Comida',
        isComplete: false
    },
    {
        task: 'Cozinhar',
        isComplete: false
    }
];

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            todos
        }
    }

    render() {
        const mainStyle = {
            padding: '50px 120px',
            fontFamily: 'Open Sans'
        };

        const appTitletyle = {
            textTransform: 'uppercase',
            fontFamily: 'Open Sans'
        };

        return (
            <div style={mainStyle}>
                <h1 className="center-align" style={appTitletyle}>ToDo List React</h1>

                <Tabs className='tabs-fixed-width'>
                    <Tab title="pendentes" active>
                        <AddTodo todos={this.state.todos} createTask={this.createTask.bind(this)}/>

                        <TodosList
                            todos={this.getPending()}
                            toggleTask={this.toggleTask.bind(this)}
                            saveTask={this.saveTask.bind(this)}
                            deleteTask={this.deleteTask.bind(this)}
                        />
                    </Tab>
                    <Tab title="concluidas">
                        <TodosList
                            todos={this.getDone()}
                            toggleTask={this.toggleTask.bind(this)}
                            saveTask={this.saveTask.bind(this)}
                            deleteTask={this.deleteTask.bind(this)}
                        />
                    </Tab>
                </Tabs>
            </div>
        );
    }

    toggleTask(task) {
        const foundTodo = _.find(this.state.todos, todo => todo.task === task);
        foundTodo.isComplete = !foundTodo.isComplete;
        this.setState({todos: this.state.todos});
    }

    createTask(task) {
        this.state.todos.push({
            task,
            isComplete: false
        });

        this.setState({ todos: this.state.todos });
    }

    saveTask(oldTask, newTask) {
        const foundTodo = _.find(this.state.todos, todo => todo.task === oldTask);
        foundTodo.task = newTask;
        this.setState({todos: this.state.todos});
    }

    deleteTask(taskToDelete){
        if(confirm('Tem certeza que deseja excluir?')) {
            _.remove(this.state.todos, todo => todo.task === taskToDelete);
            this.setState({ todos: this.state.todos });
        }
    }

    getDone(){
        const done = [];
        _.forEach(this.state.todos, function (value){
            if(value.isComplete){
                done.push(value);
            }
        });
        return done;
    }

    getPending(){
        const pending = [];
        _.forEach(this.state.todos, function (value){
            if(!value.isComplete){
                pending.push(value);
            }
        });
        return pending;
    }


}