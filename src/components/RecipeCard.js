import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../scss/recipeCard.scss";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { useGlobalContext } from "../context";

export default function RecipeCard({ recipeDetails }) {
  const { activeUser, setRecipes } = useGlobalContext();
  const [flip, setFlip] = useState(false);
  const {
    creatorId,
    idMeal,
    strMeal,
    strMealThumb,
    strIngredient1,
    strIngredient2,
    strIngredient3,
    strIngredient4,
    strIngredient5,
  } = recipeDetails;

  const onDelete = (event) => {
    event.stopPropagation();
    const answer = window.confirm(
      "Are you sure you want to delete this recipe?"
    );
    if (answer) {
      setRecipes((pS) => {
        return pS.filter((el) => {
          return el.idMeal !== idMeal;
        });
      });
    } else {
      console.log("recipe not deleted");
    }
  };

  return (
    <div
      className={`card ${flip ? "flip" : ""}`}
      onClick={() => {
        setFlip(!flip);
      }}
    >
      {/* frontside */}
      <div className="front card-h">
        <img src={strMealThumb} alt={strMeal} className="cardImg" />
        <h5 className="card-title">
          {" "}
          {strMeal.length < 25
            ? `${strMeal}`
            : `${strMeal.substring(0, 20)}...`}
        </h5>
      </div>
      {/* backside */}
      <div className="card-h back">
        <h5 className="card-title">Main ingredients</h5>
        <ul>
          <li>
            <p>{strIngredient1}</p>
          </li>
          <li>
            <p>{strIngredient2}</p>
          </li>
          <li>
            <p>{strIngredient3}</p>
          </li>
          <li>
            <p>{strIngredient4}</p>
          </li>
          <li>
            <p>{strIngredient5}</p>
          </li>
        </ul>
        <Link className="btn btn-primary" to={`/recipe/${idMeal}`}>
          See Recipe
        </Link>
        {Object.keys(activeUser).length !== 0 &&
          (activeUser.id === 0 || creatorId === activeUser.id) && (
            <div className="edit-delete-container">
              <Link className="text-dark" to={`/add/${idMeal}`}>
                <BiEdit className="edit" />
              </Link>
              <MdDelete className="delete" onClick={onDelete} />
            </div>
          )}
      </div>
    </div>
  );
}
