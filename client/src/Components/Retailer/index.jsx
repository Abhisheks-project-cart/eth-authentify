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

import "reactjs-popup/dist/index.css";
import CreateCode from "./CreateCode";
import AddReatiler from "./AddReatiler";
import SetOwner from "./SetOwner";
class Retailer extends Component {
  createCode = async (
    prodcutID,
    brand,
    description,
    manufacuter,
    manufacturerLoc
  ) => {
    let hashManufacturer = hashMD5(manufacuter);
    let ok = await this.props.contarctInstance.methods
      .createCode(
        prodcutID,
        brand,
        description,
        hashManufacturer,
        manufacturerLoc
      )
      .send({ from: this.props.accounts[0] });
    // const response = await this.props.contarctInstance.methods
    //   .getProductDeailes(prodcutID)
    //   .call();

    // console.log(response);
  };

  addRetailerToCode = async (productId, retailer) => {
    let hashRetailer = hashMD5(retailer);
    let ok = await this.props.contarctInstance.methods
      .addRetailerToCode(productId, hashRetailer)
      .send({ from: this.props.accounts[0] });
    const response = await this.props.contarctInstance.methods
      .getProductDeailes(productId)
      .call();

    console.log(response);
  };

  setOwner = async (productId, retailer, customer) => {
    let hashRetailer = hashMD5(retailer);
    let hashCustomer = hashMD5(customer);

    let ok = await this.props.contarctInstance.methods
      .setInitialOwner(productId, hashRetailer, hashCustomer)
      .send({ from: this.props.accounts[0] });

    const customerdata = await this.props.contarctInstance.methods
      .getCustomeDetails(hashCustomer)
      .call();
    console.log(customerdata);
    const response = await this.props.contarctInstance.methods
      .getCodes(hashCustomer)
      .call();

    console.log(response);
  };

  render() {
    return (
      <Router>
        <div className="container mx-auto">
          <h1
            className="cursor-pointer text-center underline text-2xl mt-12 font-bold"
            onClick={() => this.props.history.push("/login")}
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
                <h1 className="text-xl -mb-1 font-bold">Retailer</h1>
                <span className="text-gray-700">{this.props.accounts[0]}</span>
              </div>
            </div>
            <div>
              <ul className="flex items-center justify-around">
                <li className="mx-4 cursor-pointer">
                  <Link to="/retailer/create-code">Create Product </Link>
                </li>
                <li className="text-red-600 mx-4 cursor-pointer">
                  <Link to="/retailer/add-retailer">Add retailer</Link>
                </li>
                <li className="mx-4 cursor-pointer">
                  <Link to="/retailer/set-owner">Set Owner</Link>
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
            <Route exact path="/retailer">
              <div className="flex justify-center items-center mt-10">
              <div className="flex flex-col justify-center items-center bg-blue-400 text-white w-80 mx-12 h-40 rounded-sm">
                <h1>Retailer Home Page</h1>
                <Link
                  to="/retailer/create-code"
                  className="text-sm text-gray-800"
                >
                  Register Product Here{" "}
                </Link>
              </div>
            </div>
          </Route>
            <Route exact path="/retailer/create-code">
              <CreateCode callback={this.createCode} />
            </Route>
            <Route exact path="/retailer/add-retailer">
              <AddReatiler callback={this.addRetailerToCode} />
            </Route>
            <Route exact path="/retailer/set-owner">
              <SetOwner callback={this.setOwner} />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default withRouter(Retailer);
