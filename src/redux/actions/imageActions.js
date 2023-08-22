import axios from "../../axios-base";

export const addBanner = (file) => {
  return {
    type: "ADD_BANNER",
    files: file,
  };
};

export const removeBanner = () => {
  return {
    type: "REMOVE_BANNER",
  };
};

export const addIcon = (file) => {
  return {
    type: "ADD_ICON",
    files: file,
  };
};

export const removeIcon = () => {
  return {
    type: "REMOVE_ICON",
  };
};

export const addPicture = (file) => {
  return {
    type: "ADD_PICTURE",
    files: file,
  };
};

export const removePicture = () => {
  return {
    type: "REMOVE_PICTURE",
  };
};

export const addVideo = (file) => {
  return {
    type: "ADD_VIDEO",
    files: file,
  };
};

export const removeVideo = () => {
  return {
    type: "REMOVE_VIDEO",
  };
};

export const addPhoto = (files) => {
  return {
    type: "ADD_PHOTO",
    files,
  };
};

export const removePhoto = (key) => {
  return {
    type: "REMOVE_PHOTO",
    key,
  };
};

export const allRemove = () => {
  return {
    type: "ALL_REMOVE_PHOTO",
  };
};

export const addLogo = (file) => {
  return {
    type: "ADD_LOGO",
    files: file,
  };
};

export const removeLogo = () => {
  return {
    type: "REMOVE_LOGO",
  };
};

export const addWhiteLogo = (file) => {
  return {
    type: "ADD_WHITE_LOGO",
    files: file,
  };
};

export const removeWhiteLogo = () => {
  return {
    type: "REMOVE_WHITE_LOGO",
  };
};

export const tinymceAddPhoto = (file) => {
  return function (dispatch) {
    dispatch(startUploadPhoto());
    axios
      .post("/imgupload", file)
      .then((response) => {
        const result = response.data.data;
        dispatch(successUploadPhoto(result));
      })
      .catch((error) => errorUploadPhoto(error));
  };
};

export const startUploadPhoto = () => {
  return {
    type: "START_UPLOAD_PHOTO",
  };
};

export const successUploadPhoto = (result) => {
  return {
    type: "SUCCESS_UPLOAD_PHOTO",
    image: result,
  };
};

export const errorUploadPhoto = (error) => {
  return {
    type: "ERROR_UPLOAD_PHOTO",
    error: error,
  };
};
