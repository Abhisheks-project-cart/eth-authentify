import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default class ChangeOwner extends Component {
  state = {
    code: "",
    newCustomer: "",
    oldCustomer: ""
  }
  handleInput = (e) => {
    this.setState({
      [e.target.name] : e.target.value
    })
  }
  handleSubmision = async() => {
    const { code, newCustomer, oldCustomer } = this.state;
    await this.props.callback(code, oldCustomer, newCustomer);
    toast("Product ownership hash been transferrd successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
  }
  render() {
    return (
      <div className="flex justify-center items-center flex-col mt-10">
      <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <div className="relative text-gray-600 mt-4">
          <input
            type="text"
            value={this.state.code}
            name="code"
            className="py-4 px-3 text-sm text-black border-2 border-black w-96 rounded-md pl-10"
            placeholder="Enter Product ID"
            autoComplete="off"
            onChange={this.handleInput}
          />
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <button
              className="p-1 focus:outline-none focus:shadow-outline"
            >
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                viewBox="0 0 24 24"
                className="w-6 h-6"
              >
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </span>
        </div>
        <div className="relative text-gray-600 mt-4">
          <input
            type="text"
            className="py-4 px-3 text-sm text-black border-2 border-black w-96 rounded-md pl-10"
            placeholder="Enter Currunt Customer"
            autoComplete="off"
            value={this.state.oldCustomer}
            name="oldCustomer"
            onChange={this.handleInput}

          />
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <button
              className="p-1 focus:outline-none focus:shadow-outline"
            >
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                viewBox="0 0 24 24"
                className="w-6 h-6"
              >
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </span>
        </div>
        <div className="relative text-gray-600 mt-4">
          <input
            type="text"
            className="py-4 px-3 text-sm text-black border-2 border-black w-96 rounded-md pl-10"
            placeholder="Enter New Customer"
            autoComplete="off"
            value={this.state.newCustomer}
            name="newCustomer"
            onChange={this.handleInput}

          />
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <button
              type="submit"
              className="p-1 focus:outline-none focus:shadow-outline"
            >
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                viewBox="0 0 24 24"
                className="w-6 h-6"
              >
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </span>
        </div>
        <button className="w-96 mt-4 rounded-lg py-4 px-5 bg-gray-800 text-white" onClick={this.handleSubmision}>
          Change Owner
        </button>
      </div>
    );
  }
}
