const initialState = {
  loading: false,
  error: null,
  success: null,
  banners: [],
  paginationLast: {},
  excelData: [],
  banner: {},
  //count
  countLoading: false,
  totalCount: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "CLEAR_BANNER":
      return {
        ...state,
        error: null,
        success: null,
        banners: [],
        banner: {},
        excelData: [],
        loading: false,
      };

    case "LOAD_BANNER_START":
      return {
        ...state,
        loading: true,
        error: null,
        suceess: null,
        banners: [],
      };

    case "LOAD_BANNER_SUCCESS":
      return {
        ...state,
        loading: false,
        banners: action.banners,
      };

    case "LOAD_BANNER_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        banners: [],
        error: action.error,
      };

    case "LOAD_PAGINATION":
      return {
        ...state,
        paginationLast: action.pagination,
      };

    // EXCEL
    case "GET_BANNER_EXCELDATA_START":
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
        excelData: [],
      };

    case "GET_BANNER_EXCELDATA_SUCCESS":
      return {
        ...state,
        loading: false,
        excelData: action.excel,
        error: null,
        success: null,
      };

    case "GET_BANNER_EXCELDATA_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        error: action.error,
        excelData: [],
      };

    // SAVE
    case "CREATE_BANNER_INIT":
      return {
        ...state,
        loading: false,
        error: null,
        success: null,
      };

    case "CREATE_BANNER_START":
      return {
        ...state,
        loading: true,
        error: null,
        success: null,
      };

    case "CREATE_BANNER_SUCCESS":
      return {
        ...state,
        loading: false,
        error: null,
        banner: action.banner,
        success: "Амжилттай нэмэгдлээ",
      };
    case "CREATE_BANNER_ERROR":
      return {
        ...state,
        loading: false,
        error: action.error,
        success: null,
      };

    case "DELETE_MULT_BANNER_START":
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case "DELETE_MULT_BANNER_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Амжилттай устгагдлаа",
        error: null,
      };
    case "DELETE_MULT_BANNER_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        error: action.error,
      };

    //GET
    case "GET_BANNER_INIT":
      return {
        ...state,
        loading: false,
        success: null,
        error: null,
        banner: {},
      };

    case "GET_BANNER_START":
      return {
        ...state,
        loading: true,
        banner: {},
        error: null,
      };

    case "GET_BANNER_SUCCESS":
      return {
        ...state,
        loading: false,
        banner: action.banner,
        error: null,
      };

    case "GET_BANNER_ERROR":
      return {
        ...state,
        loading: false,
        banner: {},
        error: action.error,
      };
    //UPDATE
    case "UPDATE_BANNER_START":
      return {
        ...state,
        success: null,
        loading: true,
        error: null,
      };
    case "UPDATE_BANNER_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Мэдээллийг амжилттай шинэчлэгдлээ",
        error: null,
      };
    case "UPDATE_BANNER_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        error: action.error,
      };

    // GET COUNT
    case "GET_COUNT_BANNER_START":
      return {
        ...state,
        countLoading: true,
        totalCount: null,
        error: null,
      };
    case "GET_COUNT_BANNER_SUCCESS":
      return {
        ...state,
        coutLoading: false,
        totalCount: action.orderCount,
        error: null,
      };
    case "GET_COUNT_BANNER_ERROR":
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
