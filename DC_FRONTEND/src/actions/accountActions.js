import axios from "axios";
import { GET_ACCOUNTS,GET_ACCOUNT, GET_ERRORS } from "./types";


export const getAccounts=()=>async dispatch=>{
    
    const res =await axios.get("http://localhost:8088/api/demand/all/accounts/username")
    dispatch({
        type:GET_ACCOUNTS,
        payload:res.data
    })
    dispatch({
        type:GET_ERRORS,
        payload:{}
    })
    dispatch({
        type:GET_ACCOUNT,
        payload:{}
    })

}
export const getAccount=(compte)=>async dispatch=>{
    dispatch({
       type:GET_ACCOUNT,
        payload:JSON.parse(compte)
    })
}