import "../css/Card.css"

import imagen1 from "../resource/Imgs/descarga.jpg"

function Card() {
  return (
    <div className="App-header-card">

      <div>
        <img className="App-header-card-imagen" src={imagen1} alt={imagen1} />
      </div>
      <div>
        Card
      </div>
      
    </div>
  );
}

export default Card;
