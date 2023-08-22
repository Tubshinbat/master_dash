import axios from "../../axios-base";

export const clear = () => {
  return function (dispatch, getState) {
    dispatch(clearStart);
    dispatch(loadNewsCategories);
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
    type: "CLEAR_NEWSCATEGORIES",
  };
};

export const loadNewsCategories = () => {
  return function (dispatch, getState) {
    dispatch(loadNewsCategoriesStart());
    axios
      .get("news-categories")
      .then((response) => {
        const result = response.data.data;
        dispatch(loadNewsCategoriesSuccess(result));
      })
      .catch((error) => {
        const resultError = errorMessage(error);
        dispatch(loadNewsCategoriesError(resultError));
      });
  };
};
export const loadNewsCategoriesStart = () => {
  return {
    type: "LOAD_NEWS_CATEGORIES_START",
  };
};

export const loadNewsCategoriesSuccess = (result) => {
  return {
    type: "LOAD_NEWS_CATEGORIES_SUCCESS",
    categories: result,
  };
};

export const loadNewsCategoriesError = (error) => {
  return {
    type: "LOAD_NEWS_CATEGORIES_ERROR",
    error,
  };
};

// SINGLE CATEGORY

export const loadNewsCategory = (newsCategoryId) => {
  return function (dispatch, getState) {
    dispatch(loadNewsCategoryStart());
    axios
      .get(`news-categories/${newsCategoryId}`)
      .then((response) => {
        const loadedNewsCategory = response.data.data;
        dispatch(loadNewsCategorySuccess(loadedNewsCategory));
      })
      .catch((error) => {
        const resultError = errorMessage(error);
        dispatch(loadNewsCategoryError(resultError));
      });
  };
};

export const loadNewsCategoryStart = () => {
  return {
    type: "LOAD_NEWS_CATEGORY_START",
  };
};

export const loadNewsCategorySuccess = (result) => {
  return {
    type: "LOAD_NEWS_CATEGORY_SUCCESS",
    category: result,
  };
};

export const loadNewsCategoryError = (error) => {
  return {
    type: "LOAD_NEWS_CATEGORY_ERROR",
    error,
  };
};

// Change positions
export const changePosition = (data) => {
  return function (dispatch) {
    dispatch(changePositionStart());

    axios
      .post("news-categories/change", data)
      .then((response) => {
        const result = response.data.data;
        dispatch(changePositionSuccess(result));
        dispatch(loadNewsCategories());
      })
      .catch((error) => {
        const resultError = errorMessage(error);
        dispatch(changePositionError(resultError));
      });
  };
};

export const changePositionStart = (result) => {
  return {
    type: "NEWSCATEGORIES_CHANGE_POSITION_START",
  };
};

export const changePositionSuccess = (data) => {
  return {
    type: "NEWSCATEGORIES_CHANGE_POSITION_SUCCESS",
    menus: data,
  };
};

export const changePositionError = (error) => {
  return {
    type: "NEWSCATEGORIES_CHANGE_POSITION_ERROR",
    error: error,
  };
};

// DELETE CATEGORY

export const deleteNewsCategory = (categoryId, data) => {
  return function (dispatch, getState) {
    dispatch(deleteNewsCategoryStart());

    axios
      .delete(`news-categories/${categoryId}`, data)
      .then((response) => {
        const resultCategory = response.data.data;
        dispatch(deleteNewsCategorySuccess(resultCategory));
        dispatch(loadNewsCategories());
      })
      .catch((error) => {
        const resultError = errorMessage(error);
        dispatch(deleteNewsCategoryError(resultError));
      });
  };
};

export const deleteNewsCategoryStart = () => {
  return {
    type: "DELETE_NEWS_CATEGORY_START",
  };
};

export const deleteNewsCategorySuccess = (result) => {
  return {
    type: "DELETE_NEWS_CATEGORY_SUCCESS",
    dlNews: result,
  };
};

export const deleteNewsCategoryError = (error) => {
  return {
    type: "DELETE_NEWS_CATEGORY_ERROR",
    error,
  };
};

// SAVE CATEGORY

export const saveNewsCategory = (category) => {
  return function (dispatch, getState) {
    dispatch(saveNewsCategoryStart());
    let data = {
      name: category.name,
      status: category.status,
    };

    if (category.parentId !== null) {
      data = {
        name: category.name,
        parentId: category.parentId,
      };
    }

    data.language = category.language;
    data.status = category.status;

    axios
      .post(`news-categories`, data)
      .then((response) => {
        const resultCategory = response.data.data;
        dispatch(saveNewsCategorySuccess(resultCategory));
        dispatch(loadNewsCategories());
      })
      .catch((error) => {
        const resultError = errorMessage(error);
        dispatch(saveNewsCategoryError(resultError));
      });
  };
};

export const saveNewsCategoryStart = () => {
  return {
    type: "CREATE_NEWS_CATEGORY_START",
  };
};

export const saveNewsCategorySuccess = (resultCategory) => {
  return {
    type: "CREATE_NEWS_CATEGORY_SUCCESS",
    resultCategory: resultCategory,
  };
};

export const saveNewsCategoryError = (error) => {
  return {
    type: "CREATE_NEWS_CATEGORY_ERROR",
    error: error,
  };
};

// UPDATE CATEGORY

export const updateNewsCategory = (category, id) => {
  return function (dispatch) {
    dispatch(updateNewsCategoryStart());
    const data = {
      name: category.name,
    };

    axios
      .put(`news-categories/${id}`, data)
      .then((response) => {
        const resultCategory = response.data.data;
        dispatch(updateNewsCategorySuccess(resultCategory));
        dispatch(loadNewsCategories());
        dispatch(loadNewsCategory(id));
      })
      .catch((error) => {
        const resultError = errorMessage(error);
        dispatch(updateNewsCategoryError(resultError));
      });
  };
};

export const updateNewsCategoryStart = () => {
  return {
    type: "UPDATE_NEWS_CATEGORY_START",
  };
};

export const updateNewsCategorySuccess = (resultCategory) => {
  return {
    type: "UPDATE_NEWS_CATEGORY_SUCCESS",
    resultCategory: resultCategory,
  };
};

export const updateNewsCategoryError = (error) => {
  return {
    type: "UPDATE_NEWS_CATEGORY_ERROR",
    error: error,
  };
};
