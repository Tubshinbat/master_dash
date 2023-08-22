const initialState = {
  loading: false,
  error: null,
  success: null,
  paytypes: [],
  paginationLast: {},
  excelData: [],
  paytype: {},
  //count
  countLoading: false,
  totalCount: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "CLEAR_PAYTYPE":
      return {
        ...state,
        error: null,
        success: null,
        paytypes: [],
        paytype: {},
        excelData: [],
        loading: false,
      };

    case "LOAD_PAYTYPES_START":
      return {
        ...state,
        loading: true,
        error: null,
        suceess: null,
        paytypes: [],
      };

    case "LOAD_PAYTYPES_SUCCESS":
      return {
        ...state,
        loading: false,
        paytypes: action.paytypes,
      };

    case "LOAD_PAYTYPES_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        paytypes: [],
        error: action.error,
      };

    case "LOAD_PAYTYPE_PAGINATION":
      return {
        ...state,
        paginationLast: action.pagination,
      };

    // EXCEL
    case "GET_PAYTYPE_EXCELDATA_START":
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
        excelData: [],
      };

    case "GET_PAYTYPE_EXCELDATA_SUCCESS":
      return {
        ...state,
        loading: false,
        excelData: action.excel,
        error: null,
        success: null,
      };

    case "GET_PAYTYPE_EXCELDATA_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        error: action.error,
        excelData: [],
      };

    // SAVE
    case "CREATE_PAYTYPE_INIT":
      return {
        ...state,
        loading: false,
        error: null,
        success: null,
      };

    case "CREATE_PAYTYPE_START":
      return {
        ...state,
        loading: true,
        error: null,
        success: null,
      };

    case "CREATE_PAYTYPE_SUCCESS":
      return {
        ...state,
        loading: false,
        error: null,
        paytype: action.paytype,
        success: "Амжилттай нэмэгдлээ",
      };
    case "CREATE_PAYTYPE_ERROR":
      return {
        ...state,
        loading: false,
        error: action.error,
        success: null,
      };

    case "DELETE_MULT_PAYTYPE_START":
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case "DELETE_MULT_PAYTYPE_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Амжилттай устгагдлаа",
        error: null,
      };
    case "DELETE_MULT_PAYTYPE_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        error: action.error,
      };

    //GET
    case "GET_PAYTYPE_INIT":
      return {
        ...state,
        loading: false,
        success: null,
        error: null,
        paytype: {},
      };

    case "GET_PAYTYPE_START":
      return {
        ...state,
        loading: true,
        paytype: {},
        error: null,
      };

    case "GET_PAYTYPE_SUCCESS":
      return {
        ...state,
        loading: false,
        paytype: action.paytype,
        error: null,
      };

    case "GET_PAYTYPE_ERROR":
      return {
        ...state,
        loading: false,
        paytype: {},
        error: action.error,
      };
    //UPDATE
    case "UPDATE_PAYTYPE_START":
      return {
        ...state,
        success: null,
        loading: true,
        error: null,
      };
    case "UPDATE_PAYTYPE_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Мэдээллийг амжилттай шинэчлэгдлээ",
        error: null,
      };
    case "UPDATE_PAYTYPE_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        error: action.error,
      };

    // GET COUNT
    case "GET_COUNT_PAYTYPE_START":
      return {
        ...state,
        countLoading: true,
        totalCount: null,
        error: null,
      };
    case "GET_COUNT_PAYTYPE_SUCCESS":
      return {
        ...state,
        coutLoading: false,
        totalCount: action.orderCount,
        error: null,
      };
    case "GET_COUNT_PAYTYPE_ERROR":
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
