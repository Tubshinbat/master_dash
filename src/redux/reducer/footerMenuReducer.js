const initialState = {
  footerMenus: [],
  loading: false,
  error: null,
  success: null,
  footerMenu: null,
  type: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "CLEAR_FOOTERMENU":
      return {
        ...state,
        loading: false,
        error: null,
        success: null,
        type: null,
      };
    case "FOOTERMENU_CHANGE_POSITION_START":
      return {
        ...state,
        loading: true,
        error: null,
        success: null,
        footerMenus: null,
      };
    case "FOOTERMENU_CHANGE_POSITION_SUCCESS":
      return {
        ...state,
        loading: false,
        error: null,
        success: "Өөрчлөлт хадгалагдлаа",
        footerMenus: action.footerMenus,
      };
    case "FOOTERMENU_CHANGE_POSITION_ERROR":
      return {
        ...state,
        loading: false,
        error: action.error,
        success: null,
        footerMenus: null,
      };

    case "LOAD_FOOTERMENUS_START":
      return {
        ...state,
        loading: true,
        error: null,
        success: null,
      };

    case "LOAD_FOOTERMENUS_SUCCESS":
      return {
        ...state,
        footerMenus: action.footerMenus,
        loading: false,
        success: null,
        error: null,
      };

    case "LOAD_FOOTERMENUS_ERROR":
      return {
        ...state,
        loading: false,
        error: action.error,
        success: null,
      };
    // Single footerMenu
    case "GET_FOOTERMENU_START":
      return {
        ...state,
        loading: true,
        error: null,
        footerMenu: null,
        success: null,
      };
    case "GET_FOOTERMENU_SUCCESS":
      return {
        ...state,
        footerMenu: action.footerMenu,
        loading: false,
        error: null,
        success: null,
      };

    case "GET_FOOTERMENU_ERROR":
      return {
        ...state,
        footerMenu: null,
        loading: false,
        error: action.error,
        success: null,
      };

    // save
    case "CREATE_FOOTERMENU_START":
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case "CREATE_FOOTERMENU_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Амжилттай шинэ цэс нэмэгдлээ",
        error: null,
      };
    case "CREATE_FOOTERMENU_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        error: action.error,
      };
    case "DELETE_FOOTERMENU_START":
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
        footerMenu: null,
      };
    case "DELETE_FOOTERMENU_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Амжилттай цэсыг устгаллаа",
        error: null,
        footerMenu: null,
      };
    case "DELETE_FOOTERMENU_ERROR":
      return {
        ...state,
        error: action.error,
        loading: false,
        success: null,
        footerMenu: null,
      };

    // Update
    case "UPDATE_FOOTERMENU_START":
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case "UPDATE_FOOTERMENU_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Амжилттай цэсын нэр солигдлоо",
        error: null,
      };
    case "UPDATE_FOOTERMENU_ERROR":
      return {
        ...state,
        loading: false,
        error: action.error,
        success: null,
      };

    default:
      return state;
  }
};

export default reducer;
