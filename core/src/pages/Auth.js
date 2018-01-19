import React, { Component } from "react";

import Login from "./Login";
import Signup from "./Signup";

class Auth extends Component {
  state = {
    activeScreen: "login"
  };
  switchToLogin = () => {
    this.setState({
      activeScreen: "login"
    });
  };
  switchToSignup = () => {
    this.setState({
      activeScreen: "signup"
    });
  };
  render() {
    const { activeScreen } = this.state;

    if (activeScreen === "login") {
      return <Login switchToSignup={this.switchToSignup} />;
    }
    return <Signup switchToLogin={this.switchToLogin} />;
  }
}

export default Auth;
