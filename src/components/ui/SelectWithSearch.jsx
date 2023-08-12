import Select, { components } from "react-select";

export default function SelectWithSearch({
  name,
  value,
  options,
  onChange,
  hasSubLabel,
}) {
  const handleChangeInput = (ctx) => {
    onChange({ target: { name, value: ctx.value } });
  };

  const handleGetValue = () => {
    const valueForSet = options.find((item) => item.value === value);
    return valueForSet || { id: "", label: "", value: "" };
  };

  const Option = (props) =>
    !hasSubLabel ? (
      <components.Option {...props} />
    ) : (
      <components.Option {...props}>
        <p className="font-semibold">
          {props.data.label}
          <span className="text-bodydark block text-xs italic">
            -{props.data.sub}
          </span>
        </p>
      </components.Option>
    );

  return (
    <Select
      classNames={{
        indicatorsContainer: (state) => "py-1.5",
        input: (state) => "px-2",
        menu: (state) => "px-2",
        placeholder: (state) => "px-2",
        singleValue: (state) => "px-2",
      }}
      onChange={handleChangeInput}
      options={options}
      value={handleGetValue()}
      components={{ Option }}
    />
  );
}
