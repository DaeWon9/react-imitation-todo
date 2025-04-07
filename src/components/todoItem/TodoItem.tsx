import ReactImitation, { useState, useEffect, useRef } from "daewon-react-imitation";
import Button, { ButtonSize, ButtonType } from "../button/Button";
import { todoStorage } from "../../storage/todoStorage";
import "./TodoItem.css";

interface TodoItemProps {
    id: number;
    index: number;
    isEnd: boolean;
    content: string;
    setTodoItemDatas: Function;
    draggedIndex: number | null;
    setUpdateState: Function;
    button?: string;
}

const TodoItem = ({
    id,
    index,
    isEnd,
    content,
    setTodoItemDatas,
    draggedIndex,
    setUpdateState,
    button,
}: TodoItemProps) => {
    const [isEditMode, setIsEditMode] = useState(false);
    const [isEndState, setIsEndState] = useState(isEnd);
    const [isHolding, setIsHolding] = useState(false);

    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const inputRef = useRef<HTMLInputElement>(null); // input ref 추가

    const handleClickItem = () => {
        if (isEditMode) return;

        todoStorage.updateIsEnd(id, isEndState).then((response) => {
            setIsEndState(response);
            setUpdateState(Math.random());
        });
    };

    const handleUpdateItem = () => {
        if (!inputRef.current) return; // ref가 없는 경우 방지

        const newContent = inputRef.current.value;

        if (newContent === content) {
            setIsEditMode(false);
            return;
        }

        todoStorage.update(id, newContent, isEndState).then((response) => {
            setIsEditMode(false);
            setTodoItemDatas(response);
        });
    };

    const handleMouseDown = () => {
        setIsHolding(true);
    };

    const handleMouseUp = () => {
        setIsHolding(false);
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
    };

    useEffect(() => {
        if (isHolding) {
            timerRef.current = setTimeout(() => {
                setIsEditMode(true);
            }, 2000);
        }
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, [isHolding]);

    useEffect(() => {
        if (draggedIndex !== null) {
            timerRef.current && clearTimeout(timerRef.current);
        }
    }, [draggedIndex]);

    useEffect(() => {
        todoStorage.getById(id).then((res) => {
            setIsEndState(res?.isEnd!);
            setUpdateState(Math.random());
        });
    }, [id]);

    useEffect(() => {
        setUpdateState(Math.random());
    }, [isEditMode]);

    return (
        <div
            className={`todo-item ${index === draggedIndex ? "dragged" : ""}`}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onTouchStart={handleMouseDown}
            onTouchEnd={handleMouseUp}
        >
            {isEditMode ? (
                <input ref={inputRef} autoFocus className="todo-input" type="text" maxLength={24} value={content} />
            ) : (
                <span key={id} onClick={handleClickItem} className={`todo-content ${isEndState ? "done" : ""}`}>
                    {content}
                </span>
            )}

            {isEditMode ? (
                <Button size={ButtonSize.SMALL} type={ButtonType.EDIT} onClick={handleUpdateItem}>
                    수정
                </Button>
            ) : (
                button
            )}
        </div>
    );
};

export default TodoItem;
