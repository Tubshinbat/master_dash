const initialState = {
  loading: false,
  error: null,
  success: null,
  rates: [],
  paginationLast: {},

  //count
  countLoading: false,
  totalCount: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "CLEAR_RATE":
      return {
        ...state,
        error: null,
        success: null,
        rates: [],
        loading: false,
      };

    case "LOAD_RATE_START":
      return {
        ...state,
        loading: true,
        error: null,
        suceess: null,
        rates: [],
      };

    case "LOAD_RATE_SUCCESS":
      return {
        ...state,
        loading: false,
        rates: action.rates,
      };

    case "LOAD_RATE_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        rates: [],
        error: action.error,
      };

    case "LOAD_PAGINATION":
      return {
        ...state,
        paginationLast: action.pagination,
      };

    case "DELETE_MULT_RATE_START":
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case "DELETE_MULT_RATE_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Амжилттай устгагдлаа",
        error: null,
      };
    case "DELETE_MULT_RATE_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        error: action.error,
      };

    default:
      return state;
  }
};

export default reducer;
