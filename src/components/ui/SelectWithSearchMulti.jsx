import Select from "react-select";

export default function SelectWithSearchMulti({
  name,
  value,
  options,
  onChange,
}) {
  return (
    <Select
      classNames={{
        indicatorsContainer: (state) => "py-1.5",
        input: (state) => "px-2",
        menu: (state) => "px-2",
        placeholder: (state) => "px-2",
        singleValue: (state) => "px-2",
      }}
      onChange={(data) => onChange({ target: { name, value: data } })}
      options={options}
      value={value}
      isMulti
      closeMenuOnSelect={false}
    />
  );
}
