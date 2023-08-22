export const addAudio = (files) => {
  return {
    type: "ADD_AUDIO",
    audios: files,
  };
};

export const removeAllDatas = () => {
  return {
    type: "CLEAR_DATAS",
  };
};

export const removeAudio = (key) => {
  return {
    type: "REMOVE_AUDIO",
    key,
  };
};

export const addVideos = (files) => {
  return {
    type: "ADD_VIDEOS",
    videos: files,
  };
};

export const removeVideos = (key) => {
  return {
    type: "REMOVE_VIDEOS",
    key,
  };
};
