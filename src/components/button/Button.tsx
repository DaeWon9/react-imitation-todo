import ReactImitation from "daewon-react-imitation";
import "./Button.css";

export enum ButtonType {
    DELETE = "DELETE",
    EDIT = "EDIT",
    ADD = "ADD",
}

export enum ButtonSize {
    SMALL = "SMALL",
    LARGE = "LARGE",
}

interface ButtonProps {
    children?: string;
    type: ButtonType;
    size: ButtonSize;
    onClick: () => void;
}

const Button = ({ children, type, size, onClick }: ButtonProps) => {
    return (
        <button className={`button button--${type} button--${size}`} onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;
