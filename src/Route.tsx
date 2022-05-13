import {Routes, Route} from "react-router-dom";
import App from "./Components/App/App";

const SystemRouteConfig = [
    {
        path: '/',
        element: <App/>
    }
]

function createRouteDom() {
    return SystemRouteConfig.map(function (route, index) {
        return (
            <Route key={index} path={route.path} element={route.element}/>
        );
    });
}

function SystemRoute() {
    return (
        <Routes>
            {createRouteDom()}
        </Routes>
    );
}

export default SystemRoute;