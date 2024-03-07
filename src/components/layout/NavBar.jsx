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
import { useState } from "react";
import ModalHistorico from "../historico/modalHistorico";

function NavBar() {

  const [showModal, setShowModal] = useState(false);

  const token = localStorage.getItem('token') && jwt_decode(localStorage.getItem('token'));
  const rol = token && token.rol[0].nombre;

  const logout = () => {
    localStorage.removeItem('token');
    window.location.assign(`https://www.danielguzman.online`);
  }

  const handleOnClick = () => {
    document.querySelector('.navbar-collapse').classList.remove('show');
  }

  const abrirModal = () => {
    setShowModal(true);
  };

  return (
    <>
      <Navbar collapseOnSelect expand="lg" className="navBar bg-success" variant="dark">
        <Container>
          <Navbar.Brand>
            <Link to="/home" className="link m-2" onClick={() => handleOnClick()}>
              <img src='/isabelitaLogo.jpg' width="40" height="40" alt='flower' ></img>
              {" "}{"WebIB"}
            </Link>
          </Navbar.Brand>
          {rol && <Navbar.Toggle aria-controls="responsive-navbar-nav" />}
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mx-auto"></Nav>
            <Nav>
              {rol && rol === "ADMIN" || rol === "DATA" || rol === "USER" || rol === "SUPERDATA" ? (
                <>
                  <Link to="/asistencia" className="link m-2 navbar-collapse" onClick={() => handleOnClick()}>
                    <FontAwesomeIcon icon={faPersonChalkboard} /> Asistencia
                  </Link>
                </>
              ) : null}

              {rol && rol === "ADMIN" || rol === "DATA" || rol === "SUPERDATA" ? (
                <Link to="/actual" className="link m-2" onClick={() => handleOnClick()}>
                  <FontAwesomeIcon icon={faChartBar} /> Actual
                </Link>
              ) : null}

              {rol && rol === "ADMIN" || rol === "SUPERDATA" || rol === "DATA"? (
                <Link to="#" className="link m-2" onClick={() => { handleOnClick(); abrirModal(); }}>
                  <FontAwesomeIcon icon={faMagnifyingGlassChart} /> Historico
                </Link>

              ) : null}

              {rol && rol === "ADMIN" || rol === "SUPERDATA" ? (
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
      <ModalHistorico show={showModal} onHide={() => setShowModal(false)} />
    </>
  );
}

export default NavBar;
