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
    type: "CLEAR_FAQ",
  };
};

// SAVE FAQ
export const saveFaqInit = () => {
  return {
    type: "CREATE_FAQ_INIT",
  };
};

export const saveFaq = (data) => {
  return function (dispatch) {
    dispatch(saveFaqStart());
    axios
      .post(`/faqs`, data)
      .then((response) => {
        const result = response.data;
        dispatch(saveFaqSuccess(result));
      })
      .catch((error) => {
        const resError = errorBuild(error);
        dispatch(saveFaqError(resError));
      });
  };
};

export const saveFaqStart = () => {
  return {
    type: "CREATE_FAQ_START",
  };
};

export const saveFaqSuccess = (result) => {
  return {
    type: "CREATE_FAQ_SUCCESS",
    faq: result,
  };
};

export const saveFaqError = (error) => {
  return {
    type: "CREATE_FAQ_ERROR",
    error,
  };
};

// Excel faq
export const getExcelData = (query) => {
  return function (dispatch) {
    dispatch(getExcelDataStart());
    axios
      .get("faqs/excel?" + query)
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
    type: "GET_FAQ_EXCELDATA_START",
  };
};

const getExcelDataSuccess = (data) => {
  return {
    type: "GET_FAQ_EXCELDATA_SUCCESS",
    excel: data,
  };
};

const getExcelDataError = (error) => {
  return {
    type: "GET_FAQ_EXCELDATA_ERROR",
    error,
  };
};

// LOAD FAQ

export const loadFaq = (query = "") => {
  return function (dispatch) {
    dispatch(loadFaqStart());
    axios
      .get("/faqs?" + query)
      .then((response) => {
        const loadFaq = response.data.data;
        const pagination = response.data.pagination;
        dispatch(loadFaqSuccess(loadFaq));
        dispatch(loadPagination(pagination));
      })
      .catch((error) => {
        const resError = errorBuild(error);
        dispatch(loadFaqError(resError));
      });
  };
};

export const loadFaqStart = () => {
  return {
    type: "LOAD_FAQS_START",
  };
};

export const loadFaqSuccess = (faqs, pagination) => {
  return {
    type: "LOAD_FAQS_SUCCESS",
    faqs,
    pagination,
  };
};

export const loadFaqError = (error) => {
  return {
    type: "LOAD_FAQS_ERROR",
    error,
  };
};

export const loadPagination = (pagination) => {
  return {
    type: "LOAD_FAQ_PAGINATION",
    pagination,
  };
};

export const deleteMultFaq = (ids) => {
  return function (dispatch) {
    dispatch(deleteMultStart());
    axios
      .delete("faqs/delete", { params: { id: ids } })
      .then((response) => {
        const deleteFaq = response.data.data;
        dispatch(deleteFaqSuccess(deleteFaq));
      })
      .catch((error) => {
        const resError = errorBuild(error);
        dispatch(deleteFaqError(resError));
      });
  };
};

export const deleteMultStart = () => {
  return {
    type: "DELETE_MULT_FAQ_START",
  };
};

export const deleteFaqSuccess = (deleteData) => {
  return {
    type: "DELETE_MULT_FAQ_SUCCESS",
    deleteFaq: deleteData,
  };
};

export const deleteFaqError = (error) => {
  return {
    type: "DELETE_MULT_FAQ_ERROR",
    error,
  };
};

// GET FAQ

export const getInit = () => {
  return {
    type: "GET_FAQ_INIT",
  };
};

export const getFaq = (id) => {
  return function (dispatch) {
    dispatch(getFaqStart());
    axios
      .get("faqs/" + id)
      .then((response) => {
        const faq = response.data.data;
        dispatch(getFaqSuccess(faq));
      })
      .catch((error) => {
        const resError = errorBuild(error);
        dispatch(getFaqError(resError));
      });
  };
};

export const getFaqStart = () => {
  return {
    type: "GET_FAQ_START",
  };
};

export const getFaqSuccess = (faq) => {
  return {
    type: "GET_FAQ_SUCCESS",
    faq,
  };
};

export const getFaqError = (error) => {
  return {
    type: "GET_FAQ_ERROR",
    error,
  };
};

//UPDATE FAQ

export const updateFaq = (id, data) => {
  return function (dispatch) {
    dispatch(updateFaqStart());
    axios
      .put(`faqs/${id}`, data)
      .then((response) => {
        const result = response.data;
        dispatch(updateFaqSuccess(result));
      })
      .catch((error) => {
        const resError = errorBuild(error);
        dispatch(updateFaqError(resError));
      });
  };
};

export const updateFaqStart = () => {
  return {
    type: "UPDATE_FAQ_START",
  };
};

export const updateFaqSuccess = (result) => {
  return {
    type: "UPDATE_FAQ_SUCCESS",
    updateFaq: result,
  };
};

export const updateFaqError = (error) => {
  return {
    type: "UPDATE_FAQ_ERROR",
    error,
  };
};

export const getCountFaq = () => {
  return function (dispatch) {
    dispatch(getCountFaqStart());

    axios
      .get(`faqs/count`)
      .then((response) => {
        const result = response.data.data;
        dispatch(getCountFaqSuccess(result));
      })
      .catch((error) => {
        const resError = errorBuild(error);
        dispatch(getCountFaqError(resError));
      });
  };
};

export const getCountFaqStart = () => {
  return {
    type: "GET_COUNT_FAQ_START",
  };
};

export const getCountFaqSuccess = (result) => {
  return {
    type: "GET_COUNT_FAQ_SUCCESS",
    orderCount: result,
  };
};

export const getCountFaqError = (error) => {
  return {
    type: "GET_COUNT_FAQ_ERROR",
    error,
  };
};
