import React, { Component } from "react";
import domtoimage from "dom-to-image";
import { saveAs } from "file-saver";
import Input from "../Form/Input";
import QRCode from "react-qr-code";
export default class AddReatiler extends Component {
  state = {
    productId: "",
    retailer: "",
    success: false,
  };

  handleSubmit = async () => {
    const { productId, success, retailer } = this.state;
    await this.props.callback(productId, retailer);
    this.setState({
      success: true,
    });
  };
  handleInput = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };
  downloadHandler(event) {
    event.preventDefault();
    domtoimage.toBlob(document.getElementById("qr-svg")).then(function (qr) {
      saveAs(qr, "myQR.png");
    });
  }
  render() {
    const { productId, success, retailer } = this.state;
    return (
      <div>
        <div>
          <div>
            <section className="flex justify-center items-center flex-col mt-10 mb-20">
              <h1 className="text-wrap text-lg font-bold text-center w-64">
                Add retailer to product code
              </h1>
              <div className="w-2/4 shadow-lg border-4 mt-10 p-5">
                <div className="flex justify-between items-center">
                  <h1 className="text-sm font-bold">Fill below box</h1>
                  <span
                    className="cursor-pointer rounded-full py-2 px-6 border-2 border-black"
                    onClick={this.handleSubmit}
                  >
                    Get QR
                  </span>
                </div>
                {!success && (
                  <div className="flex flex-col mt-10">
                    <Input
                      labelFor="Product ID"
                      state={productId}
                      id="productId"
                      callback={this.handleInput}
                    />
                    <Input
                      labelFor="Retailer"
                      state={retailer}
                      id="retailer"
                      callback={this.handleInput}
                    />
                  </div>
                )}
                {success && (
                  <div className="mt-4 flex flex-col justify-center items-center">
                    <div id="qr-svg">
                      <QRCode value={productId} />
                    </div>
                    <button
                      className="rounded-full border-2 mt-4 font-bold px-6 py-2"
                      onClick={this.downloadHandler}
                    >
                      Download QR
                    </button>
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    );
  }
}
