import React from "react";
import { useState, useContext, useEffect } from "react";
import { Link } from 'react-router-dom';
import AuthContext from "../context/AuthContext";
import axios from "axios";


const logo = require("../img/logo.svg");


const getPackageList = async () => {

    const url = 'http://127.0.0.1:8000/api/get/package/';

    const packages = await axios.get(url, {
        headers: {
          'content-type': 'multipart/form-data',
        }
    })

    return packages.data;
} 


const handleSend = async (image0, image1, id, authTokens) => {

    const url = 'http://127.0.0.1:8000/api/post/show/';
    
    console.log("Image 0", image0)
    console.log("Image 1", image1)
    console.log("Id", id)
    
    console.log("CALL")
    const data = { 
        arts: [image0, image1],
        package: id
    }

    

    await axios.post(url, data, {
        headers: {
          'content-type': 'multipart/form-data',
          'Authorization': `Token ${authTokens.access}`
        }
    })
}


const Packages = (image0, image1) => {
    const {authTokens} = useContext(AuthContext);
    const [response, setResponse] = useState([]);

    const [choosed, setChoosed] = useState(null);
    const [itemId, setItemId] = useState(0);

    const chooseItem = (element, id) => {
        console.log("iiiiiiiiiiiiiddddddddddd", id)
        setChoosed(element);
        setItemId(id);
    }

    useEffect(() => {
        const asyncCall = async () => {
            const response = await getPackageList();
            setResponse(response);
        }
        asyncCall();
    }, [])

    console.log("ITEMID", itemId)

    const packages = response.map((pack) =>
        <li onClick={() => chooseItem("first", pack.id)}
        className={choosed=="first" ? "set-item flex choosed" : "set-item flex"} key={pack.id}>
            <span className="set-number">{pack.amount}</span>
            <span className="set-compr">comparison</span>
            <span className="set-price">{pack.price}  RTR</span>
        </li>
    )

    return (
        <div className="flex">
            <p className="set-descr">Choose number of&nbsp;comparison</p>
            <ul className="set-list list-reset">
                {packages}
            </ul>
            <p className="set-descr">debit RTR from my&nbsp;account</p>
            <Link to="/">
                <button onClick={() => handleSend(image0.image0, image0.image1, itemId, authTokens)} 
                        className={choosed ? "btn-reset set-button" : "set-button-blocked"}>
                    SEND
                </button>
            </Link>
        </div>
    )
}

const OrderPage = ({balance, image0, image1}) => {

    return (
      <div className="container">
        <div className="header">
            <Link className="logo" to="/">
                <img src={logo.default} alt="logo" />
            </Link>
            <span className="balance">My&nbsp;balance: {balance} RTR</span>
        </div>
        <Packages image0={image0} image1={image1}/>
      </div>
    )
}

export default OrderPage;
