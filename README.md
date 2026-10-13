# CineFrame - AA1 de Desarrollo de Software Web Frontend

**Estudiante:** Breyner Javier Montalvo Peñarredonda  
**Programa:** Ingeniería de Software  
**Institución:** UCompensar

Sitio de reseñas de películas con HTML semántico, Bootstrap 5.3.8, CSS adaptable y JavaScript. Incluye ocho fichas, búsqueda por título/director/actor, filtros por género y año, ordenamiento por fecha, favoritas persistentes y comentarios locales.

## Consultar y ejecutar

La versión pública y el repositorio se registran en `docs/ENTREGA.md` una vez verificados. Para consultar sin conexión, abrir `index.html` directamente. Bootstrap, fuentes, ilustraciones y datos están incluidos; no se necesita una clave de API.

Con Node.js 22 o superior:

```sh
npm run dev
```

Abrir `http://127.0.0.1:4174`. No requiere `npm install` para construir o ejecutar el sitio.

```sh
npm run build
npm test
npm run check
```

Después de editar `src/app.js`, `src/catalog.js` o `src/movies.json`, reconstruir el archivo ejecutable de la aplicación con `npm run build`. Las portadas se regeneran con `node scripts/generate-art.mjs`.

## Cumplimiento de la actividad

| Requisito | Implementación |
| --- | --- |
| Foro DOM y CSSOM | `docs/FORO.md`, con fundamentos y ejemplos del proyecto |
| Catálogo por fecha | Orden predeterminado por estreno descendente |
| Búsqueda y filtros | Texto, género y año combinados; reinicio y estado vacío |
| Ficha de película | Sinopsis, reseña, dirección, actores, fecha, duración y portada |
| Favoritas | Lista persistente en el navegador |
| Comentarios opcionales | Alias, valoración, opinión, validación y eliminación local |
| Uso de Bootstrap | CSS y paquete JavaScript 5.3.8 servidos localmente; grillas, formularios y menú colapsable |
| Móvil <576 px | `col-12`, probado a 390 px |
| Tableta ≥576 px | `col-sm-6`, probado a 640 px |
| Escritorio ≥768 px | `col-md-4`, probado a 768 px; mejora a cuatro columnas desde 992 px |
| Carpeta de entrega | `AA1_Montalvo_Peñarredonda_BreynerJavier` |
| Foro de marketing y dos respuestas | Participación y bases para adaptar a publicaciones reales en `docs/FORO.md` |

Se aplican buenas prácticas de estructura, etiquetas en minúsculas, atributos entre comillas y semántica HTML. La página se sirve como HTML5, no como XML/XHTML.

## Alcance

Las favoritas y comentarios se almacenan solo en el navegador del visitante. No se comparten entre personas, no existe autenticación y no hay un sistema central de moderación. Las valoraciones son editoriales. Las portadas son ilustraciones propias, no afiches oficiales. El proyecto no reproduce películas.

## Entrega

La carpeta del proyecto, el informe técnico y las evidencias deben enviarse por el enlace **Subir Actividad** del aula virtual, según las instrucciones. Publicar en AWS y GitHub facilita la revisión, pero no sustituye esa entrega.

Arquitectura, licencias, fuentes y pruebas se documentan en `docs/`. Ninguna credencial ni archivo privado de infraestructura debe formar parte del repositorio o del ZIP.
