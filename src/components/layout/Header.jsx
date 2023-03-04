import React from 'react';
import './Header.css';

const Header = ({ titulo }) => {
    return (
        <>
            <div id="main-header" className="cabecero ">
                <div className="container  text-lg-left">
                    <div className="row">
                        <div className="col-12 col-lg-12">
                            <h1 className="restitle mt-1">
                                <p>
                                    <img src='/images/cubo-3d.png' width="45" height="45" alt='cubo'></img>
                                    {" "}{titulo}</p>
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Header;