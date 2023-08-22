const initialState = {
  loading: false,
  error: null,
  success: null,
  partners: [],
  paginationLast: {},
  excelData: [],
  partner: {},
  //count
  countLoading: false,
  totalCount: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "CLEAR_PARTNER":
      return {
        ...state,
        error: null,
        success: null,
        partners: [],
        partner: {},
        excelData: [],
        loading: false,
      };

    case "LOAD_PARTNERS_START":
      return {
        ...state,
        loading: true,
        error: null,
        suceess: null,
        partners: [],
      };

    case "LOAD_PARTNERS_SUCCESS":
      return {
        ...state,
        loading: false,
        partners: action.partners,
      };

    case "LOAD_PARTNERS_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        partners: [],
        error: action.error,
      };

    case "LOAD_PARTNER_PAGINATION":
      return {
        ...state,
        paginationLast: action.pagination,
      };

    // EXCEL
    case "GET_PARTNER_EXCELDATA_START":
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
        excelData: [],
      };

    case "GET_PARTNER_EXCELDATA_SUCCESS":
      return {
        ...state,
        loading: false,
        excelData: action.excel,
        error: null,
        success: null,
      };

    case "GET_PARTNER_EXCELDATA_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        error: action.error,
        excelData: [],
      };

    // SAVE
    case "CREATE_PARTNER_INIT":
      return {
        ...state,
        loading: false,
        error: null,
        success: null,
      };

    case "CREATE_PARTNER_START":
      return {
        ...state,
        loading: true,
        error: null,
        success: null,
      };

    case "CREATE_PARTNER_SUCCESS":
      return {
        ...state,
        loading: false,
        error: null,
        partner: action.partner,
        success: "Амжилттай нэмэгдлээ",
      };
    case "CREATE_PARTNER_ERROR":
      return {
        ...state,
        loading: false,
        error: action.error,
        success: null,
      };

    case "DELETE_MULT_PARTNER_START":
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case "DELETE_MULT_PARTNER_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Амжилттай устгагдлаа",
        error: null,
      };
    case "DELETE_MULT_PARTNER_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        error: action.error,
      };

    //GET
    case "GET_PARTNER_INIT":
      return {
        ...state,
        loading: false,
        success: null,
        error: null,
        partner: {},
      };

    case "GET_PARTNER_START":
      return {
        ...state,
        loading: true,
        partner: {},
        error: null,
      };

    case "GET_PARTNER_SUCCESS":
      return {
        ...state,
        loading: false,
        partner: action.partner,
        error: null,
      };

    case "GET_PARTNER_ERROR":
      return {
        ...state,
        loading: false,
        partner: {},
        error: action.error,
      };
    //UPDATE
    case "UPDATE_PARTNER_START":
      return {
        ...state,
        success: null,
        loading: true,
        error: null,
      };
    case "UPDATE_PARTNER_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Мэдээллийг амжилттай шинэчлэгдлээ",
        error: null,
      };
    case "UPDATE_PARTNER_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        error: action.error,
      };

    // GET COUNT
    case "GET_COUNT_PARTNER_START":
      return {
        ...state,
        countLoading: true,
        totalCount: null,
        error: null,
      };
    case "GET_COUNT_PARTNER_SUCCESS":
      return {
        ...state,
        coutLoading: false,
        totalCount: action.orderCount,
        error: null,
      };
    case "GET_COUNT_PARTNER_ERROR":
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
