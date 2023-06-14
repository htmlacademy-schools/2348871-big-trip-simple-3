export const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
export const capitalize = (str) => str[0].toUpperCase() + str.substring(1);

export const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};
