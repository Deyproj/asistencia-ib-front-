import { useState, useEffect } from 'react'

const useActual = () => {

    const [now, setCurrentDate] = useState('');

    useEffect(() => {
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
      setCurrentDate(formattedDate);
    }, []);

    return {now};
}

export default useActual;