/**
 * Created by Wilterson Garcia on 13/07/2017.
 */

import React from 'react';
import {Button, Icon} from 'react-materialize';

export default class AddTodo extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            error: null
        };
    }

    renderError(){
        if(!this.state.error)
            return null;

        return <div style={{color: 'red' }}>{this.state.error}</div>
    }

    render(){

        const inputStyle = {
            width: '88%',
            marginTop: '25px'
        };

        const buttonStyle = {
            float: 'right',
            marginTop: '25px'
        };

        return (
            <form onSubmit={this.handleCreate.bind(this)}>
                <input type="text" placeholder="Nome da Tarefa" ref="createInput" style={inputStyle}/>
                <Button waves='light' style={buttonStyle}>Add<Icon right>playlist_add</Icon></Button>
                {this.renderError()}
            </form>
        );
    }

    handleCreate(event){
        event.preventDefault();

        const createInput = this.refs.createInput;
        const task = createInput.value;
        const validateInput = this.validateInput(task);

        if(validateInput){
            this.setState({ error: validateInput });
            return;
        }

        this.setState({ error: null });
        this.props.createTask(task);
        this.refs.createInput.value = "";
    }

    validateInput(task){
        if(!task){
            return "Tarefa não pode estar em branco.";
        } else if(_.find(this.props.todos, todo => todo.task === task)){
            return "Tarefa já existe";
        }else{
            return null;
        }
    }
}