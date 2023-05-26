import React from "react";

const Loading = ({ height }) => {
  return (
    <>
      <div
        className="d-flex align-items-center  mx-auto"
        style={{ height: height }}
      >
        <div className="spinner-border" role="status">
          <span className="sr-only" />
        </div>
      </div>
    </>
  );
};

export default Loading;
