import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HttpStatus = ({numero, titulo, mensaje}) => {
    const [counter, setCounter] = useState(3);
    let navigate = useNavigate();
    useEffect(() => {
        const timeout = setTimeout(() => {
          setCounter(counter -1);
        }, 1000);
        if(counter === 0) navigate('/home');
        return () => {
          clearTimeout(timeout);
        };
      }, [counter]);

    return (
        <>
        <section className="error">
            <h1>{numero}</h1>
            <h2>{titulo}</h2>
            <p>{mensaje}. Volviendo a home en... {counter}</p>
        </section>
        </>
    );
}
 
export default HttpStatus;