const initialState = {
  files: [],
  image: "",
  logo: [],
  banner: null,
  icon: null,
  picture: null,
  video: null,
  whiteLogo: [],
  error: null,
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_BANNER":
      return {
        ...state,
        banner: [...action.files],
      };

    case "REMOVE_BANNER":
      return {
        ...state,
        banner: null,
      };

    case "ADD_ICON":
      return {
        ...state,
        icon: [...action.files],
      };

    case "REMOVE_ICON":
      return {
        ...state,
        icon: null,
      };

    case "ADD_PICTURE":
      return {
        ...state,
        picture: [...action.files],
      };

    case "REMOVE_PICTURE":
      return {
        ...state,
        picture: null,
      };

    case "ADD_VIDEO":
      return {
        ...state,
        video: [...action.files],
      };

    case "REMOVE_VIDEO":
      return {
        ...state,
        video: null,
      };

    case "ADD_LOGO":
      return {
        ...state,
        logo: [...action.files],
      };

    case "REMOVE_LOGO":
      return {
        ...state,
        logo: null,
      };

    case "ADD_WHITE_LOGO":
      return {
        ...state,
        whiteLogo: [...action.files],
      };

    case "REMOVE_WHITE_LOGO":
      return {
        ...state,
        whiteLogo: null,
      };

    case "ADD_PHOTO":
      return {
        ...state,
        files: [...action.files],
      };

    case "REMOVE_PHOTO":
      let allFile = state.files;
      allFile.splice(action.key, 1);
      return {
        ...state,
        files: [...allFile],
      };
    case "ALL_REMOVE_PHOTO":
      return {
        ...state,
        files: [],
        image: "",
        logo: [],
        whiteLogo: [],
        banner: null,
        video: null,
        icon: null,
        picture: null,
      };
    case "START_UPLOAD_PHOTO":
      return {
        ...state,
        image: "",
        loading: true,
        error: null,
      };
    case "SUCCESS_UPLOAD_PHOTO":
      return {
        ...state,
        image: action.image,
        loading: false,
        error: null,
      };
    case "ERROR_UPLOAD_PHOTO":
      return {
        ...state,
        image: null,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
};

export default reducer;
