import React from "react";


function Login(props){
    return(
        <div className="login-container">
            <h1 className="welcome-message">welcome to decentralised voting application</h1>
            <button className="login-button" onClick={props.connectWallet}>Login Metamask</button>
        </div>
    );
}
export default Login;