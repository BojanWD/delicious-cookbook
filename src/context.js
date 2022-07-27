import React, { useContext, useEffect, useState } from "react";
import useUpdateEffect from "./customHooks/useUpdateEffect";
import {
  combineIngredients,
  containsAll,
} from "./helperFunctions/combineIngredients";

const AppContext = React.createContext();

const url = "https://www.themealdb.com/api/json/v1/1/search.php?f=";
// const letter = "a";

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  /* Recipes info */
  const [recipes, setRecipes] = useState([]);
  const [presentedRecipes, setPresentedRecipes] = useState([]);

  /* pagination states and variables */
  const [pageIndex, setPageIndex] = useState(1);
  const itemsPerPage = 12;

  /* categories */
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("All");

  /* search name/ingredients terms */
  const [searchTerms, setSearchTerms] = useState([]);
  const [searchName, setSearchName] = useState("");

  /* Sign in and registration data */
  const [users, setUsers] = useState([
    { id: 0, username: "admin", password: "admin" },
  ]);
  const [activeUser, setActiveUser] = useState({});
  //const [loggedIn, setLoggedIn] = useState(false);

  const allIngredients = [
    ...new Set(
      [
        recipes.map((item) => {
          return combineIngredients(item);
        }),
      ].flat(2)
    ),
  ];

  const changePresentedRecipes = () => {
    setPageIndex(1);
    if (category === "All") {
      setPresentedRecipes(
        recipes.filter((el) => {
          return (
            containsAll(searchTerms, combineIngredients(el)) &&
            el.strMeal.toLowerCase().includes(searchName.toLowerCase())
          );
        })
      );
      return;
    }
    const filteredRecipes = recipes.filter((el) => {
      return (
        el.strCategory === category &&
        containsAll(searchTerms, combineIngredients(el)) &&
        el.strMeal.toLowerCase().includes(searchName.toLowerCase())
      );
    });
    setPresentedRecipes(filteredRecipes);
  };

  /* API fetching function */
  const fetchAllMeals = async () => {
    const allMeals = [];
    const letters = [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
    ];
    setLoading(true);
    for (let i = 0; i < letters.length; i++) {
      const apiUrl = `${url}${letters[i].toLowerCase()}`;
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const { meals } = data;
        if (meals) {
          allMeals.push(
            ...meals.map((el) => {
              let res = {
                idMeal: el.idMeal,
                strMeal: el.strMeal,
                strCategory: el.strCategory,
                strMealThumb: el.strMealThumb,
                strIngredient1: el.strIngredient1,
                strIngredient2: el.strIngredient2,
                strIngredient3: el.strIngredient3,
                strIngredient4: el.strIngredient4,
                strIngredient5: el.strIngredient5,
                strIngredient6: el.strIngredient6,
                strIngredient7: el.strIngredient7,
                strIngredient8: el.strIngredient8,
                strIngredient9: el.strIngredient9,
                strIngredient10: el.strIngredient10,
                strIngredient11: el.strIngredient11,
                strIngredient12: el.strIngredient12,
                strIngredient13: el.strIngredient13,
                strIngredient14: el.strIngredient14,
                strIngredient15: el.strIngredient15,
                strIngredient16: el.strIngredient16,
                strIngredient17: el.strIngredient17,
                strIngredient18: el.strIngredient18,
                strIngredient19: el.strIngredient19,
                strIngredient20: el.strIngredient20,
                strMeasure1: el.strMeasure1,
                strMeasure2: el.strMeasure2,
                strMeasure3: el.strMeasure3,
                strMeasure4: el.strMeasure4,
                strMeasure5: el.strMeasure5,
                strMeasure6: el.strMeasure6,
                strMeasure7: el.strMeasure7,
                strMeasure8: el.strMeasure8,
                strMeasure9: el.strMeasure9,
                strMeasure10: el.strMeasure10,
                strMeasure11: el.strMeasure11,
                strMeasure12: el.strMeasure12,
                strMeasure13: el.strMeasure13,
                strMeasure14: el.strMeasure14,
                strMeasure15: el.strMeasure15,
                strMeasure16: el.strMeasure16,
                strMeasure17: el.strMeasure17,
                strMeasure18: el.strMeasure18,
                strMeasure19: el.strMeasure19,
                strMeasure20: el.strMeasure20,
                strInstructions: el.strInstructions,
                creatorId: 0,
                strTags: el.strTags,
              };
              return res;
            })
          );
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    setLoading(false);
    setRecipes(allMeals);
  };

  /* Sett up recipes from local storage or API */
  useEffect(() => {
    const mealsBackup = window.localStorage.getItem("meals");
    if (mealsBackup === null || mealsBackup === "[]") {
      console.log("do I get here");
      fetchAllMeals();
    } else {
      setRecipes(JSON.parse(mealsBackup));
    }
  }, []);

  /* When recipes are changed we update what is displayed */
  useUpdateEffect(() => {
    window.localStorage.setItem("meals", JSON.stringify(recipes));
    setPresentedRecipes(recipes);
    const allCategories = [
      "All",
      ...new Set(recipes.map((item) => item.strCategory)),
    ];
    setCategories(allCategories);
  }, [recipes]);

  /* we change what is displayed based on searches */
  useUpdateEffect(() => {
    changePresentedRecipes();
  }, [category, searchTerms, searchName]);

  useUpdateEffect(() => {
    if (users.length > 1) {
      setActiveUser({
        id: users.slice(-1)[0].id,
        username: users.slice(-1)[0].username,
      });
    }
  }, [users]);

  //console.log(presentedRecipes[0]); //combineIngredients(recipes[0]) allIngredients presentedRecipes searchTerms, searchName,

  return (
    <AppContext.Provider
      value={{
        loading,
        setLoading,
        recipes,
        setRecipes,
        pageIndex,
        setPageIndex,
        itemsPerPage,
        presentedRecipes,
        setPresentedRecipes,
        categories,
        setCategories,
        changePresentedRecipes,
        setCategory,
        allIngredients,
        searchTerms,
        setSearchTerms,
        searchName,
        setSearchName,
        users,
        setUsers,
        activeUser,
        setActiveUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
