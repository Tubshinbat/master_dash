export const convertFromdata = (formData) => {
  const sendData = new FormData();
  Object.keys(formData).map((index) => {
    if (
      formData[index] &&
      formData[index].constructor === Array &&
      formData[index].length > 0
    ) {
      for (let i = 0; i < formData[index].length; i++) {
        sendData.append([index], formData[index][i]);
      }
    } else sendData.append(index, formData[index]);
  });

  return sendData;
};
