import { Link } from 'react-router-dom';
import "../css/Nav.css";

function Nav() {
  return (
    <div className="App-header-nav">
    
        <div className="App-header-nav-izquierda">
            <Link to="/">
            Nav
            </Link>
        </div>
      
      <div className="App-header-nav-derecha">
        <Link className='App-header-nav-derecha-links' to="/a">
          <button className='App-header-nav-derecha-button'>Menu</button>
        </Link>
        <Link className='App-header-nav-derecha-links' to="/b">
          <button className='App-header-nav-derecha-button'>Administracion</button>
        </Link>
        <Link className='App-header-nav-derecha-links' to="/c">
          <button className='App-header-nav-derecha-button'>Carrito</button>
        </Link>
      </div>
    </div>
  );
}

export default Nav;
