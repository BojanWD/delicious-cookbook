import React from "react";
import { useState } from "react";
import "../scss/search.scss";
import { useGlobalContext } from "../context";
import { Row, Button, Col } from "react-bootstrap";
import { TiDelete } from "react-icons/ti";

export default function Search() {
  const [searchType, setSearchType] = useState("name");
  const [filterIngredients, setFilterIngredients] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const {
    allIngredients,
    setSearchTerms,
    searchTerms,
    searchName,
    setSearchName,
  } = useGlobalContext();

  const handleChange = (event) => {
    setSearchType(event.target.value);
  };

  const handleSearch = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);

    if (searchType === "name") {
      setSearchName(searchWord);
    }

    if (searchType === "ingredients") {
      setSearchName("");
      const newFilter = allIngredients.filter((value) => {
        return value.toLowerCase().includes(searchWord.toLowerCase());
      });

      if (searchWord === "") {
        setFilterIngredients([]);
      } else {
        setFilterIngredients(newFilter);
      }
    }
  };

  const ingredientSearch = (ingredient) => {
    setSearchTerms((prevState) => {
      return [ingredient, ...prevState];
    });
    setFilterIngredients([]);
    setWordEntered("");
  };

  const removeIngredient = (ingredient) => {
    setSearchTerms((prevState) => {
      return prevState.filter((el) => {
        return el !== ingredient;
      });
    });
  };

  return (
    <Col md={12} lg={6}>
      <div className="form-group search-cont">
        <h5>Find recipes by name or ingredients</h5>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            id="exampleInputPassword1"
            placeholder={`Search by ${searchType}`}
            onChange={handleSearch}
            value={wordEntered}
          ></input>
          {filterIngredients.length !== 0 && searchType === "ingredients" && (
            <div className="src-options">
              {filterIngredients.slice(0, 10).map((ingredient, index) => {
                return (
                  <div
                    className="src-item"
                    key={index}
                    onClick={() => ingredientSearch(ingredient)}
                  >
                    {ingredient}
                  </div>
                );
              })}
            </div>
          )}

          <select
            className="btn btn-primary"
            name="search-type"
            onChange={handleChange}
          >
            <option value="name">Name</option>
            <option value="ingredients">Ingredients</option>
          </select>
        </div>

        {searchTerms.length !== 0 && (
          <div className="ingr-list">
            {searchTerms.map((el, i) => {
              return (
                <Button
                  variant="primary"
                  className="ingredient"
                  key={i}
                  onClick={() => removeIngredient(el)}
                >
                  {el} <TiDelete className="remove" />
                </Button>
              );
            })}
          </div>
        )}
      </div>
    </Col>
  );
}
