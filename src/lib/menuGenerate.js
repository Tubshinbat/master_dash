export const menuGenerateData = (categories) => {
  let datas = [];
  if (categories) {
    categories.map((el) => {
      datas.push({
        title: el.name,
        key: el._id,
        children: el.children && menuGenerateData(el.children),
      });
      return true;
    });
  }

  return datas;
};
