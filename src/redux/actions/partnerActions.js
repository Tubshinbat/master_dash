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
    type: "CLEAR_PARTNER",
  };
};

// SAVE PARTNER
export const savePartnerInit = () => {
  return {
    type: "CREATE_PARTNER_INIT",
  };
};

export const savePartner = (data) => {
  return function (dispatch) {
    dispatch(savePartnerStart());
    axios
      .post(`/partners`, data)
      .then((response) => {
        const result = response.data;
        dispatch(savePartnerSuccess(result));
      })
      .catch((error) => {
        const resError = errorBuild(error);
        dispatch(savePartnerError(resError));
      });
  };
};

export const savePartnerStart = () => {
  return {
    type: "CREATE_PARTNER_START",
  };
};

export const savePartnerSuccess = (result) => {
  return {
    type: "CREATE_PARTNER_SUCCESS",
    partner: result,
  };
};

export const savePartnerError = (error) => {
  return {
    type: "CREATE_PARTNER_ERROR",
    error,
  };
};

// Excel partner
export const getExcelData = (query) => {
  return function (dispatch) {
    dispatch(getExcelDataStart());
    axios
      .get("partners/excel?" + query)
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
    type: "GET_PARTNER_EXCELDATA_START",
  };
};

const getExcelDataSuccess = (data) => {
  return {
    type: "GET_PARTNER_EXCELDATA_SUCCESS",
    excel: data,
  };
};

const getExcelDataError = (error) => {
  return {
    type: "GET_PARTNER_EXCELDATA_ERROR",
    error,
  };
};

// LOAD PARTNER

export const loadPartner = (query = "") => {
  return function (dispatch) {
    dispatch(loadPartnerStart());
    axios
      .get("/partners?" + query)
      .then((response) => {
        const loadPartner = response.data.data;
        const pagination = response.data.pagination;
        dispatch(loadPartnerSuccess(loadPartner));
        dispatch(loadPagination(pagination));
      })
      .catch((error) => {
        const resError = errorBuild(error);
        dispatch(loadPartnerError(resError));
      });
  };
};

export const loadPartnerStart = () => {
  return {
    type: "LOAD_PARTNERS_START",
  };
};

export const loadPartnerSuccess = (partners, pagination) => {
  return {
    type: "LOAD_PARTNERS_SUCCESS",
    partners,
    pagination,
  };
};

export const loadPartnerError = (error) => {
  return {
    type: "LOAD_PARTNERS_ERROR",
    error,
  };
};

export const loadPagination = (pagination) => {
  return {
    type: "LOAD_PARTNER_PAGINATION",
    pagination,
  };
};

export const deleteMultPartner = (ids) => {
  return function (dispatch) {
    dispatch(deleteMultStart());
    axios
      .delete("partners/delete", { params: { id: ids } })
      .then((response) => {
        const deletePartner = response.data.data;
        dispatch(deletePartnerSuccess(deletePartner));
      })
      .catch((error) => {
        const resError = errorBuild(error);
        dispatch(deletePartnerError(resError));
      });
  };
};

export const deleteMultStart = () => {
  return {
    type: "DELETE_MULT_PARTNER_START",
  };
};

export const deletePartnerSuccess = (deleteData) => {
  return {
    type: "DELETE_MULT_PARTNER_SUCCESS",
    deletePartner: deleteData,
  };
};

export const deletePartnerError = (error) => {
  return {
    type: "DELETE_MULT_PARTNER_ERROR",
    error,
  };
};

// GET PARTNER

export const getInit = () => {
  return {
    type: "GET_PARTNER_INIT",
  };
};

export const getPartner = (id) => {
  return function (dispatch) {
    dispatch(getPartnerStart());
    axios
      .get("partners/" + id)
      .then((response) => {
        const partner = response.data.data;
        dispatch(getPartnerSuccess(partner));
      })
      .catch((error) => {
        const resError = errorBuild(error);
        dispatch(getPartnerError(resError));
      });
  };
};

export const getPartnerStart = () => {
  return {
    type: "GET_PARTNER_START",
  };
};

export const getPartnerSuccess = (partner) => {
  return {
    type: "GET_PARTNER_SUCCESS",
    partner,
  };
};

export const getPartnerError = (error) => {
  return {
    type: "GET_PARTNER_ERROR",
    error,
  };
};

//UPDATE PARTNER

export const updatePartner = (id, data) => {
  return function (dispatch) {
    dispatch(updatePartnerStart());
    axios
      .put(`partners/${id}`, data)
      .then((response) => {
        const result = response.data;
        dispatch(updatePartnerSuccess(result));
      })
      .catch((error) => {
        const resError = errorBuild(error);
        dispatch(updatePartnerError(resError));
      });
  };
};

export const updatePartnerStart = () => {
  return {
    type: "UPDATE_PARTNER_START",
  };
};

export const updatePartnerSuccess = (result) => {
  return {
    type: "UPDATE_PARTNER_SUCCESS",
    updatePartner: result,
  };
};

export const updatePartnerError = (error) => {
  return {
    type: "UPDATE_PARTNER_ERROR",
    error,
  };
};

export const getCountPartner = () => {
  return function (dispatch) {
    dispatch(getCountPartnerStart());

    axios
      .get(`partners/count`)
      .then((response) => {
        const result = response.data.data;
        dispatch(getCountPartnerSuccess(result));
      })
      .catch((error) => {
        const resError = errorBuild(error);
        dispatch(getCountPartnerError(resError));
      });
  };
};

export const getCountPartnerStart = () => {
  return {
    type: "GET_COUNT_PARTNER_START",
  };
};

export const getCountPartnerSuccess = (result) => {
  return {
    type: "GET_COUNT_PARTNER_SUCCESS",
    orderCount: result,
  };
};

export const getCountPartnerError = (error) => {
  return {
    type: "GET_COUNT_PARTNER_ERROR",
    error,
  };
};
