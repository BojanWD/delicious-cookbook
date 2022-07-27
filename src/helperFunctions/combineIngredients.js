export const combineIngredients = (obj) => {
  const res = [];
  if (obj) {
    for (let i = 1; i <= 20; i++) {
      if (obj[`strIngredient${i}`]) {
        res.push(obj[`strIngredient${i}`].toLowerCase());
      }
    }
  }

  return res;
};

export const containsAll = (arr1, arr2) => {
  const flag = arr1.every((element) => {
    return arr2.includes(element.toLowerCase());
  });

  return flag;
};
