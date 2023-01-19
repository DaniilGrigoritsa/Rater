import { Navigate } from 'react-router-dom';
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const Private = ({page}) => {
    let {authTokens} = useContext(AuthContext);
    
    return authTokens ? <div>{page}</div> : <Navigate to="/login" />
}

export default Private;
