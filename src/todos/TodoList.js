import React, {useEffect} from "react";
import TodoListItem from "./TodoListItem";
import NewTodoForm from "./NewTodoForm";
import {connect} from "react-redux";
import { displayAlert, loadTodos, markCompleteTodoRequest, removeTodoRequest } from "./thunk";
import { getTodosLoading, getCompletedTodos, getIncompleteTodos } from "./selectors";
import styled from "styled-components";

const ListWrapper = styled.div`
    max-width: 700px;
    margin: auto;
`;

// eslint-disable-next-line react/prop-types
const TodoList = ({ completedTodos = [],incompleteTodos=[], onRemovePressed, onMarkCompleted, isLoading, startLoadingTodos}) => {
  useEffect(() => {
    startLoadingTodos();
  }, []);


  const loadingMessage  = <div>Loading todos ....</div>;
  
  if(isLoading) {
    return loadingMessage;
  }
  return (
    <ListWrapper>
      <NewTodoForm/>
      <h3>Incomplete:</h3>
      {incompleteTodos.map(todo => <TodoListItem todo={todo} onRemovePressed={onRemovePressed} onMarkCompleted={onMarkCompleted} key={todo.id} />)}
      <h3>Complete:</h3>
      {completedTodos.map(todo => <TodoListItem todo={todo} onRemovePressed={onRemovePressed} onMarkCompleted={onMarkCompleted} key={todo.id} />)}
    </ListWrapper>
  );
};

const mapStateToProps = state => ({
  isLoading: getTodosLoading(state),
  completedTodos: getCompletedTodos(state),
  incompleteTodos: getIncompleteTodos(state)
});

const mapDispatchToProps = dispatch => ({
  onRemovePressed: id => dispatch(removeTodoRequest(id)), 
  onMarkCompleted: id => dispatch(markCompleteTodoRequest(id)),
  onDisplayAlertClicked: text => dispatch(displayAlert(text)),
  startLoadingTodos: () => dispatch(loadTodos())
});

export default connect(mapStateToProps,mapDispatchToProps)(TodoList); 