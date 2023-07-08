import Select from "react-select";

export default function SelectWithSearch({name, value, options, onChange}) {

    const handleChangeInput = (ctx) => {
        onChange({target: {name, value: ctx.value}});
    }

    const handleGetValue = () => {
        const valueForSet = options.find(item => item.value === value)
        return valueForSet;
    }

    return (
        <Select
            classNames={{
                indicatorsContainer: (state) => 'py-1.5',
                input: (state) => 'px-2',
                menu: (state) => 'px-2',
                placeholder: (state) => 'px-2',
                singleValue: (state) => 'px-2',
            }}
            onChange={handleChangeInput}
            options={options}
            value={handleGetValue()}
        />
    )
}