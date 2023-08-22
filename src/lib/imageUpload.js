import axios from "../axios-base";

export const imageUpload = async (file) => {
  const sendData = new FormData();
  let result = null;
  let error = null;
  sendData.append("file", file);
  await axios
    .post(`/imgupload`, sendData)
    .then((response) => {
      result = response.data.data;
    })
    .catch((err) => {
      error = err;
    });

  return { result, error };
};
