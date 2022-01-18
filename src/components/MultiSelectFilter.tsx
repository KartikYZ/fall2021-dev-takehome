import { MultiSelect } from "react-multi-select-component";
import { Option } from "react-multi-select-component/dist/types/lib/interfaces";

export type MultiSelectFilterProps = {
    options: Option[]
    selected: Option[]
    onChange: React.Dispatch<React.SetStateAction<Option[]>>
}

export function MultiSelectFilter(props: MultiSelectFilterProps) {
  return (
    <div>
      <h3>Filter</h3>
      <MultiSelect
        options={props.options}
        value={props.selected}
        onChange={props.onChange}
        labelledBy="Select"
      />
    </div>
  );
}