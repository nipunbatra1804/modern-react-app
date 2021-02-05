import React from 'react';
import TodoListItem from './TodoListItem';
import "./TodoList.css"
import NewTodoForm from "./NewTodoForm";
import {connect} from "react-redux";
import { markCompleted, removeTodo } from './actions';

const TodoList = ({ todos = [], onRemovePressed, onMarkCompleted}) => (
    <div className="list-wrapper">
        <NewTodoForm/>
        {todos.map(todo => <TodoListItem todo={todo} onRemovePressed={onRemovePressed} onMarkCompleted={onMarkCompleted} key={todo.text} />)}
    </div>
)

const mapStateToProps = state => ({
    todos: state.todos,
})

const mapDispatchToProps = dispatch => ({
    onRemovePressed: text => dispatch(removeTodo(text)), 
    onMarkCompleted: text => dispatch(markCompleted(text))
})

export default connect(mapStateToProps,mapDispatchToProps)(TodoList); 