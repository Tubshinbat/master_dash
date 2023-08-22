const initialState = {
  loading: false,
  error: null,
  success: null,
  tiremodals: [],
  paginationLast: {},
  excelData: [],
  tiremodal: {},
  //count
  countLoading: false,
  totalCount: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "CLEAR_TIREMODAL":
      return {
        ...state,
        error: null,
        success: null,
        tiremodals: [],
        tiremodal: {},
        excelData: [],
        loading: false,
      };

    case "LOAD_TIREMODAL_START":
      return {
        ...state,
        loading: true,
        error: null,
        suceess: null,
        tiremodals: [],
      };

    case "LOAD_TIREMODAL_SUCCESS":
      return {
        ...state,
        loading: false,
        tiremodals: action.tiremodals,
      };

    case "LOAD_TIREMODAL_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        tiremodals: [],
        error: action.error,
      };

    case "LOAD_PAGINATION":
      return {
        ...state,
        paginationLast: action.pagination,
      };

    // EXCEL
    case "GET_TIREMODAL_EXCELDATA_START":
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
        excelData: [],
      };

    case "GET_TIREMODAL_EXCELDATA_SUCCESS":
      return {
        ...state,
        loading: false,
        excelData: action.excel,
        error: null,
        success: null,
      };

    case "GET_TIREMODAL_EXCELDATA_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        error: action.error,
        excelData: [],
      };

    // SAVE
    case "CREATE_TIREMODAL_INIT":
      return {
        ...state,
        loading: false,
        error: null,
        success: null,
      };

    case "CREATE_TIREMODAL_START":
      return {
        ...state,
        loading: true,
        error: null,
        success: null,
      };

    case "CREATE_TIREMODAL_SUCCESS":
      return {
        ...state,
        loading: false,
        error: null,
        tiremodal: action.tiremodal,
        success: "Амжилттай нэмэгдлээ",
      };
    case "CREATE_TIREMODAL_ERROR":
      return {
        ...state,
        loading: false,
        error: action.error,
        success: null,
      };

    case "DELETE_MULT_TIREMODAL_START":
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case "DELETE_MULT_TIREMODAL_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Амжилттай устгагдлаа",
        error: null,
      };
    case "DELETE_MULT_TIREMODAL_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        error: action.error,
      };

    //GET
    case "GET_TIREMODAL_INIT":
      return {
        ...state,
        loading: false,
        success: null,
        error: null,
        tiremodal: {},
      };

    case "GET_TIREMODAL_START":
      return {
        ...state,
        loading: true,
        tiremodal: {},
        error: null,
      };

    case "GET_TIREMODAL_SUCCESS":
      return {
        ...state,
        loading: false,
        tiremodal: action.tiremodal,
        error: null,
      };

    case "GET_TIREMODAL_ERROR":
      return {
        ...state,
        loading: false,
        tiremodal: {},
        error: action.error,
      };
    //UPDATE
    case "UPDATE_TIREMODAL_START":
      return {
        ...state,
        success: null,
        loading: true,
        error: null,
      };
    case "UPDATE_TIREMODAL_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Мэдээллийг амжилттай шинэчлэгдлээ",
        error: null,
      };
    case "UPDATE_TIREMODAL_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        error: action.error,
      };

    // GET COUNT
    case "GET_COUNT_TIREMODAL_START":
      return {
        ...state,
        countLoading: true,
        totalCount: null,
        error: null,
      };
    case "GET_COUNT_TIREMODAL_SUCCESS":
      return {
        ...state,
        coutLoading: false,
        totalCount: action.orderCount,
        error: null,
      };
    case "GET_COUNT_TIREMODAL_ERROR":
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
