const fs=require('node:fs/promises');
const path=require('node:path');
const {pathToFileURL}=require('node:url');
let playwright;try{playwright=require('playwright');}catch{const {createRequire}=require('node:module');const bundled=createRequire(process.env.WORKSPACE_NODE_MODULES+'/package.json');playwright=bundled('playwright');}
async function run(){
 const browser=await playwright.chromium.launch({headless:true,channel:process.env.BROWSER_CHANNEL||'msedge'});
 const checks=[];const assert=(value,name)=>{if(!value)throw Error(name);checks.push(name);};
 try{
 await fs.mkdir('.local',{recursive:true});const page=await browser.newPage({viewport:{width:1440,height:1050}});const errors=[];const failed=[];page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400)failed.push(r.url());});
 const base=process.env.TEST_URL||'http://127.0.0.1:4174';const goto=async(route,selector)=>{await page.goto(base+route);await page.waitForSelector(selector);};
 const count=async n=>page.waitForFunction(n=>document.querySelectorAll('#results .movie-card').length===n,n);
 await goto('','#results .movie-card');await count(8);assert(await page.locator('#results h3').first().innerText()==='Dune: Parte dos','orden por fecha de estreno');
 await page.locator('#search').fill('Nolan');await count(2);await page.locator('#genre').selectOption('Ciencia ficción');await count(1);assert((await page.locator('#results h3').innerText()).includes('Interstellar'),'búsqueda y género combinados');
 await page.locator('#reset').click();await count(8);await page.locator('#year').selectOption('2023');await count(2);await page.locator('[data-clear="year"]').click();await count(8);assert(await page.locator('#year').inputValue()==='','eliminar filtro activo sincroniza el formulario');
 await page.locator('#sort').selectOption('oldest');assert(await page.locator('#results h3').first().innerText()==='El origen','orden alternativo por fecha');
 await page.locator('#results [data-favorite]').first().click();await page.locator('[data-nav="favorites"]').click();await count(1);await page.reload();await count(1);assert((await page.locator('#results h3').innerText()).includes('El origen'),'favoritas persisten al recargar');
 await page.locator('#results h3 a').click();await page.waitForSelector('#comment-form');assert(await page.locator('h1').innerText()==='El origen','ficha individual');
 await page.locator('#alias').fill('BJ');await page.locator('#comment-rating').selectOption('5');const payload='<img src=x onerror="window.injected=true"> Una historia interesante.';await page.locator('#comment').fill(payload);await page.locator('#comment-form button[type="submit"]').click();await page.waitForSelector('.comment-card');assert((await page.locator('.comment-card p').innerText())===payload,'opinión almacenada como texto, sin ejecutar HTML');assert(await page.evaluate(()=>window.injected===undefined),'contenido no ejecuta scripts');await page.reload();await page.waitForSelector('.comment-card');assert(await page.locator('.comment-card').count()===1,'comentarios persisten al recargar');await page.locator('[data-comment-delete]').click();await page.waitForSelector('.comments-empty');assert(await page.locator('.comment-card').count()===0,'eliminar comentarios locales');
 await goto('#/acerca','#reading-size');await page.locator('#reading-size').focus();await page.keyboard.press('End');assert(await page.locator('#reading-output').innerText()==='125%','control CSS de lectura responde al teclado');await goto('#/pelicula/interstellar','.synopsis');assert(await page.locator('.synopsis p').evaluate(e=>parseFloat(getComputedStyle(e).fontSize)>14),'propiedad CSS modifica el tamaño de las reseñas');
 await page.screenshot({path:'.local/detail-desktop.png',fullPage:true});
 await goto('','#results .movie-card');await page.locator('#search').fill('pelicula-inexistente');await page.waitForSelector('.empty-state');await page.locator('[data-empty-reset]').click();await count(8);assert(await page.locator('#search').inputValue()==='','estado vacío permite recuperar el catálogo');
 await goto('#/pelicula/no-existe','.empty-state');assert((await page.locator('h1').innerText()).includes('no está'),'película inexistente controlada');
 await goto('','#results .movie-card');await page.evaluate(()=>document.fonts.ready);await page.screenshot({path:'.local/home-desktop.png',fullPage:true});await page.screenshot({path:'.local/home-desktop-viewport.png'});
 for(const [width,height,columns,label] of [[390,844,1,'mobile'],[640,960,2,'tablet'],[768,960,3,'desktop-baseline'],[1024,900,4,'desktop']]){
 await page.setViewportSize({width,height});await goto('','#results .movie-card');await page.locator('img').evaluateAll(imgs=>Promise.all(imgs.map(i=>{i.loading='eager';return i.decode().catch(()=>{});})));
 const data=await page.locator('#results .movie-card').evaluateAll(cards=>{const y=cards[0].getBoundingClientRect().top;return{columns:cards.filter(c=>Math.abs(c.getBoundingClientRect().top-y)<3).length,overflow:document.documentElement.scrollWidth>innerWidth};});assert(data.columns===columns&&!data.overflow,'grilla y ancho '+width+' px: '+columns+' columnas');
 await page.screenshot({path:'.local/'+label+'.png',fullPage:true});await page.screenshot({path:'.local/'+label+'-viewport.png'});
 if(width===390){await page.locator('.navbar-toggler').click();await page.waitForSelector('#navigation.show');await page.locator('[data-nav="favorites"]').click();await count(1);await page.waitForFunction(()=>!document.querySelector('#navigation').classList.contains('show'));assert(true,'menú Bootstrap móvil abre y cierra al navegar');}
 }
 await page.setViewportSize({width:390,height:844});await goto('#/pelicula/past-lives','#comment-form');assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'ficha móvil sin desbordamiento');
 const broken=await page.locator('img[src]').evaluateAll(images=>images.filter(i=>i.complete&&!i.naturalWidth).map(i=>i.src));assert(!broken.length,'imágenes disponibles');assert(!errors.length&&!failed.length,'sin errores de JavaScript ni recursos fallidos');
 if(!process.env.TEST_URL){const offline=await browser.newPage();await offline.goto(pathToFileURL(path.resolve('index.html')).href);await offline.waitForSelector('#results .movie-card');assert(await offline.locator('#results .movie-card').count()===8,'apertura directa sin servidor');await offline.close();}
 const report={result:'PASS',checks,viewports:[390,640,768,1024,1440],browser:'Chromium/Edge',time:new Date().toISOString()};await fs.writeFile('.local/browser-report.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report));
 }finally{await browser.close();}
}
run().catch(e=>{console.error(e);process.exitCode=1;});
