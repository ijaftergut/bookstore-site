const client = require('./client');
const { v4 } = require('uuid');
const uuidv4 = v4;

const fetchRanking = async()=> {
  const SQL = `
    SELECT *
    FROM ranking
  `;
  const response = await client.query(SQL);
  return response.rows;
};
const createRanking = async(ranking)=> {
    const SQL = `
      INSERT INTO ranking (id, ranking) VALUES($1, $2) RETURNING *
    `;
    const response = await client.query(SQL, [ uuidv4(), ranking.ranking]);
    return response.rows[0];
  };
  
module.exports = {
  fetchRanking,
  createRanking
};
