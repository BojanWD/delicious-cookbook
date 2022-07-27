import React from "react";
import "../scss/about.scss";
import { Row, Col, Container } from "react-bootstrap";

export default function About() {
  return (
    <Container>
      <Row>
        <Col>
          <div className="about">
            <h1>About delicous home cookbook</h1>
            <p>
              This is a frontend project by Bojan Branovački. All recipe data is
              obtained from www.themealdb.com, i.e., using their free api to
              populate the website with recipes.
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
