import React, {useContext} from "react";
import AuthContext from "../context/AuthContext";

const logo = require("../img/logo.svg");


const LoginPage = () => { 

    let {loginUser} = useContext(AuthContext);

    return (
      <div className="container flex">
        <div className="index-logo">
          <img src={logo.default} alt="rater-logo" />
        </div>
        <form onSubmit={loginUser}>
            <input className="index-user" type='text' name='username' placeholder='Enter Username'/>
            <input className="index-password" type='password' name='password' placeholder='Enter Password'/>
            <input className="index-link btn-reset" type='submit'/>
        </form>
      </div>
    )
}

export default LoginPage;