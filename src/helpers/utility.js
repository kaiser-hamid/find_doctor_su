import moment from "moment";
export const parsePickerDate = (inputDate) => {
  if (inputDate) {
    return moment(inputDate).format("yyyy-MM-DD");
  }
  return "";
};

export const getSelectedDrodownItems = (dropdownOptions, selectedItems) => {
  const result = dropdownOptions.filter((item) =>
    selectedItems.includes(item.value)
  );
  return result;
};
