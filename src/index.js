import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Link, HashRouter, Routes, Route } from 'react-router-dom';
import Products from './Products';
import Orders from './Orders';
import Cart from './Cart';
import Login from './Login';
import api from './api';
import Ranking from './Ranking';
import TopTen from './TopTen'
import './index.css'
const App = ()=> {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [lineItems, setLineItems] = useState([]);
  const [auth, setAuth] = useState({});
  const [ranking, setRanking] = useState([]);
  const [topten, setTopTen] = useState([]);
  const [users, setUsers] = useState([]);
  const attemptLoginWithToken = async()=> {
    await api.attemptLoginWithToken(setAuth);
  }

  useEffect(()=> {
    attemptLoginWithToken();
  }, []);

  useEffect(()=> {
    const fetchData = async()=> {
      await api.fetchProducts(setProducts);
    };
    fetchData();
  }, []);
  useEffect(()=> {
    const fetchData = async()=> {
      await api.fetchUsers(setUsers);
    };
    fetchData();
  }, []);

  useEffect(()=> {
    if(auth.id){
      const fetchData = async()=> {
        await api.fetchOrders(setOrders);
      };
      fetchData();
    }
  }, [auth]);

  useEffect(()=> {
    const fetchData = async()=> {
      await api.fetchRanking(setRanking);
    };
    fetchData();
  }, []);

  useEffect(()=> {
    if(auth.id){
      const fetchData = async()=> {
        await api.fetchLineItems(setLineItems);
      };
      fetchData();
    }
  }, [auth]);

  useEffect(()=> {
    if(auth.id){
      const fetchData = async()=> {
        await api.fetchTopTen(setTopTen);
      };
      fetchData();
    }
  }, [auth]);


  const createLineItem = async(product)=> {
    await api.createLineItem({ product, cart, lineItems, setLineItems});
  };
  
  const createTopTen = async(topten)=> {
    await api.createTopTen({ topten, cart, lineItems, setTopTen});
  };
  

  const updateLineItem = async(lineItem)=> {
    await api.updateLineItem({ lineItem, cart, lineItems, setLineItems });
  };

  const updateOrder = async(order)=> {
    await api.updateOrder({ order, setOrders });
  };

  const removeFromCart = async(lineItem)=> {
    await api.removeFromCart({ lineItem, lineItems, setLineItems });
  };

  const cart = orders.find(order => order.is_cart) || {};

  const cartItems = lineItems.filter(lineItem => lineItem.order_id === cart.id);

  const cartCount = cartItems.reduce((acc, item)=> {
    return acc += item.quantity;
  }, 0);

  const login = async(credentials)=> {
    await api.login({ credentials, setAuth });
  }

  const logout = ()=> {
    api.logout(setAuth);
  }
  const [scores, setScores] = useState({
    guitar: 0,
    drum: 0,
    piano: 0,
  });
  let handleImageClick = (image) => {
    console.log(1)
    setScores((prevScores) => ({
      ...prevScores,
      [image]: prevScores[image] + 1,
    }));
  };
  return (
    <div>
{Object.values(scores).reduce((a, b) => a + b, 0) > 0 ?
    <div className="content">
    <div className="image-container">
      {Object.keys(scores).map((image) => (
        <div key={image} className="score">{image}({scores[image]})</div>
      ))}
    </div>
  </div>: null}
       <div className='content'>
                <div className="leaf">
                   <div><img src="https://www.pngmart.com/files/15/Yellow-Vector-Acoustic-Guitar-PNG.png" height="75px" width="75px" onClick={() => handleImageClick('guitar')}></img></div>
                    <div><img src="https://www.pngmart.com/files/7/Drum-Table-PNG-File.png" height="75px" width="75px" onClick={() => handleImageClick('drum')}></img></div>
                    <div><img src="https://www.pngmart.com/files/16/Piano-Instrument-PNG-Image.png" height="75px" width="75px" onClick={() => handleImageClick('piano')}></img></div>
                    <div><img src="https://www.pngmart.com/files/15/Yellow-Vector-Acoustic-Guitar-PNG.png" height="75px" width="75px" onClick={() => handleImageClick('guitar')}></img></div>
                    <div><img src="https://www.pngmart.com/files/7/Drum-Table-PNG-File.png" height="75px" width="75px" onClick={() => handleImageClick('drum')}></img></div>
                    <div><img src="https://www.pngmart.com/files/16/Piano-Instrument-PNG-Image.png" height="75px" width="75px" onClick={() => handleImageClick('piano')}></img></div>
                    <div><img src="https://www.pngmart.com/files/15/Yellow-Vector-Acoustic-Guitar-PNG.png" height="75px" width="75px" onClick={() => handleImageClick('guitar')}></img></div>
                    <div><img src="https://www.pngmart.com/files/7/Drum-Table-PNG-File.png" height="75px" width="75px" onClick={() => handleImageClick('drum')}></img></div>
                    <div><img src="https://www.pngmart.com/files/16/Piano-Instrument-PNG-Image.png" height="75px" width="75px" onClick={() => handleImageClick('piano')}></img></div>
                    <div><img src="https://www.pngmart.com/files/15/Yellow-Vector-Acoustic-Guitar-PNG.png" height="75px" width="75px" onClick={() => handleImageClick('guitar')}></img></div>
                  </div>
                  <div className="leaf leaf1">
                  <div><img src="https://www.pngmart.com/files/15/Yellow-Vector-Acoustic-Guitar-PNG.png" height="75px" width="75px" onClick={() => handleImageClick('guitar')}></img></div>
                    <div><img src="https://www.pngmart.com/files/7/Drum-Table-PNG-File.png" height="75px" width="75px" onClick={() => handleImageClick('drum')}></img></div>
                    <div><img src="https://www.pngmart.com/files/16/Piano-Instrument-PNG-Image.png" height="75px" width="75px" onClick={() => handleImageClick('piano')}></img></div>
                    <div><img src="https://www.pngmart.com/files/15/Yellow-Vector-Acoustic-Guitar-PNG.png" height="75px" width="75px" onClick={() => handleImageClick('guitar')}></img></div>
                    <div><img src="https://www.pngmart.com/files/7/Drum-Table-PNG-File.png" height="75px" width="75px" onClick={() => handleImageClick('drum')}></img></div>
                    <div><img src="https://www.pngmart.com/files/16/Piano-Instrument-PNG-Image.png" height="75px" width="75px" onClick={() => handleImageClick('piano')}></img></div>
                    <div><img src="https://www.pngmart.com/files/15/Yellow-Vector-Acoustic-Guitar-PNG.png" height="75px" width="75px" onClick={() => handleImageClick('guitar')}></img></div>
                    <div><img src="https://www.pngmart.com/files/7/Drum-Table-PNG-File.png" height="75px" width="75px" onClick={() => handleImageClick('drum')}></img></div>
                    <div><img src="https://www.pngmart.com/files/16/Piano-Instrument-PNG-Image.png" height="75px" width="75px" onClick={() => handleImageClick('piano')}></img></div>
                    <div><img src="https://www.pngmart.com/files/15/Yellow-Vector-Acoustic-Guitar-PNG.png" height="75px" width="75px" onClick={() => handleImageClick('guitar')}></img></div>
                  </div>
                  <div className="leaf leaf2">
                  <div><img src="https://www.pngmart.com/files/15/Yellow-Vector-Acoustic-Guitar-PNG.png" height="75px" width="75px" onClick={() => handleImageClick('guitar')}></img></div>
                    <div><img src="https://www.pngmart.com/files/7/Drum-Table-PNG-File.png" height="75px" width="75px" onClick={() => handleImageClick('drum')}></img></div>
                    <div><img src="https://www.pngmart.com/files/16/Piano-Instrument-PNG-Image.png" height="75px" width="75px" onClick={() => handleImageClick('piano')}></img></div>
                    <div><img src="https://www.pngmart.com/files/15/Yellow-Vector-Acoustic-Guitar-PNG.png" height="75px" width="75px" onClick={() => handleImageClick('guitar')}></img></div>
                    <div><img src="https://www.pngmart.com/files/7/Drum-Table-PNG-File.png" height="75px" width="75px" onClick={() => handleImageClick('drum')}></img></div>
                    <div><img src="https://www.pngmart.com/files/16/Piano-Instrument-PNG-Image.png" height="75px" width="75px" onClick={() => handleImageClick('piano')}></img></div>
                    <div><img src="https://www.pngmart.com/files/15/Yellow-Vector-Acoustic-Guitar-PNG.png" height="75px" width="75px" onClick={() => handleImageClick('guitar')}></img></div>
                    <div><img src="https://www.pngmart.com/files/7/Drum-Table-PNG-File.png" height="75px" width="75px" onClick={() => handleImageClick('drum')}></img></div>
                    <div><img src="https://www.pngmart.com/files/16/Piano-Instrument-PNG-Image.png" height="75px" width="75px" onClick={() => handleImageClick('piano')}></img></div>
                    <div><img src="https://www.pngmart.com/files/15/Yellow-Vector-Acoustic-Guitar-PNG.png" height="75px" width="75px" onClick={() => handleImageClick('guitar')}></img></div>
                   </div>     
      {
        auth.id ? (
          <>
            <nav className='all'>
            <Link to='/products'>Products ({ products.length })</Link>
            <Link to='/ranking'>ranking</Link>
            <Link to='/topten'>topten</Link>
              {/* <Link to='/orders'>Orders ({ orders.filter(order => !order.is_cart).length })</Link>
              <Link to='/cart'>Cart ({ cartCount })</Link> */}
              <span className='all'>
                Welcome { auth.username }!
                <button onClick={ logout }>Logout</button>
              </span>
            </nav>
            <main className='all'>
            <Routes>
              <Route path='/products' element={
                <Products
                auth = { auth }
                products={ products }
                cartItems = { cartItems }
                createLineItem = { createLineItem }
                updateLineItem = { updateLineItem }
                ranking={ranking}
                createTopTen={createTopTen}
                topten={topten}
                users={users}
                setTopTen={setTopTen}
                />}/>

              <Route path='/ranking' element={
                <Ranking
                auth = { auth }
                ranking= {ranking}

              />}/>
              <Route path='/topten' element={
                <TopTen
                auth = { auth }
                ranking= {ranking}
                topten={topten}
                users={users}
                products={products}
                setTopTen={setTopTen}
              />}/>
            </Routes>
              {/* <Cart
                cart = { cart }
                lineItems = { lineItems }
                products = { products }
                updateOrder = { updateOrder }
                removeFromCart = { removeFromCart }
              />
              <Orders
                orders = { orders }
                products = { products }
                lineItems = { lineItems }
              /> */}
            </main>
            </>
        ):(
          <div className='all'>
            <Login login={ login }/>
            
          </div>
        )
      }
    </div>    </div> 
  );
};

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<HashRouter><App /></HashRouter>);
