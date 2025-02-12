import { Link } from 'react-router-dom';

import "../css/Views.css/Error.css"

function Error() {
    return (
        <div className='App-error'>
        <header className='App-header-error'>
        <h1>Algo salio mal. reintentalo mas tarde.....</h1>
        <Link to="/">
        <button className='App-error-button'>Volver</button>
        </Link>
        </header>
    </div>
    );
  }
  
  export default Error;