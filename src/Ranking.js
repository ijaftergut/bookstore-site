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
            // const cartItem = cartItems.find(lineItem => lineItem.product_id === product.id);
            return (
              <li key={ ranking.ranking }>
                { ranking.ranking }
                {/* {
                  auth.id ? (
                    cartItem ? <button onClick={ ()=> updateLineItem(cartItem)}>Add Another</button>: <button onClick={ ()=> createLineItem(product)}>Add</button>
                  ): null 
                }
                {
                  auth.is_admin ? (
                    <Link to={`/products/${product.id}/edit`}>Edit</Link>
                  ): null
                } */}
              </li>
            );
          })
        }
      </ul>
    </div>
  );
};

export default Ranking;
