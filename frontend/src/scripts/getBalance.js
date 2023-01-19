import axios from "axios";

const url = "http://127.0.0.1:8000/api/get/balance/";

export const getBalance = async (authTokens) => {
    const balance = await axios.get(url, {
        headers: {
          'content-type': 'application/json',
          'Authorization': 'Token ' + authTokens.access
        }
    })

    return balance;
}