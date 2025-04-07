import ReactImitation from "daewon-react-imitation";
import { BadgeType } from "../badge/Badge";
import "./LogItem.css";

export interface LogItemProps {
    content: string;
    oldContent: string;
    type: BadgeType;
    badge: string;
}

const LogItem = ({ content, oldContent, type, badge }: LogItemProps) => {
    return (
        <li className="log-item">
            {type === BadgeType.EDIT ? (
                <div className="log-item__edit">
                    <span className="log-item__old">{oldContent}</span> → <span>{content}</span>
                </div>
            ) : (
                content
            )}
            {badge}
        </li>
    );
};

export default LogItem;
