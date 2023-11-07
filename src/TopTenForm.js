import React, { useState, useEffect } from "react";
import api from "./api";

const TopTenForm = ({  auth, product,  topten, setTopTen, onError, ranking }) => {

  const [rankingnumber, setRanking] = useState(1);
  const [ranking_id, setRanking_Id] = useState(null);
 
  const handleTopTenSubmission = async (ev) => {
    ev.preventDefault()
      const rank = ranking.find(rank=>rank.ranking===rankingnumber*1)
      if (rank) {
        // Use the rank.id directly and set it in the state
        setRanking_Id(rank.id);
    
        const json = {
          user_id: auth.id,
          product_id: product.id,
          ranking_id: rank.id, // Use the updated state value
        };
        const response = await api.submitTopTen(json);
        setTopTen([...topten, response]);
      }
  };
 
  return (
    <div>
      {
        <form onSubmit={handleTopTenSubmission}>
          <label>
            TopTen:
            <input
              type="number"
              value={rankingnumber}
              onChange={(e) => setRanking(parseInt(e.target.value, 10))}
              min="1"
              max="10"
              required
            />
          </label>
          

          <button type="submit">Submit TopTen</button>
        </form>
      }
    </div>
  );
};

export default TopTenForm;