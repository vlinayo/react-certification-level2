import { DropdownOption } from '../../interfaces/Dropdown';
import myStyles from './Dropdown.module.scss';
import React from 'react';

export interface DropdownProps {
  idAttr: string;
  label: string;
  options: DropdownOption[];
  onSelect: (value: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  idAttr,
  label,
  options,
  onSelect,
}) => {
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    onSelect(selectedValue);
  };

  return (
    <div id={idAttr} className={myStyles.dropdown}>
      <p className={myStyles.dropdown__placeholder}>{label}</p>
      <select
        className={myStyles.dropdown__selector}
        onChange={handleSelectChange}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
