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
    type: "CLEAR_MEMBER",
  };
};

// SAVE MEMBER
export const saveMemberInit = () => {
  return {
    type: "CREATE_MEMBER_INIT",
  };
};

export const changePassword = (id, data) => {
  return function (dispatch) {
    dispatch(changePasswordStart());
    axios
      .post(`members/changepassword`, data)
      .then((response) => {
        const updateUser = response.data.data;
        dispatch(changePasswordSuccess(updateUser));
      })
      .catch((error) => {
        dispatch(changePasswordError(errorBuild(error)));
      });
  };
};

export const changePasswordStart = () => {
  return {
    type: "MEMBER_CHANGE_PASSWORD_START",
  };
};

export const changePasswordSuccess = (data) => {
  return {
    type: "MEMBER_CHANGE_PASSWORD_SUCCESS",
    member: data,
  };
};

export const changePasswordError = (error) => {
  return {
    type: "MEMBER_CHANGE_PASSWORD_ERROR",
    error,
  };
};

export const saveMember = (data) => {
  return function (dispatch, getState) {
    dispatch(saveMemberStart());
    axios
      .post(`/members`, data)
      .then((response) => {
        const result = response.data;
        dispatch(saveMemberSuccess(result));
      })
      .catch((error) => {
        const resError = errorBuild(error);
        dispatch(saveMemberError(resError));
      });
  };
};

export const saveMemberStart = () => {
  return {
    type: "CREATE_MEMBER_START",
  };
};

export const saveMemberSuccess = (result) => {
  return {
    type: "CREATE_MEMBER_SUCCESS",
    member: result,
  };
};

export const saveMemberError = (error) => {
  return {
    type: "CREATE_MEMBER_ERROR",
    error,
  };
};

// Excel member
export const getExcelData = (query) => {
  return function (dispatch) {
    dispatch(getExcelDataStart());
    axios
      .get("members/excel?" + query)
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
    type: "GET_MEMBER_EXCELDATA_START",
  };
};

const getExcelDataSuccess = (data) => {
  return {
    type: "GET_MEMBER_EXCELDATA_SUCCESS",
    excel: data,
  };
};

const getExcelDataError = (error) => {
  return {
    type: "GET_MEMBER_EXCELDATA_ERROR",
    error,
  };
};

// LOAD MEMBER

export const loadMember = (query = "") => {
  return function (dispatch, getState) {
    dispatch(loadMemberStart());
    axios
      .get("members?" + query)
      .then((response) => {
        const loadMember = response.data.data;
        const pagination = response.data.pagination;
        dispatch(loadMemberSuccess(loadMember));
        dispatch(loadPagination(pagination));
      })
      .catch((error) => {
        const resError = errorBuild(error);
        dispatch(loadMemberError(resError));
      });
  };
};

export const loadMemberStart = () => {
  return {
    type: "LOAD_MEMBER_START",
  };
};

export const loadMemberSuccess = (members, pagination) => {
  return {
    type: "LOAD_MEMBER_SUCCESS",
    members,
    pagination,
  };
};

export const loadMemberError = (error) => {
  return {
    type: "LOAD_MEMBER_ERROR",
    error,
  };
};

export const loadPagination = (pagination) => {
  return {
    type: "LOAD_PAGINATION",
    pagination,
  };
};

export const deleteMultMember = (ids) => {
  return function (dispatch, getState) {
    dispatch(deleteMultStart());
    axios
      .delete("members/delete", { params: { id: ids } })
      .then((response) => {
        const deleteMember = response.data.data;
        dispatch(deleteMemberSuccess(deleteMember));
      })
      .catch((error) => {
        const resError = errorBuild(error);
        dispatch(deleteMemberError(resError));
      });
  };
};

export const deleteMultStart = () => {
  return {
    type: "DELETE_MULT_MEMBER_START",
  };
};

export const deleteMemberSuccess = (deleteData) => {
  return {
    type: "DELETE_MULT_MEMBER_SUCCESS",
    deleteMember: deleteData,
  };
};

export const deleteMemberError = (error) => {
  return {
    type: "DELETE_MULT_MEMBER_ERROR",
    error,
  };
};

// GET MEMBER

export const getInit = () => {
  return {
    type: "GET_MEMBER_INIT",
  };
};

export const getMember = (id) => {
  return function (dispatch, getState) {
    dispatch(getMemberStart());
    axios
      .get("members/" + id)
      .then((response) => {
        const member = response.data.data;
        dispatch(getMemberSuccess(member));
      })
      .catch((error) => {
        const resError = errorBuild(error);
        dispatch(getMemberError(resError));
      });
  };
};

export const getMemberStart = () => {
  return {
    type: "GET_MEMBER_START",
  };
};

export const getMemberSuccess = (member) => {
  return {
    type: "GET_MEMBER_SUCCESS",
    member,
  };
};

export const getMemberError = (error) => {
  return {
    type: "GET_MEMBER_ERROR",
    error,
  };
};

//UPDATE MEMBER

export const updateMember = (id, data) => {
  return function (dispatch) {
    dispatch(updateMemberStart());
    axios
      .put(`members/${id}`, data)
      .then((response) => {
        const result = response.data;
        dispatch(updateMemberSuccess(result));
      })
      .catch((error) => {
        const resError = errorBuild(error);
        dispatch(updateMemberError(resError));
      });
  };
};

export const updateMemberStart = () => {
  return {
    type: "UPDATE_MEMBER_START",
  };
};

export const updateMemberSuccess = (result) => {
  return {
    type: "UPDATE_MEMBER_SUCCESS",
    updateMember: result,
  };
};

export const updateMemberError = (error) => {
  return {
    type: "UPDATE_MEMBER_ERROR",
    error,
  };
};

export const getCountMember = () => {
  return function (dispatch) {
    dispatch(getCountMemberStart());

    axios
      .get(`members/count`)
      .then((response) => {
        const result = response.data.data;
        dispatch(getCountMemberSuccess(result));
      })
      .catch((error) => {
        const resError = errorBuild(error);
        dispatch(getCountMemberError(resError));
      });
  };
};

export const getCountMemberStart = () => {
  return {
    type: "GET_COUNT_MEMBER_START",
  };
};

export const getCountMemberSuccess = (result) => {
  return {
    type: "GET_COUNT_MEMBER_SUCCESS",
    orderCount: result,
  };
};

export const getCountMemberError = (error) => {
  return {
    type: "GET_COUNT_MEMBER_ERROR",
    error,
  };
};
