import Nav from "../components/Nav";
import "../css/Views.css/Home.css";
import bienvenida from "../resource/Imgs/Imagen1.jpg"
import fondo from "../resource/Imgs/imagen-home1.jpg"
import frase from "../resource/Imgs/imagen3.png"
import fondoParallax from '../resource/Imgs/imagen-home2.jpg';


function Home() {
  return (
    <div className='App-home'>
      <Nav />


      <header
  className="App-header-home"
  style={{
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(70, 75, 99, 0.8)), url(${fondo})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    color: "white",
  }}
>
<h1
  style={{
    margin: 0,
    display: "flex",          // 👈 convierte h1 en un flexbox
    justifyContent: "center", // 👈 centra horizontalmente
    alignItems: "center",      // 👈 centra verticalmente
  }}
>
  <div className="circle-container">
    <img
      src={frase}
      alt="Restaurante"
      className="circle-image"
    />
  </div>
</h1>


  <p>Tu mesa, tu historia.</p>
</header>

      




    <header
  className="App-header-home-1"
  style={{
    position: "relative", // 👈 importante para que el overlay se acomode bien
    backgroundImage: `url(${fondoParallax})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
    backgroundRepeat: "no-repeat",

  }}
>
  {/* Overlay oscuro */}
  <div
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.3)", // 👈 50% negro transparente
      zIndex: 1,
    }}
  />

  <div style={{ zIndex: 2 }} className="App-header-home-1-subcontainer">
<div  className="App-header-home-1-container-1">
  <img className="App-header-home-1-img" src={bienvenida} alt="bienvenida" />
</div>
<div  className="App-header-home-1-container-1">
  <img className="App-header-home-1-img" src={bienvenida} alt="bienvenida" />
</div></div>

<div style={{ zIndex: 2 }} className="App-header-home-1-container-2">
  <h2>Bienvenido a [Nombre del Restaurante]</h2>
  <p>En [Nombre del Restaurante], cada plato cuenta una historia. Nuestra pasión por la gastronomía se refleja en cada detalle, desde los ingredientes frescos hasta la presentación exquisita.</p>
  <p>Ofrecemos una experiencia culinaria única, combinando sabores tradicionales con un toque de innovación moderna. Nuestro menú está cuidadosamente diseñado para deleitar todos los sentidos.</p>
  <p>Ubicados en el corazón de la ciudad, nuestro espacio cálido y acogedor es ideal para compartir momentos inolvidables con familiares, amigos o en una ocasión especial.</p>
  <p>Creemos que comer es un arte, y estamos comprometidos a brindarte un servicio excepcional, donde cada visita se convierte en un recuerdo memorable.</p>
  <p>Te invitamos a descubrir un mundo de sabores auténticos y a disfrutar de una experiencia gastronómica que va más allá del plato.</p>
</div>


</header>





{/*
      <header className='App-header-home-2'>
        <h1>Home 2</h1>

<div className="App-header-home-2-conjunto">
<div className="App-header-home-2-card">
  <div className="App-header-home-2-content">
    <svg
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 9V5H4V9H20ZM20 11H4V19H20V11ZM3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3ZM5 12H8V17H5V12ZM5 6H7V8H5V6ZM9 6H11V8H9V6Z"
      ></path>
    </svg>
    <p className="App-header-home-2-para">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi laboriosam
      at voluptas minus culpa deserunt delectus sapiente inventore pariatur
    </p>
  </div>
</div>

<div className="App-header-home-2-card">
  <div className="App-header-home-2-content">
    <svg
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 9V5H4V9H20ZM20 11H4V19H20V11ZM3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3ZM5 12H8V17H5V12ZM5 6H7V8H5V6ZM9 6H11V8H9V6Z"
      ></path>
    </svg>
    <p className="App-header-home-2-para">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi laboriosam
      at voluptas minus culpa deserunt delectus sapiente inventore pariatur
    </p>
  </div>
</div>

<div className="App-header-home-2-card">
  <div className="App-header-home-2-content">
    <svg
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 9V5H4V9H20ZM20 11H4V19H20V11ZM3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3ZM5 12H8V17H5V12ZM5 6H7V8H5V6ZM9 6H11V8H9V6Z"
      ></path>
    </svg>
    <p className="App-header-home-2-para">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi laboriosam
      at voluptas minus culpa deserunt delectus sapiente inventore pariatur
    </p>
  </div>
</div>

</div>



      </header>
*/}

      <header className='App-header-home-3'>
        <div className="App-header-home-3-container-2">
          <h2>Titulo Descripcion 2</h2>
          <p>Descripcion 2...</p>
          <p>Descripcion 2...</p>
          <p>Descripcion 2...</p>
          <p>Descripcion 2...</p>
          <p>Descripcion 2...</p>
        </div>
        <div className="App-header-home-3-container-1">
          <img className="App-header-home-1-img" src={bienvenida} alt={bienvenida} />
        </div>
      </header>


    </div>
  );
}

export default Home;
