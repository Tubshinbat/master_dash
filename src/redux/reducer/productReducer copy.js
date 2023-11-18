const initialState = {
  loading: false,
  error: null,
  success: null,
  products: [],
  paginationLast: {},
  excelData: [],
  product: {},
  //count
  countLoading: false,
  totalCount: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "CLEAR_PRODUCT":
      return {
        ...state,
        error: null,
        success: null,
        products: [],
        product: {},
        excelData: [],
        loading: false,
      };

    case "LOAD_PRODUCT_START":
      return {
        ...state,
        loading: true,
        error: null,
        suceess: null,
        products: [],
      };

    case "LOAD_PRODUCT_SUCCESS":
      return {
        ...state,
        loading: false,
        products: action.products,
      };

    case "LOAD_PRODUCT_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        products: [],
        error: action.error,
      };

    case "LOAD_PAGINATION":
      return {
        ...state,
        paginationLast: action.pagination,
      };

    // EXCEL
    case "GET_PRODUCT_EXCELDATA_START":
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
        excelData: [],
      };

    case "GET_PRODUCT_EXCELDATA_SUCCESS":
      return {
        ...state,
        loading: false,
        excelData: action.excel,
        error: null,
        success: null,
      };

    case "GET_PRODUCT_EXCELDATA_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        error: action.error,
        excelData: [],
      };

    // SAVE
    case "CREATE_PRODUCT_INIT":
      return {
        ...state,
        loading: false,
        error: null,
        success: null,
      };

    case "CREATE_PRODUCT_START":
      return {
        ...state,
        loading: true,
        error: null,
        success: null,
      };

    case "CREATE_PRODUCT_SUCCESS":
      return {
        ...state,
        loading: false,
        error: null,
        product: action.product,
        success: "Амжилттай нэмэгдлээ",
      };
    case "CREATE_PRODUCT_ERROR":
      return {
        ...state,
        loading: false,
        error: action.error,
        success: null,
      };

    case "DELETE_MULT_PRODUCT_START":
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case "DELETE_MULT_PRODUCT_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Амжилттай устгагдлаа",
        error: null,
      };
    case "DELETE_MULT_PRODUCT_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        error: action.error,
      };

    //GET
    case "GET_PRODUCT_INIT":
      return {
        ...state,
        loading: false,
        success: null,
        error: null,
        product: {},
      };

    case "GET_PRODUCT_START":
      return {
        ...state,
        loading: true,
        product: {},
        error: null,
      };

    case "GET_PRODUCT_SUCCESS":
      return {
        ...state,
        loading: false,
        product: action.product,
        error: null,
      };

    case "GET_PRODUCT_ERROR":
      return {
        ...state,
        loading: false,
        product: {},
        error: action.error,
      };
    //UPDATE
    case "UPDATE_PRODUCT_START":
      return {
        ...state,
        success: null,
        loading: true,
        error: null,
      };
    case "UPDATE_PRODUCT_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Мэдээллийг амжилттай шинэчлэгдлээ",
        error: null,
      };
    case "UPDATE_PRODUCT_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        error: action.error,
      };

    // GET COUNT
    case "GET_COUNT_PRODUCT_START":
      return {
        ...state,
        countLoading: true,
        totalCount: null,
        error: null,
      };
    case "GET_COUNT_PRODUCT_SUCCESS":
      return {
        ...state,
        coutLoading: false,
        totalCount: action.orderCount,
        error: null,
      };
    case "GET_COUNT_PRODUCT_ERROR":
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
