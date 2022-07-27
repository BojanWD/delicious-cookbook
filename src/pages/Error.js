import React from "react";
import "../scss/about.scss";
import { Row, Col, Container } from "react-bootstrap";

export default function Error() {
  return (
    <Container>
      <Row>
        <Col>
          <div className="about">
            <h1>Error! This page doesnt exist.</h1>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
