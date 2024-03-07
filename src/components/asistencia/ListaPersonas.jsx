import React from "react";
import { Accordion, Form } from "react-bootstrap";
import useActual from "../../hooks/useActual";
import useConfiguracion from "../../hooks/useConfiguracion";


const ListaPersonas = ({ results, onObserv, onUpdate, search }) => {


  const { configuracionAsistencia } = useConfiguracion();
  const { now, } = useActual();


  const justificaciones = [
    "Ausencia No Justificada",
    "Formacion",
    "Incapacidad",
    "Licencia Materna",
    "Licencia Paterna",
    "Licencia Luto",
    "No Programado",
    "Permiso No remunerado",
    "Permiso Remunerado",
    "Permiso Compensatorio",
    "Suspension",
    "Retiro",
    "Turno Desfasado",
    "Turno Martes-Sabado",
    "Vacaciones",
    "Visita Medica",
  ];

  return (

    <>
      {configuracionAsistencia && configuracionAsistencia.estado === false && (
        <div class="alert alert-success" role="alert">
          <h4 class="alert-heading">ATENCION!</h4>
          <p>No se permite tomar asistencia en este momento.</p>
        </div>
      )}
      <div>
        <Accordion>
          {search !== "" && results.map((persona) => {
            const lastAsistencia = persona.ultimaAsistencia;
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
                {configuracionAsistencia && configuracionAsistencia.estado !== false && search !== "" && (
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
                )}
              </Accordion.Item>
            );
          })}
        </Accordion>
      </div>
      {search === "" && (
        <div className="text-center">
          <img src="/images/Diversity _Isometric.svg" alt="" height="260px" />
          <h4 className="restitle">¿Qué equipo lideras?</h4>
        </div>
      )}
    </>
  );
};


export default ListaPersonas;
