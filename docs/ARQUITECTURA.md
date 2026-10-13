# Arquitectura y decisiones técnicas

## Aplicación

HTML semántico, CSS personalizado, Bootstrap 5.3.8 y JavaScript. `src/movies.json` contiene ocho películas y reseñas editoriales. `scripts/build.mjs` incorpora esos datos y las funciones en un runtime clásico: el sitio funciona por HTTPS y al abrir `index.html` directamente.

El proyecto utiliza `header`, `nav`, `main`, `section`, `article`, `figure`, `figcaption`, `footer`, encabezados jerárquicos y etiquetas asociadas a los formularios. HTML5 se usa con nombres de etiquetas en minúsculas, atributos entre comillas y estructura consistente; no se presenta como una aplicación servida con MIME XHTML.

La grilla del catálogo utiliza `col-12 col-sm-6 col-md-4 col-lg-3`. Por debajo de 576 px aparece una columna; desde 576 px aparecen dos; desde 768 px aparecen tres; desde 992 px se amplía a cuatro. Los puntos de prueba de la actividad son 390, 640 y 1024 px. Estas categorías corresponden a anchos de viewport y no a la detección del dispositivo.

## DOM y CSSOM en el proyecto

- El DOM permite leer la búsqueda, escuchar eventos `input`, `click` y `submit`, renderizar tarjetas y actualizar el contador de favoritas.
- El CSSOM representa reglas, media queries y declaraciones de estilos. Bootstrap y la hoja personalizada determinan grillas, contraste y distribución.
- El control de lectura ejecuta `document.documentElement.style.setProperty('--review-scale', valor)`. Modifica una declaración CSS y provoca el recálculo de los estilos de reseñas y sinopsis.
- Los resultados se actualizan dentro de `#results`, manteniendo los controles de búsqueda. Se evita reconstruir toda la página con cada pulsación.

## Estado y privacidad

Favoritas y comentarios usan `localStorage`; se validan los datos al recuperarlos. No se comparten entre visitantes. Los comentarios tienen límites de longitud y se escapan antes de incluirlos como texto en HTML. El alias es local; no se solicita correo ni teléfono.

No hay autenticación, API de comentarios, moderación central, pagos ni reproducción de películas. Para uso comercial con comentarios compartidos haría falta un backend y medidas adicionales de seguridad y moderación.

## Hosting en AWS

Visitante → CloudFront por HTTPS → bucket S3 privado, mediante Origin Access Control (OAC).

Se usa un origen dedicado para esta actividad. Los archivos se cifran en S3 con AES256, el acceso público directo se bloquea y la política del bucket limita la lectura a la distribución correspondiente. CloudFront comprime los recursos compatibles. Las rutas con `#` permiten navegar sin reescrituras especiales del servidor.

Bootstrap, fuentes y portadas se alojan en el mismo sitio. No se necesitan servidores permanentes, base de datos, dominio comprado ni llamadas a una API cinematográfica. El costo final depende del consumo y de las condiciones de la cuenta AWS; no se garantiza costo cero.

## Recursos visuales

Las portadas e ilustración principal son SVG editoriales propios. No son afiches oficiales ni fotogramas de películas. Las fuentes DM Sans y Manrope incluyen licencias SIL; Bootstrap incluye su licencia MIT. Los títulos de películas y sus titulares se reconocen en la documentación de fuentes.
