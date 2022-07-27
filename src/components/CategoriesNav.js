import React from "react";
import { Col } from "react-bootstrap";
import "../scss/categoriesnav.scss";
import { useGlobalContext } from "../context";
import { useState } from "react";

export default function CategoriesNav() {
  const { categories, setCategory } = useGlobalContext();
  const [index, setIndex] = useState(0);

  return (
    <Col md={12} lg={6}>
      <div className="category-nav">
        <h5>Filter by meal category</h5>
        <select
          className="form-select"
          aria-label="Default select example"
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories &&
            categories.map((categoryName, i) => {
              return (
                <option key={categoryName} value={categoryName}>
                  {categoryName}
                </option>
              );
            })}
        </select>
      </div>
    </Col>
  );
}
