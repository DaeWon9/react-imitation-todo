import ReactImitation, { useState, useEffect, useRef } from "daewon-react-imitation";
import Button, { ButtonSize, ButtonType } from "../button/Button";
import { todoStorage } from "../../storage/todoStorage";
import "./TodoItem.css";

interface TodoItemProps {
    key: number;
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
    const [oldContent, setOldContent] = useState(content);
    const [isEditMode, setIsEditMode] = useState(false);
    const [isEndState, setIsEndState] = useState(isEnd);
    const [isHolding, setIsHolding] = useState(false);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleClickItem = () => {
        if (isEditMode) return;

        todoStorage.updateIsEnd(id, isEndState).then((response) => {
            setIsEndState(response);
        });
    };

    const handleUpdateItem = () => {
        if (oldContent === content) {
            setIsEditMode(false);
            return;
        }

        todoStorage.update(id, oldContent, isEndState).then((response) => {
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
        setUpdateState(Math.random());
    }, [isEditMode, isEndState, oldContent]);

    return (
        <div
            className={`todo-item ${index === draggedIndex ? "dragged" : ""}`}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onTouchStart={handleMouseDown}
            onTouchEnd={handleMouseUp}
        >
            {isEditMode ? (
                <input
                    autoFocus
                    className="todo-input"
                    type="text"
                    maxLength={24}
                    value={oldContent}
                    onChange={(e: { target: HTMLInputElement }) => setOldContent((e.target as HTMLInputElement).value)}
                />
            ) : (
                <span onClick={handleClickItem} className={`todo-content ${isEndState ? "done" : ""}`}>
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
