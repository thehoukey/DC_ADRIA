import React from 'react';
import logo from './logo.svg';
import './App.css';
//import Dashboard from './components/Dashboard';
import Header from './components/Layout/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import AddDemand from './components/Project/AddDemand';
import Dashboard from './components/Project/Dashboard';
import store from  './store';
import ViewDemand from './components/Project/ViewDemand';
import UpdateDemand from './components/Project/UpdateDemand';
import Landing from './components/Layout/Landing';
import Login from './components/SubscriberManagement/Login';
import jwt_decode from "jwt-decode";
import setJWTToken from "./securityUtils/setJWTToken";
import { SET_CURRENT_USER } from "./actions/types";
import { logout } from "./actions/securityActions";
import SecuredRoute from './securityUtils/SecuredRoute';

const jwtToken = localStorage.jwtToken;

if (jwtToken) {
  setJWTToken(jwtToken);
  const decoded_jwtToken = jwt_decode(jwtToken);
  store.dispatch({
    type: SET_CURRENT_USER,
    payload: decoded_jwtToken
  });

  const currentTime = Date.now() / 1000;
  if (decoded_jwtToken.exp < currentTime) {
    store.dispatch(logout());
    window.location.href = "/";
  }
}


function App() {
  return (
    <Provider store={store}>
    <Router>
    <div className="App">
   <Header/>
   {
    //Public Routes
  }

  <Route exact path="/" component={Landing} />
  <Route exact path="/login" component={Login} />

  {
    //Private Routes
  }
   <Switch>
   <SecuredRoute exact path="/dashboard"  component={Dashboard}/>
   <SecuredRoute exact path="/addDemand" component={AddDemand}/>
   <SecuredRoute exact path="/updateDemand/:id" component={UpdateDemand}/>
   <SecuredRoute exact path="/viewDemand/:id" component={ViewDemand}/>
   </Switch>
   </div>
   </Router>
   </Provider>
  );
}

export default App;
