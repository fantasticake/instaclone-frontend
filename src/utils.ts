export const formatNumber = (num: any, str: any) => {
  if (typeof num == "number" && typeof str == "string")
    return `${num} ${num == 1 ? str : str + "s"}`;
};
