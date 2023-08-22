import axios from "../../axios-base";

export const clear = () => {
  return function (dispatch, getState) {
    dispatch(clearStart);
    dispatch(loadFooterMenus);
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
    type: "CLEAR_FOOTERMENU",
  };
};

export const loadFooterMenus = () => {
  return function (dispatch, getState) {
    dispatch(loadFooterMenusStart());
    axios
      .get("footermenus")
      .then((response) => {
        const result = response.data.data;
        dispatch(loadFooterMenusSuccess(result));
      })
      .catch((error) => {
        const resultError = errorMessage(error);
        dispatch(loadFooterMenusError(resultError));
      });
  };
};
export const loadFooterMenusStart = () => {
  return {
    type: "LOAD_FOOTERMENUS_START",
  };
};

export const loadFooterMenusSuccess = (result) => {
  return {
    type: "LOAD_FOOTERMENUS_SUCCESS",
    footerMenus: result,
  };
};

export const loadFooterMenusError = (error) => {
  return {
    type: "LOAD_FOOTERMENUS_ERROR",
    error,
  };
};

// SINGLE FOOTERMENU

export const getFooterMenu = (id) => {
  return function (dispatch, getState) {
    dispatch(getFooterMenuStart());
    axios
      .get(`footermenus/${id}`)
      .then((response) => {
        const result = response.data.data;
        dispatch(getFooterMenuSuccess(result));
      })
      .catch((error) => {
        const resultError = errorMessage(error);
        dispatch(getFooterMenuError(resultError));
      });
  };
};

export const getFooterMenuStart = () => {
  return {
    type: "GET_FOOTERMENU_START",
  };
};

export const getFooterMenuSuccess = (result) => {
  return {
    type: "GET_FOOTERMENU_SUCCESS",
    footerMenu: result,
  };
};

export const getFooterMenuError = (error) => {
  return {
    type: "GET_FOOTERMENU_ERROR",
    error,
  };
};

// Change positions
export const changePosition = (data) => {
  return function (dispatch) {
    dispatch(changePositionStart());

    axios
      .post("footermenus/change", data)
      .then((response) => {
        const result = response.data.data;
        dispatch(changePositionSuccess(result));
        dispatch(loadFooterMenus());
      })
      .catch((error) => {
        const resultError = errorMessage(error);
        dispatch(changePositionError(resultError));
      });
  };
};

export const changePositionStart = (result) => {
  return {
    type: "FOOTERMENUS_CHANGE_POSITION_START",
  };
};

export const changePositionSuccess = (data) => {
  return {
    type: "FOOTERMENUS_CHANGE_POSITION_SUCCESS",
    footermenus: data,
  };
};

export const changePositionError = (error) => {
  return {
    type: "FOOTERMENUS_CHANGE_POSITION_ERROR",
    error: error,
  };
};

// DELETE FOOTERMENU

export const deleteFooterMenu = (footermenuId, data) => {
  return function (dispatch, getState) {
    dispatch(deleteFooterMenuStart());

    axios
      .delete(`footermenus/${footermenuId}`, data)
      .then((response) => {
        const resultFooterMenu = response.data.data;
        dispatch(deleteFooterMenuSuccess(resultFooterMenu));
        dispatch(loadFooterMenus());
      })
      .catch((error) => {
        const resultError = errorMessage(error);
        dispatch(deleteFooterMenuError(resultError));
      });
  };
};

export const deleteFooterMenuStart = () => {
  return {
    type: "DELETE_FOOTERMENU_START",
  };
};

export const deleteFooterMenuSuccess = (result) => {
  return {
    type: "DELETE_FOOTERMENU_SUCCESS",
    dlNews: result,
  };
};

export const deleteFooterMenuError = (error) => {
  return {
    type: "DELETE_FOOTERMENU_ERROR",
    error,
  };
};

// SAVE FOOTERMENU

export const saveFooterMenu = (footermenu) => {
  return function (dispatch, getState) {
    dispatch(saveFooterMenuStart());
    let data = {
      name: footermenu.name,
      status: footermenu.status,
      isDirect: footermenu.isDirect,
      isModel: footermenu.isModel,
      model: footermenu.model,
      direct: footermenu.direct,
    };

    if (footermenu.parentId !== null) {
      data = {
        name: footermenu.name,
        parentId: footermenu.parentId,
        isDirect: footermenu.isDirect,
        isModel: footermenu.isModel,
        model: footermenu.model,
        direct: footermenu.direct,
      };
    }

    data.language = footermenu.language;
    data.status = footermenu.status;

    axios
      .post(`footermenus`, data)
      .then((response) => {
        const resultFooterMenu = response.data.data;
        dispatch(saveFooterMenuSuccess(resultFooterMenu));
        dispatch(loadFooterMenus());
      })
      .catch((error) => {
        const resultError = errorMessage(error);
        dispatch(saveFooterMenuError(resultError));
      });
  };
};

export const saveFooterMenuStart = () => {
  return {
    type: "CREATE_FOOTERMENU_START",
  };
};

export const saveFooterMenuSuccess = (resultFooterMenu) => {
  return {
    type: "CREATE_FOOTERMENU_SUCCESS",
  };
};

export const saveFooterMenuError = (error) => {
  return {
    type: "CREATE_FOOTERMENU_ERROR",
    error: error,
  };
};

// UPDATE FOOTERMENU

export const updateFooterMenu = (footermenu, id) => {
  return function (dispatch) {
    dispatch(updateFooterMenuStart());
    const data = {
      name: footermenu.name,
    };

    axios
      .put(`footermenus/${id}`, data)
      .then((response) => {
        const resultFooterMenu = response.data.data;
        dispatch(updateFooterMenuSuccess(resultFooterMenu));
        dispatch(loadFooterMenus());
        dispatch(getFooterMenu(id));
      })
      .catch((error) => {
        const resultError = errorMessage(error);
        dispatch(updateFooterMenuError(resultError));
      });
  };
};

export const updateFooterMenuStart = () => {
  return {
    type: "UPDATE_FOOTERMENU_START",
  };
};

export const updateFooterMenuSuccess = (resultFooterMenu) => {
  return {
    type: "UPDATE_FOOTERMENU_SUCCESS",
    resultFooterMenu: resultFooterMenu,
  };
};

export const updateFooterMenuError = (error) => {
  return {
    type: "UPDATE_FOOTERMENU_ERROR",
    error: error,
  };
};
