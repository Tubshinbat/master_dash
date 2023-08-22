const initialState = {
  loading: false,
  error: null,
  success: null,
  contacts: [],
  paginationLast: {},
  excelData: [],
  contact: {},
  //count
  countLoading: false,
  totalCount: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "CLEAR_CONTACT":
      return {
        ...state,
        error: null,
        success: null,
        contacts: [],
        contact: {},
        excelData: [],
        loading: false,
      };

    case "LOAD_CONTACT_START":
      return {
        ...state,
        loading: true,
        error: null,
        suceess: null,
        contacts: [],
      };

    case "LOAD_CONTACT_SUCCESS":
      return {
        ...state,
        loading: false,
        contacts: action.contacts,
      };

    case "LOAD_CONTACT_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        contacts: [],
        error: action.error,
      };

    case "LOAD_PAGINATION":
      return {
        ...state,
        paginationLast: action.pagination,
      };

    // EXCEL
    case "GET_CONTACT_EXCELDATA_START":
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
        excelData: [],
      };

    case "GET_CONTACT_EXCELDATA_SUCCESS":
      return {
        ...state,
        loading: false,
        excelData: action.excel,
        error: null,
        success: null,
      };

    case "GET_CONTACT_EXCELDATA_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        error: action.error,
        excelData: [],
      };

    // SAVE
    case "CREATE_CONTACT_INIT":
      return {
        ...state,
        loading: false,
        error: null,
        success: null,
      };

    case "CREATE_CONTACT_START":
      return {
        ...state,
        loading: true,
        error: null,
        success: null,
      };

    case "CREATE_CONTACT_SUCCESS":
      return {
        ...state,
        loading: false,
        error: null,
        contact: action.contact,
        success: "Амжилттай нэмэгдлээ",
      };
    case "CREATE_CONTACT_ERROR":
      return {
        ...state,
        loading: false,
        error: action.error,
        success: null,
      };

    case "DELETE_MULT_CONTACT_START":
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case "DELETE_MULT_CONTACT_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Амжилттай устгагдлаа",
        error: null,
      };
    case "DELETE_MULT_CONTACT_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        error: action.error,
      };

    //GET
    case "GET_CONTACT_INIT":
      return {
        ...state,
        loading: false,
        success: null,
        error: null,
        contact: {},
      };

    case "GET_CONTACT_START":
      return {
        ...state,
        loading: true,
        contact: {},
        error: null,
      };

    case "GET_CONTACT_SUCCESS":
      return {
        ...state,
        loading: false,
        contact: action.contact,
        error: null,
      };

    case "GET_CONTACT_ERROR":
      return {
        ...state,
        loading: false,
        contact: {},
        error: action.error,
      };
    //UPDATE
    case "UPDATE_CONTACT_START":
      return {
        ...state,
        success: null,
        loading: true,
        error: null,
      };
    case "UPDATE_CONTACT_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Мэдээллийг амжилттай шинэчлэгдлээ",
        error: null,
      };
    case "UPDATE_CONTACT_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        error: action.error,
      };

    // GET COUNT
    case "GET_COUNT_CONTACT_START":
      return {
        ...state,
        countLoading: true,
        totalCount: null,
        error: null,
      };
    case "GET_COUNT_CONTACT_SUCCESS":
      return {
        ...state,
        coutLoading: false,
        totalCount: action.orderCount,
        error: null,
      };
    case "GET_COUNT_CONTACT_ERROR":
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
