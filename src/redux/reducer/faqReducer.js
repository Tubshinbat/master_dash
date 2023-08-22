const initialState = {
  loading: false,
  error: null,
  success: null,
  faqs: [],
  paginationLast: {},
  excelData: [],
  faq: {},
  //count
  countLoading: false,
  totalCount: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "CLEAR_FAQ":
      return {
        ...state,
        error: null,
        success: null,
        faqs: [],
        faq: {},
        excelData: [],
        loading: false,
      };

    case "LOAD_FAQS_START":
      return {
        ...state,
        loading: true,
        error: null,
        suceess: null,
        faqs: [],
      };

    case "LOAD_FAQS_SUCCESS":
      return {
        ...state,
        loading: false,
        faqs: action.faqs,
      };

    case "LOAD_FAQS_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        faqs: [],
        error: action.error,
      };

    case "LOAD_FAQ_PAGINATION":
      return {
        ...state,
        paginationLast: action.pagination,
      };

    // EXCEL
    case "GET_FAQ_EXCELDATA_START":
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
        excelData: [],
      };

    case "GET_FAQ_EXCELDATA_SUCCESS":
      return {
        ...state,
        loading: false,
        excelData: action.excel,
        error: null,
        success: null,
      };

    case "GET_FAQ_EXCELDATA_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        error: action.error,
        excelData: [],
      };

    // SAVE
    case "CREATE_FAQ_INIT":
      return {
        ...state,
        loading: false,
        error: null,
        success: null,
      };

    case "CREATE_FAQ_START":
      return {
        ...state,
        loading: true,
        error: null,
        success: null,
      };

    case "CREATE_FAQ_SUCCESS":
      return {
        ...state,
        loading: false,
        error: null,
        faq: action.faq,
        success: "Амжилттай нэмэгдлээ",
      };
    case "CREATE_FAQ_ERROR":
      return {
        ...state,
        loading: false,
        error: action.error,
        success: null,
      };

    case "DELETE_MULT_FAQ_START":
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case "DELETE_MULT_FAQ_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Амжилттай устгагдлаа",
        error: null,
      };
    case "DELETE_MULT_FAQ_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        error: action.error,
      };

    //GET
    case "GET_FAQ_INIT":
      return {
        ...state,
        loading: false,
        success: null,
        error: null,
        faq: {},
      };

    case "GET_FAQ_START":
      return {
        ...state,
        loading: true,
        faq: {},
        error: null,
      };

    case "GET_FAQ_SUCCESS":
      return {
        ...state,
        loading: false,
        faq: action.faq,
        error: null,
      };

    case "GET_FAQ_ERROR":
      return {
        ...state,
        loading: false,
        faq: {},
        error: action.error,
      };
    //UPDATE
    case "UPDATE_FAQ_START":
      return {
        ...state,
        success: null,
        loading: true,
        error: null,
      };
    case "UPDATE_FAQ_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Мэдээллийг амжилттай шинэчлэгдлээ",
        error: null,
      };
    case "UPDATE_FAQ_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        error: action.error,
      };

    // GET COUNT
    case "GET_COUNT_FAQ_START":
      return {
        ...state,
        countLoading: true,
        totalCount: null,
        error: null,
      };
    case "GET_COUNT_FAQ_SUCCESS":
      return {
        ...state,
        coutLoading: false,
        totalCount: action.orderCount,
        error: null,
      };
    case "GET_COUNT_FAQ_ERROR":
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
