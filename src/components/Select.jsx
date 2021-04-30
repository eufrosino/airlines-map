import React from 'react';

const Select = ({
  options = [],
  valueKey = '',
  titleKey = '',
  value = 'all',
  allTitle = 'all',
  onSelect = (_) => null,
  enabledKey = undefined,
}) => {
  const handleChange = (event) => {
    event.preventDefault();
    onSelect(event.target.value);
  };

  let optionElements = [
    <option key='all' value='all'>
      {allTitle}
    </option>
  ];

  options.forEach(option => {
    const value = option[valueKey];
    const enabled = enabledKey === undefined || !!option[enabledKey];
    optionElements.push(
      <option key={value} value={value} disabled={!enabled}>
        {option[titleKey]}
      </option>
    );
  });

  return (
    <select value={value} onChange={handleChange}>
      {optionElements}
    </select>
  );
};

export default Select;
