import React from 'react'
import { TodoItemInterface } from "../Interfaces"

const TodoItem = (props: TodoItemInterface) => {
    return (
        <div className="todo-item">
            <div onClick={() => props.handleTodoComplete(props.todo.data.id, props.todo.data.iscompleted)}>
                {props.todo.data.iscompleted ? (
                    <span className="todo-item-checked">&#x2713;</span>
                ) : (
                    <span className="todo-item-unchecked" />
                )}
                </div>
            <div className="todo-item-input-wrapper">
                <input 
                    value={props.todo.data.name}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => props.handleTodoUpdate(event, props.todo.data.id)}
                />
            </div>
            <div className="item-remove" 
                onClick={() => props.handleTodoRemove(props.todo.data.id)}>
                    x
            </div>
        </div>
    )
}

export default TodoItem;