const initialState = {
  saving: false,
  logginIn: false,
  token: null,
  role: null,
  userId: null,
  error: null,
  loading: false,
  success: null,
  code: null,
  user: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_USER_START":
      return {
        ...state,
        logginIn: true,
        saving: false,
        token: null,
        role: null,
        userId: null,
        error: null,
        loading: false,
      };

    case "LOGIN_USER_ERROR":
      return {
        ...state,
        logginIn: false,
        error: action.error,
        token: null,
        role: null,
        userId: null,
        loading: false,
      };

    case "LOGIN_USER_SUCCESS":
      return {
        ...state,
        error: null,
        logginIn: false,
        token: action.data.token,
        userId: action.data.user._id,
        role: action.data.user.role,
      };

    case "LOGOUT_USER":
      return {
        saving: false,
        logginIn: false,
        token: null,
        userId: null,
        error: null,
        loading: false,
      };

    // FORGET PASSWORD

    case "FORGET_PASSWORD_START":
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case "FORGET_PASSWORD_SUCCESS":
      return {
        ...state,
        loading: false,
        error: null,
        success: action.message,
      };
    case "FORGET_PASSWORD_ERROR":
      return {
        ...state,
        loading: false,
        error: action.error,
        success: null,
      };

    // case "SEND_SMS_START":
    //   return {
    //     ...state,
    //     loading: true,
    //     error: null,
    //     code: null,
    //     success: null,
    //     user: null,
    //   };

    // case "SEND_SMS_ERROR":
    //   return {
    //     ...state,
    //     loading: false,
    //     error: action.error,
    //     success: null,
    //     code: null,
    //     user: null,
    //   };

    // case "SEND_SMS_SUCCESS":
    //   return {
    //     ...state,
    //     loading: false,
    //     error: null,
    //     code: action.code,
    //     user: action.user,
    //     success: "Амжилттай код илгээллээ ",
    //   };

    // case "CHANGE_PASSWORD_START":
    //   return {
    //     ...state,
    //     loading: true,
    //     error: null,
    //     success: null,
    //     user: null,
    //   };

    // case "CHANGE_PASSWORD_SUCCESS":
    //   return {
    //     ...state,
    //     loading: false,
    //     error: null,
    //     success: "Амжилттай нууц үг шинжлэгдлээ",
    //     user: action.user,
    //   };

    // case "CHANGE_PASSWORD_ERROR":
    //   return {
    //     ...state,
    //     loading: false,
    //     error: null,
    //     success: null,
    //     error: action.error,
    //   };

    default:
      return state;
  }
};

export default reducer;
