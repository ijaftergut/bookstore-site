import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Link, HashRouter, Routes, Route } from 'react-router-dom';
import Products from './Products';
import Login from './Login';
import api from './api';
import Ranking from './Ranking';
import TopTen from './TopTen'
import Admin from './Admin';
import './index.css'
const App = ()=> {
  const [products, setProducts] = useState([]);
  const [auth, setAuth] = useState({});
  const [ranking, setRanking] = useState([]);
  const [topten, setTopTen] = useState([]);
  const [allTopTen, setAllTopTen]=useState([])
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

  useEffect(() => {
    if(auth){
      const fetchData = async() => {
        await api.fetchUsers(setUsers);
      }
      fetchData();
    }
  }, [auth])

  useEffect(()=> {
    const fetchData = async()=> {
      await api.fetchRanking(setRanking);
    };
    fetchData();
  }, []);
  useEffect(()=> {
    const fetchData = async()=> {
      await api.fetchAllTopTen(setAllTopTen);
    };
    fetchData();
  }, []);

  useEffect(()=> {
    if(auth.id){
      const fetchData = async()=> {
        await api.fetchTopTen(setTopTen);
      };
      fetchData();
    }
  }, [auth]);

  const createTopTen = async(topten)=> {
    await api.createTopTen({ topten, cart, lineItems, setTopTen});
  };
  

  const login = async(credentials)=> {
    await api.login({ credentials, setAuth });
  }

  const logout = ()=> {
    api.logout(setAuth);
  }
  const [scores, setScores] = useState({
    library: 0,
  });
  let handleImageClick = (image) => {
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
                   <div><img src="https://www.pngmart.com/files/23/Library-PNG-Photo.png" height="75px" width="75px" onClick={() => handleImageClick('library')}></img></div>
                    <div><img src="https://www.pngmart.com/files/23/Library-PNG-Clipart.png" height="75px" width="75px" onClick={() => handleImageClick('library')}></img></div>
                    <div><img src="https://www.pngmart.com/files/23/Library-PNG.png" height="75px" width="75px" onClick={() => handleImageClick('library')}></img></div>
                    <div><img src="https://www.pngmart.com/files/23/Library-PNG-Photo.png" height="75px" width="75px" onClick={() => handleImageClick('library')}></img></div>
                    <div><img src="https://www.pngmart.com/files/23/Library-PNG-Clipart.png" height="75px" width="75px" onClick={() => handleImageClick('library')}></img></div>
                    <div><img src="https://www.pngmart.com/files/23/Library-PNG.png" height="75px" width="75px" onClick={() => handleImageClick('library')}></img></div>
                    <div><img src="https://www.pngmart.com/files/23/Library-PNG-Photo.png" height="75px" width="75px" onClick={() => handleImageClick('library')}></img></div>
                    <div><img src="https://www.pngmart.com/files/23/Library-PNG-Clipart.png" height="75px" width="75px" onClick={() => handleImageClick('library')}></img></div>
                    <div><img src="https://www.pngmart.com/files/23/Library-PNG.png" height="75px" width="75px" onClick={() => handleImageClick('library')}></img></div>
                    <div><img src="https://www.pngmart.com/files/23/Library-PNG-Photo.png" height="75px" width="75px" onClick={() => handleImageClick('library')}></img></div>
                  </div>
                  <div className="leaf leaf1">
                  <div><img src="https://www.pngmart.com/files/23/Library-PNG-Photo.png" height="75px" width="75px" onClick={() => handleImageClick('library')}></img></div>
                    <div><img src="https://www.pngmart.com/files/23/Library-PNG-Clipart.png" height="75px" width="75px" onClick={() => handleImageClick('library')}></img></div>
                    <div><img src="https://www.pngmart.com/files/23/Library-PNG.png" height="75px" width="75px" onClick={() => handleImageClick('library')}></img></div>
                    <div><img src="https://www.pngmart.com/files/23/Library-PNG-Photo.png" height="75px" width="75px" onClick={() => handleImageClick('library')}></img></div>
                    <div><img src="https://www.pngmart.com/files/23/Library-PNG-Clipart.png" height="75px" width="75px" onClick={() => handleImageClick('library')}></img></div>
                    <div><img src="https://www.pngmart.com/files/23/Library-PNG.png" height="75px" width="75px" onClick={() => handleImageClick('library')}></img></div>
                    <div><img src="https://www.pngmart.com/files/23/Library-PNG-Photo.png" height="75px" width="75px" onClick={() => handleImageClick('library')}></img></div>
                    <div><img src="https://www.pngmart.com/files/23/Library-PNG-Clipart.png" height="75px" width="75px" onClick={() => handleImageClick('library')}></img></div>
                    <div><img src="https://www.pngmart.com/files/23/Library-PNG.png" height="75px" width="75px" onClick={() => handleImageClick('library')}></img></div>
                    <div><img src="https://www.pngmart.com/files/23/Library-PNG-Photo.png" height="75px" width="75px" onClick={() => handleImageClick('library')}></img></div>
                  </div>
                  <div className="leaf leaf2">
                  <div><img src="https://www.pngmart.com/files/23/Library-PNG-Photo.png" height="75px" width="75px" onClick={() => handleImageClick('library')}></img></div>
                    <div><img src="https://www.pngmart.com/files/23/Library-PNG-Clipart.png" height="75px" width="75px" onClick={() => handleImageClick('library')}></img></div>
                    <div><img src="https://www.pngmart.com/files/23/Library-PNG.png" height="75px" width="75px" onClick={() => handleImageClick('library')}></img></div>
                    <div><img src="https://www.pngmart.com/files/23/Library-PNG-Photo.png" height="75px" width="75px" onClick={() => handleImageClick('library')}></img></div>
                    <div><img src="https://www.pngmart.com/files/23/Library-PNG-Clipart.png" height="75px" width="75px" onClick={() => handleImageClick('library')}></img></div>
                    <div><img src="https://www.pngmart.com/files/23/Library-PNG.png" height="75px" width="75px" onClick={() => handleImageClick('library')}></img></div>
                    <div><img src="https://www.pngmart.com/files/23/Library-PNG-Photo.png" height="75px" width="75px" onClick={() => handleImageClick('library')}></img></div>
                    <div><img src="https://www.pngmart.com/files/23/Library-PNG-Clipart.png" height="75px" width="75px" onClick={() => handleImageClick('library')}></img></div>
                    <div><img src="https://www.pngmart.com/files/23/Library-PNG.png" height="75px" width="75px" onClick={() => handleImageClick('library')}></img></div>
                    <div><img src="https://www.pngmart.com/files/23/Library-PNG-Photo.png" height="75px" width="75px" onClick={() => handleImageClick('library')}></img></div>
                  </div>  
      {
        auth.id ? (
          <>
            <nav className='all'>
            <Link to='/products'>Products ({ products.length })</Link>
            <Link to='/ranking'>ranking</Link>
            <Link to='/topten'>topten</Link>
            <Link to='/admin'>admin</Link>
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
              <Route path='/admin' element={
                  <Admin
                    users={users}
                    setUsers={setUsers}
                    products={products}
                    setProducts={setProducts}
                    auth={auth}
                    topten={allTopTen}
                    ranking={ranking}
                  />}/>
            </Routes>

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
