import React from 'react'
import 'clearblade-js-client/lib/mqttws31'
import 'clearblade-js-client'

import TodoItem from './TodoTask'
import { TodoListInterface } from '../Interfaces'

const ToDoList = (props: TodoListInterface) => {
        return (
          <div className="todo-list">
            <ul>
              {props.todos.map((todo) => (
                <li key={todo.id}>
                  <TodoItem 
                    todo={todo}
                    handleTodoUpdate={props.handleTodoUpdate}
                    handleTodoRemove={props.handleTodoRemove}
                    handleTodoComplete={props.handleTodoComplete}
                  />
                </li>
              ))}
            </ul>
          </div>
        );
}

export default ToDoList;