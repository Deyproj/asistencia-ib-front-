import React from "react";
import { Accordion, Form } from "react-bootstrap";
import useActual from "../../hooks/useActual";


const ListaPersonas = ({ results, onObserv, onUpdate, search }) => {

  const { now, } = useActual();


  const justificaciones = [
    "Ausencia No Justificada",
    "Permiso No remunerado",
    "Permiso Compensatorio",
    "Incapacidad",
    "Licencia Materna",
    "Licencia Luto",
    "Vacaciones",
    "Suspension",
    "Retiro",
    "Turno B",
  ];

  return (

    <>
      {
        (search !== "") ? (
          <div>
            <Accordion>
              {results.map((persona) => {
                const lastAsistencia = persona.asistencias[persona.asistencias.length - 1];
                const isCurrentDate = lastAsistencia && lastAsistencia.fecha === now;
                const isPresent = isCurrentDate && lastAsistencia.estado === "1";
                const isAbsent = isCurrentDate && lastAsistencia.estado === "0";
                return (
                  <Accordion.Item key={persona.idEmpresa} className="mb-2 shadow-lg rounded" eventKey={persona.idEmpresa}>
                    <Accordion.Header>{persona.nombre}</Accordion.Header>
                    <Accordion.Body className="bodyCard pb-0">
                      <b>Id:</b><br />
                      {persona.idEmpresa}<br />
                      <b>Proceso:</b><br />
                      {persona.proceso}<br />
                      <b>Labor:</b><br />
                      {persona.labor}<br />
                      <br />
                    </Accordion.Body>
                    <form>
                      <div className="my-3 m-2 row ">
                        <div className="col-7 offset-0">
                          <select
                            id={persona.idEmpresa}
                            name="observacion"
                            onChange={(event) => onObserv(event, persona)}
                            value={isCurrentDate ? lastAsistencia.observacion : "Observacion"}
                            className="form-control"
                          >
                            <option value={false}>
                              Observacion
                            </option>
                            {justificaciones.map((justificacion) => (
                              <option key={justificacion}>{justificacion}</option>
                            ))}
                          </select>
                          {/*   <Form.Control
                            name="observaciones"
                            onChange={onObserv}
                            placeholder={isCurrentDate ? lastAsistencia.observacion : "Observaciones"}
                          /> */}

                        </div>
                        <div className="btn-group col-5 ml-auto px-0" role="group" aria-label="Basic radio toggle button group">
                          <input
                            type="radio"
                            className="btn-check"
                            name={persona.idEmpresa}
                            id={`${persona.idEmpresa}A`}
                            onClick={(event) => onUpdate(event, persona, 1)}
                            defaultChecked={isCurrentDate && isPresent}
                          />
                          <label className="btn btn-outline-success p-1" htmlFor={`${persona.idEmpresa}A`}>Presente</label>
                          <input
                            type="radio"
                            className="btn-check"
                            name={persona.idEmpresa}
                            id={`${persona.idEmpresa}B`}
                            onClick={event => onUpdate(event, persona, 0)}
                            defaultChecked={isCurrentDate && isAbsent}
                          />
                          <label className="btn btn-outline-secondary p-1" htmlFor={`${persona.idEmpresa}B`}>Ausente</label>
                        </div>
                      </div>
                    </form>
                  </Accordion.Item>
                );
              })}
            </Accordion>
          </div>
        ) : (
          <div className="text-center">
            <img src="/images/Diversity _Isometric.svg" alt="" height="260px"/>
            <h4 className="restitle">¿Qué equipo lideras?</h4>
          </div>
        )
      }
    </>
  );
};

export default ListaPersonas;
