import moment from "moment";
import axios from "../axios-base";

export const errorBuild = (error) => {
  let resError = "Алдаа гарлаа дахин оролдож үзнэ үү";

  if (resError) {
    resError = error.message;
  }

  if (error.response !== undefined && error.response.status !== undefined) {
    resError = error.response.status;
  }
  if (
    error.response !== undefined &&
    error.response.data !== undefined &&
    error.response.data.error !== undefined
  ) {
    resError = error.response.data.error.message;
  }
  return resError;
};

export const createActions = (baseType) => ({
  start: () => ({ type: `${baseType}_START` }),
  success: (data, pagination = {}) => ({
    type: `${baseType}_SUCCESS`,
    data,
    pagination,
  }),
  error: (error) => ({ type: `${baseType}_ERROR`, error }),
  pagination: (pagination) => ({ type: `${baseType}_PAGINATION`, pagination }),
});

export const asyncApiCall = async (
  method,
  url,
  data,
  actions,
  dispatch,
  loadFunction = null
) => {
  dispatch(actions.start());
  try {
    const response = await axios[method](url, data);
    dispatch(actions.success(response.data.data, response?.data?.pagination));
    if (loadFunction) {
      dispatch(loadFunction());
    }
  } catch (error) {
    dispatch(actions.error(errorBuild(error)));
  }
};

export const convertFromdata = (formData) => {
  const sendData = new FormData();
  Object.keys(formData).map((index) => {
    if (
      formData[index] &&
      Array.isArray(formData[index]) &&
      formData[index].length > 0
    ) {
      for (let i = 0; i < formData[index].length; i++) {
        sendData.append([index], formData[index][i]);
      }
    } else sendData.append(index, formData[index]);
  });

  return sendData;
};

const supportLanguage = ["mn", "en", "ru", "jp", "ko", "cn"];

export const languageBuild = (data, path, language = "mn", red = true) => {
  try {
    if (
      data &&
      data.languages[language] &&
      data.languages[language][path] !== undefined
    ) {
      return data.languages[language][path];
    }

    // Боломжит хэлнүүдээр (fallback) хайлт хийх
    for (const lang of supportLanguage) {
      if (
        data &&
        data.languages[lang] &&
        data.languages[lang][path] !== undefined
      ) {
        if (red)
          return (
            <span className="red-color">{data.languages[lang][path]}</span>
          );
        else return data.languages[lang][path];
      }
    }
    return null;
  } catch (error) {
    console.log(error);
  }
};

export const languageShortToLong = (lang) => {
  switch (lang) {
    case "mn":
      return "Монгол";
    case "en":
      return "Англи";
    case "ru":
      return "Орос";
    case "jp":
      return "Япон";
    case "ko":
      return "Солонгос";
    case "cn":
      return "Хятад";
    default:
      return "Монгол";
  }
};

const formatDate = (date) =>
  moment(date).utcOffset("+0800").format("YYYY-MM-DD HH:mm:ss");

export const progressData = (el, language, fields) => {
  const processedFields = {};

  fields.forEach((field) => {
    processedFields[field] = languageBuild(el, field, language);
  });

  return {
    key: el._id,
    ...el,
    _id: undefined,
    status: el?.status ? "Нийтлэгдсэн" : "Ноорог",
    star: el?.star ? "Онцлох" : "Онцлоогүй",
    listActive: el?.listActive ? "Идэвхтэй" : "Идэвхгүй",
    sideActive: el?.sideActive ? "Харуулна" : "Харуулахгүй",
    parentActive: el?.parentActive ? "Харуулна" : "Харуулахгүй",
    createUser: el.createUser?.name || "Мэдээлэл алга",
    updateUser: el.updateUser?.name || "Мэдээлэл алга",
    ...processedFields,
    createAt: formatDate(el.createAt), // Огноо форматлах
    updateAt: formatDate(el.updateAt), // Огноо форматлах
  };
};

export const menuGenerateData = (categories, language) => {
  let datas = [];
  if (categories) {
    categories.map((el) => {
      datas.push({
        title: languageBuild(el, "name", language),
        key: el._id,
        children: el.children && menuGenerateData(el.children),
      });
    });
  }

  return datas;
};

export const menuConvertLanguage = (categories, language) => {
  const data = categories.map((item) => {
    return {
      ...item,
      name: languageBuild(item, "name", language),
    };
  });

  return data;
};
