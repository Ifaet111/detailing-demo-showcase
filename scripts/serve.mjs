import http from 'node:http';
import {stat,readFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..',process.argv[2]||'dist');
const port=Number(process.env.PORT||4187);
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'application/javascript; charset=utf-8','.svg':'image/svg+xml','.webp':'image/webp','.json':'application/json; charset=utf-8','.xml':'application/xml; charset=utf-8','.txt':'text/plain; charset=utf-8'};
const server=http.createServer(async(req,res)=>{
 try{const url=new URL(req.url,'http://localhost');const relative=decodeURIComponent(url.pathname).replace(/^\/+/, '');let target=path.resolve(root,relative);
 if(target!==root&&!target.startsWith(root+path.sep)){res.writeHead(403);res.end('Forbidden');return;}
 let info=await stat(target);if(info.isDirectory()){if(!url.pathname.endsWith('/')){res.writeHead(301,{Location:url.pathname+'/'});res.end();return;}target=path.join(target,'index.html');}
 const bytes=await readFile(target);res.writeHead(200,{'Content-Type':types[path.extname(target)]||'application/octet-stream','Cache-Control':'no-cache'});res.end(bytes);
 }catch{res.writeHead(404,{'Content-Type':'text/html; charset=utf-8'});res.end(await readFile(path.join(root,'404.html')).catch(()=>'<h1>404 — Страница не найдена</h1>'));}
});
server.on('error',error=>{console.error(error.code==='EADDRINUSE'?`Port ${port} is busy. Set PORT to another local port.`:error.message);process.exitCode=1;});
server.listen(port,'127.0.0.1',()=>console.log(`OFFSET preview: http://127.0.0.1:${port}`));
