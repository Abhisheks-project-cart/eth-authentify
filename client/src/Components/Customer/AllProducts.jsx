import React, { Component } from "react";
import { MdOutlineQrCodeScanner } from "react-icons/md";
export default class AllProducts extends Component {
  state = {
    DataArr: null,
  };
  async componentDidMount() {
    const res = await this.props.callback();
    const filterArr = res.filter((item) => {
      return item !== "hack" && item !== "";
    });

    let uniq = [...new Set(filterArr)];

    this.setState({
      DataArr: uniq,
    });
  }
  render() {
    return (
      <div className="mx-10 flex flex-wrap mt-10">
        {this.state.DataArr &&
          this.state.DataArr.map((item) => (
            <div className="box-item shadow-lg mx-3 flex justify-center items-center flex-col px-8 py-6 border-solid border-4 border-black rounded-lg">
              <h1 className="mb-3 hover:underline">{item}</h1>
              <span className="text-5xl cursor-pointer">
                <MdOutlineQrCodeScanner />
              </span>
            </div>
          ))}
      </div>
    );
  }
}
