import React, { useState, FC, ChangeEvent } from 'react';
import './App.css';
import { ClearBlade } from 'clearblade-js-client'
import 'clearblade-js-client/lib/mqttws31';
import ToDoForm from './Components/ToDoForm'
import ToDoList from './Components/ToDoList'

import { TodoInterface } from './Interfaces'

const App: FC = () => {

  const cb = new ClearBlade();
  const [todos, setTodos] = useState<TodoInterface[]>([])

  cb.init({
    URI: "https://platform.clearblade.com/",
    systemKey: "eee5a7850ca2a4baabc2d686dc3f",
    systemSecret: "EEE5A7850CC0EBFCAEC5ADA9D18C01",
    email: "roryjblonski@gmail.com",
    password: "tempPassword",
    callback: initCallback
  });

  function initCallback(err: boolean, cb: any) {
    if(err) {
      throw new Error(cb);
    } else {
      var collection = cb.Collection({collectionName: 'Todo-List'});
      collection.fetch(collectionFetchCallback);
    }
  }

  function collectionFetchCallback(err: any, rows: any) {
    if(err) {
      throw new Error(rows);
    } else {
      const newTodosState: TodoInterface[] = rows;
      setTodos(newTodosState);
    }
  }

  
    
  function handleTodoCreate(todo: TodoInterface) {
    const newTodosState: TodoInterface[] = [...todos]
    newTodosState.push(todo)
    setTodos(newTodosState)
  }
  
  function handleTodoUpdate(event: ChangeEvent<HTMLInputElement>, id: string) {
    const newTodosState: TodoInterface[] = [...todos]
    newTodosState.find((todo: TodoInterface) => todo.id === id)!.name = event.target.value
    setTodos(newTodosState)
  }

 function handleTodoRemove(id: string) {
    const newTodosState: TodoInterface[] = todos.filter((todo: TodoInterface) => todo.id !== id)
    setTodos(newTodosState)
 }

function handleTodoComplete(id: string) {

    const query = cb.Query({collectionName: "Todo-List"});
    const qCheck: any = query.equalTo('id', id);

    let changes = {
      isCompleted: true
    };
    
  const callback = (err: any, data: any) => {
    if(err) {
      throw new Error(err)
    } else {
      return data;
    }
  }

  const collection = cb.Collection({collectionName: "Todo-List"});
  collection.update(qCheck, changes, callback);
  
  const newTodosState: TodoInterface[] = [...todos]
  
  newTodosState.find((todo: TodoInterface) => todo.id === id)!.isCompleted = !newTodosState.find((todo: TodoInterface) => todo.id === id)!.isCompleted
  setTodos(newTodosState)
}

return (
  <div className="App">
      <h2>My ToDo App</h2>
      <ToDoForm
        todos={todos}
        handleTodoCreate={handleTodoCreate}
      />
      <ToDoList
        todos={todos}
        handleTodoUpdate={handleTodoUpdate}
        handleTodoRemove={handleTodoRemove}
        handleTodoComplete={handleTodoComplete}
      />
  </div>
 );
}

export default App;
