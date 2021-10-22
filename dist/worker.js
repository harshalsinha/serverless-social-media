!function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=1)}([function(e,t){e.exports={Router:({base:e="",routes:t=[]}={})=>({__proto__:new Proxy({},{get:(r,n,o)=>(r,...a)=>t.push([n.toUpperCase(),RegExp(`^${(e+r).replace(/(\/?)\*/g,"($1.*)?").replace(/\/$/,"").replace(/:(\w+)(\?)?(\.)?/g,"$2(?<$1>[^/]+)$2$3").replace(/\.(?=[\w(])/,"\\.")}/*$`),a])&&o}),routes:t,async handle(e,...r){let n,o,a=new URL(e.url);for(var[s,u,i]of(e.query=Object.fromEntries(a.searchParams),t))if((s===e.method||"ALL"===s)&&(o=a.pathname.match(u)))for(var c of(e.params=o.groups,i))if(void 0!==(n=await c(e.proxy||e,...r)))return n}})}},function(e,t,r){"use strict";r.r(t);var n=r(0);var o,a=class{constructor(e,t,r,n){this.id=e,this.title=t,this.username=r,this.content=n}save(){return SOCIALMEDIA_DB.put("post:"+this.id,JSON.stringify(this))}},s=new Uint8Array(16);function u(){if(!o&&!(o="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!=typeof msCrypto&&"function"==typeof msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto)))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return o(s)}var i=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;for(var c=function(e){return"string"==typeof e&&i.test(e)},p=[],f=0;f<256;++f)p.push((f+256).toString(16).substr(1));var l=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,r=(p[e[t+0]]+p[e[t+1]]+p[e[t+2]]+p[e[t+3]]+"-"+p[e[t+4]]+p[e[t+5]]+"-"+p[e[t+6]]+p[e[t+7]]+"-"+p[e[t+8]]+p[e[t+9]]+"-"+p[e[t+10]]+p[e[t+11]]+p[e[t+12]]+p[e[t+13]]+p[e[t+14]]+p[e[t+15]]).toLowerCase();if(!c(r))throw TypeError("Stringified UUID is invalid");return r};var d=function(e,t,r){var n=(e=e||{}).random||(e.rng||u)();if(n[6]=15&n[6]|64,n[8]=63&n[8]|128,t){r=r||0;for(var o=0;o<16;++o)t[r+o]=n[o];return t}return l(n)};const y=Object(n.Router)();async function g(){try{const o=await SOCIALMEDIA_DB.list(),a=o.keys.length;for(var e=[],t=0;t<a;t++){var r=o.keys[t].name,n=await SOCIALMEDIA_DB.get(r);console.log("Pushing post: "+n),e.push(n)}return e}catch(e){return new Response(e)}}y.get("/",()=>new Response("Hello, world! This is the root page of your Worker template.")),y.get("/posts",async()=>{try{var e=await g();return new Response(e)}catch(e){return new Response(e)}}),y.post("/addPost",async e=>{try{let t={asn:e.cf.asn,colo:e.cf.colo};"application/json"===e.headers.get("Content-Type")&&(t.json=await e.json());const r=d(),n=new a(r,t.json.title,t.json.username,t.json.content);await n.save();const o=await g();return new Response(o)}catch(e){return new Response(e)}}),y.all("*",()=>new Response("404, not found!",{status:404})),addEventListener("fetch",e=>{e.respondWith(y.handle(e.request))})}]);