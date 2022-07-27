import React from "react";
import { Row } from "react-bootstrap";
import Search from "./Search";
import RecipeDisplay from "./RecipeDisplay";
import PaginationC from "./Pagination";
import CategoriesNav from "./CategoriesNav";

export default function Home() {
  return (
    <>
      <Row>
        <Search />
        <CategoriesNav />
      </Row>
      <RecipeDisplay />
      <PaginationC />
    </>
  );
}
