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
    type: "CLEAR_GALLERY",
  };
};

// SAVE GALLERY
export const saveGalleryInit = () => {
  return {
    type: "CREATE_GALLERY_INIT",
  };
};

export const saveGallery = (data) => {
  return function (dispatch) {
    dispatch(saveGalleryStart());
    axios
      .post(`/gallerys`, data)
      .then((response) => {
        const result = response.data;
        dispatch(saveGallerySuccess(result));
      })
      .catch((error) => {
        const resError = errorBuild(error);
        dispatch(saveGalleryError(resError));
      });
  };
};

export const saveGalleryStart = () => {
  return {
    type: "CREATE_GALLERY_START",
  };
};

export const saveGallerySuccess = (result) => {
  return {
    type: "CREATE_GALLERY_SUCCESS",
    gallery: result,
  };
};

export const saveGalleryError = (error) => {
  return {
    type: "CREATE_GALLERY_ERROR",
    error,
  };
};

// Excel gallery
export const getExcelData = (query) => {
  return function (dispatch) {
    dispatch(getExcelDataStart());
    axios
      .get("gallerys/excel?" + query)
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
    type: "GET_GALLERY_EXCELDATA_START",
  };
};

const getExcelDataSuccess = (data) => {
  return {
    type: "GET_GALLERY_EXCELDATA_SUCCESS",
    excel: data,
  };
};

const getExcelDataError = (error) => {
  return {
    type: "GET_GALLERY_EXCELDATA_ERROR",
    error,
  };
};

// LOAD GALLERY

export const loadGallery = (query = "") => {
  return function (dispatch) {
    dispatch(loadGalleryStart());
    axios
      .get("/gallerys?" + query)
      .then((response) => {
        const loadGallery = response.data.data;
        const pagination = response.data.pagination;
        dispatch(loadGallerySuccess(loadGallery));
        dispatch(loadPagination(pagination));
      })
      .catch((error) => {
        const resError = errorBuild(error);
        dispatch(loadGalleryError(resError));
      });
  };
};

export const loadGalleryStart = () => {
  return {
    type: "LOAD_GALLERYS_START",
  };
};

export const loadGallerySuccess = (gallerys, pagination) => {
  return {
    type: "LOAD_GALLERYS_SUCCESS",
    gallerys,
    pagination,
  };
};

export const loadGalleryError = (error) => {
  return {
    type: "LOAD_GALLERYS_ERROR",
    error,
  };
};

export const loadPagination = (pagination) => {
  return {
    type: "LOAD_GALLERY_PAGINATION",
    pagination,
  };
};

export const deleteMultGallery = (ids) => {
  return function (dispatch) {
    dispatch(deleteMultStart());
    axios
      .delete("gallerys/delete", { params: { id: ids } })
      .then((response) => {
        const deleteGallery = response.data.data;
        dispatch(deleteGallerySuccess(deleteGallery));
      })
      .catch((error) => {
        const resError = errorBuild(error);
        dispatch(deleteGalleryError(resError));
      });
  };
};

export const deleteMultStart = () => {
  return {
    type: "DELETE_MULT_GALLERY_START",
  };
};

export const deleteGallerySuccess = (deleteData) => {
  return {
    type: "DELETE_MULT_GALLERY_SUCCESS",
    deleteGallery: deleteData,
  };
};

export const deleteGalleryError = (error) => {
  return {
    type: "DELETE_MULT_GALLERY_ERROR",
    error,
  };
};

// GET GALLERY

export const getInit = () => {
  return {
    type: "GET_GALLERY_INIT",
  };
};

export const getGallery = (id) => {
  return function (dispatch) {
    dispatch(getGalleryStart());
    axios
      .get("gallerys/" + id)
      .then((response) => {
        const gallery = response.data.data;
        dispatch(getGallerySuccess(gallery));
      })
      .catch((error) => {
        const resError = errorBuild(error);
        dispatch(getGalleryError(resError));
      });
  };
};

export const getGalleryStart = () => {
  return {
    type: "GET_GALLERY_START",
  };
};

export const getGallerySuccess = (gallery) => {
  return {
    type: "GET_GALLERY_SUCCESS",
    gallery,
  };
};

export const getGalleryError = (error) => {
  return {
    type: "GET_GALLERY_ERROR",
    error,
  };
};

//UPDATE GALLERY

export const updateGallery = (id, data) => {
  return function (dispatch) {
    dispatch(updateGalleryStart());
    axios
      .put(`gallerys/${id}`, data)
      .then((response) => {
        const result = response.data;
        dispatch(updateGallerySuccess(result));
      })
      .catch((error) => {
        const resError = errorBuild(error);
        dispatch(updateGalleryError(resError));
      });
  };
};

export const updateGalleryStart = () => {
  return {
    type: "UPDATE_GALLERY_START",
  };
};

export const updateGallerySuccess = (result) => {
  return {
    type: "UPDATE_GALLERY_SUCCESS",
    updateGallery: result,
  };
};

export const updateGalleryError = (error) => {
  return {
    type: "UPDATE_GALLERY_ERROR",
    error,
  };
};

export const getCountGallery = () => {
  return function (dispatch) {
    dispatch(getCountGalleryStart());

    axios
      .get(`gallerys/count`)
      .then((response) => {
        const result = response.data.data;
        dispatch(getCountGallerySuccess(result));
      })
      .catch((error) => {
        const resError = errorBuild(error);
        dispatch(getCountGalleryError(resError));
      });
  };
};

export const getCountGalleryStart = () => {
  return {
    type: "GET_COUNT_GALLERY_START",
  };
};

export const getCountGallerySuccess = (result) => {
  return {
    type: "GET_COUNT_GALLERY_SUCCESS",
    orderCount: result,
  };
};

export const getCountGalleryError = (error) => {
  return {
    type: "GET_COUNT_GALLERY_ERROR",
    error,
  };
};
