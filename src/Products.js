import React from 'react';
import { Link } from 'react-router-dom';

const Products = ({ products,  auth, createTopTen})=> {
  return (
    <div>
      <h2>Products</h2>
      <ul>
        {
          products.map( product => {
            // const cartItem = cartItems.find(lineItem => lineItem.product_id === product.id);
            return (
              <li key={ product.id }>
                { product.name }
                {
                  auth.id ? (
                    <button onClick={ ()=> createTopTen({product_id: product.id, ranking_id: 2, user_id: auth.id})}>Add to TopTen</button>
                  ): null 
                }
                {/* {
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

export default Products;
