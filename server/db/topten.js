const client = require('./client');
const { v4 } = require('uuid');
const uuidv4 = v4;

const fetchTopTen = async(userId)=> {
  const SQL = `
    SELECT topten.* 
    FROM
    topten
    JOIN products
    ON products.id = topten.product_id
    JOIN users
    ON users.id = topten.user_id
    WHERE users.id = $1
    ORDER BY product_id
  `;
  const response = await client.query(SQL, [ userId ]);
  return response.rows;
};

// const createTopTen = async(topten)=> {
//   const SQL = `
//   INSERT INTO topten (products_id, users_id, id) VALUES($1, $2, $3) RETURNING *
// `;
//  response = await client.query(SQL, [ topten.products_id, topten.users_id, uuidv4()]);
//   return response.rows[0];
// };

module.exports = {
  fetchTopTen,
//   createTopTen,
};
