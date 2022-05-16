import {Route, Routes} from "react-router-dom";
import App from "./Components/App/App";
import Home from "./Components/Home/Home";
import Auth from "./Components/Auth/Auth";
import React from "react";

function ListRoutes(){
    return (
        <Routes>
            <Route path="/" element={<App />}>
                <Route index element={<Home />} />
            </Route>
            <Route path="/auth/*" element={<Auth />} />
        </Routes>
    );
}

export default ListRoutes;