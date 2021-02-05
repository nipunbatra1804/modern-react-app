import { CREATE_TODO, REMOVE_TODO, MARK_COMPLETED } from "./actions";

//reducers is a function named after the resource that it is managing
export const todos = (state = [], action) => {
    const {type, payload} = action;
    switch (type) {
        case CREATE_TODO: {
            const { text } = payload;
            const newTodo = {
                text, 
                isCompleted: false
            };
            //be careful to not mutate the "state". leads to problems down the line
            return state.concat(newTodo);
        }
        case REMOVE_TODO: {
            const { text } = payload;
            return state.filter(todo => todo.text !== text);
        }
        case MARK_COMPLETED: {
            const { text } = payload;
            console.log(text)
            return state.map(todo => {
                if(todo.text === text) {
                    todo.isCompleted = true
                }
                return todo;
            })
        }
        default:
            state;
    }
    return state; 
}