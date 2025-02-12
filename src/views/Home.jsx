import Footer from "../components/Footer";
import Nav from "../components/Nav";
import "../css/Views.css/Home.css"

function Home() {
  return (
    <div className='App-home'>
      <Nav />
      <header className='App-header-home'>
        <h1>Home</h1>
      </header>
      <header className='App-header-home-1'>
        <h1>Home 1</h1>
      </header>
      <header className='App-header-home-2'>
        <h1>Home 2</h1>
      </header>
      <header className='App-header-home-3'>
        <h1>Home 3</h1>
      </header>
      <Footer />
    </div>
  );
}

export default Home;
