import axios from "../../axios-base";

export const clear = () => {
  return function (dispatch, getState) {
    dispatch(clearStart);
    dispatch(loadRate);
  };
};

const errorMessage = (error) => {
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

export const clearStart = () => {
  return {
    type: "CLEAR_RATE",
  };
};

export const loadRate = () => {
  return function (dispatch, getState) {
    dispatch(loadRateStart());
    axios
      .get("rates")
      .then((response) => {
        const result = response.data.data;
        const pagination = response.data.pagination;
        dispatch(loadRateSuccess(result));
        dispatch(loadPagination(pagination));
      })
      .catch((error) => {
        const resultError = errorMessage(error);
        dispatch(loadRateError(resultError));
      });
  };
};
export const loadRateStart = () => {
  return {
    type: "LOAD_RATE_START",
  };
};

export const loadRateSuccess = (result) => {
  return {
    type: "LOAD_RATE_SUCCESS",
    rates: result,
  };
};

export const loadRateError = (error) => {
  return {
    type: "LOAD_RATE_ERROR",
    error,
  };
};

export const loadPagination = (pagination) => {
  return {
    type: "LOAD_PAGINATION",
    pagination,
  };
};

// DELETE

export const deleteMultRate = (ids) => {
  return function (dispatch, getState) {
    dispatch(deleteMultStart());
    axios
      .delete("rates/delete", { params: { id: ids } })
      .then((response) => {
        const deleteRate = response.data.data;
        dispatch(deleteRateSuccess(deleteRate));
      })
      .catch((error) => {
        const resError = errorMessage(error);
        dispatch(deleteRateError(resError));
      });
  };
};

export const deleteMultStart = () => {
  return {
    type: "DELETE_MULT_RATE_START",
  };
};

export const deleteRateSuccess = (deleteData) => {
  return {
    type: "DELETE_MULT_RATE_SUCCESS",
    deleteRate: deleteData,
  };
};

export const deleteRateError = (error) => {
  return {
    type: "DELETE_MULT_RATE_ERROR",
    error,
  };
};
