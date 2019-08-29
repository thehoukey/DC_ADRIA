import { 
    GET_DEMANDS,
    GET_DEMAND,
    GET_DEMANDS_ALL,
    GET_DEMANDS_ACCOUNT,
    GET_DEMANDS_STATUS,
    GET_DEMANDS_ACCOUNT_STATUS,
    GET_DEMANDS_DATE,
    GET_DEMANDS_DATE_ACCOUNT,
    GET_DEMANDS_DATE_STATUS
} from "../actions/types";


const initialState={
    demands:[],
    demand:{}

}

export default function(state=initialState,action){
    switch (action.type) {
        case GET_DEMANDS:
            
            return{
                ...state,demands:action.payload
            };
            case GET_DEMAND:
            
                return{
                    ...state,demand:action.payload
                };
         case GET_DEMANDS_ALL:
            
                return{
                    ...state,demands:action.payload
                };

          case GET_DEMANDS_ACCOUNT:
            
             return{
                    ...state,demands:action.payload
                }; 

          case GET_DEMANDS_DATE_ACCOUNT:
            
             return{
                    ...state,demands:action.payload
                 }; 
          case GET_DEMANDS_DATE_STATUS:
            
             return{
                    ...state,demands:action.payload
                    }; 
          case GET_DEMANDS_STATUS:
            
                return{
                     ...state,demands:action.payload
                     };
          case GET_DEMANDS_DATE:
            
                return{
                     ...state,demands:action.payload
                      };
          case GET_DEMANDS_ACCOUNT_STATUS:
            
                return{
                        ...state,demands:action.payload
                     }; 

        default:
            return state;
    }
}