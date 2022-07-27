import React from "react";
import "../scss/navbar.scss";
import { Container, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MdRestartAlt } from "react-icons/md";
import { useGlobalContext } from "../context";
import { CgProfile } from "react-icons/cg";

export default function NavBar() {
  const { setRecipes, activeUser, setActiveUser } = useGlobalContext();
  const resetApp = () => {
    const answer = window.confirm(
      "Are you sure you want to reset the app? It will delete all changes and revert to original recipes"
    );
    if (answer) {
      setRecipes([]);
      window.location.reload(false);
    } else {
      return;
    }
  };

  return (
    <Navbar expand="lg" bg="dark" variant="dark" className="px-2">
      <Container>
        <Navbar.Brand>Delicious Home Cookbook</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to="/" className="nav-link">
              Home
            </Link>

            <Link to="/about" className="nav-link">
              About
            </Link>

            <Link to="/add" className="nav-link">
              Add Recipe
            </Link>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="navbar-nav justify-content-end ">
          {!activeUser ||
            (Object.keys(activeUser).length === 0 && (
              <Link to="/signin" className="nav-link no-p">
                Sign in <CgProfile className="profile-icon" />
              </Link>
            ))}

          {Object.keys(activeUser).length === 2 && (
            <>
              <Link to="/" className="nav-link no-p">
                {activeUser.username} <CgProfile className="profile-icon" />
              </Link>
              <a
                className="nav-link no-p"
                style={{ cursor: "pointer" }}
                onClick={() => setActiveUser({})}
              >
                Log out
              </a>
            </>
          )}
          <Navbar.Text
            className="nav-link reset no-p"
            onClick={() => resetApp()}
          >
            Reset App <MdRestartAlt />
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
