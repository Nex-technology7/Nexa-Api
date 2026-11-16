import {test} from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import {handler} from './server.js';
test('health and text analysis',async()=>{const server=http.createServer(handler);await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));try{const base=`http://127.0.0.1:${server.address().port}`;let r=await fetch(base+'/api/v1/health');assert.equal((await r.json()).status,'ok');r=await fetch(base+'/api/v1/utilities/text',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({text:'hello world'})});assert.deepEqual(await r.json(),{characters:11,words:2,readingTimeMinutes:1});r=await fetch(base+'/api/v1/utilities/text',{method:'POST',body:'bad'});assert.equal(r.status,400);}finally{await new Promise(resolve=>server.close(resolve));}});
