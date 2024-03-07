import { useEffect, useRef } from 'react';

/**
 * Hook para ejecutar una función con cierta frecuencia.
 * @param {function} callback La función que se ejecutará periódicamente.
 * @param {number} delay El tiempo en milisegundos entre cada ejecución.
 */
function useInterval(callback, delay) {
    const savedCallback = useRef();

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}

export default useInterval;