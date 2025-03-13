import React, { useEffect, useState } from "react";
import axios from "axios";
import apiRoutes from "../config/apiRoutes";  // Importamos las rutas centralizadas
import Card from "../components/Card";
import Nav from "../components/Nav";
import "../css/Views.css/Menu.css";

function Menu() {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        axios.get(apiRoutes.menu)  // Usamos la ruta desde apiRoutes
            .then((response) => {
                setProductos(response.data);
            })
            .catch((error) => {
                console.error("Hubo un error al obtener los productos:", error);
            });
    }, []);

    return (
        <div className='App-menu'>
            <Nav />
            <header className='App-header-menu'>
                <h1>Menu</h1>

                <div className="App-header-menu-categoria">
                    <h1>Categoria:</h1>
                </div>
                <div className="App-header-menu-list">
                    {productos.length > 0 ? (
                        productos.map((producto, index) => (
                            <Card
                                key={index}
                                nombre={producto.nombre}
                                precio={producto.precio}
                                imagen={producto.imagen}
                            />
                        ))
                    ) : (
                        <p>Cargando productos...</p>
                    )}
                </div>
            </header>
        </div>
    );
}

export default Menu;
