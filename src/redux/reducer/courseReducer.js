const initialState = {
  loading: false,
  error: null,
  success: null,
  allCourse: [],
  paginationLast: {},
  excelData: [],
  course: {},
  //count
  countLoading: false,
  totalCount: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "CLEAR_COURSE":
      return {
        ...state,
        error: null,
        success: null,
      };

    case "LOAD_COURSE_START":
      return {
        ...state,
        loading: true,
        error: null,
        suceess: null,
        allCourse: [],
      };

    case "LOAD_COURSE_SUCCESS":
      return {
        ...state,
        loading: false,
        allCourse: action.loadCourse,
      };

    case "LOAD_COURSE_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        allCourse: [],
        error: action.error,
      };

    case "LOAD_PAGINATION":
      return {
        ...state,
        paginationLast: action.pagination,
      };
    // EXCEL
    case "GET_COURSE_EXCELDATA_START":
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
        excelData: [],
      };

    case "GET_COURSE_EXCELDATA_SUCCESS":
      return {
        ...state,
        loading: false,
        excelData: action.excel,
      };

    case "GET_COURSE_EXCELDATA_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        error: action.error,
        excelData: [],
      };

    // SAVE
    case "CREATE_COURSE_INIT":
      return {
        ...state,
        loading: false,
        error: null,
        success: null,
      };

    case "CREATE_COURSE_START":
      return {
        ...state,
        loading: true,
        error: null,
        success: null,
      };

    case "CREATE_COURSE_SUCCESS":
      return {
        ...state,
        loading: false,
        error: null,
        course: action.course,
        success: "Амжилттай нэмэгдлээ",
      };
    case "CREATE_COURSE_ERROR":
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case "DELETE_MULT_COURSE_START":
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case "DELETE_MULT_COURSE_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Амжилттай устгагдлаа",
        error: null,
      };
    case "DELETE_MULT_COURSE_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        error: action.error,
      };

    //GET
    case "GET_COURSE_INIT":
      return {
        ...state,
        loading: false,
        success: null,
        error: null,
        course: {},
      };

    case "GET_COURSE_START":
      return {
        ...state,
        loading: true,
        course: {},
        error: null,
      };

    case "GET_COURSE_SUCCESS":
      return {
        ...state,
        loading: false,
        course: action.singleCourse,
        error: null,
      };

    case "GET_COURSE_ERROR":
      return {
        ...state,
        loading: false,
        course: {},
        error: action.error,
      };
    //UPDATE
    case "UPDATE_COURSE_START":
      return {
        ...state,
        success: null,
        loading: true,
        error: null,
      };
    case "UPDATE_COURSE_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Мэдээллийг амжилттай шинэчлэгдлээ",
        error: null,
      };
    case "UPDATE_COURSE_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        error: action.error,
      };
    case "UPDATE_END":
      return {
        ...state,
        loading: false,
        success: null,
        error: null,
      };

    // GET COUNT
    case "GET_COUNT_COURSE_START":
      return {
        ...state,
        countLoading: true,
        totalCount: null,
        error: null,
      };
    case "GET_COUNT_COURSE_SUCCESS":
      return {
        ...state,
        coutLoading: false,
        totalCount: action.orderCount,
        error: null,
      };
    case "GET_COUNT_COURSE_ERROR":
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
