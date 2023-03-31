import Form_Login from "./Form_Login";
import Form_Signup from "./Form_Signup";
import React from "react";

function Login() {
    const [myBool, setState] = React.useState(true);

    return (
        <div className="loginpage">
            <div className="container">
                {myBool ? <Form_Login stateChanger={setState} /> : <Form_Signup stateChanger={setState} />}
            </div>
        </div>
    );
}

export default Login;