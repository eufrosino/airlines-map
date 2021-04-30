import React, { useState } from 'react';
import './App.css';
import Table from './components/Table';
import DATA from './data';

const AirlineSelect = ({
  options = [],
  valueKey = '',
  titleKey = '',
  value = 'all',
  allTitle = 'all',
  onSelect = (_) => null,
}) => {
  const handleChange = (event) => {
    event.preventDefault();
    onSelect(event.target.value);
  };

  let optionElements = [
    <option key='all' value='all'>
      {allTitle}
    </option>
  ]

  options.forEach(option => {
    const value = option[valueKey]
    optionElements.push(
      <option key={value} value={value}>
        {option[titleKey]}
      </option>
    );
  });

  return (
    <select value={value} onChange={handleChange}>
      {optionElements}
    </select>
  )
}

const App = () => {
  const [airline, setAirline] = useState('all');

  const formatValue = (property, value) => {
    if (property === 'airline') {
      return DATA.getAirlineById(value).name;
    }
    return DATA.getAirportByCode(value).name;
  };

  const filteredRoutes = DATA.routes.filter((route) => {
    return (route.airline === airline || airline === 'all');
  });

  const filteredAirlines = DATA.airlines.map((airline) => {
    const active = !!filteredRoutes.find(
      (route) => route.airline === airline.id
    );
    return Object.assign({}, airline, { active });
  });

  const airlineSelected = (value) => {
    if (value !== 'all') {
      value = Number(value);
    }
    setAirline(value);
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
      <p>
        Show routes on
        <AirlineSelect
          options={filteredAirlines}
          valueKey='id'
          titleKey='name'
          allTitle='All Airlines'
          value={airline}
          onSelect={airlineSelected}
        />
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
