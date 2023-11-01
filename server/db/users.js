const client = require('./client');
const { v4 } = require('uuid');
const uuidv4 = v4;

const fetchUsers = async()=> {
  const SQL = `
    SELECT *
    FROM users
  `;
  const response = await client.query(SQL);
  return response.rows;
};

module.exports = {
  fetchUsers
};