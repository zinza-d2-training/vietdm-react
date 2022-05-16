import {Route, Routes} from "react-router-dom";
import Register from "./Register";

function Auth() {
    return (
        <div id="AuthBox">
            <div className="AuthBox-left"></div>
            <div className="AuthBox-right">
                <Routes>
                    <Route path="register" element={<Register />} />
                </Routes>
            </div>
        </div>
    );
}

export default Auth;