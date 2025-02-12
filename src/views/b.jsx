import Nav from "../components/Nav";

import "../css/Views.css/b.css"

function b() {
  return (
    <div className='App-b'>
        <Nav/>
        <header className='App-header-b'>

    <form class="form">
       <p class="form-title">Sign in to your account</p>
        <div class="input-container">
          <input placeholder="Enter user" type="email"></input>
          <span>
            <svg stroke="currentColor" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
             
            </svg>
          </span>
      </div>
      <div class="input-container">
          <input placeholder="Enter password" type="password"></input>

          <span>
            <svg stroke="currentColor" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
             
            </svg>
          </span>
        </div>
         <button class="submit" type="submit">
        Sign in
      </button>
   </form>

        </header>
    </div>
  );
}

export default b;