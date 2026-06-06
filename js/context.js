const AppContext = React.createContext(null);
const DATA_URL = "data/unigo.json";
const STORAGE_TAREAS = "unigo_tareas_v2";
const STORAGE_USUARIO = "unigo_usuario_v2";

function leerLocalStorage(clave, valorInicial) {
  try {
    const guardado = localStorage.getItem(clave);
    return guardado ? JSON.parse(guardado) : valorInicial;
  } catch (error) {
    console.error("Error leyendo localStorage:", error);
    return valorInicial;
  }
}

function guardarLocalStorage(clave, valor) {
  try {
    localStorage.setItem(clave, JSON.stringify(valor));
    return true;
  } catch (error) {
    console.error("Error guardando localStorage:", error);
    return false;
  }
}

function validarTexto(valor, minimo = 2) {
  return typeof valor === "string" && valor.trim().length >= minimo;
}

function validarEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function AppProvider({ children }) {
  const [data, setData] = React.useState(null);
  const [cargando, setCargando] = React.useState(true);
  const [error, setError] = React.useState("");
  const [usuario, setUsuarioEstado] = React.useState(() => leerLocalStorage(STORAGE_USUARIO, ""));
  const [tareas, setTareasEstado] = React.useState(() => leerLocalStorage(STORAGE_TAREAS, []));

  React.useEffect(() => {
    let activo = true;

    fetch(DATA_URL)
      .then((respuesta) => {
        if (!respuesta.ok) {
          throw new Error("No se pudo cargar el archivo.");
        }
        return respuesta.json();
      })
      .then((json) => {
        if (activo) {
          setData(json);
          setError("");
        }
      })
      .catch((err) => {
        if (activo) {
          setError(err.message || "Ocurrió un error cargando los datos.");
        }
      })
      .finally(() => {
        if (activo) setCargando(false);
      });

    return () => {
      activo = false;
    };
  }, []);

  function setUsuario(nombre) {
    const limpio = nombre.trim();
    setUsuarioEstado(limpio);
    guardarLocalStorage(STORAGE_USUARIO, limpio);
  }

  function setTareas(nuevasTareas) {
    setTareasEstado(nuevasTareas);
    const guardado = guardarLocalStorage(STORAGE_TAREAS, nuevasTareas);
    if (!guardado) {
      setError("Las tareas no se pudieron guardar en el navegador.");
    }
  }

  const valor = {
    data,
    cargando,
    error,
    usuario,
    tareas,
    setUsuario,
    setTareas,
    setError
  };

  return <AppContext.Provider value={valor}>{children}</AppContext.Provider>;
}

function useApp() {
  return React.useContext(AppContext);
}
