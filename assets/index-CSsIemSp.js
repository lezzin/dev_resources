(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=n(s);fetch(s.href,i)}})();/**
* @vue/shared v3.5.12
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**//*! #__NO_SIDE_EFFECTS__ */function wl(t){const e=Object.create(null);for(const n of t.split(","))e[n]=1;return n=>n in e}const Me={},ls=[],pn=()=>{},Vy=()=>!1,aa=t=>t.charCodeAt(0)===111&&t.charCodeAt(1)===110&&(t.charCodeAt(2)>122||t.charCodeAt(2)<97),Al=t=>t.startsWith("onUpdate:"),rt=Object.assign,bl=(t,e)=>{const n=t.indexOf(e);n>-1&&t.splice(n,1)},Oy=Object.prototype.hasOwnProperty,Ce=(t,e)=>Oy.call(t,e),he=Array.isArray,us=t=>ca(t)==="[object Map]",np=t=>ca(t)==="[object Set]",fe=t=>typeof t=="function",Je=t=>typeof t=="string",pr=t=>typeof t=="symbol",Ue=t=>t!==null&&typeof t=="object",rp=t=>(Ue(t)||fe(t))&&fe(t.then)&&fe(t.catch),sp=Object.prototype.toString,ca=t=>sp.call(t),Ny=t=>ca(t).slice(8,-1),ip=t=>ca(t)==="[object Object]",Rl=t=>Je(t)&&t!=="NaN"&&t[0]!=="-"&&""+parseInt(t,10)===t,ai=wl(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),la=t=>{const e=Object.create(null);return n=>e[n]||(e[n]=t(n))},xy=/-(\w)/g,Wt=la(t=>t.replace(xy,(e,n)=>n?n.toUpperCase():"")),My=/\B([A-Z])/g,$r=la(t=>t.replace(My,"-$1").toLowerCase()),ua=la(t=>t.charAt(0).toUpperCase()+t.slice(1)),lc=la(t=>t?`on${ua(t)}`:""),nr=(t,e)=>!Object.is(t,e),uc=(t,...e)=>{for(let n=0;n<t.length;n++)t[n](...e)},op=(t,e,n,r=!1)=>{Object.defineProperty(t,e,{configurable:!0,enumerable:!1,writable:r,value:n})},Ly=t=>{const e=parseFloat(t);return isNaN(e)?t:e};let Mh;const ha=()=>Mh||(Mh=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function Sl(t){if(he(t)){const e={};for(let n=0;n<t.length;n++){const r=t[n],s=Je(r)?jy(r):Sl(r);if(s)for(const i in s)e[i]=s[i]}return e}else if(Je(t)||Ue(t))return t}const Fy=/;(?![^(]*\))/g,Uy=/:([^]+)/,By=/\/\*[^]*?\*\//g;function jy(t){const e={};return t.replace(By,"").split(Fy).forEach(n=>{if(n){const r=n.split(Uy);r.length>1&&(e[r[0].trim()]=r[1].trim())}}),e}function xr(t){let e="";if(Je(t))e=t;else if(he(t))for(let n=0;n<t.length;n++){const r=xr(t[n]);r&&(e+=r+" ")}else if(Ue(t))for(const n in t)t[n]&&(e+=n+" ");return e.trim()}const $y="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",qy=wl($y);function ap(t){return!!t||t===""}const cp=t=>!!(t&&t.__v_isRef===!0),kt=t=>Je(t)?t:t==null?"":he(t)||Ue(t)&&(t.toString===sp||!fe(t.toString))?cp(t)?kt(t.value):JSON.stringify(t,lp,2):String(t),lp=(t,e)=>cp(e)?lp(t,e.value):us(e)?{[`Map(${e.size})`]:[...e.entries()].reduce((n,[r,s],i)=>(n[hc(r,i)+" =>"]=s,n),{})}:np(e)?{[`Set(${e.size})`]:[...e.values()].map(n=>hc(n))}:pr(e)?hc(e):Ue(e)&&!he(e)&&!ip(e)?String(e):e,hc=(t,e="")=>{var n;return pr(t)?`Symbol(${(n=t.description)!=null?n:e})`:t};/**
* @vue/reactivity v3.5.12
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let xt;class Hy{constructor(e=!1){this.detached=e,this._active=!0,this.effects=[],this.cleanups=[],this._isPaused=!1,this.parent=xt,!e&&xt&&(this.index=(xt.scopes||(xt.scopes=[])).push(this)-1)}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let e,n;if(this.scopes)for(e=0,n=this.scopes.length;e<n;e++)this.scopes[e].pause();for(e=0,n=this.effects.length;e<n;e++)this.effects[e].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let e,n;if(this.scopes)for(e=0,n=this.scopes.length;e<n;e++)this.scopes[e].resume();for(e=0,n=this.effects.length;e<n;e++)this.effects[e].resume()}}run(e){if(this._active){const n=xt;try{return xt=this,e()}finally{xt=n}}}on(){xt=this}off(){xt=this.parent}stop(e){if(this._active){let n,r;for(n=0,r=this.effects.length;n<r;n++)this.effects[n].stop();for(n=0,r=this.cleanups.length;n<r;n++)this.cleanups[n]();if(this.scopes)for(n=0,r=this.scopes.length;n<r;n++)this.scopes[n].stop(!0);if(!this.detached&&this.parent&&!e){const s=this.parent.scopes.pop();s&&s!==this&&(this.parent.scopes[this.index]=s,s.index=this.index)}this.parent=void 0,this._active=!1}}}function zy(){return xt}let xe;const dc=new WeakSet;class up{constructor(e){this.fn=e,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,xt&&xt.active&&xt.effects.push(this)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,dc.has(this)&&(dc.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||dp(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,Lh(this),fp(this);const e=xe,n=en;xe=this,en=!0;try{return this.fn()}finally{pp(this),xe=e,en=n,this.flags&=-3}}stop(){if(this.flags&1){for(let e=this.deps;e;e=e.nextDep)kl(e);this.deps=this.depsTail=void 0,Lh(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?dc.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){Lc(this)&&this.run()}get dirty(){return Lc(this)}}let hp=0,ci,li;function dp(t,e=!1){if(t.flags|=8,e){t.next=li,li=t;return}t.next=ci,ci=t}function Pl(){hp++}function Cl(){if(--hp>0)return;if(li){let e=li;for(li=void 0;e;){const n=e.next;e.next=void 0,e.flags&=-9,e=n}}let t;for(;ci;){let e=ci;for(ci=void 0;e;){const n=e.next;if(e.next=void 0,e.flags&=-9,e.flags&1)try{e.trigger()}catch(r){t||(t=r)}e=n}}if(t)throw t}function fp(t){for(let e=t.deps;e;e=e.nextDep)e.version=-1,e.prevActiveLink=e.dep.activeLink,e.dep.activeLink=e}function pp(t){let e,n=t.depsTail,r=n;for(;r;){const s=r.prevDep;r.version===-1?(r===n&&(n=s),kl(r),Wy(r)):e=r,r.dep.activeLink=r.prevActiveLink,r.prevActiveLink=void 0,r=s}t.deps=e,t.depsTail=n}function Lc(t){for(let e=t.deps;e;e=e.nextDep)if(e.dep.version!==e.version||e.dep.computed&&(mp(e.dep.computed)||e.dep.version!==e.version))return!0;return!!t._dirty}function mp(t){if(t.flags&4&&!(t.flags&16)||(t.flags&=-17,t.globalVersion===Ti))return;t.globalVersion=Ti;const e=t.dep;if(t.flags|=2,e.version>0&&!t.isSSR&&t.deps&&!Lc(t)){t.flags&=-3;return}const n=xe,r=en;xe=t,en=!0;try{fp(t);const s=t.fn(t._value);(e.version===0||nr(s,t._value))&&(t._value=s,e.version++)}catch(s){throw e.version++,s}finally{xe=n,en=r,pp(t),t.flags&=-3}}function kl(t,e=!1){const{dep:n,prevSub:r,nextSub:s}=t;if(r&&(r.nextSub=s,t.prevSub=void 0),s&&(s.prevSub=r,t.nextSub=void 0),n.subs===t&&(n.subs=r,!r&&n.computed)){n.computed.flags&=-5;for(let i=n.computed.deps;i;i=i.nextDep)kl(i,!0)}!e&&!--n.sc&&n.map&&n.map.delete(n.key)}function Wy(t){const{prevDep:e,nextDep:n}=t;e&&(e.nextDep=n,t.prevDep=void 0),n&&(n.prevDep=e,t.nextDep=void 0)}let en=!0;const gp=[];function mr(){gp.push(en),en=!1}function gr(){const t=gp.pop();en=t===void 0?!0:t}function Lh(t){const{cleanup:e}=t;if(t.cleanup=void 0,e){const n=xe;xe=void 0;try{e()}finally{xe=n}}}let Ti=0;class Ky{constructor(e,n){this.sub=e,this.dep=n,this.version=n.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class Dl{constructor(e){this.computed=e,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0}track(e){if(!xe||!en||xe===this.computed)return;let n=this.activeLink;if(n===void 0||n.sub!==xe)n=this.activeLink=new Ky(xe,this),xe.deps?(n.prevDep=xe.depsTail,xe.depsTail.nextDep=n,xe.depsTail=n):xe.deps=xe.depsTail=n,_p(n);else if(n.version===-1&&(n.version=this.version,n.nextDep)){const r=n.nextDep;r.prevDep=n.prevDep,n.prevDep&&(n.prevDep.nextDep=r),n.prevDep=xe.depsTail,n.nextDep=void 0,xe.depsTail.nextDep=n,xe.depsTail=n,xe.deps===n&&(xe.deps=r)}return n}trigger(e){this.version++,Ti++,this.notify(e)}notify(e){Pl();try{for(let n=this.subs;n;n=n.prevSub)n.sub.notify()&&n.sub.dep.notify()}finally{Cl()}}}function _p(t){if(t.dep.sc++,t.sub.flags&4){const e=t.dep.computed;if(e&&!t.dep.subs){e.flags|=20;for(let r=e.deps;r;r=r.nextDep)_p(r)}const n=t.dep.subs;n!==t&&(t.prevSub=n,n&&(n.nextSub=t)),t.dep.subs=t}}const No=new WeakMap,Dr=Symbol(""),Fc=Symbol(""),Ii=Symbol("");function gt(t,e,n){if(en&&xe){let r=No.get(t);r||No.set(t,r=new Map);let s=r.get(n);s||(r.set(n,s=new Dl),s.map=r,s.key=n),s.track()}}function Pn(t,e,n,r,s,i){const o=No.get(t);if(!o){Ti++;return}const c=l=>{l&&l.trigger()};if(Pl(),e==="clear")o.forEach(c);else{const l=he(t),h=l&&Rl(n);if(l&&n==="length"){const d=Number(r);o.forEach((p,g)=>{(g==="length"||g===Ii||!pr(g)&&g>=d)&&c(p)})}else switch((n!==void 0||o.has(void 0))&&c(o.get(n)),h&&c(o.get(Ii)),e){case"add":l?h&&c(o.get("length")):(c(o.get(Dr)),us(t)&&c(o.get(Fc)));break;case"delete":l||(c(o.get(Dr)),us(t)&&c(o.get(Fc)));break;case"set":us(t)&&c(o.get(Dr));break}}Cl()}function Gy(t,e){const n=No.get(t);return n&&n.get(e)}function ts(t){const e=Pe(t);return e===t?e:(gt(e,"iterate",Ii),qt(t)?e:e.map(_t))}function da(t){return gt(t=Pe(t),"iterate",Ii),t}const Qy={__proto__:null,[Symbol.iterator](){return fc(this,Symbol.iterator,_t)},concat(...t){return ts(this).concat(...t.map(e=>he(e)?ts(e):e))},entries(){return fc(this,"entries",t=>(t[1]=_t(t[1]),t))},every(t,e){return bn(this,"every",t,e,void 0,arguments)},filter(t,e){return bn(this,"filter",t,e,n=>n.map(_t),arguments)},find(t,e){return bn(this,"find",t,e,_t,arguments)},findIndex(t,e){return bn(this,"findIndex",t,e,void 0,arguments)},findLast(t,e){return bn(this,"findLast",t,e,_t,arguments)},findLastIndex(t,e){return bn(this,"findLastIndex",t,e,void 0,arguments)},forEach(t,e){return bn(this,"forEach",t,e,void 0,arguments)},includes(...t){return pc(this,"includes",t)},indexOf(...t){return pc(this,"indexOf",t)},join(t){return ts(this).join(t)},lastIndexOf(...t){return pc(this,"lastIndexOf",t)},map(t,e){return bn(this,"map",t,e,void 0,arguments)},pop(){return Js(this,"pop")},push(...t){return Js(this,"push",t)},reduce(t,...e){return Fh(this,"reduce",t,e)},reduceRight(t,...e){return Fh(this,"reduceRight",t,e)},shift(){return Js(this,"shift")},some(t,e){return bn(this,"some",t,e,void 0,arguments)},splice(...t){return Js(this,"splice",t)},toReversed(){return ts(this).toReversed()},toSorted(t){return ts(this).toSorted(t)},toSpliced(...t){return ts(this).toSpliced(...t)},unshift(...t){return Js(this,"unshift",t)},values(){return fc(this,"values",_t)}};function fc(t,e,n){const r=da(t),s=r[e]();return r!==t&&!qt(t)&&(s._next=s.next,s.next=()=>{const i=s._next();return i.value&&(i.value=n(i.value)),i}),s}const Yy=Array.prototype;function bn(t,e,n,r,s,i){const o=da(t),c=o!==t&&!qt(t),l=o[e];if(l!==Yy[e]){const p=l.apply(t,i);return c?_t(p):p}let h=n;o!==t&&(c?h=function(p,g){return n.call(this,_t(p),g,t)}:n.length>2&&(h=function(p,g){return n.call(this,p,g,t)}));const d=l.call(o,h,r);return c&&s?s(d):d}function Fh(t,e,n,r){const s=da(t);let i=n;return s!==t&&(qt(t)?n.length>3&&(i=function(o,c,l){return n.call(this,o,c,l,t)}):i=function(o,c,l){return n.call(this,o,_t(c),l,t)}),s[e](i,...r)}function pc(t,e,n){const r=Pe(t);gt(r,"iterate",Ii);const s=r[e](...n);return(s===-1||s===!1)&&Nl(n[0])?(n[0]=Pe(n[0]),r[e](...n)):s}function Js(t,e,n=[]){mr(),Pl();const r=Pe(t)[e].apply(t,n);return Cl(),gr(),r}const Jy=wl("__proto__,__v_isRef,__isVue"),yp=new Set(Object.getOwnPropertyNames(Symbol).filter(t=>t!=="arguments"&&t!=="caller").map(t=>Symbol[t]).filter(pr));function Xy(t){pr(t)||(t=String(t));const e=Pe(this);return gt(e,"has",t),e.hasOwnProperty(t)}class vp{constructor(e=!1,n=!1){this._isReadonly=e,this._isShallow=n}get(e,n,r){const s=this._isReadonly,i=this._isShallow;if(n==="__v_isReactive")return!s;if(n==="__v_isReadonly")return s;if(n==="__v_isShallow")return i;if(n==="__v_raw")return r===(s?i?cv:wp:i?Ip:Tp).get(e)||Object.getPrototypeOf(e)===Object.getPrototypeOf(r)?e:void 0;const o=he(e);if(!s){let l;if(o&&(l=Qy[n]))return l;if(n==="hasOwnProperty")return Xy}const c=Reflect.get(e,n,ct(e)?e:r);return(pr(n)?yp.has(n):Jy(n))||(s||gt(e,"get",n),i)?c:ct(c)?o&&Rl(n)?c:c.value:Ue(c)?s?bp(c):fa(c):c}}class Ep extends vp{constructor(e=!1){super(!1,e)}set(e,n,r,s){let i=e[n];if(!this._isShallow){const l=Mr(i);if(!qt(r)&&!Mr(r)&&(i=Pe(i),r=Pe(r)),!he(e)&&ct(i)&&!ct(r))return l?!1:(i.value=r,!0)}const o=he(e)&&Rl(n)?Number(n)<e.length:Ce(e,n),c=Reflect.set(e,n,r,ct(e)?e:s);return e===Pe(s)&&(o?nr(r,i)&&Pn(e,"set",n,r):Pn(e,"add",n,r)),c}deleteProperty(e,n){const r=Ce(e,n);e[n];const s=Reflect.deleteProperty(e,n);return s&&r&&Pn(e,"delete",n,void 0),s}has(e,n){const r=Reflect.has(e,n);return(!pr(n)||!yp.has(n))&&gt(e,"has",n),r}ownKeys(e){return gt(e,"iterate",he(e)?"length":Dr),Reflect.ownKeys(e)}}class Zy extends vp{constructor(e=!1){super(!0,e)}set(e,n){return!0}deleteProperty(e,n){return!0}}const ev=new Ep,tv=new Zy,nv=new Ep(!0);const Uc=t=>t,fo=t=>Reflect.getPrototypeOf(t);function rv(t,e,n){return function(...r){const s=this.__v_raw,i=Pe(s),o=us(i),c=t==="entries"||t===Symbol.iterator&&o,l=t==="keys"&&o,h=s[t](...r),d=n?Uc:e?Bc:_t;return!e&&gt(i,"iterate",l?Fc:Dr),{next(){const{value:p,done:g}=h.next();return g?{value:p,done:g}:{value:c?[d(p[0]),d(p[1])]:d(p),done:g}},[Symbol.iterator](){return this}}}}function po(t){return function(...e){return t==="delete"?!1:t==="clear"?void 0:this}}function sv(t,e){const n={get(s){const i=this.__v_raw,o=Pe(i),c=Pe(s);t||(nr(s,c)&&gt(o,"get",s),gt(o,"get",c));const{has:l}=fo(o),h=e?Uc:t?Bc:_t;if(l.call(o,s))return h(i.get(s));if(l.call(o,c))return h(i.get(c));i!==o&&i.get(s)},get size(){const s=this.__v_raw;return!t&&gt(Pe(s),"iterate",Dr),Reflect.get(s,"size",s)},has(s){const i=this.__v_raw,o=Pe(i),c=Pe(s);return t||(nr(s,c)&&gt(o,"has",s),gt(o,"has",c)),s===c?i.has(s):i.has(s)||i.has(c)},forEach(s,i){const o=this,c=o.__v_raw,l=Pe(c),h=e?Uc:t?Bc:_t;return!t&&gt(l,"iterate",Dr),c.forEach((d,p)=>s.call(i,h(d),h(p),o))}};return rt(n,t?{add:po("add"),set:po("set"),delete:po("delete"),clear:po("clear")}:{add(s){!e&&!qt(s)&&!Mr(s)&&(s=Pe(s));const i=Pe(this);return fo(i).has.call(i,s)||(i.add(s),Pn(i,"add",s,s)),this},set(s,i){!e&&!qt(i)&&!Mr(i)&&(i=Pe(i));const o=Pe(this),{has:c,get:l}=fo(o);let h=c.call(o,s);h||(s=Pe(s),h=c.call(o,s));const d=l.call(o,s);return o.set(s,i),h?nr(i,d)&&Pn(o,"set",s,i):Pn(o,"add",s,i),this},delete(s){const i=Pe(this),{has:o,get:c}=fo(i);let l=o.call(i,s);l||(s=Pe(s),l=o.call(i,s)),c&&c.call(i,s);const h=i.delete(s);return l&&Pn(i,"delete",s,void 0),h},clear(){const s=Pe(this),i=s.size!==0,o=s.clear();return i&&Pn(s,"clear",void 0,void 0),o}}),["keys","values","entries",Symbol.iterator].forEach(s=>{n[s]=rv(s,t,e)}),n}function Vl(t,e){const n=sv(t,e);return(r,s,i)=>s==="__v_isReactive"?!t:s==="__v_isReadonly"?t:s==="__v_raw"?r:Reflect.get(Ce(n,s)&&s in r?n:r,s,i)}const iv={get:Vl(!1,!1)},ov={get:Vl(!1,!0)},av={get:Vl(!0,!1)};const Tp=new WeakMap,Ip=new WeakMap,wp=new WeakMap,cv=new WeakMap;function lv(t){switch(t){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function uv(t){return t.__v_skip||!Object.isExtensible(t)?0:lv(Ny(t))}function fa(t){return Mr(t)?t:Ol(t,!1,ev,iv,Tp)}function Ap(t){return Ol(t,!1,nv,ov,Ip)}function bp(t){return Ol(t,!0,tv,av,wp)}function Ol(t,e,n,r,s){if(!Ue(t)||t.__v_raw&&!(e&&t.__v_isReactive))return t;const i=s.get(t);if(i)return i;const o=uv(t);if(o===0)return t;const c=new Proxy(t,o===2?r:n);return s.set(t,c),c}function hs(t){return Mr(t)?hs(t.__v_raw):!!(t&&t.__v_isReactive)}function Mr(t){return!!(t&&t.__v_isReadonly)}function qt(t){return!!(t&&t.__v_isShallow)}function Nl(t){return t?!!t.__v_raw:!1}function Pe(t){const e=t&&t.__v_raw;return e?Pe(e):t}function hv(t){return!Ce(t,"__v_skip")&&Object.isExtensible(t)&&op(t,"__v_skip",!0),t}const _t=t=>Ue(t)?fa(t):t,Bc=t=>Ue(t)?bp(t):t;function ct(t){return t?t.__v_isRef===!0:!1}function pe(t){return Rp(t,!1)}function dv(t){return Rp(t,!0)}function Rp(t,e){return ct(t)?t:new fv(t,e)}class fv{constructor(e,n){this.dep=new Dl,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=n?e:Pe(e),this._value=n?e:_t(e),this.__v_isShallow=n}get value(){return this.dep.track(),this._value}set value(e){const n=this._rawValue,r=this.__v_isShallow||qt(e)||Mr(e);e=r?e:Pe(e),nr(e,n)&&(this._rawValue=e,this._value=r?e:_t(e),this.dep.trigger())}}function Vr(t){return ct(t)?t.value:t}const pv={get:(t,e,n)=>e==="__v_raw"?t:Vr(Reflect.get(t,e,n)),set:(t,e,n,r)=>{const s=t[e];return ct(s)&&!ct(n)?(s.value=n,!0):Reflect.set(t,e,n,r)}};function Sp(t){return hs(t)?t:new Proxy(t,pv)}function mv(t){const e=he(t)?new Array(t.length):{};for(const n in t)e[n]=_v(t,n);return e}class gv{constructor(e,n,r){this._object=e,this._key=n,this._defaultValue=r,this.__v_isRef=!0,this._value=void 0}get value(){const e=this._object[this._key];return this._value=e===void 0?this._defaultValue:e}set value(e){this._object[this._key]=e}get dep(){return Gy(Pe(this._object),this._key)}}function _v(t,e,n){const r=t[e];return ct(r)?r:new gv(t,e,n)}class yv{constructor(e,n,r){this.fn=e,this.setter=n,this._value=void 0,this.dep=new Dl(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=Ti-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!n,this.isSSR=r}notify(){if(this.flags|=16,!(this.flags&8)&&xe!==this)return dp(this,!0),!0}get value(){const e=this.dep.track();return mp(this),e&&(e.version=this.dep.version),this._value}set value(e){this.setter&&this.setter(e)}}function vv(t,e,n=!1){let r,s;return fe(t)?r=t:(r=t.get,s=t.set),new yv(r,s,n)}const mo={},xo=new WeakMap;let Sr;function Ev(t,e=!1,n=Sr){if(n){let r=xo.get(n);r||xo.set(n,r=[]),r.push(t)}}function Tv(t,e,n=Me){const{immediate:r,deep:s,once:i,scheduler:o,augmentJob:c,call:l}=n,h=q=>s?q:qt(q)||s===!1||s===0?Yn(q,1):Yn(q);let d,p,g,_,P=!1,k=!1;if(ct(t)?(p=()=>t.value,P=qt(t)):hs(t)?(p=()=>h(t),P=!0):he(t)?(k=!0,P=t.some(q=>hs(q)||qt(q)),p=()=>t.map(q=>{if(ct(q))return q.value;if(hs(q))return h(q);if(fe(q))return l?l(q,2):q()})):fe(t)?e?p=l?()=>l(t,2):t:p=()=>{if(g){mr();try{g()}finally{gr()}}const q=Sr;Sr=d;try{return l?l(t,3,[_]):t(_)}finally{Sr=q}}:p=pn,e&&s){const q=p,ce=s===!0?1/0:s;p=()=>Yn(q(),ce)}const D=zy(),x=()=>{d.stop(),D&&bl(D.effects,d)};if(i&&e){const q=e;e=(...ce)=>{q(...ce),x()}}let F=k?new Array(t.length).fill(mo):mo;const $=q=>{if(!(!(d.flags&1)||!d.dirty&&!q))if(e){const ce=d.run();if(s||P||(k?ce.some((le,w)=>nr(le,F[w])):nr(ce,F))){g&&g();const le=Sr;Sr=d;try{const w=[ce,F===mo?void 0:k&&F[0]===mo?[]:F,_];l?l(e,3,w):e(...w),F=ce}finally{Sr=le}}}else d.run()};return c&&c($),d=new up(p),d.scheduler=o?()=>o($,!1):$,_=q=>Ev(q,!1,d),g=d.onStop=()=>{const q=xo.get(d);if(q){if(l)l(q,4);else for(const ce of q)ce();xo.delete(d)}},e?r?$(!0):F=d.run():o?o($.bind(null,!0),!0):d.run(),x.pause=d.pause.bind(d),x.resume=d.resume.bind(d),x.stop=x,x}function Yn(t,e=1/0,n){if(e<=0||!Ue(t)||t.__v_skip||(n=n||new Set,n.has(t)))return t;if(n.add(t),e--,ct(t))Yn(t.value,e,n);else if(he(t))for(let r=0;r<t.length;r++)Yn(t[r],e,n);else if(np(t)||us(t))t.forEach(r=>{Yn(r,e,n)});else if(ip(t)){for(const r in t)Yn(t[r],e,n);for(const r of Object.getOwnPropertySymbols(t))Object.prototype.propertyIsEnumerable.call(t,r)&&Yn(t[r],e,n)}return t}/**
* @vue/runtime-core v3.5.12
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function Ui(t,e,n,r){try{return r?t(...r):t()}catch(s){pa(s,e,n)}}function vn(t,e,n,r){if(fe(t)){const s=Ui(t,e,n,r);return s&&rp(s)&&s.catch(i=>{pa(i,e,n)}),s}if(he(t)){const s=[];for(let i=0;i<t.length;i++)s.push(vn(t[i],e,n,r));return s}}function pa(t,e,n,r=!0){const s=e?e.vnode:null,{errorHandler:i,throwUnhandledErrorInProduction:o}=e&&e.appContext.config||Me;if(e){let c=e.parent;const l=e.proxy,h=`https://vuejs.org/error-reference/#runtime-${n}`;for(;c;){const d=c.ec;if(d){for(let p=0;p<d.length;p++)if(d[p](t,l,h)===!1)return}c=c.parent}if(i){mr(),Ui(i,null,10,[t,l,h]),gr();return}}Iv(t,n,s,r,o)}function Iv(t,e,n,r=!0,s=!1){if(s)throw t;console.error(t)}const bt=[];let hn=-1;const ds=[];let Kn=null,ns=0;const Pp=Promise.resolve();let Mo=null;function Cp(t){const e=Mo||Pp;return t?e.then(this?t.bind(this):t):e}function wv(t){let e=hn+1,n=bt.length;for(;e<n;){const r=e+n>>>1,s=bt[r],i=wi(s);i<t||i===t&&s.flags&2?e=r+1:n=r}return e}function xl(t){if(!(t.flags&1)){const e=wi(t),n=bt[bt.length-1];!n||!(t.flags&2)&&e>=wi(n)?bt.push(t):bt.splice(wv(e),0,t),t.flags|=1,kp()}}function kp(){Mo||(Mo=Pp.then(Vp))}function Av(t){he(t)?ds.push(...t):Kn&&t.id===-1?Kn.splice(ns+1,0,t):t.flags&1||(ds.push(t),t.flags|=1),kp()}function Uh(t,e,n=hn+1){for(;n<bt.length;n++){const r=bt[n];if(r&&r.flags&2){if(t&&r.id!==t.uid)continue;bt.splice(n,1),n--,r.flags&4&&(r.flags&=-2),r(),r.flags&4||(r.flags&=-2)}}}function Dp(t){if(ds.length){const e=[...new Set(ds)].sort((n,r)=>wi(n)-wi(r));if(ds.length=0,Kn){Kn.push(...e);return}for(Kn=e,ns=0;ns<Kn.length;ns++){const n=Kn[ns];n.flags&4&&(n.flags&=-2),n.flags&8||n(),n.flags&=-2}Kn=null,ns=0}}const wi=t=>t.id==null?t.flags&2?-1:1/0:t.id;function Vp(t){try{for(hn=0;hn<bt.length;hn++){const e=bt[hn];e&&!(e.flags&8)&&(e.flags&4&&(e.flags&=-2),Ui(e,e.i,e.i?15:14),e.flags&4||(e.flags&=-2))}}finally{for(;hn<bt.length;hn++){const e=bt[hn];e&&(e.flags&=-2)}hn=-1,bt.length=0,Dp(),Mo=null,(bt.length||ds.length)&&Vp()}}let Jt=null,Op=null;function Lo(t){const e=Jt;return Jt=t,Op=t&&t.type.__scopeId||null,e}function Xt(t,e=Jt,n){if(!e||t._n)return t;const r=(...s)=>{r._d&&Gh(-1);const i=Lo(e);let o;try{o=t(...s)}finally{Lo(i),r._d&&Gh(1)}return o};return r._n=!0,r._c=!0,r._d=!0,r}function br(t,e,n,r){const s=t.dirs,i=e&&e.dirs;for(let o=0;o<s.length;o++){const c=s[o];i&&(c.oldValue=i[o].value);let l=c.dir[r];l&&(mr(),vn(l,n,8,[t.el,c,t,e]),gr())}}const bv=Symbol("_vte"),Rv=t=>t.__isTeleport;function Ml(t,e){t.shapeFlag&6&&t.component?(t.transition=e,Ml(t.component.subTree,e)):t.shapeFlag&128?(t.ssContent.transition=e.clone(t.ssContent),t.ssFallback.transition=e.clone(t.ssFallback)):t.transition=e}/*! #__NO_SIDE_EFFECTS__ */function Ll(t,e){return fe(t)?rt({name:t.name},e,{setup:t}):t}function Np(t){t.ids=[t.ids[0]+t.ids[2]+++"-",0,0]}function jc(t,e,n,r,s=!1){if(he(t)){t.forEach((P,k)=>jc(P,e&&(he(e)?e[k]:e),n,r,s));return}if(ui(r)&&!s)return;const i=r.shapeFlag&4?jl(r.component):r.el,o=s?null:i,{i:c,r:l}=t,h=e&&e.r,d=c.refs===Me?c.refs={}:c.refs,p=c.setupState,g=Pe(p),_=p===Me?()=>!1:P=>Ce(g,P);if(h!=null&&h!==l&&(Je(h)?(d[h]=null,_(h)&&(p[h]=null)):ct(h)&&(h.value=null)),fe(l))Ui(l,c,12,[o,d]);else{const P=Je(l),k=ct(l);if(P||k){const D=()=>{if(t.f){const x=P?_(l)?p[l]:d[l]:l.value;s?he(x)&&bl(x,i):he(x)?x.includes(i)||x.push(i):P?(d[l]=[i],_(l)&&(p[l]=d[l])):(l.value=[i],t.k&&(d[t.k]=l.value))}else P?(d[l]=o,_(l)&&(p[l]=o)):k&&(l.value=o,t.k&&(d[t.k]=o))};o?(D.id=-1,Nt(D,n)):D()}}}ha().requestIdleCallback;ha().cancelIdleCallback;const ui=t=>!!t.type.__asyncLoader,xp=t=>t.type.__isKeepAlive;function Sv(t,e){Mp(t,"a",e)}function Pv(t,e){Mp(t,"da",e)}function Mp(t,e,n=vt){const r=t.__wdc||(t.__wdc=()=>{let s=n;for(;s;){if(s.isDeactivated)return;s=s.parent}return t()});if(ma(e,r,n),n){let s=n.parent;for(;s&&s.parent;)xp(s.parent.vnode)&&Cv(r,e,n,s),s=s.parent}}function Cv(t,e,n,r){const s=ma(e,t,r,!0);Fp(()=>{bl(r[e],s)},n)}function ma(t,e,n=vt,r=!1){if(n){const s=n[t]||(n[t]=[]),i=e.__weh||(e.__weh=(...o)=>{mr();const c=Bi(n),l=vn(e,n,t,o);return c(),gr(),l});return r?s.unshift(i):s.push(i),i}}const Fn=t=>(e,n=vt)=>{(!bi||t==="sp")&&ma(t,(...r)=>e(...r),n)},kv=Fn("bm"),In=Fn("m"),Dv=Fn("bu"),Vv=Fn("u"),Lp=Fn("bum"),Fp=Fn("um"),Ov=Fn("sp"),Nv=Fn("rtg"),xv=Fn("rtc");function Mv(t,e=vt){ma("ec",t,e)}const Lv="components";function nn(t,e){return Uv(Lv,t,!0,e)||t}const Fv=Symbol.for("v-ndc");function Uv(t,e,n=!0,r=!1){const s=Jt||vt;if(s){const i=s.type;{const c=RE(i,!1);if(c&&(c===e||c===Wt(e)||c===ua(Wt(e))))return i}const o=Bh(s[t]||i[t],e)||Bh(s.appContext[t],e);return!o&&r?i:o}}function Bh(t,e){return t&&(t[e]||t[Wt(e)]||t[ua(Wt(e))])}function Up(t,e,n,r){let s;const i=n,o=he(t);if(o||Je(t)){const c=o&&hs(t);let l=!1;c&&(l=!qt(t),t=da(t)),s=new Array(t.length);for(let h=0,d=t.length;h<d;h++)s[h]=e(l?_t(t[h]):t[h],h,void 0,i)}else if(typeof t=="number"){s=new Array(t);for(let c=0;c<t;c++)s[c]=e(c+1,c,void 0,i)}else if(Ue(t))if(t[Symbol.iterator])s=Array.from(t,(c,l)=>e(c,l,void 0,i));else{const c=Object.keys(t);s=new Array(c.length);for(let l=0,h=c.length;l<h;l++){const d=c[l];s[l]=e(t[d],d,l,i)}}else s=[];return s}const $c=t=>t?im(t)?jl(t):$c(t.parent):null,hi=rt(Object.create(null),{$:t=>t,$el:t=>t.vnode.el,$data:t=>t.data,$props:t=>t.props,$attrs:t=>t.attrs,$slots:t=>t.slots,$refs:t=>t.refs,$parent:t=>$c(t.parent),$root:t=>$c(t.root),$host:t=>t.ce,$emit:t=>t.emit,$options:t=>Fl(t),$forceUpdate:t=>t.f||(t.f=()=>{xl(t.update)}),$nextTick:t=>t.n||(t.n=Cp.bind(t.proxy)),$watch:t=>oE.bind(t)}),mc=(t,e)=>t!==Me&&!t.__isScriptSetup&&Ce(t,e),Bv={get({_:t},e){if(e==="__v_skip")return!0;const{ctx:n,setupState:r,data:s,props:i,accessCache:o,type:c,appContext:l}=t;let h;if(e[0]!=="$"){const _=o[e];if(_!==void 0)switch(_){case 1:return r[e];case 2:return s[e];case 4:return n[e];case 3:return i[e]}else{if(mc(r,e))return o[e]=1,r[e];if(s!==Me&&Ce(s,e))return o[e]=2,s[e];if((h=t.propsOptions[0])&&Ce(h,e))return o[e]=3,i[e];if(n!==Me&&Ce(n,e))return o[e]=4,n[e];qc&&(o[e]=0)}}const d=hi[e];let p,g;if(d)return e==="$attrs"&&gt(t.attrs,"get",""),d(t);if((p=c.__cssModules)&&(p=p[e]))return p;if(n!==Me&&Ce(n,e))return o[e]=4,n[e];if(g=l.config.globalProperties,Ce(g,e))return g[e]},set({_:t},e,n){const{data:r,setupState:s,ctx:i}=t;return mc(s,e)?(s[e]=n,!0):r!==Me&&Ce(r,e)?(r[e]=n,!0):Ce(t.props,e)||e[0]==="$"&&e.slice(1)in t?!1:(i[e]=n,!0)},has({_:{data:t,setupState:e,accessCache:n,ctx:r,appContext:s,propsOptions:i}},o){let c;return!!n[o]||t!==Me&&Ce(t,o)||mc(e,o)||(c=i[0])&&Ce(c,o)||Ce(r,o)||Ce(hi,o)||Ce(s.config.globalProperties,o)},defineProperty(t,e,n){return n.get!=null?t._.accessCache[e]=0:Ce(n,"value")&&this.set(t,e,n.value,null),Reflect.defineProperty(t,e,n)}};function jh(t){return he(t)?t.reduce((e,n)=>(e[n]=null,e),{}):t}let qc=!0;function jv(t){const e=Fl(t),n=t.proxy,r=t.ctx;qc=!1,e.beforeCreate&&$h(e.beforeCreate,t,"bc");const{data:s,computed:i,methods:o,watch:c,provide:l,inject:h,created:d,beforeMount:p,mounted:g,beforeUpdate:_,updated:P,activated:k,deactivated:D,beforeDestroy:x,beforeUnmount:F,destroyed:$,unmounted:q,render:ce,renderTracked:le,renderTriggered:w,errorCaptured:v,serverPrefetch:I,expose:A,inheritAttrs:b,components:R,directives:T,filters:Tt}=e;if(h&&$v(h,r,null),o)for(const ve in o){const ge=o[ve];fe(ge)&&(r[ve]=ge.bind(n))}if(s){const ve=s.call(n,n);Ue(ve)&&(t.data=fa(ve))}if(qc=!0,i)for(const ve in i){const ge=i[ve],Vt=fe(ge)?ge.bind(n,n):fe(ge.get)?ge.get.bind(n,n):pn,Kt=!fe(ge)&&fe(ge.set)?ge.set.bind(n):pn,jt=Yt({get:Vt,set:Kt});Object.defineProperty(r,ve,{enumerable:!0,configurable:!0,get:()=>jt.value,set:Be=>jt.value=Be})}if(c)for(const ve in c)Bp(c[ve],r,n,ve);if(l){const ve=fe(l)?l.call(n):l;Reflect.ownKeys(ve).forEach(ge=>{Or(ge,ve[ge])})}d&&$h(d,t,"c");function Ge(ve,ge){he(ge)?ge.forEach(Vt=>ve(Vt.bind(n))):ge&&ve(ge.bind(n))}if(Ge(kv,p),Ge(In,g),Ge(Dv,_),Ge(Vv,P),Ge(Sv,k),Ge(Pv,D),Ge(Mv,v),Ge(xv,le),Ge(Nv,w),Ge(Lp,F),Ge(Fp,q),Ge(Ov,I),he(A))if(A.length){const ve=t.exposed||(t.exposed={});A.forEach(ge=>{Object.defineProperty(ve,ge,{get:()=>n[ge],set:Vt=>n[ge]=Vt})})}else t.exposed||(t.exposed={});ce&&t.render===pn&&(t.render=ce),b!=null&&(t.inheritAttrs=b),R&&(t.components=R),T&&(t.directives=T),I&&Np(t)}function $v(t,e,n=pn){he(t)&&(t=Hc(t));for(const r in t){const s=t[r];let i;Ue(s)?"default"in s?i=Ne(s.from||r,s.default,!0):i=Ne(s.from||r):i=Ne(s),ct(i)?Object.defineProperty(e,r,{enumerable:!0,configurable:!0,get:()=>i.value,set:o=>i.value=o}):e[r]=i}}function $h(t,e,n){vn(he(t)?t.map(r=>r.bind(e.proxy)):t.bind(e.proxy),e,n)}function Bp(t,e,n,r){let s=r.includes(".")?em(n,r):()=>n[r];if(Je(t)){const i=e[t];fe(i)&&tt(s,i)}else if(fe(t))tt(s,t.bind(n));else if(Ue(t))if(he(t))t.forEach(i=>Bp(i,e,n,r));else{const i=fe(t.handler)?t.handler.bind(n):e[t.handler];fe(i)&&tt(s,i,t)}}function Fl(t){const e=t.type,{mixins:n,extends:r}=e,{mixins:s,optionsCache:i,config:{optionMergeStrategies:o}}=t.appContext,c=i.get(e);let l;return c?l=c:!s.length&&!n&&!r?l=e:(l={},s.length&&s.forEach(h=>Fo(l,h,o,!0)),Fo(l,e,o)),Ue(e)&&i.set(e,l),l}function Fo(t,e,n,r=!1){const{mixins:s,extends:i}=e;i&&Fo(t,i,n,!0),s&&s.forEach(o=>Fo(t,o,n,!0));for(const o in e)if(!(r&&o==="expose")){const c=qv[o]||n&&n[o];t[o]=c?c(t[o],e[o]):e[o]}return t}const qv={data:qh,props:Hh,emits:Hh,methods:ei,computed:ei,beforeCreate:At,created:At,beforeMount:At,mounted:At,beforeUpdate:At,updated:At,beforeDestroy:At,beforeUnmount:At,destroyed:At,unmounted:At,activated:At,deactivated:At,errorCaptured:At,serverPrefetch:At,components:ei,directives:ei,watch:zv,provide:qh,inject:Hv};function qh(t,e){return e?t?function(){return rt(fe(t)?t.call(this,this):t,fe(e)?e.call(this,this):e)}:e:t}function Hv(t,e){return ei(Hc(t),Hc(e))}function Hc(t){if(he(t)){const e={};for(let n=0;n<t.length;n++)e[t[n]]=t[n];return e}return t}function At(t,e){return t?[...new Set([].concat(t,e))]:e}function ei(t,e){return t?rt(Object.create(null),t,e):e}function Hh(t,e){return t?he(t)&&he(e)?[...new Set([...t,...e])]:rt(Object.create(null),jh(t),jh(e??{})):e}function zv(t,e){if(!t)return e;if(!e)return t;const n=rt(Object.create(null),t);for(const r in e)n[r]=At(t[r],e[r]);return n}function jp(){return{app:null,config:{isNativeTag:Vy,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let Wv=0;function Kv(t,e){return function(r,s=null){fe(r)||(r=rt({},r)),s!=null&&!Ue(s)&&(s=null);const i=jp(),o=new WeakSet,c=[];let l=!1;const h=i.app={_uid:Wv++,_component:r,_props:s,_container:null,_context:i,_instance:null,version:PE,get config(){return i.config},set config(d){},use(d,...p){return o.has(d)||(d&&fe(d.install)?(o.add(d),d.install(h,...p)):fe(d)&&(o.add(d),d(h,...p))),h},mixin(d){return i.mixins.includes(d)||i.mixins.push(d),h},component(d,p){return p?(i.components[d]=p,h):i.components[d]},directive(d,p){return p?(i.directives[d]=p,h):i.directives[d]},mount(d,p,g){if(!l){const _=h._ceVNode||Re(r,s);return _.appContext=i,g===!0?g="svg":g===!1&&(g=void 0),p&&e?e(_,d):t(_,d,g),l=!0,h._container=d,d.__vue_app__=h,jl(_.component)}},onUnmount(d){c.push(d)},unmount(){l&&(vn(c,h._instance,16),t(null,h._container),delete h._container.__vue_app__)},provide(d,p){return i.provides[d]=p,h},runWithContext(d){const p=fs;fs=h;try{return d()}finally{fs=p}}};return h}}let fs=null;function Or(t,e){if(vt){let n=vt.provides;const r=vt.parent&&vt.parent.provides;r===n&&(n=vt.provides=Object.create(r)),n[t]=e}}function Ne(t,e,n=!1){const r=vt||Jt;if(r||fs){const s=fs?fs._context.provides:r?r.parent==null?r.vnode.appContext&&r.vnode.appContext.provides:r.parent.provides:void 0;if(s&&t in s)return s[t];if(arguments.length>1)return n&&fe(e)?e.call(r&&r.proxy):e}}const $p={},qp=()=>Object.create($p),Hp=t=>Object.getPrototypeOf(t)===$p;function Gv(t,e,n,r=!1){const s={},i=qp();t.propsDefaults=Object.create(null),zp(t,e,s,i);for(const o in t.propsOptions[0])o in s||(s[o]=void 0);n?t.props=r?s:Ap(s):t.type.props?t.props=s:t.props=i,t.attrs=i}function Qv(t,e,n,r){const{props:s,attrs:i,vnode:{patchFlag:o}}=t,c=Pe(s),[l]=t.propsOptions;let h=!1;if((r||o>0)&&!(o&16)){if(o&8){const d=t.vnode.dynamicProps;for(let p=0;p<d.length;p++){let g=d[p];if(ga(t.emitsOptions,g))continue;const _=e[g];if(l)if(Ce(i,g))_!==i[g]&&(i[g]=_,h=!0);else{const P=Wt(g);s[P]=zc(l,c,P,_,t,!1)}else _!==i[g]&&(i[g]=_,h=!0)}}}else{zp(t,e,s,i)&&(h=!0);let d;for(const p in c)(!e||!Ce(e,p)&&((d=$r(p))===p||!Ce(e,d)))&&(l?n&&(n[p]!==void 0||n[d]!==void 0)&&(s[p]=zc(l,c,p,void 0,t,!0)):delete s[p]);if(i!==c)for(const p in i)(!e||!Ce(e,p))&&(delete i[p],h=!0)}h&&Pn(t.attrs,"set","")}function zp(t,e,n,r){const[s,i]=t.propsOptions;let o=!1,c;if(e)for(let l in e){if(ai(l))continue;const h=e[l];let d;s&&Ce(s,d=Wt(l))?!i||!i.includes(d)?n[d]=h:(c||(c={}))[d]=h:ga(t.emitsOptions,l)||(!(l in r)||h!==r[l])&&(r[l]=h,o=!0)}if(i){const l=Pe(n),h=c||Me;for(let d=0;d<i.length;d++){const p=i[d];n[p]=zc(s,l,p,h[p],t,!Ce(h,p))}}return o}function zc(t,e,n,r,s,i){const o=t[n];if(o!=null){const c=Ce(o,"default");if(c&&r===void 0){const l=o.default;if(o.type!==Function&&!o.skipFactory&&fe(l)){const{propsDefaults:h}=s;if(n in h)r=h[n];else{const d=Bi(s);r=h[n]=l.call(null,e),d()}}else r=l;s.ce&&s.ce._setProp(n,r)}o[0]&&(i&&!c?r=!1:o[1]&&(r===""||r===$r(n))&&(r=!0))}return r}const Yv=new WeakMap;function Wp(t,e,n=!1){const r=n?Yv:e.propsCache,s=r.get(t);if(s)return s;const i=t.props,o={},c=[];let l=!1;if(!fe(t)){const d=p=>{l=!0;const[g,_]=Wp(p,e,!0);rt(o,g),_&&c.push(..._)};!n&&e.mixins.length&&e.mixins.forEach(d),t.extends&&d(t.extends),t.mixins&&t.mixins.forEach(d)}if(!i&&!l)return Ue(t)&&r.set(t,ls),ls;if(he(i))for(let d=0;d<i.length;d++){const p=Wt(i[d]);zh(p)&&(o[p]=Me)}else if(i)for(const d in i){const p=Wt(d);if(zh(p)){const g=i[d],_=o[p]=he(g)||fe(g)?{type:g}:rt({},g),P=_.type;let k=!1,D=!0;if(he(P))for(let x=0;x<P.length;++x){const F=P[x],$=fe(F)&&F.name;if($==="Boolean"){k=!0;break}else $==="String"&&(D=!1)}else k=fe(P)&&P.name==="Boolean";_[0]=k,_[1]=D,(k||Ce(_,"default"))&&c.push(p)}}const h=[o,c];return Ue(t)&&r.set(t,h),h}function zh(t){return t[0]!=="$"&&!ai(t)}const Kp=t=>t[0]==="_"||t==="$stable",Ul=t=>he(t)?t.map(dn):[dn(t)],Jv=(t,e,n)=>{if(e._n)return e;const r=Xt((...s)=>Ul(e(...s)),n);return r._c=!1,r},Gp=(t,e,n)=>{const r=t._ctx;for(const s in t){if(Kp(s))continue;const i=t[s];if(fe(i))e[s]=Jv(s,i,r);else if(i!=null){const o=Ul(i);e[s]=()=>o}}},Qp=(t,e)=>{const n=Ul(e);t.slots.default=()=>n},Yp=(t,e,n)=>{for(const r in e)(n||r!=="_")&&(t[r]=e[r])},Xv=(t,e,n)=>{const r=t.slots=qp();if(t.vnode.shapeFlag&32){const s=e._;s?(Yp(r,e,n),n&&op(r,"_",s,!0)):Gp(e,r)}else e&&Qp(t,e)},Zv=(t,e,n)=>{const{vnode:r,slots:s}=t;let i=!0,o=Me;if(r.shapeFlag&32){const c=e._;c?n&&c===1?i=!1:Yp(s,e,n):(i=!e.$stable,Gp(e,s)),o=e}else e&&(Qp(t,e),o={default:1});if(i)for(const c in s)!Kp(c)&&o[c]==null&&delete s[c]},Nt=fE;function eE(t){return tE(t)}function tE(t,e){const n=ha();n.__VUE__=!0;const{insert:r,remove:s,patchProp:i,createElement:o,createText:c,createComment:l,setText:h,setElementText:d,parentNode:p,nextSibling:g,setScopeId:_=pn,insertStaticContent:P}=t,k=(y,E,C,U=null,O=null,B=null,G=void 0,z=null,H=!!E.dynamicChildren)=>{if(y===E)return;y&&!Xs(y,E)&&(U=N(y),Be(y,O,B,!0),y=null),E.patchFlag===-2&&(H=!1,E.dynamicChildren=null);const{type:j,ref:se,shapeFlag:Y}=E;switch(j){case _a:D(y,E,C,U);break;case Lr:x(y,E,C,U);break;case To:y==null&&F(E,C,U,G);break;case Qt:R(y,E,C,U,O,B,G,z,H);break;default:Y&1?ce(y,E,C,U,O,B,G,z,H):Y&6?T(y,E,C,U,O,B,G,z,H):(Y&64||Y&128)&&j.process(y,E,C,U,O,B,G,z,H,ee)}se!=null&&O&&jc(se,y&&y.ref,B,E||y,!E)},D=(y,E,C,U)=>{if(y==null)r(E.el=c(E.children),C,U);else{const O=E.el=y.el;E.children!==y.children&&h(O,E.children)}},x=(y,E,C,U)=>{y==null?r(E.el=l(E.children||""),C,U):E.el=y.el},F=(y,E,C,U)=>{[y.el,y.anchor]=P(y.children,E,C,U,y.el,y.anchor)},$=({el:y,anchor:E},C,U)=>{let O;for(;y&&y!==E;)O=g(y),r(y,C,U),y=O;r(E,C,U)},q=({el:y,anchor:E})=>{let C;for(;y&&y!==E;)C=g(y),s(y),y=C;s(E)},ce=(y,E,C,U,O,B,G,z,H)=>{E.type==="svg"?G="svg":E.type==="math"&&(G="mathml"),y==null?le(E,C,U,O,B,G,z,H):I(y,E,O,B,G,z,H)},le=(y,E,C,U,O,B,G,z)=>{let H,j;const{props:se,shapeFlag:Y,transition:ne,dirs:te}=y;if(H=y.el=o(y.type,B,se&&se.is,se),Y&8?d(H,y.children):Y&16&&v(y.children,H,null,U,O,gc(y,B),G,z),te&&br(y,null,U,"created"),w(H,y,y.scopeId,G,U),se){for(const Se in se)Se!=="value"&&!ai(Se)&&i(H,Se,null,se[Se],B,U);"value"in se&&i(H,"value",null,se.value,B),(j=se.onVnodeBeforeMount)&&un(j,U,y)}te&&br(y,null,U,"beforeMount");const ie=nE(O,ne);ie&&ne.beforeEnter(H),r(H,E,C),((j=se&&se.onVnodeMounted)||ie||te)&&Nt(()=>{j&&un(j,U,y),ie&&ne.enter(H),te&&br(y,null,U,"mounted")},O)},w=(y,E,C,U,O)=>{if(C&&_(y,C),U)for(let B=0;B<U.length;B++)_(y,U[B]);if(O){let B=O.subTree;if(E===B||nm(B.type)&&(B.ssContent===E||B.ssFallback===E)){const G=O.vnode;w(y,G,G.scopeId,G.slotScopeIds,O.parent)}}},v=(y,E,C,U,O,B,G,z,H=0)=>{for(let j=H;j<y.length;j++){const se=y[j]=z?Gn(y[j]):dn(y[j]);k(null,se,E,C,U,O,B,G,z)}},I=(y,E,C,U,O,B,G)=>{const z=E.el=y.el;let{patchFlag:H,dynamicChildren:j,dirs:se}=E;H|=y.patchFlag&16;const Y=y.props||Me,ne=E.props||Me;let te;if(C&&Rr(C,!1),(te=ne.onVnodeBeforeUpdate)&&un(te,C,E,y),se&&br(E,y,C,"beforeUpdate"),C&&Rr(C,!0),(Y.innerHTML&&ne.innerHTML==null||Y.textContent&&ne.textContent==null)&&d(z,""),j?A(y.dynamicChildren,j,z,C,U,gc(E,O),B):G||ge(y,E,z,null,C,U,gc(E,O),B,!1),H>0){if(H&16)b(z,Y,ne,C,O);else if(H&2&&Y.class!==ne.class&&i(z,"class",null,ne.class,O),H&4&&i(z,"style",Y.style,ne.style,O),H&8){const ie=E.dynamicProps;for(let Se=0;Se<ie.length;Se++){const we=ie[Se],ut=Y[we],Ze=ne[we];(Ze!==ut||we==="value")&&i(z,we,ut,Ze,O,C)}}H&1&&y.children!==E.children&&d(z,E.children)}else!G&&j==null&&b(z,Y,ne,C,O);((te=ne.onVnodeUpdated)||se)&&Nt(()=>{te&&un(te,C,E,y),se&&br(E,y,C,"updated")},U)},A=(y,E,C,U,O,B,G)=>{for(let z=0;z<E.length;z++){const H=y[z],j=E[z],se=H.el&&(H.type===Qt||!Xs(H,j)||H.shapeFlag&70)?p(H.el):C;k(H,j,se,null,U,O,B,G,!0)}},b=(y,E,C,U,O)=>{if(E!==C){if(E!==Me)for(const B in E)!ai(B)&&!(B in C)&&i(y,B,E[B],null,O,U);for(const B in C){if(ai(B))continue;const G=C[B],z=E[B];G!==z&&B!=="value"&&i(y,B,z,G,O,U)}"value"in C&&i(y,"value",E.value,C.value,O)}},R=(y,E,C,U,O,B,G,z,H)=>{const j=E.el=y?y.el:c(""),se=E.anchor=y?y.anchor:c("");let{patchFlag:Y,dynamicChildren:ne,slotScopeIds:te}=E;te&&(z=z?z.concat(te):te),y==null?(r(j,C,U),r(se,C,U),v(E.children||[],C,se,O,B,G,z,H)):Y>0&&Y&64&&ne&&y.dynamicChildren?(A(y.dynamicChildren,ne,C,O,B,G,z),(E.key!=null||O&&E===O.subTree)&&Jp(y,E,!0)):ge(y,E,C,se,O,B,G,z,H)},T=(y,E,C,U,O,B,G,z,H)=>{E.slotScopeIds=z,y==null?E.shapeFlag&512?O.ctx.activate(E,C,U,G,H):Tt(E,C,U,O,B,G,H):Bt(y,E,H)},Tt=(y,E,C,U,O,B,G)=>{const z=y.component=TE(y,U,O);if(xp(y)&&(z.ctx.renderer=ee),IE(z,!1,G),z.asyncDep){if(O&&O.registerDep(z,Ge,G),!y.el){const H=z.subTree=Re(Lr);x(null,H,E,C)}}else Ge(z,y,E,C,O,B,G)},Bt=(y,E,C)=>{const U=E.component=y.component;if(hE(y,E,C))if(U.asyncDep&&!U.asyncResolved){ve(U,E,C);return}else U.next=E,U.update();else E.el=y.el,U.vnode=E},Ge=(y,E,C,U,O,B,G)=>{const z=()=>{if(y.isMounted){let{next:Y,bu:ne,u:te,parent:ie,vnode:Se}=y;{const ht=Xp(y);if(ht){Y&&(Y.el=Se.el,ve(y,Y,G)),ht.asyncDep.then(()=>{y.isUnmounted||z()});return}}let we=Y,ut;Rr(y,!1),Y?(Y.el=Se.el,ve(y,Y,G)):Y=Se,ne&&uc(ne),(ut=Y.props&&Y.props.onVnodeBeforeUpdate)&&un(ut,ie,Y,Se),Rr(y,!0);const Ze=_c(y),st=y.subTree;y.subTree=Ze,k(st,Ze,p(st.el),N(st),y,O,B),Y.el=Ze.el,we===null&&dE(y,Ze.el),te&&Nt(te,O),(ut=Y.props&&Y.props.onVnodeUpdated)&&Nt(()=>un(ut,ie,Y,Se),O)}else{let Y;const{el:ne,props:te}=E,{bm:ie,m:Se,parent:we,root:ut,type:Ze}=y,st=ui(E);if(Rr(y,!1),ie&&uc(ie),!st&&(Y=te&&te.onVnodeBeforeMount)&&un(Y,we,E),Rr(y,!0),ne&&Ve){const ht=()=>{y.subTree=_c(y),Ve(ne,y.subTree,y,O,null)};st&&Ze.__asyncHydrate?Ze.__asyncHydrate(ne,y,ht):ht()}else{ut.ce&&ut.ce._injectChildStyle(Ze);const ht=y.subTree=_c(y);k(null,ht,C,U,y,O,B),E.el=ht.el}if(Se&&Nt(Se,O),!st&&(Y=te&&te.onVnodeMounted)){const ht=E;Nt(()=>un(Y,we,ht),O)}(E.shapeFlag&256||we&&ui(we.vnode)&&we.vnode.shapeFlag&256)&&y.a&&Nt(y.a,O),y.isMounted=!0,E=C=U=null}};y.scope.on();const H=y.effect=new up(z);y.scope.off();const j=y.update=H.run.bind(H),se=y.job=H.runIfDirty.bind(H);se.i=y,se.id=y.uid,H.scheduler=()=>xl(se),Rr(y,!0),j()},ve=(y,E,C)=>{E.component=y;const U=y.vnode.props;y.vnode=E,y.next=null,Qv(y,E.props,U,C),Zv(y,E.children,C),mr(),Uh(y),gr()},ge=(y,E,C,U,O,B,G,z,H=!1)=>{const j=y&&y.children,se=y?y.shapeFlag:0,Y=E.children,{patchFlag:ne,shapeFlag:te}=E;if(ne>0){if(ne&128){Kt(j,Y,C,U,O,B,G,z,H);return}else if(ne&256){Vt(j,Y,C,U,O,B,G,z,H);return}}te&8?(se&16&&St(j,O,B),Y!==j&&d(C,Y)):se&16?te&16?Kt(j,Y,C,U,O,B,G,z,H):St(j,O,B,!0):(se&8&&d(C,""),te&16&&v(Y,C,U,O,B,G,z,H))},Vt=(y,E,C,U,O,B,G,z,H)=>{y=y||ls,E=E||ls;const j=y.length,se=E.length,Y=Math.min(j,se);let ne;for(ne=0;ne<Y;ne++){const te=E[ne]=H?Gn(E[ne]):dn(E[ne]);k(y[ne],te,C,null,O,B,G,z,H)}j>se?St(y,O,B,!0,!1,Y):v(E,C,U,O,B,G,z,H,Y)},Kt=(y,E,C,U,O,B,G,z,H)=>{let j=0;const se=E.length;let Y=y.length-1,ne=se-1;for(;j<=Y&&j<=ne;){const te=y[j],ie=E[j]=H?Gn(E[j]):dn(E[j]);if(Xs(te,ie))k(te,ie,C,null,O,B,G,z,H);else break;j++}for(;j<=Y&&j<=ne;){const te=y[Y],ie=E[ne]=H?Gn(E[ne]):dn(E[ne]);if(Xs(te,ie))k(te,ie,C,null,O,B,G,z,H);else break;Y--,ne--}if(j>Y){if(j<=ne){const te=ne+1,ie=te<se?E[te].el:U;for(;j<=ne;)k(null,E[j]=H?Gn(E[j]):dn(E[j]),C,ie,O,B,G,z,H),j++}}else if(j>ne)for(;j<=Y;)Be(y[j],O,B,!0),j++;else{const te=j,ie=j,Se=new Map;for(j=ie;j<=ne;j++){const It=E[j]=H?Gn(E[j]):dn(E[j]);It.key!=null&&Se.set(It.key,j)}let we,ut=0;const Ze=ne-ie+1;let st=!1,ht=0;const jn=new Array(Ze);for(j=0;j<Ze;j++)jn[j]=0;for(j=te;j<=Y;j++){const It=y[j];if(ut>=Ze){Be(It,O,B,!0);continue}let $t;if(It.key!=null)$t=Se.get(It.key);else for(we=ie;we<=ne;we++)if(jn[we-ie]===0&&Xs(It,E[we])){$t=we;break}$t===void 0?Be(It,O,B,!0):(jn[$t-ie]=j+1,$t>=ht?ht=$t:st=!0,k(It,E[$t],C,null,O,B,G,z,H),ut++)}const Qr=st?rE(jn):ls;for(we=Qr.length-1,j=Ze-1;j>=0;j--){const It=ie+j,$t=E[It],Yr=It+1<se?E[It+1].el:U;jn[j]===0?k(null,$t,C,Yr,O,B,G,z,H):st&&(we<0||j!==Qr[we]?jt($t,C,Yr,2):we--)}}},jt=(y,E,C,U,O=null)=>{const{el:B,type:G,transition:z,children:H,shapeFlag:j}=y;if(j&6){jt(y.component.subTree,E,C,U);return}if(j&128){y.suspense.move(E,C,U);return}if(j&64){G.move(y,E,C,ee);return}if(G===Qt){r(B,E,C);for(let Y=0;Y<H.length;Y++)jt(H[Y],E,C,U);r(y.anchor,E,C);return}if(G===To){$(y,E,C);return}if(U!==2&&j&1&&z)if(U===0)z.beforeEnter(B),r(B,E,C),Nt(()=>z.enter(B),O);else{const{leave:Y,delayLeave:ne,afterLeave:te}=z,ie=()=>r(B,E,C),Se=()=>{Y(B,()=>{ie(),te&&te()})};ne?ne(B,ie,Se):Se()}else r(B,E,C)},Be=(y,E,C,U=!1,O=!1)=>{const{type:B,props:G,ref:z,children:H,dynamicChildren:j,shapeFlag:se,patchFlag:Y,dirs:ne,cacheIndex:te}=y;if(Y===-2&&(O=!1),z!=null&&jc(z,null,C,y,!0),te!=null&&(E.renderCache[te]=void 0),se&256){E.ctx.deactivate(y);return}const ie=se&1&&ne,Se=!ui(y);let we;if(Se&&(we=G&&G.onVnodeBeforeUnmount)&&un(we,E,y),se&6)ln(y.component,C,U);else{if(se&128){y.suspense.unmount(C,U);return}ie&&br(y,null,E,"beforeUnmount"),se&64?y.type.remove(y,E,C,ee,U):j&&!j.hasOnce&&(B!==Qt||Y>0&&Y&64)?St(j,E,C,!1,!0):(B===Qt&&Y&384||!O&&se&16)&&St(H,E,C),U&&je(y)}(Se&&(we=G&&G.onVnodeUnmounted)||ie)&&Nt(()=>{we&&un(we,E,y),ie&&br(y,null,E,"unmounted")},C)},je=y=>{const{type:E,el:C,anchor:U,transition:O}=y;if(E===Qt){Bn(C,U);return}if(E===To){q(y);return}const B=()=>{s(C),O&&!O.persisted&&O.afterLeave&&O.afterLeave()};if(y.shapeFlag&1&&O&&!O.persisted){const{leave:G,delayLeave:z}=O,H=()=>G(C,B);z?z(y.el,B,H):H()}else B()},Bn=(y,E)=>{let C;for(;y!==E;)C=g(y),s(y),y=C;s(E)},ln=(y,E,C)=>{const{bum:U,scope:O,job:B,subTree:G,um:z,m:H,a:j}=y;Wh(H),Wh(j),U&&uc(U),O.stop(),B&&(B.flags|=8,Be(G,y,E,C)),z&&Nt(z,E),Nt(()=>{y.isUnmounted=!0},E),E&&E.pendingBranch&&!E.isUnmounted&&y.asyncDep&&!y.asyncResolved&&y.suspenseId===E.pendingId&&(E.deps--,E.deps===0&&E.resolve())},St=(y,E,C,U=!1,O=!1,B=0)=>{for(let G=B;G<y.length;G++)Be(y[G],E,C,U,O)},N=y=>{if(y.shapeFlag&6)return N(y.component.subTree);if(y.shapeFlag&128)return y.suspense.next();const E=g(y.anchor||y.el),C=E&&E[bv];return C?g(C):E};let J=!1;const Q=(y,E,C)=>{y==null?E._vnode&&Be(E._vnode,null,null,!0):k(E._vnode||null,y,E,null,null,null,C),E._vnode=y,J||(J=!0,Uh(),Dp(),J=!1)},ee={p:k,um:Be,m:jt,r:je,mt:Tt,mc:v,pc:ge,pbc:A,n:N,o:t};let Ee,Ve;return{render:Q,hydrate:Ee,createApp:Kv(Q,Ee)}}function gc({type:t,props:e},n){return n==="svg"&&t==="foreignObject"||n==="mathml"&&t==="annotation-xml"&&e&&e.encoding&&e.encoding.includes("html")?void 0:n}function Rr({effect:t,job:e},n){n?(t.flags|=32,e.flags|=4):(t.flags&=-33,e.flags&=-5)}function nE(t,e){return(!t||t&&!t.pendingBranch)&&e&&!e.persisted}function Jp(t,e,n=!1){const r=t.children,s=e.children;if(he(r)&&he(s))for(let i=0;i<r.length;i++){const o=r[i];let c=s[i];c.shapeFlag&1&&!c.dynamicChildren&&((c.patchFlag<=0||c.patchFlag===32)&&(c=s[i]=Gn(s[i]),c.el=o.el),!n&&c.patchFlag!==-2&&Jp(o,c)),c.type===_a&&(c.el=o.el)}}function rE(t){const e=t.slice(),n=[0];let r,s,i,o,c;const l=t.length;for(r=0;r<l;r++){const h=t[r];if(h!==0){if(s=n[n.length-1],t[s]<h){e[r]=s,n.push(r);continue}for(i=0,o=n.length-1;i<o;)c=i+o>>1,t[n[c]]<h?i=c+1:o=c;h<t[n[i]]&&(i>0&&(e[r]=n[i-1]),n[i]=r)}}for(i=n.length,o=n[i-1];i-- >0;)n[i]=o,o=e[o];return n}function Xp(t){const e=t.subTree.component;if(e)return e.asyncDep&&!e.asyncResolved?e:Xp(e)}function Wh(t){if(t)for(let e=0;e<t.length;e++)t[e].flags|=8}const sE=Symbol.for("v-scx"),iE=()=>Ne(sE);function tt(t,e,n){return Zp(t,e,n)}function Zp(t,e,n=Me){const{immediate:r,deep:s,flush:i,once:o}=n,c=rt({},n),l=e&&r||!e&&i!=="post";let h;if(bi){if(i==="sync"){const _=iE();h=_.__watcherHandles||(_.__watcherHandles=[])}else if(!l){const _=()=>{};return _.stop=pn,_.resume=pn,_.pause=pn,_}}const d=vt;c.call=(_,P,k)=>vn(_,d,P,k);let p=!1;i==="post"?c.scheduler=_=>{Nt(_,d&&d.suspense)}:i!=="sync"&&(p=!0,c.scheduler=(_,P)=>{P?_():xl(_)}),c.augmentJob=_=>{e&&(_.flags|=4),p&&(_.flags|=2,d&&(_.id=d.uid,_.i=d))};const g=Tv(t,e,c);return bi&&(h?h.push(g):l&&g()),g}function oE(t,e,n){const r=this.proxy,s=Je(t)?t.includes(".")?em(r,t):()=>r[t]:t.bind(r,r);let i;fe(e)?i=e:(i=e.handler,n=e);const o=Bi(this),c=Zp(s,i.bind(r),n);return o(),c}function em(t,e){const n=e.split(".");return()=>{let r=t;for(let s=0;s<n.length&&r;s++)r=r[n[s]];return r}}const aE=(t,e)=>e==="modelValue"||e==="model-value"?t.modelModifiers:t[`${e}Modifiers`]||t[`${Wt(e)}Modifiers`]||t[`${$r(e)}Modifiers`];function cE(t,e,...n){if(t.isUnmounted)return;const r=t.vnode.props||Me;let s=n;const i=e.startsWith("update:"),o=i&&aE(r,e.slice(7));o&&(o.trim&&(s=n.map(d=>Je(d)?d.trim():d)),o.number&&(s=n.map(Ly)));let c,l=r[c=lc(e)]||r[c=lc(Wt(e))];!l&&i&&(l=r[c=lc($r(e))]),l&&vn(l,t,6,s);const h=r[c+"Once"];if(h){if(!t.emitted)t.emitted={};else if(t.emitted[c])return;t.emitted[c]=!0,vn(h,t,6,s)}}function tm(t,e,n=!1){const r=e.emitsCache,s=r.get(t);if(s!==void 0)return s;const i=t.emits;let o={},c=!1;if(!fe(t)){const l=h=>{const d=tm(h,e,!0);d&&(c=!0,rt(o,d))};!n&&e.mixins.length&&e.mixins.forEach(l),t.extends&&l(t.extends),t.mixins&&t.mixins.forEach(l)}return!i&&!c?(Ue(t)&&r.set(t,null),null):(he(i)?i.forEach(l=>o[l]=null):rt(o,i),Ue(t)&&r.set(t,o),o)}function ga(t,e){return!t||!aa(e)?!1:(e=e.slice(2).replace(/Once$/,""),Ce(t,e[0].toLowerCase()+e.slice(1))||Ce(t,$r(e))||Ce(t,e))}function _c(t){const{type:e,vnode:n,proxy:r,withProxy:s,propsOptions:[i],slots:o,attrs:c,emit:l,render:h,renderCache:d,props:p,data:g,setupState:_,ctx:P,inheritAttrs:k}=t,D=Lo(t);let x,F;try{if(n.shapeFlag&4){const q=s||r,ce=q;x=dn(h.call(ce,q,d,p,_,g,P)),F=c}else{const q=e;x=dn(q.length>1?q(p,{attrs:c,slots:o,emit:l}):q(p,null)),F=e.props?c:lE(c)}}catch(q){di.length=0,pa(q,t,1),x=Re(Lr)}let $=x;if(F&&k!==!1){const q=Object.keys(F),{shapeFlag:ce}=$;q.length&&ce&7&&(i&&q.some(Al)&&(F=uE(F,i)),$=ys($,F,!1,!0))}return n.dirs&&($=ys($,null,!1,!0),$.dirs=$.dirs?$.dirs.concat(n.dirs):n.dirs),n.transition&&Ml($,n.transition),x=$,Lo(D),x}const lE=t=>{let e;for(const n in t)(n==="class"||n==="style"||aa(n))&&((e||(e={}))[n]=t[n]);return e},uE=(t,e)=>{const n={};for(const r in t)(!Al(r)||!(r.slice(9)in e))&&(n[r]=t[r]);return n};function hE(t,e,n){const{props:r,children:s,component:i}=t,{props:o,children:c,patchFlag:l}=e,h=i.emitsOptions;if(e.dirs||e.transition)return!0;if(n&&l>=0){if(l&1024)return!0;if(l&16)return r?Kh(r,o,h):!!o;if(l&8){const d=e.dynamicProps;for(let p=0;p<d.length;p++){const g=d[p];if(o[g]!==r[g]&&!ga(h,g))return!0}}}else return(s||c)&&(!c||!c.$stable)?!0:r===o?!1:r?o?Kh(r,o,h):!0:!!o;return!1}function Kh(t,e,n){const r=Object.keys(e);if(r.length!==Object.keys(t).length)return!0;for(let s=0;s<r.length;s++){const i=r[s];if(e[i]!==t[i]&&!ga(n,i))return!0}return!1}function dE({vnode:t,parent:e},n){for(;e;){const r=e.subTree;if(r.suspense&&r.suspense.activeBranch===t&&(r.el=t.el),r===t)(t=e.vnode).el=n,e=e.parent;else break}}const nm=t=>t.__isSuspense;function fE(t,e){e&&e.pendingBranch?he(t)?e.effects.push(...t):e.effects.push(t):Av(t)}const Qt=Symbol.for("v-fgt"),_a=Symbol.for("v-txt"),Lr=Symbol.for("v-cmt"),To=Symbol.for("v-stc"),di=[];let Mt=null;function me(t=!1){di.push(Mt=t?null:[])}function pE(){di.pop(),Mt=di[di.length-1]||null}let Ai=1;function Gh(t){Ai+=t,t<0&&Mt&&(Mt.hasOnce=!0)}function rm(t){return t.dynamicChildren=Ai>0?Mt||ls:null,pE(),Ai>0&&Mt&&Mt.push(t),t}function be(t,e,n,r,s,i){return rm(W(t,e,n,r,s,i,!0))}function rr(t,e,n,r,s){return rm(Re(t,e,n,r,s,!0))}function Uo(t){return t?t.__v_isVNode===!0:!1}function Xs(t,e){return t.type===e.type&&t.key===e.key}const sm=({key:t})=>t??null,Io=({ref:t,ref_key:e,ref_for:n})=>(typeof t=="number"&&(t=""+t),t!=null?Je(t)||ct(t)||fe(t)?{i:Jt,r:t,k:e,f:!!n}:t:null);function W(t,e=null,n=null,r=0,s=null,i=t===Qt?0:1,o=!1,c=!1){const l={__v_isVNode:!0,__v_skip:!0,type:t,props:e,key:e&&sm(e),ref:e&&Io(e),scopeId:Op,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:i,patchFlag:r,dynamicProps:s,dynamicChildren:null,appContext:null,ctx:Jt};return c?(Bl(l,n),i&128&&t.normalize(l)):n&&(l.shapeFlag|=Je(n)?8:16),Ai>0&&!o&&Mt&&(l.patchFlag>0||i&6)&&l.patchFlag!==32&&Mt.push(l),l}const Re=mE;function mE(t,e=null,n=null,r=0,s=null,i=!1){if((!t||t===Fv)&&(t=Lr),Uo(t)){const c=ys(t,e,!0);return n&&Bl(c,n),Ai>0&&!i&&Mt&&(c.shapeFlag&6?Mt[Mt.indexOf(t)]=c:Mt.push(c)),c.patchFlag=-2,c}if(SE(t)&&(t=t.__vccOpts),e){e=gE(e);let{class:c,style:l}=e;c&&!Je(c)&&(e.class=xr(c)),Ue(l)&&(Nl(l)&&!he(l)&&(l=rt({},l)),e.style=Sl(l))}const o=Je(t)?1:nm(t)?128:Rv(t)?64:Ue(t)?4:fe(t)?2:0;return W(t,e,n,r,s,o,i,!0)}function gE(t){return t?Nl(t)||Hp(t)?rt({},t):t:null}function ys(t,e,n=!1,r=!1){const{props:s,ref:i,patchFlag:o,children:c,transition:l}=t,h=e?yE(s||{},e):s,d={__v_isVNode:!0,__v_skip:!0,type:t.type,props:h,key:h&&sm(h),ref:e&&e.ref?n&&i?he(i)?i.concat(Io(e)):[i,Io(e)]:Io(e):i,scopeId:t.scopeId,slotScopeIds:t.slotScopeIds,children:c,target:t.target,targetStart:t.targetStart,targetAnchor:t.targetAnchor,staticCount:t.staticCount,shapeFlag:t.shapeFlag,patchFlag:e&&t.type!==Qt?o===-1?16:o|16:o,dynamicProps:t.dynamicProps,dynamicChildren:t.dynamicChildren,appContext:t.appContext,dirs:t.dirs,transition:l,component:t.component,suspense:t.suspense,ssContent:t.ssContent&&ys(t.ssContent),ssFallback:t.ssFallback&&ys(t.ssFallback),el:t.el,anchor:t.anchor,ctx:t.ctx,ce:t.ce};return l&&r&&Ml(d,l.clone(d)),d}function Bo(t=" ",e=0){return Re(_a,null,t,e)}function _E(t,e){const n=Re(To,null,t);return n.staticCount=e,n}function ze(t="",e=!1){return e?(me(),rr(Lr,null,t)):Re(Lr,null,t)}function dn(t){return t==null||typeof t=="boolean"?Re(Lr):he(t)?Re(Qt,null,t.slice()):Uo(t)?Gn(t):Re(_a,null,String(t))}function Gn(t){return t.el===null&&t.patchFlag!==-1||t.memo?t:ys(t)}function Bl(t,e){let n=0;const{shapeFlag:r}=t;if(e==null)e=null;else if(he(e))n=16;else if(typeof e=="object")if(r&65){const s=e.default;s&&(s._c&&(s._d=!1),Bl(t,s()),s._c&&(s._d=!0));return}else{n=32;const s=e._;!s&&!Hp(e)?e._ctx=Jt:s===3&&Jt&&(Jt.slots._===1?e._=1:(e._=2,t.patchFlag|=1024))}else fe(e)?(e={default:e,_ctx:Jt},n=32):(e=String(e),r&64?(n=16,e=[Bo(e)]):n=8);t.children=e,t.shapeFlag|=n}function yE(...t){const e={};for(let n=0;n<t.length;n++){const r=t[n];for(const s in r)if(s==="class")e.class!==r.class&&(e.class=xr([e.class,r.class]));else if(s==="style")e.style=Sl([e.style,r.style]);else if(aa(s)){const i=e[s],o=r[s];o&&i!==o&&!(he(i)&&i.includes(o))&&(e[s]=i?[].concat(i,o):o)}else s!==""&&(e[s]=r[s])}return e}function un(t,e,n,r=null){vn(t,e,7,[n,r])}const vE=jp();let EE=0;function TE(t,e,n){const r=t.type,s=(e?e.appContext:t.appContext)||vE,i={uid:EE++,vnode:t,type:r,parent:e,appContext:s,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new Hy(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:e?e.provides:Object.create(s.provides),ids:e?e.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:Wp(r,s),emitsOptions:tm(r,s),emit:null,emitted:null,propsDefaults:Me,inheritAttrs:r.inheritAttrs,ctx:Me,data:Me,props:Me,attrs:Me,slots:Me,refs:Me,setupState:Me,setupContext:null,suspense:n,suspenseId:n?n.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return i.ctx={_:i},i.root=e?e.root:i,i.emit=cE.bind(null,i),t.ce&&t.ce(i),i}let vt=null,jo,Wc;{const t=ha(),e=(n,r)=>{let s;return(s=t[n])||(s=t[n]=[]),s.push(r),i=>{s.length>1?s.forEach(o=>o(i)):s[0](i)}};jo=e("__VUE_INSTANCE_SETTERS__",n=>vt=n),Wc=e("__VUE_SSR_SETTERS__",n=>bi=n)}const Bi=t=>{const e=vt;return jo(t),t.scope.on(),()=>{t.scope.off(),jo(e)}},Qh=()=>{vt&&vt.scope.off(),jo(null)};function im(t){return t.vnode.shapeFlag&4}let bi=!1;function IE(t,e=!1,n=!1){e&&Wc(e);const{props:r,children:s}=t.vnode,i=im(t);Gv(t,r,i,e),Xv(t,s,n);const o=i?wE(t,e):void 0;return e&&Wc(!1),o}function wE(t,e){const n=t.type;t.accessCache=Object.create(null),t.proxy=new Proxy(t.ctx,Bv);const{setup:r}=n;if(r){mr();const s=t.setupContext=r.length>1?bE(t):null,i=Bi(t),o=Ui(r,t,0,[t.props,s]),c=rp(o);if(gr(),i(),(c||t.sp)&&!ui(t)&&Np(t),c){if(o.then(Qh,Qh),e)return o.then(l=>{Yh(t,l,e)}).catch(l=>{pa(l,t,0)});t.asyncDep=o}else Yh(t,o,e)}else om(t,e)}function Yh(t,e,n){fe(e)?t.type.__ssrInlineRender?t.ssrRender=e:t.render=e:Ue(e)&&(t.setupState=Sp(e)),om(t,n)}let Jh;function om(t,e,n){const r=t.type;if(!t.render){if(!e&&Jh&&!r.render){const s=r.template||Fl(t).template;if(s){const{isCustomElement:i,compilerOptions:o}=t.appContext.config,{delimiters:c,compilerOptions:l}=r,h=rt(rt({isCustomElement:i,delimiters:c},o),l);r.render=Jh(s,h)}}t.render=r.render||pn}{const s=Bi(t);mr();try{jv(t)}finally{gr(),s()}}}const AE={get(t,e){return gt(t,"get",""),t[e]}};function bE(t){const e=n=>{t.exposed=n||{}};return{attrs:new Proxy(t.attrs,AE),slots:t.slots,emit:t.emit,expose:e}}function jl(t){return t.exposed?t.exposeProxy||(t.exposeProxy=new Proxy(Sp(hv(t.exposed)),{get(e,n){if(n in e)return e[n];if(n in hi)return hi[n](t)},has(e,n){return n in e||n in hi}})):t.proxy}function RE(t,e=!0){return fe(t)?t.displayName||t.name:t.name||e&&t.__name}function SE(t){return fe(t)&&"__vccOpts"in t}const Yt=(t,e)=>vv(t,e,bi);function $l(t,e,n){const r=arguments.length;return r===2?Ue(e)&&!he(e)?Uo(e)?Re(t,null,[e]):Re(t,e):Re(t,null,e):(r>3?n=Array.prototype.slice.call(arguments,2):r===3&&Uo(n)&&(n=[n]),Re(t,e,n))}const PE="3.5.12";/**
* @vue/runtime-dom v3.5.12
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let Kc;const Xh=typeof window<"u"&&window.trustedTypes;if(Xh)try{Kc=Xh.createPolicy("vue",{createHTML:t=>t})}catch{}const am=Kc?t=>Kc.createHTML(t):t=>t,CE="http://www.w3.org/2000/svg",kE="http://www.w3.org/1998/Math/MathML",Sn=typeof document<"u"?document:null,Zh=Sn&&Sn.createElement("template"),DE={insert:(t,e,n)=>{e.insertBefore(t,n||null)},remove:t=>{const e=t.parentNode;e&&e.removeChild(t)},createElement:(t,e,n,r)=>{const s=e==="svg"?Sn.createElementNS(CE,t):e==="mathml"?Sn.createElementNS(kE,t):n?Sn.createElement(t,{is:n}):Sn.createElement(t);return t==="select"&&r&&r.multiple!=null&&s.setAttribute("multiple",r.multiple),s},createText:t=>Sn.createTextNode(t),createComment:t=>Sn.createComment(t),setText:(t,e)=>{t.nodeValue=e},setElementText:(t,e)=>{t.textContent=e},parentNode:t=>t.parentNode,nextSibling:t=>t.nextSibling,querySelector:t=>Sn.querySelector(t),setScopeId(t,e){t.setAttribute(e,"")},insertStaticContent(t,e,n,r,s,i){const o=n?n.previousSibling:e.lastChild;if(s&&(s===i||s.nextSibling))for(;e.insertBefore(s.cloneNode(!0),n),!(s===i||!(s=s.nextSibling)););else{Zh.innerHTML=am(r==="svg"?`<svg>${t}</svg>`:r==="mathml"?`<math>${t}</math>`:t);const c=Zh.content;if(r==="svg"||r==="mathml"){const l=c.firstChild;for(;l.firstChild;)c.appendChild(l.firstChild);c.removeChild(l)}e.insertBefore(c,n)}return[o?o.nextSibling:e.firstChild,n?n.previousSibling:e.lastChild]}},VE=Symbol("_vtc");function OE(t,e,n){const r=t[VE];r&&(e=(e?[e,...r]:[...r]).join(" ")),e==null?t.removeAttribute("class"):n?t.setAttribute("class",e):t.className=e}const ed=Symbol("_vod"),NE=Symbol("_vsh"),xE=Symbol(""),ME=/(^|;)\s*display\s*:/;function LE(t,e,n){const r=t.style,s=Je(n);let i=!1;if(n&&!s){if(e)if(Je(e))for(const o of e.split(";")){const c=o.slice(0,o.indexOf(":")).trim();n[c]==null&&wo(r,c,"")}else for(const o in e)n[o]==null&&wo(r,o,"");for(const o in n)o==="display"&&(i=!0),wo(r,o,n[o])}else if(s){if(e!==n){const o=r[xE];o&&(n+=";"+o),r.cssText=n,i=ME.test(n)}}else e&&t.removeAttribute("style");ed in t&&(t[ed]=i?r.display:"",t[NE]&&(r.display="none"))}const td=/\s*!important$/;function wo(t,e,n){if(he(n))n.forEach(r=>wo(t,e,r));else if(n==null&&(n=""),e.startsWith("--"))t.setProperty(e,n);else{const r=FE(t,e);td.test(n)?t.setProperty($r(r),n.replace(td,""),"important"):t[r]=n}}const nd=["Webkit","Moz","ms"],yc={};function FE(t,e){const n=yc[e];if(n)return n;let r=Wt(e);if(r!=="filter"&&r in t)return yc[e]=r;r=ua(r);for(let s=0;s<nd.length;s++){const i=nd[s]+r;if(i in t)return yc[e]=i}return e}const rd="http://www.w3.org/1999/xlink";function sd(t,e,n,r,s,i=qy(e)){r&&e.startsWith("xlink:")?n==null?t.removeAttributeNS(rd,e.slice(6,e.length)):t.setAttributeNS(rd,e,n):n==null||i&&!ap(n)?t.removeAttribute(e):t.setAttribute(e,i?"":pr(n)?String(n):n)}function id(t,e,n,r,s){if(e==="innerHTML"||e==="textContent"){n!=null&&(t[e]=e==="innerHTML"?am(n):n);return}const i=t.tagName;if(e==="value"&&i!=="PROGRESS"&&!i.includes("-")){const c=i==="OPTION"?t.getAttribute("value")||"":t.value,l=n==null?t.type==="checkbox"?"on":"":String(n);(c!==l||!("_value"in t))&&(t.value=l),n==null&&t.removeAttribute(e),t._value=n;return}let o=!1;if(n===""||n==null){const c=typeof t[e];c==="boolean"?n=ap(n):n==null&&c==="string"?(n="",o=!0):c==="number"&&(n=0,o=!0)}try{t[e]=n}catch{}o&&t.removeAttribute(s||e)}function UE(t,e,n,r){t.addEventListener(e,n,r)}function BE(t,e,n,r){t.removeEventListener(e,n,r)}const od=Symbol("_vei");function jE(t,e,n,r,s=null){const i=t[od]||(t[od]={}),o=i[e];if(r&&o)o.value=r;else{const[c,l]=$E(e);if(r){const h=i[e]=zE(r,s);UE(t,c,h,l)}else o&&(BE(t,c,o,l),i[e]=void 0)}}const ad=/(?:Once|Passive|Capture)$/;function $E(t){let e;if(ad.test(t)){e={};let r;for(;r=t.match(ad);)t=t.slice(0,t.length-r[0].length),e[r[0].toLowerCase()]=!0}return[t[2]===":"?t.slice(3):$r(t.slice(2)),e]}let vc=0;const qE=Promise.resolve(),HE=()=>vc||(qE.then(()=>vc=0),vc=Date.now());function zE(t,e){const n=r=>{if(!r._vts)r._vts=Date.now();else if(r._vts<=n.attached)return;vn(WE(r,n.value),e,5,[r])};return n.value=t,n.attached=HE(),n}function WE(t,e){if(he(e)){const n=t.stopImmediatePropagation;return t.stopImmediatePropagation=()=>{n.call(t),t._stopped=!0},e.map(r=>s=>!s._stopped&&r&&r(s))}else return e}const cd=t=>t.charCodeAt(0)===111&&t.charCodeAt(1)===110&&t.charCodeAt(2)>96&&t.charCodeAt(2)<123,KE=(t,e,n,r,s,i)=>{const o=s==="svg";e==="class"?OE(t,r,o):e==="style"?LE(t,n,r):aa(e)?Al(e)||jE(t,e,n,r,i):(e[0]==="."?(e=e.slice(1),!0):e[0]==="^"?(e=e.slice(1),!1):GE(t,e,r,o))?(id(t,e,r),!t.tagName.includes("-")&&(e==="value"||e==="checked"||e==="selected")&&sd(t,e,r,o,i,e!=="value")):t._isVueCE&&(/[A-Z]/.test(e)||!Je(r))?id(t,Wt(e),r,i,e):(e==="true-value"?t._trueValue=r:e==="false-value"&&(t._falseValue=r),sd(t,e,r,o))};function GE(t,e,n,r){if(r)return!!(e==="innerHTML"||e==="textContent"||e in t&&cd(e)&&fe(n));if(e==="spellcheck"||e==="draggable"||e==="translate"||e==="form"||e==="list"&&t.tagName==="INPUT"||e==="type"&&t.tagName==="TEXTAREA")return!1;if(e==="width"||e==="height"){const s=t.tagName;if(s==="IMG"||s==="VIDEO"||s==="CANVAS"||s==="SOURCE")return!1}return cd(e)&&Je(n)?!1:e in t}const QE=["ctrl","shift","alt","meta"],YE={stop:t=>t.stopPropagation(),prevent:t=>t.preventDefault(),self:t=>t.target!==t.currentTarget,ctrl:t=>!t.ctrlKey,shift:t=>!t.shiftKey,alt:t=>!t.altKey,meta:t=>!t.metaKey,left:t=>"button"in t&&t.button!==0,middle:t=>"button"in t&&t.button!==1,right:t=>"button"in t&&t.button!==2,exact:(t,e)=>QE.some(n=>t[`${n}Key`]&&!e.includes(n))},ks=(t,e)=>{const n=t._withMods||(t._withMods={}),r=e.join(".");return n[r]||(n[r]=(s,...i)=>{for(let o=0;o<e.length;o++){const c=YE[e[o]];if(c&&c(s,e))return}return t(s,...i)})},JE=rt({patchProp:KE},DE);let ld;function XE(){return ld||(ld=eE(JE))}const ZE=(...t)=>{const e=XE().createApp(...t),{mount:n}=e;return e.mount=r=>{const s=tT(r);if(!s)return;const i=e._component;!fe(i)&&!i.render&&!i.template&&(i.template=s.innerHTML),s.nodeType===1&&(s.textContent="");const o=n(s,!1,eT(s));return s instanceof Element&&(s.removeAttribute("v-cloak"),s.setAttribute("data-v-app","")),o},e};function eT(t){if(t instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&t instanceof MathMLElement)return"mathml"}function tT(t){return Je(t)?document.querySelector(t):t}/*!
  * vue-router v4.4.5
  * (c) 2024 Eduardo San Martin Morote
  * @license MIT
  */const rs=typeof document<"u";function cm(t){return typeof t=="object"||"displayName"in t||"props"in t||"__vccOpts"in t}function nT(t){return t.__esModule||t[Symbol.toStringTag]==="Module"||t.default&&cm(t.default)}const De=Object.assign;function Ec(t,e){const n={};for(const r in e){const s=e[r];n[r]=rn(s)?s.map(t):t(s)}return n}const fi=()=>{},rn=Array.isArray,lm=/#/g,rT=/&/g,sT=/\//g,iT=/=/g,oT=/\?/g,um=/\+/g,aT=/%5B/g,cT=/%5D/g,hm=/%5E/g,lT=/%60/g,dm=/%7B/g,uT=/%7C/g,fm=/%7D/g,hT=/%20/g;function ql(t){return encodeURI(""+t).replace(uT,"|").replace(aT,"[").replace(cT,"]")}function dT(t){return ql(t).replace(dm,"{").replace(fm,"}").replace(hm,"^")}function Gc(t){return ql(t).replace(um,"%2B").replace(hT,"+").replace(lm,"%23").replace(rT,"%26").replace(lT,"`").replace(dm,"{").replace(fm,"}").replace(hm,"^")}function fT(t){return Gc(t).replace(iT,"%3D")}function pT(t){return ql(t).replace(lm,"%23").replace(oT,"%3F")}function mT(t){return t==null?"":pT(t).replace(sT,"%2F")}function Ri(t){try{return decodeURIComponent(""+t)}catch{}return""+t}const gT=/\/$/,_T=t=>t.replace(gT,"");function Tc(t,e,n="/"){let r,s={},i="",o="";const c=e.indexOf("#");let l=e.indexOf("?");return c<l&&c>=0&&(l=-1),l>-1&&(r=e.slice(0,l),i=e.slice(l+1,c>-1?c:e.length),s=t(i)),c>-1&&(r=r||e.slice(0,c),o=e.slice(c,e.length)),r=TT(r??e,n),{fullPath:r+(i&&"?")+i+o,path:r,query:s,hash:Ri(o)}}function yT(t,e){const n=e.query?t(e.query):"";return e.path+(n&&"?")+n+(e.hash||"")}function ud(t,e){return!e||!t.toLowerCase().startsWith(e.toLowerCase())?t:t.slice(e.length)||"/"}function vT(t,e,n){const r=e.matched.length-1,s=n.matched.length-1;return r>-1&&r===s&&vs(e.matched[r],n.matched[s])&&pm(e.params,n.params)&&t(e.query)===t(n.query)&&e.hash===n.hash}function vs(t,e){return(t.aliasOf||t)===(e.aliasOf||e)}function pm(t,e){if(Object.keys(t).length!==Object.keys(e).length)return!1;for(const n in t)if(!ET(t[n],e[n]))return!1;return!0}function ET(t,e){return rn(t)?hd(t,e):rn(e)?hd(e,t):t===e}function hd(t,e){return rn(e)?t.length===e.length&&t.every((n,r)=>n===e[r]):t.length===1&&t[0]===e}function TT(t,e){if(t.startsWith("/"))return t;if(!t)return e;const n=e.split("/"),r=t.split("/"),s=r[r.length-1];(s===".."||s===".")&&r.push("");let i=n.length-1,o,c;for(o=0;o<r.length;o++)if(c=r[o],c!==".")if(c==="..")i>1&&i--;else break;return n.slice(0,i).join("/")+"/"+r.slice(o).join("/")}const zn={path:"/",name:void 0,params:{},query:{},hash:"",fullPath:"/",matched:[],meta:{},redirectedFrom:void 0};var Si;(function(t){t.pop="pop",t.push="push"})(Si||(Si={}));var pi;(function(t){t.back="back",t.forward="forward",t.unknown=""})(pi||(pi={}));function IT(t){if(!t)if(rs){const e=document.querySelector("base");t=e&&e.getAttribute("href")||"/",t=t.replace(/^\w+:\/\/[^\/]+/,"")}else t="/";return t[0]!=="/"&&t[0]!=="#"&&(t="/"+t),_T(t)}const wT=/^[^#]+#/;function AT(t,e){return t.replace(wT,"#")+e}function bT(t,e){const n=document.documentElement.getBoundingClientRect(),r=t.getBoundingClientRect();return{behavior:e.behavior,left:r.left-n.left-(e.left||0),top:r.top-n.top-(e.top||0)}}const ya=()=>({left:window.scrollX,top:window.scrollY});function RT(t){let e;if("el"in t){const n=t.el,r=typeof n=="string"&&n.startsWith("#"),s=typeof n=="string"?r?document.getElementById(n.slice(1)):document.querySelector(n):n;if(!s)return;e=bT(s,t)}else e=t;"scrollBehavior"in document.documentElement.style?window.scrollTo(e):window.scrollTo(e.left!=null?e.left:window.scrollX,e.top!=null?e.top:window.scrollY)}function dd(t,e){return(history.state?history.state.position-e:-1)+t}const Qc=new Map;function ST(t,e){Qc.set(t,e)}function PT(t){const e=Qc.get(t);return Qc.delete(t),e}let CT=()=>location.protocol+"//"+location.host;function mm(t,e){const{pathname:n,search:r,hash:s}=e,i=t.indexOf("#");if(i>-1){let c=s.includes(t.slice(i))?t.slice(i).length:1,l=s.slice(c);return l[0]!=="/"&&(l="/"+l),ud(l,"")}return ud(n,t)+r+s}function kT(t,e,n,r){let s=[],i=[],o=null;const c=({state:g})=>{const _=mm(t,location),P=n.value,k=e.value;let D=0;if(g){if(n.value=_,e.value=g,o&&o===P){o=null;return}D=k?g.position-k.position:0}else r(_);s.forEach(x=>{x(n.value,P,{delta:D,type:Si.pop,direction:D?D>0?pi.forward:pi.back:pi.unknown})})};function l(){o=n.value}function h(g){s.push(g);const _=()=>{const P=s.indexOf(g);P>-1&&s.splice(P,1)};return i.push(_),_}function d(){const{history:g}=window;g.state&&g.replaceState(De({},g.state,{scroll:ya()}),"")}function p(){for(const g of i)g();i=[],window.removeEventListener("popstate",c),window.removeEventListener("beforeunload",d)}return window.addEventListener("popstate",c),window.addEventListener("beforeunload",d,{passive:!0}),{pauseListeners:l,listen:h,destroy:p}}function fd(t,e,n,r=!1,s=!1){return{back:t,current:e,forward:n,replaced:r,position:window.history.length,scroll:s?ya():null}}function DT(t){const{history:e,location:n}=window,r={value:mm(t,n)},s={value:e.state};s.value||i(r.value,{back:null,current:r.value,forward:null,position:e.length-1,replaced:!0,scroll:null},!0);function i(l,h,d){const p=t.indexOf("#"),g=p>-1?(n.host&&document.querySelector("base")?t:t.slice(p))+l:CT()+t+l;try{e[d?"replaceState":"pushState"](h,"",g),s.value=h}catch(_){console.error(_),n[d?"replace":"assign"](g)}}function o(l,h){const d=De({},e.state,fd(s.value.back,l,s.value.forward,!0),h,{position:s.value.position});i(l,d,!0),r.value=l}function c(l,h){const d=De({},s.value,e.state,{forward:l,scroll:ya()});i(d.current,d,!0);const p=De({},fd(r.value,l,null),{position:d.position+1},h);i(l,p,!1),r.value=l}return{location:r,state:s,push:c,replace:o}}function VT(t){t=IT(t);const e=DT(t),n=kT(t,e.state,e.location,e.replace);function r(i,o=!0){o||n.pauseListeners(),history.go(i)}const s=De({location:"",base:t,go:r,createHref:AT.bind(null,t)},e,n);return Object.defineProperty(s,"location",{enumerable:!0,get:()=>e.location.value}),Object.defineProperty(s,"state",{enumerable:!0,get:()=>e.state.value}),s}function OT(t){return t=location.host?t||location.pathname+location.search:"",t.includes("#")||(t+="#"),VT(t)}function NT(t){return typeof t=="string"||t&&typeof t=="object"}function gm(t){return typeof t=="string"||typeof t=="symbol"}const _m=Symbol("");var pd;(function(t){t[t.aborted=4]="aborted",t[t.cancelled=8]="cancelled",t[t.duplicated=16]="duplicated"})(pd||(pd={}));function Es(t,e){return De(new Error,{type:t,[_m]:!0},e)}function Rn(t,e){return t instanceof Error&&_m in t&&(e==null||!!(t.type&e))}const md="[^/]+?",xT={sensitive:!1,strict:!1,start:!0,end:!0},MT=/[.+*?^${}()[\]/\\]/g;function LT(t,e){const n=De({},xT,e),r=[];let s=n.start?"^":"";const i=[];for(const h of t){const d=h.length?[]:[90];n.strict&&!h.length&&(s+="/");for(let p=0;p<h.length;p++){const g=h[p];let _=40+(n.sensitive?.25:0);if(g.type===0)p||(s+="/"),s+=g.value.replace(MT,"\\$&"),_+=40;else if(g.type===1){const{value:P,repeatable:k,optional:D,regexp:x}=g;i.push({name:P,repeatable:k,optional:D});const F=x||md;if(F!==md){_+=10;try{new RegExp(`(${F})`)}catch(q){throw new Error(`Invalid custom RegExp for param "${P}" (${F}): `+q.message)}}let $=k?`((?:${F})(?:/(?:${F}))*)`:`(${F})`;p||($=D&&h.length<2?`(?:/${$})`:"/"+$),D&&($+="?"),s+=$,_+=20,D&&(_+=-8),k&&(_+=-20),F===".*"&&(_+=-50)}d.push(_)}r.push(d)}if(n.strict&&n.end){const h=r.length-1;r[h][r[h].length-1]+=.7000000000000001}n.strict||(s+="/?"),n.end?s+="$":n.strict&&(s+="(?:/|$)");const o=new RegExp(s,n.sensitive?"":"i");function c(h){const d=h.match(o),p={};if(!d)return null;for(let g=1;g<d.length;g++){const _=d[g]||"",P=i[g-1];p[P.name]=_&&P.repeatable?_.split("/"):_}return p}function l(h){let d="",p=!1;for(const g of t){(!p||!d.endsWith("/"))&&(d+="/"),p=!1;for(const _ of g)if(_.type===0)d+=_.value;else if(_.type===1){const{value:P,repeatable:k,optional:D}=_,x=P in h?h[P]:"";if(rn(x)&&!k)throw new Error(`Provided param "${P}" is an array but it is not repeatable (* or + modifiers)`);const F=rn(x)?x.join("/"):x;if(!F)if(D)g.length<2&&(d.endsWith("/")?d=d.slice(0,-1):p=!0);else throw new Error(`Missing required param "${P}"`);d+=F}}return d||"/"}return{re:o,score:r,keys:i,parse:c,stringify:l}}function FT(t,e){let n=0;for(;n<t.length&&n<e.length;){const r=e[n]-t[n];if(r)return r;n++}return t.length<e.length?t.length===1&&t[0]===80?-1:1:t.length>e.length?e.length===1&&e[0]===80?1:-1:0}function ym(t,e){let n=0;const r=t.score,s=e.score;for(;n<r.length&&n<s.length;){const i=FT(r[n],s[n]);if(i)return i;n++}if(Math.abs(s.length-r.length)===1){if(gd(r))return 1;if(gd(s))return-1}return s.length-r.length}function gd(t){const e=t[t.length-1];return t.length>0&&e[e.length-1]<0}const UT={type:0,value:""},BT=/[a-zA-Z0-9_]/;function jT(t){if(!t)return[[]];if(t==="/")return[[UT]];if(!t.startsWith("/"))throw new Error(`Invalid path "${t}"`);function e(_){throw new Error(`ERR (${n})/"${h}": ${_}`)}let n=0,r=n;const s=[];let i;function o(){i&&s.push(i),i=[]}let c=0,l,h="",d="";function p(){h&&(n===0?i.push({type:0,value:h}):n===1||n===2||n===3?(i.length>1&&(l==="*"||l==="+")&&e(`A repeatable param (${h}) must be alone in its segment. eg: '/:ids+.`),i.push({type:1,value:h,regexp:d,repeatable:l==="*"||l==="+",optional:l==="*"||l==="?"})):e("Invalid state to consume buffer"),h="")}function g(){h+=l}for(;c<t.length;){if(l=t[c++],l==="\\"&&n!==2){r=n,n=4;continue}switch(n){case 0:l==="/"?(h&&p(),o()):l===":"?(p(),n=1):g();break;case 4:g(),n=r;break;case 1:l==="("?n=2:BT.test(l)?g():(p(),n=0,l!=="*"&&l!=="?"&&l!=="+"&&c--);break;case 2:l===")"?d[d.length-1]=="\\"?d=d.slice(0,-1)+l:n=3:d+=l;break;case 3:p(),n=0,l!=="*"&&l!=="?"&&l!=="+"&&c--,d="";break;default:e("Unknown state");break}}return n===2&&e(`Unfinished custom RegExp for param "${h}"`),p(),o(),s}function $T(t,e,n){const r=LT(jT(t.path),n),s=De(r,{record:t,parent:e,children:[],alias:[]});return e&&!s.record.aliasOf==!e.record.aliasOf&&e.children.push(s),s}function qT(t,e){const n=[],r=new Map;e=Ed({strict:!1,end:!0,sensitive:!1},e);function s(p){return r.get(p)}function i(p,g,_){const P=!_,k=yd(p);k.aliasOf=_&&_.record;const D=Ed(e,p),x=[k];if("alias"in p){const q=typeof p.alias=="string"?[p.alias]:p.alias;for(const ce of q)x.push(yd(De({},k,{components:_?_.record.components:k.components,path:ce,aliasOf:_?_.record:k})))}let F,$;for(const q of x){const{path:ce}=q;if(g&&ce[0]!=="/"){const le=g.record.path,w=le[le.length-1]==="/"?"":"/";q.path=g.record.path+(ce&&w+ce)}if(F=$T(q,g,D),_?_.alias.push(F):($=$||F,$!==F&&$.alias.push(F),P&&p.name&&!vd(F)&&o(p.name)),vm(F)&&l(F),k.children){const le=k.children;for(let w=0;w<le.length;w++)i(le[w],F,_&&_.children[w])}_=_||F}return $?()=>{o($)}:fi}function o(p){if(gm(p)){const g=r.get(p);g&&(r.delete(p),n.splice(n.indexOf(g),1),g.children.forEach(o),g.alias.forEach(o))}else{const g=n.indexOf(p);g>-1&&(n.splice(g,1),p.record.name&&r.delete(p.record.name),p.children.forEach(o),p.alias.forEach(o))}}function c(){return n}function l(p){const g=WT(p,n);n.splice(g,0,p),p.record.name&&!vd(p)&&r.set(p.record.name,p)}function h(p,g){let _,P={},k,D;if("name"in p&&p.name){if(_=r.get(p.name),!_)throw Es(1,{location:p});D=_.record.name,P=De(_d(g.params,_.keys.filter($=>!$.optional).concat(_.parent?_.parent.keys.filter($=>$.optional):[]).map($=>$.name)),p.params&&_d(p.params,_.keys.map($=>$.name))),k=_.stringify(P)}else if(p.path!=null)k=p.path,_=n.find($=>$.re.test(k)),_&&(P=_.parse(k),D=_.record.name);else{if(_=g.name?r.get(g.name):n.find($=>$.re.test(g.path)),!_)throw Es(1,{location:p,currentLocation:g});D=_.record.name,P=De({},g.params,p.params),k=_.stringify(P)}const x=[];let F=_;for(;F;)x.unshift(F.record),F=F.parent;return{name:D,path:k,params:P,matched:x,meta:zT(x)}}t.forEach(p=>i(p));function d(){n.length=0,r.clear()}return{addRoute:i,resolve:h,removeRoute:o,clearRoutes:d,getRoutes:c,getRecordMatcher:s}}function _d(t,e){const n={};for(const r of e)r in t&&(n[r]=t[r]);return n}function yd(t){const e={path:t.path,redirect:t.redirect,name:t.name,meta:t.meta||{},aliasOf:t.aliasOf,beforeEnter:t.beforeEnter,props:HT(t),children:t.children||[],instances:{},leaveGuards:new Set,updateGuards:new Set,enterCallbacks:{},components:"components"in t?t.components||null:t.component&&{default:t.component}};return Object.defineProperty(e,"mods",{value:{}}),e}function HT(t){const e={},n=t.props||!1;if("component"in t)e.default=n;else for(const r in t.components)e[r]=typeof n=="object"?n[r]:n;return e}function vd(t){for(;t;){if(t.record.aliasOf)return!0;t=t.parent}return!1}function zT(t){return t.reduce((e,n)=>De(e,n.meta),{})}function Ed(t,e){const n={};for(const r in t)n[r]=r in e?e[r]:t[r];return n}function WT(t,e){let n=0,r=e.length;for(;n!==r;){const i=n+r>>1;ym(t,e[i])<0?r=i:n=i+1}const s=KT(t);return s&&(r=e.lastIndexOf(s,r-1)),r}function KT(t){let e=t;for(;e=e.parent;)if(vm(e)&&ym(t,e)===0)return e}function vm({record:t}){return!!(t.name||t.components&&Object.keys(t.components).length||t.redirect)}function GT(t){const e={};if(t===""||t==="?")return e;const r=(t[0]==="?"?t.slice(1):t).split("&");for(let s=0;s<r.length;++s){const i=r[s].replace(um," "),o=i.indexOf("="),c=Ri(o<0?i:i.slice(0,o)),l=o<0?null:Ri(i.slice(o+1));if(c in e){let h=e[c];rn(h)||(h=e[c]=[h]),h.push(l)}else e[c]=l}return e}function Td(t){let e="";for(let n in t){const r=t[n];if(n=fT(n),r==null){r!==void 0&&(e+=(e.length?"&":"")+n);continue}(rn(r)?r.map(i=>i&&Gc(i)):[r&&Gc(r)]).forEach(i=>{i!==void 0&&(e+=(e.length?"&":"")+n,i!=null&&(e+="="+i))})}return e}function QT(t){const e={};for(const n in t){const r=t[n];r!==void 0&&(e[n]=rn(r)?r.map(s=>s==null?null:""+s):r==null?r:""+r)}return e}const YT=Symbol(""),Id=Symbol(""),va=Symbol(""),Hl=Symbol(""),Yc=Symbol("");function Zs(){let t=[];function e(r){return t.push(r),()=>{const s=t.indexOf(r);s>-1&&t.splice(s,1)}}function n(){t=[]}return{add:e,list:()=>t.slice(),reset:n}}function Qn(t,e,n,r,s,i=o=>o()){const o=r&&(r.enterCallbacks[s]=r.enterCallbacks[s]||[]);return()=>new Promise((c,l)=>{const h=g=>{g===!1?l(Es(4,{from:n,to:e})):g instanceof Error?l(g):NT(g)?l(Es(2,{from:e,to:g})):(o&&r.enterCallbacks[s]===o&&typeof g=="function"&&o.push(g),c())},d=i(()=>t.call(r&&r.instances[s],e,n,h));let p=Promise.resolve(d);t.length<3&&(p=p.then(h)),p.catch(g=>l(g))})}function Ic(t,e,n,r,s=i=>i()){const i=[];for(const o of t)for(const c in o.components){let l=o.components[c];if(!(e!=="beforeRouteEnter"&&!o.instances[c]))if(cm(l)){const d=(l.__vccOpts||l)[e];d&&i.push(Qn(d,n,r,o,c,s))}else{let h=l();i.push(()=>h.then(d=>{if(!d)throw new Error(`Couldn't resolve component "${c}" at "${o.path}"`);const p=nT(d)?d.default:d;o.mods[c]=d,o.components[c]=p;const _=(p.__vccOpts||p)[e];return _&&Qn(_,n,r,o,c,s)()}))}}return i}function wd(t){const e=Ne(va),n=Ne(Hl),r=Yt(()=>{const l=Vr(t.to);return e.resolve(l)}),s=Yt(()=>{const{matched:l}=r.value,{length:h}=l,d=l[h-1],p=n.matched;if(!d||!p.length)return-1;const g=p.findIndex(vs.bind(null,d));if(g>-1)return g;const _=Ad(l[h-2]);return h>1&&Ad(d)===_&&p[p.length-1].path!==_?p.findIndex(vs.bind(null,l[h-2])):g}),i=Yt(()=>s.value>-1&&eI(n.params,r.value.params)),o=Yt(()=>s.value>-1&&s.value===n.matched.length-1&&pm(n.params,r.value.params));function c(l={}){return ZT(l)?e[Vr(t.replace)?"replace":"push"](Vr(t.to)).catch(fi):Promise.resolve()}return{route:r,href:Yt(()=>r.value.href),isActive:i,isExactActive:o,navigate:c}}const JT=Ll({name:"RouterLink",compatConfig:{MODE:3},props:{to:{type:[String,Object],required:!0},replace:Boolean,activeClass:String,exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,default:"page"}},useLink:wd,setup(t,{slots:e}){const n=fa(wd(t)),{options:r}=Ne(va),s=Yt(()=>({[bd(t.activeClass,r.linkActiveClass,"router-link-active")]:n.isActive,[bd(t.exactActiveClass,r.linkExactActiveClass,"router-link-exact-active")]:n.isExactActive}));return()=>{const i=e.default&&e.default(n);return t.custom?i:$l("a",{"aria-current":n.isExactActive?t.ariaCurrentValue:null,href:n.href,onClick:n.navigate,class:s.value},i)}}}),XT=JT;function ZT(t){if(!(t.metaKey||t.altKey||t.ctrlKey||t.shiftKey)&&!t.defaultPrevented&&!(t.button!==void 0&&t.button!==0)){if(t.currentTarget&&t.currentTarget.getAttribute){const e=t.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(e))return}return t.preventDefault&&t.preventDefault(),!0}}function eI(t,e){for(const n in e){const r=e[n],s=t[n];if(typeof r=="string"){if(r!==s)return!1}else if(!rn(s)||s.length!==r.length||r.some((i,o)=>i!==s[o]))return!1}return!0}function Ad(t){return t?t.aliasOf?t.aliasOf.path:t.path:""}const bd=(t,e,n)=>t??e??n,tI=Ll({name:"RouterView",inheritAttrs:!1,props:{name:{type:String,default:"default"},route:Object},compatConfig:{MODE:3},setup(t,{attrs:e,slots:n}){const r=Ne(Yc),s=Yt(()=>t.route||r.value),i=Ne(Id,0),o=Yt(()=>{let h=Vr(i);const{matched:d}=s.value;let p;for(;(p=d[h])&&!p.components;)h++;return h}),c=Yt(()=>s.value.matched[o.value]);Or(Id,Yt(()=>o.value+1)),Or(YT,c),Or(Yc,s);const l=pe();return tt(()=>[l.value,c.value,t.name],([h,d,p],[g,_,P])=>{d&&(d.instances[p]=h,_&&_!==d&&h&&h===g&&(d.leaveGuards.size||(d.leaveGuards=_.leaveGuards),d.updateGuards.size||(d.updateGuards=_.updateGuards))),h&&d&&(!_||!vs(d,_)||!g)&&(d.enterCallbacks[p]||[]).forEach(k=>k(h))},{flush:"post"}),()=>{const h=s.value,d=t.name,p=c.value,g=p&&p.components[d];if(!g)return Rd(n.default,{Component:g,route:h});const _=p.props[d],P=_?_===!0?h.params:typeof _=="function"?_(h):_:null,D=$l(g,De({},P,e,{onVnodeUnmounted:x=>{x.component.isUnmounted&&(p.instances[d]=null)},ref:l}));return Rd(n.default,{Component:D,route:h})||D}}});function Rd(t,e){if(!t)return null;const n=t(e);return n.length===1?n[0]:n}const Em=tI;function nI(t){const e=qT(t.routes,t),n=t.parseQuery||GT,r=t.stringifyQuery||Td,s=t.history,i=Zs(),o=Zs(),c=Zs(),l=dv(zn);let h=zn;rs&&t.scrollBehavior&&"scrollRestoration"in history&&(history.scrollRestoration="manual");const d=Ec.bind(null,N=>""+N),p=Ec.bind(null,mT),g=Ec.bind(null,Ri);function _(N,J){let Q,ee;return gm(N)?(Q=e.getRecordMatcher(N),ee=J):ee=N,e.addRoute(ee,Q)}function P(N){const J=e.getRecordMatcher(N);J&&e.removeRoute(J)}function k(){return e.getRoutes().map(N=>N.record)}function D(N){return!!e.getRecordMatcher(N)}function x(N,J){if(J=De({},J||l.value),typeof N=="string"){const E=Tc(n,N,J.path),C=e.resolve({path:E.path},J),U=s.createHref(E.fullPath);return De(E,C,{params:g(C.params),hash:Ri(E.hash),redirectedFrom:void 0,href:U})}let Q;if(N.path!=null)Q=De({},N,{path:Tc(n,N.path,J.path).path});else{const E=De({},N.params);for(const C in E)E[C]==null&&delete E[C];Q=De({},N,{params:p(E)}),J.params=p(J.params)}const ee=e.resolve(Q,J),Ee=N.hash||"";ee.params=d(g(ee.params));const Ve=yT(r,De({},N,{hash:dT(Ee),path:ee.path})),y=s.createHref(Ve);return De({fullPath:Ve,hash:Ee,query:r===Td?QT(N.query):N.query||{}},ee,{redirectedFrom:void 0,href:y})}function F(N){return typeof N=="string"?Tc(n,N,l.value.path):De({},N)}function $(N,J){if(h!==N)return Es(8,{from:J,to:N})}function q(N){return w(N)}function ce(N){return q(De(F(N),{replace:!0}))}function le(N){const J=N.matched[N.matched.length-1];if(J&&J.redirect){const{redirect:Q}=J;let ee=typeof Q=="function"?Q(N):Q;return typeof ee=="string"&&(ee=ee.includes("?")||ee.includes("#")?ee=F(ee):{path:ee},ee.params={}),De({query:N.query,hash:N.hash,params:ee.path!=null?{}:N.params},ee)}}function w(N,J){const Q=h=x(N),ee=l.value,Ee=N.state,Ve=N.force,y=N.replace===!0,E=le(Q);if(E)return w(De(F(E),{state:typeof E=="object"?De({},Ee,E.state):Ee,force:Ve,replace:y}),J||Q);const C=Q;C.redirectedFrom=J;let U;return!Ve&&vT(r,ee,Q)&&(U=Es(16,{to:C,from:ee}),jt(ee,ee,!0,!1)),(U?Promise.resolve(U):A(C,ee)).catch(O=>Rn(O)?Rn(O,2)?O:Kt(O):ge(O,C,ee)).then(O=>{if(O){if(Rn(O,2))return w(De({replace:y},F(O.to),{state:typeof O.to=="object"?De({},Ee,O.to.state):Ee,force:Ve}),J||C)}else O=R(C,ee,!0,y,Ee);return b(C,ee,O),O})}function v(N,J){const Q=$(N,J);return Q?Promise.reject(Q):Promise.resolve()}function I(N){const J=Bn.values().next().value;return J&&typeof J.runWithContext=="function"?J.runWithContext(N):N()}function A(N,J){let Q;const[ee,Ee,Ve]=rI(N,J);Q=Ic(ee.reverse(),"beforeRouteLeave",N,J);for(const E of ee)E.leaveGuards.forEach(C=>{Q.push(Qn(C,N,J))});const y=v.bind(null,N,J);return Q.push(y),St(Q).then(()=>{Q=[];for(const E of i.list())Q.push(Qn(E,N,J));return Q.push(y),St(Q)}).then(()=>{Q=Ic(Ee,"beforeRouteUpdate",N,J);for(const E of Ee)E.updateGuards.forEach(C=>{Q.push(Qn(C,N,J))});return Q.push(y),St(Q)}).then(()=>{Q=[];for(const E of Ve)if(E.beforeEnter)if(rn(E.beforeEnter))for(const C of E.beforeEnter)Q.push(Qn(C,N,J));else Q.push(Qn(E.beforeEnter,N,J));return Q.push(y),St(Q)}).then(()=>(N.matched.forEach(E=>E.enterCallbacks={}),Q=Ic(Ve,"beforeRouteEnter",N,J,I),Q.push(y),St(Q))).then(()=>{Q=[];for(const E of o.list())Q.push(Qn(E,N,J));return Q.push(y),St(Q)}).catch(E=>Rn(E,8)?E:Promise.reject(E))}function b(N,J,Q){c.list().forEach(ee=>I(()=>ee(N,J,Q)))}function R(N,J,Q,ee,Ee){const Ve=$(N,J);if(Ve)return Ve;const y=J===zn,E=rs?history.state:{};Q&&(ee||y?s.replace(N.fullPath,De({scroll:y&&E&&E.scroll},Ee)):s.push(N.fullPath,Ee)),l.value=N,jt(N,J,Q,y),Kt()}let T;function Tt(){T||(T=s.listen((N,J,Q)=>{if(!ln.listening)return;const ee=x(N),Ee=le(ee);if(Ee){w(De(Ee,{replace:!0}),ee).catch(fi);return}h=ee;const Ve=l.value;rs&&ST(dd(Ve.fullPath,Q.delta),ya()),A(ee,Ve).catch(y=>Rn(y,12)?y:Rn(y,2)?(w(y.to,ee).then(E=>{Rn(E,20)&&!Q.delta&&Q.type===Si.pop&&s.go(-1,!1)}).catch(fi),Promise.reject()):(Q.delta&&s.go(-Q.delta,!1),ge(y,ee,Ve))).then(y=>{y=y||R(ee,Ve,!1),y&&(Q.delta&&!Rn(y,8)?s.go(-Q.delta,!1):Q.type===Si.pop&&Rn(y,20)&&s.go(-1,!1)),b(ee,Ve,y)}).catch(fi)}))}let Bt=Zs(),Ge=Zs(),ve;function ge(N,J,Q){Kt(N);const ee=Ge.list();return ee.length?ee.forEach(Ee=>Ee(N,J,Q)):console.error(N),Promise.reject(N)}function Vt(){return ve&&l.value!==zn?Promise.resolve():new Promise((N,J)=>{Bt.add([N,J])})}function Kt(N){return ve||(ve=!N,Tt(),Bt.list().forEach(([J,Q])=>N?Q(N):J()),Bt.reset()),N}function jt(N,J,Q,ee){const{scrollBehavior:Ee}=t;if(!rs||!Ee)return Promise.resolve();const Ve=!Q&&PT(dd(N.fullPath,0))||(ee||!Q)&&history.state&&history.state.scroll||null;return Cp().then(()=>Ee(N,J,Ve)).then(y=>y&&RT(y)).catch(y=>ge(y,N,J))}const Be=N=>s.go(N);let je;const Bn=new Set,ln={currentRoute:l,listening:!0,addRoute:_,removeRoute:P,clearRoutes:e.clearRoutes,hasRoute:D,getRoutes:k,resolve:x,options:t,push:q,replace:ce,go:Be,back:()=>Be(-1),forward:()=>Be(1),beforeEach:i.add,beforeResolve:o.add,afterEach:c.add,onError:Ge.add,isReady:Vt,install(N){const J=this;N.component("RouterLink",XT),N.component("RouterView",Em),N.config.globalProperties.$router=J,Object.defineProperty(N.config.globalProperties,"$route",{enumerable:!0,get:()=>Vr(l)}),rs&&!je&&l.value===zn&&(je=!0,q(s.location).catch(Ee=>{}));const Q={};for(const Ee in zn)Object.defineProperty(Q,Ee,{get:()=>l.value[Ee],enumerable:!0});N.provide(va,J),N.provide(Hl,Ap(Q)),N.provide(Yc,l);const ee=N.unmount;Bn.add(N),N.unmount=function(){Bn.delete(N),Bn.size<1&&(h=zn,T&&T(),T=null,l.value=zn,je=!1,ve=!1),ee()}}};function St(N){return N.reduce((J,Q)=>J.then(()=>I(Q)),Promise.resolve())}return ln}function rI(t,e){const n=[],r=[],s=[],i=Math.max(e.matched.length,t.matched.length);for(let o=0;o<i;o++){const c=e.matched[o];c&&(t.matched.find(h=>vs(h,c))?r.push(c):n.push(c));const l=t.matched[o];l&&(e.matched.find(h=>vs(h,l))||s.push(l))}return[n,r,s]}function qr(){return Ne(va)}function Ea(t){return Ne(Hl)}const $e={requiredEmail:"Preencha o campo de e-mail",requiredPassword:"Preencha o campo de senha","auth/invalid-credential":"Email ou senha inválidos","auth/too-many-requests":"Muitas tentativas. Tente novamente mais tarde",topicExists:"Esse tópico já existe",requiredLink:"Preencha o link",invalidLink:"Inicie o link com http:// ou https://",requiredTitle:"Preencha o título",requiredDescription:"Preencha a descrição",topicNotFound:"Esse tópico não existe",loadTopicError:"Erro ao carregar tópico. Recarregue a página",deleteContentError:"Erro ao deletar conteúdo. Recarregue a página",deleteTopicError:"Erro ao deletar tópico. Recarregue a página",logoutError:"Erro ao deslogar, se o erro persistir, recarregue a página",fetchTopicsError:"Erro ao carregar tópicos",generalError:"Erro desconhecido"};var Sd={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tm=function(t){const e=[];let n=0;for(let r=0;r<t.length;r++){let s=t.charCodeAt(r);s<128?e[n++]=s:s<2048?(e[n++]=s>>6|192,e[n++]=s&63|128):(s&64512)===55296&&r+1<t.length&&(t.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(t.charCodeAt(++r)&1023),e[n++]=s>>18|240,e[n++]=s>>12&63|128,e[n++]=s>>6&63|128,e[n++]=s&63|128):(e[n++]=s>>12|224,e[n++]=s>>6&63|128,e[n++]=s&63|128)}return e},sI=function(t){const e=[];let n=0,r=0;for(;n<t.length;){const s=t[n++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){const i=t[n++];e[r++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=t[n++],o=t[n++],c=t[n++],l=((s&7)<<18|(i&63)<<12|(o&63)<<6|c&63)-65536;e[r++]=String.fromCharCode(55296+(l>>10)),e[r++]=String.fromCharCode(56320+(l&1023))}else{const i=t[n++],o=t[n++];e[r++]=String.fromCharCode((s&15)<<12|(i&63)<<6|o&63)}}return e.join("")},Im={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<t.length;s+=3){const i=t[s],o=s+1<t.length,c=o?t[s+1]:0,l=s+2<t.length,h=l?t[s+2]:0,d=i>>2,p=(i&3)<<4|c>>4;let g=(c&15)<<2|h>>6,_=h&63;l||(_=64,o||(g=64)),r.push(n[d],n[p],n[g],n[_])}return r.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(Tm(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):sI(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<t.length;){const i=n[t.charAt(s++)],c=s<t.length?n[t.charAt(s)]:0;++s;const h=s<t.length?n[t.charAt(s)]:64;++s;const p=s<t.length?n[t.charAt(s)]:64;if(++s,i==null||c==null||h==null||p==null)throw new iI;const g=i<<2|c>>4;if(r.push(g),h!==64){const _=c<<4&240|h>>2;if(r.push(_),p!==64){const P=h<<6&192|p;r.push(P)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class iI extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const oI=function(t){const e=Tm(t);return Im.encodeByteArray(e,!0)},$o=function(t){return oI(t).replace(/\./g,"")},wm=function(t){try{return Im.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function aI(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cI=()=>aI().__FIREBASE_DEFAULTS__,lI=()=>{if(typeof process>"u"||typeof Sd>"u")return;const t=Sd.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},uI=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&wm(t[1]);return e&&JSON.parse(e)},Ta=()=>{try{return cI()||lI()||uI()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},Am=t=>{var e,n;return(n=(e=Ta())===null||e===void 0?void 0:e.emulatorHosts)===null||n===void 0?void 0:n[t]},hI=t=>{const e=Am(t);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(n+1),10);return e[0]==="["?[e.substring(1,n-1),r]:[e.substring(0,n),r]},bm=()=>{var t;return(t=Ta())===null||t===void 0?void 0:t.config},Rm=t=>{var e;return(e=Ta())===null||e===void 0?void 0:e[`_${t}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dI{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,r)=>{n?this.reject(n):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,r))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fI(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},r=e||"demo-project",s=t.iat||0,i=t.sub||t.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}}},t);return[$o(JSON.stringify(n)),$o(JSON.stringify(o)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Et(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function pI(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Et())}function mI(){var t;const e=(t=Ta())===null||t===void 0?void 0:t.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function gI(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function Sm(){const t=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof t=="object"&&t.id!==void 0}function _I(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function yI(){const t=Et();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}function vI(){return!mI()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function Pm(){try{return typeof indexedDB=="object"}catch{return!1}}function Cm(){return new Promise((t,e)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),n||self.indexedDB.deleteDatabase(r),t(!0)},s.onupgradeneeded=()=>{n=!1},s.onerror=()=>{var i;e(((i=s.error)===null||i===void 0?void 0:i.message)||"")}}catch(n){e(n)}})}function EI(){return!(typeof navigator>"u"||!navigator.cookieEnabled)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const TI="FirebaseError";class cn extends Error{constructor(e,n,r){super(n),this.code=e,this.customData=r,this.name=TI,Object.setPrototypeOf(this,cn.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Hr.prototype.create)}}class Hr{constructor(e,n,r){this.service=e,this.serviceName=n,this.errors=r}create(e,...n){const r=n[0]||{},s=`${this.service}/${e}`,i=this.errors[e],o=i?II(i,r):"Error",c=`${this.serviceName}: ${o} (${s}).`;return new cn(s,c,r)}}function II(t,e){return t.replace(wI,(n,r)=>{const s=e[r];return s!=null?String(s):`<${r}?>`})}const wI=/\{\$([^}]+)}/g;function AI(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function Pi(t,e){if(t===e)return!0;const n=Object.keys(t),r=Object.keys(e);for(const s of n){if(!r.includes(s))return!1;const i=t[s],o=e[s];if(Pd(i)&&Pd(o)){if(!Pi(i,o))return!1}else if(i!==o)return!1}for(const s of r)if(!n.includes(s))return!1;return!0}function Pd(t){return t!==null&&typeof t=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ji(t){const e=[];for(const[n,r]of Object.entries(t))Array.isArray(r)?r.forEach(s=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function ti(t){const e={};return t.replace(/^\?/,"").split("&").forEach(r=>{if(r){const[s,i]=r.split("=");e[decodeURIComponent(s)]=decodeURIComponent(i)}}),e}function ni(t){const e=t.indexOf("?");if(!e)return"";const n=t.indexOf("#",e);return t.substring(e,n>0?n:void 0)}function bI(t,e){const n=new RI(t,e);return n.subscribe.bind(n)}class RI{constructor(e,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(n=>{n.next(e)})}error(e){this.forEachObserver(n=>{n.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,n,r){let s;if(e===void 0&&n===void 0&&r===void 0)throw new Error("Missing Observer.");SI(e,["next","error","complete"])?s=e:s={next:e,error:n,complete:r},s.next===void 0&&(s.next=wc),s.error===void 0&&(s.error=wc),s.complete===void 0&&(s.complete=wc);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,e)}sendOne(e,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{n(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function SI(t,e){if(typeof t!="object"||t===null)return!1;for(const n of e)if(n in t&&typeof t[n]=="function")return!0;return!1}function wc(){}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const PI=1e3,CI=2,kI=4*60*60*1e3,DI=.5;function Cd(t,e=PI,n=CI){const r=e*Math.pow(n,t),s=Math.round(DI*r*(Math.random()-.5)*2);return Math.min(kI,r+s)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ke(t){return t&&t._delegate?t._delegate:t}class sn{constructor(e,n,r){this.name=e,this.instanceFactory=n,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pr="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class VI{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const r=new dI;if(this.instancesDeferred.set(n,r),this.isInitialized(n)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:n});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){var n;const r=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),s=(n=e==null?void 0:e.optional)!==null&&n!==void 0?n:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(i){if(s)return null;throw i}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(NI(e))try{this.getOrInitializeService({instanceIdentifier:Pr})}catch{}for(const[n,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(n);try{const i=this.getOrInitializeService({instanceIdentifier:s});r.resolve(i)}catch{}}}}clearInstance(e=Pr){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Pr){return this.instances.has(e)}getOptions(e=Pr){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:n});for(const[i,o]of this.instancesDeferred.entries()){const c=this.normalizeInstanceIdentifier(i);r===c&&o.resolve(s)}return s}onInit(e,n){var r;const s=this.normalizeInstanceIdentifier(n),i=(r=this.onInitCallbacks.get(s))!==null&&r!==void 0?r:new Set;i.add(e),this.onInitCallbacks.set(s,i);const o=this.instances.get(s);return o&&e(o,s),()=>{i.delete(e)}}invokeOnInitCallbacks(e,n){const r=this.onInitCallbacks.get(n);if(r)for(const s of r)try{s(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:OI(e),options:n}),this.instances.set(e,r),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=Pr){return this.component?this.component.multipleInstances?e:Pr:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function OI(t){return t===Pr?void 0:t}function NI(t){return t.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xI{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new VI(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var _e;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(_e||(_e={}));const MI={debug:_e.DEBUG,verbose:_e.VERBOSE,info:_e.INFO,warn:_e.WARN,error:_e.ERROR,silent:_e.SILENT},LI=_e.INFO,FI={[_e.DEBUG]:"log",[_e.VERBOSE]:"log",[_e.INFO]:"info",[_e.WARN]:"warn",[_e.ERROR]:"error"},UI=(t,e,...n)=>{if(e<t.logLevel)return;const r=new Date().toISOString(),s=FI[e];if(s)console[s](`[${r}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Ia{constructor(e){this.name=e,this._logLevel=LI,this._logHandler=UI,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in _e))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?MI[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,_e.DEBUG,...e),this._logHandler(this,_e.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,_e.VERBOSE,...e),this._logHandler(this,_e.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,_e.INFO,...e),this._logHandler(this,_e.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,_e.WARN,...e),this._logHandler(this,_e.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,_e.ERROR,...e),this._logHandler(this,_e.ERROR,...e)}}const BI=(t,e)=>e.some(n=>t instanceof n);let kd,Dd;function jI(){return kd||(kd=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function $I(){return Dd||(Dd=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const km=new WeakMap,Jc=new WeakMap,Dm=new WeakMap,Ac=new WeakMap,zl=new WeakMap;function qI(t){const e=new Promise((n,r)=>{const s=()=>{t.removeEventListener("success",i),t.removeEventListener("error",o)},i=()=>{n(sr(t.result)),s()},o=()=>{r(t.error),s()};t.addEventListener("success",i),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&km.set(n,t)}).catch(()=>{}),zl.set(e,t),e}function HI(t){if(Jc.has(t))return;const e=new Promise((n,r)=>{const s=()=>{t.removeEventListener("complete",i),t.removeEventListener("error",o),t.removeEventListener("abort",o)},i=()=>{n(),s()},o=()=>{r(t.error||new DOMException("AbortError","AbortError")),s()};t.addEventListener("complete",i),t.addEventListener("error",o),t.addEventListener("abort",o)});Jc.set(t,e)}let Xc={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return Jc.get(t);if(e==="objectStoreNames")return t.objectStoreNames||Dm.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return sr(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function zI(t){Xc=t(Xc)}function WI(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const r=t.call(bc(this),e,...n);return Dm.set(r,e.sort?e.sort():[e]),sr(r)}:$I().includes(t)?function(...e){return t.apply(bc(this),e),sr(km.get(this))}:function(...e){return sr(t.apply(bc(this),e))}}function KI(t){return typeof t=="function"?WI(t):(t instanceof IDBTransaction&&HI(t),BI(t,jI())?new Proxy(t,Xc):t)}function sr(t){if(t instanceof IDBRequest)return qI(t);if(Ac.has(t))return Ac.get(t);const e=KI(t);return e!==t&&(Ac.set(t,e),zl.set(e,t)),e}const bc=t=>zl.get(t);function Vm(t,e,{blocked:n,upgrade:r,blocking:s,terminated:i}={}){const o=indexedDB.open(t,e),c=sr(o);return r&&o.addEventListener("upgradeneeded",l=>{r(sr(o.result),l.oldVersion,l.newVersion,sr(o.transaction),l)}),n&&o.addEventListener("blocked",l=>n(l.oldVersion,l.newVersion,l)),c.then(l=>{i&&l.addEventListener("close",()=>i()),s&&l.addEventListener("versionchange",h=>s(h.oldVersion,h.newVersion,h))}).catch(()=>{}),c}const GI=["get","getKey","getAll","getAllKeys","count"],QI=["put","add","delete","clear"],Rc=new Map;function Vd(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(Rc.get(e))return Rc.get(e);const n=e.replace(/FromIndex$/,""),r=e!==n,s=QI.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(s||GI.includes(n)))return;const i=async function(o,...c){const l=this.transaction(o,s?"readwrite":"readonly");let h=l.store;return r&&(h=h.index(c.shift())),(await Promise.all([h[n](...c),s&&l.done]))[0]};return Rc.set(e,i),i}zI(t=>({...t,get:(e,n,r)=>Vd(e,n)||t.get(e,n,r),has:(e,n)=>!!Vd(e,n)||t.has(e,n)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class YI{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(JI(n)){const r=n.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(n=>n).join(" ")}}function JI(t){const e=t.getComponent();return(e==null?void 0:e.type)==="VERSION"}const Zc="@firebase/app",Od="0.10.15";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nn=new Ia("@firebase/app"),XI="@firebase/app-compat",ZI="@firebase/analytics-compat",ew="@firebase/analytics",tw="@firebase/app-check-compat",nw="@firebase/app-check",rw="@firebase/auth",sw="@firebase/auth-compat",iw="@firebase/database",ow="@firebase/data-connect",aw="@firebase/database-compat",cw="@firebase/functions",lw="@firebase/functions-compat",uw="@firebase/installations",hw="@firebase/installations-compat",dw="@firebase/messaging",fw="@firebase/messaging-compat",pw="@firebase/performance",mw="@firebase/performance-compat",gw="@firebase/remote-config",_w="@firebase/remote-config-compat",yw="@firebase/storage",vw="@firebase/storage-compat",Ew="@firebase/firestore",Tw="@firebase/vertexai",Iw="@firebase/firestore-compat",ww="firebase",Aw="11.0.1";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const el="[DEFAULT]",bw={[Zc]:"fire-core",[XI]:"fire-core-compat",[ew]:"fire-analytics",[ZI]:"fire-analytics-compat",[nw]:"fire-app-check",[tw]:"fire-app-check-compat",[rw]:"fire-auth",[sw]:"fire-auth-compat",[iw]:"fire-rtdb",[ow]:"fire-data-connect",[aw]:"fire-rtdb-compat",[cw]:"fire-fn",[lw]:"fire-fn-compat",[uw]:"fire-iid",[hw]:"fire-iid-compat",[dw]:"fire-fcm",[fw]:"fire-fcm-compat",[pw]:"fire-perf",[mw]:"fire-perf-compat",[gw]:"fire-rc",[_w]:"fire-rc-compat",[yw]:"fire-gcs",[vw]:"fire-gcs-compat",[Ew]:"fire-fst",[Iw]:"fire-fst-compat",[Tw]:"fire-vertex","fire-js":"fire-js",[ww]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qo=new Map,Rw=new Map,tl=new Map;function Nd(t,e){try{t.container.addComponent(e)}catch(n){Nn.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function En(t){const e=t.name;if(tl.has(e))return Nn.debug(`There were multiple attempts to register component ${e}.`),!1;tl.set(e,t);for(const n of qo.values())Nd(n,t);for(const n of Rw.values())Nd(n,t);return!0}function zr(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}function Cn(t){return t.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sw={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},ir=new Hr("app","Firebase",Sw);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pw{constructor(e,n,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},n),this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new sn("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw ir.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ds=Aw;function Om(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const r=Object.assign({name:el,automaticDataCollectionEnabled:!1},e),s=r.name;if(typeof s!="string"||!s)throw ir.create("bad-app-name",{appName:String(s)});if(n||(n=bm()),!n)throw ir.create("no-options");const i=qo.get(s);if(i){if(Pi(n,i.options)&&Pi(r,i.config))return i;throw ir.create("duplicate-app",{appName:s})}const o=new xI(s);for(const l of tl.values())o.addComponent(l);const c=new Pw(n,r,o);return qo.set(s,c),c}function Wl(t=el){const e=qo.get(t);if(!e&&t===el&&bm())return Om();if(!e)throw ir.create("no-app",{appName:t});return e}function Ht(t,e,n){var r;let s=(r=bw[t])!==null&&r!==void 0?r:t;n&&(s+=`-${n}`);const i=s.match(/\s|\//),o=e.match(/\s|\//);if(i||o){const c=[`Unable to register library "${s}" with version "${e}":`];i&&c.push(`library name "${s}" contains illegal characters (whitespace or "/")`),i&&o&&c.push("and"),o&&c.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Nn.warn(c.join(" "));return}En(new sn(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Cw="firebase-heartbeat-database",kw=1,Ci="firebase-heartbeat-store";let Sc=null;function Nm(){return Sc||(Sc=Vm(Cw,kw,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(Ci)}catch(n){console.warn(n)}}}}).catch(t=>{throw ir.create("idb-open",{originalErrorMessage:t.message})})),Sc}async function Dw(t){try{const n=(await Nm()).transaction(Ci),r=await n.objectStore(Ci).get(xm(t));return await n.done,r}catch(e){if(e instanceof cn)Nn.warn(e.message);else{const n=ir.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});Nn.warn(n.message)}}}async function xd(t,e){try{const r=(await Nm()).transaction(Ci,"readwrite");await r.objectStore(Ci).put(e,xm(t)),await r.done}catch(n){if(n instanceof cn)Nn.warn(n.message);else{const r=ir.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});Nn.warn(r.message)}}}function xm(t){return`${t.name}!${t.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vw=1024,Ow=30*24*60*60*1e3;class Nw{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new Mw(n),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,n;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=Md();return((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((n=this._heartbeatsCache)===null||n===void 0?void 0:n.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(o=>o.date===i)?void 0:(this._heartbeatsCache.heartbeats.push({date:i,agent:s}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(o=>{const c=new Date(o.date).valueOf();return Date.now()-c<=Ow}),this._storage.overwrite(this._heartbeatsCache))}catch(r){Nn.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const n=Md(),{heartbeatsToSend:r,unsentEntries:s}=xw(this._heartbeatsCache.heartbeats),i=$o(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=n,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(n){return Nn.warn(n),""}}}function Md(){return new Date().toISOString().substring(0,10)}function xw(t,e=Vw){const n=[];let r=t.slice();for(const s of t){const i=n.find(o=>o.agent===s.agent);if(i){if(i.dates.push(s.date),Ld(n)>e){i.dates.pop();break}}else if(n.push({agent:s.agent,dates:[s.date]}),Ld(n)>e){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}class Mw{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Pm()?Cm().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await Dw(this.app);return n!=null&&n.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var n;if(await this._canUseIndexedDBPromise){const s=await this.read();return xd(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var n;if(await this._canUseIndexedDBPromise){const s=await this.read();return xd(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function Ld(t){return $o(JSON.stringify({version:2,heartbeats:t})).length}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Lw(t){En(new sn("platform-logger",e=>new YI(e),"PRIVATE")),En(new sn("heartbeat",e=>new Nw(e),"PRIVATE")),Ht(Zc,Od,t),Ht(Zc,Od,"esm2017"),Ht("fire-js","")}Lw("");function Kl(t,e){var n={};for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&e.indexOf(r)<0&&(n[r]=t[r]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,r=Object.getOwnPropertySymbols(t);s<r.length;s++)e.indexOf(r[s])<0&&Object.prototype.propertyIsEnumerable.call(t,r[s])&&(n[r[s]]=t[r[s]]);return n}function Mm(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const Fw=Mm,Lm=new Hr("auth","Firebase",Mm());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ho=new Ia("@firebase/auth");function Uw(t,...e){Ho.logLevel<=_e.WARN&&Ho.warn(`Auth (${Ds}): ${t}`,...e)}function Ao(t,...e){Ho.logLevel<=_e.ERROR&&Ho.error(`Auth (${Ds}): ${t}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function on(t,...e){throw Gl(t,...e)}function mn(t,...e){return Gl(t,...e)}function Fm(t,e,n){const r=Object.assign(Object.assign({},Fw()),{[e]:n});return new Hr("auth","Firebase",r).create(e,{appName:t.name})}function or(t){return Fm(t,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Gl(t,...e){if(typeof t!="string"){const n=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=t.name),t._errorFactory.create(n,...r)}return Lm.create(t,...e)}function oe(t,e,...n){if(!t)throw Gl(e,...n)}function kn(t){const e="INTERNAL ASSERTION FAILED: "+t;throw Ao(e),new Error(e)}function xn(t,e){t||kn(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nl(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.href)||""}function Bw(){return Fd()==="http:"||Fd()==="https:"}function Fd(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jw(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(Bw()||Sm()||"connection"in navigator)?navigator.onLine:!0}function $w(){if(typeof navigator>"u")return null;const t=navigator;return t.languages&&t.languages[0]||t.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $i{constructor(e,n){this.shortDelay=e,this.longDelay=n,xn(n>e,"Short delay should be less than long delay!"),this.isMobile=pI()||_I()}get(){return jw()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ql(t,e){xn(t.emulator,"Emulator should always be set here");const{url:n}=t.emulator;return e?`${n}${e.startsWith("/")?e.slice(1):e}`:n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Um{static initialize(e,n,r){this.fetchImpl=e,n&&(this.headersImpl=n),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;kn("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;kn("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;kn("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qw={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hw=new $i(3e4,6e4);function _r(t,e){return t.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:t.tenantId}):e}async function Un(t,e,n,r,s={}){return Bm(t,s,async()=>{let i={},o={};r&&(e==="GET"?o=r:i={body:JSON.stringify(r)});const c=ji(Object.assign({key:t.config.apiKey},o)).slice(1),l=await t._getAdditionalHeaders();l["Content-Type"]="application/json",t.languageCode&&(l["X-Firebase-Locale"]=t.languageCode);const h=Object.assign({method:e,headers:l},i);return gI()||(h.referrerPolicy="no-referrer"),Um.fetch()(jm(t,t.config.apiHost,n,c),h)})}async function Bm(t,e,n){t._canInitEmulator=!1;const r=Object.assign(Object.assign({},qw),e);try{const s=new Ww(t),i=await Promise.race([n(),s.promise]);s.clearNetworkTimeout();const o=await i.json();if("needConfirmation"in o)throw go(t,"account-exists-with-different-credential",o);if(i.ok&&!("errorMessage"in o))return o;{const c=i.ok?o.errorMessage:o.error.message,[l,h]=c.split(" : ");if(l==="FEDERATED_USER_ID_ALREADY_LINKED")throw go(t,"credential-already-in-use",o);if(l==="EMAIL_EXISTS")throw go(t,"email-already-in-use",o);if(l==="USER_DISABLED")throw go(t,"user-disabled",o);const d=r[l]||l.toLowerCase().replace(/[_\s]+/g,"-");if(h)throw Fm(t,d,h);on(t,d)}}catch(s){if(s instanceof cn)throw s;on(t,"network-request-failed",{message:String(s)})}}async function wa(t,e,n,r,s={}){const i=await Un(t,e,n,r,s);return"mfaPendingCredential"in i&&on(t,"multi-factor-auth-required",{_serverResponse:i}),i}function jm(t,e,n,r){const s=`${e}${n}?${r}`;return t.config.emulator?Ql(t.config,s):`${t.config.apiScheme}://${s}`}function zw(t){switch(t){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class Ww{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((n,r)=>{this.timer=setTimeout(()=>r(mn(this.auth,"network-request-failed")),Hw.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function go(t,e,n){const r={appName:t.name};n.email&&(r.email=n.email),n.phoneNumber&&(r.phoneNumber=n.phoneNumber);const s=mn(t,e,r);return s.customData._tokenResponse=n,s}function Ud(t){return t!==void 0&&t.enterprise!==void 0}class Kw{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const n of this.recaptchaEnforcementState)if(n.provider&&n.provider===e)return zw(n.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}async function Gw(t,e){return Un(t,"GET","/v2/recaptchaConfig",_r(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Qw(t,e){return Un(t,"POST","/v1/accounts:delete",e)}async function $m(t,e){return Un(t,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mi(t){if(t)try{const e=new Date(Number(t));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function Yw(t,e=!1){const n=Ke(t),r=await n.getIdToken(e),s=Yl(r);oe(s&&s.exp&&s.auth_time&&s.iat,n.auth,"internal-error");const i=typeof s.firebase=="object"?s.firebase:void 0,o=i==null?void 0:i.sign_in_provider;return{claims:s,token:r,authTime:mi(Pc(s.auth_time)),issuedAtTime:mi(Pc(s.iat)),expirationTime:mi(Pc(s.exp)),signInProvider:o||null,signInSecondFactor:(i==null?void 0:i.sign_in_second_factor)||null}}function Pc(t){return Number(t)*1e3}function Yl(t){const[e,n,r]=t.split(".");if(e===void 0||n===void 0||r===void 0)return Ao("JWT malformed, contained fewer than 3 sections"),null;try{const s=wm(n);return s?JSON.parse(s):(Ao("Failed to decode base64 JWT payload"),null)}catch(s){return Ao("Caught error parsing JWT payload as JSON",s==null?void 0:s.toString()),null}}function Bd(t){const e=Yl(t);return oe(e,"internal-error"),oe(typeof e.exp<"u","internal-error"),oe(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ki(t,e,n=!1){if(n)return e;try{return await e}catch(r){throw r instanceof cn&&Jw(r)&&t.auth.currentUser===t&&await t.auth.signOut(),r}}function Jw({code:t}){return t==="auth/user-disabled"||t==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xw{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var n;if(e){const r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;const s=((n=this.user.stsTokenManager.expirationTime)!==null&&n!==void 0?n:0)-Date.now()-3e5;return Math.max(0,s)}}schedule(e=!1){if(!this.isRunning)return;const n=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rl{constructor(e,n){this.createdAt=e,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=mi(this.lastLoginAt),this.creationTime=mi(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function zo(t){var e;const n=t.auth,r=await t.getIdToken(),s=await ki(t,$m(n,{idToken:r}));oe(s==null?void 0:s.users.length,n,"internal-error");const i=s.users[0];t._notifyReloadListener(i);const o=!((e=i.providerUserInfo)===null||e===void 0)&&e.length?qm(i.providerUserInfo):[],c=eA(t.providerData,o),l=t.isAnonymous,h=!(t.email&&i.passwordHash)&&!(c!=null&&c.length),d=l?h:!1,p={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:c,metadata:new rl(i.createdAt,i.lastLoginAt),isAnonymous:d};Object.assign(t,p)}async function Zw(t){const e=Ke(t);await zo(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function eA(t,e){return[...t.filter(r=>!e.some(s=>s.providerId===r.providerId)),...e]}function qm(t){return t.map(e=>{var{providerId:n}=e,r=Kl(e,["providerId"]);return{providerId:n,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function tA(t,e){const n=await Bm(t,{},async()=>{const r=ji({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:i}=t.config,o=jm(t,s,"/v1/token",`key=${i}`),c=await t._getAdditionalHeaders();return c["Content-Type"]="application/x-www-form-urlencoded",Um.fetch()(o,{method:"POST",headers:c,body:r})});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}async function nA(t,e){return Un(t,"POST","/v2/accounts:revokeToken",_r(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ps{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){oe(e.idToken,"internal-error"),oe(typeof e.idToken<"u","internal-error"),oe(typeof e.refreshToken<"u","internal-error");const n="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Bd(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,n)}updateFromIdToken(e){oe(e.length!==0,"internal-error");const n=Bd(e);this.updateTokensAndExpiration(e,null,n)}async getToken(e,n=!1){return!n&&this.accessToken&&!this.isExpired?this.accessToken:(oe(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,n){const{accessToken:r,refreshToken:s,expiresIn:i}=await tA(e,n);this.updateTokensAndExpiration(r,s,Number(i))}updateTokensAndExpiration(e,n,r){this.refreshToken=n||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,n){const{refreshToken:r,accessToken:s,expirationTime:i}=n,o=new ps;return r&&(oe(typeof r=="string","internal-error",{appName:e}),o.refreshToken=r),s&&(oe(typeof s=="string","internal-error",{appName:e}),o.accessToken=s),i&&(oe(typeof i=="number","internal-error",{appName:e}),o.expirationTime=i),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new ps,this.toJSON())}_performRefresh(){return kn("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wn(t,e){oe(typeof t=="string"||typeof t>"u","internal-error",{appName:e})}class Dn{constructor(e){var{uid:n,auth:r,stsTokenManager:s}=e,i=Kl(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new Xw(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=n,this.auth=r,this.stsTokenManager=s,this.accessToken=s.accessToken,this.displayName=i.displayName||null,this.email=i.email||null,this.emailVerified=i.emailVerified||!1,this.phoneNumber=i.phoneNumber||null,this.photoURL=i.photoURL||null,this.isAnonymous=i.isAnonymous||!1,this.tenantId=i.tenantId||null,this.providerData=i.providerData?[...i.providerData]:[],this.metadata=new rl(i.createdAt||void 0,i.lastLoginAt||void 0)}async getIdToken(e){const n=await ki(this,this.stsTokenManager.getToken(this.auth,e));return oe(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(e){return Yw(this,e)}reload(){return Zw(this)}_assign(e){this!==e&&(oe(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(n=>Object.assign({},n)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const n=new Dn(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return n.metadata._copy(this.metadata),n}_onReload(e){oe(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,n=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),n&&await zo(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Cn(this.auth.app))return Promise.reject(or(this.auth));const e=await this.getIdToken();return await ki(this,Qw(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,n){var r,s,i,o,c,l,h,d;const p=(r=n.displayName)!==null&&r!==void 0?r:void 0,g=(s=n.email)!==null&&s!==void 0?s:void 0,_=(i=n.phoneNumber)!==null&&i!==void 0?i:void 0,P=(o=n.photoURL)!==null&&o!==void 0?o:void 0,k=(c=n.tenantId)!==null&&c!==void 0?c:void 0,D=(l=n._redirectEventId)!==null&&l!==void 0?l:void 0,x=(h=n.createdAt)!==null&&h!==void 0?h:void 0,F=(d=n.lastLoginAt)!==null&&d!==void 0?d:void 0,{uid:$,emailVerified:q,isAnonymous:ce,providerData:le,stsTokenManager:w}=n;oe($&&w,e,"internal-error");const v=ps.fromJSON(this.name,w);oe(typeof $=="string",e,"internal-error"),Wn(p,e.name),Wn(g,e.name),oe(typeof q=="boolean",e,"internal-error"),oe(typeof ce=="boolean",e,"internal-error"),Wn(_,e.name),Wn(P,e.name),Wn(k,e.name),Wn(D,e.name),Wn(x,e.name),Wn(F,e.name);const I=new Dn({uid:$,auth:e,email:g,emailVerified:q,displayName:p,isAnonymous:ce,photoURL:P,phoneNumber:_,tenantId:k,stsTokenManager:v,createdAt:x,lastLoginAt:F});return le&&Array.isArray(le)&&(I.providerData=le.map(A=>Object.assign({},A))),D&&(I._redirectEventId=D),I}static async _fromIdTokenResponse(e,n,r=!1){const s=new ps;s.updateFromServerResponse(n);const i=new Dn({uid:n.localId,auth:e,stsTokenManager:s,isAnonymous:r});return await zo(i),i}static async _fromGetAccountInfoResponse(e,n,r){const s=n.users[0];oe(s.localId!==void 0,"internal-error");const i=s.providerUserInfo!==void 0?qm(s.providerUserInfo):[],o=!(s.email&&s.passwordHash)&&!(i!=null&&i.length),c=new ps;c.updateFromIdToken(r);const l=new Dn({uid:s.localId,auth:e,stsTokenManager:c,isAnonymous:o}),h={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:i,metadata:new rl(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!(i!=null&&i.length)};return Object.assign(l,h),l}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jd=new Map;function Vn(t){xn(t instanceof Function,"Expected a class definition");let e=jd.get(t);return e?(xn(e instanceof t,"Instance stored in cache mismatched with class"),e):(e=new t,jd.set(t,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hm{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,n){this.storage[e]=n}async _get(e){const n=this.storage[e];return n===void 0?null:n}async _remove(e){delete this.storage[e]}_addListener(e,n){}_removeListener(e,n){}}Hm.type="NONE";const $d=Hm;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bo(t,e,n){return`firebase:${t}:${e}:${n}`}class ms{constructor(e,n,r){this.persistence=e,this.auth=n,this.userKey=r;const{config:s,name:i}=this.auth;this.fullUserKey=bo(this.userKey,s.apiKey,i),this.fullPersistenceKey=bo("persistence",s.apiKey,i),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?Dn._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,n,r="authUser"){if(!n.length)return new ms(Vn($d),e,r);const s=(await Promise.all(n.map(async h=>{if(await h._isAvailable())return h}))).filter(h=>h);let i=s[0]||Vn($d);const o=bo(r,e.config.apiKey,e.name);let c=null;for(const h of n)try{const d=await h._get(o);if(d){const p=Dn._fromJSON(e,d);h!==i&&(c=p),i=h;break}}catch{}const l=s.filter(h=>h._shouldAllowMigration);return!i._shouldAllowMigration||!l.length?new ms(i,e,r):(i=l[0],c&&await i._set(o,c.toJSON()),await Promise.all(n.map(async h=>{if(h!==i)try{await h._remove(o)}catch{}})),new ms(i,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qd(t){const e=t.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Gm(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(zm(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Ym(e))return"Blackberry";if(Jm(e))return"Webos";if(Wm(e))return"Safari";if((e.includes("chrome/")||Km(e))&&!e.includes("edge/"))return"Chrome";if(Qm(e))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=t.match(n);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function zm(t=Et()){return/firefox\//i.test(t)}function Wm(t=Et()){const e=t.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Km(t=Et()){return/crios\//i.test(t)}function Gm(t=Et()){return/iemobile/i.test(t)}function Qm(t=Et()){return/android/i.test(t)}function Ym(t=Et()){return/blackberry/i.test(t)}function Jm(t=Et()){return/webos/i.test(t)}function Jl(t=Et()){return/iphone|ipad|ipod/i.test(t)||/macintosh/i.test(t)&&/mobile/i.test(t)}function rA(t=Et()){var e;return Jl(t)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function sA(){return yI()&&document.documentMode===10}function Xm(t=Et()){return Jl(t)||Qm(t)||Jm(t)||Ym(t)||/windows phone/i.test(t)||Gm(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zm(t,e=[]){let n;switch(t){case"Browser":n=qd(Et());break;case"Worker":n=`${qd(Et())}-${t}`;break;default:n=t}const r=e.length?e.join(","):"FirebaseCore-web";return`${n}/JsCore/${Ds}/${r}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iA{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,n){const r=i=>new Promise((o,c)=>{try{const l=e(i);o(l)}catch(l){c(l)}});r.onAbort=n,this.queue.push(r);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const n=[];try{for(const r of this.queue)await r(e),r.onAbort&&n.push(r.onAbort)}catch(r){n.reverse();for(const s of n)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function oA(t,e={}){return Un(t,"GET","/v2/passwordPolicy",_r(t,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const aA=6;class cA{constructor(e){var n,r,s,i;const o=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(n=o.minPasswordLength)!==null&&n!==void 0?n:aA,o.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=o.maxPasswordLength),o.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=o.containsLowercaseCharacter),o.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=o.containsUppercaseCharacter),o.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=o.containsNumericCharacter),o.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=o.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(s=(r=e.allowedNonAlphanumericCharacters)===null||r===void 0?void 0:r.join(""))!==null&&s!==void 0?s:"",this.forceUpgradeOnSignin=(i=e.forceUpgradeOnSignin)!==null&&i!==void 0?i:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var n,r,s,i,o,c;const l={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,l),this.validatePasswordCharacterOptions(e,l),l.isValid&&(l.isValid=(n=l.meetsMinPasswordLength)!==null&&n!==void 0?n:!0),l.isValid&&(l.isValid=(r=l.meetsMaxPasswordLength)!==null&&r!==void 0?r:!0),l.isValid&&(l.isValid=(s=l.containsLowercaseLetter)!==null&&s!==void 0?s:!0),l.isValid&&(l.isValid=(i=l.containsUppercaseLetter)!==null&&i!==void 0?i:!0),l.isValid&&(l.isValid=(o=l.containsNumericCharacter)!==null&&o!==void 0?o:!0),l.isValid&&(l.isValid=(c=l.containsNonAlphanumericCharacter)!==null&&c!==void 0?c:!0),l}validatePasswordLengthOptions(e,n){const r=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;r&&(n.meetsMinPasswordLength=e.length>=r),s&&(n.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,n){this.updatePasswordCharacterOptionsStatuses(n,!1,!1,!1,!1);let r;for(let s=0;s<e.length;s++)r=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(n,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,n,r,s,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=n)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lA{constructor(e,n,r,s){this.app=e,this.heartbeatServiceProvider=n,this.appCheckServiceProvider=r,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Hd(this),this.idTokenSubscription=new Hd(this),this.beforeStateQueue=new iA(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Lm,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion}_initializeWithPersistence(e,n){return n&&(this._popupRedirectResolver=Vn(n)),this._initializationPromise=this.queue(async()=>{var r,s;if(!this._deleted&&(this.persistenceManager=await ms.create(this,e),!this._deleted)){if(!((r=this._popupRedirectResolver)===null||r===void 0)&&r._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=((s=this.currentUser)===null||s===void 0?void 0:s.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const n=await $m(this,{idToken:e}),r=await Dn._fromGetAccountInfoResponse(this,n,e);await this.directlySetCurrentUser(r)}catch(n){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",n),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var n;if(Cn(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(c=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(c,c))}):this.directlySetCurrentUser(null)}const r=await this.assertedPersistence.getCurrentUser();let s=r,i=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(n=this.redirectUser)===null||n===void 0?void 0:n._redirectEventId,c=s==null?void 0:s._redirectEventId,l=await this.tryRedirectSignIn(e);(!o||o===c)&&(l!=null&&l.user)&&(s=l.user,i=!0)}if(!s)return this.directlySetCurrentUser(null);if(!s._redirectEventId){if(i)try{await this.beforeStateQueue.runMiddleware(s)}catch(o){s=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return s?this.reloadAndSetCurrentUserOrClear(s):this.directlySetCurrentUser(null)}return oe(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===s._redirectEventId?this.directlySetCurrentUser(s):this.reloadAndSetCurrentUserOrClear(s)}async tryRedirectSignIn(e){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(e){try{await zo(e)}catch(n){if((n==null?void 0:n.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=$w()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Cn(this.app))return Promise.reject(or(this));const n=e?Ke(e):null;return n&&oe(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(e,n=!1){if(!this._deleted)return e&&oe(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),n||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Cn(this.app)?Promise.reject(or(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Cn(this.app)?Promise.reject(or(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(Vn(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const n=this._getPasswordPolicyInternal();return n.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):n.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await oA(this),n=new cA(e);this.tenantId===null?this._projectPasswordPolicy=n:this._tenantPasswordPolicies[this.tenantId]=n}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new Hr("auth","Firebase",e())}onAuthStateChanged(e,n,r){return this.registerStateListener(this.authStateSubscription,e,n,r)}beforeAuthStateChanged(e,n){return this.beforeStateQueue.pushCallback(e,n)}onIdTokenChanged(e,n,r){return this.registerStateListener(this.idTokenSubscription,e,n,r)}authStateReady(){return new Promise((e,n)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},n)}})}async revokeAccessToken(e){if(this.currentUser){const n=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:n};this.tenantId!=null&&(r.tenantId=this.tenantId),await nA(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,n){const r=await this.getOrInitRedirectPersistenceManager(n);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const n=e&&Vn(e)||this._popupRedirectResolver;oe(n,this,"argument-error"),this.redirectPersistenceManager=await ms.create(this,[Vn(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var n,r;return this._isInitialized&&await this.queue(async()=>{}),((n=this._currentUser)===null||n===void 0?void 0:n._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,n;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const r=(n=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&n!==void 0?n:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,n,r,s){if(this._deleted)return()=>{};const i=typeof n=="function"?n:n.next.bind(n);let o=!1;const c=this._isInitialized?Promise.resolve():this._initializationPromise;if(oe(c,this,"internal-error"),c.then(()=>{o||i(this.currentUser)}),typeof n=="function"){const l=e.addObserver(n,r,s);return()=>{o=!0,l()}}else{const l=e.addObserver(n);return()=>{o=!0,l()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return oe(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Zm(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const n={"X-Client-Version":this.clientVersion};this.app.options.appId&&(n["X-Firebase-gmpid"]=this.app.options.appId);const r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());r&&(n["X-Firebase-Client"]=r);const s=await this._getAppCheckToken();return s&&(n["X-Firebase-AppCheck"]=s),n}async _getAppCheckToken(){var e;const n=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return n!=null&&n.error&&Uw(`Error while retrieving App Check token: ${n.error}`),n==null?void 0:n.token}}function Wr(t){return Ke(t)}class Hd{constructor(e){this.auth=e,this.observer=null,this.addObserver=bI(n=>this.observer=n)}get next(){return oe(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Aa={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function uA(t){Aa=t}function eg(t){return Aa.loadJS(t)}function hA(){return Aa.recaptchaEnterpriseScript}function dA(){return Aa.gapiScript}function fA(t){return`__${t}${Math.floor(Math.random()*1e6)}`}class pA{constructor(){this.enterprise=new mA}ready(e){e()}execute(e,n){return Promise.resolve("token")}render(e,n){return""}}class mA{ready(e){e()}execute(e,n){return Promise.resolve("token")}render(e,n){return""}}const gA="recaptcha-enterprise",tg="NO_RECAPTCHA";class _A{constructor(e){this.type=gA,this.auth=Wr(e)}async verify(e="verify",n=!1){async function r(i){if(!n){if(i.tenantId==null&&i._agentRecaptchaConfig!=null)return i._agentRecaptchaConfig.siteKey;if(i.tenantId!=null&&i._tenantRecaptchaConfigs[i.tenantId]!==void 0)return i._tenantRecaptchaConfigs[i.tenantId].siteKey}return new Promise(async(o,c)=>{Gw(i,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(l=>{if(l.recaptchaKey===void 0)c(new Error("recaptcha Enterprise site key undefined"));else{const h=new Kw(l);return i.tenantId==null?i._agentRecaptchaConfig=h:i._tenantRecaptchaConfigs[i.tenantId]=h,o(h.siteKey)}}).catch(l=>{c(l)})})}function s(i,o,c){const l=window.grecaptcha;Ud(l)?l.enterprise.ready(()=>{l.enterprise.execute(i,{action:e}).then(h=>{o(h)}).catch(()=>{o(tg)})}):c(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new pA().execute("siteKey",{action:"verify"}):new Promise((i,o)=>{r(this.auth).then(c=>{if(!n&&Ud(window.grecaptcha))s(c,i,o);else{if(typeof window>"u"){o(new Error("RecaptchaVerifier is only supported in browser"));return}let l=hA();l.length!==0&&(l+=c),eg(l).then(()=>{s(c,i,o)}).catch(h=>{o(h)})}}).catch(c=>{o(c)})})}}async function zd(t,e,n,r=!1,s=!1){const i=new _A(t);let o;if(s)o=tg;else try{o=await i.verify(n)}catch{o=await i.verify(n,!0)}const c=Object.assign({},e);if(n==="mfaSmsEnrollment"||n==="mfaSmsSignIn"){if("phoneEnrollmentInfo"in c){const l=c.phoneEnrollmentInfo.phoneNumber,h=c.phoneEnrollmentInfo.recaptchaToken;Object.assign(c,{phoneEnrollmentInfo:{phoneNumber:l,recaptchaToken:h,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in c){const l=c.phoneSignInInfo.recaptchaToken;Object.assign(c,{phoneSignInInfo:{recaptchaToken:l,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return c}return r?Object.assign(c,{captchaResp:o}):Object.assign(c,{captchaResponse:o}),Object.assign(c,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(c,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),c}async function sl(t,e,n,r,s){var i;if(!((i=t._getRecaptchaConfig())===null||i===void 0)&&i.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const o=await zd(t,e,n,n==="getOobCode");return r(t,o)}else return r(t,e).catch(async o=>{if(o.code==="auth/missing-recaptcha-token"){console.log(`${n} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const c=await zd(t,e,n,n==="getOobCode");return r(t,c)}else return Promise.reject(o)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yA(t,e){const n=zr(t,"auth");if(n.isInitialized()){const s=n.getImmediate(),i=n.getOptions();if(Pi(i,e??{}))return s;on(s,"already-initialized")}return n.initialize({options:e})}function vA(t,e){const n=(e==null?void 0:e.persistence)||[],r=(Array.isArray(n)?n:[n]).map(Vn);e!=null&&e.errorMap&&t._updateErrorMap(e.errorMap),t._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function EA(t,e,n){const r=Wr(t);oe(r._canInitEmulator,r,"emulator-config-failed"),oe(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const s=!1,i=ng(e),{host:o,port:c}=TA(e),l=c===null?"":`:${c}`;r.config.emulator={url:`${i}//${o}${l}/`},r.settings.appVerificationDisabledForTesting=!0,r.emulatorConfig=Object.freeze({host:o,port:c,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:s})}),IA()}function ng(t){const e=t.indexOf(":");return e<0?"":t.substr(0,e+1)}function TA(t){const e=ng(t),n=/(\/\/)?([^?#/]+)/.exec(t.substr(e.length));if(!n)return{host:"",port:null};const r=n[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){const i=s[1];return{host:i,port:Wd(r.substr(i.length+1))}}else{const[i,o]=r.split(":");return{host:i,port:Wd(o)}}}function Wd(t){if(!t)return null;const e=Number(t);return isNaN(e)?null:e}function IA(){function t(){const e=document.createElement("p"),n=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",n.position="fixed",n.width="100%",n.backgroundColor="#ffffff",n.border=".1em solid #000000",n.color="#b50000",n.bottom="0px",n.left="0px",n.margin="0px",n.zIndex="10000",n.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",t):t())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xl{constructor(e,n){this.providerId=e,this.signInMethod=n}toJSON(){return kn("not implemented")}_getIdTokenResponse(e){return kn("not implemented")}_linkToIdToken(e,n){return kn("not implemented")}_getReauthenticationResolver(e){return kn("not implemented")}}async function wA(t,e){return Un(t,"POST","/v1/accounts:signUp",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function AA(t,e){return wa(t,"POST","/v1/accounts:signInWithPassword",_r(t,e))}async function bA(t,e){return Un(t,"POST","/v1/accounts:sendOobCode",_r(t,e))}async function RA(t,e){return bA(t,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function SA(t,e){return wa(t,"POST","/v1/accounts:signInWithEmailLink",_r(t,e))}async function PA(t,e){return wa(t,"POST","/v1/accounts:signInWithEmailLink",_r(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Di extends Xl{constructor(e,n,r,s=null){super("password",r),this._email=e,this._password=n,this._tenantId=s}static _fromEmailAndPassword(e,n){return new Di(e,n,"password")}static _fromEmailAndCode(e,n,r=null){return new Di(e,n,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e;if(n!=null&&n.email&&(n!=null&&n.password)){if(n.signInMethod==="password")return this._fromEmailAndPassword(n.email,n.password);if(n.signInMethod==="emailLink")return this._fromEmailAndCode(n.email,n.password,n.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const n={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return sl(e,n,"signInWithPassword",AA);case"emailLink":return SA(e,{email:this._email,oobCode:this._password});default:on(e,"internal-error")}}async _linkToIdToken(e,n){switch(this.signInMethod){case"password":const r={idToken:n,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return sl(e,r,"signUpPassword",wA);case"emailLink":return PA(e,{idToken:n,email:this._email,oobCode:this._password});default:on(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function gs(t,e){return wa(t,"POST","/v1/accounts:signInWithIdp",_r(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const CA="http://localhost";class Fr extends Xl{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const n=new Fr(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(n.idToken=e.idToken),e.accessToken&&(n.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(n.nonce=e.nonce),e.pendingToken&&(n.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(n.accessToken=e.oauthToken,n.secret=e.oauthTokenSecret):on("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:s}=n,i=Kl(n,["providerId","signInMethod"]);if(!r||!s)return null;const o=new Fr(r,s);return o.idToken=i.idToken||void 0,o.accessToken=i.accessToken||void 0,o.secret=i.secret,o.nonce=i.nonce,o.pendingToken=i.pendingToken||null,o}_getIdTokenResponse(e){const n=this.buildRequest();return gs(e,n)}_linkToIdToken(e,n){const r=this.buildRequest();return r.idToken=n,gs(e,r)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,gs(e,n)}buildRequest(){const e={requestUri:CA,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),e.postBody=ji(n)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function kA(t){switch(t){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function DA(t){const e=ti(ni(t)).link,n=e?ti(ni(e)).deep_link_id:null,r=ti(ni(t)).deep_link_id;return(r?ti(ni(r)).link:null)||r||n||e||t}class Zl{constructor(e){var n,r,s,i,o,c;const l=ti(ni(e)),h=(n=l.apiKey)!==null&&n!==void 0?n:null,d=(r=l.oobCode)!==null&&r!==void 0?r:null,p=kA((s=l.mode)!==null&&s!==void 0?s:null);oe(h&&d&&p,"argument-error"),this.apiKey=h,this.operation=p,this.code=d,this.continueUrl=(i=l.continueUrl)!==null&&i!==void 0?i:null,this.languageCode=(o=l.languageCode)!==null&&o!==void 0?o:null,this.tenantId=(c=l.tenantId)!==null&&c!==void 0?c:null}static parseLink(e){const n=DA(e);try{return new Zl(n)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vs{constructor(){this.providerId=Vs.PROVIDER_ID}static credential(e,n){return Di._fromEmailAndPassword(e,n)}static credentialWithLink(e,n){const r=Zl.parseLink(n);return oe(r,"argument-error"),Di._fromEmailAndCode(e,r.code,r.tenantId)}}Vs.PROVIDER_ID="password";Vs.EMAIL_PASSWORD_SIGN_IN_METHOD="password";Vs.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rg{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qi extends rg{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jn extends qi{constructor(){super("facebook.com")}static credential(e){return Fr._fromParams({providerId:Jn.PROVIDER_ID,signInMethod:Jn.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Jn.credentialFromTaggedObject(e)}static credentialFromError(e){return Jn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Jn.credential(e.oauthAccessToken)}catch{return null}}}Jn.FACEBOOK_SIGN_IN_METHOD="facebook.com";Jn.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xn extends qi{constructor(){super("google.com"),this.addScope("profile")}static credential(e,n){return Fr._fromParams({providerId:Xn.PROVIDER_ID,signInMethod:Xn.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:n})}static credentialFromResult(e){return Xn.credentialFromTaggedObject(e)}static credentialFromError(e){return Xn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:r}=e;if(!n&&!r)return null;try{return Xn.credential(n,r)}catch{return null}}}Xn.GOOGLE_SIGN_IN_METHOD="google.com";Xn.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zn extends qi{constructor(){super("github.com")}static credential(e){return Fr._fromParams({providerId:Zn.PROVIDER_ID,signInMethod:Zn.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Zn.credentialFromTaggedObject(e)}static credentialFromError(e){return Zn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Zn.credential(e.oauthAccessToken)}catch{return null}}}Zn.GITHUB_SIGN_IN_METHOD="github.com";Zn.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class er extends qi{constructor(){super("twitter.com")}static credential(e,n){return Fr._fromParams({providerId:er.PROVIDER_ID,signInMethod:er.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:n})}static credentialFromResult(e){return er.credentialFromTaggedObject(e)}static credentialFromError(e){return er.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:n,oauthTokenSecret:r}=e;if(!n||!r)return null;try{return er.credential(n,r)}catch{return null}}}er.TWITTER_SIGN_IN_METHOD="twitter.com";er.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ts{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,n,r,s=!1){const i=await Dn._fromIdTokenResponse(e,r,s),o=Kd(r);return new Ts({user:i,providerId:o,_tokenResponse:r,operationType:n})}static async _forOperation(e,n,r){await e._updateTokensIfNecessary(r,!0);const s=Kd(r);return new Ts({user:e,providerId:s,_tokenResponse:r,operationType:n})}}function Kd(t){return t.providerId?t.providerId:"phoneNumber"in t?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wo extends cn{constructor(e,n,r,s){var i;super(n.code,n.message),this.operationType=r,this.user=s,Object.setPrototypeOf(this,Wo.prototype),this.customData={appName:e.name,tenantId:(i=e.tenantId)!==null&&i!==void 0?i:void 0,_serverResponse:n.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,n,r,s){return new Wo(e,n,r,s)}}function sg(t,e,n,r){return(e==="reauthenticate"?n._getReauthenticationResolver(t):n._getIdTokenResponse(t)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?Wo._fromErrorAndOperation(t,i,e,r):i})}async function VA(t,e,n=!1){const r=await ki(t,e._linkToIdToken(t.auth,await t.getIdToken()),n);return Ts._forOperation(t,"link",r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function OA(t,e,n=!1){const{auth:r}=t;if(Cn(r.app))return Promise.reject(or(r));const s="reauthenticate";try{const i=await ki(t,sg(r,s,e,t),n);oe(i.idToken,r,"internal-error");const o=Yl(i.idToken);oe(o,r,"internal-error");const{sub:c}=o;return oe(t.uid===c,r,"user-mismatch"),Ts._forOperation(t,s,i)}catch(i){throw(i==null?void 0:i.code)==="auth/user-not-found"&&on(r,"user-mismatch"),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ig(t,e,n=!1){if(Cn(t.app))return Promise.reject(or(t));const r="signIn",s=await sg(t,r,e),i=await Ts._fromIdTokenResponse(t,r,s);return n||await t._updateCurrentUser(i.user),i}async function NA(t,e){return ig(Wr(t),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function xA(t){const e=Wr(t);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}async function MA(t,e,n){const r=Wr(t);await sl(r,{requestType:"PASSWORD_RESET",email:e,clientType:"CLIENT_TYPE_WEB"},"getOobCode",RA)}function LA(t,e,n){return Cn(t.app)?Promise.reject(or(t)):NA(Ke(t),Vs.credential(e,n)).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&xA(t),r})}function FA(t,e,n,r){return Ke(t).onIdTokenChanged(e,n,r)}function UA(t,e,n){return Ke(t).beforeAuthStateChanged(e,n)}function og(t,e,n,r){return Ke(t).onAuthStateChanged(e,n,r)}function BA(t){return Ke(t).signOut()}const Ko="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ag{constructor(e,n){this.storageRetriever=e,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem(Ko,"1"),this.storage.removeItem(Ko),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,n){return this.storage.setItem(e,JSON.stringify(n)),Promise.resolve()}_get(e){const n=this.storage.getItem(e);return Promise.resolve(n?JSON.parse(n):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jA=1e3,$A=10;class cg extends ag{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,n)=>this.onStorageEvent(e,n),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Xm(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const n of Object.keys(this.listeners)){const r=this.storage.getItem(n),s=this.localCache[n];r!==s&&e(n,s,r)}}onStorageEvent(e,n=!1){if(!e.key){this.forAllChangedKeys((o,c,l)=>{this.notifyListeners(o,l)});return}const r=e.key;n?this.detachListener():this.stopPolling();const s=()=>{const o=this.storage.getItem(r);!n&&this.localCache[r]===o||this.notifyListeners(r,o)},i=this.storage.getItem(r);sA()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,$A):s()}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,n,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:n,newValue:r}),!0)})},jA)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,n){await super._set(e,n),this.localCache[e]=JSON.stringify(n)}async _get(e){const n=await super._get(e);return this.localCache[e]=JSON.stringify(n),n}async _remove(e){await super._remove(e),delete this.localCache[e]}}cg.type="LOCAL";const qA=cg;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lg extends ag{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,n){}_removeListener(e,n){}}lg.type="SESSION";const ug=lg;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function HA(t){return Promise.all(t.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(n){return{fulfilled:!1,reason:n}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ba{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const n=this.receivers.find(s=>s.isListeningto(e));if(n)return n;const r=new ba(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const n=e,{eventId:r,eventType:s,data:i}=n.data,o=this.handlersMap[s];if(!(o!=null&&o.size))return;n.ports[0].postMessage({status:"ack",eventId:r,eventType:s});const c=Array.from(o).map(async h=>h(n.origin,i)),l=await HA(c);n.ports[0].postMessage({status:"done",eventId:r,eventType:s,response:l})}_subscribe(e,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(n)}_unsubscribe(e,n){this.handlersMap[e]&&n&&this.handlersMap[e].delete(n),(!n||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}ba.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function eu(t="",e=10){let n="";for(let r=0;r<e;r++)n+=Math.floor(Math.random()*10);return t+n}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zA{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,n,r=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,o;return new Promise((c,l)=>{const h=eu("",20);s.port1.start();const d=setTimeout(()=>{l(new Error("unsupported_event"))},r);o={messageChannel:s,onMessage(p){const g=p;if(g.data.eventId===h)switch(g.data.status){case"ack":clearTimeout(d),i=setTimeout(()=>{l(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),c(g.data.response);break;default:clearTimeout(d),clearTimeout(i),l(new Error("invalid_response"));break}}},this.handlers.add(o),s.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:h,data:n},[s.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gn(){return window}function WA(t){gn().location.href=t}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hg(){return typeof gn().WorkerGlobalScope<"u"&&typeof gn().importScripts=="function"}async function KA(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function GA(){var t;return((t=navigator==null?void 0:navigator.serviceWorker)===null||t===void 0?void 0:t.controller)||null}function QA(){return hg()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dg="firebaseLocalStorageDb",YA=1,Go="firebaseLocalStorage",fg="fbase_key";class Hi{constructor(e){this.request=e}toPromise(){return new Promise((e,n)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}}function Ra(t,e){return t.transaction([Go],e?"readwrite":"readonly").objectStore(Go)}function JA(){const t=indexedDB.deleteDatabase(dg);return new Hi(t).toPromise()}function il(){const t=indexedDB.open(dg,YA);return new Promise((e,n)=>{t.addEventListener("error",()=>{n(t.error)}),t.addEventListener("upgradeneeded",()=>{const r=t.result;try{r.createObjectStore(Go,{keyPath:fg})}catch(s){n(s)}}),t.addEventListener("success",async()=>{const r=t.result;r.objectStoreNames.contains(Go)?e(r):(r.close(),await JA(),e(await il()))})})}async function Gd(t,e,n){const r=Ra(t,!0).put({[fg]:e,value:n});return new Hi(r).toPromise()}async function XA(t,e){const n=Ra(t,!1).get(e),r=await new Hi(n).toPromise();return r===void 0?null:r.value}function Qd(t,e){const n=Ra(t,!0).delete(e);return new Hi(n).toPromise()}const ZA=800,e0=3;class pg{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await il(),this.db)}async _withRetries(e){let n=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(n++>e0)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return hg()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=ba._getInstance(QA()),this.receiver._subscribe("keyChanged",async(e,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(e,n)=>["keyChanged"])}async initializeSender(){var e,n;if(this.activeServiceWorker=await KA(),!this.activeServiceWorker)return;this.sender=new zA(this.activeServiceWorker);const r=await this.sender._send("ping",{},800);r&&!((e=r[0])===null||e===void 0)&&e.fulfilled&&!((n=r[0])===null||n===void 0)&&n.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||GA()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await il();return await Gd(e,Ko,"1"),await Qd(e,Ko),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,n){return this._withPendingWrite(async()=>(await this._withRetries(r=>Gd(r,e,n)),this.localCache[e]=n,this.notifyServiceWorker(e)))}async _get(e){const n=await this._withRetries(r=>XA(r,e));return this.localCache[e]=n,n}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(n=>Qd(n,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const i=Ra(s,!1).getAll();return new Hi(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const n=[],r=new Set;if(e.length!==0)for(const{fbase_key:s,value:i}of e)r.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),n.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!r.has(s)&&(this.notifyListeners(s,null),n.push(s));return n}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),ZA)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}pg.type="LOCAL";const t0=pg;new $i(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function n0(t,e){return e?Vn(e):(oe(t._popupRedirectResolver,t,"argument-error"),t._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tu extends Xl{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return gs(e,this._buildIdpRequest())}_linkToIdToken(e,n){return gs(e,this._buildIdpRequest(n))}_getReauthenticationResolver(e){return gs(e,this._buildIdpRequest())}_buildIdpRequest(e){const n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(n.idToken=e),n}}function r0(t){return ig(t.auth,new tu(t),t.bypassAuthState)}function s0(t){const{auth:e,user:n}=t;return oe(n,e,"internal-error"),OA(n,new tu(t),t.bypassAuthState)}async function i0(t){const{auth:e,user:n}=t;return oe(n,e,"internal-error"),VA(n,new tu(t),t.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mg{constructor(e,n,r,s,i=!1){this.auth=e,this.resolver=r,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(e,n)=>{this.pendingPromise={resolve:e,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:n,sessionId:r,postBody:s,tenantId:i,error:o,type:c}=e;if(o){this.reject(o);return}const l={auth:this.auth,requestUri:n,sessionId:r,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(c)(l))}catch(h){this.reject(h)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return r0;case"linkViaPopup":case"linkViaRedirect":return i0;case"reauthViaPopup":case"reauthViaRedirect":return s0;default:on(this.auth,"internal-error")}}resolve(e){xn(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){xn(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const o0=new $i(2e3,1e4);class cs extends mg{constructor(e,n,r,s,i){super(e,n,s,i),this.provider=r,this.authWindow=null,this.pollId=null,cs.currentPopupAction&&cs.currentPopupAction.cancel(),cs.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return oe(e,this.auth,"internal-error"),e}async onExecution(){xn(this.filter.length===1,"Popup operations only handle one event");const e=eu();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(mn(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(mn(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,cs.currentPopupAction=null}pollUserCancellation(){const e=()=>{var n,r;if(!((r=(n=this.authWindow)===null||n===void 0?void 0:n.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(mn(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,o0.get())};e()}}cs.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const a0="pendingRedirect",Ro=new Map;class c0 extends mg{constructor(e,n,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,r),this.eventId=null}async execute(){let e=Ro.get(this.auth._key());if(!e){try{const r=await l0(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(n){e=()=>Promise.reject(n)}Ro.set(this.auth._key(),e)}return this.bypassAuthState||Ro.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const n=await this.auth._redirectUserForId(e.eventId);if(n)return this.user=n,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function l0(t,e){const n=d0(e),r=h0(t);if(!await r._isAvailable())return!1;const s=await r._get(n)==="true";return await r._remove(n),s}function u0(t,e){Ro.set(t._key(),e)}function h0(t){return Vn(t._redirectPersistence)}function d0(t){return bo(a0,t.config.apiKey,t.name)}async function f0(t,e,n=!1){if(Cn(t.app))return Promise.reject(or(t));const r=Wr(t),s=n0(r,e),o=await new c0(r,s,n).execute();return o&&!n&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,e)),o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const p0=10*60*1e3;class m0{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let n=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(n=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!g0(e)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=e,n=!0)),n}sendToConsumer(e,n){var r;if(e.error&&!gg(e)){const s=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";n.onError(mn(this.auth,s))}else n.onAuthEvent(e)}isEventForConsumer(e,n){const r=n.eventId===null||!!e.eventId&&e.eventId===n.eventId;return n.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=p0&&this.cachedEventUids.clear(),this.cachedEventUids.has(Yd(e))}saveEventToCache(e){this.cachedEventUids.add(Yd(e)),this.lastProcessedEventTime=Date.now()}}function Yd(t){return[t.type,t.eventId,t.sessionId,t.tenantId].filter(e=>e).join("-")}function gg({type:t,error:e}){return t==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function g0(t){switch(t.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return gg(t);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function _0(t,e={}){return Un(t,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const y0=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,v0=/^https?/;async function E0(t){if(t.config.emulator)return;const{authorizedDomains:e}=await _0(t);for(const n of e)try{if(T0(n))return}catch{}on(t,"unauthorized-domain")}function T0(t){const e=nl(),{protocol:n,hostname:r}=new URL(e);if(t.startsWith("chrome-extension://")){const o=new URL(t);return o.hostname===""&&r===""?n==="chrome-extension:"&&t.replace("chrome-extension://","")===e.replace("chrome-extension://",""):n==="chrome-extension:"&&o.hostname===r}if(!v0.test(n))return!1;if(y0.test(t))return r===t;const s=t.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const I0=new $i(3e4,6e4);function Jd(){const t=gn().___jsl;if(t!=null&&t.H){for(const e of Object.keys(t.H))if(t.H[e].r=t.H[e].r||[],t.H[e].L=t.H[e].L||[],t.H[e].r=[...t.H[e].L],t.CP)for(let n=0;n<t.CP.length;n++)t.CP[n]=null}}function w0(t){return new Promise((e,n)=>{var r,s,i;function o(){Jd(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Jd(),n(mn(t,"network-request-failed"))},timeout:I0.get()})}if(!((s=(r=gn().gapi)===null||r===void 0?void 0:r.iframes)===null||s===void 0)&&s.Iframe)e(gapi.iframes.getContext());else if(!((i=gn().gapi)===null||i===void 0)&&i.load)o();else{const c=fA("iframefcb");return gn()[c]=()=>{gapi.load?o():n(mn(t,"network-request-failed"))},eg(`${dA()}?onload=${c}`).catch(l=>n(l))}}).catch(e=>{throw So=null,e})}let So=null;function A0(t){return So=So||w0(t),So}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const b0=new $i(5e3,15e3),R0="__/auth/iframe",S0="emulator/auth/iframe",P0={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},C0=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function k0(t){const e=t.config;oe(e.authDomain,t,"auth-domain-config-required");const n=e.emulator?Ql(e,S0):`https://${t.config.authDomain}/${R0}`,r={apiKey:e.apiKey,appName:t.name,v:Ds},s=C0.get(t.config.apiHost);s&&(r.eid=s);const i=t._getFrameworks();return i.length&&(r.fw=i.join(",")),`${n}?${ji(r).slice(1)}`}async function D0(t){const e=await A0(t),n=gn().gapi;return oe(n,t,"internal-error"),e.open({where:document.body,url:k0(t),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:P0,dontclear:!0},r=>new Promise(async(s,i)=>{await r.restyle({setHideOnLeave:!1});const o=mn(t,"network-request-failed"),c=gn().setTimeout(()=>{i(o)},b0.get());function l(){gn().clearTimeout(c),s(r)}r.ping(l).then(l,()=>{i(o)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const V0={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},O0=500,N0=600,x0="_blank",M0="http://localhost";class Xd{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function L0(t,e,n,r=O0,s=N0){const i=Math.max((window.screen.availHeight-s)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString();let c="";const l=Object.assign(Object.assign({},V0),{width:r.toString(),height:s.toString(),top:i,left:o}),h=Et().toLowerCase();n&&(c=Km(h)?x0:n),zm(h)&&(e=e||M0,l.scrollbars="yes");const d=Object.entries(l).reduce((g,[_,P])=>`${g}${_}=${P},`,"");if(rA(h)&&c!=="_self")return F0(e||"",c),new Xd(null);const p=window.open(e||"",c,d);oe(p,t,"popup-blocked");try{p.focus()}catch{}return new Xd(p)}function F0(t,e){const n=document.createElement("a");n.href=t,n.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const U0="__/auth/handler",B0="emulator/auth/handler",j0=encodeURIComponent("fac");async function Zd(t,e,n,r,s,i){oe(t.config.authDomain,t,"auth-domain-config-required"),oe(t.config.apiKey,t,"invalid-api-key");const o={apiKey:t.config.apiKey,appName:t.name,authType:n,redirectUrl:r,v:Ds,eventId:s};if(e instanceof rg){e.setDefaultLanguage(t.languageCode),o.providerId=e.providerId||"",AI(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[d,p]of Object.entries({}))o[d]=p}if(e instanceof qi){const d=e.getScopes().filter(p=>p!=="");d.length>0&&(o.scopes=d.join(","))}t.tenantId&&(o.tid=t.tenantId);const c=o;for(const d of Object.keys(c))c[d]===void 0&&delete c[d];const l=await t._getAppCheckToken(),h=l?`#${j0}=${encodeURIComponent(l)}`:"";return`${$0(t)}?${ji(c).slice(1)}${h}`}function $0({config:t}){return t.emulator?Ql(t,B0):`https://${t.authDomain}/${U0}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Cc="webStorageSupport";class q0{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=ug,this._completeRedirectFn=f0,this._overrideRedirectResult=u0}async _openPopup(e,n,r,s){var i;xn((i=this.eventManagers[e._key()])===null||i===void 0?void 0:i.manager,"_initialize() not called before _openPopup()");const o=await Zd(e,n,r,nl(),s);return L0(e,o,eu())}async _openRedirect(e,n,r,s){await this._originValidation(e);const i=await Zd(e,n,r,nl(),s);return WA(i),new Promise(()=>{})}_initialize(e){const n=e._key();if(this.eventManagers[n]){const{manager:s,promise:i}=this.eventManagers[n];return s?Promise.resolve(s):(xn(i,"If manager is not set, promise should be"),i)}const r=this.initAndGetManager(e);return this.eventManagers[n]={promise:r},r.catch(()=>{delete this.eventManagers[n]}),r}async initAndGetManager(e){const n=await D0(e),r=new m0(e);return n.register("authEvent",s=>(oe(s==null?void 0:s.authEvent,e,"invalid-auth-event"),{status:r.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=n,r}_isIframeWebStorageSupported(e,n){this.iframes[e._key()].send(Cc,{type:Cc},s=>{var i;const o=(i=s==null?void 0:s[0])===null||i===void 0?void 0:i[Cc];o!==void 0&&n(!!o),on(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const n=e._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=E0(e)),this.originValidationPromises[n]}get _shouldInitProactively(){return Xm()||Wm()||Jl()}}const H0=q0;var ef="@firebase/auth",tf="1.8.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class z0{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const n=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,n),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const n=this.internalListeners.get(e);n&&(this.internalListeners.delete(e),n(),this.updateProactiveRefresh())}assertAuthConfigured(){oe(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function W0(t){switch(t){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function K0(t){En(new sn("auth",(e,{options:n})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:o,authDomain:c}=r.options;oe(o&&!o.includes(":"),"invalid-api-key",{appName:r.name});const l={apiKey:o,authDomain:c,clientPlatform:t,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Zm(t)},h=new lA(r,s,i,l);return vA(h,n),h},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,n,r)=>{e.getProvider("auth-internal").initialize()})),En(new sn("auth-internal",e=>{const n=Wr(e.getProvider("auth").getImmediate());return(r=>new z0(r))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),Ht(ef,tf,W0(t)),Ht(ef,tf,"esm2017")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const G0=5*60,Q0=Rm("authIdTokenMaxAge")||G0;let nf=null;const Y0=t=>async e=>{const n=e&&await e.getIdTokenResult(),r=n&&(new Date().getTime()-Date.parse(n.issuedAtTime))/1e3;if(r&&r>Q0)return;const s=n==null?void 0:n.token;nf!==s&&(nf=s,await fetch(t,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function J0(t=Wl()){const e=zr(t,"auth");if(e.isInitialized())return e.getImmediate();const n=yA(t,{popupRedirectResolver:H0,persistence:[t0,qA,ug]}),r=Rm("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(r,location.origin);if(location.origin===i.origin){const o=Y0(i.toString());UA(n,o,()=>o(n.currentUser)),FA(n,c=>o(c))}}const s=Am("auth");return s&&EA(n,`http://${s}`),n}function X0(){var t,e;return(e=(t=document.getElementsByTagName("head"))===null||t===void 0?void 0:t[0])!==null&&e!==void 0?e:document}uA({loadJS(t){return new Promise((e,n)=>{const r=document.createElement("script");r.setAttribute("src",t),r.onload=e,r.onerror=s=>{const i=mn("internal-error");i.customData=s,n(i)},r.type="text/javascript",r.charset="UTF-8",X0().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});K0("Browser");var Z0="firebase",eb="11.0.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Ht(Z0,eb,"app");const _g="@firebase/installations",nu="0.6.10";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yg=1e4,vg=`w:${nu}`,Eg="FIS_v2",tb="https://firebaseinstallations.googleapis.com/v1",nb=60*60*1e3,rb="installations",sb="Installations";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ib={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},Ur=new Hr(rb,sb,ib);function Tg(t){return t instanceof cn&&t.code.includes("request-failed")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ig({projectId:t}){return`${tb}/projects/${t}/installations`}function wg(t){return{token:t.token,requestStatus:2,expiresIn:ab(t.expiresIn),creationTime:Date.now()}}async function Ag(t,e){const r=(await e.json()).error;return Ur.create("request-failed",{requestName:t,serverCode:r.code,serverMessage:r.message,serverStatus:r.status})}function bg({apiKey:t}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":t})}function ob(t,{refreshToken:e}){const n=bg(t);return n.append("Authorization",cb(e)),n}async function Rg(t){const e=await t();return e.status>=500&&e.status<600?t():e}function ab(t){return Number(t.replace("s","000"))}function cb(t){return`${Eg} ${t}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function lb({appConfig:t,heartbeatServiceProvider:e},{fid:n}){const r=Ig(t),s=bg(t),i=e.getImmediate({optional:!0});if(i){const h=await i.getHeartbeatsHeader();h&&s.append("x-firebase-client",h)}const o={fid:n,authVersion:Eg,appId:t.appId,sdkVersion:vg},c={method:"POST",headers:s,body:JSON.stringify(o)},l=await Rg(()=>fetch(r,c));if(l.ok){const h=await l.json();return{fid:h.fid||n,registrationStatus:2,refreshToken:h.refreshToken,authToken:wg(h.authToken)}}else throw await Ag("Create Installation",l)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Sg(t){return new Promise(e=>{setTimeout(e,t)})}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ub(t){return btoa(String.fromCharCode(...t)).replace(/\+/g,"-").replace(/\//g,"_")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hb=/^[cdef][\w-]{21}$/,ol="";function db(){try{const t=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(t),t[0]=112+t[0]%16;const n=fb(t);return hb.test(n)?n:ol}catch{return ol}}function fb(t){return ub(t).substr(0,22)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Sa(t){return`${t.appName}!${t.appId}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pg=new Map;function Cg(t,e){const n=Sa(t);kg(n,e),pb(n,e)}function kg(t,e){const n=Pg.get(t);if(n)for(const r of n)r(e)}function pb(t,e){const n=mb();n&&n.postMessage({key:t,fid:e}),gb()}let Cr=null;function mb(){return!Cr&&"BroadcastChannel"in self&&(Cr=new BroadcastChannel("[Firebase] FID Change"),Cr.onmessage=t=>{kg(t.data.key,t.data.fid)}),Cr}function gb(){Pg.size===0&&Cr&&(Cr.close(),Cr=null)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _b="firebase-installations-database",yb=1,Br="firebase-installations-store";let kc=null;function ru(){return kc||(kc=Vm(_b,yb,{upgrade:(t,e)=>{switch(e){case 0:t.createObjectStore(Br)}}})),kc}async function Qo(t,e){const n=Sa(t),s=(await ru()).transaction(Br,"readwrite"),i=s.objectStore(Br),o=await i.get(n);return await i.put(e,n),await s.done,(!o||o.fid!==e.fid)&&Cg(t,e.fid),e}async function Dg(t){const e=Sa(t),r=(await ru()).transaction(Br,"readwrite");await r.objectStore(Br).delete(e),await r.done}async function Pa(t,e){const n=Sa(t),s=(await ru()).transaction(Br,"readwrite"),i=s.objectStore(Br),o=await i.get(n),c=e(o);return c===void 0?await i.delete(n):await i.put(c,n),await s.done,c&&(!o||o.fid!==c.fid)&&Cg(t,c.fid),c}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function su(t){let e;const n=await Pa(t.appConfig,r=>{const s=vb(r),i=Eb(t,s);return e=i.registrationPromise,i.installationEntry});return n.fid===ol?{installationEntry:await e}:{installationEntry:n,registrationPromise:e}}function vb(t){const e=t||{fid:db(),registrationStatus:0};return Vg(e)}function Eb(t,e){if(e.registrationStatus===0){if(!navigator.onLine){const s=Promise.reject(Ur.create("app-offline"));return{installationEntry:e,registrationPromise:s}}const n={fid:e.fid,registrationStatus:1,registrationTime:Date.now()},r=Tb(t,n);return{installationEntry:n,registrationPromise:r}}else return e.registrationStatus===1?{installationEntry:e,registrationPromise:Ib(t)}:{installationEntry:e}}async function Tb(t,e){try{const n=await lb(t,e);return Qo(t.appConfig,n)}catch(n){throw Tg(n)&&n.customData.serverCode===409?await Dg(t.appConfig):await Qo(t.appConfig,{fid:e.fid,registrationStatus:0}),n}}async function Ib(t){let e=await rf(t.appConfig);for(;e.registrationStatus===1;)await Sg(100),e=await rf(t.appConfig);if(e.registrationStatus===0){const{installationEntry:n,registrationPromise:r}=await su(t);return r||n}return e}function rf(t){return Pa(t,e=>{if(!e)throw Ur.create("installation-not-found");return Vg(e)})}function Vg(t){return wb(t)?{fid:t.fid,registrationStatus:0}:t}function wb(t){return t.registrationStatus===1&&t.registrationTime+yg<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ab({appConfig:t,heartbeatServiceProvider:e},n){const r=bb(t,n),s=ob(t,n),i=e.getImmediate({optional:!0});if(i){const h=await i.getHeartbeatsHeader();h&&s.append("x-firebase-client",h)}const o={installation:{sdkVersion:vg,appId:t.appId}},c={method:"POST",headers:s,body:JSON.stringify(o)},l=await Rg(()=>fetch(r,c));if(l.ok){const h=await l.json();return wg(h)}else throw await Ag("Generate Auth Token",l)}function bb(t,{fid:e}){return`${Ig(t)}/${e}/authTokens:generate`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function iu(t,e=!1){let n;const r=await Pa(t.appConfig,i=>{if(!Og(i))throw Ur.create("not-registered");const o=i.authToken;if(!e&&Pb(o))return i;if(o.requestStatus===1)return n=Rb(t,e),i;{if(!navigator.onLine)throw Ur.create("app-offline");const c=kb(i);return n=Sb(t,c),c}});return n?await n:r.authToken}async function Rb(t,e){let n=await sf(t.appConfig);for(;n.authToken.requestStatus===1;)await Sg(100),n=await sf(t.appConfig);const r=n.authToken;return r.requestStatus===0?iu(t,e):r}function sf(t){return Pa(t,e=>{if(!Og(e))throw Ur.create("not-registered");const n=e.authToken;return Db(n)?Object.assign(Object.assign({},e),{authToken:{requestStatus:0}}):e})}async function Sb(t,e){try{const n=await Ab(t,e),r=Object.assign(Object.assign({},e),{authToken:n});return await Qo(t.appConfig,r),n}catch(n){if(Tg(n)&&(n.customData.serverCode===401||n.customData.serverCode===404))await Dg(t.appConfig);else{const r=Object.assign(Object.assign({},e),{authToken:{requestStatus:0}});await Qo(t.appConfig,r)}throw n}}function Og(t){return t!==void 0&&t.registrationStatus===2}function Pb(t){return t.requestStatus===2&&!Cb(t)}function Cb(t){const e=Date.now();return e<t.creationTime||t.creationTime+t.expiresIn<e+nb}function kb(t){const e={requestStatus:1,requestTime:Date.now()};return Object.assign(Object.assign({},t),{authToken:e})}function Db(t){return t.requestStatus===1&&t.requestTime+yg<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Vb(t){const e=t,{installationEntry:n,registrationPromise:r}=await su(e);return r?r.catch(console.error):iu(e).catch(console.error),n.fid}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ob(t,e=!1){const n=t;return await Nb(n),(await iu(n,e)).token}async function Nb(t){const{registrationPromise:e}=await su(t);e&&await e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xb(t){if(!t||!t.options)throw Dc("App Configuration");if(!t.name)throw Dc("App Name");const e=["projectId","apiKey","appId"];for(const n of e)if(!t.options[n])throw Dc(n);return{appName:t.name,projectId:t.options.projectId,apiKey:t.options.apiKey,appId:t.options.appId}}function Dc(t){return Ur.create("missing-app-config-values",{valueName:t})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ng="installations",Mb="installations-internal",Lb=t=>{const e=t.getProvider("app").getImmediate(),n=xb(e),r=zr(e,"heartbeat");return{app:e,appConfig:n,heartbeatServiceProvider:r,_delete:()=>Promise.resolve()}},Fb=t=>{const e=t.getProvider("app").getImmediate(),n=zr(e,Ng).getImmediate();return{getId:()=>Vb(n),getToken:s=>Ob(n,s)}};function Ub(){En(new sn(Ng,Lb,"PUBLIC")),En(new sn(Mb,Fb,"PRIVATE"))}Ub();Ht(_g,nu);Ht(_g,nu,"esm2017");/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yo="analytics",Bb="firebase_id",jb="origin",$b=60*1e3,qb="https://firebase.googleapis.com/v1alpha/projects/-/apps/{app-id}/webConfig",ou="https://www.googletagmanager.com/gtag/js";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Dt=new Ia("@firebase/analytics");/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hb={"already-exists":"A Firebase Analytics instance with the appId {$id}  already exists. Only one Firebase Analytics instance can be created for each appId.","already-initialized":"initializeAnalytics() cannot be called again with different options than those it was initially called with. It can be called again with the same options to return the existing instance, or getAnalytics() can be used to get a reference to the already-initialized instance.","already-initialized-settings":"Firebase Analytics has already been initialized.settings() must be called before initializing any Analytics instanceor it will have no effect.","interop-component-reg-failed":"Firebase Analytics Interop Component failed to instantiate: {$reason}","invalid-analytics-context":"Firebase Analytics is not supported in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","indexeddb-unavailable":"IndexedDB unavailable or restricted in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","fetch-throttle":"The config fetch request timed out while in an exponential backoff state. Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.","config-fetch-failed":"Dynamic config fetch failed: [{$httpStatus}] {$responseMessage}","no-api-key":'The "apiKey" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid API key.',"no-app-id":'The "appId" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid app ID.',"no-client-id":'The "client_id" field is empty.',"invalid-gtag-resource":"Trusted Types detected an invalid gtag resource: {$gtagURL}."},Ft=new Hr("analytics","Analytics",Hb);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zb(t){if(!t.startsWith(ou)){const e=Ft.create("invalid-gtag-resource",{gtagURL:t});return Dt.warn(e.message),""}return t}function xg(t){return Promise.all(t.map(e=>e.catch(n=>n)))}function Wb(t,e){let n;return window.trustedTypes&&(n=window.trustedTypes.createPolicy(t,e)),n}function Kb(t,e){const n=Wb("firebase-js-sdk-policy",{createScriptURL:zb}),r=document.createElement("script"),s=`${ou}?l=${t}&id=${e}`;r.src=n?n==null?void 0:n.createScriptURL(s):s,r.async=!0,document.head.appendChild(r)}function Gb(t){let e=[];return Array.isArray(window[t])?e=window[t]:window[t]=e,e}async function Qb(t,e,n,r,s,i){const o=r[s];try{if(o)await e[o];else{const l=(await xg(n)).find(h=>h.measurementId===s);l&&await e[l.appId]}}catch(c){Dt.error(c)}t("config",s,i)}async function Yb(t,e,n,r,s){try{let i=[];if(s&&s.send_to){let o=s.send_to;Array.isArray(o)||(o=[o]);const c=await xg(n);for(const l of o){const h=c.find(p=>p.measurementId===l),d=h&&e[h.appId];if(d)i.push(d);else{i=[];break}}}i.length===0&&(i=Object.values(e)),await Promise.all(i),t("event",r,s||{})}catch(i){Dt.error(i)}}function Jb(t,e,n,r){async function s(i,...o){try{if(i==="event"){const[c,l]=o;await Yb(t,e,n,c,l)}else if(i==="config"){const[c,l]=o;await Qb(t,e,n,r,c,l)}else if(i==="consent"){const[c,l]=o;t("consent",c,l)}else if(i==="get"){const[c,l,h]=o;t("get",c,l,h)}else if(i==="set"){const[c]=o;t("set",c)}else t(i,...o)}catch(c){Dt.error(c)}}return s}function Xb(t,e,n,r,s){let i=function(...o){window[r].push(arguments)};return window[s]&&typeof window[s]=="function"&&(i=window[s]),window[s]=Jb(i,t,e,n),{gtagCore:i,wrappedGtag:window[s]}}function Zb(t){const e=window.document.getElementsByTagName("script");for(const n of Object.values(e))if(n.src&&n.src.includes(ou)&&n.src.includes(t))return n;return null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const eR=30,tR=1e3;class nR{constructor(e={},n=tR){this.throttleMetadata=e,this.intervalMillis=n}getThrottleMetadata(e){return this.throttleMetadata[e]}setThrottleMetadata(e,n){this.throttleMetadata[e]=n}deleteThrottleMetadata(e){delete this.throttleMetadata[e]}}const Mg=new nR;function rR(t){return new Headers({Accept:"application/json","x-goog-api-key":t})}async function sR(t){var e;const{appId:n,apiKey:r}=t,s={method:"GET",headers:rR(r)},i=qb.replace("{app-id}",n),o=await fetch(i,s);if(o.status!==200&&o.status!==304){let c="";try{const l=await o.json();!((e=l.error)===null||e===void 0)&&e.message&&(c=l.error.message)}catch{}throw Ft.create("config-fetch-failed",{httpStatus:o.status,responseMessage:c})}return o.json()}async function iR(t,e=Mg,n){const{appId:r,apiKey:s,measurementId:i}=t.options;if(!r)throw Ft.create("no-app-id");if(!s){if(i)return{measurementId:i,appId:r};throw Ft.create("no-api-key")}const o=e.getThrottleMetadata(r)||{backoffCount:0,throttleEndTimeMillis:Date.now()},c=new cR;return setTimeout(async()=>{c.abort()},$b),Lg({appId:r,apiKey:s,measurementId:i},o,c,e)}async function Lg(t,{throttleEndTimeMillis:e,backoffCount:n},r,s=Mg){var i;const{appId:o,measurementId:c}=t;try{await oR(r,e)}catch(l){if(c)return Dt.warn(`Timed out fetching this Firebase app's measurement ID from the server. Falling back to the measurement ID ${c} provided in the "measurementId" field in the local Firebase config. [${l==null?void 0:l.message}]`),{appId:o,measurementId:c};throw l}try{const l=await sR(t);return s.deleteThrottleMetadata(o),l}catch(l){const h=l;if(!aR(h)){if(s.deleteThrottleMetadata(o),c)return Dt.warn(`Failed to fetch this Firebase app's measurement ID from the server. Falling back to the measurement ID ${c} provided in the "measurementId" field in the local Firebase config. [${h==null?void 0:h.message}]`),{appId:o,measurementId:c};throw l}const d=Number((i=h==null?void 0:h.customData)===null||i===void 0?void 0:i.httpStatus)===503?Cd(n,s.intervalMillis,eR):Cd(n,s.intervalMillis),p={throttleEndTimeMillis:Date.now()+d,backoffCount:n+1};return s.setThrottleMetadata(o,p),Dt.debug(`Calling attemptFetch again in ${d} millis`),Lg(t,p,r,s)}}function oR(t,e){return new Promise((n,r)=>{const s=Math.max(e-Date.now(),0),i=setTimeout(n,s);t.addEventListener(()=>{clearTimeout(i),r(Ft.create("fetch-throttle",{throttleEndTimeMillis:e}))})})}function aR(t){if(!(t instanceof cn)||!t.customData)return!1;const e=Number(t.customData.httpStatus);return e===429||e===500||e===503||e===504}class cR{constructor(){this.listeners=[]}addEventListener(e){this.listeners.push(e)}abort(){this.listeners.forEach(e=>e())}}async function lR(t,e,n,r,s){if(s&&s.global){t("event",n,r);return}else{const i=await e,o=Object.assign(Object.assign({},r),{send_to:i});t("event",n,o)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function uR(){if(Pm())try{await Cm()}catch(t){return Dt.warn(Ft.create("indexeddb-unavailable",{errorInfo:t==null?void 0:t.toString()}).message),!1}else return Dt.warn(Ft.create("indexeddb-unavailable",{errorInfo:"IndexedDB is not available in this environment."}).message),!1;return!0}async function hR(t,e,n,r,s,i,o){var c;const l=iR(t);l.then(_=>{n[_.measurementId]=_.appId,t.options.measurementId&&_.measurementId!==t.options.measurementId&&Dt.warn(`The measurement ID in the local Firebase config (${t.options.measurementId}) does not match the measurement ID fetched from the server (${_.measurementId}). To ensure analytics events are always sent to the correct Analytics property, update the measurement ID field in the local config or remove it from the local config.`)}).catch(_=>Dt.error(_)),e.push(l);const h=uR().then(_=>{if(_)return r.getId()}),[d,p]=await Promise.all([l,h]);Zb(i)||Kb(i,d.measurementId),s("js",new Date);const g=(c=o==null?void 0:o.config)!==null&&c!==void 0?c:{};return g[jb]="firebase",g.update=!0,p!=null&&(g[Bb]=p),s("config",d.measurementId,g),d.measurementId}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dR{constructor(e){this.app=e}_delete(){return delete gi[this.app.options.appId],Promise.resolve()}}let gi={},of=[];const af={};let Vc="dataLayer",fR="gtag",cf,Fg,lf=!1;function pR(){const t=[];if(Sm()&&t.push("This is a browser extension environment."),EI()||t.push("Cookies are not available."),t.length>0){const e=t.map((r,s)=>`(${s+1}) ${r}`).join(" "),n=Ft.create("invalid-analytics-context",{errorInfo:e});Dt.warn(n.message)}}function mR(t,e,n){pR();const r=t.options.appId;if(!r)throw Ft.create("no-app-id");if(!t.options.apiKey)if(t.options.measurementId)Dt.warn(`The "apiKey" field is empty in the local Firebase config. This is needed to fetch the latest measurement ID for this Firebase app. Falling back to the measurement ID ${t.options.measurementId} provided in the "measurementId" field in the local Firebase config.`);else throw Ft.create("no-api-key");if(gi[r]!=null)throw Ft.create("already-exists",{id:r});if(!lf){Gb(Vc);const{wrappedGtag:i,gtagCore:o}=Xb(gi,of,af,Vc,fR);Fg=i,cf=o,lf=!0}return gi[r]=hR(t,of,af,e,cf,Vc,n),new dR(t)}function gR(t=Wl()){t=Ke(t);const e=zr(t,Yo);return e.isInitialized()?e.getImmediate():_R(t)}function _R(t,e={}){const n=zr(t,Yo);if(n.isInitialized()){const s=n.getImmediate();if(Pi(e,n.getOptions()))return s;throw Ft.create("already-initialized")}return n.initialize({options:e})}function yR(t,e,n,r){t=Ke(t),lR(Fg,gi[t.app.options.appId],e,n,r).catch(s=>Dt.error(s))}const uf="@firebase/analytics",hf="0.10.9";function vR(){En(new sn(Yo,(e,{options:n})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("installations-internal").getImmediate();return mR(r,s,n)},"PUBLIC")),En(new sn("analytics-internal",t,"PRIVATE")),Ht(uf,hf),Ht(uf,hf,"esm2017");function t(e){try{const n=e.getProvider(Yo).getImmediate();return{logEvent:(r,s,i)=>yR(n,r,s,i)}}catch(n){throw Ft.create("interop-component-reg-failed",{reason:n})}}}vR();var df=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Nr,Ug;(function(){var t;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(w,v){function I(){}I.prototype=v.prototype,w.D=v.prototype,w.prototype=new I,w.prototype.constructor=w,w.C=function(A,b,R){for(var T=Array(arguments.length-2),Tt=2;Tt<arguments.length;Tt++)T[Tt-2]=arguments[Tt];return v.prototype[b].apply(A,T)}}function n(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(r,n),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(w,v,I){I||(I=0);var A=Array(16);if(typeof v=="string")for(var b=0;16>b;++b)A[b]=v.charCodeAt(I++)|v.charCodeAt(I++)<<8|v.charCodeAt(I++)<<16|v.charCodeAt(I++)<<24;else for(b=0;16>b;++b)A[b]=v[I++]|v[I++]<<8|v[I++]<<16|v[I++]<<24;v=w.g[0],I=w.g[1],b=w.g[2];var R=w.g[3],T=v+(R^I&(b^R))+A[0]+3614090360&4294967295;v=I+(T<<7&4294967295|T>>>25),T=R+(b^v&(I^b))+A[1]+3905402710&4294967295,R=v+(T<<12&4294967295|T>>>20),T=b+(I^R&(v^I))+A[2]+606105819&4294967295,b=R+(T<<17&4294967295|T>>>15),T=I+(v^b&(R^v))+A[3]+3250441966&4294967295,I=b+(T<<22&4294967295|T>>>10),T=v+(R^I&(b^R))+A[4]+4118548399&4294967295,v=I+(T<<7&4294967295|T>>>25),T=R+(b^v&(I^b))+A[5]+1200080426&4294967295,R=v+(T<<12&4294967295|T>>>20),T=b+(I^R&(v^I))+A[6]+2821735955&4294967295,b=R+(T<<17&4294967295|T>>>15),T=I+(v^b&(R^v))+A[7]+4249261313&4294967295,I=b+(T<<22&4294967295|T>>>10),T=v+(R^I&(b^R))+A[8]+1770035416&4294967295,v=I+(T<<7&4294967295|T>>>25),T=R+(b^v&(I^b))+A[9]+2336552879&4294967295,R=v+(T<<12&4294967295|T>>>20),T=b+(I^R&(v^I))+A[10]+4294925233&4294967295,b=R+(T<<17&4294967295|T>>>15),T=I+(v^b&(R^v))+A[11]+2304563134&4294967295,I=b+(T<<22&4294967295|T>>>10),T=v+(R^I&(b^R))+A[12]+1804603682&4294967295,v=I+(T<<7&4294967295|T>>>25),T=R+(b^v&(I^b))+A[13]+4254626195&4294967295,R=v+(T<<12&4294967295|T>>>20),T=b+(I^R&(v^I))+A[14]+2792965006&4294967295,b=R+(T<<17&4294967295|T>>>15),T=I+(v^b&(R^v))+A[15]+1236535329&4294967295,I=b+(T<<22&4294967295|T>>>10),T=v+(b^R&(I^b))+A[1]+4129170786&4294967295,v=I+(T<<5&4294967295|T>>>27),T=R+(I^b&(v^I))+A[6]+3225465664&4294967295,R=v+(T<<9&4294967295|T>>>23),T=b+(v^I&(R^v))+A[11]+643717713&4294967295,b=R+(T<<14&4294967295|T>>>18),T=I+(R^v&(b^R))+A[0]+3921069994&4294967295,I=b+(T<<20&4294967295|T>>>12),T=v+(b^R&(I^b))+A[5]+3593408605&4294967295,v=I+(T<<5&4294967295|T>>>27),T=R+(I^b&(v^I))+A[10]+38016083&4294967295,R=v+(T<<9&4294967295|T>>>23),T=b+(v^I&(R^v))+A[15]+3634488961&4294967295,b=R+(T<<14&4294967295|T>>>18),T=I+(R^v&(b^R))+A[4]+3889429448&4294967295,I=b+(T<<20&4294967295|T>>>12),T=v+(b^R&(I^b))+A[9]+568446438&4294967295,v=I+(T<<5&4294967295|T>>>27),T=R+(I^b&(v^I))+A[14]+3275163606&4294967295,R=v+(T<<9&4294967295|T>>>23),T=b+(v^I&(R^v))+A[3]+4107603335&4294967295,b=R+(T<<14&4294967295|T>>>18),T=I+(R^v&(b^R))+A[8]+1163531501&4294967295,I=b+(T<<20&4294967295|T>>>12),T=v+(b^R&(I^b))+A[13]+2850285829&4294967295,v=I+(T<<5&4294967295|T>>>27),T=R+(I^b&(v^I))+A[2]+4243563512&4294967295,R=v+(T<<9&4294967295|T>>>23),T=b+(v^I&(R^v))+A[7]+1735328473&4294967295,b=R+(T<<14&4294967295|T>>>18),T=I+(R^v&(b^R))+A[12]+2368359562&4294967295,I=b+(T<<20&4294967295|T>>>12),T=v+(I^b^R)+A[5]+4294588738&4294967295,v=I+(T<<4&4294967295|T>>>28),T=R+(v^I^b)+A[8]+2272392833&4294967295,R=v+(T<<11&4294967295|T>>>21),T=b+(R^v^I)+A[11]+1839030562&4294967295,b=R+(T<<16&4294967295|T>>>16),T=I+(b^R^v)+A[14]+4259657740&4294967295,I=b+(T<<23&4294967295|T>>>9),T=v+(I^b^R)+A[1]+2763975236&4294967295,v=I+(T<<4&4294967295|T>>>28),T=R+(v^I^b)+A[4]+1272893353&4294967295,R=v+(T<<11&4294967295|T>>>21),T=b+(R^v^I)+A[7]+4139469664&4294967295,b=R+(T<<16&4294967295|T>>>16),T=I+(b^R^v)+A[10]+3200236656&4294967295,I=b+(T<<23&4294967295|T>>>9),T=v+(I^b^R)+A[13]+681279174&4294967295,v=I+(T<<4&4294967295|T>>>28),T=R+(v^I^b)+A[0]+3936430074&4294967295,R=v+(T<<11&4294967295|T>>>21),T=b+(R^v^I)+A[3]+3572445317&4294967295,b=R+(T<<16&4294967295|T>>>16),T=I+(b^R^v)+A[6]+76029189&4294967295,I=b+(T<<23&4294967295|T>>>9),T=v+(I^b^R)+A[9]+3654602809&4294967295,v=I+(T<<4&4294967295|T>>>28),T=R+(v^I^b)+A[12]+3873151461&4294967295,R=v+(T<<11&4294967295|T>>>21),T=b+(R^v^I)+A[15]+530742520&4294967295,b=R+(T<<16&4294967295|T>>>16),T=I+(b^R^v)+A[2]+3299628645&4294967295,I=b+(T<<23&4294967295|T>>>9),T=v+(b^(I|~R))+A[0]+4096336452&4294967295,v=I+(T<<6&4294967295|T>>>26),T=R+(I^(v|~b))+A[7]+1126891415&4294967295,R=v+(T<<10&4294967295|T>>>22),T=b+(v^(R|~I))+A[14]+2878612391&4294967295,b=R+(T<<15&4294967295|T>>>17),T=I+(R^(b|~v))+A[5]+4237533241&4294967295,I=b+(T<<21&4294967295|T>>>11),T=v+(b^(I|~R))+A[12]+1700485571&4294967295,v=I+(T<<6&4294967295|T>>>26),T=R+(I^(v|~b))+A[3]+2399980690&4294967295,R=v+(T<<10&4294967295|T>>>22),T=b+(v^(R|~I))+A[10]+4293915773&4294967295,b=R+(T<<15&4294967295|T>>>17),T=I+(R^(b|~v))+A[1]+2240044497&4294967295,I=b+(T<<21&4294967295|T>>>11),T=v+(b^(I|~R))+A[8]+1873313359&4294967295,v=I+(T<<6&4294967295|T>>>26),T=R+(I^(v|~b))+A[15]+4264355552&4294967295,R=v+(T<<10&4294967295|T>>>22),T=b+(v^(R|~I))+A[6]+2734768916&4294967295,b=R+(T<<15&4294967295|T>>>17),T=I+(R^(b|~v))+A[13]+1309151649&4294967295,I=b+(T<<21&4294967295|T>>>11),T=v+(b^(I|~R))+A[4]+4149444226&4294967295,v=I+(T<<6&4294967295|T>>>26),T=R+(I^(v|~b))+A[11]+3174756917&4294967295,R=v+(T<<10&4294967295|T>>>22),T=b+(v^(R|~I))+A[2]+718787259&4294967295,b=R+(T<<15&4294967295|T>>>17),T=I+(R^(b|~v))+A[9]+3951481745&4294967295,w.g[0]=w.g[0]+v&4294967295,w.g[1]=w.g[1]+(b+(T<<21&4294967295|T>>>11))&4294967295,w.g[2]=w.g[2]+b&4294967295,w.g[3]=w.g[3]+R&4294967295}r.prototype.u=function(w,v){v===void 0&&(v=w.length);for(var I=v-this.blockSize,A=this.B,b=this.h,R=0;R<v;){if(b==0)for(;R<=I;)s(this,w,R),R+=this.blockSize;if(typeof w=="string"){for(;R<v;)if(A[b++]=w.charCodeAt(R++),b==this.blockSize){s(this,A),b=0;break}}else for(;R<v;)if(A[b++]=w[R++],b==this.blockSize){s(this,A),b=0;break}}this.h=b,this.o+=v},r.prototype.v=function(){var w=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);w[0]=128;for(var v=1;v<w.length-8;++v)w[v]=0;var I=8*this.o;for(v=w.length-8;v<w.length;++v)w[v]=I&255,I/=256;for(this.u(w),w=Array(16),v=I=0;4>v;++v)for(var A=0;32>A;A+=8)w[I++]=this.g[v]>>>A&255;return w};function i(w,v){var I=c;return Object.prototype.hasOwnProperty.call(I,w)?I[w]:I[w]=v(w)}function o(w,v){this.h=v;for(var I=[],A=!0,b=w.length-1;0<=b;b--){var R=w[b]|0;A&&R==v||(I[b]=R,A=!1)}this.g=I}var c={};function l(w){return-128<=w&&128>w?i(w,function(v){return new o([v|0],0>v?-1:0)}):new o([w|0],0>w?-1:0)}function h(w){if(isNaN(w)||!isFinite(w))return p;if(0>w)return D(h(-w));for(var v=[],I=1,A=0;w>=I;A++)v[A]=w/I|0,I*=4294967296;return new o(v,0)}function d(w,v){if(w.length==0)throw Error("number format error: empty string");if(v=v||10,2>v||36<v)throw Error("radix out of range: "+v);if(w.charAt(0)=="-")return D(d(w.substring(1),v));if(0<=w.indexOf("-"))throw Error('number format error: interior "-" character');for(var I=h(Math.pow(v,8)),A=p,b=0;b<w.length;b+=8){var R=Math.min(8,w.length-b),T=parseInt(w.substring(b,b+R),v);8>R?(R=h(Math.pow(v,R)),A=A.j(R).add(h(T))):(A=A.j(I),A=A.add(h(T)))}return A}var p=l(0),g=l(1),_=l(16777216);t=o.prototype,t.m=function(){if(k(this))return-D(this).m();for(var w=0,v=1,I=0;I<this.g.length;I++){var A=this.i(I);w+=(0<=A?A:4294967296+A)*v,v*=4294967296}return w},t.toString=function(w){if(w=w||10,2>w||36<w)throw Error("radix out of range: "+w);if(P(this))return"0";if(k(this))return"-"+D(this).toString(w);for(var v=h(Math.pow(w,6)),I=this,A="";;){var b=q(I,v).g;I=x(I,b.j(v));var R=((0<I.g.length?I.g[0]:I.h)>>>0).toString(w);if(I=b,P(I))return R+A;for(;6>R.length;)R="0"+R;A=R+A}},t.i=function(w){return 0>w?0:w<this.g.length?this.g[w]:this.h};function P(w){if(w.h!=0)return!1;for(var v=0;v<w.g.length;v++)if(w.g[v]!=0)return!1;return!0}function k(w){return w.h==-1}t.l=function(w){return w=x(this,w),k(w)?-1:P(w)?0:1};function D(w){for(var v=w.g.length,I=[],A=0;A<v;A++)I[A]=~w.g[A];return new o(I,~w.h).add(g)}t.abs=function(){return k(this)?D(this):this},t.add=function(w){for(var v=Math.max(this.g.length,w.g.length),I=[],A=0,b=0;b<=v;b++){var R=A+(this.i(b)&65535)+(w.i(b)&65535),T=(R>>>16)+(this.i(b)>>>16)+(w.i(b)>>>16);A=T>>>16,R&=65535,T&=65535,I[b]=T<<16|R}return new o(I,I[I.length-1]&-2147483648?-1:0)};function x(w,v){return w.add(D(v))}t.j=function(w){if(P(this)||P(w))return p;if(k(this))return k(w)?D(this).j(D(w)):D(D(this).j(w));if(k(w))return D(this.j(D(w)));if(0>this.l(_)&&0>w.l(_))return h(this.m()*w.m());for(var v=this.g.length+w.g.length,I=[],A=0;A<2*v;A++)I[A]=0;for(A=0;A<this.g.length;A++)for(var b=0;b<w.g.length;b++){var R=this.i(A)>>>16,T=this.i(A)&65535,Tt=w.i(b)>>>16,Bt=w.i(b)&65535;I[2*A+2*b]+=T*Bt,F(I,2*A+2*b),I[2*A+2*b+1]+=R*Bt,F(I,2*A+2*b+1),I[2*A+2*b+1]+=T*Tt,F(I,2*A+2*b+1),I[2*A+2*b+2]+=R*Tt,F(I,2*A+2*b+2)}for(A=0;A<v;A++)I[A]=I[2*A+1]<<16|I[2*A];for(A=v;A<2*v;A++)I[A]=0;return new o(I,0)};function F(w,v){for(;(w[v]&65535)!=w[v];)w[v+1]+=w[v]>>>16,w[v]&=65535,v++}function $(w,v){this.g=w,this.h=v}function q(w,v){if(P(v))throw Error("division by zero");if(P(w))return new $(p,p);if(k(w))return v=q(D(w),v),new $(D(v.g),D(v.h));if(k(v))return v=q(w,D(v)),new $(D(v.g),v.h);if(30<w.g.length){if(k(w)||k(v))throw Error("slowDivide_ only works with positive integers.");for(var I=g,A=v;0>=A.l(w);)I=ce(I),A=ce(A);var b=le(I,1),R=le(A,1);for(A=le(A,2),I=le(I,2);!P(A);){var T=R.add(A);0>=T.l(w)&&(b=b.add(I),R=T),A=le(A,1),I=le(I,1)}return v=x(w,b.j(v)),new $(b,v)}for(b=p;0<=w.l(v);){for(I=Math.max(1,Math.floor(w.m()/v.m())),A=Math.ceil(Math.log(I)/Math.LN2),A=48>=A?1:Math.pow(2,A-48),R=h(I),T=R.j(v);k(T)||0<T.l(w);)I-=A,R=h(I),T=R.j(v);P(R)&&(R=g),b=b.add(R),w=x(w,T)}return new $(b,w)}t.A=function(w){return q(this,w).h},t.and=function(w){for(var v=Math.max(this.g.length,w.g.length),I=[],A=0;A<v;A++)I[A]=this.i(A)&w.i(A);return new o(I,this.h&w.h)},t.or=function(w){for(var v=Math.max(this.g.length,w.g.length),I=[],A=0;A<v;A++)I[A]=this.i(A)|w.i(A);return new o(I,this.h|w.h)},t.xor=function(w){for(var v=Math.max(this.g.length,w.g.length),I=[],A=0;A<v;A++)I[A]=this.i(A)^w.i(A);return new o(I,this.h^w.h)};function ce(w){for(var v=w.g.length+1,I=[],A=0;A<v;A++)I[A]=w.i(A)<<1|w.i(A-1)>>>31;return new o(I,w.h)}function le(w,v){var I=v>>5;v%=32;for(var A=w.g.length-I,b=[],R=0;R<A;R++)b[R]=0<v?w.i(R+I)>>>v|w.i(R+I+1)<<32-v:w.i(R+I);return new o(b,w.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,Ug=r,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.A,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=h,o.fromString=d,Nr=o}).apply(typeof df<"u"?df:typeof self<"u"?self:typeof window<"u"?window:{});var _o=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Bg,ri,jg,Po,al,$g,qg,Hg;(function(){var t,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(a,u,f){return a==Array.prototype||a==Object.prototype||(a[u]=f.value),a};function n(a){a=[typeof globalThis=="object"&&globalThis,a,typeof window=="object"&&window,typeof self=="object"&&self,typeof _o=="object"&&_o];for(var u=0;u<a.length;++u){var f=a[u];if(f&&f.Math==Math)return f}throw Error("Cannot find global object")}var r=n(this);function s(a,u){if(u)e:{var f=r;a=a.split(".");for(var m=0;m<a.length-1;m++){var S=a[m];if(!(S in f))break e;f=f[S]}a=a[a.length-1],m=f[a],u=u(m),u!=m&&u!=null&&e(f,a,{configurable:!0,writable:!0,value:u})}}function i(a,u){a instanceof String&&(a+="");var f=0,m=!1,S={next:function(){if(!m&&f<a.length){var V=f++;return{value:u(V,a[V]),done:!1}}return m=!0,{done:!0,value:void 0}}};return S[Symbol.iterator]=function(){return S},S}s("Array.prototype.values",function(a){return a||function(){return i(this,function(u,f){return f})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var o=o||{},c=this||self;function l(a){var u=typeof a;return u=u!="object"?u:a?Array.isArray(a)?"array":u:"null",u=="array"||u=="object"&&typeof a.length=="number"}function h(a){var u=typeof a;return u=="object"&&a!=null||u=="function"}function d(a,u,f){return a.call.apply(a.bind,arguments)}function p(a,u,f){if(!a)throw Error();if(2<arguments.length){var m=Array.prototype.slice.call(arguments,2);return function(){var S=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(S,m),a.apply(u,S)}}return function(){return a.apply(u,arguments)}}function g(a,u,f){return g=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?d:p,g.apply(null,arguments)}function _(a,u){var f=Array.prototype.slice.call(arguments,1);return function(){var m=f.slice();return m.push.apply(m,arguments),a.apply(this,m)}}function P(a,u){function f(){}f.prototype=u.prototype,a.aa=u.prototype,a.prototype=new f,a.prototype.constructor=a,a.Qb=function(m,S,V){for(var K=Array(arguments.length-2),Oe=2;Oe<arguments.length;Oe++)K[Oe-2]=arguments[Oe];return u.prototype[S].apply(m,K)}}function k(a){const u=a.length;if(0<u){const f=Array(u);for(let m=0;m<u;m++)f[m]=a[m];return f}return[]}function D(a,u){for(let f=1;f<arguments.length;f++){const m=arguments[f];if(l(m)){const S=a.length||0,V=m.length||0;a.length=S+V;for(let K=0;K<V;K++)a[S+K]=m[K]}else a.push(m)}}class x{constructor(u,f){this.i=u,this.j=f,this.h=0,this.g=null}get(){let u;return 0<this.h?(this.h--,u=this.g,this.g=u.next,u.next=null):u=this.i(),u}}function F(a){return/^[\s\xa0]*$/.test(a)}function $(){var a=c.navigator;return a&&(a=a.userAgent)?a:""}function q(a){return q[" "](a),a}q[" "]=function(){};var ce=$().indexOf("Gecko")!=-1&&!($().toLowerCase().indexOf("webkit")!=-1&&$().indexOf("Edge")==-1)&&!($().indexOf("Trident")!=-1||$().indexOf("MSIE")!=-1)&&$().indexOf("Edge")==-1;function le(a,u,f){for(const m in a)u.call(f,a[m],m,a)}function w(a,u){for(const f in a)u.call(void 0,a[f],f,a)}function v(a){const u={};for(const f in a)u[f]=a[f];return u}const I="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function A(a,u){let f,m;for(let S=1;S<arguments.length;S++){m=arguments[S];for(f in m)a[f]=m[f];for(let V=0;V<I.length;V++)f=I[V],Object.prototype.hasOwnProperty.call(m,f)&&(a[f]=m[f])}}function b(a){var u=1;a=a.split(":");const f=[];for(;0<u&&a.length;)f.push(a.shift()),u--;return a.length&&f.push(a.join(":")),f}function R(a){c.setTimeout(()=>{throw a},0)}function T(){var a=Vt;let u=null;return a.g&&(u=a.g,a.g=a.g.next,a.g||(a.h=null),u.next=null),u}class Tt{constructor(){this.h=this.g=null}add(u,f){const m=Bt.get();m.set(u,f),this.h?this.h.next=m:this.g=m,this.h=m}}var Bt=new x(()=>new Ge,a=>a.reset());class Ge{constructor(){this.next=this.g=this.h=null}set(u,f){this.h=u,this.g=f,this.next=null}reset(){this.next=this.g=this.h=null}}let ve,ge=!1,Vt=new Tt,Kt=()=>{const a=c.Promise.resolve(void 0);ve=()=>{a.then(jt)}};var jt=()=>{for(var a;a=T();){try{a.h.call(a.g)}catch(f){R(f)}var u=Bt;u.j(a),100>u.h&&(u.h++,a.next=u.g,u.g=a)}ge=!1};function Be(){this.s=this.s,this.C=this.C}Be.prototype.s=!1,Be.prototype.ma=function(){this.s||(this.s=!0,this.N())},Be.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function je(a,u){this.type=a,this.g=this.target=u,this.defaultPrevented=!1}je.prototype.h=function(){this.defaultPrevented=!0};var Bn=function(){if(!c.addEventListener||!Object.defineProperty)return!1;var a=!1,u=Object.defineProperty({},"passive",{get:function(){a=!0}});try{const f=()=>{};c.addEventListener("test",f,u),c.removeEventListener("test",f,u)}catch{}return a}();function ln(a,u){if(je.call(this,a?a.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,a){var f=this.type=a.type,m=a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:null;if(this.target=a.target||a.srcElement,this.g=u,u=a.relatedTarget){if(ce){e:{try{q(u.nodeName);var S=!0;break e}catch{}S=!1}S||(u=null)}}else f=="mouseover"?u=a.fromElement:f=="mouseout"&&(u=a.toElement);this.relatedTarget=u,m?(this.clientX=m.clientX!==void 0?m.clientX:m.pageX,this.clientY=m.clientY!==void 0?m.clientY:m.pageY,this.screenX=m.screenX||0,this.screenY=m.screenY||0):(this.clientX=a.clientX!==void 0?a.clientX:a.pageX,this.clientY=a.clientY!==void 0?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0),this.button=a.button,this.key=a.key||"",this.ctrlKey=a.ctrlKey,this.altKey=a.altKey,this.shiftKey=a.shiftKey,this.metaKey=a.metaKey,this.pointerId=a.pointerId||0,this.pointerType=typeof a.pointerType=="string"?a.pointerType:St[a.pointerType]||"",this.state=a.state,this.i=a,a.defaultPrevented&&ln.aa.h.call(this)}}P(ln,je);var St={2:"touch",3:"pen",4:"mouse"};ln.prototype.h=function(){ln.aa.h.call(this);var a=this.i;a.preventDefault?a.preventDefault():a.returnValue=!1};var N="closure_listenable_"+(1e6*Math.random()|0),J=0;function Q(a,u,f,m,S){this.listener=a,this.proxy=null,this.src=u,this.type=f,this.capture=!!m,this.ha=S,this.key=++J,this.da=this.fa=!1}function ee(a){a.da=!0,a.listener=null,a.proxy=null,a.src=null,a.ha=null}function Ee(a){this.src=a,this.g={},this.h=0}Ee.prototype.add=function(a,u,f,m,S){var V=a.toString();a=this.g[V],a||(a=this.g[V]=[],this.h++);var K=y(a,u,m,S);return-1<K?(u=a[K],f||(u.fa=!1)):(u=new Q(u,this.src,V,!!m,S),u.fa=f,a.push(u)),u};function Ve(a,u){var f=u.type;if(f in a.g){var m=a.g[f],S=Array.prototype.indexOf.call(m,u,void 0),V;(V=0<=S)&&Array.prototype.splice.call(m,S,1),V&&(ee(u),a.g[f].length==0&&(delete a.g[f],a.h--))}}function y(a,u,f,m){for(var S=0;S<a.length;++S){var V=a[S];if(!V.da&&V.listener==u&&V.capture==!!f&&V.ha==m)return S}return-1}var E="closure_lm_"+(1e6*Math.random()|0),C={};function U(a,u,f,m,S){if(Array.isArray(u)){for(var V=0;V<u.length;V++)U(a,u[V],f,m,S);return null}return f=ne(f),a&&a[N]?a.K(u,f,h(m)?!!m.capture:!!m,S):O(a,u,f,!1,m,S)}function O(a,u,f,m,S,V){if(!u)throw Error("Invalid event type");var K=h(S)?!!S.capture:!!S,Oe=se(a);if(Oe||(a[E]=Oe=new Ee(a)),f=Oe.add(u,f,m,K,V),f.proxy)return f;if(m=B(),f.proxy=m,m.src=a,m.listener=f,a.addEventListener)Bn||(S=K),S===void 0&&(S=!1),a.addEventListener(u.toString(),m,S);else if(a.attachEvent)a.attachEvent(H(u.toString()),m);else if(a.addListener&&a.removeListener)a.addListener(m);else throw Error("addEventListener and attachEvent are unavailable.");return f}function B(){function a(f){return u.call(a.src,a.listener,f)}const u=j;return a}function G(a,u,f,m,S){if(Array.isArray(u))for(var V=0;V<u.length;V++)G(a,u[V],f,m,S);else m=h(m)?!!m.capture:!!m,f=ne(f),a&&a[N]?(a=a.i,u=String(u).toString(),u in a.g&&(V=a.g[u],f=y(V,f,m,S),-1<f&&(ee(V[f]),Array.prototype.splice.call(V,f,1),V.length==0&&(delete a.g[u],a.h--)))):a&&(a=se(a))&&(u=a.g[u.toString()],a=-1,u&&(a=y(u,f,m,S)),(f=-1<a?u[a]:null)&&z(f))}function z(a){if(typeof a!="number"&&a&&!a.da){var u=a.src;if(u&&u[N])Ve(u.i,a);else{var f=a.type,m=a.proxy;u.removeEventListener?u.removeEventListener(f,m,a.capture):u.detachEvent?u.detachEvent(H(f),m):u.addListener&&u.removeListener&&u.removeListener(m),(f=se(u))?(Ve(f,a),f.h==0&&(f.src=null,u[E]=null)):ee(a)}}}function H(a){return a in C?C[a]:C[a]="on"+a}function j(a,u){if(a.da)a=!0;else{u=new ln(u,this);var f=a.listener,m=a.ha||a.src;a.fa&&z(a),a=f.call(m,u)}return a}function se(a){return a=a[E],a instanceof Ee?a:null}var Y="__closure_events_fn_"+(1e9*Math.random()>>>0);function ne(a){return typeof a=="function"?a:(a[Y]||(a[Y]=function(u){return a.handleEvent(u)}),a[Y])}function te(){Be.call(this),this.i=new Ee(this),this.M=this,this.F=null}P(te,Be),te.prototype[N]=!0,te.prototype.removeEventListener=function(a,u,f,m){G(this,a,u,f,m)};function ie(a,u){var f,m=a.F;if(m)for(f=[];m;m=m.F)f.push(m);if(a=a.M,m=u.type||u,typeof u=="string")u=new je(u,a);else if(u instanceof je)u.target=u.target||a;else{var S=u;u=new je(m,a),A(u,S)}if(S=!0,f)for(var V=f.length-1;0<=V;V--){var K=u.g=f[V];S=Se(K,m,!0,u)&&S}if(K=u.g=a,S=Se(K,m,!0,u)&&S,S=Se(K,m,!1,u)&&S,f)for(V=0;V<f.length;V++)K=u.g=f[V],S=Se(K,m,!1,u)&&S}te.prototype.N=function(){if(te.aa.N.call(this),this.i){var a=this.i,u;for(u in a.g){for(var f=a.g[u],m=0;m<f.length;m++)ee(f[m]);delete a.g[u],a.h--}}this.F=null},te.prototype.K=function(a,u,f,m){return this.i.add(String(a),u,!1,f,m)},te.prototype.L=function(a,u,f,m){return this.i.add(String(a),u,!0,f,m)};function Se(a,u,f,m){if(u=a.i.g[String(u)],!u)return!0;u=u.concat();for(var S=!0,V=0;V<u.length;++V){var K=u[V];if(K&&!K.da&&K.capture==f){var Oe=K.listener,it=K.ha||K.src;K.fa&&Ve(a.i,K),S=Oe.call(it,m)!==!1&&S}}return S&&!m.defaultPrevented}function we(a,u,f){if(typeof a=="function")f&&(a=g(a,f));else if(a&&typeof a.handleEvent=="function")a=g(a.handleEvent,a);else throw Error("Invalid listener argument");return 2147483647<Number(u)?-1:c.setTimeout(a,u||0)}function ut(a){a.g=we(()=>{a.g=null,a.i&&(a.i=!1,ut(a))},a.l);const u=a.h;a.h=null,a.m.apply(null,u)}class Ze extends Be{constructor(u,f){super(),this.m=u,this.l=f,this.h=null,this.i=!1,this.g=null}j(u){this.h=arguments,this.g?this.i=!0:ut(this)}N(){super.N(),this.g&&(c.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function st(a){Be.call(this),this.h=a,this.g={}}P(st,Be);var ht=[];function jn(a){le(a.g,function(u,f){this.g.hasOwnProperty(f)&&z(u)},a),a.g={}}st.prototype.N=function(){st.aa.N.call(this),jn(this)},st.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Qr=c.JSON.stringify,It=c.JSON.parse,$t=class{stringify(a){return c.JSON.stringify(a,void 0)}parse(a){return c.JSON.parse(a,void 0)}};function Yr(){}Yr.prototype.h=null;function zu(a){return a.h||(a.h=a.i())}function Wu(){}var Us={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function Qa(){je.call(this,"d")}P(Qa,je);function Ya(){je.call(this,"c")}P(Ya,je);var Tr={},Ku=null;function Ji(){return Ku=Ku||new te}Tr.La="serverreachability";function Gu(a){je.call(this,Tr.La,a)}P(Gu,je);function Bs(a){const u=Ji();ie(u,new Gu(u))}Tr.STAT_EVENT="statevent";function Qu(a,u){je.call(this,Tr.STAT_EVENT,a),this.stat=u}P(Qu,je);function wt(a){const u=Ji();ie(u,new Qu(u,a))}Tr.Ma="timingevent";function Yu(a,u){je.call(this,Tr.Ma,a),this.size=u}P(Yu,je);function js(a,u){if(typeof a!="function")throw Error("Fn must not be null and must be a function");return c.setTimeout(function(){a()},u)}function $s(){this.g=!0}$s.prototype.xa=function(){this.g=!1};function ly(a,u,f,m,S,V){a.info(function(){if(a.g)if(V)for(var K="",Oe=V.split("&"),it=0;it<Oe.length;it++){var Ae=Oe[it].split("=");if(1<Ae.length){var dt=Ae[0];Ae=Ae[1];var ft=dt.split("_");K=2<=ft.length&&ft[1]=="type"?K+(dt+"="+Ae+"&"):K+(dt+"=redacted&")}}else K=null;else K=V;return"XMLHTTP REQ ("+m+") [attempt "+S+"]: "+u+`
`+f+`
`+K})}function uy(a,u,f,m,S,V,K){a.info(function(){return"XMLHTTP RESP ("+m+") [ attempt "+S+"]: "+u+`
`+f+`
`+V+" "+K})}function Jr(a,u,f,m){a.info(function(){return"XMLHTTP TEXT ("+u+"): "+dy(a,f)+(m?" "+m:"")})}function hy(a,u){a.info(function(){return"TIMEOUT: "+u})}$s.prototype.info=function(){};function dy(a,u){if(!a.g)return u;if(!u)return null;try{var f=JSON.parse(u);if(f){for(a=0;a<f.length;a++)if(Array.isArray(f[a])){var m=f[a];if(!(2>m.length)){var S=m[1];if(Array.isArray(S)&&!(1>S.length)){var V=S[0];if(V!="noop"&&V!="stop"&&V!="close")for(var K=1;K<S.length;K++)S[K]=""}}}}return Qr(f)}catch{return u}}var Xi={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},Ju={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},Ja;function Zi(){}P(Zi,Yr),Zi.prototype.g=function(){return new XMLHttpRequest},Zi.prototype.i=function(){return{}},Ja=new Zi;function $n(a,u,f,m){this.j=a,this.i=u,this.l=f,this.R=m||1,this.U=new st(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new Xu}function Xu(){this.i=null,this.g="",this.h=!1}var Zu={},Xa={};function Za(a,u,f){a.L=1,a.v=ro(wn(u)),a.m=f,a.P=!0,eh(a,null)}function eh(a,u){a.F=Date.now(),eo(a),a.A=wn(a.v);var f=a.A,m=a.R;Array.isArray(m)||(m=[String(m)]),ph(f.i,"t",m),a.C=0,f=a.j.J,a.h=new Xu,a.g=Vh(a.j,f?u:null,!a.m),0<a.O&&(a.M=new Ze(g(a.Y,a,a.g),a.O)),u=a.U,f=a.g,m=a.ca;var S="readystatechange";Array.isArray(S)||(S&&(ht[0]=S.toString()),S=ht);for(var V=0;V<S.length;V++){var K=U(f,S[V],m||u.handleEvent,!1,u.h||u);if(!K)break;u.g[K.key]=K}u=a.H?v(a.H):{},a.m?(a.u||(a.u="POST"),u["Content-Type"]="application/x-www-form-urlencoded",a.g.ea(a.A,a.u,a.m,u)):(a.u="GET",a.g.ea(a.A,a.u,null,u)),Bs(),ly(a.i,a.u,a.A,a.l,a.R,a.m)}$n.prototype.ca=function(a){a=a.target;const u=this.M;u&&An(a)==3?u.j():this.Y(a)},$n.prototype.Y=function(a){try{if(a==this.g)e:{const ft=An(this.g);var u=this.g.Ba();const es=this.g.Z();if(!(3>ft)&&(ft!=3||this.g&&(this.h.h||this.g.oa()||Th(this.g)))){this.J||ft!=4||u==7||(u==8||0>=es?Bs(3):Bs(2)),ec(this);var f=this.g.Z();this.X=f;t:if(th(this)){var m=Th(this.g);a="";var S=m.length,V=An(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){Ir(this),qs(this);var K="";break t}this.h.i=new c.TextDecoder}for(u=0;u<S;u++)this.h.h=!0,a+=this.h.i.decode(m[u],{stream:!(V&&u==S-1)});m.length=0,this.h.g+=a,this.C=0,K=this.h.g}else K=this.g.oa();if(this.o=f==200,uy(this.i,this.u,this.A,this.l,this.R,ft,f),this.o){if(this.T&&!this.K){t:{if(this.g){var Oe,it=this.g;if((Oe=it.g?it.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!F(Oe)){var Ae=Oe;break t}}Ae=null}if(f=Ae)Jr(this.i,this.l,f,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,tc(this,f);else{this.o=!1,this.s=3,wt(12),Ir(this),qs(this);break e}}if(this.P){f=!0;let Gt;for(;!this.J&&this.C<K.length;)if(Gt=fy(this,K),Gt==Xa){ft==4&&(this.s=4,wt(14),f=!1),Jr(this.i,this.l,null,"[Incomplete Response]");break}else if(Gt==Zu){this.s=4,wt(15),Jr(this.i,this.l,K,"[Invalid Chunk]"),f=!1;break}else Jr(this.i,this.l,Gt,null),tc(this,Gt);if(th(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),ft!=4||K.length!=0||this.h.h||(this.s=1,wt(16),f=!1),this.o=this.o&&f,!f)Jr(this.i,this.l,K,"[Invalid Chunked Response]"),Ir(this),qs(this);else if(0<K.length&&!this.W){this.W=!0;var dt=this.j;dt.g==this&&dt.ba&&!dt.M&&(dt.j.info("Great, no buffering proxy detected. Bytes received: "+K.length),ac(dt),dt.M=!0,wt(11))}}else Jr(this.i,this.l,K,null),tc(this,K);ft==4&&Ir(this),this.o&&!this.J&&(ft==4?Ph(this.j,this):(this.o=!1,eo(this)))}else ky(this.g),f==400&&0<K.indexOf("Unknown SID")?(this.s=3,wt(12)):(this.s=0,wt(13)),Ir(this),qs(this)}}}catch{}finally{}};function th(a){return a.g?a.u=="GET"&&a.L!=2&&a.j.Ca:!1}function fy(a,u){var f=a.C,m=u.indexOf(`
`,f);return m==-1?Xa:(f=Number(u.substring(f,m)),isNaN(f)?Zu:(m+=1,m+f>u.length?Xa:(u=u.slice(m,m+f),a.C=m+f,u)))}$n.prototype.cancel=function(){this.J=!0,Ir(this)};function eo(a){a.S=Date.now()+a.I,nh(a,a.I)}function nh(a,u){if(a.B!=null)throw Error("WatchDog timer not null");a.B=js(g(a.ba,a),u)}function ec(a){a.B&&(c.clearTimeout(a.B),a.B=null)}$n.prototype.ba=function(){this.B=null;const a=Date.now();0<=a-this.S?(hy(this.i,this.A),this.L!=2&&(Bs(),wt(17)),Ir(this),this.s=2,qs(this)):nh(this,this.S-a)};function qs(a){a.j.G==0||a.J||Ph(a.j,a)}function Ir(a){ec(a);var u=a.M;u&&typeof u.ma=="function"&&u.ma(),a.M=null,jn(a.U),a.g&&(u=a.g,a.g=null,u.abort(),u.ma())}function tc(a,u){try{var f=a.j;if(f.G!=0&&(f.g==a||nc(f.h,a))){if(!a.K&&nc(f.h,a)&&f.G==3){try{var m=f.Da.g.parse(u)}catch{m=null}if(Array.isArray(m)&&m.length==3){var S=m;if(S[0]==0){e:if(!f.u){if(f.g)if(f.g.F+3e3<a.F)lo(f),ao(f);else break e;oc(f),wt(18)}}else f.za=S[1],0<f.za-f.T&&37500>S[2]&&f.F&&f.v==0&&!f.C&&(f.C=js(g(f.Za,f),6e3));if(1>=ih(f.h)&&f.ca){try{f.ca()}catch{}f.ca=void 0}}else Ar(f,11)}else if((a.K||f.g==a)&&lo(f),!F(u))for(S=f.Da.g.parse(u),u=0;u<S.length;u++){let Ae=S[u];if(f.T=Ae[0],Ae=Ae[1],f.G==2)if(Ae[0]=="c"){f.K=Ae[1],f.ia=Ae[2];const dt=Ae[3];dt!=null&&(f.la=dt,f.j.info("VER="+f.la));const ft=Ae[4];ft!=null&&(f.Aa=ft,f.j.info("SVER="+f.Aa));const es=Ae[5];es!=null&&typeof es=="number"&&0<es&&(m=1.5*es,f.L=m,f.j.info("backChannelRequestTimeoutMs_="+m)),m=f;const Gt=a.g;if(Gt){const ho=Gt.g?Gt.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(ho){var V=m.h;V.g||ho.indexOf("spdy")==-1&&ho.indexOf("quic")==-1&&ho.indexOf("h2")==-1||(V.j=V.l,V.g=new Set,V.h&&(rc(V,V.h),V.h=null))}if(m.D){const cc=Gt.g?Gt.g.getResponseHeader("X-HTTP-Session-Id"):null;cc&&(m.ya=cc,Le(m.I,m.D,cc))}}f.G=3,f.l&&f.l.ua(),f.ba&&(f.R=Date.now()-a.F,f.j.info("Handshake RTT: "+f.R+"ms")),m=f;var K=a;if(m.qa=Dh(m,m.J?m.ia:null,m.W),K.K){oh(m.h,K);var Oe=K,it=m.L;it&&(Oe.I=it),Oe.B&&(ec(Oe),eo(Oe)),m.g=K}else Rh(m);0<f.i.length&&co(f)}else Ae[0]!="stop"&&Ae[0]!="close"||Ar(f,7);else f.G==3&&(Ae[0]=="stop"||Ae[0]=="close"?Ae[0]=="stop"?Ar(f,7):ic(f):Ae[0]!="noop"&&f.l&&f.l.ta(Ae),f.v=0)}}Bs(4)}catch{}}var py=class{constructor(a,u){this.g=a,this.map=u}};function rh(a){this.l=a||10,c.PerformanceNavigationTiming?(a=c.performance.getEntriesByType("navigation"),a=0<a.length&&(a[0].nextHopProtocol=="hq"||a[0].nextHopProtocol=="h2")):a=!!(c.chrome&&c.chrome.loadTimes&&c.chrome.loadTimes()&&c.chrome.loadTimes().wasFetchedViaSpdy),this.j=a?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function sh(a){return a.h?!0:a.g?a.g.size>=a.j:!1}function ih(a){return a.h?1:a.g?a.g.size:0}function nc(a,u){return a.h?a.h==u:a.g?a.g.has(u):!1}function rc(a,u){a.g?a.g.add(u):a.h=u}function oh(a,u){a.h&&a.h==u?a.h=null:a.g&&a.g.has(u)&&a.g.delete(u)}rh.prototype.cancel=function(){if(this.i=ah(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const a of this.g.values())a.cancel();this.g.clear()}};function ah(a){if(a.h!=null)return a.i.concat(a.h.D);if(a.g!=null&&a.g.size!==0){let u=a.i;for(const f of a.g.values())u=u.concat(f.D);return u}return k(a.i)}function my(a){if(a.V&&typeof a.V=="function")return a.V();if(typeof Map<"u"&&a instanceof Map||typeof Set<"u"&&a instanceof Set)return Array.from(a.values());if(typeof a=="string")return a.split("");if(l(a)){for(var u=[],f=a.length,m=0;m<f;m++)u.push(a[m]);return u}u=[],f=0;for(m in a)u[f++]=a[m];return u}function gy(a){if(a.na&&typeof a.na=="function")return a.na();if(!a.V||typeof a.V!="function"){if(typeof Map<"u"&&a instanceof Map)return Array.from(a.keys());if(!(typeof Set<"u"&&a instanceof Set)){if(l(a)||typeof a=="string"){var u=[];a=a.length;for(var f=0;f<a;f++)u.push(f);return u}u=[],f=0;for(const m in a)u[f++]=m;return u}}}function ch(a,u){if(a.forEach&&typeof a.forEach=="function")a.forEach(u,void 0);else if(l(a)||typeof a=="string")Array.prototype.forEach.call(a,u,void 0);else for(var f=gy(a),m=my(a),S=m.length,V=0;V<S;V++)u.call(void 0,m[V],f&&f[V],a)}var lh=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function _y(a,u){if(a){a=a.split("&");for(var f=0;f<a.length;f++){var m=a[f].indexOf("="),S=null;if(0<=m){var V=a[f].substring(0,m);S=a[f].substring(m+1)}else V=a[f];u(V,S?decodeURIComponent(S.replace(/\+/g," ")):"")}}}function wr(a){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,a instanceof wr){this.h=a.h,to(this,a.j),this.o=a.o,this.g=a.g,no(this,a.s),this.l=a.l;var u=a.i,f=new Ws;f.i=u.i,u.g&&(f.g=new Map(u.g),f.h=u.h),uh(this,f),this.m=a.m}else a&&(u=String(a).match(lh))?(this.h=!1,to(this,u[1]||"",!0),this.o=Hs(u[2]||""),this.g=Hs(u[3]||"",!0),no(this,u[4]),this.l=Hs(u[5]||"",!0),uh(this,u[6]||"",!0),this.m=Hs(u[7]||"")):(this.h=!1,this.i=new Ws(null,this.h))}wr.prototype.toString=function(){var a=[],u=this.j;u&&a.push(zs(u,hh,!0),":");var f=this.g;return(f||u=="file")&&(a.push("//"),(u=this.o)&&a.push(zs(u,hh,!0),"@"),a.push(encodeURIComponent(String(f)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),f=this.s,f!=null&&a.push(":",String(f))),(f=this.l)&&(this.g&&f.charAt(0)!="/"&&a.push("/"),a.push(zs(f,f.charAt(0)=="/"?Ey:vy,!0))),(f=this.i.toString())&&a.push("?",f),(f=this.m)&&a.push("#",zs(f,Iy)),a.join("")};function wn(a){return new wr(a)}function to(a,u,f){a.j=f?Hs(u,!0):u,a.j&&(a.j=a.j.replace(/:$/,""))}function no(a,u){if(u){if(u=Number(u),isNaN(u)||0>u)throw Error("Bad port number "+u);a.s=u}else a.s=null}function uh(a,u,f){u instanceof Ws?(a.i=u,wy(a.i,a.h)):(f||(u=zs(u,Ty)),a.i=new Ws(u,a.h))}function Le(a,u,f){a.i.set(u,f)}function ro(a){return Le(a,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),a}function Hs(a,u){return a?u?decodeURI(a.replace(/%25/g,"%2525")):decodeURIComponent(a):""}function zs(a,u,f){return typeof a=="string"?(a=encodeURI(a).replace(u,yy),f&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null}function yy(a){return a=a.charCodeAt(0),"%"+(a>>4&15).toString(16)+(a&15).toString(16)}var hh=/[#\/\?@]/g,vy=/[#\?:]/g,Ey=/[#\?]/g,Ty=/[#\?@]/g,Iy=/#/g;function Ws(a,u){this.h=this.g=null,this.i=a||null,this.j=!!u}function qn(a){a.g||(a.g=new Map,a.h=0,a.i&&_y(a.i,function(u,f){a.add(decodeURIComponent(u.replace(/\+/g," ")),f)}))}t=Ws.prototype,t.add=function(a,u){qn(this),this.i=null,a=Xr(this,a);var f=this.g.get(a);return f||this.g.set(a,f=[]),f.push(u),this.h+=1,this};function dh(a,u){qn(a),u=Xr(a,u),a.g.has(u)&&(a.i=null,a.h-=a.g.get(u).length,a.g.delete(u))}function fh(a,u){return qn(a),u=Xr(a,u),a.g.has(u)}t.forEach=function(a,u){qn(this),this.g.forEach(function(f,m){f.forEach(function(S){a.call(u,S,m,this)},this)},this)},t.na=function(){qn(this);const a=Array.from(this.g.values()),u=Array.from(this.g.keys()),f=[];for(let m=0;m<u.length;m++){const S=a[m];for(let V=0;V<S.length;V++)f.push(u[m])}return f},t.V=function(a){qn(this);let u=[];if(typeof a=="string")fh(this,a)&&(u=u.concat(this.g.get(Xr(this,a))));else{a=Array.from(this.g.values());for(let f=0;f<a.length;f++)u=u.concat(a[f])}return u},t.set=function(a,u){return qn(this),this.i=null,a=Xr(this,a),fh(this,a)&&(this.h-=this.g.get(a).length),this.g.set(a,[u]),this.h+=1,this},t.get=function(a,u){return a?(a=this.V(a),0<a.length?String(a[0]):u):u};function ph(a,u,f){dh(a,u),0<f.length&&(a.i=null,a.g.set(Xr(a,u),k(f)),a.h+=f.length)}t.toString=function(){if(this.i)return this.i;if(!this.g)return"";const a=[],u=Array.from(this.g.keys());for(var f=0;f<u.length;f++){var m=u[f];const V=encodeURIComponent(String(m)),K=this.V(m);for(m=0;m<K.length;m++){var S=V;K[m]!==""&&(S+="="+encodeURIComponent(String(K[m]))),a.push(S)}}return this.i=a.join("&")};function Xr(a,u){return u=String(u),a.j&&(u=u.toLowerCase()),u}function wy(a,u){u&&!a.j&&(qn(a),a.i=null,a.g.forEach(function(f,m){var S=m.toLowerCase();m!=S&&(dh(this,m),ph(this,S,f))},a)),a.j=u}function Ay(a,u){const f=new $s;if(c.Image){const m=new Image;m.onload=_(Hn,f,"TestLoadImage: loaded",!0,u,m),m.onerror=_(Hn,f,"TestLoadImage: error",!1,u,m),m.onabort=_(Hn,f,"TestLoadImage: abort",!1,u,m),m.ontimeout=_(Hn,f,"TestLoadImage: timeout",!1,u,m),c.setTimeout(function(){m.ontimeout&&m.ontimeout()},1e4),m.src=a}else u(!1)}function by(a,u){const f=new $s,m=new AbortController,S=setTimeout(()=>{m.abort(),Hn(f,"TestPingServer: timeout",!1,u)},1e4);fetch(a,{signal:m.signal}).then(V=>{clearTimeout(S),V.ok?Hn(f,"TestPingServer: ok",!0,u):Hn(f,"TestPingServer: server error",!1,u)}).catch(()=>{clearTimeout(S),Hn(f,"TestPingServer: error",!1,u)})}function Hn(a,u,f,m,S){try{S&&(S.onload=null,S.onerror=null,S.onabort=null,S.ontimeout=null),m(f)}catch{}}function Ry(){this.g=new $t}function Sy(a,u,f){const m=f||"";try{ch(a,function(S,V){let K=S;h(S)&&(K=Qr(S)),u.push(m+V+"="+encodeURIComponent(K))})}catch(S){throw u.push(m+"type="+encodeURIComponent("_badmap")),S}}function so(a){this.l=a.Ub||null,this.j=a.eb||!1}P(so,Yr),so.prototype.g=function(){return new io(this.l,this.j)},so.prototype.i=function(a){return function(){return a}}({});function io(a,u){te.call(this),this.D=a,this.o=u,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}P(io,te),t=io.prototype,t.open=function(a,u){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=a,this.A=u,this.readyState=1,Gs(this)},t.send=function(a){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const u={headers:this.u,method:this.B,credentials:this.m,cache:void 0};a&&(u.body=a),(this.D||c).fetch(new Request(this.A,u)).then(this.Sa.bind(this),this.ga.bind(this))},t.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,Ks(this)),this.readyState=0},t.Sa=function(a){if(this.g&&(this.l=a,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=a.headers,this.readyState=2,Gs(this)),this.g&&(this.readyState=3,Gs(this),this.g)))if(this.responseType==="arraybuffer")a.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof c.ReadableStream<"u"&&"body"in a){if(this.j=a.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;mh(this)}else a.text().then(this.Ra.bind(this),this.ga.bind(this))};function mh(a){a.j.read().then(a.Pa.bind(a)).catch(a.ga.bind(a))}t.Pa=function(a){if(this.g){if(this.o&&a.value)this.response.push(a.value);else if(!this.o){var u=a.value?a.value:new Uint8Array(0);(u=this.v.decode(u,{stream:!a.done}))&&(this.response=this.responseText+=u)}a.done?Ks(this):Gs(this),this.readyState==3&&mh(this)}},t.Ra=function(a){this.g&&(this.response=this.responseText=a,Ks(this))},t.Qa=function(a){this.g&&(this.response=a,Ks(this))},t.ga=function(){this.g&&Ks(this)};function Ks(a){a.readyState=4,a.l=null,a.j=null,a.v=null,Gs(a)}t.setRequestHeader=function(a,u){this.u.append(a,u)},t.getResponseHeader=function(a){return this.h&&this.h.get(a.toLowerCase())||""},t.getAllResponseHeaders=function(){if(!this.h)return"";const a=[],u=this.h.entries();for(var f=u.next();!f.done;)f=f.value,a.push(f[0]+": "+f[1]),f=u.next();return a.join(`\r
`)};function Gs(a){a.onreadystatechange&&a.onreadystatechange.call(a)}Object.defineProperty(io.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(a){this.m=a?"include":"same-origin"}});function gh(a){let u="";return le(a,function(f,m){u+=m,u+=":",u+=f,u+=`\r
`}),u}function sc(a,u,f){e:{for(m in f){var m=!1;break e}m=!0}m||(f=gh(f),typeof a=="string"?f!=null&&encodeURIComponent(String(f)):Le(a,u,f))}function He(a){te.call(this),this.headers=new Map,this.o=a||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}P(He,te);var Py=/^https?$/i,Cy=["POST","PUT"];t=He.prototype,t.Ha=function(a){this.J=a},t.ea=function(a,u,f,m){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+a);u=u?u.toUpperCase():"GET",this.D=a,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():Ja.g(),this.v=this.o?zu(this.o):zu(Ja),this.g.onreadystatechange=g(this.Ea,this);try{this.B=!0,this.g.open(u,String(a),!0),this.B=!1}catch(V){_h(this,V);return}if(a=f||"",f=new Map(this.headers),m)if(Object.getPrototypeOf(m)===Object.prototype)for(var S in m)f.set(S,m[S]);else if(typeof m.keys=="function"&&typeof m.get=="function")for(const V of m.keys())f.set(V,m.get(V));else throw Error("Unknown input type for opt_headers: "+String(m));m=Array.from(f.keys()).find(V=>V.toLowerCase()=="content-type"),S=c.FormData&&a instanceof c.FormData,!(0<=Array.prototype.indexOf.call(Cy,u,void 0))||m||S||f.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[V,K]of f)this.g.setRequestHeader(V,K);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{Eh(this),this.u=!0,this.g.send(a),this.u=!1}catch(V){_h(this,V)}};function _h(a,u){a.h=!1,a.g&&(a.j=!0,a.g.abort(),a.j=!1),a.l=u,a.m=5,yh(a),oo(a)}function yh(a){a.A||(a.A=!0,ie(a,"complete"),ie(a,"error"))}t.abort=function(a){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=a||7,ie(this,"complete"),ie(this,"abort"),oo(this))},t.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),oo(this,!0)),He.aa.N.call(this)},t.Ea=function(){this.s||(this.B||this.u||this.j?vh(this):this.bb())},t.bb=function(){vh(this)};function vh(a){if(a.h&&typeof o<"u"&&(!a.v[1]||An(a)!=4||a.Z()!=2)){if(a.u&&An(a)==4)we(a.Ea,0,a);else if(ie(a,"readystatechange"),An(a)==4){a.h=!1;try{const K=a.Z();e:switch(K){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var u=!0;break e;default:u=!1}var f;if(!(f=u)){var m;if(m=K===0){var S=String(a.D).match(lh)[1]||null;!S&&c.self&&c.self.location&&(S=c.self.location.protocol.slice(0,-1)),m=!Py.test(S?S.toLowerCase():"")}f=m}if(f)ie(a,"complete"),ie(a,"success");else{a.m=6;try{var V=2<An(a)?a.g.statusText:""}catch{V=""}a.l=V+" ["+a.Z()+"]",yh(a)}}finally{oo(a)}}}}function oo(a,u){if(a.g){Eh(a);const f=a.g,m=a.v[0]?()=>{}:null;a.g=null,a.v=null,u||ie(a,"ready");try{f.onreadystatechange=m}catch{}}}function Eh(a){a.I&&(c.clearTimeout(a.I),a.I=null)}t.isActive=function(){return!!this.g};function An(a){return a.g?a.g.readyState:0}t.Z=function(){try{return 2<An(this)?this.g.status:-1}catch{return-1}},t.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},t.Oa=function(a){if(this.g){var u=this.g.responseText;return a&&u.indexOf(a)==0&&(u=u.substring(a.length)),It(u)}};function Th(a){try{if(!a.g)return null;if("response"in a.g)return a.g.response;switch(a.H){case"":case"text":return a.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in a.g)return a.g.mozResponseArrayBuffer}return null}catch{return null}}function ky(a){const u={};a=(a.g&&2<=An(a)&&a.g.getAllResponseHeaders()||"").split(`\r
`);for(let m=0;m<a.length;m++){if(F(a[m]))continue;var f=b(a[m]);const S=f[0];if(f=f[1],typeof f!="string")continue;f=f.trim();const V=u[S]||[];u[S]=V,V.push(f)}w(u,function(m){return m.join(", ")})}t.Ba=function(){return this.m},t.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function Qs(a,u,f){return f&&f.internalChannelParams&&f.internalChannelParams[a]||u}function Ih(a){this.Aa=0,this.i=[],this.j=new $s,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=Qs("failFast",!1,a),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=Qs("baseRetryDelayMs",5e3,a),this.cb=Qs("retryDelaySeedMs",1e4,a),this.Wa=Qs("forwardChannelMaxRetries",2,a),this.wa=Qs("forwardChannelRequestTimeoutMs",2e4,a),this.pa=a&&a.xmlHttpFactory||void 0,this.Xa=a&&a.Tb||void 0,this.Ca=a&&a.useFetchStreams||!1,this.L=void 0,this.J=a&&a.supportsCrossDomainXhr||!1,this.K="",this.h=new rh(a&&a.concurrentRequestLimit),this.Da=new Ry,this.P=a&&a.fastHandshake||!1,this.O=a&&a.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=a&&a.Rb||!1,a&&a.xa&&this.j.xa(),a&&a.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&a&&a.detectBufferingProxy||!1,this.ja=void 0,a&&a.longPollingTimeout&&0<a.longPollingTimeout&&(this.ja=a.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}t=Ih.prototype,t.la=8,t.G=1,t.connect=function(a,u,f,m){wt(0),this.W=a,this.H=u||{},f&&m!==void 0&&(this.H.OSID=f,this.H.OAID=m),this.F=this.X,this.I=Dh(this,null,this.W),co(this)};function ic(a){if(wh(a),a.G==3){var u=a.U++,f=wn(a.I);if(Le(f,"SID",a.K),Le(f,"RID",u),Le(f,"TYPE","terminate"),Ys(a,f),u=new $n(a,a.j,u),u.L=2,u.v=ro(wn(f)),f=!1,c.navigator&&c.navigator.sendBeacon)try{f=c.navigator.sendBeacon(u.v.toString(),"")}catch{}!f&&c.Image&&(new Image().src=u.v,f=!0),f||(u.g=Vh(u.j,null),u.g.ea(u.v)),u.F=Date.now(),eo(u)}kh(a)}function ao(a){a.g&&(ac(a),a.g.cancel(),a.g=null)}function wh(a){ao(a),a.u&&(c.clearTimeout(a.u),a.u=null),lo(a),a.h.cancel(),a.s&&(typeof a.s=="number"&&c.clearTimeout(a.s),a.s=null)}function co(a){if(!sh(a.h)&&!a.s){a.s=!0;var u=a.Ga;ve||Kt(),ge||(ve(),ge=!0),Vt.add(u,a),a.B=0}}function Dy(a,u){return ih(a.h)>=a.h.j-(a.s?1:0)?!1:a.s?(a.i=u.D.concat(a.i),!0):a.G==1||a.G==2||a.B>=(a.Va?0:a.Wa)?!1:(a.s=js(g(a.Ga,a,u),Ch(a,a.B)),a.B++,!0)}t.Ga=function(a){if(this.s)if(this.s=null,this.G==1){if(!a){this.U=Math.floor(1e5*Math.random()),a=this.U++;const S=new $n(this,this.j,a);let V=this.o;if(this.S&&(V?(V=v(V),A(V,this.S)):V=this.S),this.m!==null||this.O||(S.H=V,V=null),this.P)e:{for(var u=0,f=0;f<this.i.length;f++){t:{var m=this.i[f];if("__data__"in m.map&&(m=m.map.__data__,typeof m=="string")){m=m.length;break t}m=void 0}if(m===void 0)break;if(u+=m,4096<u){u=f;break e}if(u===4096||f===this.i.length-1){u=f+1;break e}}u=1e3}else u=1e3;u=bh(this,S,u),f=wn(this.I),Le(f,"RID",a),Le(f,"CVER",22),this.D&&Le(f,"X-HTTP-Session-Id",this.D),Ys(this,f),V&&(this.O?u="headers="+encodeURIComponent(String(gh(V)))+"&"+u:this.m&&sc(f,this.m,V)),rc(this.h,S),this.Ua&&Le(f,"TYPE","init"),this.P?(Le(f,"$req",u),Le(f,"SID","null"),S.T=!0,Za(S,f,null)):Za(S,f,u),this.G=2}}else this.G==3&&(a?Ah(this,a):this.i.length==0||sh(this.h)||Ah(this))};function Ah(a,u){var f;u?f=u.l:f=a.U++;const m=wn(a.I);Le(m,"SID",a.K),Le(m,"RID",f),Le(m,"AID",a.T),Ys(a,m),a.m&&a.o&&sc(m,a.m,a.o),f=new $n(a,a.j,f,a.B+1),a.m===null&&(f.H=a.o),u&&(a.i=u.D.concat(a.i)),u=bh(a,f,1e3),f.I=Math.round(.5*a.wa)+Math.round(.5*a.wa*Math.random()),rc(a.h,f),Za(f,m,u)}function Ys(a,u){a.H&&le(a.H,function(f,m){Le(u,m,f)}),a.l&&ch({},function(f,m){Le(u,m,f)})}function bh(a,u,f){f=Math.min(a.i.length,f);var m=a.l?g(a.l.Na,a.l,a):null;e:{var S=a.i;let V=-1;for(;;){const K=["count="+f];V==-1?0<f?(V=S[0].g,K.push("ofs="+V)):V=0:K.push("ofs="+V);let Oe=!0;for(let it=0;it<f;it++){let Ae=S[it].g;const dt=S[it].map;if(Ae-=V,0>Ae)V=Math.max(0,S[it].g-100),Oe=!1;else try{Sy(dt,K,"req"+Ae+"_")}catch{m&&m(dt)}}if(Oe){m=K.join("&");break e}}}return a=a.i.splice(0,f),u.D=a,m}function Rh(a){if(!a.g&&!a.u){a.Y=1;var u=a.Fa;ve||Kt(),ge||(ve(),ge=!0),Vt.add(u,a),a.v=0}}function oc(a){return a.g||a.u||3<=a.v?!1:(a.Y++,a.u=js(g(a.Fa,a),Ch(a,a.v)),a.v++,!0)}t.Fa=function(){if(this.u=null,Sh(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var a=2*this.R;this.j.info("BP detection timer enabled: "+a),this.A=js(g(this.ab,this),a)}},t.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,wt(10),ao(this),Sh(this))};function ac(a){a.A!=null&&(c.clearTimeout(a.A),a.A=null)}function Sh(a){a.g=new $n(a,a.j,"rpc",a.Y),a.m===null&&(a.g.H=a.o),a.g.O=0;var u=wn(a.qa);Le(u,"RID","rpc"),Le(u,"SID",a.K),Le(u,"AID",a.T),Le(u,"CI",a.F?"0":"1"),!a.F&&a.ja&&Le(u,"TO",a.ja),Le(u,"TYPE","xmlhttp"),Ys(a,u),a.m&&a.o&&sc(u,a.m,a.o),a.L&&(a.g.I=a.L);var f=a.g;a=a.ia,f.L=1,f.v=ro(wn(u)),f.m=null,f.P=!0,eh(f,a)}t.Za=function(){this.C!=null&&(this.C=null,ao(this),oc(this),wt(19))};function lo(a){a.C!=null&&(c.clearTimeout(a.C),a.C=null)}function Ph(a,u){var f=null;if(a.g==u){lo(a),ac(a),a.g=null;var m=2}else if(nc(a.h,u))f=u.D,oh(a.h,u),m=1;else return;if(a.G!=0){if(u.o)if(m==1){f=u.m?u.m.length:0,u=Date.now()-u.F;var S=a.B;m=Ji(),ie(m,new Yu(m,f)),co(a)}else Rh(a);else if(S=u.s,S==3||S==0&&0<u.X||!(m==1&&Dy(a,u)||m==2&&oc(a)))switch(f&&0<f.length&&(u=a.h,u.i=u.i.concat(f)),S){case 1:Ar(a,5);break;case 4:Ar(a,10);break;case 3:Ar(a,6);break;default:Ar(a,2)}}}function Ch(a,u){let f=a.Ta+Math.floor(Math.random()*a.cb);return a.isActive()||(f*=2),f*u}function Ar(a,u){if(a.j.info("Error code "+u),u==2){var f=g(a.fb,a),m=a.Xa;const S=!m;m=new wr(m||"//www.google.com/images/cleardot.gif"),c.location&&c.location.protocol=="http"||to(m,"https"),ro(m),S?Ay(m.toString(),f):by(m.toString(),f)}else wt(2);a.G=0,a.l&&a.l.sa(u),kh(a),wh(a)}t.fb=function(a){a?(this.j.info("Successfully pinged google.com"),wt(2)):(this.j.info("Failed to ping google.com"),wt(1))};function kh(a){if(a.G=0,a.ka=[],a.l){const u=ah(a.h);(u.length!=0||a.i.length!=0)&&(D(a.ka,u),D(a.ka,a.i),a.h.i.length=0,k(a.i),a.i.length=0),a.l.ra()}}function Dh(a,u,f){var m=f instanceof wr?wn(f):new wr(f);if(m.g!="")u&&(m.g=u+"."+m.g),no(m,m.s);else{var S=c.location;m=S.protocol,u=u?u+"."+S.hostname:S.hostname,S=+S.port;var V=new wr(null);m&&to(V,m),u&&(V.g=u),S&&no(V,S),f&&(V.l=f),m=V}return f=a.D,u=a.ya,f&&u&&Le(m,f,u),Le(m,"VER",a.la),Ys(a,m),m}function Vh(a,u,f){if(u&&!a.J)throw Error("Can't create secondary domain capable XhrIo object.");return u=a.Ca&&!a.pa?new He(new so({eb:f})):new He(a.pa),u.Ha(a.J),u}t.isActive=function(){return!!this.l&&this.l.isActive(this)};function Oh(){}t=Oh.prototype,t.ua=function(){},t.ta=function(){},t.sa=function(){},t.ra=function(){},t.isActive=function(){return!0},t.Na=function(){};function uo(){}uo.prototype.g=function(a,u){return new Ot(a,u)};function Ot(a,u){te.call(this),this.g=new Ih(u),this.l=a,this.h=u&&u.messageUrlParams||null,a=u&&u.messageHeaders||null,u&&u.clientProtocolHeaderRequired&&(a?a["X-Client-Protocol"]="webchannel":a={"X-Client-Protocol":"webchannel"}),this.g.o=a,a=u&&u.initMessageHeaders||null,u&&u.messageContentType&&(a?a["X-WebChannel-Content-Type"]=u.messageContentType:a={"X-WebChannel-Content-Type":u.messageContentType}),u&&u.va&&(a?a["X-WebChannel-Client-Profile"]=u.va:a={"X-WebChannel-Client-Profile":u.va}),this.g.S=a,(a=u&&u.Sb)&&!F(a)&&(this.g.m=a),this.v=u&&u.supportsCrossDomainXhr||!1,this.u=u&&u.sendRawJson||!1,(u=u&&u.httpSessionIdParam)&&!F(u)&&(this.g.D=u,a=this.h,a!==null&&u in a&&(a=this.h,u in a&&delete a[u])),this.j=new Zr(this)}P(Ot,te),Ot.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},Ot.prototype.close=function(){ic(this.g)},Ot.prototype.o=function(a){var u=this.g;if(typeof a=="string"){var f={};f.__data__=a,a=f}else this.u&&(f={},f.__data__=Qr(a),a=f);u.i.push(new py(u.Ya++,a)),u.G==3&&co(u)},Ot.prototype.N=function(){this.g.l=null,delete this.j,ic(this.g),delete this.g,Ot.aa.N.call(this)};function Nh(a){Qa.call(this),a.__headers__&&(this.headers=a.__headers__,this.statusCode=a.__status__,delete a.__headers__,delete a.__status__);var u=a.__sm__;if(u){e:{for(const f in u){a=f;break e}a=void 0}(this.i=a)&&(a=this.i,u=u!==null&&a in u?u[a]:void 0),this.data=u}else this.data=a}P(Nh,Qa);function xh(){Ya.call(this),this.status=1}P(xh,Ya);function Zr(a){this.g=a}P(Zr,Oh),Zr.prototype.ua=function(){ie(this.g,"a")},Zr.prototype.ta=function(a){ie(this.g,new Nh(a))},Zr.prototype.sa=function(a){ie(this.g,new xh)},Zr.prototype.ra=function(){ie(this.g,"b")},uo.prototype.createWebChannel=uo.prototype.g,Ot.prototype.send=Ot.prototype.o,Ot.prototype.open=Ot.prototype.m,Ot.prototype.close=Ot.prototype.close,Hg=function(){return new uo},qg=function(){return Ji()},$g=Tr,al={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},Xi.NO_ERROR=0,Xi.TIMEOUT=8,Xi.HTTP_ERROR=6,Po=Xi,Ju.COMPLETE="complete",jg=Ju,Wu.EventType=Us,Us.OPEN="a",Us.CLOSE="b",Us.ERROR="c",Us.MESSAGE="d",te.prototype.listen=te.prototype.K,ri=Wu,He.prototype.listenOnce=He.prototype.L,He.prototype.getLastError=He.prototype.Ka,He.prototype.getLastErrorCode=He.prototype.Ba,He.prototype.getStatus=He.prototype.Z,He.prototype.getResponseJson=He.prototype.Oa,He.prototype.getResponseText=He.prototype.oa,He.prototype.send=He.prototype.ea,He.prototype.setWithCredentials=He.prototype.Ha,Bg=He}).apply(typeof _o<"u"?_o:typeof self<"u"?self:typeof window<"u"?window:{});const ff="@firebase/firestore";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mt{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}mt.UNAUTHENTICATED=new mt(null),mt.GOOGLE_CREDENTIALS=new mt("google-credentials-uid"),mt.FIRST_PARTY=new mt("first-party-uid"),mt.MOCK_USER=new mt("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Os="11.0.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jr=new Ia("@firebase/firestore");function ss(){return jr.logLevel}function X(t,...e){if(jr.logLevel<=_e.DEBUG){const n=e.map(au);jr.debug(`Firestore (${Os}): ${t}`,...n)}}function Mn(t,...e){if(jr.logLevel<=_e.ERROR){const n=e.map(au);jr.error(`Firestore (${Os}): ${t}`,...n)}}function Is(t,...e){if(jr.logLevel<=_e.WARN){const n=e.map(au);jr.warn(`Firestore (${Os}): ${t}`,...n)}}function au(t){if(typeof t=="string")return t;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return function(n){return JSON.stringify(n)}(t)}catch{return t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ae(t="Unexpected state"){const e=`FIRESTORE (${Os}) INTERNAL ASSERTION FAILED: `+t;throw Mn(e),new Error(e)}function ke(t,e){t||ae()}function de(t,e){return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const M={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class Z extends cn{constructor(e,n){super(e,n),this.code=e,this.message=n,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class On{constructor(){this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zg{constructor(e,n){this.user=n,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class ER{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,n){e.enqueueRetryable(()=>n(mt.UNAUTHENTICATED))}shutdown(){}}class TR{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,n){this.changeListener=n,e.enqueueRetryable(()=>n(this.token.user))}shutdown(){this.changeListener=null}}class IR{constructor(e){this.t=e,this.currentUser=mt.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,n){ke(this.o===void 0);let r=this.i;const s=l=>this.i!==r?(r=this.i,n(l)):Promise.resolve();let i=new On;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new On,e.enqueueRetryable(()=>s(this.currentUser))};const o=()=>{const l=i;e.enqueueRetryable(async()=>{await l.promise,await s(this.currentUser)})},c=l=>{X("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=l,this.o&&(this.auth.addAuthTokenListener(this.o),o())};this.t.onInit(l=>c(l)),setTimeout(()=>{if(!this.auth){const l=this.t.getImmediate({optional:!0});l?c(l):(X("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new On)}},0),o()}getToken(){const e=this.i,n=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(n).then(r=>this.i!==e?(X("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(ke(typeof r.accessToken=="string"),new zg(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return ke(e===null||typeof e=="string"),new mt(e)}}class wR{constructor(e,n,r){this.l=e,this.h=n,this.P=r,this.type="FirstParty",this.user=mt.FIRST_PARTY,this.I=new Map}T(){return this.P?this.P():null}get headers(){this.I.set("X-Goog-AuthUser",this.l);const e=this.T();return e&&this.I.set("Authorization",e),this.h&&this.I.set("X-Goog-Iam-Authorization-Token",this.h),this.I}}class AR{constructor(e,n,r){this.l=e,this.h=n,this.P=r}getToken(){return Promise.resolve(new wR(this.l,this.h,this.P))}start(e,n){e.enqueueRetryable(()=>n(mt.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class bR{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class RR{constructor(e){this.A=e,this.forceRefresh=!1,this.appCheck=null,this.R=null}start(e,n){ke(this.o===void 0);const r=i=>{i.error!=null&&X("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const o=i.token!==this.R;return this.R=i.token,X("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?n(i.token):Promise.resolve()};this.o=i=>{e.enqueueRetryable(()=>r(i))};const s=i=>{X("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.A.onInit(i=>s(i)),setTimeout(()=>{if(!this.appCheck){const i=this.A.getImmediate({optional:!0});i?s(i):X("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(n=>n?(ke(typeof n.token=="string"),this.R=n.token,new bR(n.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function SR(t){const e=typeof self<"u"&&(self.crypto||self.msCrypto),n=new Uint8Array(t);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(n);else for(let r=0;r<t;r++)n[r]=Math.floor(256*Math.random());return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wg{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",n=Math.floor(256/e.length)*e.length;let r="";for(;r.length<20;){const s=SR(40);for(let i=0;i<s.length;++i)r.length<20&&s[i]<n&&(r+=e.charAt(s[i]%e.length))}return r}}function Ie(t,e){return t<e?-1:t>e?1:0}function ws(t,e,n){return t.length===e.length&&t.every((r,s)=>n(r,e[s]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xe{constructor(e,n){if(this.seconds=e,this.nanoseconds=n,n<0)throw new Z(M.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(n>=1e9)throw new Z(M.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(e<-62135596800)throw new Z(M.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new Z(M.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}static now(){return Xe.fromMillis(Date.now())}static fromDate(e){return Xe.fromMillis(e.getTime())}static fromMillis(e){const n=Math.floor(e/1e3),r=Math.floor(1e6*(e-1e3*n));return new Xe(n,r)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(e){return this.seconds===e.seconds?Ie(this.nanoseconds,e.nanoseconds):Ie(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const e=this.seconds- -62135596800;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ue{constructor(e){this.timestamp=e}static fromTimestamp(e){return new ue(e)}static min(){return new ue(new Xe(0,0))}static max(){return new ue(new Xe(253402300799,999999999))}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vi{constructor(e,n,r){n===void 0?n=0:n>e.length&&ae(),r===void 0?r=e.length-n:r>e.length-n&&ae(),this.segments=e,this.offset=n,this.len=r}get length(){return this.len}isEqual(e){return Vi.comparator(this,e)===0}child(e){const n=this.segments.slice(this.offset,this.limit());return e instanceof Vi?e.forEach(r=>{n.push(r)}):n.push(e),this.construct(n)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}forEach(e){for(let n=this.offset,r=this.limit();n<r;n++)e(this.segments[n])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,n){const r=Math.min(e.length,n.length);for(let s=0;s<r;s++){const i=e.get(s),o=n.get(s);if(i<o)return-1;if(i>o)return 1}return e.length<n.length?-1:e.length>n.length?1:0}}class Fe extends Vi{construct(e,n,r){return new Fe(e,n,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const n=[];for(const r of e){if(r.indexOf("//")>=0)throw new Z(M.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);n.push(...r.split("/").filter(s=>s.length>0))}return new Fe(n)}static emptyPath(){return new Fe([])}}const PR=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class at extends Vi{construct(e,n,r){return new at(e,n,r)}static isValidIdentifier(e){return PR.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),at.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)==="__name__"}static keyField(){return new at(["__name__"])}static fromServerFormat(e){const n=[];let r="",s=0;const i=()=>{if(r.length===0)throw new Z(M.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);n.push(r),r=""};let o=!1;for(;s<e.length;){const c=e[s];if(c==="\\"){if(s+1===e.length)throw new Z(M.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const l=e[s+1];if(l!=="\\"&&l!=="."&&l!=="`")throw new Z(M.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=l,s+=2}else c==="`"?(o=!o,s++):c!=="."||o?(r+=c,s++):(i(),s++)}if(i(),o)throw new Z(M.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new at(n)}static emptyPath(){return new at([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class re{constructor(e){this.path=e}static fromPath(e){return new re(Fe.fromString(e))}static fromName(e){return new re(Fe.fromString(e).popFirst(5))}static empty(){return new re(Fe.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&Fe.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,n){return Fe.comparator(e.path,n.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new re(new Fe(e.slice()))}}function CR(t,e){const n=t.toTimestamp().seconds,r=t.toTimestamp().nanoseconds+1,s=ue.fromTimestamp(r===1e9?new Xe(n+1,0):new Xe(n,r));return new cr(s,re.empty(),e)}function kR(t){return new cr(t.readTime,t.key,-1)}class cr{constructor(e,n,r){this.readTime=e,this.documentKey=n,this.largestBatchId=r}static min(){return new cr(ue.min(),re.empty(),-1)}static max(){return new cr(ue.max(),re.empty(),-1)}}function DR(t,e){let n=t.readTime.compareTo(e.readTime);return n!==0?n:(n=re.comparator(t.documentKey,e.documentKey),n!==0?n:Ie(t.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const VR="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class OR{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ns(t){if(t.code!==M.FAILED_PRECONDITION||t.message!==VR)throw t;X("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class L{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(n=>{this.isDone=!0,this.result=n,this.nextCallback&&this.nextCallback(n)},n=>{this.isDone=!0,this.error=n,this.catchCallback&&this.catchCallback(n)})}catch(e){return this.next(void 0,e)}next(e,n){return this.callbackAttached&&ae(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(n,this.error):this.wrapSuccess(e,this.result):new L((r,s)=>{this.nextCallback=i=>{this.wrapSuccess(e,i).next(r,s)},this.catchCallback=i=>{this.wrapFailure(n,i).next(r,s)}})}toPromise(){return new Promise((e,n)=>{this.next(e,n)})}wrapUserFunction(e){try{const n=e();return n instanceof L?n:L.resolve(n)}catch(n){return L.reject(n)}}wrapSuccess(e,n){return e?this.wrapUserFunction(()=>e(n)):L.resolve(n)}wrapFailure(e,n){return e?this.wrapUserFunction(()=>e(n)):L.reject(n)}static resolve(e){return new L((n,r)=>{n(e)})}static reject(e){return new L((n,r)=>{r(e)})}static waitFor(e){return new L((n,r)=>{let s=0,i=0,o=!1;e.forEach(c=>{++s,c.next(()=>{++i,o&&i===s&&n()},l=>r(l))}),o=!0,i===s&&n()})}static or(e){let n=L.resolve(!1);for(const r of e)n=n.next(s=>s?L.resolve(s):r());return n}static forEach(e,n){const r=[];return e.forEach((s,i)=>{r.push(n.call(this,s,i))}),this.waitFor(r)}static mapArray(e,n){return new L((r,s)=>{const i=e.length,o=new Array(i);let c=0;for(let l=0;l<i;l++){const h=l;n(e[h]).next(d=>{o[h]=d,++c,c===i&&r(o)},d=>s(d))}})}static doWhile(e,n){return new L((r,s)=>{const i=()=>{e()===!0?n().next(()=>{i()},s):r()};i()})}}function NR(t){const e=t.match(/Android ([\d.]+)/i),n=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(n)}function xs(t){return t.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ca{constructor(e,n){this.previousValue=e,n&&(n.sequenceNumberHandler=r=>this.ie(r),this.se=r=>n.writeSequenceNumber(r))}ie(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.se&&this.se(e),e}}Ca.oe=-1;function ka(t){return t==null}function Jo(t){return t===0&&1/t==-1/0}function xR(t){return typeof t=="number"&&Number.isInteger(t)&&!Jo(t)&&t<=Number.MAX_SAFE_INTEGER&&t>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function MR(t){let e="";for(let n=0;n<t.length;n++)e.length>0&&(e=pf(e)),e=LR(t.get(n),e);return pf(e)}function LR(t,e){let n=e;const r=t.length;for(let s=0;s<r;s++){const i=t.charAt(s);switch(i){case"\0":n+="";break;case"":n+="";break;default:n+=i}}return n}function pf(t){return t+""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mf(t){let e=0;for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e++;return e}function yr(t,e){for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e(n,t[n])}function Kg(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qe{constructor(e,n){this.comparator=e,this.root=n||ot.EMPTY}insert(e,n){return new qe(this.comparator,this.root.insert(e,n,this.comparator).copy(null,null,ot.BLACK,null,null))}remove(e){return new qe(this.comparator,this.root.remove(e,this.comparator).copy(null,null,ot.BLACK,null,null))}get(e){let n=this.root;for(;!n.isEmpty();){const r=this.comparator(e,n.key);if(r===0)return n.value;r<0?n=n.left:r>0&&(n=n.right)}return null}indexOf(e){let n=0,r=this.root;for(;!r.isEmpty();){const s=this.comparator(e,r.key);if(s===0)return n+r.left.size;s<0?r=r.left:(n+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((n,r)=>(e(n,r),!1))}toString(){const e=[];return this.inorderTraversal((n,r)=>(e.push(`${n}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new yo(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new yo(this.root,e,this.comparator,!1)}getReverseIterator(){return new yo(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new yo(this.root,e,this.comparator,!0)}}class yo{constructor(e,n,r,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=n?r(e.key,n):1,n&&s&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const n={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return n}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class ot{constructor(e,n,r,s,i){this.key=e,this.value=n,this.color=r??ot.RED,this.left=s??ot.EMPTY,this.right=i??ot.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,n,r,s,i){return new ot(e??this.key,n??this.value,r??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,n,r){let s=this;const i=r(e,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(e,n,r),null):i===0?s.copy(null,n,null,null,null):s.copy(null,null,null,null,s.right.insert(e,n,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return ot.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,n){let r,s=this;if(n(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,n),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),n(e,s.key)===0){if(s.right.isEmpty())return ot.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,n))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,ot.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,ot.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,n)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw ae();const e=this.left.check();if(e!==this.right.check())throw ae();return e+(this.isRed()?0:1)}}ot.EMPTY=null,ot.RED=!0,ot.BLACK=!1;ot.EMPTY=new class{constructor(){this.size=0}get key(){throw ae()}get value(){throw ae()}get color(){throw ae()}get left(){throw ae()}get right(){throw ae()}copy(e,n,r,s,i){return this}insert(e,n,r){return new ot(e,n)}remove(e,n){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nt{constructor(e){this.comparator=e,this.data=new qe(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((n,r)=>(e(n),!1))}forEachInRange(e,n){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const s=r.getNext();if(this.comparator(s.key,e[1])>=0)return;n(s.key)}}forEachWhile(e,n){let r;for(r=n!==void 0?this.data.getIteratorFrom(n):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const n=this.data.getIteratorFrom(e);return n.hasNext()?n.getNext().key:null}getIterator(){return new gf(this.data.getIterator())}getIteratorFrom(e){return new gf(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let n=this;return n.size<e.size&&(n=e,e=this),e.forEach(r=>{n=n.add(r)}),n}isEqual(e){if(!(e instanceof nt)||this.size!==e.size)return!1;const n=this.data.getIterator(),r=e.data.getIterator();for(;n.hasNext();){const s=n.getNext().key,i=r.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(n=>{e.push(n)}),e}toString(){const e=[];return this.forEach(n=>e.push(n)),"SortedSet("+e.toString()+")"}copy(e){const n=new nt(this.comparator);return n.data=e,n}}class gf{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lt{constructor(e){this.fields=e,e.sort(at.comparator)}static empty(){return new Lt([])}unionWith(e){let n=new nt(at.comparator);for(const r of this.fields)n=n.add(r);for(const r of e)n=n.add(r);return new Lt(n.toArray())}covers(e){for(const n of this.fields)if(n.isPrefixOf(e))return!0;return!1}isEqual(e){return ws(this.fields,e.fields,(n,r)=>n.isEqual(r))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gg extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lt{constructor(e){this.binaryString=e}static fromBase64String(e){const n=function(s){try{return atob(s)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new Gg("Invalid base64 string: "+i):i}}(e);return new lt(n)}static fromUint8Array(e){const n=function(s){let i="";for(let o=0;o<s.length;++o)i+=String.fromCharCode(s[o]);return i}(e);return new lt(n)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(n){return btoa(n)}(this.binaryString)}toUint8Array(){return function(n){const r=new Uint8Array(n.length);for(let s=0;s<n.length;s++)r[s]=n.charCodeAt(s);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return Ie(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}lt.EMPTY_BYTE_STRING=new lt("");const FR=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function lr(t){if(ke(!!t),typeof t=="string"){let e=0;const n=FR.exec(t);if(ke(!!n),n[1]){let s=n[1];s=(s+"000000000").substr(0,9),e=Number(s)}const r=new Date(t);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:We(t.seconds),nanos:We(t.nanos)}}function We(t){return typeof t=="number"?t:typeof t=="string"?Number(t):0}function ur(t){return typeof t=="string"?lt.fromBase64String(t):lt.fromUint8Array(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cu(t){var e,n;return((n=(((e=t==null?void 0:t.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||n===void 0?void 0:n.stringValue)==="server_timestamp"}function Da(t){const e=t.mapValue.fields.__previous_value__;return cu(e)?Da(e):e}function Oi(t){const e=lr(t.mapValue.fields.__local_write_time__.timestampValue);return new Xe(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class UR{constructor(e,n,r,s,i,o,c,l,h){this.databaseId=e,this.appId=n,this.persistenceKey=r,this.host=s,this.ssl=i,this.forceLongPolling=o,this.autoDetectLongPolling=c,this.longPollingOptions=l,this.useFetchStreams=h}}class Ni{constructor(e,n){this.projectId=e,this.database=n||"(default)"}static empty(){return new Ni("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(e){return e instanceof Ni&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vo={mapValue:{fields:{__type__:{stringValue:"__max__"}}}};function hr(t){return"nullValue"in t?0:"booleanValue"in t?1:"integerValue"in t||"doubleValue"in t?2:"timestampValue"in t?3:"stringValue"in t?5:"bytesValue"in t?6:"referenceValue"in t?7:"geoPointValue"in t?8:"arrayValue"in t?9:"mapValue"in t?cu(t)?4:jR(t)?9007199254740991:BR(t)?10:11:ae()}function Tn(t,e){if(t===e)return!0;const n=hr(t);if(n!==hr(e))return!1;switch(n){case 0:case 9007199254740991:return!0;case 1:return t.booleanValue===e.booleanValue;case 4:return Oi(t).isEqual(Oi(e));case 3:return function(s,i){if(typeof s.timestampValue=="string"&&typeof i.timestampValue=="string"&&s.timestampValue.length===i.timestampValue.length)return s.timestampValue===i.timestampValue;const o=lr(s.timestampValue),c=lr(i.timestampValue);return o.seconds===c.seconds&&o.nanos===c.nanos}(t,e);case 5:return t.stringValue===e.stringValue;case 6:return function(s,i){return ur(s.bytesValue).isEqual(ur(i.bytesValue))}(t,e);case 7:return t.referenceValue===e.referenceValue;case 8:return function(s,i){return We(s.geoPointValue.latitude)===We(i.geoPointValue.latitude)&&We(s.geoPointValue.longitude)===We(i.geoPointValue.longitude)}(t,e);case 2:return function(s,i){if("integerValue"in s&&"integerValue"in i)return We(s.integerValue)===We(i.integerValue);if("doubleValue"in s&&"doubleValue"in i){const o=We(s.doubleValue),c=We(i.doubleValue);return o===c?Jo(o)===Jo(c):isNaN(o)&&isNaN(c)}return!1}(t,e);case 9:return ws(t.arrayValue.values||[],e.arrayValue.values||[],Tn);case 10:case 11:return function(s,i){const o=s.mapValue.fields||{},c=i.mapValue.fields||{};if(mf(o)!==mf(c))return!1;for(const l in o)if(o.hasOwnProperty(l)&&(c[l]===void 0||!Tn(o[l],c[l])))return!1;return!0}(t,e);default:return ae()}}function xi(t,e){return(t.values||[]).find(n=>Tn(n,e))!==void 0}function As(t,e){if(t===e)return 0;const n=hr(t),r=hr(e);if(n!==r)return Ie(n,r);switch(n){case 0:case 9007199254740991:return 0;case 1:return Ie(t.booleanValue,e.booleanValue);case 2:return function(i,o){const c=We(i.integerValue||i.doubleValue),l=We(o.integerValue||o.doubleValue);return c<l?-1:c>l?1:c===l?0:isNaN(c)?isNaN(l)?0:-1:1}(t,e);case 3:return _f(t.timestampValue,e.timestampValue);case 4:return _f(Oi(t),Oi(e));case 5:return Ie(t.stringValue,e.stringValue);case 6:return function(i,o){const c=ur(i),l=ur(o);return c.compareTo(l)}(t.bytesValue,e.bytesValue);case 7:return function(i,o){const c=i.split("/"),l=o.split("/");for(let h=0;h<c.length&&h<l.length;h++){const d=Ie(c[h],l[h]);if(d!==0)return d}return Ie(c.length,l.length)}(t.referenceValue,e.referenceValue);case 8:return function(i,o){const c=Ie(We(i.latitude),We(o.latitude));return c!==0?c:Ie(We(i.longitude),We(o.longitude))}(t.geoPointValue,e.geoPointValue);case 9:return yf(t.arrayValue,e.arrayValue);case 10:return function(i,o){var c,l,h,d;const p=i.fields||{},g=o.fields||{},_=(c=p.value)===null||c===void 0?void 0:c.arrayValue,P=(l=g.value)===null||l===void 0?void 0:l.arrayValue,k=Ie(((h=_==null?void 0:_.values)===null||h===void 0?void 0:h.length)||0,((d=P==null?void 0:P.values)===null||d===void 0?void 0:d.length)||0);return k!==0?k:yf(_,P)}(t.mapValue,e.mapValue);case 11:return function(i,o){if(i===vo.mapValue&&o===vo.mapValue)return 0;if(i===vo.mapValue)return 1;if(o===vo.mapValue)return-1;const c=i.fields||{},l=Object.keys(c),h=o.fields||{},d=Object.keys(h);l.sort(),d.sort();for(let p=0;p<l.length&&p<d.length;++p){const g=Ie(l[p],d[p]);if(g!==0)return g;const _=As(c[l[p]],h[d[p]]);if(_!==0)return _}return Ie(l.length,d.length)}(t.mapValue,e.mapValue);default:throw ae()}}function _f(t,e){if(typeof t=="string"&&typeof e=="string"&&t.length===e.length)return Ie(t,e);const n=lr(t),r=lr(e),s=Ie(n.seconds,r.seconds);return s!==0?s:Ie(n.nanos,r.nanos)}function yf(t,e){const n=t.values||[],r=e.values||[];for(let s=0;s<n.length&&s<r.length;++s){const i=As(n[s],r[s]);if(i)return i}return Ie(n.length,r.length)}function bs(t){return cl(t)}function cl(t){return"nullValue"in t?"null":"booleanValue"in t?""+t.booleanValue:"integerValue"in t?""+t.integerValue:"doubleValue"in t?""+t.doubleValue:"timestampValue"in t?function(n){const r=lr(n);return`time(${r.seconds},${r.nanos})`}(t.timestampValue):"stringValue"in t?t.stringValue:"bytesValue"in t?function(n){return ur(n).toBase64()}(t.bytesValue):"referenceValue"in t?function(n){return re.fromName(n).toString()}(t.referenceValue):"geoPointValue"in t?function(n){return`geo(${n.latitude},${n.longitude})`}(t.geoPointValue):"arrayValue"in t?function(n){let r="[",s=!0;for(const i of n.values||[])s?s=!1:r+=",",r+=cl(i);return r+"]"}(t.arrayValue):"mapValue"in t?function(n){const r=Object.keys(n.fields||{}).sort();let s="{",i=!0;for(const o of r)i?i=!1:s+=",",s+=`${o}:${cl(n.fields[o])}`;return s+"}"}(t.mapValue):ae()}function Co(t){switch(hr(t)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=Da(t);return e?16+Co(e):16;case 5:return 2*t.stringValue.length;case 6:return ur(t.bytesValue).approximateByteSize();case 7:return t.referenceValue.length;case 9:return function(r){return(r.values||[]).reduce((s,i)=>s+Co(i),0)}(t.arrayValue);case 10:case 11:return function(r){let s=0;return yr(r.fields,(i,o)=>{s+=i.length+Co(o)}),s}(t.mapValue);default:throw ae()}}function vf(t,e){return{referenceValue:`projects/${t.projectId}/databases/${t.database}/documents/${e.path.canonicalString()}`}}function ll(t){return!!t&&"integerValue"in t}function lu(t){return!!t&&"arrayValue"in t}function Ef(t){return!!t&&"nullValue"in t}function Tf(t){return!!t&&"doubleValue"in t&&isNaN(Number(t.doubleValue))}function ko(t){return!!t&&"mapValue"in t}function BR(t){var e,n;return((n=(((e=t==null?void 0:t.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||n===void 0?void 0:n.stringValue)==="__vector__"}function _i(t){if(t.geoPointValue)return{geoPointValue:Object.assign({},t.geoPointValue)};if(t.timestampValue&&typeof t.timestampValue=="object")return{timestampValue:Object.assign({},t.timestampValue)};if(t.mapValue){const e={mapValue:{fields:{}}};return yr(t.mapValue.fields,(n,r)=>e.mapValue.fields[n]=_i(r)),e}if(t.arrayValue){const e={arrayValue:{values:[]}};for(let n=0;n<(t.arrayValue.values||[]).length;++n)e.arrayValue.values[n]=_i(t.arrayValue.values[n]);return e}return Object.assign({},t)}function jR(t){return(((t.mapValue||{}).fields||{}).__type__||{}).stringValue==="__max__"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ct{constructor(e){this.value=e}static empty(){return new Ct({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let n=this.value;for(let r=0;r<e.length-1;++r)if(n=(n.mapValue.fields||{})[e.get(r)],!ko(n))return null;return n=(n.mapValue.fields||{})[e.lastSegment()],n||null}}set(e,n){this.getFieldsMap(e.popLast())[e.lastSegment()]=_i(n)}setAll(e){let n=at.emptyPath(),r={},s=[];e.forEach((o,c)=>{if(!n.isImmediateParentOf(c)){const l=this.getFieldsMap(n);this.applyChanges(l,r,s),r={},s=[],n=c.popLast()}o?r[c.lastSegment()]=_i(o):s.push(c.lastSegment())});const i=this.getFieldsMap(n);this.applyChanges(i,r,s)}delete(e){const n=this.field(e.popLast());ko(n)&&n.mapValue.fields&&delete n.mapValue.fields[e.lastSegment()]}isEqual(e){return Tn(this.value,e.value)}getFieldsMap(e){let n=this.value;n.mapValue.fields||(n.mapValue={fields:{}});for(let r=0;r<e.length;++r){let s=n.mapValue.fields[e.get(r)];ko(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},n.mapValue.fields[e.get(r)]=s),n=s}return n.mapValue.fields}applyChanges(e,n,r){yr(n,(s,i)=>e[s]=i);for(const s of r)delete e[s]}clone(){return new Ct(_i(this.value))}}function Qg(t){const e=[];return yr(t.fields,(n,r)=>{const s=new at([n]);if(ko(r)){const i=Qg(r.mapValue).fields;if(i.length===0)e.push(s);else for(const o of i)e.push(s.child(o))}else e.push(s)}),new Lt(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yt{constructor(e,n,r,s,i,o,c){this.key=e,this.documentType=n,this.version=r,this.readTime=s,this.createTime=i,this.data=o,this.documentState=c}static newInvalidDocument(e){return new yt(e,0,ue.min(),ue.min(),ue.min(),Ct.empty(),0)}static newFoundDocument(e,n,r,s){return new yt(e,1,n,ue.min(),r,s,0)}static newNoDocument(e,n){return new yt(e,2,n,ue.min(),ue.min(),Ct.empty(),0)}static newUnknownDocument(e,n){return new yt(e,3,n,ue.min(),ue.min(),Ct.empty(),2)}convertToFoundDocument(e,n){return!this.createTime.isEqual(ue.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=n,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=Ct.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=Ct.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=ue.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof yt&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new yt(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xo{constructor(e,n){this.position=e,this.inclusive=n}}function If(t,e,n){let r=0;for(let s=0;s<t.position.length;s++){const i=e[s],o=t.position[s];if(i.field.isKeyField()?r=re.comparator(re.fromName(o.referenceValue),n.key):r=As(o,n.data.field(i.field)),i.dir==="desc"&&(r*=-1),r!==0)break}return r}function wf(t,e){if(t===null)return e===null;if(e===null||t.inclusive!==e.inclusive||t.position.length!==e.position.length)return!1;for(let n=0;n<t.position.length;n++)if(!Tn(t.position[n],e.position[n]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mi{constructor(e,n="asc"){this.field=e,this.dir=n}}function $R(t,e){return t.dir===e.dir&&t.field.isEqual(e.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yg{}class Ye extends Yg{constructor(e,n,r){super(),this.field=e,this.op=n,this.value=r}static create(e,n,r){return e.isKeyField()?n==="in"||n==="not-in"?this.createKeyFieldInFilter(e,n,r):new HR(e,n,r):n==="array-contains"?new KR(e,r):n==="in"?new GR(e,r):n==="not-in"?new QR(e,r):n==="array-contains-any"?new YR(e,r):new Ye(e,n,r)}static createKeyFieldInFilter(e,n,r){return n==="in"?new zR(e,r):new WR(e,r)}matches(e){const n=e.data.field(this.field);return this.op==="!="?n!==null&&this.matchesComparison(As(n,this.value)):n!==null&&hr(this.value)===hr(n)&&this.matchesComparison(As(n,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return ae()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class an extends Yg{constructor(e,n){super(),this.filters=e,this.op=n,this.ae=null}static create(e,n){return new an(e,n)}matches(e){return Jg(this)?this.filters.find(n=>!n.matches(e))===void 0:this.filters.find(n=>n.matches(e))!==void 0}getFlattenedFilters(){return this.ae!==null||(this.ae=this.filters.reduce((e,n)=>e.concat(n.getFlattenedFilters()),[])),this.ae}getFilters(){return Object.assign([],this.filters)}}function Jg(t){return t.op==="and"}function Xg(t){return qR(t)&&Jg(t)}function qR(t){for(const e of t.filters)if(e instanceof an)return!1;return!0}function ul(t){if(t instanceof Ye)return t.field.canonicalString()+t.op.toString()+bs(t.value);if(Xg(t))return t.filters.map(e=>ul(e)).join(",");{const e=t.filters.map(n=>ul(n)).join(",");return`${t.op}(${e})`}}function Zg(t,e){return t instanceof Ye?function(r,s){return s instanceof Ye&&r.op===s.op&&r.field.isEqual(s.field)&&Tn(r.value,s.value)}(t,e):t instanceof an?function(r,s){return s instanceof an&&r.op===s.op&&r.filters.length===s.filters.length?r.filters.reduce((i,o,c)=>i&&Zg(o,s.filters[c]),!0):!1}(t,e):void ae()}function e_(t){return t instanceof Ye?function(n){return`${n.field.canonicalString()} ${n.op} ${bs(n.value)}`}(t):t instanceof an?function(n){return n.op.toString()+" {"+n.getFilters().map(e_).join(" ,")+"}"}(t):"Filter"}class HR extends Ye{constructor(e,n,r){super(e,n,r),this.key=re.fromName(r.referenceValue)}matches(e){const n=re.comparator(e.key,this.key);return this.matchesComparison(n)}}class zR extends Ye{constructor(e,n){super(e,"in",n),this.keys=t_("in",n)}matches(e){return this.keys.some(n=>n.isEqual(e.key))}}class WR extends Ye{constructor(e,n){super(e,"not-in",n),this.keys=t_("not-in",n)}matches(e){return!this.keys.some(n=>n.isEqual(e.key))}}function t_(t,e){var n;return(((n=e.arrayValue)===null||n===void 0?void 0:n.values)||[]).map(r=>re.fromName(r.referenceValue))}class KR extends Ye{constructor(e,n){super(e,"array-contains",n)}matches(e){const n=e.data.field(this.field);return lu(n)&&xi(n.arrayValue,this.value)}}class GR extends Ye{constructor(e,n){super(e,"in",n)}matches(e){const n=e.data.field(this.field);return n!==null&&xi(this.value.arrayValue,n)}}class QR extends Ye{constructor(e,n){super(e,"not-in",n)}matches(e){if(xi(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const n=e.data.field(this.field);return n!==null&&!xi(this.value.arrayValue,n)}}class YR extends Ye{constructor(e,n){super(e,"array-contains-any",n)}matches(e){const n=e.data.field(this.field);return!(!lu(n)||!n.arrayValue.values)&&n.arrayValue.values.some(r=>xi(this.value.arrayValue,r))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class JR{constructor(e,n=null,r=[],s=[],i=null,o=null,c=null){this.path=e,this.collectionGroup=n,this.orderBy=r,this.filters=s,this.limit=i,this.startAt=o,this.endAt=c,this.ue=null}}function Af(t,e=null,n=[],r=[],s=null,i=null,o=null){return new JR(t,e,n,r,s,i,o)}function uu(t){const e=de(t);if(e.ue===null){let n=e.path.canonicalString();e.collectionGroup!==null&&(n+="|cg:"+e.collectionGroup),n+="|f:",n+=e.filters.map(r=>ul(r)).join(","),n+="|ob:",n+=e.orderBy.map(r=>function(i){return i.field.canonicalString()+i.dir}(r)).join(","),ka(e.limit)||(n+="|l:",n+=e.limit),e.startAt&&(n+="|lb:",n+=e.startAt.inclusive?"b:":"a:",n+=e.startAt.position.map(r=>bs(r)).join(",")),e.endAt&&(n+="|ub:",n+=e.endAt.inclusive?"a:":"b:",n+=e.endAt.position.map(r=>bs(r)).join(",")),e.ue=n}return e.ue}function hu(t,e){if(t.limit!==e.limit||t.orderBy.length!==e.orderBy.length)return!1;for(let n=0;n<t.orderBy.length;n++)if(!$R(t.orderBy[n],e.orderBy[n]))return!1;if(t.filters.length!==e.filters.length)return!1;for(let n=0;n<t.filters.length;n++)if(!Zg(t.filters[n],e.filters[n]))return!1;return t.collectionGroup===e.collectionGroup&&!!t.path.isEqual(e.path)&&!!wf(t.startAt,e.startAt)&&wf(t.endAt,e.endAt)}function hl(t){return re.isDocumentKey(t.path)&&t.collectionGroup===null&&t.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ms{constructor(e,n=null,r=[],s=[],i=null,o="F",c=null,l=null){this.path=e,this.collectionGroup=n,this.explicitOrderBy=r,this.filters=s,this.limit=i,this.limitType=o,this.startAt=c,this.endAt=l,this.ce=null,this.le=null,this.he=null,this.startAt,this.endAt}}function XR(t,e,n,r,s,i,o,c){return new Ms(t,e,n,r,s,i,o,c)}function Va(t){return new Ms(t)}function bf(t){return t.filters.length===0&&t.limit===null&&t.startAt==null&&t.endAt==null&&(t.explicitOrderBy.length===0||t.explicitOrderBy.length===1&&t.explicitOrderBy[0].field.isKeyField())}function n_(t){return t.collectionGroup!==null}function yi(t){const e=de(t);if(e.ce===null){e.ce=[];const n=new Set;for(const i of e.explicitOrderBy)e.ce.push(i),n.add(i.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(o){let c=new nt(at.comparator);return o.filters.forEach(l=>{l.getFlattenedFilters().forEach(h=>{h.isInequality()&&(c=c.add(h.field))})}),c})(e).forEach(i=>{n.has(i.canonicalString())||i.isKeyField()||e.ce.push(new Mi(i,r))}),n.has(at.keyField().canonicalString())||e.ce.push(new Mi(at.keyField(),r))}return e.ce}function _n(t){const e=de(t);return e.le||(e.le=ZR(e,yi(t))),e.le}function ZR(t,e){if(t.limitType==="F")return Af(t.path,t.collectionGroup,e,t.filters,t.limit,t.startAt,t.endAt);{e=e.map(s=>{const i=s.dir==="desc"?"asc":"desc";return new Mi(s.field,i)});const n=t.endAt?new Xo(t.endAt.position,t.endAt.inclusive):null,r=t.startAt?new Xo(t.startAt.position,t.startAt.inclusive):null;return Af(t.path,t.collectionGroup,e,t.filters,t.limit,n,r)}}function dl(t,e){const n=t.filters.concat([e]);return new Ms(t.path,t.collectionGroup,t.explicitOrderBy.slice(),n,t.limit,t.limitType,t.startAt,t.endAt)}function fl(t,e,n){return new Ms(t.path,t.collectionGroup,t.explicitOrderBy.slice(),t.filters.slice(),e,n,t.startAt,t.endAt)}function Oa(t,e){return hu(_n(t),_n(e))&&t.limitType===e.limitType}function r_(t){return`${uu(_n(t))}|lt:${t.limitType}`}function is(t){return`Query(target=${function(n){let r=n.path.canonicalString();return n.collectionGroup!==null&&(r+=" collectionGroup="+n.collectionGroup),n.filters.length>0&&(r+=`, filters: [${n.filters.map(s=>e_(s)).join(", ")}]`),ka(n.limit)||(r+=", limit: "+n.limit),n.orderBy.length>0&&(r+=`, orderBy: [${n.orderBy.map(s=>function(o){return`${o.field.canonicalString()} (${o.dir})`}(s)).join(", ")}]`),n.startAt&&(r+=", startAt: ",r+=n.startAt.inclusive?"b:":"a:",r+=n.startAt.position.map(s=>bs(s)).join(",")),n.endAt&&(r+=", endAt: ",r+=n.endAt.inclusive?"a:":"b:",r+=n.endAt.position.map(s=>bs(s)).join(",")),`Target(${r})`}(_n(t))}; limitType=${t.limitType})`}function Na(t,e){return e.isFoundDocument()&&function(r,s){const i=s.key.path;return r.collectionGroup!==null?s.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(i):re.isDocumentKey(r.path)?r.path.isEqual(i):r.path.isImmediateParentOf(i)}(t,e)&&function(r,s){for(const i of yi(r))if(!i.field.isKeyField()&&s.data.field(i.field)===null)return!1;return!0}(t,e)&&function(r,s){for(const i of r.filters)if(!i.matches(s))return!1;return!0}(t,e)&&function(r,s){return!(r.startAt&&!function(o,c,l){const h=If(o,c,l);return o.inclusive?h<=0:h<0}(r.startAt,yi(r),s)||r.endAt&&!function(o,c,l){const h=If(o,c,l);return o.inclusive?h>=0:h>0}(r.endAt,yi(r),s))}(t,e)}function eS(t){return t.collectionGroup||(t.path.length%2==1?t.path.lastSegment():t.path.get(t.path.length-2))}function s_(t){return(e,n)=>{let r=!1;for(const s of yi(t)){const i=tS(s,e,n);if(i!==0)return i;r=r||s.field.isKeyField()}return 0}}function tS(t,e,n){const r=t.field.isKeyField()?re.comparator(e.key,n.key):function(i,o,c){const l=o.data.field(i),h=c.data.field(i);return l!==null&&h!==null?As(l,h):ae()}(t.field,e,n);switch(t.dir){case"asc":return r;case"desc":return-1*r;default:return ae()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kr{constructor(e,n){this.mapKeyFn=e,this.equalsFn=n,this.inner={},this.innerSize=0}get(e){const n=this.mapKeyFn(e),r=this.inner[n];if(r!==void 0){for(const[s,i]of r)if(this.equalsFn(s,e))return i}}has(e){return this.get(e)!==void 0}set(e,n){const r=this.mapKeyFn(e),s=this.inner[r];if(s===void 0)return this.inner[r]=[[e,n]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],e))return void(s[i]=[e,n]);s.push([e,n]),this.innerSize++}delete(e){const n=this.mapKeyFn(e),r=this.inner[n];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],e))return r.length===1?delete this.inner[n]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(e){yr(this.inner,(n,r)=>{for(const[s,i]of r)e(s,i)})}isEmpty(){return Kg(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nS=new qe(re.comparator);function Ln(){return nS}const i_=new qe(re.comparator);function si(...t){let e=i_;for(const n of t)e=e.insert(n.key,n);return e}function o_(t){let e=i_;return t.forEach((n,r)=>e=e.insert(n,r.overlayedDocument)),e}function kr(){return vi()}function a_(){return vi()}function vi(){return new Kr(t=>t.toString(),(t,e)=>t.isEqual(e))}const rS=new qe(re.comparator),sS=new nt(re.comparator);function ye(...t){let e=sS;for(const n of t)e=e.add(n);return e}const iS=new nt(Ie);function oS(){return iS}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function du(t,e){if(t.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Jo(e)?"-0":e}}function c_(t){return{integerValue:""+t}}function aS(t,e){return xR(e)?c_(e):du(t,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xa{constructor(){this._=void 0}}function cS(t,e,n){return t instanceof Zo?function(s,i){const o={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return i&&cu(i)&&(i=Da(i)),i&&(o.fields.__previous_value__=i),{mapValue:o}}(n,e):t instanceof Li?u_(t,e):t instanceof Fi?h_(t,e):function(s,i){const o=l_(s,i),c=Rf(o)+Rf(s.Pe);return ll(o)&&ll(s.Pe)?c_(c):du(s.serializer,c)}(t,e)}function lS(t,e,n){return t instanceof Li?u_(t,e):t instanceof Fi?h_(t,e):n}function l_(t,e){return t instanceof ea?function(r){return ll(r)||function(i){return!!i&&"doubleValue"in i}(r)}(e)?e:{integerValue:0}:null}class Zo extends xa{}class Li extends xa{constructor(e){super(),this.elements=e}}function u_(t,e){const n=d_(e);for(const r of t.elements)n.some(s=>Tn(s,r))||n.push(r);return{arrayValue:{values:n}}}class Fi extends xa{constructor(e){super(),this.elements=e}}function h_(t,e){let n=d_(e);for(const r of t.elements)n=n.filter(s=>!Tn(s,r));return{arrayValue:{values:n}}}class ea extends xa{constructor(e,n){super(),this.serializer=e,this.Pe=n}}function Rf(t){return We(t.integerValue||t.doubleValue)}function d_(t){return lu(t)&&t.arrayValue.values?t.arrayValue.values.slice():[]}function uS(t,e){return t.field.isEqual(e.field)&&function(r,s){return r instanceof Li&&s instanceof Li||r instanceof Fi&&s instanceof Fi?ws(r.elements,s.elements,Tn):r instanceof ea&&s instanceof ea?Tn(r.Pe,s.Pe):r instanceof Zo&&s instanceof Zo}(t.transform,e.transform)}class hS{constructor(e,n){this.version=e,this.transformResults=n}}class tn{constructor(e,n){this.updateTime=e,this.exists=n}static none(){return new tn}static exists(e){return new tn(void 0,e)}static updateTime(e){return new tn(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function Do(t,e){return t.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(t.updateTime):t.exists===void 0||t.exists===e.isFoundDocument()}class Ma{}function f_(t,e){if(!t.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return t.isNoDocument()?new fu(t.key,tn.none()):new zi(t.key,t.data,tn.none());{const n=t.data,r=Ct.empty();let s=new nt(at.comparator);for(let i of e.fields)if(!s.has(i)){let o=n.field(i);o===null&&i.length>1&&(i=i.popLast(),o=n.field(i)),o===null?r.delete(i):r.set(i,o),s=s.add(i)}return new vr(t.key,r,new Lt(s.toArray()),tn.none())}}function dS(t,e,n){t instanceof zi?function(s,i,o){const c=s.value.clone(),l=Pf(s.fieldTransforms,i,o.transformResults);c.setAll(l),i.convertToFoundDocument(o.version,c).setHasCommittedMutations()}(t,e,n):t instanceof vr?function(s,i,o){if(!Do(s.precondition,i))return void i.convertToUnknownDocument(o.version);const c=Pf(s.fieldTransforms,i,o.transformResults),l=i.data;l.setAll(p_(s)),l.setAll(c),i.convertToFoundDocument(o.version,l).setHasCommittedMutations()}(t,e,n):function(s,i,o){i.convertToNoDocument(o.version).setHasCommittedMutations()}(0,e,n)}function Ei(t,e,n,r){return t instanceof zi?function(i,o,c,l){if(!Do(i.precondition,o))return c;const h=i.value.clone(),d=Cf(i.fieldTransforms,l,o);return h.setAll(d),o.convertToFoundDocument(o.version,h).setHasLocalMutations(),null}(t,e,n,r):t instanceof vr?function(i,o,c,l){if(!Do(i.precondition,o))return c;const h=Cf(i.fieldTransforms,l,o),d=o.data;return d.setAll(p_(i)),d.setAll(h),o.convertToFoundDocument(o.version,d).setHasLocalMutations(),c===null?null:c.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map(p=>p.field))}(t,e,n,r):function(i,o,c){return Do(i.precondition,o)?(o.convertToNoDocument(o.version).setHasLocalMutations(),null):c}(t,e,n)}function fS(t,e){let n=null;for(const r of t.fieldTransforms){const s=e.data.field(r.field),i=l_(r.transform,s||null);i!=null&&(n===null&&(n=Ct.empty()),n.set(r.field,i))}return n||null}function Sf(t,e){return t.type===e.type&&!!t.key.isEqual(e.key)&&!!t.precondition.isEqual(e.precondition)&&!!function(r,s){return r===void 0&&s===void 0||!(!r||!s)&&ws(r,s,(i,o)=>uS(i,o))}(t.fieldTransforms,e.fieldTransforms)&&(t.type===0?t.value.isEqual(e.value):t.type!==1||t.data.isEqual(e.data)&&t.fieldMask.isEqual(e.fieldMask))}class zi extends Ma{constructor(e,n,r,s=[]){super(),this.key=e,this.value=n,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class vr extends Ma{constructor(e,n,r,s,i=[]){super(),this.key=e,this.data=n,this.fieldMask=r,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function p_(t){const e=new Map;return t.fieldMask.fields.forEach(n=>{if(!n.isEmpty()){const r=t.data.field(n);e.set(n,r)}}),e}function Pf(t,e,n){const r=new Map;ke(t.length===n.length);for(let s=0;s<n.length;s++){const i=t[s],o=i.transform,c=e.data.field(i.field);r.set(i.field,lS(o,c,n[s]))}return r}function Cf(t,e,n){const r=new Map;for(const s of t){const i=s.transform,o=n.data.field(s.field);r.set(s.field,cS(i,o,e))}return r}class fu extends Ma{constructor(e,n){super(),this.key=e,this.precondition=n,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class pS extends Ma{constructor(e,n){super(),this.key=e,this.precondition=n,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mS{constructor(e,n,r,s){this.batchId=e,this.localWriteTime=n,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(e,n){const r=n.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(e.key)&&dS(i,e,r[s])}}applyToLocalView(e,n){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(n=Ei(r,e,n,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(n=Ei(r,e,n,this.localWriteTime));return n}applyToLocalDocumentSet(e,n){const r=a_();return this.mutations.forEach(s=>{const i=e.get(s.key),o=i.overlayedDocument;let c=this.applyToLocalView(o,i.mutatedFields);c=n.has(s.key)?null:c;const l=f_(o,c);l!==null&&r.set(s.key,l),o.isValidDocument()||o.convertToNoDocument(ue.min())}),r}keys(){return this.mutations.reduce((e,n)=>e.add(n.key),ye())}isEqual(e){return this.batchId===e.batchId&&ws(this.mutations,e.mutations,(n,r)=>Sf(n,r))&&ws(this.baseMutations,e.baseMutations,(n,r)=>Sf(n,r))}}class pu{constructor(e,n,r,s){this.batch=e,this.commitVersion=n,this.mutationResults=r,this.docVersions=s}static from(e,n,r){ke(e.mutations.length===r.length);let s=function(){return rS}();const i=e.mutations;for(let o=0;o<i.length;o++)s=s.insert(i[o].key,r[o].version);return new pu(e,n,r,s)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gS{constructor(e,n){this.largestBatchId=e,this.mutation=n}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _S{constructor(e,n){this.count=e,this.unchangedNames=n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Qe,Te;function yS(t){switch(t){default:return ae();case M.CANCELLED:case M.UNKNOWN:case M.DEADLINE_EXCEEDED:case M.RESOURCE_EXHAUSTED:case M.INTERNAL:case M.UNAVAILABLE:case M.UNAUTHENTICATED:return!1;case M.INVALID_ARGUMENT:case M.NOT_FOUND:case M.ALREADY_EXISTS:case M.PERMISSION_DENIED:case M.FAILED_PRECONDITION:case M.ABORTED:case M.OUT_OF_RANGE:case M.UNIMPLEMENTED:case M.DATA_LOSS:return!0}}function m_(t){if(t===void 0)return Mn("GRPC error has no .code"),M.UNKNOWN;switch(t){case Qe.OK:return M.OK;case Qe.CANCELLED:return M.CANCELLED;case Qe.UNKNOWN:return M.UNKNOWN;case Qe.DEADLINE_EXCEEDED:return M.DEADLINE_EXCEEDED;case Qe.RESOURCE_EXHAUSTED:return M.RESOURCE_EXHAUSTED;case Qe.INTERNAL:return M.INTERNAL;case Qe.UNAVAILABLE:return M.UNAVAILABLE;case Qe.UNAUTHENTICATED:return M.UNAUTHENTICATED;case Qe.INVALID_ARGUMENT:return M.INVALID_ARGUMENT;case Qe.NOT_FOUND:return M.NOT_FOUND;case Qe.ALREADY_EXISTS:return M.ALREADY_EXISTS;case Qe.PERMISSION_DENIED:return M.PERMISSION_DENIED;case Qe.FAILED_PRECONDITION:return M.FAILED_PRECONDITION;case Qe.ABORTED:return M.ABORTED;case Qe.OUT_OF_RANGE:return M.OUT_OF_RANGE;case Qe.UNIMPLEMENTED:return M.UNIMPLEMENTED;case Qe.DATA_LOSS:return M.DATA_LOSS;default:return ae()}}(Te=Qe||(Qe={}))[Te.OK=0]="OK",Te[Te.CANCELLED=1]="CANCELLED",Te[Te.UNKNOWN=2]="UNKNOWN",Te[Te.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",Te[Te.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",Te[Te.NOT_FOUND=5]="NOT_FOUND",Te[Te.ALREADY_EXISTS=6]="ALREADY_EXISTS",Te[Te.PERMISSION_DENIED=7]="PERMISSION_DENIED",Te[Te.UNAUTHENTICATED=16]="UNAUTHENTICATED",Te[Te.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",Te[Te.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",Te[Te.ABORTED=10]="ABORTED",Te[Te.OUT_OF_RANGE=11]="OUT_OF_RANGE",Te[Te.UNIMPLEMENTED=12]="UNIMPLEMENTED",Te[Te.INTERNAL=13]="INTERNAL",Te[Te.UNAVAILABLE=14]="UNAVAILABLE",Te[Te.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vS(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ES=new Nr([4294967295,4294967295],0);function kf(t){const e=vS().encode(t),n=new Ug;return n.update(e),new Uint8Array(n.digest())}function Df(t){const e=new DataView(t.buffer),n=e.getUint32(0,!0),r=e.getUint32(4,!0),s=e.getUint32(8,!0),i=e.getUint32(12,!0);return[new Nr([n,r],0),new Nr([s,i],0)]}class mu{constructor(e,n,r){if(this.bitmap=e,this.padding=n,this.hashCount=r,n<0||n>=8)throw new ii(`Invalid padding: ${n}`);if(r<0)throw new ii(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new ii(`Invalid hash count: ${r}`);if(e.length===0&&n!==0)throw new ii(`Invalid padding when bitmap length is 0: ${n}`);this.Ie=8*e.length-n,this.Te=Nr.fromNumber(this.Ie)}Ee(e,n,r){let s=e.add(n.multiply(Nr.fromNumber(r)));return s.compare(ES)===1&&(s=new Nr([s.getBits(0),s.getBits(1)],0)),s.modulo(this.Te).toNumber()}de(e){return(this.bitmap[Math.floor(e/8)]&1<<e%8)!=0}mightContain(e){if(this.Ie===0)return!1;const n=kf(e),[r,s]=Df(n);for(let i=0;i<this.hashCount;i++){const o=this.Ee(r,s,i);if(!this.de(o))return!1}return!0}static create(e,n,r){const s=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),o=new mu(i,s,n);return r.forEach(c=>o.insert(c)),o}insert(e){if(this.Ie===0)return;const n=kf(e),[r,s]=Df(n);for(let i=0;i<this.hashCount;i++){const o=this.Ee(r,s,i);this.Ae(o)}}Ae(e){const n=Math.floor(e/8),r=e%8;this.bitmap[n]|=1<<r}}class ii extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class La{constructor(e,n,r,s,i){this.snapshotVersion=e,this.targetChanges=n,this.targetMismatches=r,this.documentUpdates=s,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,n,r){const s=new Map;return s.set(e,Wi.createSynthesizedTargetChangeForCurrentChange(e,n,r)),new La(ue.min(),s,new qe(Ie),Ln(),ye())}}class Wi{constructor(e,n,r,s,i){this.resumeToken=e,this.current=n,this.addedDocuments=r,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,n,r){return new Wi(r,n,ye(),ye(),ye())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vo{constructor(e,n,r,s){this.Re=e,this.removedTargetIds=n,this.key=r,this.Ve=s}}class g_{constructor(e,n){this.targetId=e,this.me=n}}class __{constructor(e,n,r=lt.EMPTY_BYTE_STRING,s=null){this.state=e,this.targetIds=n,this.resumeToken=r,this.cause=s}}class Vf{constructor(){this.fe=0,this.ge=Nf(),this.pe=lt.EMPTY_BYTE_STRING,this.ye=!1,this.we=!0}get current(){return this.ye}get resumeToken(){return this.pe}get Se(){return this.fe!==0}get be(){return this.we}De(e){e.approximateByteSize()>0&&(this.we=!0,this.pe=e)}ve(){let e=ye(),n=ye(),r=ye();return this.ge.forEach((s,i)=>{switch(i){case 0:e=e.add(s);break;case 2:n=n.add(s);break;case 1:r=r.add(s);break;default:ae()}}),new Wi(this.pe,this.ye,e,n,r)}Ce(){this.we=!1,this.ge=Nf()}Fe(e,n){this.we=!0,this.ge=this.ge.insert(e,n)}Me(e){this.we=!0,this.ge=this.ge.remove(e)}xe(){this.fe+=1}Oe(){this.fe-=1,ke(this.fe>=0)}Ne(){this.we=!0,this.ye=!0}}class TS{constructor(e){this.Le=e,this.Be=new Map,this.ke=Ln(),this.qe=Of(),this.Qe=new qe(Ie)}Ke(e){for(const n of e.Re)e.Ve&&e.Ve.isFoundDocument()?this.$e(n,e.Ve):this.Ue(n,e.key,e.Ve);for(const n of e.removedTargetIds)this.Ue(n,e.key,e.Ve)}We(e){this.forEachTarget(e,n=>{const r=this.Ge(n);switch(e.state){case 0:this.ze(n)&&r.De(e.resumeToken);break;case 1:r.Oe(),r.Se||r.Ce(),r.De(e.resumeToken);break;case 2:r.Oe(),r.Se||this.removeTarget(n);break;case 3:this.ze(n)&&(r.Ne(),r.De(e.resumeToken));break;case 4:this.ze(n)&&(this.je(n),r.De(e.resumeToken));break;default:ae()}})}forEachTarget(e,n){e.targetIds.length>0?e.targetIds.forEach(n):this.Be.forEach((r,s)=>{this.ze(s)&&n(s)})}He(e){const n=e.targetId,r=e.me.count,s=this.Je(n);if(s){const i=s.target;if(hl(i))if(r===0){const o=new re(i.path);this.Ue(n,o,yt.newNoDocument(o,ue.min()))}else ke(r===1);else{const o=this.Ye(n);if(o!==r){const c=this.Ze(e),l=c?this.Xe(c,e,o):1;if(l!==0){this.je(n);const h=l===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Qe=this.Qe.insert(n,h)}}}}}Ze(e){const n=e.me.unchangedNames;if(!n||!n.bits)return null;const{bits:{bitmap:r="",padding:s=0},hashCount:i=0}=n;let o,c;try{o=ur(r).toUint8Array()}catch(l){if(l instanceof Gg)return Is("Decoding the base64 bloom filter in existence filter failed ("+l.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw l}try{c=new mu(o,s,i)}catch(l){return Is(l instanceof ii?"BloomFilter error: ":"Applying bloom filter failed: ",l),null}return c.Ie===0?null:c}Xe(e,n,r){return n.me.count===r-this.nt(e,n.targetId)?0:2}nt(e,n){const r=this.Le.getRemoteKeysForTarget(n);let s=0;return r.forEach(i=>{const o=this.Le.tt(),c=`projects/${o.projectId}/databases/${o.database}/documents/${i.path.canonicalString()}`;e.mightContain(c)||(this.Ue(n,i,null),s++)}),s}rt(e){const n=new Map;this.Be.forEach((i,o)=>{const c=this.Je(o);if(c){if(i.current&&hl(c.target)){const l=new re(c.target.path);this.ke.get(l)!==null||this.it(o,l)||this.Ue(o,l,yt.newNoDocument(l,e))}i.be&&(n.set(o,i.ve()),i.Ce())}});let r=ye();this.qe.forEach((i,o)=>{let c=!0;o.forEachWhile(l=>{const h=this.Je(l);return!h||h.purpose==="TargetPurposeLimboResolution"||(c=!1,!1)}),c&&(r=r.add(i))}),this.ke.forEach((i,o)=>o.setReadTime(e));const s=new La(e,n,this.Qe,this.ke,r);return this.ke=Ln(),this.qe=Of(),this.Qe=new qe(Ie),s}$e(e,n){if(!this.ze(e))return;const r=this.it(e,n.key)?2:0;this.Ge(e).Fe(n.key,r),this.ke=this.ke.insert(n.key,n),this.qe=this.qe.insert(n.key,this.st(n.key).add(e))}Ue(e,n,r){if(!this.ze(e))return;const s=this.Ge(e);this.it(e,n)?s.Fe(n,1):s.Me(n),this.qe=this.qe.insert(n,this.st(n).delete(e)),r&&(this.ke=this.ke.insert(n,r))}removeTarget(e){this.Be.delete(e)}Ye(e){const n=this.Ge(e).ve();return this.Le.getRemoteKeysForTarget(e).size+n.addedDocuments.size-n.removedDocuments.size}xe(e){this.Ge(e).xe()}Ge(e){let n=this.Be.get(e);return n||(n=new Vf,this.Be.set(e,n)),n}st(e){let n=this.qe.get(e);return n||(n=new nt(Ie),this.qe=this.qe.insert(e,n)),n}ze(e){const n=this.Je(e)!==null;return n||X("WatchChangeAggregator","Detected inactive target",e),n}Je(e){const n=this.Be.get(e);return n&&n.Se?null:this.Le.ot(e)}je(e){this.Be.set(e,new Vf),this.Le.getRemoteKeysForTarget(e).forEach(n=>{this.Ue(e,n,null)})}it(e,n){return this.Le.getRemoteKeysForTarget(e).has(n)}}function Of(){return new qe(re.comparator)}function Nf(){return new qe(re.comparator)}const IS={asc:"ASCENDING",desc:"DESCENDING"},wS={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},AS={and:"AND",or:"OR"};class bS{constructor(e,n){this.databaseId=e,this.useProto3Json=n}}function pl(t,e){return t.useProto3Json||ka(e)?e:{value:e}}function ta(t,e){return t.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function y_(t,e){return t.useProto3Json?e.toBase64():e.toUint8Array()}function RS(t,e){return ta(t,e.toTimestamp())}function yn(t){return ke(!!t),ue.fromTimestamp(function(n){const r=lr(n);return new Xe(r.seconds,r.nanos)}(t))}function gu(t,e){return ml(t,e).canonicalString()}function ml(t,e){const n=function(s){return new Fe(["projects",s.projectId,"databases",s.database])}(t).child("documents");return e===void 0?n:n.child(e)}function v_(t){const e=Fe.fromString(t);return ke(A_(e)),e}function gl(t,e){return gu(t.databaseId,e.path)}function Oc(t,e){const n=v_(e);if(n.get(1)!==t.databaseId.projectId)throw new Z(M.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+n.get(1)+" vs "+t.databaseId.projectId);if(n.get(3)!==t.databaseId.database)throw new Z(M.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+n.get(3)+" vs "+t.databaseId.database);return new re(T_(n))}function E_(t,e){return gu(t.databaseId,e)}function SS(t){const e=v_(t);return e.length===4?Fe.emptyPath():T_(e)}function _l(t){return new Fe(["projects",t.databaseId.projectId,"databases",t.databaseId.database]).canonicalString()}function T_(t){return ke(t.length>4&&t.get(4)==="documents"),t.popFirst(5)}function xf(t,e,n){return{name:gl(t,e),fields:n.value.mapValue.fields}}function PS(t,e){let n;if("targetChange"in e){e.targetChange;const r=function(h){return h==="NO_CHANGE"?0:h==="ADD"?1:h==="REMOVE"?2:h==="CURRENT"?3:h==="RESET"?4:ae()}(e.targetChange.targetChangeType||"NO_CHANGE"),s=e.targetChange.targetIds||[],i=function(h,d){return h.useProto3Json?(ke(d===void 0||typeof d=="string"),lt.fromBase64String(d||"")):(ke(d===void 0||d instanceof Buffer||d instanceof Uint8Array),lt.fromUint8Array(d||new Uint8Array))}(t,e.targetChange.resumeToken),o=e.targetChange.cause,c=o&&function(h){const d=h.code===void 0?M.UNKNOWN:m_(h.code);return new Z(d,h.message||"")}(o);n=new __(r,s,i,c||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const s=Oc(t,r.document.name),i=yn(r.document.updateTime),o=r.document.createTime?yn(r.document.createTime):ue.min(),c=new Ct({mapValue:{fields:r.document.fields}}),l=yt.newFoundDocument(s,i,o,c),h=r.targetIds||[],d=r.removedTargetIds||[];n=new Vo(h,d,l.key,l)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const s=Oc(t,r.document),i=r.readTime?yn(r.readTime):ue.min(),o=yt.newNoDocument(s,i),c=r.removedTargetIds||[];n=new Vo([],c,o.key,o)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const s=Oc(t,r.document),i=r.removedTargetIds||[];n=new Vo([],i,s,null)}else{if(!("filter"in e))return ae();{e.filter;const r=e.filter;r.targetId;const{count:s=0,unchangedNames:i}=r,o=new _S(s,i),c=r.targetId;n=new g_(c,o)}}return n}function CS(t,e){let n;if(e instanceof zi)n={update:xf(t,e.key,e.value)};else if(e instanceof fu)n={delete:gl(t,e.key)};else if(e instanceof vr)n={update:xf(t,e.key,e.data),updateMask:FS(e.fieldMask)};else{if(!(e instanceof pS))return ae();n={verify:gl(t,e.key)}}return e.fieldTransforms.length>0&&(n.updateTransforms=e.fieldTransforms.map(r=>function(i,o){const c=o.transform;if(c instanceof Zo)return{fieldPath:o.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(c instanceof Li)return{fieldPath:o.field.canonicalString(),appendMissingElements:{values:c.elements}};if(c instanceof Fi)return{fieldPath:o.field.canonicalString(),removeAllFromArray:{values:c.elements}};if(c instanceof ea)return{fieldPath:o.field.canonicalString(),increment:c.Pe};throw ae()}(0,r))),e.precondition.isNone||(n.currentDocument=function(s,i){return i.updateTime!==void 0?{updateTime:RS(s,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:ae()}(t,e.precondition)),n}function kS(t,e){return t&&t.length>0?(ke(e!==void 0),t.map(n=>function(s,i){let o=s.updateTime?yn(s.updateTime):yn(i);return o.isEqual(ue.min())&&(o=yn(i)),new hS(o,s.transformResults||[])}(n,e))):[]}function DS(t,e){return{documents:[E_(t,e.path)]}}function VS(t,e){const n={structuredQuery:{}},r=e.path;let s;e.collectionGroup!==null?(s=r,n.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(s=r.popLast(),n.structuredQuery.from=[{collectionId:r.lastSegment()}]),n.parent=E_(t,s);const i=function(h){if(h.length!==0)return w_(an.create(h,"and"))}(e.filters);i&&(n.structuredQuery.where=i);const o=function(h){if(h.length!==0)return h.map(d=>function(g){return{field:os(g.field),direction:xS(g.dir)}}(d))}(e.orderBy);o&&(n.structuredQuery.orderBy=o);const c=pl(t,e.limit);return c!==null&&(n.structuredQuery.limit=c),e.startAt&&(n.structuredQuery.startAt=function(h){return{before:h.inclusive,values:h.position}}(e.startAt)),e.endAt&&(n.structuredQuery.endAt=function(h){return{before:!h.inclusive,values:h.position}}(e.endAt)),{_t:n,parent:s}}function OS(t){let e=SS(t.parent);const n=t.structuredQuery,r=n.from?n.from.length:0;let s=null;if(r>0){ke(r===1);const d=n.from[0];d.allDescendants?s=d.collectionId:e=e.child(d.collectionId)}let i=[];n.where&&(i=function(p){const g=I_(p);return g instanceof an&&Xg(g)?g.getFilters():[g]}(n.where));let o=[];n.orderBy&&(o=function(p){return p.map(g=>function(P){return new Mi(as(P.field),function(D){switch(D){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(P.direction))}(g))}(n.orderBy));let c=null;n.limit&&(c=function(p){let g;return g=typeof p=="object"?p.value:p,ka(g)?null:g}(n.limit));let l=null;n.startAt&&(l=function(p){const g=!!p.before,_=p.values||[];return new Xo(_,g)}(n.startAt));let h=null;return n.endAt&&(h=function(p){const g=!p.before,_=p.values||[];return new Xo(_,g)}(n.endAt)),XR(e,s,o,i,c,"F",l,h)}function NS(t,e){const n=function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return ae()}}(e.purpose);return n==null?null:{"goog-listen-tags":n}}function I_(t){return t.unaryFilter!==void 0?function(n){switch(n.unaryFilter.op){case"IS_NAN":const r=as(n.unaryFilter.field);return Ye.create(r,"==",{doubleValue:NaN});case"IS_NULL":const s=as(n.unaryFilter.field);return Ye.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=as(n.unaryFilter.field);return Ye.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const o=as(n.unaryFilter.field);return Ye.create(o,"!=",{nullValue:"NULL_VALUE"});default:return ae()}}(t):t.fieldFilter!==void 0?function(n){return Ye.create(as(n.fieldFilter.field),function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return ae()}}(n.fieldFilter.op),n.fieldFilter.value)}(t):t.compositeFilter!==void 0?function(n){return an.create(n.compositeFilter.filters.map(r=>I_(r)),function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return ae()}}(n.compositeFilter.op))}(t):ae()}function xS(t){return IS[t]}function MS(t){return wS[t]}function LS(t){return AS[t]}function os(t){return{fieldPath:t.canonicalString()}}function as(t){return at.fromServerFormat(t.fieldPath)}function w_(t){return t instanceof Ye?function(n){if(n.op==="=="){if(Tf(n.value))return{unaryFilter:{field:os(n.field),op:"IS_NAN"}};if(Ef(n.value))return{unaryFilter:{field:os(n.field),op:"IS_NULL"}}}else if(n.op==="!="){if(Tf(n.value))return{unaryFilter:{field:os(n.field),op:"IS_NOT_NAN"}};if(Ef(n.value))return{unaryFilter:{field:os(n.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:os(n.field),op:MS(n.op),value:n.value}}}(t):t instanceof an?function(n){const r=n.getFilters().map(s=>w_(s));return r.length===1?r[0]:{compositeFilter:{op:LS(n.op),filters:r}}}(t):ae()}function FS(t){const e=[];return t.fields.forEach(n=>e.push(n.canonicalString())),{fieldPaths:e}}function A_(t){return t.length>=4&&t.get(0)==="projects"&&t.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tr{constructor(e,n,r,s,i=ue.min(),o=ue.min(),c=lt.EMPTY_BYTE_STRING,l=null){this.target=e,this.targetId=n,this.purpose=r,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=c,this.expectedCount=l}withSequenceNumber(e){return new tr(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,n){return new tr(this.target,this.targetId,this.purpose,this.sequenceNumber,n,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new tr(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new tr(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class US{constructor(e){this.ct=e}}function BS(t){const e=OS({parent:t.parent,structuredQuery:t.structuredQuery});return t.limitType==="LAST"?fl(e,e.limit,"L"):e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jS{constructor(){this.un=new $S}addToCollectionParentIndex(e,n){return this.un.add(n),L.resolve()}getCollectionParents(e,n){return L.resolve(this.un.getEntries(n))}addFieldIndex(e,n){return L.resolve()}deleteFieldIndex(e,n){return L.resolve()}deleteAllFieldIndexes(e){return L.resolve()}createTargetIndexes(e,n){return L.resolve()}getDocumentsMatchingTarget(e,n){return L.resolve(null)}getIndexType(e,n){return L.resolve(0)}getFieldIndexes(e,n){return L.resolve([])}getNextCollectionGroupToUpdate(e){return L.resolve(null)}getMinOffset(e,n){return L.resolve(cr.min())}getMinOffsetFromCollectionGroup(e,n){return L.resolve(cr.min())}updateCollectionGroup(e,n,r){return L.resolve()}updateIndexEntries(e,n){return L.resolve()}}class $S{constructor(){this.index={}}add(e){const n=e.lastSegment(),r=e.popLast(),s=this.index[n]||new nt(Fe.comparator),i=!s.has(r);return this.index[n]=s.add(r),i}has(e){const n=e.lastSegment(),r=e.popLast(),s=this.index[n];return s&&s.has(r)}getEntries(e){return(this.index[e]||new nt(Fe.comparator)).toArray()}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mf={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0};class Pt{constructor(e,n,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=n,this.maximumSequenceNumbersToCollect=r}static withCacheSize(e){return new Pt(e,Pt.DEFAULT_COLLECTION_PERCENTILE,Pt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Pt.DEFAULT_COLLECTION_PERCENTILE=10,Pt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,Pt.DEFAULT=new Pt(41943040,Pt.DEFAULT_COLLECTION_PERCENTILE,Pt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),Pt.DISABLED=new Pt(-1,0,0);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rs{constructor(e){this.Ln=e}next(){return this.Ln+=2,this.Ln}static Bn(){return new Rs(0)}static kn(){return new Rs(-1)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Lf([t,e],[n,r]){const s=Ie(t,n);return s===0?Ie(e,r):s}class qS{constructor(e){this.Un=e,this.buffer=new nt(Lf),this.Wn=0}Gn(){return++this.Wn}zn(e){const n=[e,this.Gn()];if(this.buffer.size<this.Un)this.buffer=this.buffer.add(n);else{const r=this.buffer.last();Lf(n,r)<0&&(this.buffer=this.buffer.delete(r).add(n))}}get maxValue(){return this.buffer.last()[0]}}class HS{constructor(e,n,r){this.garbageCollector=e,this.asyncQueue=n,this.localStore=r,this.jn=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Hn(6e4)}stop(){this.jn&&(this.jn.cancel(),this.jn=null)}get started(){return this.jn!==null}Hn(e){X("LruGarbageCollector",`Garbage collection scheduled in ${e}ms`),this.jn=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.jn=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(n){xs(n)?X("LruGarbageCollector","Ignoring IndexedDB error during garbage collection: ",n):await Ns(n)}await this.Hn(3e5)})}}class zS{constructor(e,n){this.Jn=e,this.params=n}calculateTargetCount(e,n){return this.Jn.Yn(e).next(r=>Math.floor(n/100*r))}nthSequenceNumber(e,n){if(n===0)return L.resolve(Ca.oe);const r=new qS(n);return this.Jn.forEachTarget(e,s=>r.zn(s.sequenceNumber)).next(()=>this.Jn.Zn(e,s=>r.zn(s))).next(()=>r.maxValue)}removeTargets(e,n,r){return this.Jn.removeTargets(e,n,r)}removeOrphanedDocuments(e,n){return this.Jn.removeOrphanedDocuments(e,n)}collect(e,n){return this.params.cacheSizeCollectionThreshold===-1?(X("LruGarbageCollector","Garbage collection skipped; disabled"),L.resolve(Mf)):this.getCacheSize(e).next(r=>r<this.params.cacheSizeCollectionThreshold?(X("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),Mf):this.Xn(e,n))}getCacheSize(e){return this.Jn.getCacheSize(e)}Xn(e,n){let r,s,i,o,c,l,h;const d=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(p=>(p>this.params.maximumSequenceNumbersToCollect?(X("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${p}`),s=this.params.maximumSequenceNumbersToCollect):s=p,o=Date.now(),this.nthSequenceNumber(e,s))).next(p=>(r=p,c=Date.now(),this.removeTargets(e,r,n))).next(p=>(i=p,l=Date.now(),this.removeOrphanedDocuments(e,r))).next(p=>(h=Date.now(),ss()<=_e.DEBUG&&X("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${o-d}ms
	Determined least recently used ${s} in `+(c-o)+`ms
	Removed ${i} targets in `+(l-c)+`ms
	Removed ${p} documents in `+(h-l)+`ms
Total Duration: ${h-d}ms`),L.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:i,documentsRemoved:p})))}}function WS(t,e){return new zS(t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class KS{constructor(){this.changes=new Kr(e=>e.toString(),(e,n)=>e.isEqual(n)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,n){this.assertNotApplied(),this.changes.set(e,yt.newInvalidDocument(e).setReadTime(n))}getEntry(e,n){this.assertNotApplied();const r=this.changes.get(n);return r!==void 0?L.resolve(r):this.getFromCache(e,n)}getEntries(e,n){return this.getAllFromCache(e,n)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class GS{constructor(e,n){this.overlayedDocument=e,this.mutatedFields=n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class QS{constructor(e,n,r,s){this.remoteDocumentCache=e,this.mutationQueue=n,this.documentOverlayCache=r,this.indexManager=s}getDocument(e,n){let r=null;return this.documentOverlayCache.getOverlay(e,n).next(s=>(r=s,this.remoteDocumentCache.getEntry(e,n))).next(s=>(r!==null&&Ei(r.mutation,s,Lt.empty(),Xe.now()),s))}getDocuments(e,n){return this.remoteDocumentCache.getEntries(e,n).next(r=>this.getLocalViewOfDocuments(e,r,ye()).next(()=>r))}getLocalViewOfDocuments(e,n,r=ye()){const s=kr();return this.populateOverlays(e,s,n).next(()=>this.computeViews(e,n,s,r).next(i=>{let o=si();return i.forEach((c,l)=>{o=o.insert(c,l.overlayedDocument)}),o}))}getOverlayedDocuments(e,n){const r=kr();return this.populateOverlays(e,r,n).next(()=>this.computeViews(e,n,r,ye()))}populateOverlays(e,n,r){const s=[];return r.forEach(i=>{n.has(i)||s.push(i)}),this.documentOverlayCache.getOverlays(e,s).next(i=>{i.forEach((o,c)=>{n.set(o,c)})})}computeViews(e,n,r,s){let i=Ln();const o=vi(),c=function(){return vi()}();return n.forEach((l,h)=>{const d=r.get(h.key);s.has(h.key)&&(d===void 0||d.mutation instanceof vr)?i=i.insert(h.key,h):d!==void 0?(o.set(h.key,d.mutation.getFieldMask()),Ei(d.mutation,h,d.mutation.getFieldMask(),Xe.now())):o.set(h.key,Lt.empty())}),this.recalculateAndSaveOverlays(e,i).next(l=>(l.forEach((h,d)=>o.set(h,d)),n.forEach((h,d)=>{var p;return c.set(h,new GS(d,(p=o.get(h))!==null&&p!==void 0?p:null))}),c))}recalculateAndSaveOverlays(e,n){const r=vi();let s=new qe((o,c)=>o-c),i=ye();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,n).next(o=>{for(const c of o)c.keys().forEach(l=>{const h=n.get(l);if(h===null)return;let d=r.get(l)||Lt.empty();d=c.applyToLocalView(h,d),r.set(l,d);const p=(s.get(c.batchId)||ye()).add(l);s=s.insert(c.batchId,p)})}).next(()=>{const o=[],c=s.getReverseIterator();for(;c.hasNext();){const l=c.getNext(),h=l.key,d=l.value,p=a_();d.forEach(g=>{if(!i.has(g)){const _=f_(n.get(g),r.get(g));_!==null&&p.set(g,_),i=i.add(g)}}),o.push(this.documentOverlayCache.saveOverlays(e,h,p))}return L.waitFor(o)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,n){return this.remoteDocumentCache.getEntries(e,n).next(r=>this.recalculateAndSaveOverlays(e,r))}getDocumentsMatchingQuery(e,n,r,s){return function(o){return re.isDocumentKey(o.path)&&o.collectionGroup===null&&o.filters.length===0}(n)?this.getDocumentsMatchingDocumentQuery(e,n.path):n_(n)?this.getDocumentsMatchingCollectionGroupQuery(e,n,r,s):this.getDocumentsMatchingCollectionQuery(e,n,r,s)}getNextDocuments(e,n,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,n,r,s).next(i=>{const o=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,n,r.largestBatchId,s-i.size):L.resolve(kr());let c=-1,l=i;return o.next(h=>L.forEach(h,(d,p)=>(c<p.largestBatchId&&(c=p.largestBatchId),i.get(d)?L.resolve():this.remoteDocumentCache.getEntry(e,d).next(g=>{l=l.insert(d,g)}))).next(()=>this.populateOverlays(e,h,i)).next(()=>this.computeViews(e,l,h,ye())).next(d=>({batchId:c,changes:o_(d)})))})}getDocumentsMatchingDocumentQuery(e,n){return this.getDocument(e,new re(n)).next(r=>{let s=si();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s})}getDocumentsMatchingCollectionGroupQuery(e,n,r,s){const i=n.collectionGroup;let o=si();return this.indexManager.getCollectionParents(e,i).next(c=>L.forEach(c,l=>{const h=function(p,g){return new Ms(g,null,p.explicitOrderBy.slice(),p.filters.slice(),p.limit,p.limitType,p.startAt,p.endAt)}(n,l.child(i));return this.getDocumentsMatchingCollectionQuery(e,h,r,s).next(d=>{d.forEach((p,g)=>{o=o.insert(p,g)})})}).next(()=>o))}getDocumentsMatchingCollectionQuery(e,n,r,s){let i;return this.documentOverlayCache.getOverlaysForCollection(e,n.path,r.largestBatchId).next(o=>(i=o,this.remoteDocumentCache.getDocumentsMatchingQuery(e,n,r,i,s))).next(o=>{i.forEach((l,h)=>{const d=h.getKey();o.get(d)===null&&(o=o.insert(d,yt.newInvalidDocument(d)))});let c=si();return o.forEach((l,h)=>{const d=i.get(l);d!==void 0&&Ei(d.mutation,h,Lt.empty(),Xe.now()),Na(n,h)&&(c=c.insert(l,h))}),c})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class YS{constructor(e){this.serializer=e,this.hr=new Map,this.Pr=new Map}getBundleMetadata(e,n){return L.resolve(this.hr.get(n))}saveBundleMetadata(e,n){return this.hr.set(n.id,function(s){return{id:s.id,version:s.version,createTime:yn(s.createTime)}}(n)),L.resolve()}getNamedQuery(e,n){return L.resolve(this.Pr.get(n))}saveNamedQuery(e,n){return this.Pr.set(n.name,function(s){return{name:s.name,query:BS(s.bundledQuery),readTime:yn(s.readTime)}}(n)),L.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class JS{constructor(){this.overlays=new qe(re.comparator),this.Ir=new Map}getOverlay(e,n){return L.resolve(this.overlays.get(n))}getOverlays(e,n){const r=kr();return L.forEach(n,s=>this.getOverlay(e,s).next(i=>{i!==null&&r.set(s,i)})).next(()=>r)}saveOverlays(e,n,r){return r.forEach((s,i)=>{this.ht(e,n,i)}),L.resolve()}removeOverlaysForBatchId(e,n,r){const s=this.Ir.get(r);return s!==void 0&&(s.forEach(i=>this.overlays=this.overlays.remove(i)),this.Ir.delete(r)),L.resolve()}getOverlaysForCollection(e,n,r){const s=kr(),i=n.length+1,o=new re(n.child("")),c=this.overlays.getIteratorFrom(o);for(;c.hasNext();){const l=c.getNext().value,h=l.getKey();if(!n.isPrefixOf(h.path))break;h.path.length===i&&l.largestBatchId>r&&s.set(l.getKey(),l)}return L.resolve(s)}getOverlaysForCollectionGroup(e,n,r,s){let i=new qe((h,d)=>h-d);const o=this.overlays.getIterator();for(;o.hasNext();){const h=o.getNext().value;if(h.getKey().getCollectionGroup()===n&&h.largestBatchId>r){let d=i.get(h.largestBatchId);d===null&&(d=kr(),i=i.insert(h.largestBatchId,d)),d.set(h.getKey(),h)}}const c=kr(),l=i.getIterator();for(;l.hasNext()&&(l.getNext().value.forEach((h,d)=>c.set(h,d)),!(c.size()>=s)););return L.resolve(c)}ht(e,n,r){const s=this.overlays.get(r.key);if(s!==null){const o=this.Ir.get(s.largestBatchId).delete(r.key);this.Ir.set(s.largestBatchId,o)}this.overlays=this.overlays.insert(r.key,new gS(n,r));let i=this.Ir.get(n);i===void 0&&(i=ye(),this.Ir.set(n,i)),this.Ir.set(n,i.add(r.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class XS{constructor(){this.sessionToken=lt.EMPTY_BYTE_STRING}getSessionToken(e){return L.resolve(this.sessionToken)}setSessionToken(e,n){return this.sessionToken=n,L.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _u{constructor(){this.Tr=new nt(et.Er),this.dr=new nt(et.Ar)}isEmpty(){return this.Tr.isEmpty()}addReference(e,n){const r=new et(e,n);this.Tr=this.Tr.add(r),this.dr=this.dr.add(r)}Rr(e,n){e.forEach(r=>this.addReference(r,n))}removeReference(e,n){this.Vr(new et(e,n))}mr(e,n){e.forEach(r=>this.removeReference(r,n))}gr(e){const n=new re(new Fe([])),r=new et(n,e),s=new et(n,e+1),i=[];return this.dr.forEachInRange([r,s],o=>{this.Vr(o),i.push(o.key)}),i}pr(){this.Tr.forEach(e=>this.Vr(e))}Vr(e){this.Tr=this.Tr.delete(e),this.dr=this.dr.delete(e)}yr(e){const n=new re(new Fe([])),r=new et(n,e),s=new et(n,e+1);let i=ye();return this.dr.forEachInRange([r,s],o=>{i=i.add(o.key)}),i}containsKey(e){const n=new et(e,0),r=this.Tr.firstAfterOrEqual(n);return r!==null&&e.isEqual(r.key)}}class et{constructor(e,n){this.key=e,this.wr=n}static Er(e,n){return re.comparator(e.key,n.key)||Ie(e.wr,n.wr)}static Ar(e,n){return Ie(e.wr,n.wr)||re.comparator(e.key,n.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ZS{constructor(e,n){this.indexManager=e,this.referenceDelegate=n,this.mutationQueue=[],this.Sr=1,this.br=new nt(et.Er)}checkEmpty(e){return L.resolve(this.mutationQueue.length===0)}addMutationBatch(e,n,r,s){const i=this.Sr;this.Sr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new mS(i,n,r,s);this.mutationQueue.push(o);for(const c of s)this.br=this.br.add(new et(c.key,i)),this.indexManager.addToCollectionParentIndex(e,c.key.path.popLast());return L.resolve(o)}lookupMutationBatch(e,n){return L.resolve(this.Dr(n))}getNextMutationBatchAfterBatchId(e,n){const r=n+1,s=this.vr(r),i=s<0?0:s;return L.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return L.resolve(this.mutationQueue.length===0?-1:this.Sr-1)}getAllMutationBatches(e){return L.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,n){const r=new et(n,0),s=new et(n,Number.POSITIVE_INFINITY),i=[];return this.br.forEachInRange([r,s],o=>{const c=this.Dr(o.wr);i.push(c)}),L.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,n){let r=new nt(Ie);return n.forEach(s=>{const i=new et(s,0),o=new et(s,Number.POSITIVE_INFINITY);this.br.forEachInRange([i,o],c=>{r=r.add(c.wr)})}),L.resolve(this.Cr(r))}getAllMutationBatchesAffectingQuery(e,n){const r=n.path,s=r.length+1;let i=r;re.isDocumentKey(i)||(i=i.child(""));const o=new et(new re(i),0);let c=new nt(Ie);return this.br.forEachWhile(l=>{const h=l.key.path;return!!r.isPrefixOf(h)&&(h.length===s&&(c=c.add(l.wr)),!0)},o),L.resolve(this.Cr(c))}Cr(e){const n=[];return e.forEach(r=>{const s=this.Dr(r);s!==null&&n.push(s)}),n}removeMutationBatch(e,n){ke(this.Fr(n.batchId,"removed")===0),this.mutationQueue.shift();let r=this.br;return L.forEach(n.mutations,s=>{const i=new et(s.key,n.batchId);return r=r.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)}).next(()=>{this.br=r})}On(e){}containsKey(e,n){const r=new et(n,0),s=this.br.firstAfterOrEqual(r);return L.resolve(n.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,L.resolve()}Fr(e,n){return this.vr(e)}vr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Dr(e){const n=this.vr(e);return n<0||n>=this.mutationQueue.length?null:this.mutationQueue[n]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eP{constructor(e){this.Mr=e,this.docs=function(){return new qe(re.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,n){const r=n.key,s=this.docs.get(r),i=s?s.size:0,o=this.Mr(n);return this.docs=this.docs.insert(r,{document:n.mutableCopy(),size:o}),this.size+=o-i,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const n=this.docs.get(e);n&&(this.docs=this.docs.remove(e),this.size-=n.size)}getEntry(e,n){const r=this.docs.get(n);return L.resolve(r?r.document.mutableCopy():yt.newInvalidDocument(n))}getEntries(e,n){let r=Ln();return n.forEach(s=>{const i=this.docs.get(s);r=r.insert(s,i?i.document.mutableCopy():yt.newInvalidDocument(s))}),L.resolve(r)}getDocumentsMatchingQuery(e,n,r,s){let i=Ln();const o=n.path,c=new re(o.child("")),l=this.docs.getIteratorFrom(c);for(;l.hasNext();){const{key:h,value:{document:d}}=l.getNext();if(!o.isPrefixOf(h.path))break;h.path.length>o.length+1||DR(kR(d),r)<=0||(s.has(d.key)||Na(n,d))&&(i=i.insert(d.key,d.mutableCopy()))}return L.resolve(i)}getAllFromCollectionGroup(e,n,r,s){ae()}Or(e,n){return L.forEach(this.docs,r=>n(r))}newChangeBuffer(e){return new tP(this)}getSize(e){return L.resolve(this.size)}}class tP extends KS{constructor(e){super(),this.cr=e}applyChanges(e){const n=[];return this.changes.forEach((r,s)=>{s.isValidDocument()?n.push(this.cr.addEntry(e,s)):this.cr.removeEntry(r)}),L.waitFor(n)}getFromCache(e,n){return this.cr.getEntry(e,n)}getAllFromCache(e,n){return this.cr.getEntries(e,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nP{constructor(e){this.persistence=e,this.Nr=new Kr(n=>uu(n),hu),this.lastRemoteSnapshotVersion=ue.min(),this.highestTargetId=0,this.Lr=0,this.Br=new _u,this.targetCount=0,this.kr=Rs.Bn()}forEachTarget(e,n){return this.Nr.forEach((r,s)=>n(s)),L.resolve()}getLastRemoteSnapshotVersion(e){return L.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return L.resolve(this.Lr)}allocateTargetId(e){return this.highestTargetId=this.kr.next(),L.resolve(this.highestTargetId)}setTargetsMetadata(e,n,r){return r&&(this.lastRemoteSnapshotVersion=r),n>this.Lr&&(this.Lr=n),L.resolve()}Kn(e){this.Nr.set(e.target,e);const n=e.targetId;n>this.highestTargetId&&(this.kr=new Rs(n),this.highestTargetId=n),e.sequenceNumber>this.Lr&&(this.Lr=e.sequenceNumber)}addTargetData(e,n){return this.Kn(n),this.targetCount+=1,L.resolve()}updateTargetData(e,n){return this.Kn(n),L.resolve()}removeTargetData(e,n){return this.Nr.delete(n.target),this.Br.gr(n.targetId),this.targetCount-=1,L.resolve()}removeTargets(e,n,r){let s=0;const i=[];return this.Nr.forEach((o,c)=>{c.sequenceNumber<=n&&r.get(c.targetId)===null&&(this.Nr.delete(o),i.push(this.removeMatchingKeysForTargetId(e,c.targetId)),s++)}),L.waitFor(i).next(()=>s)}getTargetCount(e){return L.resolve(this.targetCount)}getTargetData(e,n){const r=this.Nr.get(n)||null;return L.resolve(r)}addMatchingKeys(e,n,r){return this.Br.Rr(n,r),L.resolve()}removeMatchingKeys(e,n,r){this.Br.mr(n,r);const s=this.persistence.referenceDelegate,i=[];return s&&n.forEach(o=>{i.push(s.markPotentiallyOrphaned(e,o))}),L.waitFor(i)}removeMatchingKeysForTargetId(e,n){return this.Br.gr(n),L.resolve()}getMatchingKeysForTargetId(e,n){const r=this.Br.yr(n);return L.resolve(r)}containsKey(e,n){return L.resolve(this.Br.containsKey(n))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class b_{constructor(e,n){this.qr={},this.overlays={},this.Qr=new Ca(0),this.Kr=!1,this.Kr=!0,this.$r=new XS,this.referenceDelegate=e(this),this.Ur=new nP(this),this.indexManager=new jS,this.remoteDocumentCache=function(s){return new eP(s)}(r=>this.referenceDelegate.Wr(r)),this.serializer=new US(n),this.Gr=new YS(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.Kr=!1,Promise.resolve()}get started(){return this.Kr}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let n=this.overlays[e.toKey()];return n||(n=new JS,this.overlays[e.toKey()]=n),n}getMutationQueue(e,n){let r=this.qr[e.toKey()];return r||(r=new ZS(n,this.referenceDelegate),this.qr[e.toKey()]=r),r}getGlobalsCache(){return this.$r}getTargetCache(){return this.Ur}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Gr}runTransaction(e,n,r){X("MemoryPersistence","Starting transaction:",e);const s=new rP(this.Qr.next());return this.referenceDelegate.zr(),r(s).next(i=>this.referenceDelegate.jr(s).next(()=>i)).toPromise().then(i=>(s.raiseOnCommittedEvent(),i))}Hr(e,n){return L.or(Object.values(this.qr).map(r=>()=>r.containsKey(e,n)))}}class rP extends OR{constructor(e){super(),this.currentSequenceNumber=e}}class yu{constructor(e){this.persistence=e,this.Jr=new _u,this.Yr=null}static Zr(e){return new yu(e)}get Xr(){if(this.Yr)return this.Yr;throw ae()}addReference(e,n,r){return this.Jr.addReference(r,n),this.Xr.delete(r.toString()),L.resolve()}removeReference(e,n,r){return this.Jr.removeReference(r,n),this.Xr.add(r.toString()),L.resolve()}markPotentiallyOrphaned(e,n){return this.Xr.add(n.toString()),L.resolve()}removeTarget(e,n){this.Jr.gr(n.targetId).forEach(s=>this.Xr.add(s.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,n.targetId).next(s=>{s.forEach(i=>this.Xr.add(i.toString()))}).next(()=>r.removeTargetData(e,n))}zr(){this.Yr=new Set}jr(e){const n=this.persistence.getRemoteDocumentCache().newChangeBuffer();return L.forEach(this.Xr,r=>{const s=re.fromPath(r);return this.ei(e,s).next(i=>{i||n.removeEntry(s,ue.min())})}).next(()=>(this.Yr=null,n.apply(e)))}updateLimboDocument(e,n){return this.ei(e,n).next(r=>{r?this.Xr.delete(n.toString()):this.Xr.add(n.toString())})}Wr(e){return 0}ei(e,n){return L.or([()=>L.resolve(this.Jr.containsKey(n)),()=>this.persistence.getTargetCache().containsKey(e,n),()=>this.persistence.Hr(e,n)])}}class na{constructor(e,n){this.persistence=e,this.ti=new Kr(r=>MR(r.path),(r,s)=>r.isEqual(s)),this.garbageCollector=WS(this,n)}static Zr(e,n){return new na(e,n)}zr(){}jr(e){return L.resolve()}forEachTarget(e,n){return this.persistence.getTargetCache().forEachTarget(e,n)}Yn(e){const n=this.er(e);return this.persistence.getTargetCache().getTargetCount(e).next(r=>n.next(s=>r+s))}er(e){let n=0;return this.Zn(e,r=>{n++}).next(()=>n)}Zn(e,n){return L.forEach(this.ti,(r,s)=>this.nr(e,r,s).next(i=>i?L.resolve():n(s)))}removeTargets(e,n,r){return this.persistence.getTargetCache().removeTargets(e,n,r)}removeOrphanedDocuments(e,n){let r=0;const s=this.persistence.getRemoteDocumentCache(),i=s.newChangeBuffer();return s.Or(e,o=>this.nr(e,o,n).next(c=>{c||(r++,i.removeEntry(o,ue.min()))})).next(()=>i.apply(e)).next(()=>r)}markPotentiallyOrphaned(e,n){return this.ti.set(n,e.currentSequenceNumber),L.resolve()}removeTarget(e,n){const r=n.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,r)}addReference(e,n,r){return this.ti.set(r,e.currentSequenceNumber),L.resolve()}removeReference(e,n,r){return this.ti.set(r,e.currentSequenceNumber),L.resolve()}updateLimboDocument(e,n){return this.ti.set(n,e.currentSequenceNumber),L.resolve()}Wr(e){let n=e.key.toString().length;return e.isFoundDocument()&&(n+=Co(e.data.value)),n}nr(e,n,r){return L.or([()=>this.persistence.Hr(e,n),()=>this.persistence.getTargetCache().containsKey(e,n),()=>{const s=this.ti.get(n);return L.resolve(s!==void 0&&s>r)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vu{constructor(e,n,r,s){this.targetId=e,this.fromCache=n,this.$i=r,this.Ui=s}static Wi(e,n){let r=ye(),s=ye();for(const i of n.docChanges)switch(i.type){case 0:r=r.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new vu(e,n.fromCache,r,s)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sP{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iP{constructor(){this.Gi=!1,this.zi=!1,this.ji=100,this.Hi=function(){return vI()?8:NR(Et())>0?6:4}()}initialize(e,n){this.Ji=e,this.indexManager=n,this.Gi=!0}getDocumentsMatchingQuery(e,n,r,s){const i={result:null};return this.Yi(e,n).next(o=>{i.result=o}).next(()=>{if(!i.result)return this.Zi(e,n,s,r).next(o=>{i.result=o})}).next(()=>{if(i.result)return;const o=new sP;return this.Xi(e,n,o).next(c=>{if(i.result=c,this.zi)return this.es(e,n,o,c.size)})}).next(()=>i.result)}es(e,n,r,s){return r.documentReadCount<this.ji?(ss()<=_e.DEBUG&&X("QueryEngine","SDK will not create cache indexes for query:",is(n),"since it only creates cache indexes for collection contains","more than or equal to",this.ji,"documents"),L.resolve()):(ss()<=_e.DEBUG&&X("QueryEngine","Query:",is(n),"scans",r.documentReadCount,"local documents and returns",s,"documents as results."),r.documentReadCount>this.Hi*s?(ss()<=_e.DEBUG&&X("QueryEngine","The SDK decides to create cache indexes for query:",is(n),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,_n(n))):L.resolve())}Yi(e,n){if(bf(n))return L.resolve(null);let r=_n(n);return this.indexManager.getIndexType(e,r).next(s=>s===0?null:(n.limit!==null&&s===1&&(n=fl(n,null,"F"),r=_n(n)),this.indexManager.getDocumentsMatchingTarget(e,r).next(i=>{const o=ye(...i);return this.Ji.getDocuments(e,o).next(c=>this.indexManager.getMinOffset(e,r).next(l=>{const h=this.ts(n,c);return this.ns(n,h,o,l.readTime)?this.Yi(e,fl(n,null,"F")):this.rs(e,h,n,l)}))})))}Zi(e,n,r,s){return bf(n)||s.isEqual(ue.min())?L.resolve(null):this.Ji.getDocuments(e,r).next(i=>{const o=this.ts(n,i);return this.ns(n,o,r,s)?L.resolve(null):(ss()<=_e.DEBUG&&X("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),is(n)),this.rs(e,o,n,CR(s,-1)).next(c=>c))})}ts(e,n){let r=new nt(s_(e));return n.forEach((s,i)=>{Na(e,i)&&(r=r.add(i))}),r}ns(e,n,r,s){if(e.limit===null)return!1;if(r.size!==n.size)return!0;const i=e.limitType==="F"?n.last():n.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}Xi(e,n,r){return ss()<=_e.DEBUG&&X("QueryEngine","Using full collection scan to execute query:",is(n)),this.Ji.getDocumentsMatchingQuery(e,n,cr.min(),r)}rs(e,n,r,s){return this.Ji.getDocumentsMatchingQuery(e,r,s).next(i=>(n.forEach(o=>{i=i.insert(o.key,o)}),i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oP{constructor(e,n,r,s){this.persistence=e,this.ss=n,this.serializer=s,this.os=new qe(Ie),this._s=new Kr(i=>uu(i),hu),this.us=new Map,this.cs=e.getRemoteDocumentCache(),this.Ur=e.getTargetCache(),this.Gr=e.getBundleCache(),this.ls(r)}ls(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new QS(this.cs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.cs.setIndexManager(this.indexManager),this.ss.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",n=>e.collect(n,this.os))}}function aP(t,e,n,r){return new oP(t,e,n,r)}async function R_(t,e){const n=de(t);return await n.persistence.runTransaction("Handle user change","readonly",r=>{let s;return n.mutationQueue.getAllMutationBatches(r).next(i=>(s=i,n.ls(e),n.mutationQueue.getAllMutationBatches(r))).next(i=>{const o=[],c=[];let l=ye();for(const h of s){o.push(h.batchId);for(const d of h.mutations)l=l.add(d.key)}for(const h of i){c.push(h.batchId);for(const d of h.mutations)l=l.add(d.key)}return n.localDocuments.getDocuments(r,l).next(h=>({hs:h,removedBatchIds:o,addedBatchIds:c}))})})}function cP(t,e){const n=de(t);return n.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{const s=e.batch.keys(),i=n.cs.newChangeBuffer({trackRemovals:!0});return function(c,l,h,d){const p=h.batch,g=p.keys();let _=L.resolve();return g.forEach(P=>{_=_.next(()=>d.getEntry(l,P)).next(k=>{const D=h.docVersions.get(P);ke(D!==null),k.version.compareTo(D)<0&&(p.applyToRemoteDocument(k,h),k.isValidDocument()&&(k.setReadTime(h.commitVersion),d.addEntry(k)))})}),_.next(()=>c.mutationQueue.removeMutationBatch(l,p))}(n,r,e,i).next(()=>i.apply(r)).next(()=>n.mutationQueue.performConsistencyCheck(r)).next(()=>n.documentOverlayCache.removeOverlaysForBatchId(r,s,e.batch.batchId)).next(()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(c){let l=ye();for(let h=0;h<c.mutationResults.length;++h)c.mutationResults[h].transformResults.length>0&&(l=l.add(c.batch.mutations[h].key));return l}(e))).next(()=>n.localDocuments.getDocuments(r,s))})}function S_(t){const e=de(t);return e.persistence.runTransaction("Get last remote snapshot version","readonly",n=>e.Ur.getLastRemoteSnapshotVersion(n))}function lP(t,e){const n=de(t),r=e.snapshotVersion;let s=n.os;return n.persistence.runTransaction("Apply remote event","readwrite-primary",i=>{const o=n.cs.newChangeBuffer({trackRemovals:!0});s=n.os;const c=[];e.targetChanges.forEach((d,p)=>{const g=s.get(p);if(!g)return;c.push(n.Ur.removeMatchingKeys(i,d.removedDocuments,p).next(()=>n.Ur.addMatchingKeys(i,d.addedDocuments,p)));let _=g.withSequenceNumber(i.currentSequenceNumber);e.targetMismatches.get(p)!==null?_=_.withResumeToken(lt.EMPTY_BYTE_STRING,ue.min()).withLastLimboFreeSnapshotVersion(ue.min()):d.resumeToken.approximateByteSize()>0&&(_=_.withResumeToken(d.resumeToken,r)),s=s.insert(p,_),function(k,D,x){return k.resumeToken.approximateByteSize()===0||D.snapshotVersion.toMicroseconds()-k.snapshotVersion.toMicroseconds()>=3e8?!0:x.addedDocuments.size+x.modifiedDocuments.size+x.removedDocuments.size>0}(g,_,d)&&c.push(n.Ur.updateTargetData(i,_))});let l=Ln(),h=ye();if(e.documentUpdates.forEach(d=>{e.resolvedLimboDocuments.has(d)&&c.push(n.persistence.referenceDelegate.updateLimboDocument(i,d))}),c.push(uP(i,o,e.documentUpdates).next(d=>{l=d.Ps,h=d.Is})),!r.isEqual(ue.min())){const d=n.Ur.getLastRemoteSnapshotVersion(i).next(p=>n.Ur.setTargetsMetadata(i,i.currentSequenceNumber,r));c.push(d)}return L.waitFor(c).next(()=>o.apply(i)).next(()=>n.localDocuments.getLocalViewOfDocuments(i,l,h)).next(()=>l)}).then(i=>(n.os=s,i))}function uP(t,e,n){let r=ye(),s=ye();return n.forEach(i=>r=r.add(i)),e.getEntries(t,r).next(i=>{let o=Ln();return n.forEach((c,l)=>{const h=i.get(c);l.isFoundDocument()!==h.isFoundDocument()&&(s=s.add(c)),l.isNoDocument()&&l.version.isEqual(ue.min())?(e.removeEntry(c,l.readTime),o=o.insert(c,l)):!h.isValidDocument()||l.version.compareTo(h.version)>0||l.version.compareTo(h.version)===0&&h.hasPendingWrites?(e.addEntry(l),o=o.insert(c,l)):X("LocalStore","Ignoring outdated watch update for ",c,". Current version:",h.version," Watch version:",l.version)}),{Ps:o,Is:s}})}function hP(t,e){const n=de(t);return n.persistence.runTransaction("Get next mutation batch","readonly",r=>(e===void 0&&(e=-1),n.mutationQueue.getNextMutationBatchAfterBatchId(r,e)))}function dP(t,e){const n=de(t);return n.persistence.runTransaction("Allocate target","readwrite",r=>{let s;return n.Ur.getTargetData(r,e).next(i=>i?(s=i,L.resolve(s)):n.Ur.allocateTargetId(r).next(o=>(s=new tr(e,o,"TargetPurposeListen",r.currentSequenceNumber),n.Ur.addTargetData(r,s).next(()=>s))))}).then(r=>{const s=n.os.get(r.targetId);return(s===null||r.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(n.os=n.os.insert(r.targetId,r),n._s.set(e,r.targetId)),r})}async function yl(t,e,n){const r=de(t),s=r.os.get(e),i=n?"readwrite":"readwrite-primary";try{n||await r.persistence.runTransaction("Release target",i,o=>r.persistence.referenceDelegate.removeTarget(o,s))}catch(o){if(!xs(o))throw o;X("LocalStore",`Failed to update sequence numbers for target ${e}: ${o}`)}r.os=r.os.remove(e),r._s.delete(s.target)}function Ff(t,e,n){const r=de(t);let s=ue.min(),i=ye();return r.persistence.runTransaction("Execute query","readwrite",o=>function(l,h,d){const p=de(l),g=p._s.get(d);return g!==void 0?L.resolve(p.os.get(g)):p.Ur.getTargetData(h,d)}(r,o,_n(e)).next(c=>{if(c)return s=c.lastLimboFreeSnapshotVersion,r.Ur.getMatchingKeysForTargetId(o,c.targetId).next(l=>{i=l})}).next(()=>r.ss.getDocumentsMatchingQuery(o,e,n?s:ue.min(),n?i:ye())).next(c=>(fP(r,eS(e),c),{documents:c,Ts:i})))}function fP(t,e,n){let r=t.us.get(e)||ue.min();n.forEach((s,i)=>{i.readTime.compareTo(r)>0&&(r=i.readTime)}),t.us.set(e,r)}class Uf{constructor(){this.activeTargetIds=oS()}fs(e){this.activeTargetIds=this.activeTargetIds.add(e)}gs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Vs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class pP{constructor(){this.so=new Uf,this.oo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,n,r){}addLocalQueryTarget(e,n=!0){return n&&this.so.fs(e),this.oo[e]||"not-current"}updateQueryState(e,n,r){this.oo[e]=n}removeLocalQueryTarget(e){this.so.gs(e)}isLocalQueryTarget(e){return this.so.activeTargetIds.has(e)}clearQueryState(e){delete this.oo[e]}getAllActiveQueryTargets(){return this.so.activeTargetIds}isActiveQueryTarget(e){return this.so.activeTargetIds.has(e)}start(){return this.so=new Uf,Promise.resolve()}handleUserChange(e,n,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mP{_o(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bf{constructor(){this.ao=()=>this.uo(),this.co=()=>this.lo(),this.ho=[],this.Po()}_o(e){this.ho.push(e)}shutdown(){window.removeEventListener("online",this.ao),window.removeEventListener("offline",this.co)}Po(){window.addEventListener("online",this.ao),window.addEventListener("offline",this.co)}uo(){X("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(const e of this.ho)e(0)}lo(){X("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(const e of this.ho)e(1)}static D(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Eo=null;function Nc(){return Eo===null?Eo=function(){return 268435456+Math.round(2147483648*Math.random())}():Eo++,"0x"+Eo.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gP={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _P{constructor(e){this.Io=e.Io,this.To=e.To}Eo(e){this.Ao=e}Ro(e){this.Vo=e}mo(e){this.fo=e}onMessage(e){this.po=e}close(){this.To()}send(e){this.Io(e)}yo(){this.Ao()}wo(){this.Vo()}So(e){this.fo(e)}bo(e){this.po(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pt="WebChannelConnection";class yP extends class{constructor(n){this.databaseInfo=n,this.databaseId=n.databaseId;const r=n.ssl?"https":"http",s=encodeURIComponent(this.databaseId.projectId),i=encodeURIComponent(this.databaseId.database);this.Do=r+"://"+n.host,this.vo=`projects/${s}/databases/${i}`,this.Co=this.databaseId.database==="(default)"?`project_id=${s}`:`project_id=${s}&database_id=${i}`}get Fo(){return!1}Mo(n,r,s,i,o){const c=Nc(),l=this.xo(n,r.toUriEncodedString());X("RestConnection",`Sending RPC '${n}' ${c}:`,l,s);const h={"google-cloud-resource-prefix":this.vo,"x-goog-request-params":this.Co};return this.Oo(h,i,o),this.No(n,l,h,s).then(d=>(X("RestConnection",`Received RPC '${n}' ${c}: `,d),d),d=>{throw Is("RestConnection",`RPC '${n}' ${c} failed with error: `,d,"url: ",l,"request:",s),d})}Lo(n,r,s,i,o,c){return this.Mo(n,r,s,i,o)}Oo(n,r,s){n["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+Os}(),n["Content-Type"]="text/plain",this.databaseInfo.appId&&(n["X-Firebase-GMPID"]=this.databaseInfo.appId),r&&r.headers.forEach((i,o)=>n[o]=i),s&&s.headers.forEach((i,o)=>n[o]=i)}xo(n,r){const s=gP[n];return`${this.Do}/v1/${r}:${s}`}terminate(){}}{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}No(e,n,r,s){const i=Nc();return new Promise((o,c)=>{const l=new Bg;l.setWithCredentials(!0),l.listenOnce(jg.COMPLETE,()=>{try{switch(l.getLastErrorCode()){case Po.NO_ERROR:const d=l.getResponseJson();X(pt,`XHR for RPC '${e}' ${i} received:`,JSON.stringify(d)),o(d);break;case Po.TIMEOUT:X(pt,`RPC '${e}' ${i} timed out`),c(new Z(M.DEADLINE_EXCEEDED,"Request time out"));break;case Po.HTTP_ERROR:const p=l.getStatus();if(X(pt,`RPC '${e}' ${i} failed with status:`,p,"response text:",l.getResponseText()),p>0){let g=l.getResponseJson();Array.isArray(g)&&(g=g[0]);const _=g==null?void 0:g.error;if(_&&_.status&&_.message){const P=function(D){const x=D.toLowerCase().replace(/_/g,"-");return Object.values(M).indexOf(x)>=0?x:M.UNKNOWN}(_.status);c(new Z(P,_.message))}else c(new Z(M.UNKNOWN,"Server responded with status "+l.getStatus()))}else c(new Z(M.UNAVAILABLE,"Connection failed."));break;default:ae()}}finally{X(pt,`RPC '${e}' ${i} completed.`)}});const h=JSON.stringify(s);X(pt,`RPC '${e}' ${i} sending request:`,s),l.send(n,"POST",h,r,15)})}Bo(e,n,r){const s=Nc(),i=[this.Do,"/","google.firestore.v1.Firestore","/",e,"/channel"],o=Hg(),c=qg(),l={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},h=this.longPollingOptions.timeoutSeconds;h!==void 0&&(l.longPollingTimeout=Math.round(1e3*h)),this.useFetchStreams&&(l.useFetchStreams=!0),this.Oo(l.initMessageHeaders,n,r),l.encodeInitMessageHeaders=!0;const d=i.join("");X(pt,`Creating RPC '${e}' stream ${s}: ${d}`,l);const p=o.createWebChannel(d,l);let g=!1,_=!1;const P=new _P({Io:D=>{_?X(pt,`Not sending because RPC '${e}' stream ${s} is closed:`,D):(g||(X(pt,`Opening RPC '${e}' stream ${s} transport.`),p.open(),g=!0),X(pt,`RPC '${e}' stream ${s} sending:`,D),p.send(D))},To:()=>p.close()}),k=(D,x,F)=>{D.listen(x,$=>{try{F($)}catch(q){setTimeout(()=>{throw q},0)}})};return k(p,ri.EventType.OPEN,()=>{_||(X(pt,`RPC '${e}' stream ${s} transport opened.`),P.yo())}),k(p,ri.EventType.CLOSE,()=>{_||(_=!0,X(pt,`RPC '${e}' stream ${s} transport closed`),P.So())}),k(p,ri.EventType.ERROR,D=>{_||(_=!0,Is(pt,`RPC '${e}' stream ${s} transport errored:`,D),P.So(new Z(M.UNAVAILABLE,"The operation could not be completed")))}),k(p,ri.EventType.MESSAGE,D=>{var x;if(!_){const F=D.data[0];ke(!!F);const $=F,q=$.error||((x=$[0])===null||x===void 0?void 0:x.error);if(q){X(pt,`RPC '${e}' stream ${s} received error:`,q);const ce=q.status;let le=function(I){const A=Qe[I];if(A!==void 0)return m_(A)}(ce),w=q.message;le===void 0&&(le=M.INTERNAL,w="Unknown error status: "+ce+" with message "+q.message),_=!0,P.So(new Z(le,w)),p.close()}else X(pt,`RPC '${e}' stream ${s} received:`,F),P.bo(F)}}),k(c,$g.STAT_EVENT,D=>{D.stat===al.PROXY?X(pt,`RPC '${e}' stream ${s} detected buffering proxy`):D.stat===al.NOPROXY&&X(pt,`RPC '${e}' stream ${s} detected no buffering proxy`)}),setTimeout(()=>{P.wo()},0),P}}function xc(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fa(t){return new bS(t,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class P_{constructor(e,n,r=1e3,s=1.5,i=6e4){this.ui=e,this.timerId=n,this.ko=r,this.qo=s,this.Qo=i,this.Ko=0,this.$o=null,this.Uo=Date.now(),this.reset()}reset(){this.Ko=0}Wo(){this.Ko=this.Qo}Go(e){this.cancel();const n=Math.floor(this.Ko+this.zo()),r=Math.max(0,Date.now()-this.Uo),s=Math.max(0,n-r);s>0&&X("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.Ko} ms, delay with jitter: ${n} ms, last attempt: ${r} ms ago)`),this.$o=this.ui.enqueueAfterDelay(this.timerId,s,()=>(this.Uo=Date.now(),e())),this.Ko*=this.qo,this.Ko<this.ko&&(this.Ko=this.ko),this.Ko>this.Qo&&(this.Ko=this.Qo)}jo(){this.$o!==null&&(this.$o.skipDelay(),this.$o=null)}cancel(){this.$o!==null&&(this.$o.cancel(),this.$o=null)}zo(){return(Math.random()-.5)*this.Ko}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class C_{constructor(e,n,r,s,i,o,c,l){this.ui=e,this.Ho=r,this.Jo=s,this.connection=i,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=c,this.listener=l,this.state=0,this.Yo=0,this.Zo=null,this.Xo=null,this.stream=null,this.e_=0,this.t_=new P_(e,n)}n_(){return this.state===1||this.state===5||this.r_()}r_(){return this.state===2||this.state===3}start(){this.e_=0,this.state!==4?this.auth():this.i_()}async stop(){this.n_()&&await this.close(0)}s_(){this.state=0,this.t_.reset()}o_(){this.r_()&&this.Zo===null&&(this.Zo=this.ui.enqueueAfterDelay(this.Ho,6e4,()=>this.__()))}a_(e){this.u_(),this.stream.send(e)}async __(){if(this.r_())return this.close(0)}u_(){this.Zo&&(this.Zo.cancel(),this.Zo=null)}c_(){this.Xo&&(this.Xo.cancel(),this.Xo=null)}async close(e,n){this.u_(),this.c_(),this.t_.cancel(),this.Yo++,e!==4?this.t_.reset():n&&n.code===M.RESOURCE_EXHAUSTED?(Mn(n.toString()),Mn("Using maximum backoff delay to prevent overloading the backend."),this.t_.Wo()):n&&n.code===M.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.l_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.mo(n)}l_(){}auth(){this.state=1;const e=this.h_(this.Yo),n=this.Yo;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,s])=>{this.Yo===n&&this.P_(r,s)},r=>{e(()=>{const s=new Z(M.UNKNOWN,"Fetching auth token failed: "+r.message);return this.I_(s)})})}P_(e,n){const r=this.h_(this.Yo);this.stream=this.T_(e,n),this.stream.Eo(()=>{r(()=>this.listener.Eo())}),this.stream.Ro(()=>{r(()=>(this.state=2,this.Xo=this.ui.enqueueAfterDelay(this.Jo,1e4,()=>(this.r_()&&(this.state=3),Promise.resolve())),this.listener.Ro()))}),this.stream.mo(s=>{r(()=>this.I_(s))}),this.stream.onMessage(s=>{r(()=>++this.e_==1?this.E_(s):this.onNext(s))})}i_(){this.state=5,this.t_.Go(async()=>{this.state=0,this.start()})}I_(e){return X("PersistentStream",`close with error: ${e}`),this.stream=null,this.close(4,e)}h_(e){return n=>{this.ui.enqueueAndForget(()=>this.Yo===e?n():(X("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class vP extends C_{constructor(e,n,r,s,i,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",n,r,s,o),this.serializer=i}T_(e,n){return this.connection.Bo("Listen",e,n)}E_(e){return this.onNext(e)}onNext(e){this.t_.reset();const n=PS(this.serializer,e),r=function(i){if(!("targetChange"in i))return ue.min();const o=i.targetChange;return o.targetIds&&o.targetIds.length?ue.min():o.readTime?yn(o.readTime):ue.min()}(e);return this.listener.d_(n,r)}A_(e){const n={};n.database=_l(this.serializer),n.addTarget=function(i,o){let c;const l=o.target;if(c=hl(l)?{documents:DS(i,l)}:{query:VS(i,l)._t},c.targetId=o.targetId,o.resumeToken.approximateByteSize()>0){c.resumeToken=y_(i,o.resumeToken);const h=pl(i,o.expectedCount);h!==null&&(c.expectedCount=h)}else if(o.snapshotVersion.compareTo(ue.min())>0){c.readTime=ta(i,o.snapshotVersion.toTimestamp());const h=pl(i,o.expectedCount);h!==null&&(c.expectedCount=h)}return c}(this.serializer,e);const r=NS(this.serializer,e);r&&(n.labels=r),this.a_(n)}R_(e){const n={};n.database=_l(this.serializer),n.removeTarget=e,this.a_(n)}}class EP extends C_{constructor(e,n,r,s,i,o){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",n,r,s,o),this.serializer=i}get V_(){return this.e_>0}start(){this.lastStreamToken=void 0,super.start()}l_(){this.V_&&this.m_([])}T_(e,n){return this.connection.Bo("Write",e,n)}E_(e){return ke(!!e.streamToken),this.lastStreamToken=e.streamToken,ke(!e.writeResults||e.writeResults.length===0),this.listener.f_()}onNext(e){ke(!!e.streamToken),this.lastStreamToken=e.streamToken,this.t_.reset();const n=kS(e.writeResults,e.commitTime),r=yn(e.commitTime);return this.listener.g_(r,n)}p_(){const e={};e.database=_l(this.serializer),this.a_(e)}m_(e){const n={streamToken:this.lastStreamToken,writes:e.map(r=>CS(this.serializer,r))};this.a_(n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class TP extends class{}{constructor(e,n,r,s){super(),this.authCredentials=e,this.appCheckCredentials=n,this.connection=r,this.serializer=s,this.y_=!1}w_(){if(this.y_)throw new Z(M.FAILED_PRECONDITION,"The client has already been terminated.")}Mo(e,n,r,s){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,o])=>this.connection.Mo(e,ml(n,r),s,i,o)).catch(i=>{throw i.name==="FirebaseError"?(i.code===M.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new Z(M.UNKNOWN,i.toString())})}Lo(e,n,r,s,i){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,c])=>this.connection.Lo(e,ml(n,r),s,o,c,i)).catch(o=>{throw o.name==="FirebaseError"?(o.code===M.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new Z(M.UNKNOWN,o.toString())})}terminate(){this.y_=!0,this.connection.terminate()}}class IP{constructor(e,n){this.asyncQueue=e,this.onlineStateHandler=n,this.state="Unknown",this.S_=0,this.b_=null,this.D_=!0}v_(){this.S_===0&&(this.C_("Unknown"),this.b_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.b_=null,this.F_("Backend didn't respond within 10 seconds."),this.C_("Offline"),Promise.resolve())))}M_(e){this.state==="Online"?this.C_("Unknown"):(this.S_++,this.S_>=1&&(this.x_(),this.F_(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.C_("Offline")))}set(e){this.x_(),this.S_=0,e==="Online"&&(this.D_=!1),this.C_(e)}C_(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}F_(e){const n=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.D_?(Mn(n),this.D_=!1):X("OnlineStateTracker",n)}x_(){this.b_!==null&&(this.b_.cancel(),this.b_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wP{constructor(e,n,r,s,i){this.localStore=e,this.datastore=n,this.asyncQueue=r,this.remoteSyncer={},this.O_=[],this.N_=new Map,this.L_=new Set,this.B_=[],this.k_=i,this.k_._o(o=>{r.enqueueAndForget(async()=>{Gr(this)&&(X("RemoteStore","Restarting streams for network reachability change."),await async function(l){const h=de(l);h.L_.add(4),await Ki(h),h.q_.set("Unknown"),h.L_.delete(4),await Ua(h)}(this))})}),this.q_=new IP(r,s)}}async function Ua(t){if(Gr(t))for(const e of t.B_)await e(!0)}async function Ki(t){for(const e of t.B_)await e(!1)}function k_(t,e){const n=de(t);n.N_.has(e.targetId)||(n.N_.set(e.targetId,e),wu(n)?Iu(n):Ls(n).r_()&&Tu(n,e))}function Eu(t,e){const n=de(t),r=Ls(n);n.N_.delete(e),r.r_()&&D_(n,e),n.N_.size===0&&(r.r_()?r.o_():Gr(n)&&n.q_.set("Unknown"))}function Tu(t,e){if(t.Q_.xe(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(ue.min())>0){const n=t.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(n)}Ls(t).A_(e)}function D_(t,e){t.Q_.xe(e),Ls(t).R_(e)}function Iu(t){t.Q_=new TS({getRemoteKeysForTarget:e=>t.remoteSyncer.getRemoteKeysForTarget(e),ot:e=>t.N_.get(e)||null,tt:()=>t.datastore.serializer.databaseId}),Ls(t).start(),t.q_.v_()}function wu(t){return Gr(t)&&!Ls(t).n_()&&t.N_.size>0}function Gr(t){return de(t).L_.size===0}function V_(t){t.Q_=void 0}async function AP(t){t.q_.set("Online")}async function bP(t){t.N_.forEach((e,n)=>{Tu(t,e)})}async function RP(t,e){V_(t),wu(t)?(t.q_.M_(e),Iu(t)):t.q_.set("Unknown")}async function SP(t,e,n){if(t.q_.set("Online"),e instanceof __&&e.state===2&&e.cause)try{await async function(s,i){const o=i.cause;for(const c of i.targetIds)s.N_.has(c)&&(await s.remoteSyncer.rejectListen(c,o),s.N_.delete(c),s.Q_.removeTarget(c))}(t,e)}catch(r){X("RemoteStore","Failed to remove targets %s: %s ",e.targetIds.join(","),r),await ra(t,r)}else if(e instanceof Vo?t.Q_.Ke(e):e instanceof g_?t.Q_.He(e):t.Q_.We(e),!n.isEqual(ue.min()))try{const r=await S_(t.localStore);n.compareTo(r)>=0&&await function(i,o){const c=i.Q_.rt(o);return c.targetChanges.forEach((l,h)=>{if(l.resumeToken.approximateByteSize()>0){const d=i.N_.get(h);d&&i.N_.set(h,d.withResumeToken(l.resumeToken,o))}}),c.targetMismatches.forEach((l,h)=>{const d=i.N_.get(l);if(!d)return;i.N_.set(l,d.withResumeToken(lt.EMPTY_BYTE_STRING,d.snapshotVersion)),D_(i,l);const p=new tr(d.target,l,h,d.sequenceNumber);Tu(i,p)}),i.remoteSyncer.applyRemoteEvent(c)}(t,n)}catch(r){X("RemoteStore","Failed to raise snapshot:",r),await ra(t,r)}}async function ra(t,e,n){if(!xs(e))throw e;t.L_.add(1),await Ki(t),t.q_.set("Offline"),n||(n=()=>S_(t.localStore)),t.asyncQueue.enqueueRetryable(async()=>{X("RemoteStore","Retrying IndexedDB access"),await n(),t.L_.delete(1),await Ua(t)})}function O_(t,e){return e().catch(n=>ra(t,n,e))}async function Ba(t){const e=de(t),n=dr(e);let r=e.O_.length>0?e.O_[e.O_.length-1].batchId:-1;for(;PP(e);)try{const s=await hP(e.localStore,r);if(s===null){e.O_.length===0&&n.o_();break}r=s.batchId,CP(e,s)}catch(s){await ra(e,s)}N_(e)&&x_(e)}function PP(t){return Gr(t)&&t.O_.length<10}function CP(t,e){t.O_.push(e);const n=dr(t);n.r_()&&n.V_&&n.m_(e.mutations)}function N_(t){return Gr(t)&&!dr(t).n_()&&t.O_.length>0}function x_(t){dr(t).start()}async function kP(t){dr(t).p_()}async function DP(t){const e=dr(t);for(const n of t.O_)e.m_(n.mutations)}async function VP(t,e,n){const r=t.O_.shift(),s=pu.from(r,e,n);await O_(t,()=>t.remoteSyncer.applySuccessfulWrite(s)),await Ba(t)}async function OP(t,e){e&&dr(t).V_&&await async function(r,s){if(function(o){return yS(o)&&o!==M.ABORTED}(s.code)){const i=r.O_.shift();dr(r).s_(),await O_(r,()=>r.remoteSyncer.rejectFailedWrite(i.batchId,s)),await Ba(r)}}(t,e),N_(t)&&x_(t)}async function jf(t,e){const n=de(t);n.asyncQueue.verifyOperationInProgress(),X("RemoteStore","RemoteStore received new credentials");const r=Gr(n);n.L_.add(3),await Ki(n),r&&n.q_.set("Unknown"),await n.remoteSyncer.handleCredentialChange(e),n.L_.delete(3),await Ua(n)}async function NP(t,e){const n=de(t);e?(n.L_.delete(2),await Ua(n)):e||(n.L_.add(2),await Ki(n),n.q_.set("Unknown"))}function Ls(t){return t.K_||(t.K_=function(n,r,s){const i=de(n);return i.w_(),new vP(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(t.datastore,t.asyncQueue,{Eo:AP.bind(null,t),Ro:bP.bind(null,t),mo:RP.bind(null,t),d_:SP.bind(null,t)}),t.B_.push(async e=>{e?(t.K_.s_(),wu(t)?Iu(t):t.q_.set("Unknown")):(await t.K_.stop(),V_(t))})),t.K_}function dr(t){return t.U_||(t.U_=function(n,r,s){const i=de(n);return i.w_(),new EP(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(t.datastore,t.asyncQueue,{Eo:()=>Promise.resolve(),Ro:kP.bind(null,t),mo:OP.bind(null,t),f_:DP.bind(null,t),g_:VP.bind(null,t)}),t.B_.push(async e=>{e?(t.U_.s_(),await Ba(t)):(await t.U_.stop(),t.O_.length>0&&(X("RemoteStore",`Stopping write stream with ${t.O_.length} pending writes`),t.O_=[]))})),t.U_}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Au{constructor(e,n,r,s,i){this.asyncQueue=e,this.timerId=n,this.targetTimeMs=r,this.op=s,this.removalCallback=i,this.deferred=new On,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(o=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,n,r,s,i){const o=Date.now()+r,c=new Au(e,n,o,s,i);return c.start(r),c}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new Z(M.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function bu(t,e){if(Mn("AsyncQueue",`${e}: ${t}`),xs(t))return new Z(M.UNAVAILABLE,`${e}: ${t}`);throw t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _s{constructor(e){this.comparator=e?(n,r)=>e(n,r)||re.comparator(n.key,r.key):(n,r)=>re.comparator(n.key,r.key),this.keyedMap=si(),this.sortedSet=new qe(this.comparator)}static emptySet(e){return new _s(e.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const n=this.keyedMap.get(e);return n?this.sortedSet.indexOf(n):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((n,r)=>(e(n),!1))}add(e){const n=this.delete(e.key);return n.copy(n.keyedMap.insert(e.key,e),n.sortedSet.insert(e,null))}delete(e){const n=this.get(e);return n?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(n)):this}isEqual(e){if(!(e instanceof _s)||this.size!==e.size)return!1;const n=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;n.hasNext();){const s=n.getNext().key,i=r.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){const e=[];return this.forEach(n=>{e.push(n.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,n){const r=new _s;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=n,r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $f{constructor(){this.W_=new qe(re.comparator)}track(e){const n=e.doc.key,r=this.W_.get(n);r?e.type!==0&&r.type===3?this.W_=this.W_.insert(n,e):e.type===3&&r.type!==1?this.W_=this.W_.insert(n,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.W_=this.W_.insert(n,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.W_=this.W_.insert(n,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.W_=this.W_.remove(n):e.type===1&&r.type===2?this.W_=this.W_.insert(n,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.W_=this.W_.insert(n,{type:2,doc:e.doc}):ae():this.W_=this.W_.insert(n,e)}G_(){const e=[];return this.W_.inorderTraversal((n,r)=>{e.push(r)}),e}}class Ss{constructor(e,n,r,s,i,o,c,l,h){this.query=e,this.docs=n,this.oldDocs=r,this.docChanges=s,this.mutatedKeys=i,this.fromCache=o,this.syncStateChanged=c,this.excludesMetadataChanges=l,this.hasCachedResults=h}static fromInitialDocuments(e,n,r,s,i){const o=[];return n.forEach(c=>{o.push({type:0,doc:c})}),new Ss(e,n,_s.emptySet(n),o,r,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&Oa(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const n=this.docChanges,r=e.docChanges;if(n.length!==r.length)return!1;for(let s=0;s<n.length;s++)if(n[s].type!==r[s].type||!n[s].doc.isEqual(r[s].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xP{constructor(){this.z_=void 0,this.j_=[]}H_(){return this.j_.some(e=>e.J_())}}class MP{constructor(){this.queries=qf(),this.onlineState="Unknown",this.Y_=new Set}terminate(){(function(n,r){const s=de(n),i=s.queries;s.queries=qf(),i.forEach((o,c)=>{for(const l of c.j_)l.onError(r)})})(this,new Z(M.ABORTED,"Firestore shutting down"))}}function qf(){return new Kr(t=>r_(t),Oa)}async function Ru(t,e){const n=de(t);let r=3;const s=e.query;let i=n.queries.get(s);i?!i.H_()&&e.J_()&&(r=2):(i=new xP,r=e.J_()?0:1);try{switch(r){case 0:i.z_=await n.onListen(s,!0);break;case 1:i.z_=await n.onListen(s,!1);break;case 2:await n.onFirstRemoteStoreListen(s)}}catch(o){const c=bu(o,`Initialization of query '${is(e.query)}' failed`);return void e.onError(c)}n.queries.set(s,i),i.j_.push(e),e.Z_(n.onlineState),i.z_&&e.X_(i.z_)&&Pu(n)}async function Su(t,e){const n=de(t),r=e.query;let s=3;const i=n.queries.get(r);if(i){const o=i.j_.indexOf(e);o>=0&&(i.j_.splice(o,1),i.j_.length===0?s=e.J_()?0:1:!i.H_()&&e.J_()&&(s=2))}switch(s){case 0:return n.queries.delete(r),n.onUnlisten(r,!0);case 1:return n.queries.delete(r),n.onUnlisten(r,!1);case 2:return n.onLastRemoteStoreUnlisten(r);default:return}}function LP(t,e){const n=de(t);let r=!1;for(const s of e){const i=s.query,o=n.queries.get(i);if(o){for(const c of o.j_)c.X_(s)&&(r=!0);o.z_=s}}r&&Pu(n)}function FP(t,e,n){const r=de(t),s=r.queries.get(e);if(s)for(const i of s.j_)i.onError(n);r.queries.delete(e)}function Pu(t){t.Y_.forEach(e=>{e.next()})}var vl,Hf;(Hf=vl||(vl={})).ea="default",Hf.Cache="cache";class Cu{constructor(e,n,r){this.query=e,this.ta=n,this.na=!1,this.ra=null,this.onlineState="Unknown",this.options=r||{}}X_(e){if(!this.options.includeMetadataChanges){const r=[];for(const s of e.docChanges)s.type!==3&&r.push(s);e=new Ss(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let n=!1;return this.na?this.ia(e)&&(this.ta.next(e),n=!0):this.sa(e,this.onlineState)&&(this.oa(e),n=!0),this.ra=e,n}onError(e){this.ta.error(e)}Z_(e){this.onlineState=e;let n=!1;return this.ra&&!this.na&&this.sa(this.ra,e)&&(this.oa(this.ra),n=!0),n}sa(e,n){if(!e.fromCache||!this.J_())return!0;const r=n!=="Offline";return(!this.options._a||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||n==="Offline")}ia(e){if(e.docChanges.length>0)return!0;const n=this.ra&&this.ra.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!n)&&this.options.includeMetadataChanges===!0}oa(e){e=Ss.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.na=!0,this.ta.next(e)}J_(){return this.options.source!==vl.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class M_{constructor(e){this.key=e}}class L_{constructor(e){this.key=e}}class UP{constructor(e,n){this.query=e,this.Ta=n,this.Ea=null,this.hasCachedResults=!1,this.current=!1,this.da=ye(),this.mutatedKeys=ye(),this.Aa=s_(e),this.Ra=new _s(this.Aa)}get Va(){return this.Ta}ma(e,n){const r=n?n.fa:new $f,s=n?n.Ra:this.Ra;let i=n?n.mutatedKeys:this.mutatedKeys,o=s,c=!1;const l=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,h=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(e.inorderTraversal((d,p)=>{const g=s.get(d),_=Na(this.query,p)?p:null,P=!!g&&this.mutatedKeys.has(g.key),k=!!_&&(_.hasLocalMutations||this.mutatedKeys.has(_.key)&&_.hasCommittedMutations);let D=!1;g&&_?g.data.isEqual(_.data)?P!==k&&(r.track({type:3,doc:_}),D=!0):this.ga(g,_)||(r.track({type:2,doc:_}),D=!0,(l&&this.Aa(_,l)>0||h&&this.Aa(_,h)<0)&&(c=!0)):!g&&_?(r.track({type:0,doc:_}),D=!0):g&&!_&&(r.track({type:1,doc:g}),D=!0,(l||h)&&(c=!0)),D&&(_?(o=o.add(_),i=k?i.add(d):i.delete(d)):(o=o.delete(d),i=i.delete(d)))}),this.query.limit!==null)for(;o.size>this.query.limit;){const d=this.query.limitType==="F"?o.last():o.first();o=o.delete(d.key),i=i.delete(d.key),r.track({type:1,doc:d})}return{Ra:o,fa:r,ns:c,mutatedKeys:i}}ga(e,n){return e.hasLocalMutations&&n.hasCommittedMutations&&!n.hasLocalMutations}applyChanges(e,n,r,s){const i=this.Ra;this.Ra=e.Ra,this.mutatedKeys=e.mutatedKeys;const o=e.fa.G_();o.sort((d,p)=>function(_,P){const k=D=>{switch(D){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return ae()}};return k(_)-k(P)}(d.type,p.type)||this.Aa(d.doc,p.doc)),this.pa(r),s=s!=null&&s;const c=n&&!s?this.ya():[],l=this.da.size===0&&this.current&&!s?1:0,h=l!==this.Ea;return this.Ea=l,o.length!==0||h?{snapshot:new Ss(this.query,e.Ra,i,o,e.mutatedKeys,l===0,h,!1,!!r&&r.resumeToken.approximateByteSize()>0),wa:c}:{wa:c}}Z_(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({Ra:this.Ra,fa:new $f,mutatedKeys:this.mutatedKeys,ns:!1},!1)):{wa:[]}}Sa(e){return!this.Ta.has(e)&&!!this.Ra.has(e)&&!this.Ra.get(e).hasLocalMutations}pa(e){e&&(e.addedDocuments.forEach(n=>this.Ta=this.Ta.add(n)),e.modifiedDocuments.forEach(n=>{}),e.removedDocuments.forEach(n=>this.Ta=this.Ta.delete(n)),this.current=e.current)}ya(){if(!this.current)return[];const e=this.da;this.da=ye(),this.Ra.forEach(r=>{this.Sa(r.key)&&(this.da=this.da.add(r.key))});const n=[];return e.forEach(r=>{this.da.has(r)||n.push(new L_(r))}),this.da.forEach(r=>{e.has(r)||n.push(new M_(r))}),n}ba(e){this.Ta=e.Ts,this.da=ye();const n=this.ma(e.documents);return this.applyChanges(n,!0)}Da(){return Ss.fromInitialDocuments(this.query,this.Ra,this.mutatedKeys,this.Ea===0,this.hasCachedResults)}}class BP{constructor(e,n,r){this.query=e,this.targetId=n,this.view=r}}class jP{constructor(e){this.key=e,this.va=!1}}class $P{constructor(e,n,r,s,i,o){this.localStore=e,this.remoteStore=n,this.eventManager=r,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=o,this.Ca={},this.Fa=new Kr(c=>r_(c),Oa),this.Ma=new Map,this.xa=new Set,this.Oa=new qe(re.comparator),this.Na=new Map,this.La=new _u,this.Ba={},this.ka=new Map,this.qa=Rs.kn(),this.onlineState="Unknown",this.Qa=void 0}get isPrimaryClient(){return this.Qa===!0}}async function qP(t,e,n=!0){const r=q_(t);let s;const i=r.Fa.get(e);return i?(r.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.Da()):s=await F_(r,e,n,!0),s}async function HP(t,e){const n=q_(t);await F_(n,e,!0,!1)}async function F_(t,e,n,r){const s=await dP(t.localStore,_n(e)),i=s.targetId,o=t.sharedClientState.addLocalQueryTarget(i,n);let c;return r&&(c=await zP(t,e,i,o==="current",s.resumeToken)),t.isPrimaryClient&&n&&k_(t.remoteStore,s),c}async function zP(t,e,n,r,s){t.Ka=(p,g,_)=>async function(k,D,x,F){let $=D.view.ma(x);$.ns&&($=await Ff(k.localStore,D.query,!1).then(({documents:w})=>D.view.ma(w,$)));const q=F&&F.targetChanges.get(D.targetId),ce=F&&F.targetMismatches.get(D.targetId)!=null,le=D.view.applyChanges($,k.isPrimaryClient,q,ce);return Wf(k,D.targetId,le.wa),le.snapshot}(t,p,g,_);const i=await Ff(t.localStore,e,!0),o=new UP(e,i.Ts),c=o.ma(i.documents),l=Wi.createSynthesizedTargetChangeForCurrentChange(n,r&&t.onlineState!=="Offline",s),h=o.applyChanges(c,t.isPrimaryClient,l);Wf(t,n,h.wa);const d=new BP(e,n,o);return t.Fa.set(e,d),t.Ma.has(n)?t.Ma.get(n).push(e):t.Ma.set(n,[e]),h.snapshot}async function WP(t,e,n){const r=de(t),s=r.Fa.get(e),i=r.Ma.get(s.targetId);if(i.length>1)return r.Ma.set(s.targetId,i.filter(o=>!Oa(o,e))),void r.Fa.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(s.targetId),r.sharedClientState.isActiveQueryTarget(s.targetId)||await yl(r.localStore,s.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(s.targetId),n&&Eu(r.remoteStore,s.targetId),El(r,s.targetId)}).catch(Ns)):(El(r,s.targetId),await yl(r.localStore,s.targetId,!0))}async function KP(t,e){const n=de(t),r=n.Fa.get(e),s=n.Ma.get(r.targetId);n.isPrimaryClient&&s.length===1&&(n.sharedClientState.removeLocalQueryTarget(r.targetId),Eu(n.remoteStore,r.targetId))}async function GP(t,e,n){const r=tC(t);try{const s=await function(o,c){const l=de(o),h=Xe.now(),d=c.reduce((_,P)=>_.add(P.key),ye());let p,g;return l.persistence.runTransaction("Locally write mutations","readwrite",_=>{let P=Ln(),k=ye();return l.cs.getEntries(_,d).next(D=>{P=D,P.forEach((x,F)=>{F.isValidDocument()||(k=k.add(x))})}).next(()=>l.localDocuments.getOverlayedDocuments(_,P)).next(D=>{p=D;const x=[];for(const F of c){const $=fS(F,p.get(F.key).overlayedDocument);$!=null&&x.push(new vr(F.key,$,Qg($.value.mapValue),tn.exists(!0)))}return l.mutationQueue.addMutationBatch(_,h,x,c)}).next(D=>{g=D;const x=D.applyToLocalDocumentSet(p,k);return l.documentOverlayCache.saveOverlays(_,D.batchId,x)})}).then(()=>({batchId:g.batchId,changes:o_(p)}))}(r.localStore,e);r.sharedClientState.addPendingMutation(s.batchId),function(o,c,l){let h=o.Ba[o.currentUser.toKey()];h||(h=new qe(Ie)),h=h.insert(c,l),o.Ba[o.currentUser.toKey()]=h}(r,s.batchId,n),await Gi(r,s.changes),await Ba(r.remoteStore)}catch(s){const i=bu(s,"Failed to persist write");n.reject(i)}}async function U_(t,e){const n=de(t);try{const r=await lP(n.localStore,e);e.targetChanges.forEach((s,i)=>{const o=n.Na.get(i);o&&(ke(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1),s.addedDocuments.size>0?o.va=!0:s.modifiedDocuments.size>0?ke(o.va):s.removedDocuments.size>0&&(ke(o.va),o.va=!1))}),await Gi(n,r,e)}catch(r){await Ns(r)}}function zf(t,e,n){const r=de(t);if(r.isPrimaryClient&&n===0||!r.isPrimaryClient&&n===1){const s=[];r.Fa.forEach((i,o)=>{const c=o.view.Z_(e);c.snapshot&&s.push(c.snapshot)}),function(o,c){const l=de(o);l.onlineState=c;let h=!1;l.queries.forEach((d,p)=>{for(const g of p.j_)g.Z_(c)&&(h=!0)}),h&&Pu(l)}(r.eventManager,e),s.length&&r.Ca.d_(s),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function QP(t,e,n){const r=de(t);r.sharedClientState.updateQueryState(e,"rejected",n);const s=r.Na.get(e),i=s&&s.key;if(i){let o=new qe(re.comparator);o=o.insert(i,yt.newNoDocument(i,ue.min()));const c=ye().add(i),l=new La(ue.min(),new Map,new qe(Ie),o,c);await U_(r,l),r.Oa=r.Oa.remove(i),r.Na.delete(e),ku(r)}else await yl(r.localStore,e,!1).then(()=>El(r,e,n)).catch(Ns)}async function YP(t,e){const n=de(t),r=e.batch.batchId;try{const s=await cP(n.localStore,e);j_(n,r,null),B_(n,r),n.sharedClientState.updateMutationState(r,"acknowledged"),await Gi(n,s)}catch(s){await Ns(s)}}async function JP(t,e,n){const r=de(t);try{const s=await function(o,c){const l=de(o);return l.persistence.runTransaction("Reject batch","readwrite-primary",h=>{let d;return l.mutationQueue.lookupMutationBatch(h,c).next(p=>(ke(p!==null),d=p.keys(),l.mutationQueue.removeMutationBatch(h,p))).next(()=>l.mutationQueue.performConsistencyCheck(h)).next(()=>l.documentOverlayCache.removeOverlaysForBatchId(h,d,c)).next(()=>l.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(h,d)).next(()=>l.localDocuments.getDocuments(h,d))})}(r.localStore,e);j_(r,e,n),B_(r,e),r.sharedClientState.updateMutationState(e,"rejected",n),await Gi(r,s)}catch(s){await Ns(s)}}function B_(t,e){(t.ka.get(e)||[]).forEach(n=>{n.resolve()}),t.ka.delete(e)}function j_(t,e,n){const r=de(t);let s=r.Ba[r.currentUser.toKey()];if(s){const i=s.get(e);i&&(n?i.reject(n):i.resolve(),s=s.remove(e)),r.Ba[r.currentUser.toKey()]=s}}function El(t,e,n=null){t.sharedClientState.removeLocalQueryTarget(e);for(const r of t.Ma.get(e))t.Fa.delete(r),n&&t.Ca.$a(r,n);t.Ma.delete(e),t.isPrimaryClient&&t.La.gr(e).forEach(r=>{t.La.containsKey(r)||$_(t,r)})}function $_(t,e){t.xa.delete(e.path.canonicalString());const n=t.Oa.get(e);n!==null&&(Eu(t.remoteStore,n),t.Oa=t.Oa.remove(e),t.Na.delete(n),ku(t))}function Wf(t,e,n){for(const r of n)r instanceof M_?(t.La.addReference(r.key,e),XP(t,r)):r instanceof L_?(X("SyncEngine","Document no longer in limbo: "+r.key),t.La.removeReference(r.key,e),t.La.containsKey(r.key)||$_(t,r.key)):ae()}function XP(t,e){const n=e.key,r=n.path.canonicalString();t.Oa.get(n)||t.xa.has(r)||(X("SyncEngine","New document in limbo: "+n),t.xa.add(r),ku(t))}function ku(t){for(;t.xa.size>0&&t.Oa.size<t.maxConcurrentLimboResolutions;){const e=t.xa.values().next().value;t.xa.delete(e);const n=new re(Fe.fromString(e)),r=t.qa.next();t.Na.set(r,new jP(n)),t.Oa=t.Oa.insert(n,r),k_(t.remoteStore,new tr(_n(Va(n.path)),r,"TargetPurposeLimboResolution",Ca.oe))}}async function Gi(t,e,n){const r=de(t),s=[],i=[],o=[];r.Fa.isEmpty()||(r.Fa.forEach((c,l)=>{o.push(r.Ka(l,e,n).then(h=>{var d;if((h||n)&&r.isPrimaryClient){const p=h?!h.fromCache:(d=n==null?void 0:n.targetChanges.get(l.targetId))===null||d===void 0?void 0:d.current;r.sharedClientState.updateQueryState(l.targetId,p?"current":"not-current")}if(h){s.push(h);const p=vu.Wi(l.targetId,h);i.push(p)}}))}),await Promise.all(o),r.Ca.d_(s),await async function(l,h){const d=de(l);try{await d.persistence.runTransaction("notifyLocalViewChanges","readwrite",p=>L.forEach(h,g=>L.forEach(g.$i,_=>d.persistence.referenceDelegate.addReference(p,g.targetId,_)).next(()=>L.forEach(g.Ui,_=>d.persistence.referenceDelegate.removeReference(p,g.targetId,_)))))}catch(p){if(!xs(p))throw p;X("LocalStore","Failed to update sequence numbers: "+p)}for(const p of h){const g=p.targetId;if(!p.fromCache){const _=d.os.get(g),P=_.snapshotVersion,k=_.withLastLimboFreeSnapshotVersion(P);d.os=d.os.insert(g,k)}}}(r.localStore,i))}async function ZP(t,e){const n=de(t);if(!n.currentUser.isEqual(e)){X("SyncEngine","User change. New user:",e.toKey());const r=await R_(n.localStore,e);n.currentUser=e,function(i,o){i.ka.forEach(c=>{c.forEach(l=>{l.reject(new Z(M.CANCELLED,o))})}),i.ka.clear()}(n,"'waitForPendingWrites' promise is rejected due to a user change."),n.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await Gi(n,r.hs)}}function eC(t,e){const n=de(t),r=n.Na.get(e);if(r&&r.va)return ye().add(r.key);{let s=ye();const i=n.Ma.get(e);if(!i)return s;for(const o of i){const c=n.Fa.get(o);s=s.unionWith(c.view.Va)}return s}}function q_(t){const e=de(t);return e.remoteStore.remoteSyncer.applyRemoteEvent=U_.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=eC.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=QP.bind(null,e),e.Ca.d_=LP.bind(null,e.eventManager),e.Ca.$a=FP.bind(null,e.eventManager),e}function tC(t){const e=de(t);return e.remoteStore.remoteSyncer.applySuccessfulWrite=YP.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=JP.bind(null,e),e}class sa{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=Fa(e.databaseInfo.databaseId),this.sharedClientState=this.Wa(e),this.persistence=this.Ga(e),await this.persistence.start(),this.localStore=this.za(e),this.gcScheduler=this.ja(e,this.localStore),this.indexBackfillerScheduler=this.Ha(e,this.localStore)}ja(e,n){return null}Ha(e,n){return null}za(e){return aP(this.persistence,new iP,e.initialUser,this.serializer)}Ga(e){return new b_(yu.Zr,this.serializer)}Wa(e){return new pP}async terminate(){var e,n;(e=this.gcScheduler)===null||e===void 0||e.stop(),(n=this.indexBackfillerScheduler)===null||n===void 0||n.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}sa.provider={build:()=>new sa};class nC extends sa{constructor(e){super(),this.cacheSizeBytes=e}ja(e,n){ke(this.persistence.referenceDelegate instanceof na);const r=this.persistence.referenceDelegate.garbageCollector;return new HS(r,e.asyncQueue,n)}Ga(e){const n=this.cacheSizeBytes!==void 0?Pt.withCacheSize(this.cacheSizeBytes):Pt.DEFAULT;return new b_(r=>na.Zr(r,n),this.serializer)}}class Tl{async initialize(e,n){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(n),this.remoteStore=this.createRemoteStore(n),this.eventManager=this.createEventManager(n),this.syncEngine=this.createSyncEngine(n,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>zf(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=ZP.bind(null,this.syncEngine),await NP(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new MP}()}createDatastore(e){const n=Fa(e.databaseInfo.databaseId),r=function(i){return new yP(i)}(e.databaseInfo);return function(i,o,c,l){return new TP(i,o,c,l)}(e.authCredentials,e.appCheckCredentials,r,n)}createRemoteStore(e){return function(r,s,i,o,c){return new wP(r,s,i,o,c)}(this.localStore,this.datastore,e.asyncQueue,n=>zf(this.syncEngine,n,0),function(){return Bf.D()?new Bf:new mP}())}createSyncEngine(e,n){return function(s,i,o,c,l,h,d){const p=new $P(s,i,o,c,l,h);return d&&(p.Qa=!0),p}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,n)}async terminate(){var e,n;await async function(s){const i=de(s);X("RemoteStore","RemoteStore shutting down."),i.L_.add(5),await Ki(i),i.k_.shutdown(),i.q_.set("Unknown")}(this.remoteStore),(e=this.datastore)===null||e===void 0||e.terminate(),(n=this.eventManager)===null||n===void 0||n.terminate()}}Tl.provider={build:()=>new Tl};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Du{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ya(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ya(this.observer.error,e):Mn("Uncaught Error in snapshot listener:",e.toString()))}Za(){this.muted=!0}Ya(e,n){setTimeout(()=>{this.muted||e(n)},0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rC{constructor(e,n,r,s,i){this.authCredentials=e,this.appCheckCredentials=n,this.asyncQueue=r,this.databaseInfo=s,this.user=mt.UNAUTHENTICATED,this.clientId=Wg.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(r,async o=>{X("FirestoreClient","Received user=",o.uid),await this.authCredentialListener(o),this.user=o}),this.appCheckCredentials.start(r,o=>(X("FirestoreClient","Received new app check token=",o),this.appCheckCredentialListener(o,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new On;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(n){const r=bu(n,"Failed to shutdown persistence");e.reject(r)}}),e.promise}}async function Mc(t,e){t.asyncQueue.verifyOperationInProgress(),X("FirestoreClient","Initializing OfflineComponentProvider");const n=t.configuration;await e.initialize(n);let r=n.initialUser;t.setCredentialChangeListener(async s=>{r.isEqual(s)||(await R_(e.localStore,s),r=s)}),e.persistence.setDatabaseDeletedListener(()=>t.terminate()),t._offlineComponents=e}async function Kf(t,e){t.asyncQueue.verifyOperationInProgress();const n=await sC(t);X("FirestoreClient","Initializing OnlineComponentProvider"),await e.initialize(n,t.configuration),t.setCredentialChangeListener(r=>jf(e.remoteStore,r)),t.setAppCheckTokenChangeListener((r,s)=>jf(e.remoteStore,s)),t._onlineComponents=e}async function sC(t){if(!t._offlineComponents)if(t._uninitializedComponentsProvider){X("FirestoreClient","Using user provided OfflineComponentProvider");try{await Mc(t,t._uninitializedComponentsProvider._offline)}catch(e){const n=e;if(!function(s){return s.name==="FirebaseError"?s.code===M.FAILED_PRECONDITION||s.code===M.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11}(n))throw n;Is("Error using user provided cache. Falling back to memory cache: "+n),await Mc(t,new sa)}}else X("FirestoreClient","Using default OfflineComponentProvider"),await Mc(t,new nC(void 0));return t._offlineComponents}async function H_(t){return t._onlineComponents||(t._uninitializedComponentsProvider?(X("FirestoreClient","Using user provided OnlineComponentProvider"),await Kf(t,t._uninitializedComponentsProvider._online)):(X("FirestoreClient","Using default OnlineComponentProvider"),await Kf(t,new Tl))),t._onlineComponents}function iC(t){return H_(t).then(e=>e.syncEngine)}async function ia(t){const e=await H_(t),n=e.eventManager;return n.onListen=qP.bind(null,e.syncEngine),n.onUnlisten=WP.bind(null,e.syncEngine),n.onFirstRemoteStoreListen=HP.bind(null,e.syncEngine),n.onLastRemoteStoreUnlisten=KP.bind(null,e.syncEngine),n}function oC(t,e,n={}){const r=new On;return t.asyncQueue.enqueueAndForget(async()=>function(i,o,c,l,h){const d=new Du({next:g=>{d.Za(),o.enqueueAndForget(()=>Su(i,p));const _=g.docs.has(c);!_&&g.fromCache?h.reject(new Z(M.UNAVAILABLE,"Failed to get document because the client is offline.")):_&&g.fromCache&&l&&l.source==="server"?h.reject(new Z(M.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):h.resolve(g)},error:g=>h.reject(g)}),p=new Cu(Va(c.path),d,{includeMetadataChanges:!0,_a:!0});return Ru(i,p)}(await ia(t),t.asyncQueue,e,n,r)),r.promise}function aC(t,e,n={}){const r=new On;return t.asyncQueue.enqueueAndForget(async()=>function(i,o,c,l,h){const d=new Du({next:g=>{d.Za(),o.enqueueAndForget(()=>Su(i,p)),g.fromCache&&l.source==="server"?h.reject(new Z(M.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):h.resolve(g)},error:g=>h.reject(g)}),p=new Cu(c,d,{includeMetadataChanges:!0,_a:!0});return Ru(i,p)}(await ia(t),t.asyncQueue,e,n,r)),r.promise}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function z_(t){const e={};return t.timeoutSeconds!==void 0&&(e.timeoutSeconds=t.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gf=new Map;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function W_(t,e,n){if(!n)throw new Z(M.INVALID_ARGUMENT,`Function ${t}() cannot be called with an empty ${e}.`)}function cC(t,e,n,r){if(e===!0&&r===!0)throw new Z(M.INVALID_ARGUMENT,`${t} and ${n} cannot be used together.`)}function Qf(t){if(!re.isDocumentKey(t))throw new Z(M.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${t} has ${t.length}.`)}function Yf(t){if(re.isDocumentKey(t))throw new Z(M.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${t} has ${t.length}.`)}function ja(t){if(t===void 0)return"undefined";if(t===null)return"null";if(typeof t=="string")return t.length>20&&(t=`${t.substring(0,20)}...`),JSON.stringify(t);if(typeof t=="number"||typeof t=="boolean")return""+t;if(typeof t=="object"){if(t instanceof Array)return"an array";{const e=function(r){return r.constructor?r.constructor.name:null}(t);return e?`a custom ${e} object`:"an object"}}return typeof t=="function"?"a function":ae()}function zt(t,e){if("_delegate"in t&&(t=t._delegate),!(t instanceof e)){if(e.name===t.constructor.name)throw new Z(M.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=ja(t);throw new Z(M.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${n}`)}}return t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jf{constructor(e){var n,r;if(e.host===void 0){if(e.ssl!==void 0)throw new Z(M.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=(n=e.ssl)===null||n===void 0||n;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new Z(M.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}cC("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=z_((r=e.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),function(i){if(i.timeoutSeconds!==void 0){if(isNaN(i.timeoutSeconds))throw new Z(M.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (must not be NaN)`);if(i.timeoutSeconds<5)throw new Z(M.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (minimum allowed value is 5)`);if(i.timeoutSeconds>30)throw new Z(M.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,s){return r.timeoutSeconds===s.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class $a{constructor(e,n,r,s){this._authCredentials=e,this._appCheckCredentials=n,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Jf({}),this._settingsFrozen=!1,this._terminateTask="notTerminated"}get app(){if(!this._app)throw new Z(M.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new Z(M.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Jf(e),e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new ER;switch(r.type){case"firstParty":return new AR(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new Z(M.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(n){const r=Gf.get(n);r&&(X("ComponentProvider","Removing Datastore"),Gf.delete(n),r.terminate())}(this),Promise.resolve()}}function lC(t,e,n,r={}){var s;const i=(t=zt(t,$a))._getSettings(),o=`${e}:${n}`;if(i.host!=="firestore.googleapis.com"&&i.host!==o&&Is("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."),t._setSettings(Object.assign(Object.assign({},i),{host:o,ssl:!1})),r.mockUserToken){let c,l;if(typeof r.mockUserToken=="string")c=r.mockUserToken,l=mt.MOCK_USER;else{c=fI(r.mockUserToken,(s=t._app)===null||s===void 0?void 0:s.options.projectId);const h=r.mockUserToken.sub||r.mockUserToken.user_id;if(!h)throw new Z(M.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");l=new mt(h)}t._authCredentials=new TR(new zg(c,l))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Er{constructor(e,n,r){this.converter=n,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new Er(this.firestore,e,this._query)}}class Rt{constructor(e,n,r){this.converter=n,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new ar(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new Rt(this.firestore,e,this._key)}}class ar extends Er{constructor(e,n,r){super(e,n,Va(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new Rt(this.firestore,null,new re(e))}withConverter(e){return new ar(this.firestore,e,this._path)}}function K_(t,e,...n){if(t=Ke(t),W_("collection","path",e),t instanceof $a){const r=Fe.fromString(e,...n);return Yf(r),new ar(t,null,r)}{if(!(t instanceof Rt||t instanceof ar))throw new Z(M.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=t._path.child(Fe.fromString(e,...n));return Yf(r),new ar(t.firestore,null,r)}}function fn(t,e,...n){if(t=Ke(t),arguments.length===1&&(e=Wg.newId()),W_("doc","path",e),t instanceof $a){const r=Fe.fromString(e,...n);return Qf(r),new Rt(t,null,new re(r))}{if(!(t instanceof Rt||t instanceof ar))throw new Z(M.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=t._path.child(Fe.fromString(e,...n));return Qf(r),new Rt(t.firestore,t instanceof ar?t.converter:null,new re(r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xf{constructor(e=Promise.resolve()){this.Pu=[],this.Iu=!1,this.Tu=[],this.Eu=null,this.du=!1,this.Au=!1,this.Ru=[],this.t_=new P_(this,"async_queue_retry"),this.Vu=()=>{const r=xc();r&&X("AsyncQueue","Visibility state changed to "+r.visibilityState),this.t_.jo()},this.mu=e;const n=xc();n&&typeof n.addEventListener=="function"&&n.addEventListener("visibilitychange",this.Vu)}get isShuttingDown(){return this.Iu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.fu(),this.gu(e)}enterRestrictedMode(e){if(!this.Iu){this.Iu=!0,this.Au=e||!1;const n=xc();n&&typeof n.removeEventListener=="function"&&n.removeEventListener("visibilitychange",this.Vu)}}enqueue(e){if(this.fu(),this.Iu)return new Promise(()=>{});const n=new On;return this.gu(()=>this.Iu&&this.Au?Promise.resolve():(e().then(n.resolve,n.reject),n.promise)).then(()=>n.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Pu.push(e),this.pu()))}async pu(){if(this.Pu.length!==0){try{await this.Pu[0](),this.Pu.shift(),this.t_.reset()}catch(e){if(!xs(e))throw e;X("AsyncQueue","Operation failed with retryable error: "+e)}this.Pu.length>0&&this.t_.Go(()=>this.pu())}}gu(e){const n=this.mu.then(()=>(this.du=!0,e().catch(r=>{this.Eu=r,this.du=!1;const s=function(o){let c=o.message||"";return o.stack&&(c=o.stack.includes(o.message)?o.stack:o.message+`
`+o.stack),c}(r);throw Mn("INTERNAL UNHANDLED ERROR: ",s),r}).then(r=>(this.du=!1,r))));return this.mu=n,n}enqueueAfterDelay(e,n,r){this.fu(),this.Ru.indexOf(e)>-1&&(n=0);const s=Au.createAndSchedule(this,e,n,r,i=>this.yu(i));return this.Tu.push(s),s}fu(){this.Eu&&ae()}verifyOperationInProgress(){}async wu(){let e;do e=this.mu,await e;while(e!==this.mu)}Su(e){for(const n of this.Tu)if(n.timerId===e)return!0;return!1}bu(e){return this.wu().then(()=>{this.Tu.sort((n,r)=>n.targetTimeMs-r.targetTimeMs);for(const n of this.Tu)if(n.skipDelay(),e!=="all"&&n.timerId===e)break;return this.wu()})}Du(e){this.Ru.push(e)}yu(e){const n=this.Tu.indexOf(e);this.Tu.splice(n,1)}}function Zf(t){return function(n,r){if(typeof n!="object"||n===null)return!1;const s=n;for(const i of r)if(i in s&&typeof s[i]=="function")return!0;return!1}(t,["next","error","complete"])}class fr extends $a{constructor(e,n,r,s){super(e,n,r,s),this.type="firestore",this._queue=new Xf,this._persistenceKey=(s==null?void 0:s.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new Xf(e),this._firestoreClient=void 0,await e}}}function uC(t,e){const n=typeof t=="object"?t:Wl(),r=typeof t=="string"?t:"(default)",s=zr(n,"firestore").getImmediate({identifier:r});if(!s._initialized){const i=hI("firestore");i&&lC(s,...i)}return s}function qa(t){if(t._terminated)throw new Z(M.FAILED_PRECONDITION,"The client has already been terminated.");return t._firestoreClient||hC(t),t._firestoreClient}function hC(t){var e,n,r;const s=t._freezeSettings(),i=function(c,l,h,d){return new UR(c,l,h,d.host,d.ssl,d.experimentalForceLongPolling,d.experimentalAutoDetectLongPolling,z_(d.experimentalLongPollingOptions),d.useFetchStreams)}(t._databaseId,((e=t._app)===null||e===void 0?void 0:e.options.appId)||"",t._persistenceKey,s);t._componentsProvider||!((n=s.localCache)===null||n===void 0)&&n._offlineComponentProvider&&(!((r=s.localCache)===null||r===void 0)&&r._onlineComponentProvider)&&(t._componentsProvider={_offline:s.localCache._offlineComponentProvider,_online:s.localCache._onlineComponentProvider}),t._firestoreClient=new rC(t._authCredentials,t._appCheckCredentials,t._queue,i,t._componentsProvider&&function(c){const l=c==null?void 0:c._online.build();return{_offline:c==null?void 0:c._offline.build(l),_online:l}}(t._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ps{constructor(e){this._byteString=e}static fromBase64String(e){try{return new Ps(lt.fromBase64String(e))}catch(n){throw new Z(M.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+n)}}static fromUint8Array(e){return new Ps(lt.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ha{constructor(...e){for(let n=0;n<e.length;++n)if(e[n].length===0)throw new Z(M.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new at(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vu{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ou{constructor(e,n){if(!isFinite(e)||e<-90||e>90)throw new Z(M.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(n)||n<-180||n>180)throw new Z(M.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+n);this._lat=e,this._long=n}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return Ie(this._lat,e._lat)||Ie(this._long,e._long)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nu{constructor(e){this._values=(e||[]).map(n=>n)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(r,s){if(r.length!==s.length)return!1;for(let i=0;i<r.length;++i)if(r[i]!==s[i])return!1;return!0}(this._values,e._values)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dC=/^__.*__$/;class fC{constructor(e,n,r){this.data=e,this.fieldMask=n,this.fieldTransforms=r}toMutation(e,n){return this.fieldMask!==null?new vr(e,this.data,this.fieldMask,n,this.fieldTransforms):new zi(e,this.data,n,this.fieldTransforms)}}class G_{constructor(e,n,r){this.data=e,this.fieldMask=n,this.fieldTransforms=r}toMutation(e,n){return new vr(e,this.data,this.fieldMask,n,this.fieldTransforms)}}function Q_(t){switch(t){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw ae()}}class xu{constructor(e,n,r,s,i,o){this.settings=e,this.databaseId=n,this.serializer=r,this.ignoreUndefinedProperties=s,i===void 0&&this.vu(),this.fieldTransforms=i||[],this.fieldMask=o||[]}get path(){return this.settings.path}get Cu(){return this.settings.Cu}Fu(e){return new xu(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Mu(e){var n;const r=(n=this.path)===null||n===void 0?void 0:n.child(e),s=this.Fu({path:r,xu:!1});return s.Ou(e),s}Nu(e){var n;const r=(n=this.path)===null||n===void 0?void 0:n.child(e),s=this.Fu({path:r,xu:!1});return s.vu(),s}Lu(e){return this.Fu({path:void 0,xu:!0})}Bu(e){return oa(e,this.settings.methodName,this.settings.ku||!1,this.path,this.settings.qu)}contains(e){return this.fieldMask.find(n=>e.isPrefixOf(n))!==void 0||this.fieldTransforms.find(n=>e.isPrefixOf(n.field))!==void 0}vu(){if(this.path)for(let e=0;e<this.path.length;e++)this.Ou(this.path.get(e))}Ou(e){if(e.length===0)throw this.Bu("Document fields must not be empty");if(Q_(this.Cu)&&dC.test(e))throw this.Bu('Document fields cannot begin and end with "__"')}}class pC{constructor(e,n,r){this.databaseId=e,this.ignoreUndefinedProperties=n,this.serializer=r||Fa(e)}Qu(e,n,r,s=!1){return new xu({Cu:e,methodName:n,qu:r,path:at.emptyPath(),xu:!1,ku:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function Mu(t){const e=t._freezeSettings(),n=Fa(t._databaseId);return new pC(t._databaseId,!!e.ignoreUndefinedProperties,n)}function mC(t,e,n,r,s,i={}){const o=t.Qu(i.merge||i.mergeFields?2:0,e,n,s);Lu("Data must be an object, but it was:",o,r);const c=Y_(r,o);let l,h;if(i.merge)l=new Lt(o.fieldMask),h=o.fieldTransforms;else if(i.mergeFields){const d=[];for(const p of i.mergeFields){const g=Il(e,p,n);if(!o.contains(g))throw new Z(M.INVALID_ARGUMENT,`Field '${g}' is specified in your field mask but missing from your input data.`);X_(d,g)||d.push(g)}l=new Lt(d),h=o.fieldTransforms.filter(p=>l.covers(p.field))}else l=null,h=o.fieldTransforms;return new fC(new Ct(c),l,h)}class za extends Vu{_toFieldTransform(e){if(e.Cu!==2)throw e.Cu===1?e.Bu(`${this._methodName}() can only appear at the top level of your update data`):e.Bu(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof za}}function gC(t,e,n,r){const s=t.Qu(1,e,n);Lu("Data must be an object, but it was:",s,r);const i=[],o=Ct.empty();yr(r,(l,h)=>{const d=Fu(e,l,n);h=Ke(h);const p=s.Nu(d);if(h instanceof za)i.push(d);else{const g=Qi(h,p);g!=null&&(i.push(d),o.set(d,g))}});const c=new Lt(i);return new G_(o,c,s.fieldTransforms)}function _C(t,e,n,r,s,i){const o=t.Qu(1,e,n),c=[Il(e,r,n)],l=[s];if(i.length%2!=0)throw new Z(M.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let g=0;g<i.length;g+=2)c.push(Il(e,i[g])),l.push(i[g+1]);const h=[],d=Ct.empty();for(let g=c.length-1;g>=0;--g)if(!X_(h,c[g])){const _=c[g];let P=l[g];P=Ke(P);const k=o.Nu(_);if(P instanceof za)h.push(_);else{const D=Qi(P,k);D!=null&&(h.push(_),d.set(_,D))}}const p=new Lt(h);return new G_(d,p,o.fieldTransforms)}function yC(t,e,n,r=!1){return Qi(n,t.Qu(r?4:3,e))}function Qi(t,e){if(J_(t=Ke(t)))return Lu("Unsupported field value:",e,t),Y_(t,e);if(t instanceof Vu)return function(r,s){if(!Q_(s.Cu))throw s.Bu(`${r._methodName}() can only be used with update() and set()`);if(!s.path)throw s.Bu(`${r._methodName}() is not currently supported inside arrays`);const i=r._toFieldTransform(s);i&&s.fieldTransforms.push(i)}(t,e),null;if(t===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),t instanceof Array){if(e.settings.xu&&e.Cu!==4)throw e.Bu("Nested arrays are not supported");return function(r,s){const i=[];let o=0;for(const c of r){let l=Qi(c,s.Lu(o));l==null&&(l={nullValue:"NULL_VALUE"}),i.push(l),o++}return{arrayValue:{values:i}}}(t,e)}return function(r,s){if((r=Ke(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return aS(s.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const i=Xe.fromDate(r);return{timestampValue:ta(s.serializer,i)}}if(r instanceof Xe){const i=new Xe(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:ta(s.serializer,i)}}if(r instanceof Ou)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof Ps)return{bytesValue:y_(s.serializer,r._byteString)};if(r instanceof Rt){const i=s.databaseId,o=r.firestore._databaseId;if(!o.isEqual(i))throw s.Bu(`Document reference is for database ${o.projectId}/${o.database} but should be for database ${i.projectId}/${i.database}`);return{referenceValue:gu(r.firestore._databaseId||s.databaseId,r._key.path)}}if(r instanceof Nu)return function(o,c){return{mapValue:{fields:{__type__:{stringValue:"__vector__"},value:{arrayValue:{values:o.toArray().map(l=>{if(typeof l!="number")throw c.Bu("VectorValues must only contain numeric values.");return du(c.serializer,l)})}}}}}}(r,s);throw s.Bu(`Unsupported field value: ${ja(r)}`)}(t,e)}function Y_(t,e){const n={};return Kg(t)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):yr(t,(r,s)=>{const i=Qi(s,e.Mu(r));i!=null&&(n[r]=i)}),{mapValue:{fields:n}}}function J_(t){return!(typeof t!="object"||t===null||t instanceof Array||t instanceof Date||t instanceof Xe||t instanceof Ou||t instanceof Ps||t instanceof Rt||t instanceof Vu||t instanceof Nu)}function Lu(t,e,n){if(!J_(n)||!function(s){return typeof s=="object"&&s!==null&&(Object.getPrototypeOf(s)===Object.prototype||Object.getPrototypeOf(s)===null)}(n)){const r=ja(n);throw r==="an object"?e.Bu(t+" a custom object"):e.Bu(t+" "+r)}}function Il(t,e,n){if((e=Ke(e))instanceof Ha)return e._internalPath;if(typeof e=="string")return Fu(t,e);throw oa("Field path arguments must be of type string or ",t,!1,void 0,n)}const vC=new RegExp("[~\\*/\\[\\]]");function Fu(t,e,n){if(e.search(vC)>=0)throw oa(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,t,!1,void 0,n);try{return new Ha(...e.split("."))._internalPath}catch{throw oa(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,t,!1,void 0,n)}}function oa(t,e,n,r,s){const i=r&&!r.isEmpty(),o=s!==void 0;let c=`Function ${e}() called with invalid data`;n&&(c+=" (via `toFirestore()`)"),c+=". ";let l="";return(i||o)&&(l+=" (found",i&&(l+=` in field ${r}`),o&&(l+=` in document ${s}`),l+=")"),new Z(M.INVALID_ARGUMENT,c+t+l)}function X_(t,e){return t.some(n=>n.isEqual(e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Z_{constructor(e,n,r,s,i){this._firestore=e,this._userDataWriter=n,this._key=r,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new Rt(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new EC(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const n=this._document.data.field(Wa("DocumentSnapshot.get",e));if(n!==null)return this._userDataWriter.convertValue(n)}}}class EC extends Z_{data(){return super.data()}}function Wa(t,e){return typeof e=="string"?Fu(t,e):e instanceof Ha?e._internalPath:e._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ey(t){if(t.limitType==="L"&&t.explicitOrderBy.length===0)throw new Z(M.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class Uu{}class ty extends Uu{}function ny(t,e,...n){let r=[];e instanceof Uu&&r.push(e),r=r.concat(n),function(i){const o=i.filter(l=>l instanceof Bu).length,c=i.filter(l=>l instanceof Ka).length;if(o>1||o>0&&c>0)throw new Z(M.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(r);for(const s of r)t=s._apply(t);return t}class Ka extends ty{constructor(e,n,r){super(),this._field=e,this._op=n,this._value=r,this.type="where"}static _create(e,n,r){return new Ka(e,n,r)}_apply(e){const n=this._parse(e);return ry(e._query,n),new Er(e.firestore,e.converter,dl(e._query,n))}_parse(e){const n=Mu(e.firestore);return function(i,o,c,l,h,d,p){let g;if(h.isKeyField()){if(d==="array-contains"||d==="array-contains-any")throw new Z(M.INVALID_ARGUMENT,`Invalid Query. You can't perform '${d}' queries on documentId().`);if(d==="in"||d==="not-in"){tp(p,d);const _=[];for(const P of p)_.push(ep(l,i,P));g={arrayValue:{values:_}}}else g=ep(l,i,p)}else d!=="in"&&d!=="not-in"&&d!=="array-contains-any"||tp(p,d),g=yC(c,o,p,d==="in"||d==="not-in");return Ye.create(h,d,g)}(e._query,"where",n,e.firestore._databaseId,this._field,this._op,this._value)}}function TC(t,e,n){const r=e,s=Wa("where",t);return Ka._create(s,r,n)}class Bu extends Uu{constructor(e,n){super(),this.type=e,this._queryConstraints=n}static _create(e,n){return new Bu(e,n)}_parse(e){const n=this._queryConstraints.map(r=>r._parse(e)).filter(r=>r.getFilters().length>0);return n.length===1?n[0]:an.create(n,this._getOperator())}_apply(e){const n=this._parse(e);return n.getFilters().length===0?e:(function(s,i){let o=s;const c=i.getFlattenedFilters();for(const l of c)ry(o,l),o=dl(o,l)}(e._query,n),new Er(e.firestore,e.converter,dl(e._query,n)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class ju extends ty{constructor(e,n){super(),this._field=e,this._direction=n,this.type="orderBy"}static _create(e,n){return new ju(e,n)}_apply(e){const n=function(s,i,o){if(s.startAt!==null)throw new Z(M.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(s.endAt!==null)throw new Z(M.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new Mi(i,o)}(e._query,this._field,this._direction);return new Er(e.firestore,e.converter,function(s,i){const o=s.explicitOrderBy.concat([i]);return new Ms(s.path,s.collectionGroup,o,s.filters.slice(),s.limit,s.limitType,s.startAt,s.endAt)}(e._query,n))}}function IC(t,e="asc"){const n=e,r=Wa("orderBy",t);return ju._create(r,n)}function ep(t,e,n){if(typeof(n=Ke(n))=="string"){if(n==="")throw new Z(M.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!n_(e)&&n.indexOf("/")!==-1)throw new Z(M.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${n}' contains a '/' character.`);const r=e.path.child(Fe.fromString(n));if(!re.isDocumentKey(r))throw new Z(M.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return vf(t,new re(r))}if(n instanceof Rt)return vf(t,n._key);throw new Z(M.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${ja(n)}.`)}function tp(t,e){if(!Array.isArray(t)||t.length===0)throw new Z(M.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function ry(t,e){const n=function(s,i){for(const o of s)for(const c of o.getFlattenedFilters())if(i.indexOf(c.op)>=0)return c.op;return null}(t.filters,function(s){switch(s){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(n!==null)throw n===e.op?new Z(M.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new Z(M.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${n.toString()}' filters.`)}class wC{convertValue(e,n="none"){switch(hr(e)){case 0:return null;case 1:return e.booleanValue;case 2:return We(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,n);case 5:return e.stringValue;case 6:return this.convertBytes(ur(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,n);case 11:return this.convertObject(e.mapValue,n);case 10:return this.convertVectorValue(e.mapValue);default:throw ae()}}convertObject(e,n){return this.convertObjectMap(e.fields,n)}convertObjectMap(e,n="none"){const r={};return yr(e,(s,i)=>{r[s]=this.convertValue(i,n)}),r}convertVectorValue(e){var n,r,s;const i=(s=(r=(n=e.fields)===null||n===void 0?void 0:n.value.arrayValue)===null||r===void 0?void 0:r.values)===null||s===void 0?void 0:s.map(o=>We(o.doubleValue));return new Nu(i)}convertGeoPoint(e){return new Ou(We(e.latitude),We(e.longitude))}convertArray(e,n){return(e.values||[]).map(r=>this.convertValue(r,n))}convertServerTimestamp(e,n){switch(n){case"previous":const r=Da(e);return r==null?null:this.convertValue(r,n);case"estimate":return this.convertTimestamp(Oi(e));default:return null}}convertTimestamp(e){const n=lr(e);return new Xe(n.seconds,n.nanos)}convertDocumentKey(e,n){const r=Fe.fromString(e);ke(A_(r));const s=new Ni(r.get(1),r.get(3)),i=new re(r.popFirst(5));return s.isEqual(n)||Mn(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${n.projectId}/${n.database}) instead.`),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function AC(t,e,n){let r;return r=t?t.toFirestore(e):e,r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oi{constructor(e,n){this.hasPendingWrites=e,this.fromCache=n}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class sy extends Z_{constructor(e,n,r,s,i,o){super(e,n,r,s,o),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const n=new Oo(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(n,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,n={}){if(this._document){const r=this._document.data.field(Wa("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,n.serverTimestamps)}}}class Oo extends sy{data(e={}){return super.data(e)}}class iy{constructor(e,n,r,s){this._firestore=e,this._userDataWriter=n,this._snapshot=s,this.metadata=new oi(s.hasPendingWrites,s.fromCache),this.query=r}get docs(){const e=[];return this.forEach(n=>e.push(n)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,n){this._snapshot.docs.forEach(r=>{e.call(n,new Oo(this._firestore,this._userDataWriter,r.key,r,new oi(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const n=!!e.includeMetadataChanges;if(n&&this._snapshot.excludesMetadataChanges)throw new Z(M.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===n||(this._cachedChanges=function(s,i){if(s._snapshot.oldDocs.isEmpty()){let o=0;return s._snapshot.docChanges.map(c=>{const l=new Oo(s._firestore,s._userDataWriter,c.doc.key,c.doc,new oi(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);return c.doc,{type:"added",doc:l,oldIndex:-1,newIndex:o++}})}{let o=s._snapshot.oldDocs;return s._snapshot.docChanges.filter(c=>i||c.type!==3).map(c=>{const l=new Oo(s._firestore,s._userDataWriter,c.doc.key,c.doc,new oi(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);let h=-1,d=-1;return c.type!==0&&(h=o.indexOf(c.doc.key),o=o.delete(c.doc.key)),c.type!==1&&(o=o.add(c.doc),d=o.indexOf(c.doc.key)),{type:bC(c.type),doc:l,oldIndex:h,newIndex:d}})}}(this,n),this._cachedChangesIncludeMetadataChanges=n),this._cachedChanges}}function bC(t){switch(t){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return ae()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Cs(t){t=zt(t,Rt);const e=zt(t.firestore,fr);return oC(qa(e),t._key).then(n=>ay(e,t,n))}class $u extends wC{constructor(e){super(),this.firestore=e}convertBytes(e){return new Ps(e)}convertReference(e){const n=this.convertDocumentKey(e,this.firestore._databaseId);return new Rt(this.firestore,null,n)}}function RC(t){t=zt(t,Er);const e=zt(t.firestore,fr),n=qa(e),r=new $u(e);return ey(t._query),aC(n,t._query).then(s=>new iy(e,r,t,s))}function Ga(t,e,n,...r){t=zt(t,Rt);const s=zt(t.firestore,fr),i=Mu(s);let o;return o=typeof(e=Ke(e))=="string"||e instanceof Ha?_C(i,"updateDoc",t._key,e,n,r):gC(i,"updateDoc",t._key,e),qu(s,[o.toMutation(t._key,tn.exists(!0))])}function SC(t){return qu(zt(t.firestore,fr),[new fu(t._key,tn.none())])}function PC(t,e){const n=zt(t.firestore,fr),r=fn(t),s=AC(t.converter,e);return qu(n,[mC(Mu(t.firestore),"addDoc",r._key,s,t.converter!==null,{}).toMutation(r._key,tn.exists(!1))]).then(()=>r)}function oy(t,...e){var n,r,s;t=Ke(t);let i={includeMetadataChanges:!1,source:"default"},o=0;typeof e[o]!="object"||Zf(e[o])||(i=e[o],o++);const c={includeMetadataChanges:i.includeMetadataChanges,source:i.source};if(Zf(e[o])){const p=e[o];e[o]=(n=p.next)===null||n===void 0?void 0:n.bind(p),e[o+1]=(r=p.error)===null||r===void 0?void 0:r.bind(p),e[o+2]=(s=p.complete)===null||s===void 0?void 0:s.bind(p)}let l,h,d;if(t instanceof Rt)h=zt(t.firestore,fr),d=Va(t._key.path),l={next:p=>{e[o]&&e[o](ay(h,t,p))},error:e[o+1],complete:e[o+2]};else{const p=zt(t,Er);h=zt(p.firestore,fr),d=p._query;const g=new $u(h);l={next:_=>{e[o]&&e[o](new iy(h,g,p,_))},error:e[o+1],complete:e[o+2]},ey(t._query)}return function(g,_,P,k){const D=new Du(k),x=new Cu(_,D,P);return g.asyncQueue.enqueueAndForget(async()=>Ru(await ia(g),x)),()=>{D.Za(),g.asyncQueue.enqueueAndForget(async()=>Su(await ia(g),x))}}(qa(h),d,c,l)}function qu(t,e){return function(r,s){const i=new On;return r.asyncQueue.enqueueAndForget(async()=>GP(await iC(r),s,i)),i.promise}(qa(t),e)}function ay(t,e,n){const r=n.docs.get(e._key),s=new $u(t);return new sy(t,s,e._key,r,new oi(n.hasPendingWrites,n.fromCache),e.converter)}(function(e,n=!0){(function(s){Os=s})(Ds),En(new sn("firestore",(r,{instanceIdentifier:s,options:i})=>{const o=r.getProvider("app").getImmediate(),c=new fr(new IR(r.getProvider("auth-internal")),new RR(r.getProvider("app-check-internal")),function(h,d){if(!Object.prototype.hasOwnProperty.apply(h.options,["projectId"]))throw new Z(M.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Ni(h.options.projectId,d)}(o,s),o);return i=Object.assign({useFetchStreams:n},i),c._setSettings(i),c},"PUBLIC").setMultipleInstances(!0)),Ht(ff,"4.7.4",e),Ht(ff,"4.7.4","esm2017")})();const CC={apiKey:"AIzaSyCAVN9xNa-bBNqxay8F5Hnbp4MIbk6eI7I",authDomain:"ferramentas-ve.firebaseapp.com",projectId:"ferramentas-ve",storageBucket:"ferramentas-ve.appspot.com",messagingSenderId:"180825406497",appId:"1:180825406497:web:df580c19a3b2262324b760",measurementId:"G-D0485WHLXT"},Hu=Om(CC),Yi=J0(Hu),Zt=uC(Hu);gR(Hu);const Ut=(t,e)=>{const n=t.__vccOpts||t;for(const[r,s]of e)n[r]=s;return n},kC=Ll({name:"InputField",props:{label:{type:String,required:!0},id:{type:String,required:!0},modelValue:{type:String,default:""},error:{type:String,default:""},placeholder:{type:String,default:""},type:{type:String,default:"text"}},emits:["update:modelValue"],setup(t,{emit:e}){const{modelValue:n}=mv(t);return{modelValue:n,updateValue:s=>{e("update:modelValue",s.target.value)}}}}),DC={class:"input-group"},VC=["for"],OC=["type","id","value","placeholder"],NC={key:0,class:"error-text"};function xC(t,e,n,r,s,i){return me(),be("div",DC,[W("label",{for:t.id},kt(t.label),9,VC),W("input",{type:t.type,id:t.id,value:t.modelValue,onInput:e[0]||(e[0]=(...o)=>t.updateValue&&t.updateValue(...o)),class:xr({"error-input":t.error}),placeholder:t.placeholder,autocomplete:"off"},null,42,OC),t.error?(me(),be("p",NC,kt(t.error),1)):ze("",!0)])}const Fs=Ut(kC,[["render",xC],["__scopeId","data-v-8dbd09ca"]]),MC={components:{InputField:Fs},setup(){const t=pe(""),e=pe(""),n=pe(""),r=pe(""),s=pe(null),i=qr(),o=async()=>{if(s.value=null,e.value="",r.value="",t.value||(e.value=$e.requiredEmail),n.value||(r.value=$e.requiredPassword),!(!t.value||!n.value))try{await LA(Yi,t.value,n.value),i.push("/")}catch(l){c(l)}},c=l=>{const h=$e[l.code]||"Erro desconhecido. Tente novamente mais tarde.";s.value={type:"error",text:h}};return In(()=>{document.title="Ferramentas para Devs | Login",Ne("user").value!==null&&i.push("/")}),{formMessage:s,email:t,password:n,emailError:e,passwordError:r,loginUser:o}}},LC={class:"form_body"};function FC(t,e,n,r,s,i){const o=nn("InputField");return me(),be("form",{onSubmit:e[2]||(e[2]=ks((...c)=>r.loginUser&&r.loginUser(...c),["prevent"])),class:"form"},[e[4]||(e[4]=W("div",{class:"header-top form_header"},[W("h2",{class:"title"},"Entrar como administrador")],-1)),W("div",LC,[r.formMessage?(me(),be("p",{key:0,class:xr(["box-text",r.formMessage?`${r.formMessage.type}-text`:""])},kt(r.formMessage.text),3)):ze("",!0),Re(o,{label:"Email",id:"email",modelValue:r.email,"onUpdate:modelValue":e[0]||(e[0]=c=>r.email=c),error:r.emailError,placeholder:"seuemail@email.com",type:"email"},null,8,["modelValue","error"]),Re(o,{label:"Senha",id:"password",modelValue:r.password,"onUpdate:modelValue":e[1]||(e[1]=c=>r.password=c),error:r.passwordError,placeholder:"*******",type:"password"},null,8,["modelValue","error"]),e[3]||(e[3]=W("button",{class:"btn-primary",title:"Entrar como administrador"},"Entrar",-1))])],32)}const UC=Ut(MC,[["render",FC]]),BC="/assets/content_empty_lg-BykqqcHr.webp",jC="/assets/content_empty_sm-DTkqTt4T.webp",$C={setup(){const t=pe(""),e=pe(""),n=pe(""),r=pe([]),s=pe(!1),i=pe(!1),o=Ne("user"),c=Ne("toast"),l=qr(),h=Ea(),d=async k=>{try{const D=fn(Zt,"topics",k),x=await Cs(D);if(x.exists()){const F=x.data();t.value=k,e.value=F.title,r.value=F.contents,n.value=F.created_at,s.value=o.value&&o.value.uid===F.created_by,i.value=r.value.length===0,document.title=`Ferramentas para Devs | ${e.value}`,p()}}catch{P("loadTopicError")}},p=()=>{r.value.sort((k,D)=>{const x=k.description.toLowerCase(),F=D.description.toLowerCase();return x.localeCompare(F)})},g=async k=>{if(confirm("Tem certeza que deseja deletar esse tópico? Todo o conteúdo será perdido."))try{await SC(fn(Zt,"topics",k)),c.value={type:"success",text:"Tópico removido com sucesso"},l.push("/")}catch{P("deleteTopicError")}},_=async k=>{if(confirm("Tem certeza que deseja deletar esse conteúdo?"))try{const D=h.params.id,x=fn(Zt,"topics",D),F=await Cs(x);F.exists()||l.push("/");const q=F.data().contents.filter(ce=>ce.id!==k);await Ga(x,{contents:q}),c.value={type:"success",text:"Conteúdo removido com sucesso"}}catch{P("deleteContentError")}},P=k=>{c.value={type:"error",text:$e[k]||"Erro desconhecido."}};return In(()=>{const k=h.params.id;d(k);const D=oy(fn(Zt,"topics",k),x=>{if(x.exists()){const F=x.data();e.value=F.title,r.value=F.contents,p()}});return()=>D()}),tt(()=>h.params.id,k=>{d(k)}),tt(o,k=>{o.value=k}),tt(r,()=>{i.value=r.value.length===0}),{id:t,title:e,created_at:n,contents:r,user:o,userIsCreator:s,contentsEmpty:i,loadTopic:d,deleteTopic:g,deleteContent:_,handleError:P,sortContents:p}}},qC={key:0,class:"topic_header header-top"},HC={class:"title"},zC={class:"header-top-buttons"},WC={class:"topic padding-container"},KC={key:0,class:"topic-empty-image"},GC={key:1,class:"topic-not-empty"},QC={class:"table-responsive"},YC={class:"contents"},JC={key:0},XC=["href"],ZC={class:"content-description"},e1={key:0},t1={class:"content-actions"},n1=["onClick"];function r1(t,e,n,r,s,i){const o=nn("RouterLink");return me(),be("section",null,[r.title?(me(),be("div",qC,[W("h2",HC,kt(r.title),1),W("div",zC,[r.userIsCreator?(me(),rr(o,{key:0,class:"btn-primary",to:`/topic/${r.id}/edit`,title:"Editar tópico"},{default:Xt(()=>e[1]||(e[1]=[W("i",{class:"fa-solid fa-edit"},null,-1)])),_:1},8,["to"])):ze("",!0),r.userIsCreator?(me(),be("button",{key:1,class:"btn-danger",onClick:e[0]||(e[0]=c=>r.deleteTopic(r.id)),title:"Remover tópico"},e[2]||(e[2]=[W("i",{class:"fa-solid fa-trash"},null,-1)]))):ze("",!0),r.userIsCreator?(me(),rr(o,{key:2,class:"btn-primary",to:`/topic/${r.id}/content-form`},{default:Xt(()=>e[3]||(e[3]=[W("i",{class:"fa-solid fa-plus"},null,-1)])),_:1},8,["to"])):ze("",!0)])])):ze("",!0),W("div",WC,[r.contentsEmpty?(me(),be("div",KC,e[4]||(e[4]=[W("img",{src:BC,alt:"ícone de caixa vazia",width:"900",height:"454",class:"lg"},null,-1),W("img",{src:jC,alt:"ícone de caixa vazia",width:"568",height:"454",class:"sm"},null,-1)]))):(me(),be("div",GC,[W("div",QC,[W("table",YC,[W("thead",null,[W("tr",null,[e[5]||(e[5]=W("th",null,"Website",-1)),e[6]||(e[6]=W("th",null,"Descrição",-1)),r.user?(me(),be("th",JC,"Ações")):ze("",!0)])]),W("tbody",null,[(me(!0),be(Qt,null,Up(r.contents,(c,l)=>(me(),be("tr",{class:"content",key:c.id},[W("td",null,[W("a",{href:c.link,target:"_blank",rel:"noopener noreferrer",class:"content-link link",title:"Acessar site"},kt(c.title),9,XC)]),W("td",null,[W("p",ZC,kt(c.description),1)]),r.user?(me(),be("td",e1,[W("div",t1,[r.user&&r.user.uid==c.created_by?(me(),rr(o,{key:0,class:"btn-primary",to:`/topic/${t.$route.params.id}/content/${c.id}/edit`,title:"Editar conteúdo"},{default:Xt(()=>e[7]||(e[7]=[W("i",{class:"fa-solid fa-edit"},null,-1)])),_:2},1032,["to"])):ze("",!0),r.user&&r.user.uid==c.created_by?(me(),be("button",{key:1,class:"btn-danger",onClick:h=>r.deleteContent(c.id),title:"Remover conteúdo"},e[8]||(e[8]=[W("i",{class:"fa-solid fa-trash"},null,-1)]),8,n1)):ze("",!0)])])):ze("",!0)]))),128))])])])]))])])}const s1=Ut($C,[["render",r1],["__scopeId","data-v-0c4e3b0f"]]),i1="/assets/einstein-CNuAjB6g.webp",o1={},a1={class:"padding-container"};function c1(t,e){return me(),be("div",a1,e[0]||(e[0]=[_E('<section data-v-01543bd1><figure class="home-image" data-v-01543bd1><img src="'+i1+'" alt="Albert Einstein utilizando um computador - IA" data-v-01543bd1><figcaption data-v-01543bd1>Imagem gerada por inteligência artificial</figcaption></figure><div class="home-content" data-v-01543bd1><h2 class="text-display" data-v-01543bd1> Olá, usuário! Bem-vindo ao site de ferramentas para desenvolvedores.<br data-v-01543bd1> Aqui você encontrará diversos materiais e links úteis para estudos e desenvolvimento de projetos. </h2></div><a href="https://lezzin.github.io" target="_blank" class="author-link link" data-v-01543bd1><i class="fab fa-github" data-v-01543bd1></i> Criado por Leandro Adrian da Silva </a></section>',1)]))}const l1=Ut(o1,[["render",c1],["__scopeId","data-v-01543bd1"]]),u1="/assets/not_found_lg-i0Nch_q2.gif",h1="/assets/not_found_sm-DXfzwhPy.gif",d1={},f1={class:"padding-container centered-container"};function p1(t,e){const n=nn("RouterLink");return me(),be("section",null,[W("div",f1,[e[1]||(e[1]=W("img",{src:u1,alt:"Imagem de um robô e um computador com o número 404 na tela",width:"900",height:"454",class:"lg"},null,-1)),e[2]||(e[2]=W("img",{src:h1,alt:"Imagem de um robô e um computador com o número 404 na tela",width:"568",height:"454",class:"sm"},null,-1)),Re(n,{class:"link",to:"/"},{default:Xt(()=>e[0]||(e[0]=[Bo("Voltar para o início")])),_:1})])])}const m1=Ut(d1,[["render",p1],["__scopeId","data-v-55c20fa4"]]),g1={components:{InputField:Fs},setup(){const t=qr(),e=Ne("user"),n=pe(""),r=pe(""),s=pe(""),i=async()=>{if(r.value="",n.value="",!s.value){n.value=$e.requiredEmail;return}try{await MA(Yi,s.value),r.value="E-mail enviado com sucesso"}catch(o){n.value=o.message}};return In(()=>{document.title="Ferramentas para Devs | Perfil",e||t.push("/"),s.value=e.value.email}),{updatePassword:i,email:s,emailError:n,formMessage:r}}},_1={class:"form_body"},y1={key:0,class:"box-text success-text"};function v1(t,e,n,r,s,i){const o=nn("InputField");return me(),be("form",{onSubmit:e[1]||(e[1]=ks((...c)=>r.updatePassword&&r.updatePassword(...c),["prevent"])),class:"form"},[e[3]||(e[3]=W("div",{class:"header-top form_header"},[W("h2",{class:"title"},"Seu perfil de usuário")],-1)),W("div",_1,[r.formMessage?(me(),be("p",y1,kt(r.formMessage),1)):ze("",!0),Re(o,{label:"Email",id:"email",modelValue:r.email,"onUpdate:modelValue":e[0]||(e[0]=c=>r.email=c),error:r.emailError,placeholder:"seuemail@email.com",type:"email"},null,8,["modelValue","error"]),e[2]||(e[2]=W("button",{class:"btn-primary",type:"submit",title:"Alterar senha"},"Alterar senha",-1))])],32)}const E1=Ut(g1,[["render",v1]]),T1={components:{InputField:Fs},setup(){const t=Ne("user"),e=Ne("toast"),n=qr(),r=Ea(),s=pe(""),i=pe(""),o=pe(""),c=async()=>{if(i.value="",o.value="",!s.value){i.value=$e.requiredTitle;return}try{const d=r.params.id,p=fn(Zt,"topics",d);await Ga(p,{title:s.value}),e.value={type:"success",text:"Tópico editado com sucesso"},n.push(`/topic/${d}`)}catch(d){l(d)}},l=d=>{i.value=d.message||$e.generalError},h=async()=>{try{const d=r.params.id,p=fn(Zt,"topics",d),g=await Cs(p);if(!g.exists()){o.value=$e.topicNotFound;return}const _=g.data();s.value=_.title}catch(d){l(d)}};return In(()=>{document.title="Ferramentas para Devs | Editar Tópico",t.value||n.push("/"),h()}),tt(t,d=>{d||n.push("/")}),{topicTitle:s,titleError:i,topicError:o,editTopic:c}}},I1={key:0,class:"error-text"},w1={class:"form_body"};function A1(t,e,n,r,s,i){const o=nn("InputField");return me(),be("form",{onSubmit:e[1]||(e[1]=ks((...c)=>r.editTopic&&r.editTopic(...c),["prevent"])),class:"form"},[r.topicError?(me(),be("p",I1,kt(r.topicError),1)):ze("",!0),e[3]||(e[3]=W("div",{class:"header-top form_header"},[W("h2",{class:"title"},"Editar Tópico"),W("a",{class:"btn-outline-primary",href:"javascript:history.back()",title:"Voltar para a página anterior"},[W("i",{class:"fa-solid fa-arrow-left"})])],-1)),W("div",w1,[Re(o,{label:"Título",id:"topic-title",modelValue:r.topicTitle,"onUpdate:modelValue":e[0]||(e[0]=c=>r.topicTitle=c),error:r.titleError,placeholder:"Estudos, materiais..."},null,8,["modelValue","error"]),e[2]||(e[2]=W("button",{class:"btn-primary",title:"Editar tópico"},"Editar",-1))])],32)}const b1=Ut(T1,[["render",A1]]),R1={components:{InputField:Fs},setup(){const t=qr(),e=Ea(),n=Ne("user"),r=Ne("toast"),s=pe(""),i=pe(""),o=pe(""),c=pe(""),l=pe(""),h=pe(""),d=pe(""),p=pe("");tt(p,()=>d.value=""),tt(o,()=>c.value=""),tt(h,()=>l.value="");const g=async()=>{try{const x=e.params.id,F=e.params.contentId,$=fn(Zt,"topics",x),q=await Cs($);if(!q.exists()){s.value=$e.topicNotFound;return}const le=q.data().contents.find(w=>w.id===F);if(!le){t.push(`/topic/${x}`);return}o.value=le.description,h.value=le.link,p.value=le.title}catch(x){D(x)}},_=async()=>{try{if(k(),!p.value){d.value=$e.requiredTitle;return}if(!h.value){l.value=$e.requiredLink;return}if(!/^(http|https):\/\//i.test(h.value)){l.value=$e.invalidLink;return}if(!o.value){c.value=$e.requiredDescription;return}const F=e.params.id,$=e.params.contentId,q=fn(Zt,"topics",F),ce=await Cs(q);if(!ce.exists()){s.value=$e.topicNotFound;return}const w=ce.data().contents.map(v=>v.id===$?{id:$,description:o.value,link:h.value,title:p.value,created_by:n.value.uid}:v);await Ga(q,{contents:w}),r.value={type:"success",text:"Conteúdo editado com sucesso"},t.push(`/topic/${F}`),P()}catch(x){console.log(x),D(x)}},P=()=>{s.value="",o.value="",c.value="",p.value="",d.value="",h.value="",l.value=""},k=()=>{s.value="",d.value="",l.value="",c.value=""},D=x=>{s.value=x.message||$e.generalError};return In(()=>{if(document.title="Ferramentas para Devs | Editar conteúdo",i.value=e.params.id,!n){t.push("/");return}g()}),tt(n,x=>{x||t.push("/")}),{topicError:s,contentDescriptionError:c,contentDescription:o,contentLinkError:l,contentLink:h,contentTitleError:d,contentTitle:p,editContent:_}}},S1={key:0,class:"error-text"},P1={class:"form_body"};function C1(t,e,n,r,s,i){const o=nn("InputField");return me(),be("form",{onSubmit:e[3]||(e[3]=ks((...c)=>r.editContent&&r.editContent(...c),["prevent"])),class:"form"},[r.topicError?(me(),be("p",S1,kt(r.topicError),1)):ze("",!0),e[5]||(e[5]=W("div",{class:"header-top form_header"},[W("h2",{class:"title"},"Editar Conteúdo"),W("a",{class:"btn-outline-primary",href:"javascript:history.back()",title:"Voltar para a página anterior"},[W("i",{class:"fa-solid fa-arrow-left"})])],-1)),W("div",P1,[Re(o,{label:"Título",id:"content-title",modelValue:r.contentTitle,"onUpdate:modelValue":e[0]||(e[0]=c=>r.contentTitle=c),error:r.contentTitleError,placeholder:"Título do site/material"},null,8,["modelValue","error"]),Re(o,{label:"Link",id:"content-link",modelValue:r.contentLink,"onUpdate:modelValue":e[1]||(e[1]=c=>r.contentLink=c),error:r.contentLinkError,placeholder:"https://www.site.com..."},null,8,["modelValue","error"]),Re(o,{label:"Descrição",id:"content-description",modelValue:r.contentDescription,"onUpdate:modelValue":e[2]||(e[2]=c=>r.contentDescription=c),error:r.contentDescriptionError,placeholder:"Descrição do site/material"},null,8,["modelValue","error"]),e[4]||(e[4]=W("button",{class:"btn-primary",title:"Editar conteúdo"},"Editar",-1))])],32)}const k1=Ut(R1,[["render",C1]]),D1={components:{InputField:Fs},setup(){const t=pe(""),e=pe(""),n=Ne("user"),r=Ne("toast"),s=qr(),i=async()=>{if(e.value="",!t.value){e.value=$e.requiredTitle;return}try{const c=K_(Zt,"topics"),l=ny(c,TC("title","==",t.value));if((await RC(l)).size>0){e.value=$e.topicExists;return}const p=(await PC(c,{title:t.value,contents:[],created_at:new Date,created_by:n.value.uid})).id;t.value="",e.value="",r.value={type:"success",text:"Tópico adicionado com sucesso"},s.push(`/topic/${p}`)}catch(c){o(c)}},o=c=>{this.titleError=c.message||this.$root.error_messages.generalError};return In(()=>{document.title="Ferramentas para Devs | Adicionar tópico",n||s.push("/")}),tt(n,c=>{c||s.push("/")}),tt(t,()=>{e.value=""}),{addTopic:i,title:t,titleError:e}}},V1={class:"form_body"};function O1(t,e,n,r,s,i){const o=nn("InputField");return me(),be("form",{onSubmit:e[1]||(e[1]=ks((...c)=>r.addTopic&&r.addTopic(...c),["prevent"])),class:"form"},[e[3]||(e[3]=W("div",{class:"header-top form_header"},[W("h2",{class:"title"},"Adicionar Tópico"),W("a",{class:"btn-outline-primary",href:"javascript:history.back()",title:"Voltar para a página anterior"},[W("i",{class:"fa-solid fa-arrow-left"})])],-1)),W("div",V1,[Re(o,{label:"Título",id:"topic-title",modelValue:r.title,"onUpdate:modelValue":e[0]||(e[0]=c=>r.title=c),error:r.titleError,placeholder:"Estudos, materiais..."},null,8,["modelValue","error"]),e[2]||(e[2]=W("button",{class:"btn-primary",title:"Adicionar tópico"},"Adicionar",-1))])],32)}const N1=Ut(D1,[["render",O1]]),x1={components:{InputField:Fs},setup(){const t=qr(),e=Ea(),n=Ne("toast"),r=Ne("user"),s=pe(""),i=pe(""),o=pe(""),c=pe(""),l=pe(""),h=pe(""),d=pe(""),p=pe(e.params.id);tt(i,()=>o.value=""),tt(h,()=>d.value=""),tt(c,()=>l.value="");const g=async()=>{if(d.value="",l.value="",o.value="",i.value||(o.value=$e.requiredTitle),c.value||(l.value=$e.requiredLink),h.value||(d.value=$e.requiredDescription),!i.value||!c.value||!h.value)return;if(!/^(http|https):\/\//i.test(c.value)){l.value=$e.invalidLink;return}try{const D=p.value,x=fn(Zt,"topics",D),F=await Cs(x);if(!F.exists()){s.value=$e.topicNotFound;return}const $=F.data();$.contents.push({id:Date.now().toString(36),description:h.value,link:c.value,title:i.value,created_by:r.value.uid}),await Ga(x,{contents:$.contents}),t.push(`/topic/${D}`),_(),n.value={type:"success",text:"Conteúdo adicionado com sucesso"}}catch(D){P(D)}},_=()=>{s.value="",h.value="",d.value="",i.value="",o.value="",c.value="",l.value=""},P=k=>{s.value=k.message||$e.generalError};return In(()=>{document.title="Ferramentas para Devs | Adicionar conteúdo",r||t.push("/")}),{topicError:s,contentDescriptionError:d,contentDescription:h,contentLinkError:l,contentLink:c,contentTitleError:o,contentTitle:i,contentTopicId:p,addContent:g,clearFields:_,handleError:P}}},M1={class:"form_body"},L1={key:0,class:"error-text"};function F1(t,e,n,r,s,i){const o=nn("InputField");return me(),be("form",{onSubmit:e[3]||(e[3]=ks((...c)=>r.addContent&&r.addContent(...c),["prevent"])),class:"form"},[e[5]||(e[5]=W("div",{class:"header-top form_header"},[W("h2",{class:"title"},"Adicionar conteúdo"),W("a",{class:"btn-outline-primary",href:"javascript:history.back()",title:"Voltar para a página anterior"},[W("i",{class:"fa-solid fa-arrow-left"})])],-1)),W("div",M1,[r.topicError?(me(),be("p",L1,kt(r.topicError),1)):ze("",!0),Re(o,{label:"Título",id:"content-title",modelValue:r.contentTitle,"onUpdate:modelValue":e[0]||(e[0]=c=>r.contentTitle=c),error:r.contentTitleError,placeholder:"Título do site/material"},null,8,["modelValue","error"]),Re(o,{label:"Link",id:"content-link",modelValue:r.contentLink,"onUpdate:modelValue":e[1]||(e[1]=c=>r.contentLink=c),error:r.contentLinkError,placeholder:"https://www.site.com..."},null,8,["modelValue","error"]),Re(o,{label:"Descrição",id:"content-description",modelValue:r.contentDescription,"onUpdate:modelValue":e[2]||(e[2]=c=>r.contentDescription=c),error:r.contentDescriptionError,placeholder:"Descrição do site/material"},null,8,["modelValue","error"]),e[4]||(e[4]=W("button",{class:"btn-primary",title:"Adicionar conteúdo"},"Adicionar",-1))])],32)}const U1=Ut(x1,[["render",F1]]),B1=()=>new Promise((t,e)=>{const n=og(Yi,r=>{n(),t(r)},e)}),cy=nI({history:OT(),routes:[{path:"/",component:l1,meta:{requiresAuth:!1}},{path:"/login",component:UC,meta:{requiresAuth:!1}},{path:"/profile",component:E1,meta:{requiresAuth:!0}},{path:"/topic-form",component:N1,meta:{requiresAuth:!0}},{path:"/topic/:id",component:s1,meta:{requiresAuth:!1}},{path:"/topic/:id/content-form",component:U1,meta:{requiresAuth:!0}},{path:"/topic/:id/edit",component:b1,meta:{requiresAuth:!0}},{path:"/topic/:id/content/:contentId/edit",component:k1,meta:{requiresAuth:!0}},{path:"/:catchAll(.*)",component:m1,meta:{requiresAuth:!1}}]});cy.beforeEach(async(t,e,n)=>{t.matched.some(r=>r.meta.requiresAuth)?await B1()?n():n("/login"):n()});const j1={props:["toast"],setup(t,{emit:e}){return{closeToast:()=>{e("close")}}}},$1={class:"toast-content text"},q1={class:"toast-icon"},H1={class:"toast-title"},z1={class:"toast-text"};function W1(t,e,n,r,s,i){return n.toast.type&&n.toast.text?(me(),be("div",{key:0,class:xr(["toast",`${n.toast.type}-toast active`])},[e[2]||(e[2]=W("div",{class:"toast-banner"},null,-1)),W("div",$1,[W("div",q1,[W("i",{class:xr(["fa-solid",n.toast.type==="error"?"fa-xmark":"fa-check"])},null,2)]),W("div",null,[W("p",H1,kt(n.toast.type==="error"?"Erro":"Sucesso"),1),W("p",z1,kt(n.toast.text),1)]),W("button",{class:"btn-close",onClick:e[0]||(e[0]=(...o)=>r.closeToast&&r.closeToast(...o)),title:"Fechar mensagem"},e[1]||(e[1]=[W("i",{class:"fa-solid fa-times"},null,-1)]))])],2)):ze("",!0)}const K1=Ut(j1,[["render",W1],["__scopeId","data-v-8251d344"]]),G1={props:["isActive"],setup(){const t=pe([]),e=Ne("isMobile");return In(()=>{const n=K_(Zt,"topics"),r=ny(n,IC("title")),s=oy(r,i=>{t.value=i.docs.map(o=>({route:o.id,...o.data()}))});return()=>s()}),{topics:t,isMobile:e}}},Q1={key:0,id:"navigation"};function Y1(t,e,n,r,s,i){const o=nn("RouterLink");return!r.isMobile|n.isActive?(me(),be("nav",Q1,[Re(o,{class:"link",to:"/",title:"Ir para a página inicial"},{default:Xt(()=>e[0]||(e[0]=[W("i",{class:"fa-solid fa-house"},null,-1),Bo(" Início ")])),_:1}),(me(!0),be(Qt,null,Up(r.topics,c=>(me(),rr(o,{class:"link",key:c.id,to:"/topic/"+c.route,title:"Ir para o tópico"},{default:Xt(()=>[e[1]||(e[1]=W("i",{class:"fa-solid fa-fire"},null,-1)),Bo(" "+kt(c.title),1)]),_:2},1032,["to"]))),128))])):ze("",!0)}const J1=Ut(G1,[["render",Y1],["__scopeId","data-v-c98608cb"]]),X1="/assets/logo-k8dFxqUP.svg",Z1={components:{Navbar:J1},setup(){const t=pe(!1),e=Ne("isMobile"),n=Ne("toast"),r=Ne("user");return{isMobile:e,isMenuActive:t,user:r,logoutUser:async()=>{try{await BA(Yi)}catch({code:o,message:c}){const l={"auth/network-request-failed":"Falha na conexão de rede. Verifique sua conexão e tente novamente.","auth/internal-error":"Erro interno do servidor. Tente novamente mais tarde.","auth/no-current-user":"Nenhum usuário autenticado no momento."};n.value={type:"error",text:l[o]??`Erro ao sair: ${c}`}}},toggleMenu:()=>{t.value=!t.value}}}},ek={class:"fixed"},tk={class:"header-top"},nk={class:"header-top-buttons"};function rk(t,e,n,r,s,i){const o=nn("RouterLink"),c=nn("Navbar");return me(),be("aside",null,[W("div",ek,[W("div",tk,[r.isMobile||r.isMenuActive?(me(),be("button",{key:0,class:"btn-primary",onClick:e[0]||(e[0]=(...l)=>r.toggleMenu&&r.toggleMenu(...l)),title:"Abrir/fechar menu"},e[2]||(e[2]=[W("i",{class:"fa-solid fa-bars"},null,-1)]))):ze("",!0),Re(o,{to:"/",title:"Ir para a página inicial"},{default:Xt(()=>e[3]||(e[3]=[W("img",{src:X1,alt:"Laptop com três engrenagens na tela",width:"32",height:"32"},null,-1)])),_:1}),W("div",nk,[r.user?(me(),rr(o,{key:0,class:"btn-primary",to:"/topic-form",title:"Ir para o formulário de tópicos"},{default:Xt(()=>e[4]||(e[4]=[W("i",{class:"fa-solid fa-plus"},null,-1)])),_:1})):ze("",!0),r.user?(me(),rr(o,{key:1,class:"btn-success",to:"/profile",title:"Acessar perfil de administrador"},{default:Xt(()=>e[5]||(e[5]=[W("i",{class:"fa-solid fa-user"},null,-1)])),_:1})):ze("",!0),r.user?(me(),be("button",{key:2,class:"btn-danger",onClick:e[1]||(e[1]=(...l)=>r.logoutUser&&r.logoutUser(...l)),title:"Sair do modo administrador"},e[6]||(e[6]=[W("i",{class:"fa-solid fa-sign-out"},null,-1)]))):ze("",!0),r.user?ze("",!0):(me(),rr(o,{key:3,class:"btn-primary",to:"/login",title:"Entrar no modo administrador"},{default:Xt(()=>e[7]||(e[7]=[W("i",{class:"fa-solid fa-sign-in"},null,-1)])),_:1}))])]),Re(c,{isActive:r.isMenuActive},null,8,["isActive"])])])}const sk=Ut(Z1,[["render",rk],["__scopeId","data-v-a425d181"]]),ik={class:"container"},ok={__name:"App",setup(t){const e=pe(null),n=pe(window.innerWidth<=768),r=pe({type:"",text:""});let s;const i=()=>{r.value={type:"",text:""}};tt(r,()=>{s&&clearTimeout(s),s=setTimeout(()=>{i()},5e3)});const o=()=>{n.value=window.innerWidth<=768};return In(()=>{window.addEventListener("resize",o),og(Yi,c=>{c?e.value=c:e.value=null})}),Lp(()=>{window.removeEventListener("resize",o)}),Or("user",e),Or("isMobile",n),Or("toast",r),(c,l)=>(me(),be("div",ik,[Re(K1,{toast:r.value,onClose:i},null,8,["toast"]),Re(sk),W("main",null,[Re(Vr(Em))])]))}};ZE({render:()=>$l(ok)}).use(cy).mount("#app");
