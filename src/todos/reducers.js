import { CREATE_TODO,
  REMOVE_TODO, 
  MARK_COMPLETED, 
  LOAD_TODOS_IN_PROGRESS,
  LOAD_TODOS_SUCCESS,
  LOAD_TODOS_FAILURE } from "./actions";

export const isLoading = (state = false, action ) => {
  const {type } = action; 
  switch(type) {
  case LOAD_TODOS_IN_PROGRESS:
    return true;
  case LOAD_TODOS_SUCCESS:
  case LOAD_TODOS_FAILURE:
    return false; 
  default: 
    return state;    
  }
};


//reducers is a function named after the resource that it is managing
export const todos = (state = [], action) => {
  const {type, payload} = action;
  switch (type) {
  case CREATE_TODO: {
    const { todo } = payload;
    //be careful to not mutate the "state". leads to problems down the line
    return state.concat(todo);
  }
  case REMOVE_TODO: {
    const { todo: todoToRemove } = payload;
    return state.filter(todo => todo.id !== todoToRemove.id);
  }
  case MARK_COMPLETED: {
    const { todo: completedTodo } = payload;
    return state.map(todo => {
      if(todo.id === completedTodo.id) {
        return completedTodo;
      }
      return todo;
    });
  }
  case LOAD_TODOS_SUCCESS: {
    const { todos } = payload;
    return todos;
  }
  case LOAD_TODOS_IN_PROGRESS: 
  case LOAD_TODOS_FAILURE: 
  default:
    state;
  }
  return state; 
};