import axios from "axios";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import setJWTToken from "../securityUtils/setJWTToken";
import jwt_decode from "jwt-decode";

export const login = LoginRequest => async dispatch => {
    try {
      // post => Login Request
      const res = await axios.post("http://localhost:8088/api/subscriber/login", LoginRequest);
      // extract token from res.data
      const { token } = res.data;
      // store the token in the localStorage
      localStorage.setItem("jwtToken", token);
      // set our token in header ***
      setJWTToken(token);
      // decode token on React
      const decoded = jwt_decode(token);
      // dispatch to our securityReducer
      dispatch({
        type: SET_CURRENT_USER,
        payload: decoded
      });
    } catch (err) {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    }
  };

  export const logout = () => dispatch => {
    localStorage.removeItem("jwtToken");
    setJWTToken(false);
    dispatch({
      type: SET_CURRENT_USER,
      payload: {}
    });
  };