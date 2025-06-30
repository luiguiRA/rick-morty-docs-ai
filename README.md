# Rick & Morty Docs
Web app construida con Next.js 14, que consume datos en tiempo real de la Rick & Morty API, los muestra visualmente y utiliza Google Gemini para generar descripciones creativas con IA.


## Tecnologías utilizadas

- **Next.js 14 (App Router)**: SSR/SSG híbrido, estructura modular.
- **React 18**: separación cliente-servidor.
- **TailwindCSS**: para el diseño rápido y responsivo.
- **Rick & Morty API** fuente de datos externa,.
- **Google Gemini API** para generación de texto con IA.

---

## Justificación técnica

### Framework seleccionado: **Next.js**

Se eligió Next.js por su enfoque híbrido que permite combinar renderizado estático (SSG) y dinámico (SSR). 
Esto facilita el consumo eficiente de la Rick & Morty API, mejorando la carga inicial sin comprometer interactividad. 
El sistema de rutas con `App Router` promueve una arquitectura modular con layouts persistentes y carga eficiente de componentes.

### Librería de estilos: **TailwindCSS**

Tailwind permite construir interfaces modernas sin escribir CSS desde cero. Su enfoque utilitario mejora la productividad y mantiene una consistencia visual en todos los componentes. 
Además, su integración con Next.js es sencilla y optimizada para producción.


---

## Estrategias de rendimiento implementadas

### Incremental Static Regeneration (ISR)

Por el consumo de la API como de Rick & Morty, se usa el 'export const revalidate = 3600' Tiene la funcionalidad de regenerar páginas estáticas cada hora. Se asegura que la información se mantenga constantemente la actualización sin reconstruir el sitio.

### Lazy Loading y Partial Hydration

El componente GenerateSummaryButton se hidrata de forma parcial mediante "use client", nos permite cargarlo solo en el cliente cuando es necesario. Como estrategia de mejor rendimiento inicial al evitar hidratar componentes no esenciales en el servidor, reduciendo el tiempo de carga y el tamaño del JS inicial.

### SSG SSR

La utilización de Next.js 14 permite el uso de SSG Y SSR:

SSG (Static Site Generation): Se aplica en la página principal y vistas de personajes, ya que los datos de la API van variando de cada personaje. Esto permite generar las páginas de forma anticipada, mejorando la velocidad de carga y no tener que generarse o descargarse de nuevo cada vez que se necesita.

SSR (Server-Side Rendering): Se puede usarse en futuras secciones que dependan de información sensible o personalizada, se puede plantear para perfiles de usuario, favoritos o historial, donde el contenido debe generarse dinámicamente por sesión.

---

# Funcionalidades

### Página principal

- Carga los primeros personajes desde la API.
- Renderiza una cuadrícula de tarjetas con imagen y nombre.
- Redirige al detalle del personaje al hacer clic.

### Búsqueda por ID

- En el navbar, puedes escribir el ID de un personaje y consultar directamente su vista detallada.

### Vista de detalle (Try it out)

- Muestra:
  - Nombre
  - Estado
  - Especie
  - Género
  - Imagen
- JSON crudo de la API en formato `<pre>`.
- Componente `not-found` en caso de error 404 (ID no existente).

### Generación con IA

- Botón **"Generar resumen con IA"** en cada personaje.
- Envía los datos a Google Gemini con un prompt personalizado.
- Muestra una descripción creativa y temática de ciencia ficción.

---

## Guía de implementación

1. Clona el repositorio

```c++
git clone  https://github.com/luiguiRA/rick-morty-docs-ai.git
```

2. Instala dependencias

```c++
npm install
```

3. Crear un archivo .env.local

```c++
# .env.local

GEMINI_API_KEY=TU_CLAVE_AQUI
```

4. Ejecutar localmente

```c++
npm run dev
```

## Enlace de Despliegue

### Netlify

https://rickandmortykushki.netlify.app/
