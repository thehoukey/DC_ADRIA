import React, { Component } from 'react'
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logout } from "../../actions/securityActions";



class Header extends Component {

     logout=()=>{
        this.props.logout();
        window.location.href = "/";
      }

    render() {
        const { validToken, user } = this.props.security;
        return (
            <nav className="navbar navbar-expand-sm navbar-dark mb-4" style={{backgroundColor:'#EB5C09'}}>
            <div className="container">
              {!(validToken && user)?
                <Link className="navbar-brand" to="/">
                    Demande chéquiers 
                </Link>
                :
                <Link className="navbar-brand" to="/dashboard">
                     Dashboard
                </Link>
              }
                
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
                    <span className="navbar-toggler-icon" />
                </button>
    
                <div className="collapse navbar-collapse" id="mobile-nav">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                        {!(validToken && user)?
                            ''
                            :
                            <Link className="nav-link" to="/addDemand">
                                Add demand
                            </Link>
                          }
                        </li>
                    </ul>
                    {!(validToken && user)?
                    <ul className="navbar-nav ml-auto">
                    
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">
                                Login
                            </Link>
                        </li>
                        </ul>
                        :
                        <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                        <Link className="nav-link" to="/dashboard">
                       <i className="fas fa-user-circle mr-1" />
                       {user.firstName+' '+user.lastName}
                      </Link>
                       </li> 
                       <li className="nav-item">
                      <Link
                     className="nav-link"
                      to="/logout"
                      onClick={this.logout}
                      >
                     Logout
                    </Link>
                     </li>
                    </ul>
                    }
                </div>
            </div>
        </nav>
        )
    }
}

Header.propTypes = {
    logout: PropTypes.func.isRequired,
    security: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    security: state.security
  });
  
  export default connect(mapStateToProps,{ logout })(Header);
