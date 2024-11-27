import React from 'react';
import './Footer.css'

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <div className="container footer navBar bg-success text-white">
            <div className="col">
                <p className="text-center ">
                    &copy; {year} Prothymía. All rights reserved.
                </p>
            </div>
        </div>);
}

export default Footer;