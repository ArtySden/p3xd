# UniGo

UniGo es un sitio web universitario creado para organizar tareas, encontrar lugares de comida, revisar eventos, consultar espacios útiles, leer tips académicos y enviar mensajes desde un formulario de contacto.

## Tecnologías usadas

- HTML5 con páginas separadas.
- CSS3 personalizado.
- JavaScript.
- React 18 desde CDN.
- ReactDOM desde CDN.
- Babel Standalone para usar JSX en el navegador.
- Tailwind CSS desde CDN.
- JSON para almacenar y leer la información principal.
- localStorage para guardar tareas y usuario en el navegador.

## Estructura del proyecto

```txt
UniGo_Profesional/
├── index.html
├── tareas.html
├── comida.html
├── eventos.html
├── lugares.html
├── tips.html
├── contactanos.html
├── README.md
├── css/
│   └── styles.css
├── js/
│   ├── context.js
│   ├── app.js
│   ├── home.js
│   ├── tareas.js
│   ├── comida.js
│   ├── eventos.js
│   ├── lugares.js
│   ├── tips.js
│   └── contactanos.js
├── data/
│   └── unigo.json
└── images/
    ├── bienvenida.jpg
    ├── charla.jpg
    └── futbol.jpg
```

## Páginas y funcionalidades

### Inicio
Presenta el proyecto, permite guardar un nombre de usuario y muestra tarjetas de acceso a cada sección.

### Tareas
Permite crear tareas con nombre, fecha y archivo opcional. Las tareas se guardan en `localStorage`, por eso no se pierden al recargar la página. También permite marcar como completada, pendiente, favorita o eliminar.

### Comida
Carga datos desde `data/unigo.json`. Tiene buscador por nombre, descripción, categoría, oferta o dirección. Cada comida muestra un detalle con dirección, horario, referencia, teléfono y mapa con Google Maps.

### Eventos
Muestra tarjetas de eventos cargadas desde JSON. Usa imágenes reales dentro de la carpeta `images`.

### Lugares
Muestra espacios útiles como biblioteca, coworking y centro de salud. Los servicios se renderizan usando `.map()`.

### Tips
Muestra consejos por categoría: productividad, memorización y bienestar. Usa botones tipo pestaña con accesibilidad básica.

### Contáctanos
Tiene formulario con validación robusta de nombre, correo y mensaje. Envía los datos mediante `fetch` con método `POST` a un servidor de prueba.

## Mejoras aplicadas

- Se eliminaron alertas y se reemplazaron por mensajes visibles en la interfaz.
- Se agregó manejo de errores al cargar JSON y al enviar formulario.
- Se agregó Context API para compartir datos globales.
- Se añadió persistencia con `localStorage`.
- Se mejoró la accesibilidad con `aria-label`, `aria-expanded`, `aria-invalid`, `role`, `tablist` y enlace para saltar al contenido.
- Se reforzó el responsive para pantallas pequeñas.
- Se añadieron animaciones suaves con CSS.
- Se separaron las páginas principales en HTML diferentes.
- No se incluye juego, porque no forma parte de los requisitos finales.

## Cómo ejecutar el proyecto

1. Descarga o clona el repositorio.
2. Abre `index.html` en el navegador.
3. Para evitar problemas con `fetch` al cargar el JSON, se recomienda usar Live Server en Visual Studio Code.

## Cómo publicar en GitHub Pages

1. Sube todo el proyecto a un repositorio de GitHub.
2. Entra a **Settings**.
3. Abre **Pages**.
4. En **Source**, selecciona la rama `main` y la carpeta `/root`.
5. Guarda los cambios.
6. GitHub generará un enlace público del sitio.
