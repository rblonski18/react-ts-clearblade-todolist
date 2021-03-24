//in ToDoForm.tsx
import React, { useRef, useState, ChangeEvent, KeyboardEvent } from 'react'
import {TodoInterface, TodoFormInterface} from '../Interfaces'


const ToDoForm = (props: TodoFormInterface) => {

    let currID = 0;
    const inputRef = useRef<HTMLInputElement>(null)
    const [values, setValues] = useState('')

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        setValues(event.target.value)
    }
 
    function handleInputEnter(event: KeyboardEvent) {
        
        if (event.key === 'Enter') {
            
            const newTodo: TodoInterface = {
                data: {
                    id: String(currID++),
                    name: values,
                    iscompleted: false,
                }
            }

            props.handleTodoCreate(newTodo)

            if (inputRef && inputRef.current) {
                inputRef.current.value = ''
            }
        }
    }
 
    return (
        <div className="todo-form">
            <input
                ref={inputRef}
                type="text"
                placeholder='Enter new todo'
                onChange={event => handleInputChange(event)}
                onKeyPress={event => handleInputEnter(event)}
            />
        </div>
    )
}

export default ToDoForm