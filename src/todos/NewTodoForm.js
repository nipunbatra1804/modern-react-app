import React, { useState } from "react";
import "./NewTodoForm.css";
import { connect } from "react-redux";
import { createTodo } from "./actions";
import { addTodoRequest } from "./thunk";

// connect()(NewTodoForm)

const NewTodoForm = ({todos, onCreatePressed}) => {
  const [inputValue, setInputValue] = useState("");
  return (
    <div className="new-todo-form">
      <input 
        className="new-todo-input" 
        type="text" value={inputValue}
        placeholder="Type your new todo here" 
        onChange={e => {console.log(e.target.value);setInputValue(e.target.value);}}
      />
      <button className="new-todo-button" onClick={
        () => {
          console.log(">>>>>>>",inputValue);
          const isDuplicate = todos.some(todo => todo === inputValue);
          if(!isDuplicate) {
            onCreatePressed(inputValue);
            setInputValue("");
          }
        }
      }>Create Todo</button>
    </div>
  );
};

const mapStateToProps = state => ({
  todos: state.todos,
});
const mapDispatchToProps = dispatch => ({
  onCreatePressed: text => dispatch(addTodoRequest(text))
});

export default connect(mapStateToProps, mapDispatchToProps)(NewTodoForm);