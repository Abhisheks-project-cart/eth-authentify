import React, { Component } from "react";
import Input from "../Form/Input";
import QRCode from "react-qr-code";
import { AiFillCloseCircle } from "react-icons/ai";
import domtoimage from "dom-to-image";
import { saveAs } from "file-saver";
import uniqid from "uniqid";
export default class CreateCode extends Component {
  state = {
    Id: "",
    brand: "",
    description: "",
    manufacuter: "",
    manufacturerLoc: "",
    modelOpen: false,
    success: false,
  };

  closeModel = () => {
    this.setState({
      modelOpen: false,
    });
  };

  handleInput = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleSubmit = async () => {
    const { manufacturerLoc, manufacuter, brand, description, success } =
      this.state;
    let productID = uniqid();
    this.setState({
      Id: productID,
    });
    let ok = await this.props.callback(
      productID,
      brand,
      description,
      manufacuter,
      manufacturerLoc
    );
    this.setState({
      success: true,
    });
  };

  downloadHandler(event) {
    event.preventDefault();
    domtoimage.toBlob(document.getElementById("qr-svg")).then(function (qr) {
      saveAs(qr, "myQR.png");
    });
  }

  render() {
    const { Id, manufacturerLoc, manufacuter, brand, description, success } =
      this.state;
    return (
      <div>
        <div>
          <section className="flex justify-center items-center flex-col mt-10 mb-20">
            <h1 className="text-wrap text-lg font-bold text-center w-64">
              Add product details to genrate QR code
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
              {/* <Popup
                open={modelOpen}
                closeOnDocumentClick
                onClose={this.closeModel}
                className="shadow-lg"
              >
                <div className="flex flex-col p-4">
                  <span
                    className="ml-auto close text-3xl cursor-pointe"
                    onClick={this.closeModel}
                  >
                    <AiFillCloseCircle />
                  </span>
                  
                </div>
              </Popup> */}
              {!success && (
                <div className="flex flex-col mt-10">
                  {/* <Input
                labelFor="Product ID"
                state={Id}
                id="Id"
                callback={this.handleInput}
                disabled="true"
              /> */}
                  <Input
                    labelFor="Brand"
                    state={brand}
                    id="brand"
                    callback={this.handleInput}
                  />
                  <Input
                    labelFor="Description"
                    state={description}
                    id="description"
                    callback={this.handleInput}
                  />
                  <Input
                    labelFor="manufacturer"
                    state={manufacuter}
                    id="manufacuter"
                    callback={this.handleInput}
                  />
                  <Input
                    labelFor="manufacturer Location"
                    state={manufacturerLoc}
                    id="manufacturerLoc"
                    callback={this.handleInput}
                  />
                </div>
              )}
              {success && (
                <div className="mt-4 flex flex-col justify-center items-center">
                  <div id="qr-svg">
                    <QRCode value={Id} />
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
    );
  }
}
