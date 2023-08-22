const initialState = {
  users: [],
  loading: false,
  excelLoading: false,
  error: false,
  user: {},
  success: null,
  reseting: false,
  reset: false,
  paginationLast: {},
  //count
  countLoading: false,
  totalCount: null,
  excelData: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "CLEAR_USER":
      return {
        ...state,
        loading: false,
        error: null,
        success: null,
      };

    // LOAD USERS

    case "LOAD_USERS_PAGINATION":
      return {
        ...state,
        paginationLast: action.pagination,
      };

    case "GET_USERS_START":
      return {
        ...state,
        loading: true,
        users: [],
        error: null,
      };
    case "GET_USERS_SUCCESS":
      return {
        ...state,
        loading: false,
        error: null,
        users: action.users,
      };
    case "GET_USERS_ERROR":
      return {
        ...state,
        loading: false,
        users: [],
        error: action.error,
      };

    // EXCEL DATA
    case "GET_USEREXCEL_DATA_START":
      return {
        ...state,
        excelLoading: true,
        success: null,
        error: null,
        excelData: [],
      };

    case "GET_USEREXCEL_DATA_SUCCESS":
      return {
        ...state,
        loading: false,
        excelData: action.excel,
      };

    case "GET_USEREXCEL_DATA_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        error: action.error,
        excelData: [],
      };

    // CREATE USER
    case "CREATE_USER_START":
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case "CREATE_USER_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Амжилттай нэмэгдлээ",
        error: null,
      };
    case "CREATE_USER_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        error: action.error,
      };

    // DELETE USER
    case "DELETE_MULT_USERS_START":
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case "DELETE_MULT_USERS_SUCCESS":
      return {
        ...state,
        loading: false,
        error: null,
        success: "Амжилттай датаг устгалаа",
      };
    case "DELETE_MULT_USERS_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        error: action.error,
      };

    // GET USER
    case "GET_USER_START":
      return {
        ...state,
        user: null,
        loading: true,
        error: null,
      };
    case "GET_USER_SUCCESS":
      return {
        ...state,
        user: action.user,
        loading: false,
        error: null,
      };
    case "GET_USER_ERROR":
      return {
        ...state,
        user: null,
        loading: false,
        error: action.error,
      };

    // UPDATE USER

    case "UPDATE_USER_START":
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };

    case "UPDATE_USER_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Амжилттай хэрэглэгчийн мэдээлэл шинжлэгдлээ",
        error: null,
      };
    case "UPDATE_USER_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        error: action.error,
      };

    // RESET PASSWORD

    case "RESET_PASSWORD_USER_START":
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case "RESET_PASSWORD_USER_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        error: action.error,
      };
    case "RESET_PASSWORD_USER_SUCCESS":
      return {
        ...state,
        loading: true,
        success: "Амжилттай нууц үг солигдлоо",
        error: null,
      };

    // COUNT USER
    case "GET_COUNT_USER_START":
      return {
        ...state,
        countLoading: true,
        totalCount: null,
        error: null,
      };
    case "GET_COUNT_USER_SUCCESS":
      return {
        ...state,
        coutLoading: false,
        totalCount: action.orderCount,
        error: null,
      };
    case "GET_COUNT_USER_ERROR":
      return {
        ...state,
        countLoading: false,
        totalCount: null,
        error: action.error,
      };
    default:
      return state;
  }
};

export default reducer;
