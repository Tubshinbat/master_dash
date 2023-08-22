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
    type: "CLEAR_NEWS",
  };
};

// SAVE NEWS
export const saveNewsInit = () => {
  return {
    type: "CREATE_NEWS_INIT",
  };
};

export const saveNews = (news) => {
  return function (dispatch, getState) {
    dispatch(saveNewsStart());
    axios
      .post(`/news`, news)
      .then((response) => {
        const result = response.data;
        dispatch(saveNewsSuccess(result));
      })
      .catch((error) => {
        const resError = errorBuild(error);
        dispatch(saveNewsError(resError));
      });
  };
};

export const saveNewsStart = () => {
  return {
    type: "CREATE_NEWS_START",
  };
};

export const saveNewsSuccess = (result) => {
  return {
    type: "CREATE_NEWS_SUCCESS",
    news: result,
  };
};

export const saveNewsError = (error) => {
  return {
    type: "CREATE_NEWS_ERROR",
    error,
  };
};

// Excel news
export const getExcelData = (query) => {
  return function (dispatch) {
    dispatch(getExcelDataStart());
    axios
      .get("news/excel?" + query)
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
    type: "GET_NEWS_EXCELDATA_START",
  };
};

const getExcelDataSuccess = (data) => {
  return {
    type: "GET_NEWS_EXCELDATA_SUCCESS",
    excel: data,
  };
};

const getExcelDataError = (error) => {
  return {
    type: "GET_NEWS_EXCELDATA_ERROR",
    error,
  };
};

// LOAD NEWS

export const loadNews = (query = "") => {
  return function (dispatch, getState) {
    dispatch(loadNewsStart());
    axios
      .get("news?" + query)
      .then((response) => {
        const loadNews = response.data.data;
        const pagination = response.data.pagination;
        dispatch(loadNewsSuccess(loadNews));
        dispatch(loadPagination(pagination));
      })
      .catch((error) => {
        const resError = errorBuild(error);
        dispatch(loadNewsError(resError));
      });
  };
};

export const loadNewsStart = () => {
  return {
    type: "LOAD_NEWS_START",
  };
};

export const loadNewsSuccess = (loadNews, pagination) => {
  return {
    type: "LOAD_NEWS_SUCCESS",
    loadNews,
    pagination,
  };
};

export const loadNewsError = (error) => {
  return {
    type: "LOAD_NEWS_ERROR",
    error,
  };
};

export const loadPagination = (pagination) => {
  return {
    type: "LOAD_PAGINATION",
    pagination,
  };
};

export const deleteMultNews = (ids) => {
  return function (dispatch, getState) {
    dispatch(deleteMultStart());
    axios
      .delete("news/delete", { params: { id: ids } })
      .then((response) => {
        const deleteNews = response.data.data;
        dispatch(deleteNewsSuccess(deleteNews));
      })
      .catch((error) => {
        const resError = errorBuild(error);
        dispatch(deleteNewsError(resError));
      });
  };
};

export const deleteMultStart = () => {
  return {
    type: "DELETE_MULT_NEWS_START",
  };
};

export const deleteNewsSuccess = (deleteData) => {
  return {
    type: "DELETE_MULT_NEWS_SUCCESS",
    deleteNews: deleteData,
  };
};

export const deleteNewsError = (error) => {
  return {
    type: "DELETE_MULT_NEWS_ERROR",
    error,
  };
};

// GET NEWS

export const getInit = () => {
  return {
    type: "GET_NEWS_INIT",
  };
};

export const getNews = (id) => {
  return function (dispatch, getState) {
    dispatch(getNewsStart());
    axios
      .get("news/" + id)
      .then((response) => {
        const news = response.data.data;
        dispatch(getNewsSuccess(news));
      })
      .catch((error) => {
        const resError = errorBuild(error);
        dispatch(getNewsError(resError));
      });
  };
};

export const getNewsStart = () => {
  return {
    type: "GET_NEWS_START",
  };
};

export const getNewsSuccess = (news) => {
  return {
    type: "GET_NEWS_SUCCESS",
    singleNews: news,
  };
};

export const getNewsError = (error) => {
  return {
    type: "GET_NEWS_ERROR",
    error,
  };
};

//UPDATE NEWS

export const updateNews = (id, data) => {
  return function (dispatch) {
    dispatch(updateNewsStart());
    axios
      .put(`news/${id}`, data)
      .then((response) => {
        const result = response.data;
        dispatch(updateNewsSuccess(result));
      })
      .catch((error) => {
        const resError = errorBuild(error);
        dispatch(updateNewsError(resError));
      });
  };
};

export const updateNewsStart = () => {
  return {
    type: "UPDATE_NEWS_START",
  };
};

export const updateNewsSuccess = (result) => {
  return {
    type: "UPDATE_NEWS_SUCCESS",
    updateNews: result,
  };
};

export const updateNewsError = (error) => {
  return {
    type: "UPDATE_NEWS_ERROR",
    error,
  };
};

export const getCountNews = () => {
  return function (dispatch) {
    dispatch(getCountNewsStart());

    axios
      .get(`news/count`)
      .then((response) => {
        const result = response.data.data;
        dispatch(getCountNewsSuccess(result));
      })
      .catch((error) => {
        const resError = errorBuild(error);
        dispatch(getCountNewsError(resError));
      });
  };
};

export const getCountNewsStart = () => {
  return {
    type: "GET_COUNT_NEWS_START",
  };
};

export const getCountNewsSuccess = (result) => {
  return {
    type: "GET_COUNT_NEWS_SUCCESS",
    orderCount: result,
  };
};

export const getCountNewsError = (error) => {
  return {
    type: "GET_COUNT_NEWS_ERROR",
    error,
  };
};
