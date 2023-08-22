const initialState = {
  loading: false,
  error: null,
  success: null,
  gallerys: [],
  paginationLast: {},
  excelData: [],
  gallery: {},
  //count
  countLoading: false,
  totalCount: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "CLEAR_GALLERY":
      return {
        ...state,
        error: null,
        success: null,
        gallerys: [],
        gallery: {},
        excelData: [],
        loading: false,
      };

    case "LOAD_GALLERYS_START":
      return {
        ...state,
        loading: true,
        error: null,
        suceess: null,
        gallerys: [],
      };

    case "LOAD_GALLERYS_SUCCESS":
      return {
        ...state,
        loading: false,
        gallerys: action.gallerys,
      };

    case "LOAD_GALLERYS_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        gallerys: [],
        error: action.error,
      };

    case "LOAD_GALLERY_PAGINATION":
      return {
        ...state,
        paginationLast: action.pagination,
      };

    // EXCEL
    case "GET_GALLERY_EXCELDATA_START":
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
        excelData: [],
      };

    case "GET_GALLERY_EXCELDATA_SUCCESS":
      return {
        ...state,
        loading: false,
        excelData: action.excel,
        error: null,
        success: null,
      };

    case "GET_GALLERY_EXCELDATA_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        error: action.error,
        excelData: [],
      };

    // SAVE
    case "CREATE_GALLERY_INIT":
      return {
        ...state,
        loading: false,
        error: null,
        success: null,
      };

    case "CREATE_GALLERY_START":
      return {
        ...state,
        loading: true,
        error: null,
        success: null,
      };

    case "CREATE_GALLERY_SUCCESS":
      return {
        ...state,
        loading: false,
        error: null,
        gallery: action.gallery,
        success: "Амжилттай нэмэгдлээ",
      };
    case "CREATE_GALLERY_ERROR":
      return {
        ...state,
        loading: false,
        error: action.error,
        success: null,
      };

    case "DELETE_MULT_GALLERY_START":
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case "DELETE_MULT_GALLERY_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Амжилттай устгагдлаа",
        error: null,
      };
    case "DELETE_MULT_GALLERY_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        error: action.error,
      };

    //GET
    case "GET_GALLERY_INIT":
      return {
        ...state,
        loading: false,
        success: null,
        error: null,
        gallery: {},
      };

    case "GET_GALLERY_START":
      return {
        ...state,
        loading: true,
        gallery: {},
        error: null,
      };

    case "GET_GALLERY_SUCCESS":
      return {
        ...state,
        loading: false,
        gallery: action.gallery,
        error: null,
      };

    case "GET_GALLERY_ERROR":
      return {
        ...state,
        loading: false,
        gallery: {},
        error: action.error,
      };
    //UPDATE
    case "UPDATE_GALLERY_START":
      return {
        ...state,
        success: null,
        loading: true,
        error: null,
      };
    case "UPDATE_GALLERY_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Мэдээллийг амжилттай шинэчлэгдлээ",
        error: null,
      };
    case "UPDATE_GALLERY_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        error: action.error,
      };

    // GET COUNT
    case "GET_COUNT_GALLERY_START":
      return {
        ...state,
        countLoading: true,
        totalCount: null,
        error: null,
      };
    case "GET_COUNT_GALLERY_SUCCESS":
      return {
        ...state,
        coutLoading: false,
        totalCount: action.orderCount,
        error: null,
      };
    case "GET_COUNT_GALLERY_ERROR":
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
