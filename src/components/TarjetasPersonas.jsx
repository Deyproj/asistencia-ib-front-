import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const TarjetasPersonas = ({ totalPersonas, titulo, background, icon, stickytop }) => {
  return (
    <div className={stickytop}>
        <div className="card border-white mx-5 my-5 mx-lg-0 my-lg-3 text-center text-white ">
          <div className={background}>
            <div className="card-body ">
              <h5>{titulo}</h5>
              <h4>
                <FontAwesomeIcon icon={icon} />{" "} {totalPersonas}
              </h4>
            </div>
          </div>
        </div>
      </div>
  );
};

export default TarjetasPersonas;
