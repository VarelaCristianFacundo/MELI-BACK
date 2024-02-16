# Mercado Libre API
## Proyecto en Node JS con Express 🚀

*API que interactúa con la plataforma de Mercado Libre. Proporciona endpoints para buscar productos y obtener detalles de un producto específico.*


## Contenido

- [Estructura del Proyecto](#estructura-del-proyecto)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Ejecución](#ejecución)
- [Documentación](#documentación)
- [Tests](#tests)
- [Logs](#logs)
- [Author](#Author)



## Estructura del Proyecto

```plaintext
└── 📁MELI BACK
    └── .gitignore
    └── package-lock.json
    └── package.json
    └── readme.md
    └── 📁src
        └── .env
        └── app.js
        └── 📁config
            └── logger.js
        └── 📁controllers
            └── itemsController.js
            └── searchController.js
        └── 📁logs
            └── app.log
        └── 📁middleware
            └── authentication.js
        └── 📁routes
            └── items.js
            └── search.js
        └── swaggerConfig.js
        └── 📁tests
            └── itemsController.test.js
            └── searchController.test.js
```

## Instalación
**1. Clona este repositorio:**

```bash
git clone https://github.com/VarelaCristianFacundo/MELI-BACK.git
cd MELI-BACK
```
**2. Instala las dependencias:**
```bash
npm install
```
## Configuración
Renombra el archivo demo.env a .env en la carpeta src y configura las variables de entorno necesarias, por ejemplo:
```bash
PORT=3000
AUTH_TOKEN=TuTokenSecreto
SECOND_TOKEN=TuTokenSecreto
```
## Ejecución
Inicia el servidor:
```bash
npm start
```
## Documentación
La documentación de la API se encuentra en la ruta /api-docs una vez que el servidor está en ejecución. Puedes acceder a ella desde tu navegador.
## Tests
```bash
npm test
```
## Logs
Los logs de la aplicación se encuentran en la carpeta logs en un archivo llamado app.log.

## Author

- [@VarelaCristianFacundo](https://github.com/VarelaCristianFacundo)