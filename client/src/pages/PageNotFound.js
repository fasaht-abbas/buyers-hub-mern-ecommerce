import React from "react";
import Wrapper from "../components/Layout/Wrapper";
const PageNotFound = () => {
  return (
    <Wrapper title="Page Not Found">
      <div className="container row ">
        <div className="align-self-center">
          <h1 className="text-norm display-5">404 Not Found</h1>
          <p className="text-norm">Can't find the requested page</p>
        </div>
      </div>
    </Wrapper>
  );
};

export default PageNotFound;
