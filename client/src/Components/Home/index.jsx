import React, { Component } from "react";
import { Link } from "react-router-dom";
export default class Home extends Component {
  render() {
    return (
      <div className="container mx-auto px-12  bg-black h-screen">
        <div className="h-full flex flex-col justify-center items-center">
          <h1 className="text-white text-7xl">Authentifier</h1>
          <p className="text-white text-2xl text-center mt-4">
            Fibble is a Decentralized E2E Logistics Application that stores the
            whereabouts of product at every freight hub on the Blockchain. At
            consumer end, customers can simply scan the QR CODE of products and
            get complete information about the provenance of that product hence
            empowering consumers to only purchase authentic and quality
            products.
          </p>
          <div className="flex flex-wrap mt-6">
            <button className="bg-white p-4 mx-4 rounded-lg font-bold">
              <Link to="/login">Continue as Customer</Link>
            </button>
            <button className="bg-white p-4 mx-4 rounded-lg font-bold">
              <Link to="/login">Continue as Retailer</Link>
            </button>
          </div>
        </div>
      </div>
    );
  }
}
