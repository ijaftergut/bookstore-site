import React from 'react';

const TopTen = ({ auth, topten, users, products, setTopTen, ranking })=> {
  
  const user = users.find(user =>  user.id === auth.id);
  return (
    <div>
      <h2>Top Ten</h2>
      <ul>
        {
          topten.filter(rank=> rank.user_id === user.id).map( rank => {
            const product = products.find(product => product.id === rank.product_id) || {};
            return (
              <li key={ rank.id }>
                { product.name }
                
              </li>
            );
          })
        }
      </ul>
      
    </div>
  );
};

export default TopTen;
