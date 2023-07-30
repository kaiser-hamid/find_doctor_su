import moment from "moment";
export const parsePickerDate = (inputDate) => {
  if (inputDate) {
    return moment(inputDate).format("yyyy-MM-DD");
  }
  return "";
};
