import {combineReducers} from "redux"
import accountReducer from "./accountReducer";
import demandReducer from "./demandReducer";
import locationReducer from "./locationReducer";
import securityReducer from "./securityReducer";
import errorReducer from "./errorReducer";

export default combineReducers({
    errors:errorReducer,
    account:accountReducer,
    demand:demandReducer,
    location:locationReducer,
    security:securityReducer
});