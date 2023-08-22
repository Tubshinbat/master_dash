const initialState = {
  webInfo: null,
  loading: false,
  error: null,
  success: null,
};

const reducer = (state = initialState, action) => {
  let spritInit = {
    ...state,
  };
  switch (action.type) {
    case "CREATE_WEBINFO_START":
      return {
        ...state,
        loading: true,
        error: null,
        success: null,
      };
    case "CREATE_WEBINFO_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Амжилттай вэбийн мэдээллийг хадгалагдлаа",
        webInfo: action.createData,
        error: null,
      };
    case "CREATE_WEBINFO_ERROR":
      return {
        ...state,
        loading: false,
        error: action.error,
        success: null,
      };

    case "LOAD_WEBINFO_START":
      return {
        ...state,
        loading: true,
        error: null,
        webInfo: null,
        success: null,
      };

    case "LOAD_WEBINFO_SUCCESS":
      return {
        ...state,
        loading: false,
        error: null,
        webInfo: action.loadData,
      };

    case "LOAD_WEBINFO_ERROR":
      return {
        ...state,
        loading: false,
        error: action.error,
        webInfo: null,
      };
    case "UPDATE_WEBINFO_START":
      return {
        ...state,
        loading: true,
        error: null,
        success: null,
      };
    case "UPDATE_WEBINFO_SUCCESS":
      return {
        ...state,
        loading: false,
        webInfo: action.webInfo,
        error: null,
        success: "Мэдээллийг амжилттай шинэчлэгдлээ",
      };
    case "UPDATE_WEBINFO_ERROR":
      return {
        ...spritInit,
        loading: false,
        error: action.error,
        success: null,
      };
    default:
      return state;
  }
};

export default reducer;
