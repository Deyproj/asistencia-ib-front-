import NavBar from "../components/layout/NavBar";
import Asistencia from "../pages/asistencia";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Actual from "../pages/actual";
import Users from "../pages/users";
import Footer from "../components/layout/Footer";
import { Row } from "reactstrap";
import Login from "../pages/login";
import Actualizar from "../pages/actualizar";
import Home from "../pages/home";
import { ProtectedRoute } from "./ProtectedRoute";
import Data from "../pages/data";
import TokenChecker from "./TokenChecker";

function App() {

  return (
    <>
      <Router>
      <TokenChecker/> 
        <NavBar />
        <Routes>
          <Route index element={
            localStorage.getItem('token')? <Home /> : <Login />
          } />
          <Route path="/login" element={<Login />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute path={"/home"}>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/asistencia"
            element={
              <ProtectedRoute path={"/asistencia"}>
                <Asistencia />
              </ProtectedRoute>
            }
          />
          <Route
            path="/actual"
            element={
              <ProtectedRoute path={"/actual"}>
                <Actual />
              </ProtectedRoute>
            }
          />
          <Route
            path="/data"
            element={
              <ProtectedRoute path={"/data"}>
                <Data />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users"
            element={
              <ProtectedRoute path={"/users"}>
                <Users />
              </ProtectedRoute>
            }
          />
          <Route
            path="/actualizar"
            element={
              <ProtectedRoute path={"/actualizar"}>
                <Actualizar />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Row>
          <Footer />
        </Row>
      </Router>
    </>
  );
}

export default App;
