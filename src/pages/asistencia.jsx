import { React, useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import ListaPersonas from "../components/asistencia/ListaPersonas";
import TarjetasPersonas from "../components/TarjetasPersonas";
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import usePersonas from "../hooks/usePersonas";
import { API_URL } from '../config/constant';
import useActual from '../hooks/useActual';
import Loading from "../components/layout/Loading";


const Asistencia = () => {

  const { now, } = useActual();

  const [update, setUpdate] = useState(0);
  const { personas, totalPersonas, procesos, turnos, onProceso, onTurno, results, search, search2, loading } = usePersonas(update);
  const [registro, setRegistro] = useState();

  const onObserv = (event, persona) => {
    //alert(({[event.target.observacion]: event.target.value,}).undefined)
    setRegistro({
      persona: {
        cedula: persona.cedula,
        celular: persona.celular,
        fechaActualizacion: persona.fechaActualizacion,
        idEmpresa: persona.idEmpresa,
        labor: persona.labor,
        nombre: persona.nombre,
        proceso: persona.proceso,
      },
      fecha: now,
      estado: 0,
      observacion: ({ [event.target.observacion]: event.target.value, }).undefined,
    });


    /*     setObservaciones({
          [event.target.observaciones]: event.target.value,
        }); */
  };

  // Función para actualizar el registro de asistencia
  const onUpdate = (event, persona, estado) => {
    //alert(({[event.target.observacion]: event.target.value,}).undefined)
    setRegistro({
      persona: {
        cedula: persona.cedula,
        celular: persona.celular,
        fechaActualizacion: persona.fechaActualizacion,
        idEmpresa: persona.idEmpresa,
        labor: persona.labor,
        nombre: persona.nombre,
        proceso: persona.proceso,
      },
      fecha: now,
      estado: estado,
      observacion: estado === 1 ? ("Observacion") : ("Ausencia No Justificada"),
      /* observacion: observaciones.undefined ? (observaciones.undefined) : estado == "1" ? ("") : ("No justificada"), */
    });
  };

  // Función para enviar el registro de asistencia al servidor
  const send = (asistencia) => {
    if (asistencia) {
      fetch(`${API_URL}/asistencia`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(asistencia),
      })
        .then(() => {
          setUpdate(update + 1);
        });
    } else {
      console.log("La asistencia no se pudo enviar");
    }
  };

  useEffect(() => {
    if (registro) {
      send(registro);
    }
    /* ObtenerFecha() */
  }, [registro]);



  return (
    <>
      {(loading) ? (<Loading />) : (
        <Container className='principal'>
          <Row className="pt-4">
            <Col md={8}>
              <form className="mb-3 mt-2">
              <div className="form-group">
                  <label>Turno:</label>
                  <select
                    id="palabraClave"
                    name="palabraClave"
                    className="form-control"
                    value={search2}
                    onChange={onTurno}
                  >
                    <option value={false}>
                      Selecciona tu turno...
                    </option>
                    {turnos.map((turno) => (
                      <option key={turno}>{turno}</option>
                    ))}
                  </select>
                </div>
                {search2 !== "" && (
                  <div className="form-group">
                    <label>Proceso:</label>
                    <select
                      id="palabraClave"
                      name="palabraClave"
                      className="form-control"
                      value={search}
                      onChange={onProceso}
                    >
                      <option value={false}>
                        Selecciona tu equipo...
                      </option>
                      {procesos.map((proceso) => (
                        <option key={proceso}>{proceso}</option>
                      ))}
                    </select>
                  </div>
                )}
              </form>
              <ListaPersonas
                send={send}
                onObserv={onObserv}
                onUpdate={onUpdate}
                onProceso={onProceso}
                search={search}
                results={results}
              />
            </Col>
            <Col md={4}>
              <TarjetasPersonas
                totalPersonas={(results == 0) ? (totalPersonas) : (results.length)}
                titulo="Total Personas"
                background="bg-success"
                icon={faUsers}
                stickytop="sticky-top"
              />
            </Col>
          </Row>
        </Container>
      )}

    </>
  );
}

export default Asistencia;