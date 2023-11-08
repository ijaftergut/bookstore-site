import React, { useEffect, useRef, useState } from 'react';
import api from './api';
import { useNavigate } from 'react-router-dom';

const Admin = ({ topten, users, products, auth, ranking }) => {
  const navigate = useNavigate();
  const el = useRef();

  if (!auth.is_admin) return <p>Access Denied</p>;

  const [productStats, setProductStats] = useState([]);

  useEffect(() => {
    const productStatsData = products.map(product => {
      const productRankings = ranking.map(rank => {
        const votes = topten.filter(item => item.product_id === product.id && item.ranking_id === rank.id).length;
        return { ranking: rank.ranking, votes };
      });
      return { productName: product.name, rankings: productRankings };
    });

    setProductStats(productStatsData);
  }, [topten, products, ranking]);

  const [userTopten, setUserTopten] = useState([]);

  useEffect(() => {
    const updatedUserTopten = users.map(user => {
      const userToptenData = topten
        .filter(item => item.user_id === user.id)
        .sort((a, b) => {
          const rankingA = ranking.find(rank => rank.id === a.ranking_id);
          const rankingB = ranking.find(rank => rank.id === b.ranking_id);
          return (
            parseInt(rankingA.ranking, 10) - parseInt(rankingB.ranking, 10)
          );
        });
      return { userId: user.id, userTopten: userToptenData };
    });

    setUserTopten(updatedUserTopten);
  }, [topten, users, ranking]);

  return (
    <div>
      <h3>Product Stats</h3>
      <ul>
        {productStats.map(productStatsItem => (
          <li key={productStatsItem.productName}>
            {productStatsItem.productName}
            <ul>
              {productStatsItem.rankings.map(rank => (
                <li key={rank.ranking}>
                  {`Ranking ${rank.ranking}: Votes - ${rank.votes}`}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      <h3>Users</h3>
      <ul>
        {userTopten.map(userToptenItem => (
          <li key={userToptenItem.userId}>
            {users.find(user => user.id === userToptenItem.userId).username}
            <ul>
              {userToptenItem.userTopten.map(toptenItem => {
                const product = products.find(
                  productItem => productItem.id === toptenItem.product_id
                );
                const rank = ranking.find(rank => rank.id === toptenItem.ranking_id);
                return (
                  <li key={toptenItem.id}>
                    {product ? `${product.name} (${rank ? rank.ranking : 'N/A'})` : 'Product not found'}
                  </li>
                );
              })}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Admin;
