const initialState = {
  loading: false,
  error: null,
  success: null,
  audios: [],
  videos: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "CLEAR_DATAS":
      return {
        ...state,
        videos: [],
        audios: [],
      };
    case "ADD_VIDEOS":
      return {
        ...state,
        videos: action.videos,
      };
    case "REMOVE_VIDEOS":
      let allVideos = state.videos;
      allVideos.splice(action.key, 1);
      return {
        ...state,
        videos: [...allVideos],
      };
    case "ADD_AUDIO":
      return {
        ...state,
        audios: action.audios,
      };
    case "REMOVE_AUDIO":
      let allFile = state.audios;
      allFile.splice(action.key, 1);
      return {
        ...state,
        audios: [...allFile],
      };
    case "ALL_REMOVE":
      return {
        ...state,
        audios: [],
        videos: [],
      };
    default:
      return state;
  }
};

export default reducer;
