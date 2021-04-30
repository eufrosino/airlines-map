import React from 'react';
import DATA from '../data';

const Map = ({ routes = [] }) => {
  const groups = routes.map(route => {
    const sourceAirport = DATA.getAirportByCode(route.src);
    const destinationAirport = DATA.getAirportByCode(route.dest);
    const d = `M${sourceAirport.long} ${sourceAirport.lat} L ${destinationAirport.long} ${destinationAirport.lat}`;

    return (
      <g key={route.airline + route.src + route.dest}>
        <circle
          className='source'
          cx={sourceAirport.long}
          cy={sourceAirport.lat}
        >
          <title>{sourceAirport.name}</title>
        </circle>
        <circle
          className='destination'
          cx={destinationAirport.long}
          cy={destinationAirport.lat}
        >
          <title>{destinationAirport.name}</title>
        </circle>
        <path d={d} />
      </g>
    );
  });

  return (
    <svg className='map' viewBox='-180 -90 360 180'>
      <g transform='scale(1 -1)'>
        <image
          xlinkHref='equirectangular_world.jpg'
          href='equirectangular_world.jpg'
          x='-180'
          y='-90'
          height='100%'
          width='100%'
          transform='scale(1 -1)'
        />
        {groups}
      </g>
    </svg>
  );
};

export default Map;
