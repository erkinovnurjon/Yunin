export const useGlobal = () => {
  const parseNumber = (value: string | number) => {
    if (!value && value !== 0) return "";
    // @ts-ignore
    value = parseFloat(value).toFixed(2);
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  return { parseNumber };
};
