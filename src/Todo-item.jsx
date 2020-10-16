import React, {Component} from 'react';
import './Todo-item.css'


class TodoItem extends Component{
    constructor(props){
        super(props);
        this.state = {
            toEdit: false, 
            text: this.props.item.title,
            completed: false
        }
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this)
        this.handleTodoChange = this.handleTodoChange.bind(this)
        this.handleEditSubmit = this.handleEditSubmit.bind(this)
        this.toggleCompletion = this.toggleCompletion.bind(this)
    }
    handleDelete(){
        this.props.deleteMe(this.props.id);
    }
    handleEdit(){
        this.setState({toEdit: !this.state.toEdit})
    }
    handleTodoChange(evt){
        this.setState({text: evt.target.value})
    }
    handleEditSubmit(evt){
        evt.preventDefault();
        this.props.editMe(this.props.id, this.state.text);
        this.setState({toEdit: false})
    }
    toggleCompletion(){
        if(!this.state.toEdit){
            this.setState({completed: !this.state.completed})
        }
    }


    render(){
        const completedSign = {
            textDecoration: 'line-through',
            color: 'gray'
        }
        let result;
        if(this.state.toEdit ){
            result = (           
                <div>
                    <form onSubmit={this.handleEditSubmit}>
                        <input className='Todo-edit-input' name='text' value={this.state.text} onChange={this.handleTodoChange}/> 
                        {this.state.text ? <button title="update"><i className="far fa-check-circle" ></i></button> : null}
                    </form>
                </div>
            )

        }else{
            result = <span className='Todo-title'>{this.state.text}</span>
        }
        return (        
            <div className='TodoItem' >
                <span 
                    style={this.state.completed ? completedSign : null}
                    onClick={this.toggleCompletion}>{result}
                </span>
                <div className="Todo-icons">
                    <i className="fas fa-edit Todo-icon edit" onClick={this.handleEdit}></i>
                    <i className="fas fa-trash-alt Todo-icon delete" onClick={this.handleDelete}></i>
                </div>
            </div>
            
            
        )
    }
}

export default TodoItem;