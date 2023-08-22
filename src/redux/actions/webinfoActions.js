import axios from "../../axios-base";

export const createWebinfo = (data) => {
  return function (dispatch) {
    dispatch(createWebinfoStart());
    axios
      .post("webinfo", data)
      .then((response) => {
        const data = response.data.data;
        dispatch(createWebinfoSuccess(data));
      })
      .catch((error) => {
        let resError = "Алдаа гарлаа дахин оролдож үзнэ үү";

        if (resError) {
          resError = error.message;
        }

        if (
          error.response !== undefined &&
          error.response.status !== undefined
        ) {
          resError = error.response.status;
        }
        if (
          error.response !== undefined &&
          error.response.data !== undefined &&
          error.response.data.error !== undefined
        ) {
          resError = error.response.data.error.message;
        }
        dispatch(createWebinfoError(resError));
      });
  };
};

const createWebinfoStart = () => {
  return {
    type: "CREATE_WEBINFO_START",
  };
};

const createWebinfoSuccess = (data) => {
  return {
    type: "CREATE_WEBINFO_SUCCESS",
    createData: data,
  };
};

const createWebinfoError = (error) => {
  return {
    type: "CREATE_WEBINFO_ERROR",
    error,
  };
};

export const loadWebinfo = () => {
  return function (dispatch) {
    dispatch(loadWebinfoStart());
    axios
      .get("webinfo")
      .then((response) => {
        const data = response.data.data;
        dispatch(loadWebinfoSuccess(data));
      })
      .catch((error) => {
        let resError = "Алдаа гарлаа дахин оролдож үзнэ үү";

        if (resError) {
          resError = error.message;
        }

        if (
          error.response !== undefined &&
          error.response.status !== undefined
        ) {
          resError = error.response.status;
        }
        if (
          error.response !== undefined &&
          error.response.data !== undefined &&
          error.response.data.error !== undefined
        ) {
          resError = error.response.data.error.message;
        }
        dispatch(loadWebinfoError(resError));
      });
  };
};

const loadWebinfoStart = () => {
  return {
    type: "LOAD_WEBINFO_START",
  };
};

const loadWebinfoSuccess = (data) => {
  return {
    type: "LOAD_WEBINFO_SUCCESS",
    loadData: data,
  };
};

const loadWebinfoError = (error) => {
  return {
    type: "LOAD_WEBINFO_ERROR",
    error,
  };
};

export const updateWebinfo = (data) => {
  return function (dispatch, getState) {
    dispatch(updateWebinfoStart());
    axios
      .put(`webinfo`, data)
      .then((response) => {
        const data = response.data.data;
        dispatch(updateWebinfoSuccess(data));
      })
      .catch((error) => {
        let resError = "Алдаа гарлаа дахин оролдож үзнэ үү";

        if (resError) {
          resError = error.message;
        }

        if (
          error.response !== undefined &&
          error.response.status !== undefined
        ) {
          resError = error.response.status;
        }
        if (
          error.response !== undefined &&
          error.response.data !== undefined &&
          error.response.data.error !== undefined
        ) {
          resError = error.response.data.error.message;
        }
        dispatch(updateWebinfoError(resError));
      });
  };
};

export const updateWebinfoStart = () => {
  return {
    type: "UPDATE_WEBINFO_START",
  };
};

export const updateWebinfoSuccess = (data) => {
  return {
    type: "UPDATE_WEBINFO_SUCCESS",
    webInfo: data,
  };
};

export const updateWebinfoError = (error) => {
  return {
    type: "UPDATE_WEBINFO_ERROR",
    error,
  };
};
