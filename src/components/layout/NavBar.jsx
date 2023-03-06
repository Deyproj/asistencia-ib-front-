import {
  faMagnifyingGlassChart,
  faPersonChalkboard,
  faRefresh,
  faUserPen,
  faUserTimes,
  faChartBar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import './NavBar.css';
import jwt_decode from 'jwt-decode';

function NavBar() {

  const token = localStorage.getItem('token') && jwt_decode(localStorage.getItem('token'));
  const rol = token && token.rol[0].nombre;

  const logout = () => {
    localStorage.removeItem('token');
    //window.location.assign(`http://localhost:3000`);
    window.location.assign(`https://master.d3d1jq5p91qrar.amplifyapp.com`);
  }

  const handleOnClick = () => {
    document.querySelector('.navbar-collapse').classList.remove('show');
  }

  return (



    <Navbar collapseOnSelect expand="lg" className="navBar " variant="dark">
      <Container>
        <Navbar.Brand>
          <Link to="/home" className="link m-2">
            <img src='/images/oneflower.png' width="40" height="40" alt='flower' ></img>
            {" "}{"Flores Isabelita"}
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className="navBar">
          <Nav className="mx-auto"></Nav>
          <Nav >
            {rol && rol === "ADMIN" || rol === "DATA" || rol === "USER" ? (
              <>
                <Link to="/asistencia" className="link m-2 navbar-collapse" onClick={() => handleOnClick()}>
                  <FontAwesomeIcon icon={faPersonChalkboard} /> Asistencia
                </Link>
              </>
            ) : null}

            {rol && rol === "ADMIN" || rol === "DATA" ? (
              <Link to="/actual" className="link m-2" onClick={() => handleOnClick()}>
                <FontAwesomeIcon icon={faChartBar} /> Actual
              </Link>
            ) : null}

            {rol && rol === "ADMIN" || rol === "DATA" ? (
              <Link to="/data" className="link m-2" onClick={() => handleOnClick()}>
                <FontAwesomeIcon icon={faMagnifyingGlassChart} /> Historico
              </Link>
            ) : null}

            {rol && rol === "ADMIN" || rol === "DATA" ? (
              <Link to="/actualizar" className="link m-2" onClick={() => handleOnClick()}>
                <FontAwesomeIcon icon={faRefresh} /> Actualizar
              </Link>
            ) : null}

            {rol && rol === "ADMIN" ? (
              <Link to="/users" className="link m-2" onClick={() => handleOnClick()}>
                <FontAwesomeIcon icon={faUserPen} /> Usuarios
              </Link>
            ) : null}

            {token ? (
              <Link onClick={logout} className="link m-2">
                <FontAwesomeIcon icon={faUserTimes} /> Salir
              </Link>
            ) : null}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
