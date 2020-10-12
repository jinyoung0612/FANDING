import React,{Component} from 'react';
// import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { signUpCom } from '../../store/actions/authActions';

class SignUpCom extends Component {
    state = {
      email: '',
      password: '',
      companyName : '',
      companyRegistrationNumber: '',
      corporateRegistrationNumber: '',
    };
  
    handleChange = e => {
      this.setState({
        [e.target.id]: e.target.value,
      });
    };
    handleSubmit = e => {
      e.preventDefault();
      this.props.signUpCom(this.state);
    };
    render() {

      // const { auth, authError } = this.props;
      // if (auth.uid) return <Redirect to='/' /> 
      return (
        
        <div className="container">
          <form onSubmit={this.handleSubmit} className="white">
            <h5 className="grey-text text-darken-3">Sign Up for Company</h5>
            <div className="input-field">
                <label htmlFor="companyName">상호명</label>
                <input type="text" id="companyName" onChange={this.handleChange}/>
            </div>
            <div className="input-field">
              <label htmlFor="companyRegistrationNumber">사업자등록번호</label>
              <input type="text" id="companyRegistrationNumber" onChange={this.handleChange} />
            </div>
            <div className="input-field">
              <label htmlFor="corporateRegistrationNumber">법인등록번호</label>
              <input type="text" id="corporateRegistrationNumber" onChange={this.handleChange} />
            </div>
            <div className="input-field">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" onChange={this.handleChange} />
            </div>
            <div className="input-field">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" onChange={this.handleChange} />
            </div>
            <div className="input-field">
              <button className="btn pink lighten-1 z-depth-0">SignUp</button>
              {/* <div className="center red-text"> */}
              {/* { authError ? <p>{authError}</p> : null } */}
            {/* </div> */}
            </div>
          </form>
        </div>
      );
    }
  }

  const mapStateToProps = (state) => {
    return {
      auth: state.firebase.auth,
      authError: state.auth.authError
    }
  }

  const mapDispatchToProps = (dispatch)=> {
    return {
      signUpCom: (creds) => dispatch(signUpCom(creds))
    }
  }

  export default connect(mapStateToProps, mapDispatchToProps)(SignUpCom)
