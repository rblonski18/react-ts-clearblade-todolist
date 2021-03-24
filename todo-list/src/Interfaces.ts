import React from "react";

export interface TodoInterface {
    data: {
        id: string;
        name: string;
        iscompleted: boolean;
    }
}

export interface TodoFormInterface {
    todos: TodoInterface[];
    handleTodoCreate: (todo: TodoInterface) => void;
}

export interface TodoListInterface {
    handleTodoUpdate: (event: React.ChangeEvent<HTMLInputElement>, id: string) => void;
    handleTodoRemove: (id: string) => void;
    handleTodoComplete: (id: string, isComp: boolean) => void;
    todos: TodoInterface[];
}

export interface TodoItemInterface {
    handleTodoUpdate: (event: React.ChangeEvent<HTMLInputElement>, id: string) => void;
    handleTodoRemove: (id: string) => void;
    handleTodoComplete: (id: string, isComp: boolean) => void;
    todo: TodoInterface;
}