import { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();
const INACTIVITY_TIME = 5 * 60 * 1000; // ⏳ 1 minuto de inactividad

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const inactivityTimer = useRef(null); // ✅ Persistencia del temporizador

    // 🛑 Función para cerrar sesión
    const logout = useCallback(() => {
        console.log("🚪 Cierre de sesión por inactividad");
        localStorage.removeItem("token");
        setUser(null);
        window.location.href = "/"; // Redirige al usuario al home
    }, []);

    // 🔄 Reinicia el temporizador si hay actividad
    const resetInactivityTimer = useCallback(() => {
        console.log("🔄 Reseteando temporizador de inactividad...");
        if (inactivityTimer.current) {
            console.log("🛑 Limpiando temporizador anterior...");
            clearTimeout(inactivityTimer.current);
        }
        inactivityTimer.current = setTimeout(() => {
            console.log("⏳ Tiempo de inactividad alcanzado, cerrando sesión...");
            logout();
        }, INACTIVITY_TIME);
    }, [logout]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            console.log("⚠️ No hay token, usuario no autenticado.");
            return;
        }

        try {
            const decodedToken = jwtDecode(token);
            console.log("✅ Usuario autenticado:", decodedToken);
            setUser(decodedToken);
            resetInactivityTimer(); // Reiniciar temporizador al cargar

            // 📌 Escuchar eventos de actividad del usuario
            window.addEventListener("mousemove", resetInactivityTimer);
            window.addEventListener("keydown", resetInactivityTimer);
            window.addEventListener("click", resetInactivityTimer);

            return () => {
                console.log("🔻 Eliminando eventos de actividad...");
                window.removeEventListener("mousemove", resetInactivityTimer);
                window.removeEventListener("keydown", resetInactivityTimer);
                window.removeEventListener("click", resetInactivityTimer);
                if (inactivityTimer.current) {
                    console.log("🧹 Limpiando temporizador al desmontar...");
                    clearTimeout(inactivityTimer.current);
                }
            };
        } catch (error) {
            console.error("❌ Error al decodificar token:", error);
            localStorage.removeItem("token");
        }
    }, [resetInactivityTimer]);

    const login = (token) => {
        console.log("📝 Guardando token:", token);
        localStorage.setItem("token", token);

        try {
            const decodedPayload = jwtDecode(token);
            console.log("🔑 Usuario autenticado:", decodedPayload);

            setUser({
                usuarioId: decodedPayload.usuarioId,
                email: decodedPayload.email,
                role: decodedPayload.role,
            });

            resetInactivityTimer(); // Iniciar el contador tras iniciar sesión
        } catch (error) {
            console.error("❌ Error al decodificar el token:", error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
