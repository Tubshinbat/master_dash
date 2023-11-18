import axios from "../../axios-base";

const errorBuild = (error) => {
  let resError = "Алдаа гарлаа дахин оролдож үзнэ үү";

  if (resError) {
    resError = error.message;
  }

  if (error.response !== undefined && error.response.status !== undefined) {
    resError = error.response.status;
  }
  if (
    error.response !== undefined &&
    error.response.data !== undefined &&
    error.response.data.error !== undefined
  ) {
    resError = error.response.data.error.message;
  }
  return resError;
};

export const clear = () => {
  return {
    type: "CLEAR_PRODUCT",
  };
};

// SAVE PRODUCT
export const saveProductInit = () => {
  return {
    type: "CREATE_PRODUCT_INIT",
  };
};

export const saveProduct = (data) => {
  return function (dispatch, getState) {
    dispatch(saveProductStart());
    axios
      .post(`/products`, data)
      .then((response) => {
        const result = response.data;
        dispatch(saveProductSuccess(result));
      })
      .catch((error) => {
        const resError = errorBuild(error);
        dispatch(saveProductError(resError));
      });
  };
};

export const saveProductStart = () => {
  return {
    type: "CREATE_PRODUCT_START",
  };
};

export const saveProductSuccess = (result) => {
  return {
    type: "CREATE_PRODUCT_SUCCESS",
    product: result,
  };
};

export const saveProductError = (error) => {
  return {
    type: "CREATE_PRODUCT_ERROR",
    error,
  };
};

// Excel product
export const getExcelData = (query) => {
  return function (dispatch) {
    dispatch(getExcelDataStart());
    axios
      .get("products/excel?" + query)
      .then((response) => {
        const data = response.data.data;
        dispatch(getExcelDataSuccess(data));
      })
      .catch((error) => {
        let resError = errorBuild(error);
        dispatch(getExcelDataError(resError));
      });
  };
};

const getExcelDataStart = () => {
  return {
    type: "GET_PRODUCT_EXCELDATA_START",
  };
};

const getExcelDataSuccess = (data) => {
  return {
    type: "GET_PRODUCT_EXCELDATA_SUCCESS",
    excel: data,
  };
};

const getExcelDataError = (error) => {
  return {
    type: "GET_PRODUCT_EXCELDATA_ERROR",
    error,
  };
};

// LOAD PRODUCT

export const loadProduct = (query = "") => {
  return function (dispatch, getState) {
    dispatch(loadProductStart());
    axios
      .get("products?" + query)
      .then((response) => {
        const loadProduct = response.data.data;
        const pagination = response.data.pagination;
        dispatch(loadProductSuccess(loadProduct));
        dispatch(loadPagination(pagination));
      })
      .catch((error) => {
        const resError = errorBuild(error);
        dispatch(loadProductError(resError));
      });
  };
};

export const loadProductStart = () => {
  return {
    type: "LOAD_PRODUCT_START",
  };
};

export const loadProductSuccess = (products, pagination) => {
  return {
    type: "LOAD_PRODUCT_SUCCESS",
    products,
    pagination,
  };
};

export const loadProductError = (error) => {
  return {
    type: "LOAD_PRODUCT_ERROR",
    error,
  };
};

export const loadPagination = (pagination) => {
  return {
    type: "LOAD_PAGINATION",
    pagination,
  };
};

export const deleteMultProduct = (ids) => {
  return function (dispatch, getState) {
    dispatch(deleteMultStart());
    axios
      .delete("products/delete", { params: { id: ids } })
      .then((response) => {
        const deleteProduct = response.data.data;
        dispatch(deleteProductSuccess(deleteProduct));
      })
      .catch((error) => {
        const resError = errorBuild(error);
        dispatch(deleteProductError(resError));
      });
  };
};

export const deleteMultStart = () => {
  return {
    type: "DELETE_MULT_PRODUCT_START",
  };
};

export const deleteProductSuccess = (deleteData) => {
  return {
    type: "DELETE_MULT_PRODUCT_SUCCESS",
    deleteProduct: deleteData,
  };
};

export const deleteProductError = (error) => {
  return {
    type: "DELETE_MULT_PRODUCT_ERROR",
    error,
  };
};

// GET PRODUCT

export const getInit = () => {
  return {
    type: "GET_PRODUCT_INIT",
  };
};

export const getProduct = (id) => {
  return function (dispatch, getState) {
    dispatch(getProductStart());
    axios
      .get("products/" + id)
      .then((response) => {
        const product = response.data.data;
        dispatch(getProductSuccess(product));
      })
      .catch((error) => {
        const resError = errorBuild(error);
        dispatch(getProductError(resError));
      });
  };
};

export const getProductStart = () => {
  return {
    type: "GET_PRODUCT_START",
  };
};

export const getProductSuccess = (product) => {
  return {
    type: "GET_PRODUCT_SUCCESS",
    product,
  };
};

export const getProductError = (error) => {
  return {
    type: "GET_PRODUCT_ERROR",
    error,
  };
};

//UPDATE PRODUCT

export const updateProduct = (id, data) => {
  return function (dispatch) {
    dispatch(updateProductStart());
    axios
      .put(`products/${id}`, data)
      .then((response) => {
        const result = response.data;
        dispatch(updateProductSuccess(result));
      })
      .catch((error) => {
        const resError = errorBuild(error);
        dispatch(updateProductError(resError));
      });
  };
};

export const updateProductStart = () => {
  return {
    type: "UPDATE_PRODUCT_START",
  };
};

export const updateProductSuccess = (result) => {
  return {
    type: "UPDATE_PRODUCT_SUCCESS",
    updateProduct: result,
  };
};

export const updateProductError = (error) => {
  return {
    type: "UPDATE_PRODUCT_ERROR",
    error,
  };
};

export const getCountProduct = () => {
  return function (dispatch) {
    dispatch(getCountProductStart());

    axios
      .get(`products/count`)
      .then((response) => {
        const result = response.data.data;
        dispatch(getCountProductSuccess(result));
      })
      .catch((error) => {
        const resError = errorBuild(error);
        dispatch(getCountProductError(resError));
      });
  };
};

export const getCountProductStart = () => {
  return {
    type: "GET_COUNT_PRODUCT_START",
  };
};

export const getCountProductSuccess = (result) => {
  return {
    type: "GET_COUNT_PRODUCT_SUCCESS",
    orderCount: result,
  };
};

export const getCountProductError = (error) => {
  return {
    type: "GET_COUNT_PRODUCT_ERROR",
    error,
  };
};
