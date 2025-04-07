import { BadgeType } from "../components";
import { logStorage } from "./logStorage";

export interface ITodoItem {
    id: number;
    content: string;
    isEnd: boolean;
}

const TODO_KEY = "ITodoItems";
let todoIdCounter = parseInt(localStorage.getItem("todoIdCounter") || "1");

const saveTodos = (todos: ITodoItem[]) => {
    localStorage.setItem(TODO_KEY, JSON.stringify(todos));
    localStorage.setItem("todoIdCounter", String(todoIdCounter));
};

export const todoStorage = {
    getAll: async (): Promise<ITodoItem[]> => {
        const todos = JSON.parse(localStorage.getItem(TODO_KEY) || "[]");
        return todos.slice();
    },

    getById: async (id: number): Promise<ITodoItem | undefined> => {
        const todos = JSON.parse(localStorage.getItem(TODO_KEY) || "[]");
        return todos.find((todo: ITodoItem) => todo.id === id);
    },

    create: async (content: string, isEnd: boolean): Promise<ITodoItem[]> => {
        const todos: ITodoItem[] = JSON.parse(localStorage.getItem(TODO_KEY) || "[]");
        const newTodo: ITodoItem = {
            id: todoIdCounter++,
            content,
            isEnd,
        };
        todos.unshift(newTodo);
        saveTodos(todos);

        await logStorage.create(content, BadgeType.ADD);

        return todos;
    },

    update: async (id: number, content: string, isEnd: boolean): Promise<ITodoItem[] | null> => {
        const todos: ITodoItem[] = JSON.parse(localStorage.getItem(TODO_KEY) || "[]");
        const todo = todos.find((t) => t.id === id);
        if (todo) {
            const oldContent = todo.content;
            todo.content = content;
            todo.isEnd = isEnd;
            saveTodos(todos);

            await logStorage.create(content, BadgeType.EDIT, oldContent);
            return todos;
        }
        return null;
    },

    updateIsEnd: async (id: number, isEnd: boolean): Promise<boolean> => {
        const todos: ITodoItem[] = JSON.parse(localStorage.getItem(TODO_KEY) || "[]");
        const todo = todos.find((t) => t.id === id);
        if (todo) {
            todo.isEnd = !isEnd;
            saveTodos(todos);
            return !isEnd;
        }
        return isEnd;
    },

    delete: async (id: number): Promise<ITodoItem[] | null> => {
        let todos: ITodoItem[] = JSON.parse(localStorage.getItem(TODO_KEY) || "[]");
        const index = todos.findIndex((t) => t.id === id);
        if (index !== -1) {
            const [deleted] = todos.splice(index, 1);
            saveTodos(todos);

            await logStorage.create(deleted.content, BadgeType.DELETE);
            return todos;
        }
        return null;
    },

    replaceAll: async (newTodos: ITodoItem[]): Promise<ITodoItem[]> => {
        todoIdCounter = newTodos.length + 1;
        saveTodos(newTodos);
        return newTodos;
    },
};
