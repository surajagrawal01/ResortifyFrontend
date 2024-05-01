import ResortsData from "./ResortsData";
import FilterComponent from "./FilterComponent";
import { useState, useEffect } from "react";
import { resortsData } from "../../actions/reosrtsDataAction";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { startResortData } from "../../actions/reosrtsDataAction";
export default function ListResorts() {
  const [priceVal, setPriceVal] = useState(null);
  const [rating, setRating] = useState(null);
  const [order, setOrder] = useState("low");

  const updatePrice = (val)=>{
    setPriceVal(val)
  }

  const updateRating = (val)=>{
    setRating(val)
  }

  const updateOrder = (val)=>{
    setOrder(val)
  }

  const dispatch = useDispatch();

  const resorts = useSelector((state) => {
    return state.resortsData;
  });

  const limit = 2;

  const searchInfo = Object.fromEntries(
    new URLSearchParams(useLocation().search)
  );

  useEffect(() => {
    if (resorts.data.length === 0) {
      dispatch(startResortData(searchInfo.location, limit, resorts.pageNo,  order,
        priceVal?.minPrice,
        priceVal?.maxPrice,
        rating));
    }
  }, []);

  return (
    <>
      <div className="row container-fluid">
        <div className="col-md-4">
          <FilterComponent resorts={resorts} 
            limit={limit} 
            updatePrice={updatePrice} 
            updateRating={updateRating} 
            updateOrder={updateOrder} 
            order={order} 
            priceVal={priceVal} 
            rating={rating}  />
        </div>
        <div className="col-md-8">
          <ResortsData resorts={resorts} limit={limit} order={order} 
            priceVal={priceVal} 
            rating={rating} />
        </div>
      </div>
    </>
  );
}
