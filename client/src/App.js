import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Authentifi from "./contracts/Authentifi.json";
import getWeb3 from "./getWeb3";

import Login from "./Components/Auth/Login";
import Signup from "./Components/Auth/Signup";
import Home from "./Components/Home";
import Retailer from "./Components/Retailer";
import Customer from "./Components/Customer";

class App extends Component {
  state = {
    web3: null,
    accounts: null,
    contract: null,
    userAuthStaus: false,
    auth: null,
    authType: null,
  };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = Authentifi.networks[networkId];
      const instance = new web3.eth.Contract(
        Authentifi.abi,
        deployedNetwork && deployedNetwork.address
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };

  SetAuth = (auth, type) => {
    this.setState({
      auth: auth,
      authType: type,
    });
  };

  logOutAuth = () => {
    this.setState({
      auth: null,
      authType: "",
    });
  };

  // runExample = async () => {
  //   const { accounts, contract } = this.state;

  //   // Stores a given value, 5 by default.
  //   await contract.methods.set(10).send({ from: accounts[0] });

  //   // Get the value from the contract to prove it worked.
  //   const response = await contract.methods.get().call();

  //   // Update state with the result.
  //   this.setState({ storageValue: response });
  // };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="container w-screen">
        <Router>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/login">
              <Login
                contarctInstance={this.state.contract}
                accounts={this.state.accounts}
                setAuth={this.SetAuth}
              />
            </Route>
            <Route exact path="/signup">
              <Signup
                contarctInstance={this.state.contract}
                accounts={this.state.accounts}
                setAuth={this.SetAuth}
              />
            </Route>
            <Route exact path="/retailer">
              <Retailer
                contarctInstance={this.state.contract}
                accounts={this.state.accounts}
                logout={this.logOutAuth}
              />
            </Route>
            <Route exact path="/customer">
              <Customer
                contarctInstance={this.state.contract}
                accounts={this.state.accounts}
                logout={this.logOutAuth}
              />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
