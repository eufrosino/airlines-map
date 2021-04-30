import React from 'react';
import './App.css';
import DATA from './data';

const App = () => {
  const showRoute = (route) => {
    return (
      <tr>
        <td>{route.airline}</td>
        <td>{route.src}</td>
        <td>{route.dest}</td>
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
          <td>airline:</td>
          <td>src:</td>
          <td>dest:</td>
        </tr>
        {DATA.routes.map(showRoute)}
        </table>
      </section>
    </div>
  );
};

export default App;
