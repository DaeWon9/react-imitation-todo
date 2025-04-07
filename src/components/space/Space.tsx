import ReactImitation from "daewon-react-imitation";
import "./space.css";

interface SpaceProps {
    size: number;
}

const Space = ({ size }: SpaceProps) => {
    return <div className={`space-${size}`} />;
};

export default Space;
