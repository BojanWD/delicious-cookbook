import React from "react";
import "../scss/addrecipe.scss";
import { useParams } from "react-router-dom";
import { Row, Col, Button } from "react-bootstrap";
import { useGlobalContext } from "../context";
import { useState } from "react";
import TypeAhead from "./TypeAhead";
import { useEffect } from "react";
import { BsAsterisk } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";

const newID = String(Date.now());
const ingrRows = [...Array(21).keys()].slice(1);

export default function AddRecipe() {
  const { id } = useParams();
  const { categories, allIngredients, recipes, setRecipes, activeUser } =
    useGlobalContext();
  const [ingrCounter, setIngrCounter] = useState(1);
  const [recipe, setRecipe] = useState({
    creatorId: 0,
    idMeal: "",
    strMeal: "",
    strCategory: "",
    strMealThumb: "",
    strIngredient1: "",
    strIngredient2: "",
    strIngredient3: "",
    strIngredient4: "",
    strIngredient5: "",
    strIngredient6: "",
    strIngredient7: "",
    strIngredient8: "",
    strIngredient9: "",
    strIngredient10: "",
    strIngredient11: "",
    strIngredient12: "",
    strIngredient13: "",
    strIngredient14: "",
    strIngredient15: "",
    strIngredient16: "",
    strIngredient17: "",
    strIngredient18: "",
    strIngredient19: "",
    strIngredient20: "",
    strMeasure1: "",
    strMeasure2: "",
    strMeasure3: "",
    strMeasure4: "",
    strMeasure5: "",
    strMeasure6: "",
    strMeasure7: "",
    strMeasure8: "",
    strMeasure9: "",
    strMeasure10: "",
    strMeasure11: "",
    strMeasure12: "",
    strMeasure13: "",
    strMeasure14: "",
    strMeasure15: "",
    strMeasure16: "",
    strMeasure17: "",
    strMeasure18: "",
    strMeasure19: "",
    strMeasure20: "",
    strInstructions: "",
  });
  const [changeFocus, setChangeFocus] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (id && recipes) {
      setRecipe(recipes.filter((el) => el.idMeal === id)[0]);
      const rec = recipes.filter((el) => el.idMeal === id)[0];
      let counter = 0;
      if (rec) {
        for (let i = 1; i <= 20; i++) {
          if (rec[`strIngredient${i}`]) {
            counter++;
          }
        }
      }
      setIngrCounter(counter);
    } else {
      setRecipe((pS) => {
        return { ...pS, idMeal: newID };
      });
    }
  }, [recipes]);

  const chooseIngredient = (ingredient, n) => {
    setRecipe((pS) => {
      return { ...pS, [`strIngredient${n}`]: ingredient.toLowerCase() };
    });
  };

  const submitRecipe = (e) => {
    console.log(id, newID);
    if (
      recipe.strMeal === "" ||
      recipe.strCategory === "" ||
      recipe.strMealThumb === "" ||
      recipe.strInstructions === "" ||
      recipe.strIngredient1 === "" ||
      recipe.strIngredient2 === ""
    ) {
      return;
    }
    e.preventDefault();
    if (id) {
      setRecipes((pS) => {
        return pS.map((el) => {
          if (el.idMeal === recipe.idMeal) {
            return recipe;
          }
          return el;
        });
      });
    } else {
      recipe.creatorId = activeUser.id;
      setRecipes((pS) => {
        return [recipe, ...pS];
      });
    }
    navigate("/");
  };

  if (Object.keys(activeUser).length === 0) {
    return (
      <Row className="justify-content-center pt-3">
        <Col className="text-center">
          <h1>Add Recipe</h1>
          <p className="my-3">You must be logged in to add recipes.</p>
          Click here to <Link to="/signin">Sign In</Link>.
        </Col>
      </Row>
    );
  }
  if (
    recipe &&
    id &&
    !(activeUser.id === recipe.creatorId || activeUser.id === 0)
  ) {
    return (
      <Row className="justify-content-center pt-3">
        <Col className="text-center">
          <h1>Add Recipe</h1>
          <p className="my-3">You can only edit your recipes.</p>
          Click here to <Link to="/signin">Sign In</Link>.
        </Col>
      </Row>
    );
  }

  if (
    (recipe &&
      id &&
      (activeUser.id === 0 || activeUser.id === recipe.creatorId)) ||
    (recipe && !id)
  ) {
    return (
      <>
        <div
          onClick={() => {
            setChangeFocus(!changeFocus);
          }}
        >
          <Row className="justify-content-center pt-3">
            <Col className="text-center">
              <h1>Add Recipe</h1>
              <p>
                <BsAsterisk className="asterisk" /> required field
              </p>
            </Col>
          </Row>
          <form onSubmit={submitRecipe}>
            <Row className="justify-content-center ">
              <Col lg={6} sm={12} className="my-2">
                <Row className="justify-content-center">
                  <label
                    htmlFor="name"
                    className="col-sm-3 col-lg-3 col-form-label"
                  >
                    Name:
                    <sup>
                      <BsAsterisk className="asterisk ms-1" />
                    </sup>
                  </label>
                  <div className="col-sm-9 col-lg-9">
                    <input
                      type="text"
                      className="form-control"
                      required
                      id="name"
                      placeholder="Meal name"
                      value={recipe.strMeal}
                      onChange={(e) => {
                        setRecipe((pS) => {
                          return { ...pS, strMeal: e.target.value };
                        });
                      }}
                    ></input>
                  </div>
                </Row>
              </Col>
              <Col lg={6} sm={12} className="my-2">
                <Row className="justify-content-center">
                  <label
                    htmlFor="category"
                    className="col-sm-3 col-lg-3 col-form-label"
                  >
                    Category:
                    <sup>
                      <BsAsterisk className="asterisk ms-1" />
                    </sup>
                  </label>
                  <div className="col-sm-9 col-lg-9">
                    <select
                      className="form-select"
                      required
                      value={recipe.strCategory}
                      onChange={(e) =>
                        setRecipe((pS) => {
                          return { ...pS, strCategory: e.target.value };
                        })
                      }
                    >
                      <option value={""}>Choose meal category</option>
                      {categories.map((el) => {
                        if (el === "all") {
                          return;
                        } else {
                          return (
                            <option key={el} value={el}>
                              {el}
                            </option>
                          );
                        }
                      })}
                    </select>
                  </div>
                </Row>
              </Col>
            </Row>
            <Row className="justify-content-center  ">
              <Col lg={6} sm={12} className="my-2">
                <Row className="justify-content-center">
                  <label
                    htmlFor="image"
                    className="col-sm-3 col-lg-3 col-form-label"
                  >
                    Image:
                    <sup>
                      <BsAsterisk className="asterisk ms-1" />
                    </sup>
                  </label>
                  <div className="col-sm-9 col-lg-9">
                    <input
                      type="text"
                      className="form-control"
                      id="img"
                      placeholder="Enter image URL"
                      value={recipe.strMealThumb}
                      onChange={(e) => {
                        setRecipe((pS) => {
                          return { ...pS, strMealThumb: e.target.value };
                        });
                      }}
                    ></input>
                  </div>
                </Row>
              </Col>
              <Col lg={6} sm={12} className="my-2">
                <Row className="justify-content-center">
                  <label
                    htmlFor="instructions"
                    className="col-sm-3 col-lg-3 col-form-label"
                  >
                    Instructions:
                    <sup>
                      <BsAsterisk className="asterisk ms-1" />
                    </sup>
                  </label>
                  <div className="col-sm-9 col-lg-9">
                    <textarea
                      className="form-control"
                      id="instructions"
                      rows="3"
                      placeholder="Enter detailed instructions on how to make the meal"
                      value={recipe.strInstructions}
                      onChange={(e) => {
                        setRecipe((pS) => {
                          return {
                            ...pS,
                            strInstructions: e.target.value,
                          };
                        });
                      }}
                    ></textarea>
                  </div>
                </Row>
              </Col>
            </Row>
            <Row className="justify-content-center pt-2">
              <Col className="text-center" lg={6}>
                <h1>Ingredients</h1>
                <p>
                  Please enter ingredients and their measures. Use existing
                  ingredients names from the typeahead dropdown whenever
                  possible to make further searches easier and recipes better
                  organized.
                  <br /> A meal must have at least two recipes.
                </p>
              </Col>
            </Row>
            <Row className="justify-content-center">
              <Col lg={6} sm={12} className="my-2"></Col>
              <Col lg={6} sm={12} className="my-2"></Col>
            </Row>
            {ingrRows.map((el) => {
              return (
                <React.Fragment key={el}>
                  <Row
                    className={
                      el <= ingrCounter ? "justify-content-center" : "none"
                    }
                  >
                    <Col lg={6} sm={12} className="my-2">
                      <Row className="justify-content-center">
                        <label
                          htmlFor={`ingredient${el}`}
                          className="col-sm-3 col-lg-3 col-form-label"
                        >
                          {`Ingredient ${el}`}:
                          <sup>
                            <BsAsterisk
                              className={el <= 2 ? "asterisk ms-1" : "none"}
                            />
                          </sup>
                        </label>
                        <div className="col-sm-9 col-lg-9">
                          <TypeAhead
                            ingredients={allIngredients}
                            n={el}
                            chooseIngredient={chooseIngredient}
                            value={recipe[`strIngredient${el}`]}
                          />
                        </div>
                      </Row>
                    </Col>
                    <Col lg={6} sm={12} className="my-2">
                      <Row className="justify-content-center">
                        <label
                          htmlFor={`measure${el}`}
                          className="col-sm-3 col-lg-3 col-form-label"
                        >
                          {`Measure ${el}`}:
                          <sup>
                            <BsAsterisk
                              className={el <= 2 ? "asterisk ms-1" : "none"}
                            />
                          </sup>
                        </label>
                        <div className="col-sm-9 col-lg-9">
                          <input
                            type="text"
                            className="form-control"
                            id={`measure${el}`}
                            placeholder={`Measure for ingredient ${el}`}
                            value={recipe[`strMeasure${el}`]}
                            onChange={(e) => {
                              setRecipe((pS) => {
                                return {
                                  ...pS,
                                  [`strMeasure${el}`]: e.target.value,
                                };
                              });
                            }}
                          ></input>
                        </div>
                      </Row>
                    </Col>
                  </Row>
                  <Row className="justify-content-center">
                    <Col lg={2}>
                      <Button
                        className={
                          el === ingrCounter ? "my-3 mx-auto block" : "none"
                        }
                        onClick={() =>
                          setIngrCounter((pS) => {
                            if (pS >= 20) {
                              return pS;
                            }
                            return pS + 1;
                          })
                        }
                      >
                        Another ingredient
                      </Button>
                    </Col>
                  </Row>
                </React.Fragment>
              );
            })}
            <Row className="justify-content-center">
              <Col lg={2}>
                <Button
                  disabled={
                    !recipe.strIngredient1 ||
                    !recipe.strIngredient2 ||
                    !recipe.strCategory ||
                    !recipe.strMeal ||
                    !recipe.strMealThumb ||
                    !recipe.strInstructions
                  }
                  type="submit"
                  className="mx-auto block"
                >
                  {id ? "Edit recipe" : "Add recipe"}
                </Button>
              </Col>
            </Row>
          </form>
        </div>
      </>
    );
  }
}
