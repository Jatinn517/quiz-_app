// fetch question hook to fetch api data and set value to store
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"

//redux actions
import * as Action from '../redux/question_reducer'
import { getServerData } from "../helper/helper"

export const useFetchQuestion = () => {
    const dispatch = useDispatch();

    const [getData, setGetData] = useState({ isLoading: false, apiData: [], serverError: null })

    useEffect(() => {
        setGetData(prev => ({ ...prev, isLoading: true }));

        // async function fetch backend data
        (async () => {
            try {
                // const url = `${process.env.REACT_APP_SERVER_HOSTNAME}`
                // console.log(process.env.PORT);
                const [{questions,answers}] = await getServerData("http://localhost:5000/api/questions", (data)=>data) 
                // console.log({questions,answers});
                if (questions.length > 0) {
                    setGetData(prev => ({ ...prev, isLoading: false }));
                    setGetData(prev => ({ ...prev, apiData: {questions,answers} }));

                    // dispatch on action
                    dispatch(Action.startExamAction({question : questions,answers}))
                }
                else {
                    throw new Error("No Question Available")
                }
            } catch (error) {
                setGetData(prev => ({ ...prev, isLoading: false }));
                setGetData(prev => ({ ...prev, serverError: error }));
            }
        })();
    }, [dispatch])
    return [getData, setGetData]
}


// moveAction dispath function
export const MoveNextAction = () => async (dispatch) => {
    try {
        dispatch(Action.moveNextAction());
    } catch (error) {
        console.log(error)
    }
}