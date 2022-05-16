import {Route, Routes} from "react-router-dom";
import Register from "./Register";
import Assets from "../../Assets";
import "./Auth.scss";

function Auth() {
    return (
        <div id="AuthBox">
            <div className="AuthBox-left" style={{
                backgroundImage: 'url(' + Assets('bg_left_auth') + ')'
            }}></div>
            <div className="AuthBox-right">
                <Routes>
                    <Route path="register" element={<Register />} />
                </Routes>
            </div>
        </div>
    );
}

export default Auth;