import Card from "../components/Card";
import Nav from "../components/Nav";

import "../css/Views.css/Menu.css"

function Menu() {
        return (
                <div className='App-menu'>
                        <Nav />
                        <header className='App-header-menu'>
                                <h1>Menu</h1>

                                <div className="App-header-menu-categoria">
                                        <h1>Categoria:</h1>
                                </div>
                                <div className="App-header-menu-list">
                                        <Card />
                                        <Card />
                                        <Card />
                                        <Card />
                                        <Card />
                                </div>

                                <div className="App-header-menu-categoria">
                                        <h1>Categoria:</h1>
                                </div>
                                <div className="App-header-menu-list">
                                        <Card />
                                </div>

                                <div className="App-header-menu-categoria">
                                        <h1>Categoria:</h1>
                                </div>
                                <div className="App-header-menu-list">
                                        <Card />
                                </div>

                        </header>

                </div>
        );
}

export default Menu;