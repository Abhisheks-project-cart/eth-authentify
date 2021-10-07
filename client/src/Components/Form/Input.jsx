import React from "react";

export default function Input({ labelFor, id, state, callback, disabled }) {
  return (
    <div className="mt-3">
      <div className="w-full flex flex-col p-2 rounded-lg bg-blue-300">
        <label className="text-white text-sm font-bold" htmlFor="inputField">
          {labelFor}
        </label>
        <input
          className="focus:outline-none bg-blue-300 font-bold text-black mt-3"
          style={{
            borderBottom: "5px solid white",
          }}
          type="text"
          id={id}
          value={state}
          onChange={callback}
          disabled={disabled || false}
        />
      </div>
    </div>
  );
}
