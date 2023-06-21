export const toIDR = (price) => {
  return new Intl.NumberFormat().format(price);
};
