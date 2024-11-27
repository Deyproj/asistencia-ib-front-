import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Card = ({ numero, titulo, background, icon }) => {
  return (
    <div className={background}>
        <div className="media">
          <FontAwesomeIcon  className="ico m-3" icon={icon} />
          <div className="media-body">
            <h4 className="mt-3 text-white">{numero}</h4>
            <p className="text-white">{titulo}</p>
          </div>
        </div>
      </div>
  );
};

export default Card;
