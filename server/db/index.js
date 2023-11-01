const client = require('./client');

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
  findUserByToken
} = require('./auth');

const {
  fetchLineItems,
  createLineItem,
  updateLineItem,
  deleteLineItem,
  updateOrder,
  fetchOrders
} = require('./cart');


const seed = async()=> {
  const SQL = `
    DROP TABLE IF EXISTS ranking;
    DROP TABLE IF EXISTS line_items;
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
      name VARCHAR(100) UNIQUE NOT NULL
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
  `;
  await client.query(SQL);

  const [moe, lucy, ethyl] = await Promise.all([
    createUser({ username: 'moe', password: 'm_password', is_admin: false}),
    createUser({ username: 'lucy', password: 'l_password', is_admin: false}),
    createUser({ username: 'ethyl', password: '1234', is_admin: true})
  ]);
  const [foo, bar, bazz] = await Promise.all([
    createProduct({ name: 'foo' }),
    createProduct({ name: 'bar' }),
    createProduct({ name: 'bazz' }),
    createProduct({ name: 'quq' }),
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
  let orders = await fetchOrders(ethyl.id);
  let cart = orders.find(order => order.is_cart);
  let lineItem = await createLineItem({ order_id: cart.id, product_id: foo.id});
  lineItem.quantity++;
  await updateLineItem(lineItem);
  lineItem = await createLineItem({ order_id: cart.id, product_id: bar.id});
  cart.is_cart = false;
  await updateOrder(cart);
};

module.exports = {
  fetchProducts,
  fetchOrders,
  fetchLineItems,
  createLineItem,
  updateLineItem,
  deleteLineItem,
  updateOrder,
  authenticate,
  findUserByToken,
  seed,
  fetchRanking,
  createRanking,
  client
};
