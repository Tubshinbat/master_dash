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
    type: "CLEAR_BANNER",
  };
};

// SAVE BANNER
export const saveBannerInit = () => {
  return {
    type: "CREATE_BANNER_INIT",
  };
};

export const saveBanner = (data) => {
  return function (dispatch, getState) {
    dispatch(saveBannerStart());
    axios
      .post(`/banners`, data)
      .then((response) => {
        const result = response.data;
        dispatch(saveBannerSuccess(result));
      })
      .catch((error) => {
        const resError = errorBuild(error);
        dispatch(saveBannerError(resError));
      });
  };
};

export const saveBannerStart = () => {
  return {
    type: "CREATE_BANNER_START",
  };
};

export const saveBannerSuccess = (result) => {
  return {
    type: "CREATE_BANNER_SUCCESS",
    banner: result,
  };
};

export const saveBannerError = (error) => {
  return {
    type: "CREATE_BANNER_ERROR",
    error,
  };
};

// Excel banner
export const getExcelData = (query) => {
  return function (dispatch) {
    dispatch(getExcelDataStart());
    axios
      .get("banners/excel?" + query)
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
    type: "GET_BANNER_EXCELDATA_START",
  };
};

const getExcelDataSuccess = (data) => {
  return {
    type: "GET_BANNER_EXCELDATA_SUCCESS",
    excel: data,
  };
};

const getExcelDataError = (error) => {
  return {
    type: "GET_BANNER_EXCELDATA_ERROR",
    error,
  };
};

// LOAD BANNER

export const loadBanner = (query = "") => {
  return function (dispatch, getState) {
    dispatch(loadBannerStart());
    axios
      .get("banners?" + query)
      .then((response) => {
        const loadBanner = response.data.data;
        const pagination = response.data.pagination;
        dispatch(loadBannerSuccess(loadBanner));
        dispatch(loadPagination(pagination));
      })
      .catch((error) => {
        const resError = errorBuild(error);
        dispatch(loadBannerError(resError));
      });
  };
};

export const loadBannerStart = () => {
  return {
    type: "LOAD_BANNER_START",
  };
};

export const loadBannerSuccess = (banners, pagination) => {
  return {
    type: "LOAD_BANNER_SUCCESS",
    banners,
    pagination,
  };
};

export const loadBannerError = (error) => {
  return {
    type: "LOAD_BANNER_ERROR",
    error,
  };
};

export const loadPagination = (pagination) => {
  return {
    type: "LOAD_PAGINATION",
    pagination,
  };
};

export const deleteMultBanner = (ids) => {
  return function (dispatch, getState) {
    dispatch(deleteMultStart());
    axios
      .delete("banners/delete", { params: { id: ids } })
      .then((response) => {
        const deleteBanner = response.data.data;
        dispatch(deleteBannerSuccess(deleteBanner));
      })
      .catch((error) => {
        const resError = errorBuild(error);
        dispatch(deleteBannerError(resError));
      });
  };
};

export const deleteMultStart = () => {
  return {
    type: "DELETE_MULT_BANNER_START",
  };
};

export const deleteBannerSuccess = (deleteData) => {
  return {
    type: "DELETE_MULT_BANNER_SUCCESS",
    deleteBanner: deleteData,
  };
};

export const deleteBannerError = (error) => {
  return {
    type: "DELETE_MULT_BANNER_ERROR",
    error,
  };
};

// GET BANNER

export const getInit = () => {
  return {
    type: "GET_BANNER_INIT",
  };
};

export const getBanner = (id) => {
  return function (dispatch, getState) {
    dispatch(getBannerStart());
    axios
      .get("banners/" + id)
      .then((response) => {
        const banner = response.data.data;
        dispatch(getBannerSuccess(banner));
      })
      .catch((error) => {
        const resError = errorBuild(error);
        dispatch(getBannerError(resError));
      });
  };
};

export const getBannerStart = () => {
  return {
    type: "GET_BANNER_START",
  };
};

export const getBannerSuccess = (banner) => {
  return {
    type: "GET_BANNER_SUCCESS",
    banner,
  };
};

export const getBannerError = (error) => {
  return {
    type: "GET_BANNER_ERROR",
    error,
  };
};

//UPDATE BANNER

export const updateBanner = (id, data) => {
  return function (dispatch) {
    dispatch(updateBannerStart());
    axios
      .put(`banners/${id}`, data)
      .then((response) => {
        const result = response.data;
        dispatch(updateBannerSuccess(result));
      })
      .catch((error) => {
        const resError = errorBuild(error);
        dispatch(updateBannerError(resError));
      });
  };
};

export const updateBannerStart = () => {
  return {
    type: "UPDATE_BANNER_START",
  };
};

export const updateBannerSuccess = (result) => {
  return {
    type: "UPDATE_BANNER_SUCCESS",
    updateBanner: result,
  };
};

export const updateBannerError = (error) => {
  return {
    type: "UPDATE_BANNER_ERROR",
    error,
  };
};

export const getCountBanner = () => {
  return function (dispatch) {
    dispatch(getCountBannerStart());

    axios
      .get(`banners/count`)
      .then((response) => {
        const result = response.data.data;
        dispatch(getCountBannerSuccess(result));
      })
      .catch((error) => {
        const resError = errorBuild(error);
        dispatch(getCountBannerError(resError));
      });
  };
};

export const getCountBannerStart = () => {
  return {
    type: "GET_COUNT_BANNER_START",
  };
};

export const getCountBannerSuccess = (result) => {
  return {
    type: "GET_COUNT_BANNER_SUCCESS",
    orderCount: result,
  };
};

export const getCountBannerError = (error) => {
  return {
    type: "GET_COUNT_BANNER_ERROR",
    error,
  };
};
