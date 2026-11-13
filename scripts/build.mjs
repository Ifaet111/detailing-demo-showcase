import {cp, mkdir, readFile, writeFile, rm} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
if (dist !== path.join(root, 'dist')) throw Error('Invalid output path');
await rm(dist, {recursive:true,force:true});
await mkdir(dist,{recursive:true});
await cp(path.join(root,'src'),dist,{recursive:true});
const config=await readFile(path.join(root,'src/shared/config.js'),'utf8');
const configured=config.match(/siteUrl:\s*['"]([^'"]*)['"]/)?.[1] || '';
const raw=process.env.SITE_URL || configured;
let base='';
if(raw){const parsed=new URL(raw);if(parsed.protocol!=='https:'||parsed.search||parsed.hash)throw Error('SITE_URL must be an HTTPS URL without query or fragment');base=parsed.href.replace(/\/?$/,'/');}
const pages=['','detail/','heritage/','club/','drive/','service/','credits/'];
for(const page of pages){
 const file=path.join(dist,page,'index.html');let html=await readFile(file,'utf8');
 const title=html.match(/<title>(.*?)<\/title>/s)?.[1] || 'OFFSET';
 const desc=html.match(/<meta name="description" content="([^"]*)"/)?.[1] || '';
 if(!html.includes('property="og:title"'))html=html.replace('</head>',`<meta property="og:type" content="website"><meta property="og:title" content="${title}"><meta property="og:description" content="${desc}"><meta name="twitter:card" content="summary_large_image"></head>`);
 const image=page==='credits/'?'offset-hero':({'':'offset-hero','detail/':'detail-hero','heritage/':'heritage-hero','club/':'club-hero','drive/':'drive-red','service/':'service-hero'}[page]);
 if(!html.includes('property="og:image"'))html=html.replace('</head>',`<meta property="og:image" content="${base || '../'}assets/${image}.webp"></head>`);
 if(base){html=html.replace('</head>',`<link rel="canonical" href="${base+page}"><meta property="og:url" content="${base+page}"></head>`);html=html.replace(/(<meta property="og:image" content=")[^"]*/,`$1${base}assets/${image}.webp`);}
 if(!html.includes('name="twitter:card"'))html=html.replace('</head>','<meta name="twitter:card" content="summary_large_image"></head>');
 await writeFile(file,html);
}
await writeFile(path.join(dist,'robots.txt'),`User-agent: *\nAllow: /\n${base?'Sitemap: '+base+'sitemap.xml\n':''}`);
const errorPage=path.join(dist,'404.html');await writeFile(errorPage,(await readFile(errorPage,'utf8')).replace('id="home" href="./"',`id="home" href="${base || '/'}"`));
if(base)await writeFile(path.join(dist,'sitemap.xml'),'<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+pages.filter(p=>p!=='credits/').map(p=>'<url><loc>'+base+p+'</loc></url>').join('')+'</urlset>\n');
await writeFile(path.join(dist,'.nojekyll'),'');
await writeFile(path.join(dist,'_headers'),'/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n  Permissions-Policy: camera=(), microphone=(), geolocation=()\n');
console.log('Built dist/: 6 sites + credits + 404. '+(base?'SEO base: '+base:'Set SITE_URL for canonical URLs and sitemap.'));
