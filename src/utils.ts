export const formatNumber = (num: any, str: any) => {
  if (typeof num == "number" && typeof str == "string")
    return `${num} ${num == 1 ? str : str + "s"}`;
};

export const formatDate = (date: string) => {
  return new Date(parseInt(date))
    .toLocaleDateString("en-us", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
    .replace("/", " ")
    .replace("/", ", ");
};

export const getIsScrollEnd = (e: any) =>
  (e.target.scrollTop + e.target.clientHeight) / e.target.scrollHeight > 0.8;
