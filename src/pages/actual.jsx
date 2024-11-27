import React, { useEffect, useState } from 'react';
import useAsistencia from '../hooks/useAsistencia';
import usePersonasPorTurno from '../hooks/usePersonasPorTurno';
import TableProcesos from '../components/actual/tableProcesos';
import TablePersonas from '../components/actual/tablePersonas';
import TableObservaciones from '../components/actual/tableObservaciones';
import Loading from '../components/layout/Loading';
import ModalSinAsistencia from '../components/actual/modalSinAsistencia';
import DonutChart from '../components/actual/donutChart'


const Actual = () => {
    const { 
        cantidadPersonasIBNoche, 
        cantidadPersonasIBDia, 
        cantidadPersonasIBTarde, 
        cantidadPersonasIB2Noche, 
        cantidadPersonasIB2Dia, 
        cantidadPersonasIB2Tarde, loading } = usePersonasPorTurno(); 
    const { 
        ausentesIBNoche,
        presentesIBNoche,
        ausentesIBDia,
        presentesIBDia,
        ausentesIBTarde,
        presentesIBTarde,
        ausentesIB2Noche,
        presentesIB2Noche,
        ausentesIB2Dia,
        presentesIB2Dia,
        ausentesIB2Tarde,
        presentesIB2Tarde,
        ausentes,
        presentes,
        asistencias,
        totalasistencias,
        asistenciaProcesos,
        loading2 } = useAsistencia()


    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        if (!loading && !loading2 ) {
            const data1 = {
                title: 'IB Dia',
                series: [presentesIBDia, ausentesIBDia, cantidadPersonasIBDia - (ausentesIBDia + presentesIBDia)],
                subtitle: cantidadPersonasIBDia,
            };
            const data2 = {
                title: 'IB Noche',
                series: [presentesIBNoche, ausentesIBNoche, cantidadPersonasIBNoche - (ausentesIBNoche + presentesIBNoche)],
                subtitle: cantidadPersonasIBNoche,
            };
            const data3 = {
                title: 'IB Tarde',
                series: [presentesIBTarde, ausentesIBTarde, cantidadPersonasIBTarde - (ausentesIBTarde + presentesIBTarde)],
                subtitle: cantidadPersonasIBTarde,
            };
            const data4 = {
                title: 'IB2 Dia',
                series: [presentesIB2Dia, ausentesIB2Dia, cantidadPersonasIB2Dia - (ausentesIB2Dia + presentesIB2Dia)],
                subtitle: cantidadPersonasIB2Dia,
            };
            const data5 = {
                title: 'IB2 Noche',
                series: [presentesIB2Noche, ausentesIB2Noche, cantidadPersonasIB2Noche - (ausentesIB2Noche + presentesIB2Noche)],
                subtitle: cantidadPersonasIB2Noche,
            };
            const data6 = {
                title: 'IB2 Tarde',
                series: [presentesIB2Tarde, ausentesIB2Tarde, cantidadPersonasIB2Tarde - (ausentesIB2Tarde + presentesIB2Tarde)],
                subtitle: cantidadPersonasIB2Tarde,
            };
            const data7 = {
                title: 'Total',
                series: [presentes, ausentes, (cantidadPersonasIBDia + cantidadPersonasIBTarde + cantidadPersonasIBNoche + cantidadPersonasIB2Dia + cantidadPersonasIB2Tarde + cantidadPersonasIB2Noche) - (ausentes + presentes)],
                subtitle: (cantidadPersonasIBDia + cantidadPersonasIBTarde + cantidadPersonasIBNoche + cantidadPersonasIB2Dia + cantidadPersonasIB2Tarde + cantidadPersonasIB2Noche),
            };
            setChartData([data1, data2, data3, data4, data5, data6, data7]);
        }
    }, [loading, loading2]);
    
    const handleAusentesClick = (titulo) => {
        const element = document.getElementById(titulo);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <>
            {(loading && loading2) ? <Loading /> : (
                <div className='container principal'>
                    <div className='row pt-4 d-flex justify-content-center align-content-center'>
                        {chartData?.map((data, index) => (
                            <React.Fragment key={index}>
                                {data.subtitle > 0 ? (
                                    <section className='flex-wrap justify-content-center align-content-center col-12 col-md-6 col-lg-4 mb-3' >
                                        <DonutChart data={data} title={data.title} series={data.series} subtitle={data.subtitle} onClickAusentes={handleAusentesClick}/>
                                    </section>
                                ) : (
                                    null
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                    <div className='row '>
                        <div className='col-12 col-lg-7 order-1 order-lg-1'>
                            <br />
                            <div>
                                <TableProcesos className='order-3 order-lg-1' asistenciaProcesos={asistenciaProcesos}  loading2={loading2}/>
                                {ausentesIBDia ? (<TableObservaciones className='order-1 order-lg-2' sede={"IB Dia"} titulo={'IB Dia'}/>): null}
                                {ausentesIBNoche ? (<TableObservaciones className='order-1 order-lg-2' sede={"IB Noche"} titulo={'IB Noche'}/>): null}
                                {ausentesIBTarde ? (<TableObservaciones className='order-1 order-lg-2' sede={"IB Tarde"} titulo={'IB Tarde'}/>): null}
                                {ausentesIB2Dia ? (<TableObservaciones className='order-1 order-lg-2' sede={"IB2 Dia"} titulo={'IB2 Dia'}/>): null}
                                {ausentesIB2Tarde ? (<TableObservaciones className='order-1 order-lg-2' sede={"IB2 Tarde"} titulo={'IB2 Tarde'}/>): null}
                                {ausentesIB2Noche ? (<TableObservaciones className='order-1 order-lg-2' sede={"IB2 Noche"} titulo={'IB2 Noche'}/>): null}
                            </div>
                        </div>
                        <div className='col-12  col-lg-5 order-2 order-lg-2'>
                            <TablePersonas />
                        </div>
                    </div>
                    <ModalSinAsistencia />
                </div>
            )}
        </>
    );
}

export default Actual;

