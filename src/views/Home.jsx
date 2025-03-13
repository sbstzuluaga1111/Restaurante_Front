import Nav from "../components/Nav";
import "../css/Views.css/Home.css";
import bienvenida from "../resource/Imgs/Imagen1.jpg"

function Home() {
  return (
    <div className='App-home'>
      <Nav />


      <header className='App-header-home'>
    
      <h1>Restaurante(Titulo)</h1>
      <p>Bienvenida</p>
      
      </header>
      

      <header className='App-header-home-1'>

        <div className="App-header-home-1-container-1">
          <img className="App-header-home-1-img" src={bienvenida} alt={bienvenida} />
        </div>
        <div className="App-header-home-1-container-2">
          <h2>Titulo Descripcion 1</h2>
          <p>Descripcion 1...</p>
          <p>Descripcion 1...</p>
          <p>Descripcion 1...</p>
          <p>Descripcion 1...</p>
          <p>Descripcion 1...</p>
        </div>

      </header>


      <header className='App-header-home-2'>
        <h1>Home 2</h1>

<div className="App-header-home-2-conjunto">
<div class="App-header-home-2-card">
  <div class="App-header-home-2-content">
    <svg
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 9V5H4V9H20ZM20 11H4V19H20V11ZM3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3ZM5 12H8V17H5V12ZM5 6H7V8H5V6ZM9 6H11V8H9V6Z"
      ></path>
    </svg>
    <p class="App-header-home-2-para">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi laboriosam
      at voluptas minus culpa deserunt delectus sapiente inventore pariatur
    </p>
  </div>
</div>

<div class="App-header-home-2-card">
  <div class="App-header-home-2-content">
    <svg
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 9V5H4V9H20ZM20 11H4V19H20V11ZM3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3ZM5 12H8V17H5V12ZM5 6H7V8H5V6ZM9 6H11V8H9V6Z"
      ></path>
    </svg>
    <p class="App-header-home-2-para">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi laboriosam
      at voluptas minus culpa deserunt delectus sapiente inventore pariatur
    </p>
  </div>
</div>

<div class="App-header-home-2-card">
  <div class="App-header-home-2-content">
    <svg
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 9V5H4V9H20ZM20 11H4V19H20V11ZM3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3ZM5 12H8V17H5V12ZM5 6H7V8H5V6ZM9 6H11V8H9V6Z"
      ></path>
    </svg>
    <p class="App-header-home-2-para">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi laboriosam
      at voluptas minus culpa deserunt delectus sapiente inventore pariatur
    </p>
  </div>
</div>

</div>



      </header>


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
