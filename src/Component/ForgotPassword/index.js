import { Component } from "react";
import { Navigate, Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css";

class ForgotPassword extends Component {
  state = {
    username: '',
    password: '',
    email:'',
    showSubmitError: false,
    errorMsg: '',
    redirectToHome: false, 
    showpass:"password",
  };

  onShowPass = ()=>{
    const {showpass} = this.state 
    if(showpass === "text"){
        this.setState({showpass:"password"})
    }else{
        this.setState({showpass:"text"})
    }
  }

  onChangeEmail = event => {
    this.setState({ email: event.target.value });
  };

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    });
    this.setState({ redirectToHome: true }); // Set redirection flag
  };

  onSubmitFailure = errorMsg => {
    this.setState({ showSubmitError: true, errorMsg });
  };

  submitForm = async event => {
    event.preventDefault();
    const { username, password } = this.state;
    const userDetails = { username, password };
    const url = 'https://apis.ccbp.in/login';
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    };
    const response = await fetch(url, options);
    const data = await response.json();
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token);
    } else {
      this.onSubmitFailure(data.error_msg);
    }
  };


  renderUsernameField = () => {
    const { email } = this.state;

    return (
      <>
        <label className="input-label" htmlFor="email">
          Email:
        </label>
        <input
          type="email"
          id="email"
          className="username-input-field2"
          value={email}
          onChange={this.onChangeEmail}
          required
        />
      </>
    );
  };

  render() {
    const { redirectToHome } = this.state;
    const jwtToken = Cookies.get('jwt_token');

    // Redirect if logged in or after successful login
    if (jwtToken !== undefined || redirectToHome) {
      return <Navigate to="/" replace />;
    }

    return (
      <div className="login-form-container">
        <div className="sign-container">
            <div className="flex-1">
              <h1 className="heading">Forgot Password?</h1>
              <p className="pa1">Remember your password? <Link className="lk" to="/login"><span className="sp1">Sign in here</span></Link></p>
            </div>
            <form className="form-container1" onSubmit={this.submitForm}>
            <div className="input-container">{this.renderUsernameField()}</div>
            <button type="submit" className="login-button1">
                Submit
            </button>
            </form>
        </div>
      </div>
    );
  }
}

export default ForgotPassword;