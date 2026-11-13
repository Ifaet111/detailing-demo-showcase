import {readFile,readdir,stat} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {spawnSync} from 'node:child_process';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../src');
async function walk(dir){const out=[];for(const item of await readdir(dir,{withFileTypes:true})){const p=path.join(dir,item.name);if(item.isDirectory())out.push(...await walk(p));else out.push(p);}return out;}
const files=await walk(root);let errors=[];let refs=0;
for(const file of files){
 if(file.endsWith('.js')){const r=spawnSync(process.execPath,['--check',file],{encoding:'utf8'});if(r.status)errors.push(r.stderr);}
 if(!file.endsWith('.html'))continue;const html=await readFile(file,'utf8');
 if(!/<html lang="ru"/.test(html))errors.push(file+': lang missing');
 if((html.match(/<h1[\s>]/g)||[]).length!==1)errors.push(file+': needs exactly one h1');
 if(/href=["']#["']/.test(html))errors.push(file+': empty anchor');
 const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);if(new Set(ids).size!==ids.length)errors.push(file+': duplicate IDs');
 for(const match of html.matchAll(/\b(?:src|href)="([^"]+)"/g)){
 const link=match[1];if(/^(https?:|mailto:|data:)/.test(link))continue;
 const [url,hash]=link.split('#');let target=url?path.resolve(path.dirname(file),url):file;
 try{if((await stat(target)).isDirectory())target=path.join(target,'index.html');await stat(target);refs++;if(hash&&target.endsWith('.html')){const content=await readFile(target,'utf8');if(!content.includes(`id="${hash}"`))errors.push(`${file}: missing anchor ${link}`);}}catch{errors.push(`${file}: missing ${link}`);}
 }
 for(const img of html.matchAll(/<img\b[^>]*>/g)){if(!/\balt="[^"]*"/.test(img[0]))errors.push(file+': image lacks alt');if(!/\bwidth=/.test(img[0])||!/\bheight=/.test(img[0]))errors.push(file+': image lacks dimensions');}
}
if(errors.length){console.error(errors.join('\n'));process.exitCode=1;}else console.log(`PASS: ${files.filter(f=>f.endsWith('.html')).length} HTML pages, ${refs} internal references, JS syntax, headings, IDs and image attributes.`);
