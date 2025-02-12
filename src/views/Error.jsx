import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Carga from '../components/Carga';
import imagen2 from "../resource/Imgs/Imagen2.jpg"

import "../css/Views.css/Error.css"

function Error() {

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return <Carga />;
    }

    return (
        <div className='App-error'>
            <header className='App-header-error'>

                <h1>🚫 Error esta ruta a este dominio no existe 🚫</h1>
                En proceso de construccion...🚧

                <img className='App-header-error-imagen' src={imagen2} alt={imagen2} />

                <Link to="/">
                    <button className='App-error-button'>Volver al inicio</button>
                </Link>

            </header>
        </div>
    );
}

export default Error;