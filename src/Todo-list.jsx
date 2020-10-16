import React, {Component} from 'react';
import TodoItem from './Todo-item';
import './TodoContainer.css';
import './Todo-list.css'
import './Todo-item.css'
import './New-todo.css';
import NewTodo from './New-todo';


class TodoList extends Component{
    constructor(props){
        super(props);
        this.state = {
            items: [],
            actions: [],
            readyToAdd: false
        }
        this.addItem = this.addItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.editItem = this.editItem.bind(this)
        this.undoLastAction = this.undoLastAction.bind(this);
        this.undoLastAction = this.undoLastAction.bind(this);
        this.readyToAdd = this.readyToAdd.bind(this)
    }
    componentWillUnmount(){
        console.log('In Componet will unmount')
    }
    readyToAdd(){
        if(this.state.items){
            this.setState({readyToAdd: true});
        }
        
    }
    addItem(itemObj){
        this.setState((state) => {
            return {
                items: [...this.state.items, itemObj], 
                actions: [...this.state.actions, {itemObj, action: 'ADD'}]
            };
        })
        // console.log(this.state.actions)
    }
    deleteItem(itemId){
        let theItem = [this.state.items.find((item, index) => {
            return item.id===itemId; 
        }), this.state.items.findIndex((item) => {
            return item.id===itemId
        })]

        let itemObj = theItem[0];
        let itemIndex = theItem[1]

        this.setState((state) => {
            return {actions: [...this.state.actions, {itemObj, initialPosition: itemIndex, action: 'DELETE'}]}
        })

        this.setState((state) => {
            return {items: [...this.state.items].filter(itm => itm.id!==itemId)}
        })
        
    }
    editItem(itemId, updatedTitle){
        const updatedList = this.state.items.map((item) => {
            if(item.id===itemId){
                return {...item, title: updatedTitle}
                
            }else{
                return item;
            }
        })
        this.setState((state) => {
            return {items: updatedList}
        })
    }
    undoLastAction(){
        const lastAction = this.state.actions.pop()
        // console.log()
        if(lastAction.action==='ADD'){
            this.deleteItem(lastAction.itemObj.id)
        }
        console.log(this.state.actions)
    }
    
    render(){
        return (
            <div className='TodoContainer'>
                <section className='header'>
                    <div className="header__text-box">
                        <h1>To-do List</h1>
                        <p>A simple to-do list app with React.js</p>
                    </div>
                </section>
                    
                <div className='TodoList'>
                    {!this.state.items.length ? 
                        <div className='TodoList-empty'>
                            <span className='TodoList-heading list-empty'>
                                Your list is empty
                            </span>
                            {/* {!this.state.readyToAdd ? */}
                                {/* <span>
                                    <i 
                                        title="Add a new item" 
                                         onClick={this.readyToAdd} 
                                        className="fas fa-plus-circle Todo-ready-to-add">                    
                                    </i>
                                </span> */}
                            
                        </div>
                        :
                        <span className='TodoList-heading'>Your List</span>
                    }
                    
                    {this.state.items.map((item) => (
                        <TodoItem 
                            key={item.id}
                            id={item.id}
                            item={item}
                            deleteMe={this.deleteItem}
                            editMe={this.editItem}
                        />
                    ))}
                </div>
                
                <NewTodo addMe={this.addItem} readyToAdd={this.state.readyToAdd}/>
            </div>
        )
    }
}

export default TodoList;