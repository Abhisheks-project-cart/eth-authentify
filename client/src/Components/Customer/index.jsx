import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter,
} from "react-router-dom";
import { BiUserCircle } from "react-icons/bi";

import hashMD5 from "md5";
import AllProducts from "./AllProducts";
import ScanProduct from "./ScanProduct";
import ChangeOwner from "./ChangeOwner";

class Customer extends Component {
  state = {
    user: "",
  };
  async componentDidMount() {
    if (this.props.location.state.user != "") {
      this.setState({
        user: this.props.location.state.user,
      });
    }
    const customerdata = await this.props.contarctInstance.methods
      .getCustomeDetails(hashMD5(this.state.user))
      .call();
    console.log(customerdata);
  }
  getCodes = async () => {
    let hashCustomer = hashMD5(this.state.user);
    const res = await this.props.contarctInstance.methods
      .getCodes(hashCustomer)
      .call();
    return res;
  };

  getProductDetails = async (code) => {
    const res = await this.props.contarctInstance.methods
      .getProductDeailes(code)
      .call();
    return res;
  };

  changeOwner = async (code, oldCustomer, newCustomer) => {
    let hashNewCustomer = hashMD5(newCustomer);
    let hashOldCustomer = hashMD5(oldCustomer);
    const res = await this.props.contarctInstance.methods
      .changeOwner(code, hashNewCustomer, hashOldCustomer)
      .send({ from: this.props.accounts[0] });
    return res;
  };

  render() {
    return (
      <div className="container mx-auto">
        <Router>
          <h1
            className=" text-center cursor-pointer underline text-2xl mt-12 font-bold"
            onClick={() => this.props.history.push("/")}
          >
            Authentify
          </h1>
          {/* header */}
          <nav className="flex items-center justify-between mx-20 mt-5">
            <div className="flex items-center">
              <div className="text-4xl rounded-full h-16 w-16 flex items-center justify-center border-4 border-gray-900 mr-6">
                <BiUserCircle />
              </div>
              <div>
                <h1 className="text-xl -mb-1 font-bold">Customer</h1>
                <span className="text-gray-700">{this.props.accounts[0]}</span>
              </div>
            </div>
            <div>
              <ul className="flex items-center justify-around">
                <li className="text-red-600 mx-4 cursor-pointer">
                  <Link to="/customer/all-products">All Products </Link>
                </li>
                <li className=" mx-4 cursor-pointer">
                  <Link to="/customer/scan-product">Scan product</Link>
                </li>
                <li className="mx-4 cursor-pointer">
                  <Link to="/customer/change-owner">Change Owner</Link>
                </li>
                <li
                  className="mx-4 cursor-pointer"
                  onClick={() => {
                    this.props.logout();
                    this.props.history.push("/");
                  }}
                >
                  Logout
                </li>
              </ul>
            </div>
          </nav>
          {/* navbar ends here */}

          <Switch>
            <Route exact path="/customer">
              <div className="flex justify-center items-center mt-10">
                <div className="flex flex-col justify-center items-center bg-blue-400 text-white w-80 mx-12 h-40 rounded-sm">
                  <h1>Customer Home Page</h1>
                  <Link
                    to="/customer/all-products"
                    className="text-sm text-gray-800"
                  >
                    Register Product Here{" "}
                  </Link>
                </div>
              </div>
            </Route>
            <Route exact path="/customer/all-products">
              <AllProducts callback={this.getCodes} />
            </Route>
            <Route exact path="/customer/scan-product">
              <ScanProduct callback={this.getProductDetails} />
            </Route>
            <Route exact path="/customer/change-owner">
              <ChangeOwner callback={this.changeOwner} />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default withRouter(Customer);
