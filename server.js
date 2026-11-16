import http from 'node:http';
import {readFile} from 'node:fs/promises';
const port=Number(process.env.PORT||3001);
const spec=JSON.parse(await readFile(new URL('./openapi.json',import.meta.url),'utf8'));
const send=(res,status,data)=>{if(res.writableEnded)return;res.writeHead(status,{'content-type':'application/json; charset=utf-8','cache-control':'no-store','x-content-type-options':'nosniff'});res.end(JSON.stringify(data));};
const routes={
 '/api/v1/ai/chat':{params:{q:[1,2000]}},
 '/api/v1/ai/summarize':{params:{text:[50,10000]}},
 '/api/v1/ai/translate':{params:{q:[1,2000],to:[1,30],from:[0,30]}},
 '/api/v1/ai/gpt':{params:{q:[1,2000]}},
 '/api/v1/tools/define':{params:{word:[1,100]}},
 '/api/v1/tools/urbandict':{params:{word:[1,100]}},
 '/api/v1/tools/base64':{params:{text:[1,4000],mode:[0,10]}},
 '/api/v1/tools/hash':{params:{text:[1,4000]}},
 '/api/v1/tools/uuid':{params:{}},
 '/api/v1/web/wiki':{params:{q:[1,200]}},
 '/api/v1/web/qrcode':{params:{text:[1,2000]}},
 '/api/v1/anime/search':{params:{q:[1,200]}},
 '/api/v1/yt/search':{params:{q:[1,200]}}
};
async function provider(req,res,url,route){
 const target=new URL(url.pathname,'https://api.zukoxmd.my.id');
 for(const [name,[min,max]] of Object.entries(route.params)){const value=url.searchParams.get(name);if(value===null&&min===0)continue;if(value===null||value.trim().length<min||value.length>max)return send(res,400,{error:`${name} must be ${min} to ${max} characters`});target.searchParams.set(name,value);}
 try{const headers={accept:'application/json'};if(process.env.ZUKO_API_KEY)headers.authorization=`Bearer ${process.env.ZUKO_API_KEY}`;const upstream=await fetch(target,{headers,redirect:'error',signal:AbortSignal.timeout(20000)});const type=upstream.headers.get('content-type')||'';if(!type.includes('application/json'))return send(res,502,{error:'Provider returned a non-JSON response'});const length=Number(upstream.headers.get('content-length'));if(length>1048576)return send(res,502,{error:'Provider response too large'});const reader=upstream.body.getReader();let chunks=[],size=0;while(true){const {done,value}=await reader.read();if(done)break;size+=value.length;if(size>1048576){await reader.cancel();return send(res,502,{error:'Provider response too large'});}chunks.push(value);}let result;try{result=JSON.parse(Buffer.concat(chunks.map(c=>Buffer.from(c))).toString('utf8'));}catch{return send(res,502,{error:'Provider returned invalid JSON'});}return send(res,upstream.ok?200:(upstream.status===429?429:502),upstream.ok?result:{error:'Provider request failed',providerStatus:upstream.status});}catch(error){return send(res, error.name==='TimeoutError'?504:502,{error:error.name==='TimeoutError'?'Provider timed out':'Provider unavailable'});}
}
export function handler(req,res){const url=new URL(req.url,'http://localhost'),path=url.pathname;if(req.method==='GET'&&path==='/api/v1/health')return send(res,200,{status:'ok',time:new Date().toISOString()});if(req.method==='GET'&&path==='/api/openapi.json')return send(res,200,spec);if(req.method==='GET'&&routes[path])return void provider(req,res,url,routes[path]);if(req.method==='POST'&&path==='/api/v1/utilities/text'){let data='',size=0;req.on('data',chunk=>{size+=chunk.length;if(size<=16384)data+=chunk;});req.on('end',()=>{if(size>16384)return send(res,413,{error:'Request too large'});try{const body=JSON.parse(data);if(typeof body.text!=='string'||body.text.length>10000)return send(res,400,{error:'text must be a string of at most 10000 characters'});const text=body.text.trim();const words=text?text.split(/\s+/u).length:0;send(res,200,{characters:[...body.text].length,words,readingTimeMinutes:Math.ceil(words/200)});}catch{send(res,400,{error:'Invalid JSON'});}});return;}send(res,404,{error:'Endpoint not found'});}
if(process.argv[1]&&import.meta.url===new URL('file://'+process.argv[1]).href)http.createServer(handler).listen(port,()=>console.log(`API listening on port ${port}`));
