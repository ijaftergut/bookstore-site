import React from 'react';
import { Link } from 'react-router-dom';
import TopTenForm from './TopTenForm';
const Products = ({ products,  auth, createTopTen, topten, users, setTopTen, ranking})=> {
  const handleTopTenSubmission = async () => {
    try {
      const response = await api.submitTopTen(json);
        setTopTen([...topten, response]);
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };
  return (
    <div className='centered'>
      <h2 className='centered'>Products</h2>
      <ul className='all products'>
        {
          products.map( product => {
            const top = topten.find(top=>top.product_id===product.id)
            return (
              <li className='all product' key={ product.id }>
                <h3 >{ product.name }</h3>
                <img  className='img' src={product.image} />
                <p >{product.description}</p>
                {!top?
                <TopTenForm
            onSubmit={handleTopTenSubmission}
            topten={topten}
            setTopTen={setTopTen}
            auth={auth}
            product={product}
            ranking={ranking}
          />:null}
                
              </li>
            );
          })
        }
      </ul>
    </div>
  );
};

export default Products;
