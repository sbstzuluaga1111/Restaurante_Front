import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
import { jwtDecode } from "jwt-decode";
import apiRoutes from "../config/apiRoutes";
import "../css/Views.css/b.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(apiRoutes.login, { // ⬅️ Aquí se usa apiRoutes.login
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Error en el login");
      }

      localStorage.setItem("token", data.token);

      // Decodificar token para obtener el rol
      const payload = jwtDecode(data.token);
      const role = payload.role;

      // Redirigir según el rol
      if (role === 1) {
        navigate("/admin");
      } else if (role === 2) {
        navigate("/empleado");
      } else {
        setError("Acceso denegado. No tienes permisos.");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className='App-b'>
      <Nav />
      <header className='App-header-b'>
        <form className="form" onSubmit={handleSubmit}>
          <p className="form-title">Sign in to your account</p>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <div className="input-container">
            <input 
              type="email"
              placeholder="Enter user"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-container">
            <input 
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="submit" type="submit">Sign in</button>
        </form>
      </header>
    </div>
  );
}

export default Login;
