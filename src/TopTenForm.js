import React, { useState, useEffect } from "react";
import api from "./api";

const TopTenForm = ({ auth, product, topten, setTopTen, onError, ranking }) => {
  const [rankingnumber, setRanking] = useState(1);
  const [ranking_id, setRanking_Id] = useState(null);
  const [error, setError] = useState(null);

  const handleTopTenSubmission = async (ev) => {
    ev.preventDefault();
    const selectedRank = ranking.find((rank) => rank.ranking === rankingnumber * 1);
    
    if (selectedRank) {
      // Check if the selected ranking is already in topten
      if (topten.some((item) => item.ranking_id === selectedRank.id)) {
        setError("This ranking has already been submitted.");
      } else {
        setError(null);
        setRanking_Id(selectedRank.id);

        const json = {
          user_id: auth.id,
          product_id: product.id,
          ranking_id: selectedRank.id,
        };
        const response = await api.submitTopTen(json);
        setTopTen([...topten, response]);
      }
    } else {
      setError("Invalid ranking selected.");
    }
  };

  return (
    <div>
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

      {error && <p>{error}</p>}
    </div>
  );
};

export default TopTenForm;
