import React from 'react';
import './App.css';
import Table from './components/Table';
import DATA from './data';

const App = () => {

  const formatValue = (property, value) => {
    if (property === "airline") {
      return DATA.getAirlineById(value).name;
    }

    return DATA.getAirportByCode(value).name;
  };

  const columns = [
    {name: 'Airline', property: 'airline'},
    {name: 'Source Airport', property: 'src'},
    {name: 'Destination Airport', property: 'dest'},
  ];

  return (
    <div className='app'>
      <header className='header'>
        <h1 className='title'>Airline Routes</h1>
      </header>
      <section>
        <Table
          className="routes-table"
          columns={columns}
          rows={DATA.routes}
          format={formatValue}
        />
      </section>
    </div>
  );
};

export default App;
