// La verdad no se que esta fallando DIRECTAMENTE con el renderizado de los datos ya que inicia sesion, carga el token pero no carga los logs del iniciamiento del contador
// se intento de multiples formas de forzar un recargado de la pantalla para que se vea la parte de la inactividad, a la par que la inactividad
// como tampoco re-renderiza la pagina al cerrar sesion, sigue estableciendo el contador cuando se le dio a F5 manualmente para que cargue el contador de
// inactividad

import { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();
const INACTIVITY_TIME = 1 * 60 * 1000; // ⏳ 1 minuto de inactividad

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [forceRender, setForceRender] = useState(0); // ⏳ Estado forzado
    const inactivityTimer = useRef(null);
    const logoutRef = useRef(null); // 🔹 Referencia a logout

    // 🔄 Reiniciar temporizador de inactividad (Ahora usa logoutRef en lugar de logout directamente)
    const resetInactivityTimer = useCallback(() => {
        if (!user) return; // 🔥 Solo si el usuario está autenticado
        console.log("🔄 Reseteando temporizador de inactividad...");
        if (inactivityTimer.current) {
            clearTimeout(inactivityTimer.current);
        }
        inactivityTimer.current = setTimeout(() => {
            console.log("⏳ Tiempo de inactividad alcanzado, cerrando sesión...");
            logoutRef.current?.(); // 🔹 Usamos la referencia en lugar de llamar directamente a logout
        }, INACTIVITY_TIME);
    }, [user]);

    // 🛑 Cerrar sesión
    const logout = useCallback(() => {
        console.log("🚪 Cierre de sesión iniciado");
    
        // ❌ Eliminar token y usuario
        localStorage.removeItem("token");
        console.log("🗑️ Token eliminado:", localStorage.getItem("token")); // 🔍 Verificar si realmente se eliminó
    
        // 🔄 Forzar recarga en todas las pestañas
        localStorage.setItem("forceLogout", Date.now());
    
        // 🛑 Detener temporizador de inactividad
        if (inactivityTimer.current) {
            clearTimeout(inactivityTimer.current);
            inactivityTimer.current = null;
        }
        setUser(null);
    
        // 🔻 Eliminar eventos de actividad
        console.log("🔻 Eliminando eventos de actividad...");
        window.removeEventListener("mousemove", resetInactivityTimer);
        window.removeEventListener("keydown", resetInactivityTimer);
        window.removeEventListener("click", resetInactivityTimer);
    
        // 🔄 Notificar a todas las pestañas
        window.dispatchEvent(new Event("storage"));
    
        // 🚀 FORZAR RECARGA TOTAL
        console.log("🔄 Recargando con window.location.href...");
        setTimeout(() => {
            window.location.href = "/";
        }, 500);
    }, [resetInactivityTimer]);
    

     
    

    // 🔹 Actualizar referencia a logout después de definirlo
    useEffect(() => {
        logoutRef.current = logout;
    }, [logout]);

    // 🔄 Sincronizar cierre de sesión entre pestañas
    useEffect(() => {
        const handleStorageChange = (event) => {
            if (event.key === "forceLogout") {
                console.log("🔄 Detectado cambio en 'forceLogout', recargando...");
                window.location.reload();
            }
        };

        window.addEventListener("storage", handleStorageChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);


    // 🛠️ Sincronizar autenticación
    const syncAuth = useCallback(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            console.log("⚠️ No hay token, usuario no autenticado.");
            setUser(null);
            return;
        }
    
        try {
            const decodedToken = jwtDecode(token);
            console.log("✅ Usuario autenticado:", decodedToken);
            setUser(decodedToken);
            setForceRender(prev => prev + 1); // 🔄 Forzar render
        } catch (error) {
            console.error("❌ Error al decodificar token:", error);
            localStorage.removeItem("token");
            setUser(null);
        }
    }, []);
    

    useEffect(() => {
        syncAuth(); // Ejecutar al montar

        // 📌 Escuchar cambios en `localStorage`
        window.addEventListener("storage", syncAuth);

        return () => {
            console.log("🔻 Eliminando eventos...");
            window.removeEventListener("storage", syncAuth);
        };
    }, [syncAuth]);

    useEffect(() => {
        if (!user) return; // 🔥 Solo manejar inactividad si hay usuario autenticado

        console.log("🟢 Iniciando detección de inactividad...");
        resetInactivityTimer();

        window.addEventListener("mousemove", resetInactivityTimer);
        window.addEventListener("keydown", resetInactivityTimer);
        window.addEventListener("click", resetInactivityTimer);

        return () => {
            console.log("🔻 Eliminando eventos de actividad...");
            window.removeEventListener("mousemove", resetInactivityTimer);
            window.removeEventListener("keydown", resetInactivityTimer);
            window.removeEventListener("click", resetInactivityTimer);
            if (inactivityTimer.current) {
                clearTimeout(inactivityTimer.current);
            }
        };
    }, [user, resetInactivityTimer]); // Ahora solo se ejecuta cuando `user` cambia

    // 🔑 Iniciar sesión
    const login = (token) => {
        console.log("📝 Guardando token:", token);
        localStorage.setItem("token", token);
        
        try {
            const decodedToken = jwtDecode(token);
            setUser(decodedToken); // 🔄 Asegurar que el estado de usuario se actualiza primero
            setForceRender(prev => prev + 1); // 🔄 Forzar re-render
        } catch (error) {
            console.error("❌ Error al decodificar token:", error);
        }
    
        window.dispatchEvent(new Event("storage")); // 🔄 Notificar otras pestañas
    
        // 🔄 Recargar la página después de 500ms para asegurarse de que todo se actualiza correctamente
        setTimeout(() => {
            window.location.reload();
        }, 500);
    };
    

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            <div key={forceRender}> {/* 🔹 Este key forzará el re-render cuando cambie el estado */}
                {children}
            </div>
        </AuthContext.Provider>
    );
    
};

export const useAuth = () => useContext(AuthContext);
