import fs from 'node:fs/promises';
const helpers=(await fs.readFile('src/catalog.js','utf8')).replace(/^export /gm,'');
const movies=JSON.parse(await fs.readFile('src/movies.json','utf8'));
const app=(await fs.readFile('src/app.js','utf8')).replace(/^import .*?;\r?\n/,'');
await fs.mkdir('assets/js',{recursive:true});await fs.writeFile('assets/js/runtime.js',`(()=>{\n'use strict';\nconst movies=${JSON.stringify(movies)};\n${helpers}\n${app}\n})();\n`);
console.log('Aplicación generada con catálogo local y funcionamiento sin módulos externos.');
