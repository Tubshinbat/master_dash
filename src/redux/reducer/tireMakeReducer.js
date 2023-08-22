const initialState = {
  loading: false,
  error: null,
  success: null,
  tiremakes: [],
  paginationLast: {},
  excelData: [],
  tiremake: {},
  //count
  countLoading: false,
  totalCount: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "CLEAR_TIREMAKE":
      return {
        ...state,
        error: null,
        success: null,
        tiremakes: [],
        tiremake: {},
        excelData: [],
        loading: false,
      };

    case "LOAD_TIREMAKE_START":
      return {
        ...state,
        loading: true,
        error: null,
        suceess: null,
        tiremakes: [],
      };

    case "LOAD_TIREMAKE_SUCCESS":
      return {
        ...state,
        loading: false,
        tiremakes: action.tiremakes,
      };

    case "LOAD_TIREMAKE_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        tiremakes: [],
        error: action.error,
      };

    case "LOAD_PAGINATION":
      return {
        ...state,
        paginationLast: action.pagination,
      };

    // EXCEL
    case "GET_TIREMAKE_EXCELDATA_START":
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
        excelData: [],
      };

    case "GET_TIREMAKE_EXCELDATA_SUCCESS":
      return {
        ...state,
        loading: false,
        excelData: action.excel,
        error: null,
        success: null,
      };

    case "GET_TIREMAKE_EXCELDATA_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        error: action.error,
        excelData: [],
      };

    // SAVE
    case "CREATE_TIREMAKE_INIT":
      return {
        ...state,
        loading: false,
        error: null,
        success: null,
      };

    case "CREATE_TIREMAKE_START":
      return {
        ...state,
        loading: true,
        error: null,
        success: null,
      };

    case "CREATE_TIREMAKE_SUCCESS":
      return {
        ...state,
        loading: false,
        error: null,
        tiremake: action.tiremake,
        success: "Амжилттай нэмэгдлээ",
      };
    case "CREATE_TIREMAKE_ERROR":
      return {
        ...state,
        loading: false,
        error: action.error,
        success: null,
      };

    case "DELETE_MULT_TIREMAKE_START":
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case "DELETE_MULT_TIREMAKE_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Амжилттай устгагдлаа",
        error: null,
      };
    case "DELETE_MULT_TIREMAKE_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        error: action.error,
      };

    //GET
    case "GET_TIREMAKE_INIT":
      return {
        ...state,
        loading: false,
        success: null,
        error: null,
        tiremake: {},
      };

    case "GET_TIREMAKE_START":
      return {
        ...state,
        loading: true,
        tiremake: {},
        error: null,
      };

    case "GET_TIREMAKE_SUCCESS":
      return {
        ...state,
        loading: false,
        tiremake: action.tiremake,
        error: null,
      };

    case "GET_TIREMAKE_ERROR":
      return {
        ...state,
        loading: false,
        tiremake: {},
        error: action.error,
      };
    //UPDATE
    case "UPDATE_TIREMAKE_START":
      return {
        ...state,
        success: null,
        loading: true,
        error: null,
      };
    case "UPDATE_TIREMAKE_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Мэдээллийг амжилттай шинэчлэгдлээ",
        error: null,
      };
    case "UPDATE_TIREMAKE_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        error: action.error,
      };

    // GET COUNT
    case "GET_COUNT_TIREMAKE_START":
      return {
        ...state,
        countLoading: true,
        totalCount: null,
        error: null,
      };
    case "GET_COUNT_TIREMAKE_SUCCESS":
      return {
        ...state,
        coutLoading: false,
        totalCount: action.orderCount,
        error: null,
      };
    case "GET_COUNT_TIREMAKE_ERROR":
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
