import React from 'react';

const TopTen = ({ auth, topten, users, products, setTopTen, ranking }) => {
  const user = users.find((user) => user.id === auth.id);

  // Function to compare products by ranking2.ranking
  const compareProductsByRanking = (rankA, rankB) => {
    const rankingA = ranking.find((rank2) => rank2.id === rankA.ranking_id);
    const rankingB = ranking.find((rank2) => rank2.id === rankB.ranking_id);

    return rankingA.ranking - rankingB.ranking;
  };

  const sortedTopTen = topten
    .filter((rank) => rank.user_id === user.id)
    .sort(compareProductsByRanking);

  return (
    <div>
      <h2>Top Ten</h2>
      <ul>
        {sortedTopTen.map((rank) => {
          const product = products.find((product) => product.id === rank.product_id) || {};

          return (
            <li key={rank.id}>
              {product.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TopTen;
