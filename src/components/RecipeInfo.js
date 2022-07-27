import React from "react";
import "../scss/recipeInfo.scss";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useGlobalContext } from "../context";
import { Link } from "react-router-dom";
import { Row, Col, Table } from "react-bootstrap";

export default function RecipeInfo() {
  const { id } = useParams();
  const { recipes } = useGlobalContext();
  const [recipe, setRecipe] = useState({});

  const ingredientRows = [
    "strIngredient1",
    "strIngredient2",
    "strIngredient3",
    "strIngredient4",
    "strIngredient5",
    "strIngredient6",
    "strIngredient7",
    "strIngredient8",
    "strIngredient9",
    "strIngredient10",
    "strIngredient11",
    "strIngredient12",
    "strIngredient13",
    "strIngredient14",
    "strIngredient15",
    "strIngredient16",
    "strIngredient17",
    "strIngredient18",
    "strIngredient19",
    "strIngredient20",
  ];

  useEffect(() => {
    setRecipe(recipes.filter((el) => el.idMeal === id)[0]);
  }, [recipes]);

  //console.log(recipe);
  if (recipe) {
    return (
      <>
        <Row>
          <h1 className="recipe-name">{recipe.strMeal}</h1>
          <Col className="upper-col" lg={6} md={12}>
            <div className="img-holder">
              <img src={recipe.strMealThumb} alt="{recipe.strMeal}" />
              {recipe.strTags && (
                <div className="tag-list">
                  {recipe.strTags.split(",").map((el) => {
                    return (
                      <button className="btn btn-primary tag" key={el}>
                        {el}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </Col>
          <Col lg={6} md={12}>
            {" "}
            <div className="instructions">
              <h4>Instructions</h4>
              <p>{recipe.strInstructions}</p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table striped hover>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Ingredient</th>
                  <th>Measure</th>
                </tr>
              </thead>
              <tbody>
                {ingredientRows.map((el, i) => {
                  return (
                    recipe[el] && (
                      <tr key={el}>
                        <td>{+i + 1}</td>
                        <td>{recipe[el]}</td>
                        <td>{recipe[`strMeasure${+i + 1}`]}</td>
                      </tr>
                    )
                  );
                })}
              </tbody>
            </Table>
            <div className="flex-c">
              {" "}
              <Link className="btn btn-primary" to="/">
                Back Home
              </Link>
            </div>
          </Col>
        </Row>
      </>
    );
  }
}
