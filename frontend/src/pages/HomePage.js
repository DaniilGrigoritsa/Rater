import { logDOM } from "@testing-library/react";
import React, { useEffect, useState, useContext} from "react";
//import { create, urlSource } from "ipfs-http-client";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import useAxios from '../utils/useAxios'

const logo = require("../img/logo.svg");
const garbage = require("../img/garbage.svg");
const plus = require("../img/plus.svg");

const HomePage = ({balance, setImage0, image0, setImage1, image1}) => {

    const {authTokens, logoutUser} = useContext(AuthContext);

    let api = useAxios();

    useEffect(() => {
        setImage0(plus.default);
        setImage1(plus.default);
    }, [])

    const loadImages = async (authTokens) => {
        // добавить картинки в ipfs 

        /*
        const ipfs = create('https://ipfs.infura.io:5001/api/v0');
        console.log(ipfs);
        const file0 = await ipfs.add(image0File);
        console.log(file0);
        */

        // передать картики в order компонент 
    }

    const onImage0Change = (event) => {
        if (event.target.files && event.target.files[0]) {
            let image = (URL.createObjectURL(event.target.files[0]));
            setImage0(image);
        }
    }

    const onImage1Change = (event) => {
        if (event.target.files && event.target.files[0]) {
            let image = (URL.createObjectURL(event.target.files[0]));
            setImage1(image);
            console.log(image);
        }
    }

    return (
        <div className="container">
            <div className="header">
                <a className="logo">
                    <img src={logo.default} alt="логотип" />
                </a>
                <span className="balance">My balance: {balance} RTR</span>
            </div>
            <div className="block-start">
                <Link className="link-start" to="/results">ACTIVITY</Link>
                <Link className="link-start" to="/vote">VOTE</Link>
            </div>
            <ul className="list-reset list-start">
                <label className="input-file">
                    <input type="file" onChange={onImage0Change} />
                    <img className="NFTImage" src={image0} />
                    <button onClick={() => setImage0(plus.default)} className="trash-button">
                        <img src={garbage.default} className="garbage-start" alt="garbage" />
                    </button>
                </label>
                <label className="input-file">
                    <input type="file" onChange={onImage1Change} />
                    <img className="NFTImage" src={image1} />
                    <button onClick={() => setImage1(plus.default)} className="trash-button">
                        <img src={garbage.default} className="garbage-start" alt="garbage" />
                    </button>
                </label>
            </ul>
            <Link onClick={() => loadImages(authTokens)} 
                className="link-start link-last-start" 
                to={image0 != plus.default? image1 != plus.default? "/order" : "/" : "/"}>
                ORDER
            </Link>
        </div>
    )
}

export default HomePage;
