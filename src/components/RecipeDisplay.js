import React from "react";
import { useGlobalContext } from "../context";
import { Row, Col, Container } from "react-bootstrap";
import RecipeCard from "./RecipeCard";

export default function RecipeDisplay() {
  const { presentedRecipes, pageIndex, itemsPerPage } = useGlobalContext();

  if (presentedRecipes.length === 0) {
    return (
      <Container>
        <Row>
          <Col>
            <h1>There are no recipes to display...</h1>
          </Col>
        </Row>
      </Container>
    );
  }

  if (presentedRecipes) {
    return (
      <Container>
        <Row>
          {presentedRecipes &&
            presentedRecipes
              .slice(
                (pageIndex - 1) * itemsPerPage,
                (pageIndex - 1) * itemsPerPage + itemsPerPage
              )
              .map((item) => {
                return (
                  <Col key={item.idMeal}>
                    <RecipeCard recipeDetails={item} />
                  </Col>
                );
              })}
        </Row>
      </Container>
    );
  }
}
