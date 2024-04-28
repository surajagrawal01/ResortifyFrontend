import ResortsData from "./ResortsData";
import FilterComponent from "./FilterComponent";
import { useState, useEffect } from "react";
import { resortsData } from "../../actions/reosrtsDataAction";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { startResortData } from "../../actions/reosrtsDataAction";
export default function ListResorts() {
  const dispatch = useDispatch();

  const resorts = useSelector((state) => {
    return state.resortsData;
  });
  console.log(resorts, "resorts");

  const limit = 2;

  const searchInfo = Object.fromEntries(
    new URLSearchParams(useLocation().search)
  );

  useEffect(() => {
    if (resorts.data.length === 0) {
      dispatch(startResortData(searchInfo.location, limit, resorts.pageNo));
    }
  }, []);

  console.log(resorts, "resortInfo");

  return (
    <>
      <div className="row">
        <div className="col-md-4">
          <FilterComponent resorts={resorts} limit={limit} />
        </div>
        <div className="col-md-8">
          <ResortsData resorts={resorts} limit={limit} />
        </div>
      </div>
    </>
  );
}
