import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import axios from "axios";

const logo = require("../img/logo.svg");
const plus = require("../img/plus.svg");

const VotePage = () => {

    const navigate = useNavigate();
    const TIME_INTERVAL = 60;

    const {authTokens} = useContext(AuthContext);
    const [image0, setImage0] = useState(plus.default);
    const [image1, setImage1] = useState(plus.default);
    const [over, setOver] = useState(false);
    const [time, setTime] = useState(TIME_INTERVAL);
    const [image0Id, setImage0Id] = useState(0);
    const [image1Id, setImage1Id] = useState(0);

    const tick = () => {
        if (over) return;

        if (time == 0) {
            setOver(true);
        } 
        else {
            setTime(time - 1);
        }
    }

    const generateRandomPair = async () => {

        const url = 'http://127.0.0.1:8000/api/get/show/';

        console.log(1)
        const pair = await axios.get(url, {
            headers: {
              'content-type': 'application/json',
              'Authorization': 'Token ' + authTokens.access
            }
        })


        console.log("Pair", pair)
    

        setImage0Id(pair[0].id);
        setImage1Id(pair[1].id);
        setImage0(pair[0].url); 
        setImage1(pair[1].ulr);

        setTime(TIME_INTERVAL);
    }

    const handleVote = async (image, index) => {    

        const url = 'http://127.0.0.1:8000/api/post/vote/';
        const data = {
            "result": index? image1 : image1
        }

        await axios.post(url, data, {
            headers: {
              'content-type': 'application/json',
              'Authorization': 'Token ' + authTokens.access
            }
        })

        await generateRandomPair();
    }

    useEffect(() => {
        const timerID = setInterval(() => tick(), 1000);
        if (!time) {
            navigate("/");
        }
        return () => clearInterval(timerID);
    }, [time])

    useEffect(() => {
        const pair = async () => {
            await generateRandomPair();
        }
        pair();
    }, [])

    console.log(time)

    return (
    <div className="container">
        <Link className="logo" to="/">
            <img src={logo.default} alt="логотип" />
        </Link>
        <div className="flex">
            <p className="voting-text">Which art are you choose for mint?</p>
            <div className="voting-block">
                <ul className="list-reset">
                    <button onClick={() => handleVote(image0, 0)} className="voting-item">
                        <img src={image0} className="voting-plus" alt="plus" />
                    </ button>
                    <button onClick={() => handleVote(image1, 1)} className="voting-item">
                        <img src={image1} className="voting-plus" alt="plus" />
                    </ button>
                </ul>
            </div>
        </div> 
        <div className="voting-rows">
            <div className="voting-row1"></div>
            <div className="voting-row2"></div>
        </div>
    </div>
    )
}

export default VotePage;