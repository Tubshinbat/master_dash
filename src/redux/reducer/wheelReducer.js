const initialState = {
  loading: false,
  error: null,
  success: null,
  wheels: [],
  paginationLast: {},
  excelData: [],
  wheel: {},
  //count
  countLoading: false,
  totalCount: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "CLEAR_WHEEL":
      return {
        ...state,
        error: null,
        success: null,
        wheels: [],
        wheel: {},
        excelData: [],
        loading: false,
      };

    case "LOAD_WHEEL_START":
      return {
        ...state,
        loading: true,
        error: null,
        suceess: null,
        wheels: [],
      };

    case "LOAD_WHEEL_SUCCESS":
      return {
        ...state,
        loading: false,
        wheels: action.wheels,
      };

    case "LOAD_WHEEL_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        wheels: [],
        error: action.error,
      };

    case "LOAD_PAGINATION":
      return {
        ...state,
        paginationLast: action.pagination,
      };

    // EXCEL
    case "GET_WHEEL_EXCELDATA_START":
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
        excelData: [],
      };

    case "GET_WHEEL_EXCELDATA_SUCCESS":
      return {
        ...state,
        loading: false,
        excelData: action.excel,
        error: null,
        success: null,
      };

    case "GET_WHEEL_EXCELDATA_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        error: action.error,
        excelData: [],
      };

    // SAVE
    case "CREATE_WHEEL_INIT":
      return {
        ...state,
        loading: false,
        error: null,
        success: null,
      };

    case "CREATE_WHEEL_START":
      return {
        ...state,
        loading: true,
        error: null,
        success: null,
      };

    case "CREATE_WHEEL_SUCCESS":
      return {
        ...state,
        loading: false,
        error: null,
        wheel: action.wheel,
        success: "Амжилттай нэмэгдлээ",
      };
    case "CREATE_WHEEL_ERROR":
      return {
        ...state,
        loading: false,
        error: action.error,
        success: null,
      };

    case "DELETE_MULT_WHEEL_START":
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case "DELETE_MULT_WHEEL_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Амжилттай устгагдлаа",
        error: null,
      };
    case "DELETE_MULT_WHEEL_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        error: action.error,
      };

    //GET
    case "GET_WHEEL_INIT":
      return {
        ...state,
        loading: false,
        success: null,
        error: null,
        wheel: {},
      };

    case "GET_WHEEL_START":
      return {
        ...state,
        loading: true,
        wheel: {},
        error: null,
      };

    case "GET_WHEEL_SUCCESS":
      return {
        ...state,
        loading: false,
        wheel: action.wheel,
        error: null,
      };

    case "GET_WHEEL_ERROR":
      return {
        ...state,
        loading: false,
        wheel: {},
        error: action.error,
      };
    //UPDATE
    case "UPDATE_WHEEL_START":
      return {
        ...state,
        success: null,
        loading: true,
        error: null,
      };
    case "UPDATE_WHEEL_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Мэдээллийг амжилттай шинэчлэгдлээ",
        error: null,
      };
    case "UPDATE_WHEEL_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        error: action.error,
      };

    // GET COUNT
    case "GET_COUNT_WHEEL_START":
      return {
        ...state,
        countLoading: true,
        totalCount: null,
        error: null,
      };
    case "GET_COUNT_WHEEL_SUCCESS":
      return {
        ...state,
        coutLoading: false,
        totalCount: action.orderCount,
        error: null,
      };
    case "GET_COUNT_WHEEL_ERROR":
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
