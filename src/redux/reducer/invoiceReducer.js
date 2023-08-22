const initialState = {
  loading: false,
  error: null,
  success: null,
  invoices: [],
  paginationLast: {},
  excelData: [],
  invoice: {},
  //count
  countLoading: false,
  totalCount: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "CLEAR_INVOICE":
      return {
        ...state,
        error: null,
        success: null,
        invoices: [],
        invoice: {},
        excelData: [],
        loading: false,
      };

    case "LOAD_INVOICE_START":
      return {
        ...state,
        loading: true,
        error: null,
        suceess: null,
        invoices: [],
      };

    case "LOAD_INVOICE_SUCCESS":
      return {
        ...state,
        loading: false,
        invoices: action.invoices,
      };

    case "LOAD_INVOICE_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        invoices: [],
        error: action.error,
      };

    case "LOAD_INVOICE_PAGINATION":
      return {
        ...state,
        paginationLast: action.pagination,
      };

    // EXCEL
    case "GET_INVOICE_EXCELDATA_START":
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
        excelData: [],
      };

    case "GET_INVOICE_EXCELDATA_SUCCESS":
      return {
        ...state,
        loading: false,
        excelData: action.excel,
        error: null,
        success: null,
      };

    case "GET_INVOICE_EXCELDATA_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        error: action.error,
        excelData: [],
      };

    // SAVE
    case "CREATE_INVOICE_INIT":
      return {
        ...state,
        loading: false,
        error: null,
        success: null,
      };

    case "CREATE_INVOICE_START":
      return {
        ...state,
        loading: true,
        error: null,
        success: null,
      };

    case "CREATE_INVOICE_SUCCESS":
      return {
        ...state,
        loading: false,
        error: null,
        invoice: action.invoice,
        success: "Амжилттай нэмэгдлээ",
      };
    case "CREATE_INVOICE_ERROR":
      return {
        ...state,
        loading: false,
        error: action.error,
        success: null,
      };

    case "DELETE_MULT_INVOICE_START":
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case "DELETE_MULT_INVOICE_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Амжилттай устгагдлаа",
        error: null,
      };
    case "DELETE_MULT_INVOICE_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        error: action.error,
      };

    //GET
    case "GET_INVOICE_INIT":
      return {
        ...state,
        loading: false,
        success: null,
        error: null,
        invoice: {},
      };

    case "GET_INVOICE_START":
      return {
        ...state,
        loading: true,
        invoice: {},
        error: null,
      };

    case "GET_INVOICE_SUCCESS":
      return {
        ...state,
        loading: false,
        invoice: action.invoice,
        error: null,
      };

    case "GET_INVOICE_ERROR":
      return {
        ...state,
        loading: false,
        invoice: {},
        error: action.error,
      };
    //UPDATE
    case "UPDATE_INVOICE_START":
      return {
        ...state,
        success: null,
        loading: true,
        error: null,
      };
    case "UPDATE_INVOICE_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Мэдээллийг амжилттай шинэчлэгдлээ",
        error: null,
      };
    case "UPDATE_INVOICE_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        error: action.error,
      };

    // GET COUNT
    case "GET_COUNT_INVOICE_START":
      return {
        ...state,
        countLoading: true,
        totalCount: null,
        error: null,
      };
    case "GET_COUNT_INVOICE_SUCCESS":
      return {
        ...state,
        coutLoading: false,
        totalCount: action.orderCount,
        error: null,
      };
    case "GET_COUNT_INVOICE_ERROR":
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
