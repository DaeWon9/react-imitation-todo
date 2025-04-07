import ReactImitation, { useEffect, useState, useRef } from "daewon-react-imitation";
import LogItem from "../logItem/LogItem";
import Badge from "../badge/Badge";
import { ILog, logStorage } from "../../storage/logStorage";
import { ITodoItem } from "../../storage/todoStorage";
import "./LogBox.css";
import Space from "../space/Space";

export interface ILogBoxProps {
    isLogShow: boolean;
    todoItemDatas: ITodoItem[];
}

const LogBox = ({ isLogShow, todoItemDatas }: ILogBoxProps) => {
    const [logDatas, setLogDatas] = useState<ILog[]>([]);
    const logListRef = useRef<HTMLUListElement>(null);

    useEffect(() => {
        logStorage.getAll().then((response) => setLogDatas(response));
    }, [todoItemDatas]);

    useEffect(() => {
        if (logListRef.current) {
            logListRef.current.scrollTop = 0;
        }
    }, [logDatas]);

    const handleTrashCan = () => {
        isLogShow &&
            logStorage.clear().then(() => {
                setLogDatas([]);
            });
    };

    return (
        <div className={`logBox ${isLogShow ? "show" : "hide"}`}>
            <h1 className="title">Log</h1>
            <Space size={36} />
            <ul ref={logListRef} className="logList">
                {logDatas.map((log) => (
                    <li>
                        <LogItem
                            key={log.id}
                            content={log.content}
                            oldContent={log.oldContent}
                            type={log.type}
                            badge={<Badge type={log.type} />}
                        />
                    </li>
                ))}
            </ul>
            <div className="trashIcon" onClick={handleTrashCan}>
                🗑
            </div>
        </div>
    );
};

export default LogBox;
