import axios from 'axios';

const getHeaders = ()=> {
  return {
    headers: {
      authorization: window.localStorage.getItem('token')
    }
  };
};

const fetchProducts = async(setProducts)=> {
  const response = await axios.get('/api/products');
  setProducts(response.data);
};

const fetchUsers = async(setUsers) => {
  const response = await axios.get('/api/users');
  setUsers(response.data);
}

const fetchRanking = async(setRanking)=> {
  const response = await axios.get('/api/ranking');
  setRanking(response.data);
};
const fetchAllTopTen = async(setAllTopTen)=> {
  const response = await axios.get('/api/topten/all');
  setAllTopTen(response.data);
};

const fetchTopTen = async(setTopTen)=> {
  const response = await axios.get('/api/topten', getHeaders());
  setTopTen(response.data);
};

const submitTopTen = async (json) => {
  const response = await axios.post('/api/topten', json)
  return response.data
};
const attemptLoginWithToken = async(setAuth)=> {
  const token = window.localStorage.getItem('token');
  if(token){
    try {
      const response = await axios.get('/api/me', getHeaders());
      setAuth(response.data);
    }
    catch(ex){
      if(ex.response.status === 401){
        window.localStorage.removeItem('token');
      }
    }
  }
}

const login = async({ credentials, setAuth })=> {
  const response = await axios.post('/api/login', credentials);
  const { token } = response.data;
  window.localStorage.setItem('token', token);
  attemptLoginWithToken(setAuth);
}

const logout = (setAuth)=> {
  window.localStorage.removeItem('token');
  setAuth({});
}

const createUser = async(user) => {
  await axios.post('/api/users', user);
}

const updateUser = async(user) => {
  const response = await axios.put(`/api/users/${user.id}`, user);
  return response.data;
}

const api = {
  login,
  logout,
  fetchProducts,
  attemptLoginWithToken,
  fetchRanking,
  fetchTopTen,
  fetchUsers,
  submitTopTen,
  createUser,
  updateUser,
  fetchAllTopTen
};

export default api;
