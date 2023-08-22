const initialState = {
  loading: false,
  error: null,
  success: null,
  link: {},
  links: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_LINK_START":
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };

    case "CREATE_LINK_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Амжилттай нэмэгдлээ",
        error: null,
      };

    case "CREATE_LINK_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        error: action.error,
      };

    case "GET_LINK_START":
      return {
        ...state,
        loading: true,
        error: null,
        success: null,
        link: {},
      };

    case "GET_LINK_SUCCESS":
      return {
        ...state,
        loading: false,
        error: null,
        success: null,
        link: action.link,
      };

    case "GET_LINK_ERROR":
      return {
        ...state,
        loading: false,
        error: action.error,
        success: null,
        link: {},
      };

    case "DELETE_LINK_START": {
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    }

    case "DELETE_LINK_SUCCESS": {
      return {
        ...state,
        loading: false,
        success: "Амжилттай устгалаа",
        error: null,
      };
    }

    case "DELETE_LINK_ERROR": {
      return {
        ...state,
        loading: false,
        success: null,
        error: action.error,
      };
    }

    case "EDIT_LINK": {
      state.stateData[action.editIndex] = action.editData;
      return {
        ...state,
        error: null,
        success: null,
      };
    }

    case "LOAD_LINK_START": {
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
        links: [],
      };
    }

    case "LOAD_LINK_SUCCESS": {
      return {
        ...state,
        loading: false,
        success: null,
        error: null,
        links: action.resultLinks,
      };
    }

    case "LOAD_LINK_ERROR": {
      return {
        ...state,
        loading: false,
        error: action.error,
        success: null,
        links: [],
      };
    }

    case "CREATE_LINK_START":
      return {
        ...state,
        loading: true,
        error: null,
        success: null,
      };

    case "CREATE_LINK_SUCCESS":
      state.stateData.unshift(action.resultNewLink);
      return {
        ...state,
        loading: false,
        stateData: [...state.stateData],
        success: "Амжилттай сошиал хаяг нэмэгдлээ",
      };

    case "CREATE_LINK_ERROR":
      return {
        ...state,
        loading: false,
        error: action.error,
        success: null,
      };
    case "UPDATE_LINK_START":
      return {
        ...state,
        loading: true,
        error: null,
        success: null,
      };
    case "UPDATE_LINK_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Амжилттай шинжлэгдлээ",
      };
    case "UPDATE_LINK_ERROR":
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
