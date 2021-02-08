import React, {useEffect} from "react";
import TodoListItem from "./TodoListItem";
import "./TodoList.css";
import NewTodoForm from "./NewTodoForm";
import {connect} from "react-redux";
import { markCompleted } from "./actions";
import { displayAlert, loadTodos, markCompleteTodoRequest, removeTodoRequest } from "./thunk";

// eslint-disable-next-line react/prop-types
const TodoList = ({ todos = [], onRemovePressed, onMarkCompleted, isLoading, startLoadingTodos}) => {
  useEffect(() => {
    startLoadingTodos();
  }, []);


  const loadingMessage  = <div>Loading todos ....</div>;
  
  if(isLoading) {
    return loadingMessage;
  }
  return (
    <div className="list-wrapper">
      <NewTodoForm/>
      {todos.map(todo => <TodoListItem todo={todo} onRemovePressed={onRemovePressed} onMarkCompleted={onMarkCompleted} key={todo.id} />)}
    </div>
  );
};

const mapStateToProps = state => ({
  todos: state.todos,
  isLoading: state.isLoading
});

const mapDispatchToProps = dispatch => ({
  onRemovePressed: id => dispatch(removeTodoRequest(id)), 
  onMarkCompleted: id => dispatch(markCompleteTodoRequest(id)),
  onDisplayAlertClicked: text => dispatch(displayAlert(text)),
  startLoadingTodos: () => dispatch(loadTodos())
});

export default connect(mapStateToProps,mapDispatchToProps)(TodoList); 