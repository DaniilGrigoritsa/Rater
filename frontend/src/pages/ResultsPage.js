import { Link } from "react-router-dom";
import {
    getAllMyOngoingArts,
    getAllMyFinnihedArts,
    getAllMyOngoingVotes,
    getAllMyFinnishedVotes
} from "../scripts/getActivityData.js";
import AuthContext from "../context/AuthContext";
import { useContext, useEffect, useState } from 'react'; 


const logo = require("../img/logo.svg");


const MyFinnishedVotes = () => {
    const {authTokens} = useContext(AuthContext);
    const [arts, setArts] = useState([]);

    useEffect(() => {
        const asyncCall = async () => {
            const arts = await getAllMyFinnishedVotes(authTokens);
            setArts(arts);
        }
        asyncCall();
    }, [])

    const finnishedVotes = arts.map((art) =>
        <div className="act-div" key={art.id}>
            <div className="act-block vote">
                <a href={art.image0} target="_blank"><img src={art.image0}/></a>
            </div>
            <span className="act-vs">VS</span>
            <div className="act-block vote-2">
                <a href={art.image1} target="_blank"><img src={art.image1}/></a>
            </div>
            <div className="act-div2">
                <div className="act-win">WIN: + {art.win}&nbsp;RTR</div>
                <time className="act-time" dateTime="2022-08-18 23:16:38">{art.time}</time>
                <div className="act-row">{art.votes}&nbsp;VOTES FROM {art.total_votes}</div>
            </div>
        </div>
    )

    if (arts) return (<div>{finnishedVotes}</div>)
    else return ( <div>No finished votes</div> )
}

const MyOngoingVotes = () => {
    const {authTokens} = useContext(AuthContext);
    const [arts, setArts] = useState([]);

    useEffect(() => {
        const asyncCall = async () => {
            const arts = await getAllMyOngoingVotes(authTokens);
            setArts(arts);
        }
        asyncCall();
    }, [])

    const ongoingVotes = arts.map((art) =>
        <div className="act-div" key={art.id}>
            <div className="act-block vote">
                <a href={art.image0} target="_blank"><img src={art.image0}/></a>
            </div>
            <span className="act-vs">VS</span>
            <div className="act-block">
                <a href={art.image1} target="_blank"><img src={art.image1}/></a>
            </div>
            <div className="act-div2">
                <div className="act-rate">RATE: {art.votes}&nbsp;%&nbsp;/ ..&nbsp;%</div>
                <div className="act-row">{art.already_voted}&nbsp;VOTES FROM {art.total_votes}</div>
            </div>
        </div>
    )

    if (arts) return (<div>{ongoingVotes}</div>)
    else return ( <div>No ongoing votes</div> )
}

const MyFinnishedArts = () => {
    const {authTokens} = useContext(AuthContext);
    const [arts, setArts] = useState([]);

    
    useEffect(() => {
        const asyncCall = async () => {
            const arts = await getAllMyFinnihedArts(authTokens);
            setArts(arts);
        }
        asyncCall();
    }, [])
    

    console.log("ARTS", arts)
    console.log(typeof(arts))

    const finishedArts = arts.map((art) => 
        <div className="act-div" key={art.id}>
            <div className="act-block vote">
                <a href={art.image0} target="_blank"><img src={art.image0}/></a>
            </div>
            <span className="act-vs">VS</span>
            <div className="act-block vote-2">
                <a href={art.image1} target="_blank"><img src={art.image1}/></a>
            </div>
            <div className="act-div2">
                <div className="start finish">
                    <span>START:</span>
                    <time dateTime="2022-08-18 23:16:38">{art.start}</time>
                </div>
                <div className="start finish">
                    <span>FINISH:</span>
                    <time dateTime="2022-08-18 23:16:38">{art.finish}</time>
                </div>
                <div className="act-row">{art.votes}&nbsp;VOTES FROM {art.total_votes}</div>
            </div>
        </div>
    )

    if (arts) return (<div>{finishedArts}</div>)
    else return (<div>No finished shows</div>)
}

const MyOngoingArts = () => {
    const {authTokens} = useContext(AuthContext);
    const [arts, setArts] = useState([]);

    useEffect(() => {
        const asyncCall = async () => {
            const arts = await getAllMyOngoingArts(authTokens);
            setArts(arts);
        }
        asyncCall();
    }, [])

    const ongoingArts = arts.map((art) => 
        <div className="act-div" key={art.id}>
            <div className="act-block vote-2">
                <a href={art.image0} target="_blank"><img src={art.image0}/></a>
            </div>
            <span className="act-vs">VS</span>
            <div className="act-block vote">
                <a href={art.image1} target="_blank"><img src={art.image1}/></a>
            </div>
            <div className="act-div2">
                <div className="start">
                    <span>START:</span>
                    <time dateTime="2022-08-18 23:16:38">{art.start}</time>
                </div>
                <div className="act-row act-row-2">{art.votes}&nbsp;VOTES FROM {art.total_votes}</div>
            </div>
        </div>
    )

    if (arts) return (<div>{ongoingArts}</div>)
    else return ( <div>No ongoing arts</div> )
}


const ResultsPage = ({balance}) => {

    return (
        <div className="container">
            <div className="header">
                <Link className="logo" to="/">
                    <img src={logo.default} alt="логотип"/>
                </Link>
                <span className="balance">My&nbsp;balance: {balance} RTR</span>
            </div>
            <nav className="act-div">
                <a className="act-button" href="#tab-1">MY ART</a>
                <a className="act-button" href="#tab-2">MY VOTE</a>
            </nav>
            <div id="tab-1" className="act-tab">
                <div className="flex">
                    <div>
                    <ul className="list-reset">
                        <li className="act-item">
                            <div className="act-btn">ONGOING</div>
                            <MyOngoingArts />
                        </li>
                        <li className="act-item">
                            <div className="act-btn">FINISHED</div>
                            <MyFinnishedArts />
                        </li>
                    </ul>
                    </div>
                </div>
            </div>
            <div id="tab-2" className="act-tab">
                <div className="flex">
                    <div>
                    <ul className="list-reset">
                        <li className="act-item">
                            <div className="act-btn">ONGOING</div>
                            <MyOngoingVotes />
                        </li>
                        <li className="act-item">
                            <div className="act-btn">FINISHED</div>
                            <MyFinnishedVotes /> 
                        </li>
                    </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResultsPage;