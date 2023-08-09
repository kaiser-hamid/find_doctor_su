import Select from "react-select";

export default function RadioButton({ label, name, value, selectedValue }) {
  return (
    <label className="md:flex-1 block md:inline my-1 md:my-0 rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 cursor-pointer">
      <input
        type="radio"
        name={name}
        value={value}
        defaultChecked={selectedValue === value}
        className="outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
      />
      <span className="px-2">{label}</span>
    </label>
  );
}
