import ReactImitation from "daewon-react-imitation";

interface SpaceProps {
    size: number;
}

const Space = (size: SpaceProps) => {
    return <div style={{ margin: `${size}px 0` }} />;
};

export default Space;
