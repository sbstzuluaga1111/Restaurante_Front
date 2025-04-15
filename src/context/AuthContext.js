import { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();
const INACTIVITY_TIME = 15 * 60 * 1000; // ⏳ 10 minuto de inactividad

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [timeLeft, setTimeLeft] = useState(INACTIVITY_TIME / 1000);
    const inactivityTimer = useRef(null);
    const countdownInterval = useRef(null);
    const userRef = useRef(user);
    const navigate = useNavigate();
    const isMounted = useRef(true); 

    useEffect(() => {
        isMounted.current = true;
        return () => { isMounted.current = false; };// 🔴 Se desmonta el componente
    }, []);

    // ✅ Función para cerrar sesión
    const logout = useCallback(async () => {
        console.log("🚪 Cierre de sesión iniciado");

        const token = localStorage.getItem("token");
        if (token) {
            await fetch("http://localhost:3010/api/logout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token }),
            });
        }

        localStorage.removeItem("token");
        localStorage.removeItem("user"); // 🧹 También limpiamos el user guardado
        setUser(null);
        userRef.current = null;

        if (inactivityTimer.current) {
            clearTimeout(inactivityTimer.current);
            inactivityTimer.current = null;
        }
        if (countdownInterval.current) {
            clearInterval(countdownInterval.current);
            countdownInterval.current = null;
        }

        localStorage.setItem("forceLogout", Date.now());
        window.dispatchEvent(new Event("storage"));

        if (isMounted.current) {
            navigate("/");
        }
    }, [navigate]);

    // ✅ Función para validar sesión con el backend
    const validateSession = useCallback(async () => {
        const token = localStorage.getItem("token");
        if (!token) return;
    
        try {
            const response = await fetch("http://localhost:3010/api/verify-token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });
    
            const data = await response.json();
            if (!data.valid) {
                console.log("🔴 Sesión inválida, cerrando...");
                logout();
            }
        } catch (error) {
            console.error("Error validando sesión:", error);
        }
    }, [logout]); // ✅ Agregamos logout como dependencia

    // 🔄 Reinicio del temporizador de inactividad
    const resetInactivityTimer = useCallback(() => {
        if (!userRef.current) return;
        console.log("🔄 Reiniciando temporizador de inactividad...");
        setTimeLeft(INACTIVITY_TIME / 1000);

        if (inactivityTimer.current) {
            clearTimeout(inactivityTimer.current);
        }
        inactivityTimer.current = setTimeout(() => {
            console.log("⏳ Tiempo de inactividad alcanzado, cerrando sesión...");
            logout();
        }, INACTIVITY_TIME);
    }, [logout]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                if (storedUser) {
                    const parsedUser = JSON.parse(storedUser);
                    setUser(parsedUser);
                    userRef.current = parsedUser;
                } else {
                    setUser(decodedToken);
                setUser(decodedToken);
                    userRef.current = decodedToken;
                userRef.current = decodedToken;
                }
                resetInactivityTimer();
                validateSession(); // 🔥 Validar token al cargar la app
            } catch (error) {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                setUser(null);
                userRef.current = null;
            }
        }
    }, [resetInactivityTimer, validateSession]);

    useEffect(() => {
        if (!userRef.current) {
            if (countdownInterval.current) {
                clearInterval(countdownInterval.current);
                countdownInterval.current = null;
            }
            return;
        }

        if (countdownInterval.current) {
            clearInterval(countdownInterval.current);
        }
        countdownInterval.current = setInterval(() => {
            setTimeLeft(prev => {
                if (!userRef.current || prev <= 1) {
                    console.log("⏳ Tiempo agotado o usuario no autenticado, cerrando sesión...");
                    clearInterval(countdownInterval.current);
                    countdownInterval.current = null;
                    logout();
                    return 0;
                }
                //console.log(`⏳ Tiempo restante para cierre de sesión: ${prev - 1} segundos`);
                return prev - 1;
            });
        }, 1000);

        return () => {
            if (countdownInterval.current) {
                clearInterval(countdownInterval.current);
                countdownInterval.current = null;
            }
        };
    }, [logout]);

    // ⏳ Detectar actividad del usuario
    useEffect(() => {
        const handleActivity = () => {
            if (userRef.current) {
                resetInactivityTimer();
            }
        };

        window.addEventListener("mousemove", handleActivity);
        window.addEventListener("keydown", handleActivity);
        window.addEventListener("click", handleActivity);

        return () => {
            window.removeEventListener("mousemove", handleActivity);
            window.removeEventListener("keydown", handleActivity);
            window.removeEventListener("click", handleActivity);
        };
    }, [resetInactivityTimer]);

    // 🔥 Detectar cambios en el localStorage (forceLogout desde otra pestaña)
    useEffect(() => {
        const handleStorageChange = (event) => {
            if (event.key === "forceLogout") {
                logout();
            }
        };

        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, [logout]);

    // ✅ Función para iniciar sesión y validar el token con el backend
    const login = useCallback(async (token) => {
        localStorage.setItem("token", token);

        try {
            const decodedToken = jwtDecode(token);
            setUser(decodedToken);
            userRef.current = decodedToken;
            localStorage.setItem("user", JSON.stringify(decodedToken)); // ✅ guardar user
            resetInactivityTimer();

            // 🔥 Validar sesión con el backend
            await validateSession();
        } catch (error) {
            console.error("Error al decodificar el token:", error);
            localStorage.removeItem("token");
            localStorage.removeItem("user");
        }

        window.dispatchEvent(new Event("storage"));
    }, [resetInactivityTimer, validateSession]);

    const updateUser = (newUserData) => {
        const updated = { ...userRef.current, ...newUserData };
        setUser(updated);
        userRef.current = updated;
        localStorage.setItem("user", JSON.stringify(updated)); // ✅ actualizar localStorage
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, updateUser, timeLeft }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
