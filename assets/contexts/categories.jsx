import React, { useReducer, createContext } from "react";
import axios from "axios";

const initialStateCate = {
  categories: null,
  isLoadingCate: false,
  isLoadedCate: false,
};

export const CategoryStateContext = createContext();
export const CategoryDispatchContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "GET_CATEGORY_REQUEST":
      return {
        ...state,
        isLoadingCate: true,
        isLoadedCate: false,
      };
    case "GET_CATEGORY_SUCCESS":
      return {
        ...state,
        isLoadingCate: false,
        isLoadedCate: true,
        categories: action.payload.categories,
      };
    case "GET_CATEGORY_FAILURE":
      return {
        ...state,
        categories: null,
        isLoadingCate: false,
        isLoadedCate: false,
      };
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};

const CategoriesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialStateCate);
  return (
    <CategoryDispatchContext.Provider value={dispatch}>
      <CategoryStateContext.Provider value={state}>
        {children}
      </CategoryStateContext.Provider>
    </CategoryDispatchContext.Provider>
  );
};

export const getCategories = (dispatch) => {
  dispatch({
    type: "GET_CATEGORY_REQUEST",
  });
  const url = "http://localhost:8001/api/categories";
  axios
    .get(url)
    .then((response) => {
      dispatch({
        type: "GET_CATEGORY_SUCCESS",
        payload: {
          categories: response.data,
        },
      });
    })
    .catch((error) => {
      console.error(error);
      dispatch({
        type: "GET_CATEGORY_FAILURE",
      });
    });
};

export default CategoriesProvider;
