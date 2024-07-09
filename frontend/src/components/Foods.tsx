import React, { useEffect, useState } from "react";
import Card from "./Card";

const Foods = ({ selectedCategory }) => {
  const [foodData, setFoodData] = useState([]);
  const fetchCategory = async () => {
    try {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`
      );
      const data = await res.json();
      setFoodData(data.meals);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, [selectedCategory]);

  return (
    <div className="ml-64 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {foodData.length > 0 &&
        foodData.map((food) => {
          const price = food.idMeal % 10 + 10;
          return (
            <div key={food.idMeal} className="m-5">
              <Card
                name={food.strMeal}
                image={food.strMealThumb}
                price={price}
              />
            </div>
          );
        })}
    </div>
  );
};

export default Foods;
