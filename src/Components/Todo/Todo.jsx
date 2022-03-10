import React from "react";
// import { scryRenderedDOMComponentsWithClass } from "react-dom/test-utils";

function Todo({children, todo, handleDelete, handleCheck})  {
    return(
        <li className="todo__item" style={{ textDecoration: todo.isCompleted ? 'line-through' : 'none' }}>
            <input 
            type="checkbox" 
            data-todo-id={todo.id}  
            onClick={handleCheck}
            defaultChecked={todo.isCompleted} 
            />
            {children}
            <button className="btn__delete" data-todo-id={todo.id} onClick={handleDelete }>
                &times;
            </button>
        </li>
    )
    
}

export default Todo;