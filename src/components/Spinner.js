import React from "react";

const Spinner = () => {
  return (
    <div className="loader-wrapper">
      <div className="loader">
        <div className="face">
          <div className="circle"></div>
        </div>
        <div className="face">
          <div className="circle"></div>
        </div>
      </div>
    </div>
  );
};

export default Spinner;
