import React from "react";

const CategoryForm = ({ value, setValue, submitHandler, btnName }) => {
  return (
    <>
      <form onSubmit={submitHandler}>
        <div className=" contaioner fluid col-md-10 d-flex justify-content center mx-auto">
          <div className="col-md-10 m-2">
            <input
              type="text"
              value={value}
              onChange={(event) => setValue(event.target.value)}
              placeholder="enter category name"
              className="form-control input-text text-norm"
            />
          </div>
          <div className="col-md-2 m-2">
            <button type="submit" className="btn btn-update lg text-norm">
              {btnName}
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default CategoryForm;
