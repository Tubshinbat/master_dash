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
    type: "CLEAR_COURSE",
  };
};

// SAVE COURSE
export const saveCourseInit = () => {
  return {
    type: "CREATE_COURSE_INIT",
  };
};

export const saveCourse = (course) => {
  return function (dispatch, getState) {
    dispatch(saveCourseStart());
    axios
      .post(`/course`, course)
      .then((response) => {
        const result = response.data;
        dispatch(saveCourseSuccess(result));
      })
      .catch((error) => {
        const resError = errorBuild(error);
        dispatch(saveCourseError(resError));
      });
  };
};

export const saveCourseStart = () => {
  return {
    type: "CREATE_COURSE_START",
  };
};

export const saveCourseSuccess = (result) => {
  return {
    type: "CREATE_COURSE_SUCCESS",
    course: result,
  };
};

export const saveCourseError = (error) => {
  return {
    type: "CREATE_COURSE_ERROR",
    error,
  };
};

// Excel course
export const getExcelData = (query) => {
  return function (dispatch) {
    dispatch(getExcelDataStart());
    axios
      .get("course/excel?" + query)
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
    type: "GET_COURSE_EXCELDATA_START",
  };
};

const getExcelDataSuccess = (data) => {
  return {
    type: "GET_COURSE_EXCELDATA_SUCCESS",
    excel: data,
  };
};

const getExcelDataError = (error) => {
  return {
    type: "GET_COURSE_EXCELDATA_ERROR",
    error,
  };
};

// LOAD COURSE

export const loadCourse = (query = "") => {
  return function (dispatch, getState) {
    dispatch(loadCourseStart());
    axios
      .get("course?" + query)
      .then((response) => {
        const loadCourse = response.data.data;
        const pagination = response.data.pagination;
        dispatch(loadCourseSuccess(loadCourse));
        dispatch(loadPagination(pagination));
      })
      .catch((error) => {
        const resError = errorBuild(error);
        dispatch(loadCourseError(resError));
      });
  };
};

export const loadCourseStart = () => {
  return {
    type: "LOAD_COURSE_START",
  };
};

export const loadCourseSuccess = (loadCourse, pagination) => {
  return {
    type: "LOAD_COURSE_SUCCESS",
    loadCourse,
    pagination,
  };
};

export const loadCourseError = (error) => {
  return {
    type: "LOAD_COURSE_ERROR",
    error,
  };
};

export const loadPagination = (pagination) => {
  return {
    type: "LOAD_PAGINATION",
    pagination,
  };
};

export const deleteMultCourse = (ids) => {
  return function (dispatch, getState) {
    dispatch(deleteMultStart());
    axios
      .delete("course/delete", { params: { id: ids } })
      .then((response) => {
        const deleteCourse = response.data.data;
        dispatch(deleteCourseSuccess(deleteCourse));
      })
      .catch((error) => {
        const resError = errorBuild(error);
        dispatch(deleteCourseError(resError));
      });
  };
};

export const deleteMultStart = () => {
  return {
    type: "DELETE_MULT_COURSE_START",
  };
};

export const deleteCourseSuccess = (deleteData) => {
  return {
    type: "DELETE_MULT_COURSE_SUCCESS",
    deleteCourse: deleteData,
  };
};

export const deleteCourseError = (error) => {
  return {
    type: "DELETE_MULT_COURSE_ERROR",
    error,
  };
};

// GET COURSE

export const getInit = () => {
  return {
    type: "GET_COURSE_INIT",
  };
};

export const getCourse = (id) => {
  return function (dispatch, getState) {
    dispatch(getCourseStart());
    axios
      .get("course/" + id)
      .then((response) => {
        const course = response.data.data;
        dispatch(getCourseSuccess(course));
      })
      .catch((error) => {
        const resError = errorBuild(error);
        dispatch(getCourseError(resError));
      });
  };
};

export const getCourseStart = () => {
  return {
    type: "GET_COURSE_START",
  };
};

export const getCourseSuccess = (course) => {
  return {
    type: "GET_COURSE_SUCCESS",
    singleCourse: course,
  };
};

export const getCourseError = (error) => {
  return {
    type: "GET_COURSE_ERROR",
    error,
  };
};

//UPDATE COURSE

export const updateCourse = (id, data) => {
  return function (dispatch) {
    dispatch(updateCourseStart());
    axios
      .put(`course/${id}`, data)
      .then((response) => {
        const result = response.data;
        dispatch(updateCourseSuccess(result));
      })
      .catch((error) => {
        const resError = errorBuild(error);
        dispatch(updateCourseError(resError));
      });
  };
};

export const updateCourseStart = () => {
  return {
    type: "UPDATE_COURSE_START",
  };
};

export const updateCourseSuccess = (result) => {
  return {
    type: "UPDATE_COURSE_SUCCESS",
    updateCourse: result,
  };
};

export const updateCourseError = (error) => {
  return {
    type: "UPDATE_COURSE_ERROR",
    error,
  };
};

export const getCountCourse = () => {
  return function (dispatch) {
    dispatch(getCountCourseStart());

    axios
      .get(`course/count`)
      .then((response) => {
        const result = response.data.data;
        dispatch(getCountCourseSuccess(result));
      })
      .catch((error) => {
        const resError = errorBuild(error);
        dispatch(getCountCourseError(resError));
      });
  };
};

export const getCountCourseStart = () => {
  return {
    type: "GET_COUNT_COURSE_START",
  };
};

export const getCountCourseSuccess = (result) => {
  return {
    type: "GET_COUNT_COURSE_SUCCESS",
    orderCount: result,
  };
};

export const getCountCourseError = (error) => {
  return {
    type: "GET_COUNT_COURSE_ERROR",
    error,
  };
};
