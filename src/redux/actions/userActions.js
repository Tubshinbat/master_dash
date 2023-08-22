import axios from "../../axios-base";

export const clear = () => {
  return {
    type: "CLEAR_USER",
  };
};

// EXCEL
export const getExcelData = (query) => {
  return function (dispatch) {
    dispatch(getExcelDataStart());
    axios
      .get("users/excel?" + query)
      .then((response) => {
        const data = response.data.data;
        dispatch(getExcelDataSuccess(data));
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
        dispatch(getExcelDataError(resError));
      });
  };
};

const getExcelDataStart = () => {
  return {
    type: "GET_USEREXCEL_DATA_START",
  };
};

const getExcelDataSuccess = (data) => {
  return {
    type: "GET_USEREXCEL_DATA_SUCCESS",
    excel: data,
  };
};

const getExcelDataError = (error) => {
  return {
    type: "GET_USEREXCEL_DATA_ERROR",
    error,
  };
};

// LOAD USERS
export const getUsers = (query) => {
  return function (dispatch) {
    dispatch(getUsersStart());
    axios
      .get("users?" + query)
      .then((response) => {
        const data = response.data.data;
        const pagination = response.data.pagination;
        dispatch(getUsersSuccess(data));
        dispatch(loadUserPagination(pagination));
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
        dispatch(getUsersError(resError));
      });
  };
};

const getUsersStart = () => {
  return {
    type: "GET_USERS_START",
  };
};

const getUsersSuccess = (data) => {
  return {
    type: "GET_USERS_SUCCESS",
    users: data,
  };
};

const getUsersError = (error) => {
  return {
    type: "GET_USERS_ERROR",
    error,
  };
};


// CREATE USER
export const createUser = (data) => {
  return function (dispatch) {
    dispatch(createUserStart());
    axios
      .post("users", data)
      .then((response) => {
        const data = response.data.data;
        dispatch(createUserSuccess(data));
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
        dispatch(createUserError(resError));
      });
  };
};

const createUserStart = () => {
  return {
    type: "CREATE_USER_START",
  };
};

const createUserSuccess = (data) => {
  return {
    type: "CREATE_USER_SUCCESS",
    user: data,
  };
};

const createUserError = (error) => {
  return {
    type: "CREATE_USER_ERROR",
    error,
  };
};

export const loadUserPagination = (pagination) => {
  return {
    type: "LOAD_USERS_PAGINATION",
    pagination,
  };
};

// DELETE USERS

export const deleteMultUsers = (ids) => {
  return function (dispatch) {
    dispatch(deleteMultStart());
    axios
      .delete("users/delete", { params: { id: ids } })
      .then((response) => {
        const data = response.data.data;
        dispatch(deleteMultSuccess(data));
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
        dispatch(deleteMultError(resError));
      });
  };
};

export const deleteMultStart = () => {
  return {
    type: "DELETE_MULT_USERS_START",
  };
};

export const deleteMultSuccess = (deleteData) => {
  return {
    type: "DELETE_MULT_USERS_SUCCESS",
  };
};

export const deleteMultError = (error) => {
  return {
    type: "DELETE_MULT_USERS_ERROR",
    error,
  };
};

// GET USER

export const getUser = (id) => {
  return function (dispatch) {
    dispatch(getUserStart());
    axios
      .get(`/users/${id}`)
      .then((response) => {
        const getUser = response.data.data;
        dispatch(getUserSuccess(getUser));
      })
      .catch((error) => {
        let resError = error.message;
        dispatch(getUserError(resError));
      });
  };
};

export const getUserInit = () => {
  return {
    type: "GET_USER_INIT",
  };
};

export const getUserStart = () => {
  return {
    type: "GET_USER_START",
  };
};

export const getUserSuccess = (data) => {
  return {
    type: "GET_USER_SUCCESS",
    user: data,
  };
};

export const getUserError = (error) => {
  return {
    type: "GET_USER_ERROR",
    error,
  };
};

export const updateUser = (id, data) => {
  return function (dispatch) {
    dispatch(updateUserStart());
    axios
      .put(`/users/${id}`, data)
      .then((response) => {
        const updateUser = response.data.data;
        dispatch(updateUserSuccess(updateUser));
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
        dispatch(updateUserError(resError));
      });
  };
};

export const updateUserInit = () => {
  return {
    type: "UPDATE_USER_INIT",
  };
};

export const updateUserStart = () => {
  return {
    type: "UPDATE_USER_START",
  };
};

export const updateUserSuccess = (data) => {
  return {
    type: "UPDATE_USER_SUCCESS",
    user: data,
  };
};

export const updateUserError = (error) => {
  return {
    type: "UPDATE_USER_ERROR",
    error,
  };
};

export const resetPasswordControl = (id, data) => {
  return function (dispatch) {
    dispatch(resetPasswordControlStart());
    axios
      .post(`users/admin-reset-password/${id}`, data)
      .then((response) => {
        const updateUser = response.data.data;
        dispatch(resetPasswordControlSuccess(updateUser));
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
        dispatch(resetPasswordControlError(resError));
      });
  };
};

export const resetPasswordControlInit = () => {
  return {
    type: "RESET_PASSWORD_USER_INIT",
  };
};

export const resetPasswordControlStart = () => {
  return {
    type: "RESET_PASSWORD_USER_START",
  };
};

export const resetPasswordControlSuccess = (data) => {
  return {
    type: "RESET_PASSWORD_USER_SUCCESS",
    resetUser: data,
  };
};

export const resetPasswordControlError = (error) => {
  return {
    type: "RESET_PASSWORD_USER_ERROR",
    error,
  };
};

export const getCountUser = () => {
  return function (dispatch) {
    dispatch(getCountUserStart());

    axios
      .get(`users/count`)
      .then((response) => {
        const result = response.data.data;
        dispatch(getCountUserSuccess(result));
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
        dispatch(getCountUserError(resError));
      });
  };
};

export const getCountUserStart = () => {
  return {
    type: "GET_COUNT_USER_START",
  };
};

export const getCountUserSuccess = (result) => {
  return {
    type: "GET_COUNT_USER_SUCCESS",
    orderCount: result,
  };
};

export const getCountUserError = (error) => {
  return {
    type: "GET_COUNT_USER_ERROR",
    error,
  };
};
