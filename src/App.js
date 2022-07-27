import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/Navbar";
import Home from "./components/Home";
import About from "./pages/About";
import { useGlobalContext } from "./context";
import AddRecipe from "./components/AddRecipe";
import RecipeInfo from "./components/RecipeInfo";
import Error from "./pages/Error";
import Register from "./components/Register";
import SignIn from "./components/SignIn";

function App() {
  const { loading } = useGlobalContext();

  if (loading) {
    return (
      <Container>
        <Row className="justify-content-center pt-3">
          <Col className="text-center">
            <h1>Loading...</h1>
          </Col>
        </Row>
      </Container>
    );
  }
  return (
    <Container>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/add" element={<AddRecipe />} />
        <Route path="/add/:id" element={<AddRecipe />} />
        <Route path="/recipe/:id" element={<RecipeInfo />} />
        <Route path="/register" element={<Register />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Container>
  );
}

export default App;
