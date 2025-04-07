import ReactImitation, { useState, useEffect, useRef } from "daewon-react-imitation";
import TodoItem from "../todoItem/TodoItem";
import Button from "../button/Button";
import Space from "../space/Space";
import { ButtonSize, ButtonType } from "../button/Button";
import { ITodoItem, todoStorage } from "../../storage/todoStorage";
import "./TodoBox.css";

export interface TodoBoxProps {
    todoItemDatas: ITodoItem[];
    setTodoItemDatas: Function;
    isLogShow: boolean;
    setIsLogShow: Function;
}

const TodoBox = ({ todoItemDatas, setTodoItemDatas, isLogShow, setIsLogShow }: TodoBoxProps) => {
    const [updateState, setUpdateState] = useState<number>(0);

    const inputRef = useRef<HTMLInputElement>(null);
    const todoListRef = useRef<HTMLUListElement>(null);
    const draggedIndexRef = useRef<number | null>(null);

    const updateTodoItemDatas = () => {
        todoStorage.getAll().then((response) => {
            setTodoItemDatas(response);
        });
    };

    const handleDeleteTodo = (id: number) => {
        todoStorage.delete(id).then((res) => {
            setTodoItemDatas(res);
        });
    };

    const handleAddTodo = () => {
        inputRef.current?.blur(); // focus 해제
        const value = inputRef.current?.value;
        if (value && value.trim()) {
            todoStorage.create(value, false).then((response) => {
                setTodoItemDatas(response);
                if (inputRef.current) {
                    inputRef.current.value = ""; // ref로 직접 값 변경
                }
            });
        }
    };

    const handleKeyPress = (e: { key: string }) => {
        if (e.key === "Enter") handleAddTodo();
    };

    const handleDragStart = (index: number) => {
        draggedIndexRef.current = index;
    };

    const handleDragEnter = (index: number) => {
        draggedIndexRef.current = index;
    };

    const handleDragOver = (e: { preventDefault: () => void }) => {
        e.preventDefault();
    };

    const handleDragEnd = (index: number) => {
        const newTodoItemDatas = [...todoItemDatas];
        const draggedItem = newTodoItemDatas.splice(draggedIndexRef.current!, 1)[0];
        newTodoItemDatas.splice(index, 0, draggedItem);

        todoStorage.replaceAll(newTodoItemDatas).then((res) => {
            setTodoItemDatas(res);
            setUpdateState(Math.random());
        });
    };

    useEffect(() => {
        updateTodoItemDatas();
    }, []);

    return (
        <div className={`todo-box ${isLogShow ? "show-log" : "hide-log"}`}>
            <div className="title-row">
                <h1 className="title">My Todo App</h1>
                <div className="log-toggle-button" onClick={() => setIsLogShow(!isLogShow)}>
                    {isLogShow ? "<" : ">"}
                </div>
            </div>

            <Space size={36} />

            <div>
                <div className="input-wrapper">
                    <input
                        ref={inputRef}
                        id="todo-input"
                        className="todo-input"
                        type="text"
                        maxLength={24}
                        onKeyPress={handleKeyPress}
                    />
                    <Button size={ButtonSize.LARGE} type={ButtonType.ADD} onClick={handleAddTodo}>
                        등록
                    </Button>
                </div>
                <ul key={updateState} ref={todoListRef} className="todo-list">
                    {todoItemDatas.map((todoItem, index) => (
                        <li
                            key={todoItem.id}
                            draggable
                            onDragStart={() => handleDragStart(index)}
                            onDragEnter={() => handleDragEnter(index)}
                            onDragEnd={() => handleDragEnd(index)}
                            onDragOver={handleDragOver}
                        >
                            <TodoItem
                                id={todoItem.id}
                                index={index}
                                isEnd={todoItem.isEnd}
                                content={todoItem.content}
                                setTodoItemDatas={setTodoItemDatas}
                                draggedIndex={draggedIndexRef.current}
                                setUpdateState={setUpdateState}
                                button={
                                    <Button
                                        size={ButtonSize.SMALL}
                                        type={ButtonType.DELETE}
                                        onClick={() => handleDeleteTodo(todoItem.id)}
                                    >
                                        삭제
                                    </Button>
                                }
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default TodoBox;
