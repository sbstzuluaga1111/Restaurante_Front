import React from "react";
import { Link } from "react-router-dom";
import "../css/Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faPhone, faEnvelope, faMapMarkerAlt, faClock } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* Sección de enlaces rápidos */}
        <div className="footer-section">
          <h3>Enlaces</h3>
          <ul>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/a">Menú</Link></li>
            <li><Link to="/b">Administración</Link></li>
            <li><Link to="/c">Carrito</Link></li>
          </ul>
        </div>

        {/* Sección de contacto */}
        <div className="footer-section">
          <h3>Contacto</h3>
          <p><FontAwesomeIcon icon={faPhone} /> +57 300 123 4567</p>
          <p><FontAwesomeIcon icon={faEnvelope} /> contacto@restaurante.com</p>
        </div>

        {/* Sección de ubicación */}
        <div className="footer-section">
          <h3>Ubicación</h3>
          <p><FontAwesomeIcon icon={faMapMarkerAlt} /> Calle 123, Ciudad, País</p>
        </div>

        {/* Sección de horarios */}
        <div className="footer-section">
          <h3>Horarios</h3>
          <p><FontAwesomeIcon icon={faClock} /> Lunes - Viernes: 8:00 AM - 10:00 PM</p>
          <p><FontAwesomeIcon icon={faClock} /> Sábados - Domingos: 9:00 AM - 11:00 PM</p>
        </div>

        {/* Sección de redes sociales */}
        <div className="footer-section">
          <h3>Síguenos</h3>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
          </div>
        </div>
        
      </div>

      {/* Derechos de autor */}
      <div className="footer-bottom">
        <p>© 2024 Restaurante. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
