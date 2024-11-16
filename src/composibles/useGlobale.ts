export const useGlobal = () => {
  const parseNumber = (value: string | number) => {
    if (!value && value !== 0) return "";
    // @ts-ignore
    value = parseFloat(value).toFixed(2);
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };
  const statusColors = (id: number) => {
    switch (id) {
      case 1:
        return "!bg-blue-500 !text-white";
      case 2:
        return "!bg-green-500 !text-white";
      case 3:
      case 5:
      case 7:
      case 9:
      case 11:
      case 15:
      case 16:
        return "!bg-green-500 !text-white";
      case 4:
      case 6:
        return "!bg-orange-500 !text-white";
    }
  };

  return { parseNumber, statusColors };
};
