import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getAccounts,getAccount} from '../../actions/accountActions';
import {createDemand} from '../../actions/demandActions';
import classnames from "classnames";
import "react-notifications-component/dist/theme.css";
class AddDemand extends Component {
    
  constructor() {
    super();

    this.state = {
      motif: "",
      status: "registred",
      type:"",
      compte: {'test':true},
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

       componentDidMount() {
        this.props.getAccounts();
      }
      componentWillReceiveProps(nextProps){
        if (nextProps.errors) {
          this.setState({ errors: nextProps.errors });
        }
      }

      onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
        if(e.target.name==="compte")
        this.props.getAccount(e.target.value);
       // console.log(e.target.name);
      }
      onSubmit(e) {
        e.preventDefault();
        const newDemand = {
          motif: this.state.motif,
          status: this.state.status,
          type:this.state.type,
          compte: JSON.parse(this.state.compte),
        };
         this.props.createDemand(newDemand,this.props.history); 
      }


      render() {
        const {accounts}=this.props.account;
        const compte=this.props.account.account;
        const { errors } = this.state;
        return (
          <div>
            <div className="demand">
              <div className="container">
                <div className="row">
                  <div className="col-md-8 m-auto">
                  <h1><small style={{color:'#EB5C09'}}>Nouvelle demande</small></h1>
                    <hr />
                    <br/><br/>
                    <form onSubmit={this.onSubmit}>
                    <div className="row">
                      <div className="col">
                             <select name="compte" defaultValue={'-1'} className="form-control form-control-lg" onChange={this.onChange}>
                               <option value="-1" disabled>Numéro de compte</option>
                                {accounts.map(account => (
                                 <option 
                                  value={JSON.stringify(account)}
                                   key={account.id} 
                                 >{account.numCompte}</option>
                                ))}
                             </select>
                      </div>
                      <div className="col">
                        <input
                          className="form-control form-control-lg"
                          type="text"
                          className={classnames("form-control form-control-lg", {
                            "is-invalid": errors.motif
                          })}
                          placeholder="Motif"
                          name="motif"
                          value={this.state.motif}
                          onChange={this.onChange}
                        />
                        {errors.motif && (
                          <div className="invalid-feedback">{errors.motif}</div>
                        )}
                      </div>
                      </div>
                      <br/><br/>
                      <div className="row">
                      <div className="col">
                      <select name="type" defaultValue={''} className="form-control form-control-lg" onChange={this.onChange}
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.type
                      })}
                      >
                        <option value="" disabled>type Chéquier</option>
                         <option value="classic">Classic</option>
                         <option value="wallet">Wallet</option>
                         <option value="correspondence">Correspondence</option>
                      </select>
                      {errors.type && (
                        <div className="invalid-feedback">{errors.type}</div>
                      )}
                     </div>
                     <div className="col">
                        <input
                          className="form-control form-control-lg"
                          type="text"
                          placeholder="Devise"
                          name="devise"
                          value={compte.devise}
                          
                        />
                      </div>
                      </div>
                      <br/><br/>
                      <input
                        type="submit"
                        value="Ajouter"
                        className="btn text-white btn-block mt-4"
                        style={{backgroundColor:'#EB5C09'}}  
                      />
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }
    }

    AddDemand.propTypes = {
      account: PropTypes.object.isRequired,
      getAccounts: PropTypes.func.isRequired,
      getAccount: PropTypes.func.isRequired,
      createDemand: PropTypes.func.isRequired,
      errors: PropTypes.object.isRequired,
    };


    
    const mapStateToProps = state => ({
      account: state.account,
      errors: state.errors
    });
    
    export default connect(mapStateToProps,{ getAccounts,getAccount,createDemand } )(AddDemand);
