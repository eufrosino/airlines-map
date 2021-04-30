import React, { useState } from 'react';
import './App.css';
import Table from './components/Table';
import Select from './components/Select';
import DATA from './data';

const App = () => {
  const [airline, setAirline] = useState('all');
  const [airport, setAirport] = useState('all');

  const formatValue = (property, value) => {
    if (property === 'airline') {
      return DATA.getAirlineById(value).name;
    }
    return DATA.getAirportByCode(value).name;
  };

  const filteredRoutes = DATA.routes.filter((route) => {
    return (
      (route.airline === airline || airline === 'all') &&
      (route.src === airport || route.dest === airport || airport === 'all')
    );
  });

  const filteredAirlines = DATA.airlines.map((airline) => {
    const active = !!filteredRoutes.find(
      (route) => route.airline === airline.id
    );
    return Object.assign({}, airline, { active });
  });

  const filteredAirports = DATA.airports.map((airport) => {
    const active = !!filteredRoutes.find(route => {
      return (route.src === airport.code || route.dest === airport.code);
    });
    return Object.assign({}, airport, { active });
  });

  const airlineSelected = (value) => {
    if (value !== 'all') {
      value = Number(value);
    }
    setAirline(value);
  };

  const airportSelected = (value) => {
    setAirport(value);
  };

  const clearFilters = () => {
    setAirline('all');
    setAirport('all');
  };

  const setToDefault = (airline === 'all' && airport === 'all');

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
      <p>
        Show routes on
        <Select
          options={filteredAirlines}
          valueKey='id'
          titleKey='name'
          allTitle='All Airlines'
          value={airline}
          onSelect={airlineSelected}
          enabledKey='active'
        />
        flying in or out of
        <Select
          options={filteredAirports}
          valueKey='code'
          titleKey='name'
          enabledKey='active'
          allTitle='All Airports'
          value={airport}
          onSelect={airportSelected}
        />
        <button onClick={clearFilters} disabled={setToDefault}>
          Show All Routes
        </button>
      </p>
      <section>
        <Table
          className='routes-table'
          columns={columns}
          rows={filteredRoutes}
          format={formatValue}
        />
      </section>
    </div>
  );
};

export default App;
