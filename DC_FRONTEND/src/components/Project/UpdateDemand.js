import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getAccounts} from '../../actions/accountActions';
import {createDemand} from '../../actions/demandActions';
import {getDemand} from '../../actions/demandActions';
import classnames from "classnames";

class UpdateDemand extends Component {
    
  constructor() {
    super();

    this.state = {
       id:"",
      motif: "",
      type:"",
      status: "registred",
      compte: {},
      }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    };

      componentWillReceiveProps(nextProps) {
          
        const {
          id,
          motif,
          status,
          type
        } = nextProps.demand;
        const {compte}=nextProps.demand
        this.setState({
            id,
            motif,
            status,
            type
          });
          this.setState({
            compte:JSON.stringify(compte)
          })

    }  
      componentDidMount()
   {
    const { id } = this.props.match.params;
    this.props.getDemand(id,this.props.history);
    this.props.getAccounts();
   }

      onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
      }
      onSubmit(e) {
        e.preventDefault();
        const newDemand = {
            id:this.state.id,
          motif: this.state.motif,
          status: this.state.status,
          type:this.state.type,
          compte: JSON.parse(this.state.compte),
        };
        this.props.createDemand(newDemand,this.props.history);
        
      }

      render() {
        const {accounts}=this.props.account;
        const {errors}=this.props;
        const demand=this.props.demand;
        const id = ((demand || {}).compte || {}).id;
        const devise=((demand || {}).compte || {}).devise;
        const type=(demand || {}).type;
         
        return (
          <div>
            <div className="demand">
              <div className="container">
                <div className="row">
                  <div className="col-md-8 m-auto">
                    <h1><small style={{color:'#EB5C09'}}>Modification</small></h1>
                    <hr />
                    <br/><br/>
                    <form onSubmit={this.onSubmit}>
                    <div className="row">
                      <div className="col">
                             <select name="compte"   className="form-control form-control-lg"  onChange={this.onChange}>
                               <option value="-1" disabled>Numéro de compte</option>
                                {accounts.map(account => (
                                  account.id===id ? 
                                  <option value={JSON.stringify(account)}  key={account.id}  selected>{account.numCompte}</option>
                                  :
                                  <option value={JSON.stringify(account)}  key={account.id} >{account.numCompte}</option>
                                 
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
                      <select name="type" defaultValue={type} className="form-control form-control-lg" onChange={this.onChange}
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.type
                      })}
                      >
                      <option value="-1" disabled>type Chéquier</option>
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
                          value={devise}
                          
                        />
                      </div>
                      </div>
                      <br/><br/>
                      <input
                        value="Modifier"
                        type="submit"
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

     UpdateDemand.propTypes = {
      account: PropTypes.object.isRequired,
      demand:PropTypes.object.isRequired,
      errors: PropTypes.object.isRequired,
      getAccounts: PropTypes.func.isRequired,
      getDemand: PropTypes.func.isRequired,
      createDemand: PropTypes.func.isRequired
    };


    
    const mapStateToProps = state => ({
      account: state.account,
      demand: state.demand.demand,
      errors: state.errors
    });
    
    export default connect(mapStateToProps,{ getAccounts,createDemand,getDemand } )(UpdateDemand);
