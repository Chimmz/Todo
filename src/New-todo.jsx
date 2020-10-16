import React, {Component} from 'react';
import './New-todo.css';
import {v4 as uuidv4} from 'uuid';

class NewTodo extends Component{
    constructor(props){
        super(props);
        this.state = {
            title: '',

        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleChange(evt){
        this.setState({[evt.target.name]: evt.target.value})
    }
    handleSubmit(evt){
        evt.preventDefault();
        this.props.addMe({...this.state, id: uuidv4()})
        // this.setState({title: ''})
    }
    render(){
        return (
            // this.props.readyToAdd ?
                <div className="NewTodo-section">
                    <span className='Todo-undo' onClick={this.undoLastAction}>
                            <i className="fas fa-undo"></i> Undo
                    </span>
                    <form className="NewTodo" onSubmit={this.handleSubmit}>
                        <input placeholder='Enter a new item' autoComplete='off'
                            name='title'
                            value={this.state.title} 
                            onChange={this.handleChange}
                        />
                        {/* <span className='NewTodo-cancel'>&times;</span> */}
                        <button style={{display: this.state.title ? 'inline' : 'none'}}>
                            Add item
                        </button>
                    </form>
                </div>
            // : null
        )
    }
}
export default NewTodo;