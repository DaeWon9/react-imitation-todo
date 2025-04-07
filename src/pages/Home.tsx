import ReactImitation, { useState } from "daewon-react-imitation";
import { ITodoItem } from "../storage/todoStorage";
import { TodoBox, LogBox } from "../components";
import "./Home.css";

const Home = () => {
    const [todoItemDatas, setTodoItemDatas] = useState<ITodoItem[]>([]);
    const [isLogShow, setIsLogShow] = useState<boolean>(false);

    return (
        <div className="container">
            <TodoBox
                todoItemDatas={todoItemDatas}
                setTodoItemDatas={setTodoItemDatas}
                isLogShow={isLogShow}
                setIsLogShow={setIsLogShow}
            />
            <LogBox isLogShow={isLogShow} todoItemDatas={todoItemDatas} />
        </div>
    );
};

export default Home;
