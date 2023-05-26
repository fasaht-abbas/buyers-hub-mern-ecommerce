import axios from "axios";
import React, { useState } from "react";
import { useSearch } from "../../context/search";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  const searchHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/search/${values.keywords}`
      );
      if (data.success) {
        setValues({ ...values, results: data.searchResult });
        navigate("/search");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="col-md-12 first-search">
        <div className="input-group">
          <div className="form-outline">
            <form onSubmit={searchHandler}>
              <input
                type="search"
                placeholder="Search for Products"
                id="form1"
                className="form-control input-text"
                style={{
                  borderTopRightRadius: "0px",
                  borderBottomRightRadius: "0px",
                  width: "100%",
                }}
                value={values.keywords}
                onChange={(e) =>
                  setValues({ ...values, keywords: e.target.value })
                }
              />
            </form>
          </div>
          <button
            type="submit"
            className="btn btn-update"
            onClick={searchHandler}
          >
            Search
          </button>
        </div>
      </div>
      <div className="col-md-12 second-search d-none">
        <div className="input-group">
          <div className="form-outline">
            <form onSubmit={searchHandler} className="d-flex flex-column">
              <input
                type="search"
                placeholder="Search for Products"
                id="form1"
                className="form-control input-text mb-2"
                value={values.keywords}
                onChange={(e) =>
                  setValues({ ...values, keywords: e.target.value })
                }
              />
              <div className="col-md-6">
                <button
                  type="submit"
                  className="btn btn-sm btn-update"
                  onClick={searchHandler}
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchBar;
