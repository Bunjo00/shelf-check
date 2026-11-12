// Minimal service worker: makes the app installable and opens offline to the last cached shell.
const C='shelfcheck-v2';
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(['/','/icon.svg'])));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))));self.clients.claim();});
self.addEventListener('fetch',e=>{
  const r=e.request; if(r.method!=='GET'||new URL(r.url).pathname.startsWith('/api/')) return;
  if(r.mode==='navigate') e.respondWith(fetch(r).then(res=>{caches.open(C).then(c=>c.put('/',res.clone()));return res;}).catch(()=>caches.match('/')));
});
