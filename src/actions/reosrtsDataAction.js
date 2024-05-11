import axios from "axios";
export const startResortData = (
  location,
  limit,
  page,
  order,
  minPrice = 0,
  maxPrice = Infinity,
  rating = 0
) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `http://localhost:3060/api/properties/lists?city=${location}&limit=${limit}&page=${page}&order=${order}&minPrice=${minPrice}&maxPrice=${maxPrice}&rating=${rating}`
      );
      dispatch(resortsData(response.data));
    } catch (err) {
      alert(err.message);
      console.log(err);
    }
  };
};

export const resortsData = (data) => {
  return {
    type: "SET_RESORT_DATA",
    payload: data,
  };
};

export const clearResortsData = () => {
  return {
    type: "CLEAR_RESORT_DATA",
  };
};
