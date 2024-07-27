import React, { useEffect, useState } from "react";
import Card from "./Card";

const Foods = ({ selectedCategory }) => {
  const [foodData, setFoodData] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null); // State for error handling

  const fetchCategory = async () => {
    try {
      setLoading(true); // Start loading
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`
      );
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await res.json();
      setFoodData(data.meals);
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false); // End loading
    }
  };

  useEffect(() => {
    fetchCategory();
  }, [selectedCategory]);

  if (loading) {
    return <div className="text-center p-6">Loading...</div>;
  }

  if (error) {
    return <div className="text-center p-6">Error: {error}</div>;
  }

  return (
    <div className="flex justify-center items-center p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {foodData.length > 0 &&
          foodData.map((food) => {
            const price = (food.idMeal % 10) + 10;
            return (
              <div key={food.idMeal} className="w-full max-w-xs">
                <Card
                  name={food.strMeal}
                  image={food.strMealThumb}
                  price={price}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Foods;
