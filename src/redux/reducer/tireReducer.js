const initialState = {
  loading: false,
  error: null,
  success: null,
  tires: [],
  paginationLast: {},
  excelData: [],
  tire: {},
  //count
  countLoading: false,
  totalCount: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "CLEAR_TIRE":
      return {
        ...state,
        error: null,
        success: null,
        tires: [],
        tire: {},
        excelData: [],
        loading: false,
      };

    case "LOAD_TIRE_START":
      return {
        ...state,
        loading: true,
        error: null,
        suceess: null,
        tires: [],
      };

    case "LOAD_TIRE_SUCCESS":
      return {
        ...state,
        loading: false,
        tires: action.tires,
      };

    case "LOAD_TIRE_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        tires: [],
        error: action.error,
      };

    case "LOAD_PAGINATION":
      return {
        ...state,
        paginationLast: action.pagination,
      };

    // EXCEL
    case "GET_TIRE_EXCELDATA_START":
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
        excelData: [],
      };

    case "GET_TIRE_EXCELDATA_SUCCESS":
      return {
        ...state,
        loading: false,
        excelData: action.excel,
        error: null,
        success: null,
      };

    case "GET_TIRE_EXCELDATA_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        error: action.error,
        excelData: [],
      };

    // SAVE
    case "CREATE_TIRE_INIT":
      return {
        ...state,
        loading: false,
        error: null,
        success: null,
      };

    case "CREATE_TIRE_START":
      return {
        ...state,
        loading: true,
        error: null,
        success: null,
      };

    case "CREATE_TIRE_SUCCESS":
      return {
        ...state,
        loading: false,
        error: null,
        tire: action.tire,
        success: "Амжилттай нэмэгдлээ",
      };
    case "CREATE_TIRE_ERROR":
      return {
        ...state,
        loading: false,
        error: action.error,
        success: null,
      };

    case "DELETE_MULT_TIRE_START":
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case "DELETE_MULT_TIRE_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Амжилттай устгагдлаа",
        error: null,
      };
    case "DELETE_MULT_TIRE_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        error: action.error,
      };

    //GET
    case "GET_TIRE_INIT":
      return {
        ...state,
        loading: false,
        success: null,
        error: null,
        tire: {},
      };

    case "GET_TIRE_START":
      return {
        ...state,
        loading: true,
        tire: {},
        error: null,
      };

    case "GET_TIRE_SUCCESS":
      return {
        ...state,
        loading: false,
        tire: action.tire,
        error: null,
      };

    case "GET_TIRE_ERROR":
      return {
        ...state,
        loading: false,
        tire: {},
        error: action.error,
      };
    //UPDATE
    case "UPDATE_TIRE_START":
      return {
        ...state,
        success: null,
        loading: true,
        error: null,
      };
    case "UPDATE_TIRE_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Мэдээллийг амжилттай шинэчлэгдлээ",
        error: null,
      };
    case "UPDATE_TIRE_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        error: action.error,
      };

    // GET COUNT
    case "GET_COUNT_TIRE_START":
      return {
        ...state,
        countLoading: true,
        totalCount: null,
        error: null,
      };
    case "GET_COUNT_TIRE_SUCCESS":
      return {
        ...state,
        coutLoading: false,
        totalCount: action.orderCount,
        error: null,
      };
    case "GET_COUNT_TIRE_ERROR":
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
