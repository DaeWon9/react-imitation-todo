import ReactImitation, { createRouter } from "daewon-react-imitation";
import Home from "./pages/Home";

export const App = () => {
    return createRouter({
        routes: [{ path: "/", element: Home }],
    });
};
