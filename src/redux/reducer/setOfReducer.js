const initialState = {
  loading: false,
  error: null,
  success: null,
  setProducts: [],
  paginationLast: {},
  excelData: [],
  setProduct: {},
  //count
  countLoading: false,
  totalCount: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "CLEAR_SETOF":
      return {
        ...state,
        error: null,
        success: null,
        setProducts: [],
        setProduct: {},
        excelData: [],
        loading: false,
      };

    case "LOAD_SETOF_START":
      return {
        ...state,
        loading: true,
        error: null,
        suceess: null,
        setProducts: [],
      };

    case "LOAD_SETOF_SUCCESS":
      return {
        ...state,
        loading: false,
        setProducts: action.setproducts,
      };

    case "LOAD_SETOF_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        setProducts: [],
        error: action.error,
      };

    case "LOAD_PAGINATION":
      return {
        ...state,
        paginationLast: action.pagination,
      };

    // EXCEL
    case "GET_SETOF_EXCELDATA_START":
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
        excelData: [],
      };

    case "GET_SETOF_EXCELDATA_SUCCESS":
      return {
        ...state,
        loading: false,
        excelData: action.excel,
        error: null,
        success: null,
      };

    case "GET_SETOF_EXCELDATA_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        error: action.error,
        excelData: [],
      };

    // SAVE
    case "CREATE_SETOF_INIT":
      return {
        ...state,
        loading: false,
        error: null,
        success: null,
      };

    case "CREATE_SETOF_START":
      return {
        ...state,
        loading: true,
        error: null,
        success: null,
      };

    case "CREATE_SETOF_SUCCESS":
      return {
        ...state,
        loading: false,
        error: null,
        setProduct: action.setProduct,
        success: "Амжилттай нэмэгдлээ",
      };
    case "CREATE_SETOF_ERROR":
      return {
        ...state,
        loading: false,
        error: action.error,
        success: null,
      };

    case "DELETE_MULT_SETOF_START":
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case "DELETE_MULT_SETOF_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Амжилттай устгагдлаа",
        error: null,
      };
    case "DELETE_MULT_SETOF_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        error: action.error,
      };

    //GET
    case "GET_SETOF_INIT":
      return {
        ...state,
        loading: false,
        success: null,
        error: null,
        setProduct: {},
      };

    case "GET_SETOF_START":
      return {
        ...state,
        loading: true,
        setProduct: {},
        error: null,
      };

    case "GET_SETOF_SUCCESS":
      return {
        ...state,
        loading: false,
        setProduct: action.setproduct,
        error: null,
      };

    case "GET_SETOF_ERROR":
      return {
        ...state,
        loading: false,
        setProduct: {},
        error: action.error,
      };
    //UPDATE
    case "UPDATE_SETOF_START":
      return {
        ...state,
        success: null,
        loading: true,
        error: null,
      };
    case "UPDATE_SETOF_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Мэдээллийг амжилттай шинэчлэгдлээ",
        error: null,
      };
    case "UPDATE_SETOF_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        error: action.error,
      };

    // GET COUNT
    case "GET_COUNT_SETOF_START":
      return {
        ...state,
        countLoading: true,
        totalCount: null,
        error: null,
      };
    case "GET_COUNT_SETOF_SUCCESS":
      return {
        ...state,
        coutLoading: false,
        totalCount: action.orderCount,
        error: null,
      };
    case "GET_COUNT_SETOF_ERROR":
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
