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
    type: "CLEAR_SERVICE",
  };
};

// SAVE SERVICE
export const saveServiceInit = () => {
  return {
    type: "CREATE_SERVICE_INIT",
  };
};

export const saveService = (data) => {
  return function (dispatch) {
    dispatch(saveServiceStart());
    axios
      .post(`/services`, data)
      .then((response) => {
        const result = response.data;
        dispatch(saveServiceSuccess(result));
      })
      .catch((error) => {
        const resError = errorBuild(error);
        dispatch(saveServiceError(resError));
      });
  };
};

export const saveServiceStart = () => {
  return {
    type: "CREATE_SERVICE_START",
  };
};

export const saveServiceSuccess = (result) => {
  return {
    type: "CREATE_SERVICE_SUCCESS",
    service: result,
  };
};

export const saveServiceError = (error) => {
  return {
    type: "CREATE_SERVICE_ERROR",
    error,
  };
};

// Excel service
export const getExcelData = (query) => {
  return function (dispatch) {
    dispatch(getExcelDataStart());
    axios
      .get("services/excel?" + query)
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
    type: "GET_SERVICE_EXCELDATA_START",
  };
};

const getExcelDataSuccess = (data) => {
  return {
    type: "GET_SERVICE_EXCELDATA_SUCCESS",
    excel: data,
  };
};

const getExcelDataError = (error) => {
  return {
    type: "GET_SERVICE_EXCELDATA_ERROR",
    error,
  };
};

// LOAD SERVICE

export const loadService = (query = "") => {
  return function (dispatch) {
    dispatch(loadServiceStart());
    axios
      .get("/services?" + query)
      .then((response) => {
        const loadService = response.data.data;
        const pagination = response.data.pagination;
        dispatch(loadServiceSuccess(loadService));
        dispatch(loadPagination(pagination));
      })
      .catch((error) => {
        const resError = errorBuild(error);
        dispatch(loadServiceError(resError));
      });
  };
};

export const loadServiceStart = () => {
  return {
    type: "LOAD_SERVICES_START",
  };
};

export const loadServiceSuccess = (services, pagination) => {
  return {
    type: "LOAD_SERVICES_SUCCESS",
    services,
    pagination,
  };
};

export const loadServiceError = (error) => {
  return {
    type: "LOAD_SERVICES_ERROR",
    error,
  };
};

export const loadPagination = (pagination) => {
  return {
    type: "LOAD_SERVICE_PAGINATION",
    pagination,
  };
};

export const deleteMultService = (ids) => {
  return function (dispatch) {
    dispatch(deleteMultStart());
    axios
      .delete("services/delete", { params: { id: ids } })
      .then((response) => {
        const deleteService = response.data.data;
        dispatch(deleteServiceSuccess(deleteService));
      })
      .catch((error) => {
        const resError = errorBuild(error);
        dispatch(deleteServiceError(resError));
      });
  };
};

export const deleteMultStart = () => {
  return {
    type: "DELETE_MULT_SERVICE_START",
  };
};

export const deleteServiceSuccess = (deleteData) => {
  return {
    type: "DELETE_MULT_SERVICE_SUCCESS",
    deleteService: deleteData,
  };
};

export const deleteServiceError = (error) => {
  return {
    type: "DELETE_MULT_SERVICE_ERROR",
    error,
  };
};

// GET SERVICE

export const getInit = () => {
  return {
    type: "GET_SERVICE_INIT",
  };
};

export const getService = (id) => {
  return function (dispatch) {
    dispatch(getServiceStart());
    axios
      .get("services/" + id)
      .then((response) => {
        const service = response.data.data;
        dispatch(getServiceSuccess(service));
      })
      .catch((error) => {
        const resError = errorBuild(error);
        dispatch(getServiceError(resError));
      });
  };
};

export const getServiceStart = () => {
  return {
    type: "GET_SERVICE_START",
  };
};

export const getServiceSuccess = (service) => {
  return {
    type: "GET_SERVICE_SUCCESS",
    service,
  };
};

export const getServiceError = (error) => {
  return {
    type: "GET_SERVICE_ERROR",
    error,
  };
};

//UPDATE SERVICE

export const updateService = (id, data) => {
  return function (dispatch) {
    dispatch(updateServiceStart());
    axios
      .put(`services/${id}`, data)
      .then((response) => {
        const result = response.data;
        dispatch(updateServiceSuccess(result));
      })
      .catch((error) => {
        const resError = errorBuild(error);
        dispatch(updateServiceError(resError));
      });
  };
};

export const updateServiceStart = () => {
  return {
    type: "UPDATE_SERVICE_START",
  };
};

export const updateServiceSuccess = (result) => {
  return {
    type: "UPDATE_SERVICE_SUCCESS",
    updateService: result,
  };
};

export const updateServiceError = (error) => {
  return {
    type: "UPDATE_SERVICE_ERROR",
    error,
  };
};

export const getCountService = () => {
  return function (dispatch) {
    dispatch(getCountServiceStart());

    axios
      .get(`services/count`)
      .then((response) => {
        const result = response.data.data;
        dispatch(getCountServiceSuccess(result));
      })
      .catch((error) => {
        const resError = errorBuild(error);
        dispatch(getCountServiceError(resError));
      });
  };
};

export const getCountServiceStart = () => {
  return {
    type: "GET_COUNT_SERVICE_START",
  };
};

export const getCountServiceSuccess = (result) => {
  return {
    type: "GET_COUNT_SERVICE_SUCCESS",
    orderCount: result,
  };
};

export const getCountServiceError = (error) => {
  return {
    type: "GET_COUNT_SERVICE_ERROR",
    error,
  };
};
