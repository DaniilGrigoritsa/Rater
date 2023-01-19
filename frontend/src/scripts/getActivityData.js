import axios from "axios";

const getActivity = async (authTokens) => {

    const url = 'http://127.0.0.1:8000/api/get/activity/';

    const activity = await axios.get(url, {
        headers: {
          'content-type': 'application/json',
          'Authorization': 'Token ' + authTokens.access
        }
    })

    console.log(activity)

    return activity.data;
}


export const getAllMyFinnihedArts = async (authTokens) => {
    const responce = await getActivity(authTokens);
    const data = responce.finished_shows;
    let id = 0;

    const shows = data.map((art) => {
        const show = {
            "id": id,
            "start": art.start_time,
            "finish": art.finish_time,
            "total_votes": art.total_votes,
            "votes": art.votes[0]["%"],
            "image0": art.votes[0].url,
            "image1": art.votes[1].url
        }
        id++;
        return show;
    })

    console.log("Finished arts", shows)
    
    return shows;
}


export const getAllMyOngoingArts = async (authTokens) => {

    const responce = await getActivity(authTokens);
    const data = responce.ongoing_shows;
    let id = 0;

    const shows = data.map((art) => {
        const show = {
            "id": id,
            "start": art.start_time,
            "total_votes": art.total_votes,
            "votes": art.votes[0]["%"],
            "image0": art.votes[0].url,
            "image1": art.votes[1].url
        }
        id++;
        return show;
    })

    return shows; 
}

export const getAllMyFinnishedVotes = async (authTokens) => {

    const responce = await getActivity(authTokens);
    const data = responce.finished_votes;
    let id = 0;

    const votes = data.map((art) => {
        const vote = {
            "id": id,
            "time": art.timastamp,
            "total_votes": art.total_votes,
            "win": art.reward,
            "votes": art.votes[0]["%"],
            "image0": art.votes[0].url,
            "image1": art.votes[1].url
        }
        id++;
        return vote;
    })

    return votes;
}

export const getAllMyOngoingVotes = async (authTokens) => {

    const responce = await getActivity(authTokens);
    const data = responce.ongoing_votes;
    let id = 0;

    const votes = data.map((art) => {
        const vote = {
            "id": id,
            "time": art.timastamp,
            "total_votes": art.total_votes,
            "already_voted": art.already_votes,
            "votes": art.votes[0]["%"],
            "image0": art.votes[0].url,
            "image1": art.votes[1].url
        }
        id++;
        return vote;
    })

    return votes; 
}
