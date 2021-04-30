import React, { useState } from 'react';

const Table = ({
  columns = [{ name: 'header', property: 'value' }],
  rows = [{ id: 1, value: 'cell' }],
  format = (_, value) => value,
  className = 'table',
  perPage = 25,
}) => {
  const [page, setPage] = useState(0);

  const nextPage = (event) => {
    event.preventDefault();
    setPage(page + 1);
  };

  const previousPage = (event) => {
    event.preventDefault();
    setPage(page - 1);
  }

  const start = page * perPage;

  const header = columns.map((col) => {
    return <th key={col.name}>{col.name}</th>;
  });

  const body = rows.slice(start, start + perPage).map((row) => {
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
      <div className='pagination'>
        <p>
          Showing {start + 1}-{start + body.length} of {rows.length} routes.
        </p>
        <p>
          <button
            key='previous'
            disabled={page === 0}
            onClick={previousPage}
          >
            Previous Page
          </button>
          <button
            key='next'
            disabled={start + perPage >= rows.length}
            onClick={nextPage}
          >
            Next Page
          </button>
        </p>
      </div>
    </div>
  );
};

export default Table;
