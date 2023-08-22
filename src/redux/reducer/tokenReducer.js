const initialState = {
  loading: false,
  role: null,
  avatar: null,
  name: null,
  error: null,
  userId: null,
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "TOKEN_CHECK_START":
      return {
        ...state,
        loading: true,
        role: null,
        avatar: null,
        name: null,
        error: null,
        userId: null,
      };
    case "TOKEN_CHECK_SUCCESS":
      return {
        ...state,
        loading: false,
        error: null,
        avatar: action.avatar,
        name: action.name,
        role: action.role,
        userId: action.userId,
      };
    case "TOKEN_CHECK_ERROR":
      return {
        ...state,
        loading: false,
        avatar: null,
        name: null,
        error: action.error,
        role: null,
        userId: null,
      };
    default:
      return state;
  }
};

export default reducer;
