import React, { Component } from 'react'
import ListDemand from './ListDemand';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getAccounts} from '../../actions/accountActions';
import {getDemands,getDemandsByConditions} from '../../actions/demandActions';
import ReactNotification from "react-notifications-component";

class Dashboard extends Component {

    constructor() {
        super();
    
        this.state = {
          numCompte:"",
          status:"",
          date1:"",
          date2:""
        };
    
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.notificationDOMRef = React.createRef();
      }

      onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
      }
      onSubmit(e) {
        e.preventDefault();
        this.props.getDemandsByConditions(this.state);
      }
     componentDidMount() {
      
        this.props.getAccounts();
        this.props.getDemands();
        const location=this.props.location;
        if(location==="/addDemand") this.addNotification()
        else if(location!=="") this.editNotification()
        
      } 

      _onFocus(e){
        e.currentTarget.type = "date";
    }
    _onBlur2(e){
        e.currentTarget.type = "text";
        e.currentTarget.placeholder = "Date Fin";
    }
    _onBlur1(e){
      e.currentTarget.type = "text";
      e.currentTarget.placeholder = "Date Debut";
  }

  addNotification=()=>{
    this.notificationDOMRef.current.addNotification({
     title: "Success",
     message: "demand created succefully!",
     type: "success",
     insert: "top",
     container: "top-center",
     animationIn: ["animated", "fadeIn"],
     animationOut: ["animated", "fadeOut"],
     dismiss: { duration: 2000 },
     dismissable: { click:true },

   })
 }
 editNotification=()=>{
  this.notificationDOMRef.current.addNotification({
   title: "Success",
   message: "demand updated succefully!",
   type: "success",
   insert: "top",
   container: "top-center",
   animationIn: ["animated", "fadeIn"],
   animationOut: ["animated", "fadeOut"],
   dismiss: { duration: 2000 },
   dismissable: { click:true },

 })
}

    render() {
        
        const {accounts}=this.props.account;
        const {demands}=this.props.demand;
        return (
            <div>
            <div className="demand">
              <div className="container">
                <div className="row">
                  <div className="col-md-12 m-auto">
                  <h1><small style={{color:'#EB5C09'}}>Liste des demandes</small></h1>
                    <hr />
                    <form onSubmit={this.onSubmit}>
                    <div className="row">
                      <div className="col">
                           <select name="numCompte" defaultValue={'-1'} className="form-control form-control-lg" onChange={this.onChange}>
                             <option value="-1" disabled>Numéro de compte</option>
                                {accounts.map(account => (
                               <option value={account.numCompte}  key={account.id}>{account.numCompte}</option>
                               ))}
                    </select>
                      </div>
                      <div className="col">
                        <input
                          className="form-control form-control-lg"
                          name="date1"
                          type="text" 
                          onFocus = {this._onFocus} 
                          onBlur={this._onBlur1}
                          onChange={this.onChange}
                          value={this.state.date1}
                        />
                      </div>
                      <div className="col">
                        <input
                          className="form-control form-control-lg"
                          name="date2"
                          type="text"
                          onFocus = {this._onFocus} 
                          onBlur={this._onBlur2}
                          onChange={this.onChange}
                          value={this.state.date2}
                        />
                      </div>
                      <div className="col">
                      <select name="status" defaultValue={'-1'} className="form-control form-control-lg" onChange={this.onChange} >
                      <option value="-1" disabled>Status</option>
                      <option value="registred" className="text-info">Registred</option>
                      <option value="sent" className="text-success">Sent</option>
                      <option value="abandoned" className="text-danger">Abandoned</option>
                    </select>
                      </div>
                      </div>
                      <div className="row justify-content-end">
                      <div className="col-md-2">
                      <button
                        type="submit"
                        className="btn text-white btn-block mt-4"
                        style={{backgroundColor:'#EB5C09'}}
                      >
                      <span className="fas fa-search"/>{' '}
                      Rechercher
                      </button>
                      </div>
                      </div>
                      <br/>
                      <div className="row">
                      <div className="col">
                      <ReactNotification ref={this.notificationDOMRef} />
                      <ListDemand demands={demands} history={this.props.history}/>
                      </div>
                      </div>

                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
    }
}

Dashboard.propTypes = {
    getAccounts: PropTypes.func.isRequired,
    account: PropTypes.object.isRequired,
    demand: PropTypes.object.isRequired,
    getDemands: PropTypes.func.isRequired,
    getDemandsByConditions:PropTypes.func.isRequired
  };

  const mapStateToProps = state => ({
    account: state.account,
    demand: state.demand,
    location:state.location.previousLocation
  });
  
  export default connect(mapStateToProps,{ getAccounts,getDemands,getDemandsByConditions} )(Dashboard);