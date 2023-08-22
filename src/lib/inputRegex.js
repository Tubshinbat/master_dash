export const requiredCheck = (data) => {
  if (
    data === null ||
    data === "" ||
    data === undefined ||
    String(data).trim() === ""
  ) {
    return "Уучлаарай тус талбар хоосон байж болохгүй!";
  } else {
    return true;
  }
};

export const onlyNumber = (data) => {
  let reg = new RegExp("^[0-9]*$");
  if (reg.test(data) === false) {
    return "Уучлаарай тус талбар зөвхөн тоон утга хүлээн авна!";
  } else {
    return true;
  }
};

export const fileCheck = (file) => {
  if (file.length > 0) {
    return true;
  } else return "Файл оруулна уу";
};

export const maxLength = (data, max) => {
  if (data.trim().length >= max) {
    return `Уучлаарай тус талбар хамгийн ихдээ ${max} - аас бүтсэн тэмдэгт оруулах боломжтой!`;
  } else {
    return true;
  }
};

export const minLength = (data, min) => {
  if (data.trim().length <= min) {
    return `Уучлаарай тус талбар ${min} - аас бага тэмдэгт байх боломжгүй!`;
  } else {
    return true;
  }
};

export const regEmail = (data) => {
  let reg = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
  if (reg.test(data) === false) {
    return "Уучлаарай имэйл хаяг буруу байна.";
  } else {
    return true;
  }
};

export const menuRequired = (data) => {
  if (data.length <= 0 && data !== null && data !== "null")
    return "Цэснээс заавал сонгоно уу";
  else return true;
};
