# Evidencias de validación

## Resultado

- Ocho pruebas automatizadas de catálogo: aprobadas.
- Veintitrés comprobaciones de navegador sobre la versión local: aprobadas.
- Veintidós comprobaciones sobre la versión pública de CloudFront: aprobadas (la apertura directa del archivo se prueba únicamente en local).
- Estructura del documento HTML comprobada como XML bien formado, conservando entrega por MIME HTML.

## Funcionalidad

Orden por fecha de estreno; búsqueda por título, director y actor; filtros de género y año; eliminación de filtros activos; orden alternativo; favoritas persistentes; ficha individual; comentarios guardados como texto; entrada que contiene HTML sin ejecución; persistencia y eliminación de comentarios; control de lectura por teclado; recálculo de tamaño mediante propiedad CSS; recuperación del estado vacío; película inexistente; imágenes disponibles y ausencia de errores de JavaScript o recursos fallidos.

## Adaptación a pantallas

| Ancho de pantalla | Grilla del catálogo | Resultado |
| --- | --- | --- |
| 390 px | Una columna, `col-12` | Aprobado; menú Bootstrap colapsable; ficha sin desbordamiento |
| 640 px | Dos columnas, `col-sm-6` | Aprobado |
| 768 px | Tres columnas, `col-md-4` | Aprobado |
| 1024 px | Cuatro columnas, mejora `col-lg-3` | Aprobado |
| 1440 px | Navegación y recorrido completo | Aprobado |

Pruebas ejecutadas en Chromium/Edge, con contextos de navegador aislados. No son una certificación universal de compatibilidad ni una medición de rendimiento de todos los dispositivos.

## Comandos reproducibles

```sh
npm run build
npm test
npm run check
npm run dev
```

La prueba de navegador requiere Playwright y un navegador compatible. Tras instalar esas herramientas en el entorno de desarrollo, ejecutar `node tests/browser.cjs`. `TEST_URL` permite probar otra dirección del sitio. `BROWSER_CHANNEL` selecciona el canal disponible; por defecto usa `msedge`. La aplicación publicada no depende de Playwright.
