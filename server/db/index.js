const client = require('./client');
const path = require('path');
const fs = require('fs')

const {
  fetchProducts,
  createProduct
} = require('./products');

const {
  fetchRanking,
  createRanking
} = require('./ranking');

const {
  createUser,
  authenticate,
  findUserByToken,
  fetchUsers,
  fetchUser,
  updateUser
} = require('./auth');

const {
  fetchTopTen,
  createTopTen,
  fetchAllTopTen,
} = require('./topten');

const loadImage = (filepath) => {
  return new Promise((resolve, reject) => {
    const fullPath = path.join(__dirname, filepath)
    fs.readFile(fullPath, 'base64', (error, result) => {
      if (error) {
        reject(error)
      } else {
        resolve(`data:image/png;base64,${result}`)
      }
    });  
  });
}
const seed = async()=> {
  const productImage = await loadImage('images/product-placeholder.png')
  const SQL = `
    DROP TABLE IF EXISTS topten CASCADE;
    DROP TABLE IF EXISTS ranking CASCADE;
    DROP TABLE IF EXISTS line_items CASCADE;
    DROP TABLE IF EXISTS products CASCADE;
    DROP TABLE IF EXISTS orders CASCADE;
    DROP TABLE IF EXISTS users CASCADE;

    CREATE TABLE users(
      id UUID PRIMARY KEY,
      created_at TIMESTAMP DEFAULT now(),
      username VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(100) NOT NULL,
      is_admin BOOLEAN DEFAULT false NOT NULL
    );

    CREATE TABLE products(
      id UUID PRIMARY KEY,
      created_at TIMESTAMP DEFAULT now(),
      name VARCHAR(100) UNIQUE NOT NULL,
      description VARCHAR(1600),
      image TEXT DEFAULT '${productImage}'
    );

    CREATE TABLE orders(
      id UUID PRIMARY KEY,
      created_at TIMESTAMP DEFAULT now(),
      is_cart BOOLEAN NOT NULL DEFAULT true,
      user_id UUID REFERENCES users(id) NOT NULL
    );

    CREATE TABLE line_items(
      id UUID PRIMARY KEY,
      created_at TIMESTAMP DEFAULT now(),
      product_id UUID REFERENCES products(id) NOT NULL,
      order_id UUID REFERENCES orders(id) NOT NULL,
      quantity INTEGER DEFAULT 1,
      CONSTRAINT product_and_order_key UNIQUE(product_id, order_id)
    );
    CREATE TABLE ranking(
      id UUID PRIMARY KEY,
      ranking INTEGER DEFAULT 0 NOT NULL UNIQUE
    );
    CREATE TABLE topten(
      id UUID PRIMARY KEY,
      product_id UUID REFERENCES products(id) NOT NULL,
      user_id UUID REFERENCES users(id) NOT NULL,
      ranking_id UUID REFERENCES ranking(id) NOT NULL,
      CONSTRAINT product_and_user_and_ranking_key UNIQUE(product_id, user_id)
    
    )
  `;
  await client.query(SQL);

  const [ted, patti, isaac, moe] = await Promise.all([
    createUser({ username: 'ted', password: 't_password', is_admin: true}),
    createUser({ username: 'patti', password: 'p_password', is_admin: true}),
    createUser({ username: 'isaac', password: '1234', is_admin: true}),
    createUser({ username: 'moe', password: 'm_password', is_admin: false})
  ]);
  const [GoodnightMoon, Jumanji, FrogAndToadAreFriends, PressHere, IfYouGiveAMouseACookie,TheVeryQuietCricket, TheLionAndTheMouse, Stuck, GoDogGo, WhereTheWildThingsAre ] = await Promise.all([
    createProduct({ name: 'Goodnight Moon' , image: 'https://www.weareteachers.com/wp-content/uploads/Goodnight-moon.jpeg', description:'hello world'}),
    createProduct({ name: 'Jumanji', image:'https://www.weareteachers.com/wp-content/uploads/Jumanji-by-Chris-Van-Allsburg-2000x1751.jpeg' }),
    createProduct({ name: 'Frog and Toad Are Friends' , image: 'https://www.weareteachers.com/wp-content/uploads/Frog-and-Toad-Are-Friends-by-Arnold-Lobel-1365x2048.jpeg', description:'hello world'}),
    createProduct({ name: 'Press Here', image:'https://www.weareteachers.com/wp-content/uploads/Press-Here-by-Herve-Tullet-2000x2003.jpeg' }),
    createProduct({ name: 'If You Give A Mouse A Cookie' , image: 'https://www.weareteachers.com/wp-content/uploads/If-You-Give-a-Mouse-a-Cookie-by-Laura-Numeroff.jpeg', description:'hello world'}),
    createProduct({ name: 'The Very Quiet Cricket', image:'https://www.weareteachers.com/wp-content/uploads/The-Very-Quiet-Cricket-by-Eric-Carle-2000x1441.jpeg' }),
    createProduct({ name: 'The Lion and The Mouse' , image: 'https://www.weareteachers.com/wp-content/uploads/The-Lion-and-the-Mouse-by-Jerry-Pinkney-2000x1729.jpeg', description:'hello world'}),
    createProduct({ name: 'Stuck', image:'https://www.weareteachers.com/wp-content/uploads/Stuck-by-Oliver-Jeffers-1440x2048.jpeg' }),
    createProduct({ name: 'Go Dog Go' , image: 'https://www.weareteachers.com/wp-content/uploads/Go-Dog.-Go-by-P.D.-Eastman-1494x2048.jpeg', description:'hello world'}),
    createProduct({ name: 'Where The Wild Things Are', image:'https://upload.wikimedia.org/wikipedia/en/8/8d/Where_The_Wild_Things_Are_%28book%29_cover.jpg' }),
  ]);
  const [one, two, three, four, five, six, seven, eight, nine, ten] = await Promise.all([
    createRanking({ ranking: 1 }),
    createRanking({ ranking: 2 }),
    createRanking({ ranking: 3 }),
    createRanking({ ranking: 4}),
    createRanking({ ranking: 5 }),
    createRanking({ ranking: 6 }),
    createRanking({ ranking: 7 }),
    createRanking({ ranking: 8 }),
    createRanking({ ranking: 9 }),
    createRanking({ ranking: 10 })
    
  ]);
  console.log(GoodnightMoon.id)
  const [alpha] = await Promise.all([
    createTopTen({ product_id: GoodnightMoon.id, user_id: isaac.id, ranking_id: ten.id})
  ]);
 
};

module.exports = {
  fetchProducts,
  authenticate,
  findUserByToken,
  fetchUsers,
  fetchUser,
  updateUser,
  seed,
  fetchRanking,
  createRanking,
  fetchTopTen,
  createTopTen,
  fetchUsers,
  fetchAllTopTen,
  createUser,
  client
};
