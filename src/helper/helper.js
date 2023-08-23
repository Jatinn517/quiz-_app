import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import axios from 'axios'

export function attempts_Number(result) {
    var attempt=0;
    for(var i=0;i<result.length;i++){
        if(result[i]!==undefined)
        attempt++;
    }
    return attempt;
    return result.filter(r => r !== undefined).length;
}

export function earnPoints_Number(result, answers, points) {
    var res = 0;
    for (var i = 0; i < answers.length; i++) {
        if (answers[i] === result[i]) {
            res=res+10;
        }
    }
    return res;
    // return result.map((element, i) => answers[i] === element).filter(i => i).map(i => points).reduce((prev, curr) => prev + curr, 0)
}

export function flagResult(totalpoints, earnPoints) {
    return (totalpoints * 0.5) < earnPoints;
}

//check user auth
export function CheckUserExist({ children }) {
    const auth = useSelector(state => state.result.userID)
    return auth ? children : <Navigate to={'/'} replace={true}></Navigate>
}

//get server data
export async function getServerData(url, callback) {
    const data = await (await axios.get(url))?.data;
    return callback ? callback(data) : data;
}

// post server data
export async function postServerData(url, result, callback) {
    const data = await (await axios.post(url, result))?.data;
    return callback ? callback(data) : data;
}

