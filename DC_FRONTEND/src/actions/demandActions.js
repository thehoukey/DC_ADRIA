import axios from "axios";
import { 
        GET_DEMANDS,
        LOCATION_CHANGE,
        GET_DEMAND,
        GET_DEMANDS_ALL,
        GET_DEMANDS_ACCOUNT,
        GET_DEMANDS_STATUS,
        GET_DEMANDS_DATE,
        GET_DEMANDS_DATE_ACCOUNT,
        GET_DEMANDS_DATE_STATUS,
        GET_DEMANDS_ACCOUNT_STATUS,
        GET_ERRORS
 } from "./types";

export const createDemand=(demand,history)=>async dispatch=>{
    try{
        const res =await axios.post("http://localhost:8088/api/demand",demand)
        dispatch({
          type:LOCATION_CHANGE,
          payload:history.location.pathname
        })
        history.push("/dashboard")
      }catch (err) {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        });
        dispatch({
          type:LOCATION_CHANGE,
          payload:""
        })
      }
    
}

export const getDemand=(id)=>async dispatch=>{
    
  const res =await axios.get(`http://localhost:8088/api/demand/${id}`)
  dispatch({
      type:GET_DEMAND,
      payload:res.data
  })
  dispatch({
    type:LOCATION_CHANGE,
    payload:""
  })

}
export const sendDemand=(id)=>async dispatch=>{
    
  const res =await axios.get(`http://localhost:8088/api/demand/${id}`)
  const demand=res.data;
  demand.status="sent";
  demand.dateEnvoie=new Date();
  const res1 =await axios.post("http://localhost:8088/api/demand",demand)
  const res3 =await axios.get(`http://localhost:8088/api/demand/${id}`)
dispatch({
  type:GET_DEMAND,
  payload:res3.data
})
}
export const abandonDemand=(id)=>async dispatch=>{
  //console.log(id)
  const res =await axios.get(`http://localhost:8088/api/demand/${id}`)
  const demand=res.data;
  demand.status="abandoned";
  const res1 =await axios.post("http://localhost:8088/api/demand",demand)
  const res2 =await axios.get("http://localhost:8088/api/demand/all/username")
  const res3 =await axios.get(`http://localhost:8088/api/demand/${id}`)
  dispatch({
    type:GET_DEMANDS,
    payload:res2.data
})
dispatch({
  type:GET_DEMAND,
  payload:res3.data
})
}



export const getDemands=()=>async dispatch=>{
    
        const res =await axios.get("http://localhost:8088/api/demand/all/username")
        dispatch({
            type:GET_DEMANDS,
            payload:res.data
        })
    
}

export const getDemandsByConditions=(conditions)=>async dispatch=>{
    
        let res;
        let date1=conditions.date1;
        let date2=conditions.date2;
        let num=conditions.numCompte;
        let status=conditions.status;
        if(date1!=="" && date2!=="" && num!=="" && status!=="")
        {
         res =await axios.get(`http://localhost:8088/api/demand/account/${num}/${status}/${date1}/${date2}`)
         dispatch({
           type:GET_DEMANDS_ALL,
            payload:res.data
          })
        }

        if(date1!=="" && date2!=="" && num==="" && status==="")
        {
         res =await axios.get(`http://localhost:8088/api/demand/username/${date1}/${date2}`)
         dispatch({
           type:GET_DEMANDS_DATE,
            payload:res.data
          })
        }

        if(date1!=="" && date2!=="" && num!=="" && status==="")
        {
         res =await axios.get(`http://localhost:8088/api/demand/account/${num}/${date1}/${date2}`)
         dispatch({
           type:GET_DEMANDS_DATE_ACCOUNT,
            payload:res.data
          })
        }

        if(date1!=="" && date2!=="" && num==="" && status!=="")
        {
         res =await axios.get(`http://localhost:8088/api/demand/username/${status}/${date1}/${date2}`)
         dispatch({
           type:GET_DEMANDS_DATE_STATUS,
            payload:res.data
          })
        }

        if(num!=="" && status!=="" && date1==="" && date2==="")
       { 
        res =await axios.get(`http://localhost:8088/api/demand/account/${num}/${status}`)
        dispatch({
            type:GET_DEMANDS_ACCOUNT_STATUS,
            payload:res.data
        })
        }
         if(status!=="" && num==="" && date1==="" && date2==="")
        {
         res =await axios.get(`http://localhost:8088/api/demand/username/${status}`)
        dispatch({
         type:GET_DEMANDS_STATUS,
         payload:res.data
                })    
        }
        if(num!=="" && status==="" && date1==="" && date2==="")
        {
         res =await axios.get(`http://localhost:8088/api/demand/account/${num}`)
         dispatch({
         type:GET_DEMANDS_ACCOUNT,
         payload:res.data
                  })       
        }  
    
}