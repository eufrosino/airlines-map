import React from 'react';
import './App.css';
import DATA from './data';

const App = () => {
  const showRoute = (route) => {
    const airline = DATA.getAirlineById(route.airline);
    const src = DATA.getAirportByCode(route.src);
    const dest = DATA.getAirportByCode(route.dest);

    return (
      <tr>
        <td>{airline.name}</td>
        <td>{src.name}</td>
        <td>{dest.name}</td>
      </tr>
    )
  };

  return (
    <div className='app'>
      <header className='header'>
        <h1 className='title'>Airline Routes</h1>
      </header>
      <section>
        <table>
        <tr>
          <th>Airline:</th>
          <th>Source Airport:</th>
          <th>Destination Airport:</th>
        </tr>
        {DATA.routes.map(showRoute)}
        </table>
      </section>
    </div>
  );
};

export default App;
