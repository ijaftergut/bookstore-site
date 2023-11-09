import React from 'react';
import { Link } from 'react-router-dom';

const Ranking = ({ ranking, auth})=> {
    console.log(ranking)
  return (
    <div>
      <h2>Ranking</h2>
      <ul>
        {
          ranking.map( ranking => {
            return (
              <li key={ ranking.ranking }>
                { ranking.ranking }
                
              </li>
            );
          })
        }
      </ul>
    </div>
  );
};

export default Ranking;
