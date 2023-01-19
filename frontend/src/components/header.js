import React, {useContext} from "react";
import { Link } from 'react-router-dom'
import AuthContext from "../context/AuthContext";

const Header = () => {
    let {authTokens, logoutUser} = useContext(AuthContext)
    return (
        <div>
            <Link to='/'>Home</Link>
            <span> | </span>
            {authTokens ? (
                <p onClick={logoutUser}>Logout</p>
            ): (
                <Link to='/login'>Login</Link>
            )}
        </div>
    )
}

export default Header;
