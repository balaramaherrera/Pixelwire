# RicardoInfoTv — sitio de noticias de política y geopolítica

Sitio estático (HTML/CSS/JS puro, sin frameworks). No necesita Node.js:
se abre directamente en el navegador o con Live Server.

Las noticias, secciones y cuentas de usuario se administran desde el
propio sitio (botones "Editar", "Agregar noticia", "Editar sección")
y se guardan en el navegador (localStorage). No depende de ninguna
API externa de noticias.

## Estructura
```
├── index.html            → Página de inicio
├── seccion.html          → Vista de una sección (Política, Opinión, Bono y banca, Cultura)
├── articulo.html         → Vista de una noticia individual
├── agregar-noticia.html  → Formulario para publicar una noticia nueva
├── editar.html           → Formulario para editar una noticia existente
├── editar-seccion.html   → Formulario para editar el título/descripción/color de una sección
├── login.html            → Inicio de sesión
├── cuenta.html           → Panel de usuario (requiere sesión iniciada)
├── css/style.css         → Todos los estilos
└── js/
    ├── news.js           → Noticias de fábrica + noticias creadas por el usuario
    ├── sections.js       → Secciones (Política y geopolítica, Análisis y opinión, Bono y banca, Cultura y economía)
    ├── main.js           → Lógica compartida (tarjetas, menú, navegación según sesión)
    └── auth.js           → Inicio de sesión y sesión activa
```

## Cómo probarlo
1. Abre la carpeta en VS Code.
2. Clic derecho en `index.html` → **"Open with Live Server"**
   (o doble clic en el archivo para abrirlo directo en el navegador).

## Notas
- No hay registro de cuentas nuevas desde el sitio: el login funciona
  con cuentas ya existentes en `localStorage` de ese navegador.
- No hay tienda ni carrito de compras.
