import { useEffect, useState } from "react";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(
      "https://react-http-93006-default-rtdb.europe-west1.firebasedatabase.app/meals.json"
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if(data === null) {
          throw new Error("Something went wrong !!");
        }
        const transformedMeals = [];
        for (const key in data) {
          const meal = data[key];
          transformedMeals.push({ ...meal, id: key });
        }

        setMeals(transformedMeals);
        setIsLoading(false);
        setError(null);
      })
      .catch((error) => {
        setError("Something went wrong");
        setIsLoading(false);
        console.log(error);
      });
  }, []);
  const mealsList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
  return (
    <section className={classes.meals}>
      <Card>
        {isLoading && !error && <p>Loading ...</p>}
        {!isLoading && !error && <ul>{mealsList}</ul>}
        {error && <p>{error.toString()}</p>}
      </Card>
    </section>
  );
};

export default AvailableMeals;
