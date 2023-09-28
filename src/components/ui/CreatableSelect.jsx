import React from "react";
import CreatableSelect from "react-select/creatable";

export default ({ name, value, options, onChange }) => {
  return (
    <CreatableSelect
      classNames={{
        indicatorsContainer: (state) => "py-1.5",
        input: (state) => "px-2",
        menu: (state) => "px-2",
        placeholder: (state) => "px-2",
        singleValue: (state) => "px-2",
      }}
      components={{
        IndicatorSeparator: () => null,
        DropdownIndicator: () => <span className="py-1.5">&nbsp;</span>,
      }}
      onChange={(data) => onChange({ target: { name, value: data } })}
      value={value}
      options={[]}
      isMulti
      placeholder="Type and press enter"
    />
  );
};
