import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';
import {getDemand,abandonDemand,sendDemand} from '../../actions/demandActions';
import { confirmAlert } from 'react-confirm-alert'; 
import ReactNotification from "react-notifications-component";
import  Dialog from 'react-bootstrap-dialog';
import 'react-confirm-alert/src/react-confirm-alert.css';

class ViewDemand extends Component {


    constructor() {
        super();
        this.notificationDOMRef = React.createRef();
        };
        signe =(id,password)=> {
          this.dialog.show({
            title: 'Enter the secret code',
            prompt:Dialog.PasswordPrompt(),
            actions: [
              Dialog.CancelAction(),
              Dialog.Action(
              'VALIDER',
              ()=>this.passwordVerification(id,password,this.dialog.promptInput.state.value),
              'btn-success'),
            ],
            bsSize: 'small',
            onHide: (dialog) => {
              dialog.hide()
            }
          })
        }

        passwordVerification=(id,password,input)=>{
          var bcrypt = require('bcryptjs');
          bcrypt.compare(input,password,(err, res)=>{
            // res === false
            if(res) this.props.sendDemand(id);
            else this.failedNotification();
        });
        }
        signedNotification=()=>{
          this.notificationDOMRef.current.addNotification({
           title: "Success",
           message: "demand signed succefully!",
           type: "success",
           insert: "top",
           container: "top-center",
           animationIn: ["animated", "fadeIn"],
           animationOut: ["animated", "fadeOut"],
           dismiss: { duration: 2000 },
           dismissable: { click:true },
      
         })
       }
       failedNotification=()=>{
        this.notificationDOMRef.current.addNotification({
         title: "Error",
         message: "Operation failed !",
         type: "danger",
         insert: "top",
         container: "top-center",
         animationIn: ["animated", "fadeIn"],
         animationOut: ["animated", "fadeOut"],
         dismiss: { duration: 2000 },
         dismissable: { click:true },
      
       })
      }
        

        alerting = (id) => {
          confirmAlert({
            title: "Confirm abandon",
            message: "Are you sure to do this.",
            buttons: [
              {
                label: "Yes",
                onClick: () => this.props.abandonDemand(id)
              },
              {
                label: "No",
      
              }
            ]
          });
        };

       componentDidMount()
       {
        const { id } = this.props.match.params;
        this.props.getDemand(id);
       }

       

          render() {
            const demand=this.props.demand;
            const details = {
              numClient:(((demand || {}).compte || {}).abonne||{}).id,
              firstname:(((demand || {}).compte || {}).abonne||{}).nom,
              lastname:(((demand || {}).compte || {}).abonne||{}).prenom,
              password:(((demand || {}).compte || {}).abonne||{}).password,
              numCompte:((demand || {}).compte || {}).numCompte,
              devise:((demand || {}).compte || {}).devise,
              dateCreation:demand.dateCreation,
              status:demand.status,
              type:demand.type
             }
             
            return (
              <div className="demand">
                <div className="container">
                  <div className="row">
                    <div className="col-md-8 m-auto">
                      <h1><small style={{color:'#EB5C09'}}>Signature</small></h1>
                      <hr />
                      <br/>
                      <br/>
                      </div>
                      <div  className="col-md-12 m-auto">

                      <div className="row">
                        <div className="col">
                        <h3 className="text-left"><small>Infos client</small></h3>
                        <hr/>
                        </div>
                     </div>

                     <div className="row">
                       <div className="col">
                        <h4 className="text-left"><small>Numéro client</small></h4>
                        </div>
                        <div className="col">
                        <h4 className="text-left"><small>Nom</small></h4>
                        </div>
                        <div className="col">
                        <h4 className="text-left"><small>Prénom</small></h4>
                        </div>
                        <div className="col">
                        <h4 className="text-left"><small>Numéro de compte</small></h4>
                        </div>
                     </div>

                     <div className="row">
                       <div className="col">
                        <h5 className="text-left">{details.numClient}</h5>
                        </div>
                        <div className="col">
                        <h5 className="text-left">{details.firstname}</h5>
                        </div>
                        <div className="col">
                        <h5 className="text-left">{details.lastname}</h5>
                        </div>
                        <div className="col">
                        <h5 className="text-left">{details.numCompte}</h5>
                        </div>
                     </div>
                     <br/>

                     <div className="row">
                        <div className="col">
                        <h3 className="text-left"><small>Chéquier</small></h3>
                        <hr/>
                        </div>
                     </div>

                     <div className="row">
                       <div className="col">
                        <h4 className="text-left"><small>Date de création</small></h4>
                        </div>
                        <div className="col">
                        <h4 className="text-left"><small>Type de chéquiers</small></h4>
                        </div>
                        <div className="col">
                        <h4 className="text-left"><small>Devise</small></h4>
                        </div>
                        <div className="col">
                        <h4 className="text-left"><small>Status</small></h4>
                        </div>
                     </div>

                     <div className="row">
                       <div className="col">
                        <h5 className="text-left">{details.dateCreation}</h5>
                        </div>
                        <div className="col">
                        <h5 className="text-left">{details.type}</h5>
                        </div>
                        <div className="col">
                        <h5 className="text-left">{details.devise}</h5>
                        </div>
                        <div className="col">
                        <h5 className="text-left">{details.status}</h5>
                        </div>
                     </div>
                     <br/><br/>
                     <hr/>
                     <div className="row justify-content-end">
                     {
                      details.status==="abandoned"?
                      '':
                      <div className="col-md-3">
                      <Link to={`/viewDemand/${demand.id}`}
                        onClick={()=>this.alerting(demand.id)}
                        className="btn  btn-block mt-4"
                        style={{backgroundColor:'#f2f2f2',color:'#EB5C09'}}>
                        <span className="fas fa-times"/>{' '}
                        ABANDONNER LA DEMANDE
                     </Link>
                     </div>
                    }
                     {
                      details.status!=="registred"?
                      '':
                      <div className="col-md-2">
                      <Link to={`/updateDemand/${demand.id}`}
                       className="btn text-white btn-block mt-4"
                        style={{backgroundColor:'#EB5C09'}}>
                        <span className="fas fa-edit"/>{' '}
                        MODIFIER
                     </Link>
                     </div>
                     }
                     {
                      details.status!=="registred"?
                      '':
                      <div className="col-md-3">
                      <ReactNotification ref={this.notificationDOMRef} />
                      <Link to={`/viewDemand/${demand.id}`}
                       className="btn text-white btn-block mt-4"
                       onClick={()=>this.signe(demand.id,details.password)}
                        style={{backgroundColor:'#EB5C09'}}>
                        <span className="fas fa-check"/>{' '}
                        CONFIRMER ET SIGNER
                     </Link>
                     <Dialog ref={(component) => { this.dialog = component }} />
                     </div>
                     }
                     
                      </div>
                      <br/>
                  </div>
                </div>
              </div>
            </div>  
            );
          }
}

ViewDemand.propTypes = {

    demand:PropTypes.object.isRequired,
    getDemand: PropTypes.func.isRequired,
    abandonDemand: PropTypes.func.isRequired,
    sendDemand: PropTypes.func.isRequired
  };


  
  const mapStateToProps = state => ({
    demand: state.demand.demand
  });
  
  export default connect(mapStateToProps,{ getDemand,abandonDemand,sendDemand } )(ViewDemand);
