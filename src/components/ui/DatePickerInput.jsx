import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import _ from "lodash";

export default function DatePickerInput({ name, value, onChange }) {
  return (
    <DatePicker
      dateFormat="dd MMMM yyyy"
      selected={value}
      onChange={(data) => onChange({ target: { name, value: data } })}
      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
      placeholderText="Select a date"
      fixedHeight
    />
  );
}
