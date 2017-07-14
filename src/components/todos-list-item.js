/**
 * Created by Wilterson Garcia on 13/07/2017.
 */

import React from 'react';
import {Button, Icon} from 'react-materialize';

export default class TodosListItem extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isEditing: false
        };
    }

    renderActionsSection() {
        const buttonStyle = {
            margin: '0 10px',
        };

        const tableStyle = {
            textAlign: 'center'
        };

        const columnStyle ={
            textAlign: 'center'
        };

        if (this.state.isEditing) {
            return (
                <td style={columnStyle}>
                    <Button waves='light' onClick={this.onSaveClick.bind(this)} style={buttonStyle}>
                        Salvar<Icon right>save</Icon>
                    </Button>

                    <Button waves='light' className="red" onClick={this.onCancelClick.bind(this)} style={buttonStyle}>
                        Cancelar<Icon right>close</Icon>
                    </Button>
                </td>
            );
        }

        return (
            <td style={tableStyle}>
                <Button waves='light' onClick={this.onEditClick.bind(this)} style={buttonStyle}>
                    Editar<Icon right>mode_edit</Icon>
                </Button>

                <Button waves='light' className="red" onClick={this.props.deleteTask.bind(this, this.props.task)} style={buttonStyle}>
                    Deletar<Icon right>delete</Icon>
                </Button>
            </td>
        );
    }

    renderTaskSection(){

        const { task, isComplete } = this.props;

        const taskStyle = {
            color: isComplete ? '#4db6ac' : '#333',
            cursor: 'pointer'
        };

        const inputStyle ={
            width: '100%'
        };

        if(this.state.isEditing){
            return(
                <td>
                    <form onSubmit={this.onSaveClick.bind(this)}>
                        <input type="text" defaultValue={task} ref="editInput" style={inputStyle}/>
                    </form>
                </td>
            );
        }

        return(
            <td style={taskStyle} onClick={this.props.toggleTask.bind(this, task)}>
                {task}
            </td>
        );
    }

    render() {
        return (
            <tr>
                {this.renderTaskSection()}
                {this.renderActionsSection()}
            </tr>
        );
    }

    onEditClick() {
        this.setState({isEditing: true});
    }

    onCancelClick(){
        this.setState({isEditing: false});
    }

    onSaveClick(event){
        event.preventDefault();

        const oldTask = this.props.task;
        const newTask = this.refs.editInput.value;

        this.props.saveTask(oldTask, newTask);
        this.setState({ isEditing: false });
    }
}