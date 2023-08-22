const initialState = {
  loading: false,
  error: null,
  success: null,
  pages: [],
  paginationLast: {},
  excelData: [],
  page: {},
  //count
  countLoading: false,
  totalCount: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "CLEAR_PAGE":
      return {
        ...state,
        error: null,
        success: null,
        pages: [],
        page: {},
        excelData: [],
        loading: false,
      };

    case "LOAD_PAGE_START":
      return {
        ...state,
        loading: true,
        error: null,
        suceess: null,
        pages: [],
      };

    case "LOAD_PAGE_SUCCESS":
      return {
        ...state,
        loading: false,
        pages: action.pages,
      };

    case "LOAD_PAGE_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        pages: [],
        error: action.error,
      };

    case "LOAD_PAGINATION":
      return {
        ...state,
        paginationLast: action.pagination,
      };

    // EXCEL
    case "GET_PAGE_EXCELDATA_START":
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
        excelData: [],
      };

    case "GET_PAGE_EXCELDATA_SUCCESS":
      return {
        ...state,
        loading: false,
        excelData: action.excel,
        error: null,
        success: null,
      };

    case "GET_PAGE_EXCELDATA_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        error: action.error,
        excelData: [],
      };

    // SAVE
    case "CREATE_PAGE_INIT":
      return {
        ...state,
        loading: false,
        error: null,
        success: null,
      };

    case "CREATE_PAGE_START":
      return {
        ...state,
        loading: true,
        error: null,
        success: null,
      };

    case "CREATE_PAGE_SUCCESS":
      return {
        ...state,
        loading: false,
        error: null,
        page: action.page,
        success: "Амжилттай нэмэгдлээ",
      };
    case "CREATE_PAGE_ERROR":
      return {
        ...state,
        loading: false,
        error: action.error,
        success: null,
      };

    case "DELETE_MULT_PAGE_START":
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case "DELETE_MULT_PAGE_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Амжилттай устгагдлаа",
        error: null,
      };
    case "DELETE_MULT_PAGE_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        error: action.error,
      };

    //GET
    case "GET_PAGE_INIT":
      return {
        ...state,
        loading: false,
        success: null,
        error: null,
        page: {},
      };

    case "GET_PAGE_START":
      return {
        ...state,
        loading: true,
        page: {},
        error: null,
      };

    case "GET_PAGE_SUCCESS":
      return {
        ...state,
        loading: false,
        page: action.page,
        error: null,
      };

    case "GET_PAGE_ERROR":
      return {
        ...state,
        loading: false,
        page: {},
        error: action.error,
      };
    //UPDATE
    case "UPDATE_PAGE_START":
      return {
        ...state,
        success: null,
        loading: true,
        error: null,
      };
    case "UPDATE_PAGE_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Мэдээллийг амжилттай шинэчлэгдлээ",
        error: null,
      };
    case "UPDATE_PAGE_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        error: action.error,
      };

    // GET COUNT
    case "GET_COUNT_PAGE_START":
      return {
        ...state,
        countLoading: true,
        totalCount: null,
        error: null,
      };
    case "GET_COUNT_PAGE_SUCCESS":
      return {
        ...state,
        coutLoading: false,
        totalCount: action.orderCount,
        error: null,
      };
    case "GET_COUNT_PAGE_ERROR":
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
