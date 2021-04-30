import React from 'react';

const Table = ({
  columns = [{ name: 'header', property: 'value' }],
  rows = [{ id: 1, value: 'cell' }],
  format = (_, value) => value,
  className = 'table',
}) => {

  const header = columns.map((col) => {
    return <th key={col.name}>{col.name}</th>;
  });

  const body = rows.map((row) => {
    const rows = columns.map((col) => {
      const value = row[col.property];
      return <td key={col.property + value}>{format(col.property, value)}</td>;
    });
    return <tr key={Object.values(row).join(':')}>{rows}</tr>;
  });

  return (
    <div>
      <table className={className}>
        <thead>
          <tr>{header}</tr>
        </thead>
        <tbody>{body}</tbody>
      </table>
    </div>
  );
};

export default Table;
