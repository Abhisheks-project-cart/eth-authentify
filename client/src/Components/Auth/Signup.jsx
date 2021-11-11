import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { SUPABASEKEY, SUPABASEURL, CRYPTOHASHSECRET } from "../../Keys";
import { createClient } from "@supabase/supabase-js";
import hashMD5 from "md5";
import validator from "validator";
import CryptoJS from "crypto-js";

const supabase = createClient(SUPABASEURL, SUPABASEKEY);

class Signup extends Component {
  state = {
    name: "",
    email: "",
    phoneNo: "",
    password: "",
    error: "",
    passStatus: "",
    location: "",
    curruntView: "",
  };
  handleInputs = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleView = (view) => {
    this.setState({
      curruntView: view,
    });
  };

  handleSignup = async (event) => {
    event.preventDefault();
    const { email, name, password, phoneNo, location, curruntView } =
      this.state;
    const hashEmail = hashMD5(email);
    console.log(hashEmail);
    const hashPass = CryptoJS.AES.encrypt(
      password,
      CRYPTOHASHSECRET
    ).toString();
    //check if email is already register or not
    let { data: User, error } = await supabase
      .from("User")
      .select("email")
      .eq("email", email);
    if (User.length) {
      this.setState({
        error: "Email is already exists",
      });
      return false;
    }
    if (curruntView === "customer") {
      this.createCustomer(name, email, hashEmail, phoneNo, hashPass);
      this.props.history.push({
        pathname: "/customer",
        state: { user: email },
      });
    }
    if (curruntView === "retailer") {
      this.createReatiler(name, email, hashEmail, phoneNo, hashPass, location);
      this.props.history.push("/retailer");
    }
  };

  createCustomer = async (name, email, hashEmail, phoneNo, hashPass) => {
    //check if user is already exists
    let { data: User, error } = await supabase
      .from("User")
      .select("email")
      .eq("email", email);
    //user exist return from function
    if (User.length) {
      this.setState({
        error: "Email is already exists",
      });
      return false;
    }
    if (
      (await validator.isEmail(email)) &&
      (await validator.isMobilePhone(phoneNo))
    ) {
      const { data, error } = await supabase
        .from("User")
        .insert([
          { name: name, email: email, password: hashPass, phone: phoneNo },
        ]);
      if (error) {
        this.setState({
          error: error,
        });
      }
      if (data) {
        let ok = this.props.contarctInstance.methods
          .createCustomer(hashEmail, name, phoneNo)
          .send({ from: this.props.accounts[0] });
        if (ok) {
          console.log(`User ${hashEmail} successfully added to Blockchain!\n`);
        } else {
          console.log("ERROR! User could not be added to Blockchain.\n");
        }
        this.setState({
          passStatus: "User Succesfully created!",
        });
      }
    }
    this.clearInput();
  };

  createReatiler = async (
    name,
    email,
    hashEmail,
    phoneNo,
    hashPass,
    location
  ) => {
    //check if retailer is already exists
    let { data: User, error } = await supabase
      .from("Retailer")
      .select("email")
      .eq("email", email);
    //Retailer exist return from function
    if (User.length) {
      this.setState({
        error: "Email is already exists",
      });
      return false;
    }
    if (
      (await validator.isEmail(email)) &&
      (await validator.isMobilePhone(phoneNo))
    ) {
      const { data, error } = await supabase.from("Retailer").insert([
        {
          name: name,
          email: email,
          password: hashPass,
          phone: phoneNo,
          location: location,
        },
      ]);
      if (error) {
        this.setState({
          error: error,
        });
      }
      if (data) {
        let ok = this.props.contarctInstance.methods
          .createReatiler(hashEmail, name, location)
          .send({ from: this.props.accounts[0] });
        if (ok) {
          console.log(
            `Retailer ${hashEmail} successfully added to Blockchain!\n`
          );
        } else {
          console.log("ERROR! Retailer could not be added to Blockchain.\n");
        }
        this.setState({
          passStatus: "Retailer Succesfully created!",
        });
      }
    }
    this.clearInput();
  };

  clearInput = () => {
    this.setState({
      name: "",
      email: "",
      phoneNo: "",
      password: "",
      location: "",
    });
  };

  render() {
    const { email, name, password, phoneNo, location, curruntView } =
      this.state;
    return (
      <div>
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-24 mx-auto flex flex-col flex-wrap justify-center items-center">
            <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0 mb-16">
              <h1 className="title-font text-center font-medium text-3xl text-gray-900">
                Authentify : Safe way to authenticate product based on
                blockchain technologies
              </h1>
            </div>
            <div className="mt-2 mb-6 flex items-center justify-center">
              <div className="m-3 bg-gray-300 p-4 rounded-lg">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-checkbox h-4 w-4"
                    checked={curruntView === "retailer"}
                    name="retailer"
                    onClick={(e) => this.handleView("retailer")}
                  />
                  <span className="ml-2">Retailer</span>
                </label>
              </div>
              <div className="m-3 bg-gray-300 p-4 rounded-lg">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-checkbox h-4 w-4"
                    name="customer"
                    checked={curruntView === "customer"}
                    onClick={(e) => this.handleView("customer")}
                  />
                  <span className="ml-2">Customer</span>
                </label>
              </div>
            </div>
            <div className="lg:w-3/5 md:w-1/3 bg-gray-100 rounded-lg p-8 flex flex-col w-full mt-16 md:mt-0">
              <h2 className="text-gray-900 text-center text-xl font-bold title-font mb-5">
                Sign UP
              </h2>
              <div className="relative mb-4">
                <label
                  htmlFor="full-name"
                  className="leading-7 text-sm text-gray-600"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={(event) => this.handleInputs(event)}
                  className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className="relative mb-4">
                <label
                  htmlFor="email"
                  className="leading-7 text-sm text-gray-600"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(event) => this.handleInputs(event)}
                  className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className="relative mb-4">
                <label
                  htmlFor="full-name"
                  className="leading-7 text-sm text-gray-600"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(event) => this.handleInputs(event)}
                  className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
                <div className="relative mb-4">
                  <label
                    htmlFor="full-name"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phoneNo"
                    name="phoneNo"
                    value={phoneNo}
                    onChange={(event) => this.handleInputs(event)}
                    className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
                {!curruntView === "customer" && (
                  <div className="relative mb-4">
                    <label
                      htmlFor="location"
                      className="leading-7 text-sm text-gray-600"
                    >
                      location
                    </label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={location}
                      onChange={(event) => this.handleInputs(event)}
                      className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                )}

                <button
                  className="text-white w-full bg-red-500 border-0 py-2 px-8 focus:outline-none hover:bg-red-600 rounded text-lg"
                  onClick={this.handleSignup}
                >
                  Sign Up
                </button>
                <p className="text-xs text-center text-gray-500 mt-3">
                  Already Register{" "}
                  <span className="">
                    <Link className="text-red-600" to="/login">
                      Login here !
                    </Link>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default withRouter(Signup);
