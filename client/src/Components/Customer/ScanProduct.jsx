import React, { Component } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import ImageUploader from "react-images-upload";
import Popup from "reactjs-popup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default class ScanProduct extends Component {
  state = {
    modelOpen: false,
    code: "",
    productData: null,
    qrImg: null,
  };
  triggerModel = () => {
    this.setState({
      modelOpen: !this.state.modelOpen,
    });
  };

  closeModel = () => {
    this.setState({
      modelOpen: false,
    });
  };

  onDrop = async (picture) => {
    console.log(picture[0]);
    this.setState({
      qrImg: picture[0],
    });
  };

  handleCallback = async () => {
    const res = await this.props.callback(this.state.code);
    this.setState({
      productData: res,
    });
    if (this.state.productData[1] !== "") {
      this.triggerModel();
    } else {
      toast("Product doesn't registerd in blockchain", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  render() {
    const { productData } = this.state;
    return (
      <div className="mt-40">
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
        <Popup
          open={this.state.modelOpen}
          closeOnDocumentClick
          onClose={this.closeModel}
        >
          <div className="modal">
            {productData && (
              <div className="p-10">
                <div className="data flex flex-col mx-3 px-5 py-3 bg-blue-400 mb-2 rounded-lg ">
                  <h1 className="text-lg text-gray-700 text-white">Staus:</h1>
                  <span className="text-xl text-black font-bold">
                    {productData[0]}{" "}
                  </span>
                </div>
                <div className="data flex flex-col mx-3 px-5 py-3 bg-blue-400 mb-2 rounded-lg ">
                  <h1 className="text-lg text-gray-700 text-white">Brand:</h1>
                  <span className="text-xl text-black font-bold">
                    {productData[1]}
                  </span>
                </div>
                <div className="data flex flex-col mx-3 px-5 py-3 bg-blue-400 mb-2 rounded-lg ">
                  <h1 className="text-lg text-gray-700 text-white">
                    Description:
                  </h1>
                  <span className="text-xl text-black font-bold">
                    {productData[2]}
                  </span>
                </div>
                <div className="data flex flex-col mx-3 px-5 py-3 bg-blue-400 mb-2 rounded-lg ">
                  <h1 className="text-lg text-gray-700 text-white">
                    manufactures:
                  </h1>
                  <span className="text-xl text-black font-bold">
                    {productData[3]}
                  </span>
                </div>
                <div className="data flex flex-col mx-3 px-5 py-3 bg-blue-400 mb-2 rounded-lg ">
                  <h1 className="text-lg text-gray-700 text-white">
                    Manufacure location:
                  </h1>
                  <span className="text-xl text-black font-bold">
                    {productData[4]}
                  </span>
                </div>
                <div className="data flex flex-col mx-3 px-5 py-3 bg-blue-400 mb-2 rounded-lg ">
                  <h1 className="text-lg text-gray-700 text-white">
                    Retailer:
                  </h1>
                  <span className="text-xl text-black font-bold">
                    {productData[5]}
                  </span>
                </div>
              </div>
            )}
            {!productData && (
              <div className="flex justify-center items-center text-gray-500">
                Data Not Found
              </div>
            )}
          </div>
        </Popup>

        <div className="flex justify-center items-center flex-col">
          <div className="relative text-gray-600">
            <input
              type="search"
              name="product_code"
              className="py-4 px-3 text-sm text-black border-2 border-black w-96 rounded-md pl-10"
              placeholder="Enter Product Key"
              autoComplete="off"
              value={this.state.code}
              onChange={(e) => {
                this.setState({
                  code: e.target.value,
                });
              }}
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
          <br />
          <h1>OR</h1>
          <div className="mt-3 w-96">
            {/* <div>
              <ImageUploader
                className="image-upload"
                withIcon={false}
                buttonText={<AiOutlineCloudUpload />}
                buttonClassName="upload-btn waves-effect waves-light red light-blue darken-4"
                buttonStyles={{
                  padding: "10px 30px",
                  color: "black",
                  fontSize: "1.4rem",
                }}
                onChange={this.onDrop}
                imgExtension={[".jpg", ".gif", ".png", ".gif", ".svg"]}
                maxFileSize={5242880}
                withPreview={false}
                label={"Upload Image to cloud"}
                labelStyles={{
                  fontSize: "1rem",
                }}
                fileContainerStyle={{
                  borderRedius: "30px",
                  flexDirection: "row",
                  border: "2px solid #eae8e8",
                  padding: "0 20px",
                  border: "2px solid black",
                }}
              />
            </div> */}
          </div>
          <button
            className="w-96 mt-4 rounded-lg py-4 px-5 bg-gray-800 text-white"
            onClick={this.handleCallback}
          >
            Check Product
          </button>
        </div>
      </div>
    );
  }
}
