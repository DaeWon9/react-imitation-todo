import ReactImitation from "daewon-react-imitation";
import "./Badge.css";

export enum BadgeType {
    DELETE = "DELETE",
    EDIT = "EDIT",
    ADD = "ADD",
}

export interface BadgeProps {
    type: BadgeType;
}

const Badge = ({ type }: BadgeProps) => {
    return <div className={`badge badge--${type}`}>{type}</div>;
};

export default Badge;
