import React, { useState, FC, ChangeEvent, useEffect } from 'react';
import './App.css';
import { ClearBlade } from 'clearblade-js-client'
import 'clearblade-js-client/lib/mqttws31';
import ToDoForm from './Components/ToDoForm'
import ToDoList from './Components/ToDoList'

import { TodoInterface } from './Interfaces'

const App: FC = () => {

  const cb = new ClearBlade();
  const [todos, setTodos] = useState<TodoInterface[]>([])

  useEffect(() => {

    /*
    fetch("https://platform.clearblade.com/admin/auth", {
      method: 'POST',
      body: JSON.stringify({
        email: 'roryjblonski@gmail.com',
        password: 'tempPassword',
      }),
    }).then(response => response.json())
      .then(data => initCallback) */

    
    cb.init({
      URI: "https://platform.clearblade.com",
      systemKey: "eee5a7850ca2a4baabc2d686dc3f",
      systemSecret: "EEE5A7850CC0EBFCAEC5ADA9D18C01",
      //email: "roryjblonski@gmail.com",
      //password: "tempPassword",
      callback: initCallback
    });
    
  })
  
  
  function initCallback(err: boolean, msg: any) {
    if(err) {
      throw new Error(msg);
    } else {
      var collection = cb.Collection({collectionName: 'Todo-List'});
      collection.fetch(collectionFetchCallback);
    }
  }

  function collectionFetchCallback(err: any, rows: any) {
    if(err) {
      throw new Error(rows);
    } else {
      console.log(rows);
      const newTodosState: TodoInterface[] = rows;
      setTodos(newTodosState);
    }
  }
    
  function handleTodoCreate(todo: TodoInterface) {

    var collection = cb.Collection({collectionName: 'Todo-List'});
    collection.create(todo, (err: any, data: any) => {
      if(err)
        throw new Error(data);
      else {
        return data;
      }
    })
    
    const newTodosState: TodoInterface[] = [...todos]
    newTodosState.push(todo)
    setTodos(newTodosState)
  }
  
  function handleTodoUpdate(event: ChangeEvent<HTMLInputElement>, id: string) {

    const newTodosState: TodoInterface[] = [...todos]
    newTodosState.find((todo: TodoInterface) => todo.data.id === id)!.data.name = event.target.value
    setTodos(newTodosState)
  }

 function handleTodoRemove(id: string) {
    const newTodosState: TodoInterface[] = todos.filter((todo: TodoInterface) => todo.data.id !== id)
    setTodos(newTodosState)
 }

function handleTodoComplete(id: string) {

  const query = cb.Query({collectionName: "Todo-List"});
  const qCheck: any = query.equalTo('id', id);

  let changes = {
    iscompleted: true
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
  
  newTodosState.find((todo: TodoInterface) => todo.data.id === id)!.data.iscompleted = !newTodosState.find((todo: TodoInterface) => todo.data.id === id)!.data.iscompleted
  setTodos(newTodosState)
}

return (
  <div className="App">
      <h2>My ToDo App</h2>
      <ToDoForm
        todos={todos}
        key={"todo-form"}
        handleTodoCreate={handleTodoCreate}
      />
      <ToDoList
        todos={todos}
        key={"todo-list"}
        handleTodoUpdate={handleTodoUpdate}
        handleTodoRemove={handleTodoRemove}
        handleTodoComplete={handleTodoComplete}
      />
  </div>
 );
}

export default App;
