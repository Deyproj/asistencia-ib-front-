import React from 'react';



const Home = () => {
    return (
        <div className='principal login'>
            <div className='container  text-center'>
                <div className='row flex align-items-center justify-content-center'>
                    <div className='col-12 col-lg-6 '>
                        <div className="card text-white bg-success py-4 " >
                            <div className="card-body text-center">
                                <div>
                                    <div id="html-dist"></div>
                                    <h2>WebIB</h2>
                                    <img className='imgLogin' src="/images/flowers2.png" alt="flower" />
                                    <p>Sistema para la toma y control de asistencia.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
