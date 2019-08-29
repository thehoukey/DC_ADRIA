import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {abandonDemand} from '../../actions/demandActions';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';

class ListDemand extends Component {
   
   constructor()
   {
     super();
   }
   alerting = (id) => {
    confirmAlert({
      title: "Confirm abandon",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => this.props.abandonDemand(id,this.props.history)
        },
        {
          label: "No",

        }
      ]
    });
  };

    render() {
        const demands=this.props.demands
        return (
            <div>

           

            <div className="col-md-12 m-auto">
            <table id="tablePreview" className="table table-striped table-hover table-bordered">
              <thead>
                <tr>
                  <th>Numero Compte</th>
                  <th>Motif</th>
                  <th>Date création</th>
                  <th>Date envoie</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
              {demands.map(demand => (
                <tr key={demand.id}>
                  <th>{demand.compte.numCompte}</th>
                  <th>{demand.motif}</th>
                  <th>{demand.dateCreation}</th>
                  <th>{demand.dateEnvoie}</th>
                  {demand.status==="sent"?  
                  <th className="text-success">{demand.status}</th>:
                    demand.status==="abandoned"?
                    <th className="text-danger">{demand.status}</th>:
                    <th className="text-info">{demand.status}</th>
                  }
                  <th>
                     <Link to={`/viewDemand/${demand.id}`}>
                     <span className="fas fa-eye"
                      title="Details"
                     />
                    </Link>
                     {' '}
                     {demand.status==="registred"?
                     <Link to={`/updateDemand/${demand.id}`}>
                     <span className="fas fa-edit text-warning"
                      title="Edit"
                     />
                    </Link>
                    :""
                    }
                    
                    {' '}
                    {demand.status!=="abandoned"?
                    <Link to={'/dashboard'}  >
                    <span className="fas fa-times text-danger"
                     onClick={()=>this.alerting(demand.id)}
                     title="Abandon"
                    />
                   </Link>
                   :""
                    }
                  </th>
                </tr>
                ))} 
              </tbody>
            </table>
            </div>
            </div>
        )
    }
}

ListDemand.propTypes = {
  abandonDemand: PropTypes.func.isRequired
};

export default connect(null,{abandonDemand})(ListDemand);
