import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import { SUPABASEKEY, SUPABASEURL, CRYPTOHASHSECRET } from "../../Keys";
import CryptoJS from "crypto-js";

const supabase = createClient(SUPABASEURL, SUPABASEKEY);
class Login extends Component {
  state = {
    email: "",
    password: "",
    error: "",
    passStatus: "",
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

  handleLoggin = async () => {
    const { email, password, curruntView } = this.state;

    if (curruntView === "customer") {
      const { data: User, error } = await supabase
        .from("User")
        .select("*")
        .eq("email", email);

      if (User.length) {
        console.log(User);
        console.log(
          User.map((user) => {
            var bytes = CryptoJS.AES.decrypt(user.password, CRYPTOHASHSECRET);
            var originalText = bytes.toString(CryptoJS.enc.Utf8);
            if (originalText === password) {
              this.props.history.push("/customer");
            }
          })
        );
      }
      if (error) {
        this.setState({
          error: error,
        });
      }
    }
    if (curruntView === "retailer") {
      const { data: Retailer, error } = await supabase
        .from("Retailer")
        .select("*")
        .eq("email", email);

      if (Retailer.length) {
        console.log(Retailer);
        console.log(
          Retailer.map((retailer) => {
            var bytes = CryptoJS.AES.decrypt(
              retailer.password,
              CRYPTOHASHSECRET
            );
            var originalText = bytes.toString(CryptoJS.enc.Utf8);
            if (originalText === password) {
              this.props.history.push("/retailer");
            }
          })
        );
      }
      if (error) {
        this.setState({
          error: error,
        });
      }
    }
  };

  render() {
    const { email, password, curruntView } = this.state;
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
                Login
              </h2>
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
                  onChange={(event) => this.handleInputs(event)}
                  value={email}
                  className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className="relative mb-4">
                <label
                  htmlFor="password"
                  className="leading-7 text-sm text-gray-600"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  onChange={(event) => this.handleInputs(event)}
                  value={password}
                  className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <button
                onClick={this.handleLoggin}
                className="text-white bg-red-500 border-0 py-2 px-8 focus:outline-none hover:bg-red-600 rounded text-lg"
              >
                Button
              </button>
              <p className="text-xs text-center text-gray-500 mt-3">
                Havent Register yet{" "}
                <span className="">
                  <Link className="text-red-600" to="/signup">
                    Click Here !
                  </Link>
                </span>
              </p>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default withRouter(Login);
