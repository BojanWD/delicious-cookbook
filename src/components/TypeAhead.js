import React, { useRef, useState } from "react";
import { useEffect } from "react";
import "../scss/typeAhead.scss";

export default function TypeAhead({ n, ingredients, chooseIngredient, value }) {
  const ref = useRef(null);
  const [filterIngredients, setFilterIngredients] = useState([]);

  const [wordEntered, setWordEntered] = useState(value || "");
  const [test, setTest] = useState(0);

  const handleSearch = (e) => {
    const searchWord = e.target.value;
    setWordEntered(searchWord);
    const newFilter = ingredients.filter((value) => {
      return value.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilterIngredients([]);
    } else {
      setFilterIngredients(newFilter);
      ingredientSearch(searchWord);
    }
  };

  const ingredientSearch = (ingredient) => {
    if (ingredients.includes(ingredient)) {
      chooseIngredient(ingredient, n);
      setFilterIngredients([]);
      setWordEntered(ingredient);
      return;
    }
    chooseIngredient(ingredient, n);
  };

  useEffect(() => {
    setWordEntered(value || "");
  }, [value]);

  return (
    <>
      <input
        ref={ref}
        type="text"
        className="form-control"
        id={`ingr${n}`}
        placeholder={`Ingredient ${n}`}
        onChange={handleSearch}
        value={wordEntered}
      ></input>

      {document.activeElement === ref.current &&
        filterIngredients.length !== 0 && (
          <div className="form-control">
            {filterIngredients.slice(0, 10).map((ingredient, index) => {
              return (
                <div
                  className="src-item type-ahead"
                  key={index}
                  onClick={() => ingredientSearch(ingredient)}
                >
                  {ingredient}
                </div>
              );
            })}
          </div>
        )}
    </>
  );
}
