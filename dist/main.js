!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/dist",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);var o=function(e){return Math.pow(e,2)},r=function(e,t,n,o){e.style.opacity=(t+(n-t)*o).toString()},c=function(e,t,n){document.documentElement.scrollTop=e+(t-e)*n},l=function(e,t,n,o,r){e.style.height=(t+(n-t)*r).toString()+o},u=function(e,t,n,o){e.value=Math.floor(+t+(n-t)*o)},i=function(e){var t=e.timing,n=e.draw,o=e.duration,r=performance.now();requestAnimationFrame((function e(c){var l=(c-r)/o;l>1&&(l=1),n(t(l)),l<1&&requestAnimationFrame(e)}))},a=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:350;e.style.opacity="0",e.style.display="block";var n=r.bind(null,e,0,1);i({timing:o,draw:n,duration:t})},s=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:350,n=r.bind(null,e,1,0);i({timing:o,draw:n,duration:t}),setTimeout((function(){e.style.display="none"}),t)},d=function(e,t,n){var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:350,c=parseFloat(n),u=n.replace(/^\-?\d+(\.\d+)?/,""),a=l.bind(null,e,c,0,u);i({timing:o,draw:a,duration:r}),setTimeout((function(){e.classList.remove(t)}),r)},m=function(e,t,n){var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:350,c=parseFloat(n),u=n.replace(/^\-?\d+(\.\d+)?/,"");e.style.height="0rem",e.classList.add(t);var a=l.bind(null,e,0,c,u);i({timing:o,draw:a,duration:r})};function f(e){return function(e){if(Array.isArray(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}var p=function(e){var t,n=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],o=document.documentElement.clientWidth;t=o>768&&o<991&&n?".hidden":".visible-sm-block, .hidden";var r=f(e).filter((function(e){if(e.parentNode.matches(t))return e}));return r.map((function(e){return e.parentNode}))},y=document.getElementById("myonoffswitch"),h=document.getElementById("first-sump-diameter"),g=document.getElementById("first-sump-rings"),v=document.getElementById("second-sump-diameter"),b=document.getElementById("second-sump-rings"),S=document.getElementById("myonoffswitch-two"),w=document.getElementById("collapseFour").querySelector("input"),A=document.getElementById("calc-result"),E=function(){var e=y.checked?1e4:15e3,t=+h.value-1+(y.checked?0:+v.value-1),n=+g.value-1+(y.checked?0:+b.value-1),r=S.checked?1e3*(y.checked?1:2):0,c=Math.round(e+e*t+e*n+r),l=u.bind(null,A,A.value,c);i({timing:o,draw:l,duration:350})};function q(e){return function(e){if(Array.isArray(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}var T={load:{msg:"Загрузка...",color:"SteelBlue"},ok:{msg:"Спасибо! Мы скоро с Вами свяжемся!",color:"Green"},error:{msg:"Что-то пошло не так...",color:"OrangeRed"}},I=function(e,t){a(e,100),e.textContent=T[t].msg,e.style.color=T[t].color},x=function(e,t){var n=document.createElement("div");n.classList.add("status-message"),n.style.cssText="font-size: 2rem; color: SteelBlue;",e.lastElementChild.matches(".status-message")?n=e.lastElementChild:e.appendChild(n);var o=new FormData(e),r={};o.forEach((function(e,t){r[t]=e})),t&&(r=Object.assign(r,t)),I(n,"load"),function(e){return fetch("./server.php",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})}(r).then((function(t){if(200!==t.status)throw new Error("network status is "+t.status+" - "+t.statusText);I(n,"ok"),q(e.elements).filter((function(e){return e.matches('input[type="text"]')})).forEach((function(e){e.value=""})),setTimeout((function(){s(n),setTimeout((function(){n.remove()}),500)}),5e3);var o=e.closest(".popup");o&&(setTimeout((function(){s(o)}),3500),o.matches(".popup-consultation")&&(document.querySelector("form.director-form > input").value=""))})).catch((function(e){I(n,"error"),console.error("Ошибка при отправке данных:",e)}))};function O(e){return function(e){if(Array.isArray(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}var j={"collapseOne-two":"14rem","collapseTwo-two":"7.5rem","collapseThree-two":"9.5rem"},k={collapseOne:"20rem",collapseTwo:"32rem",collapseThree:"22rem",collapseFour:"20rem"},B=function(e,t,n){t.querySelectorAll(".panel-default").forEach((function(e){return e.style.overflow="hidden"})),n.forEach((function(t){t.style.height=e[t.getAttribute("id")]}))},C=B.bind(null,j),F=B.bind(null,k),L=function(e,t){return O(e).filter((function(e){return e.matches("."+t)}))[0]},D=document.getElementById("myonoffswitch"),M=document.getElementById("first-sump"),_=document.getElementById("second-sump"),P=function(){D.checked?(M.querySelector(".title-text").textContent="приемный колодец",k.collapseTwo="20.5rem",_.style.display="none"):(M.querySelector(".title-text").textContent="первый колодец (приемный)",k.collapseTwo="32rem",_.style.display="block")};function N(e){return function(e){if(Array.isArray(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}document.addEventListener("DOMContentLoaded",(function(){var e=null,t=document.querySelector("form.director-form"),n=document.querySelector(".popup-call"),l=document.querySelectorAll(".call-btn[href='#']"),u=document.querySelector(".popup-discount"),f=document.querySelectorAll(".discount-btn"),q=document.querySelector(".construct-btn.call-btn"),T=document.querySelector(".popup-check"),I=document.querySelector(".check-btn"),O=document.querySelector(".popup-consultation"),B=document.querySelector(".consultation-btn"),D=t.querySelector("input"),M=document.querySelector(".add-sentence-btn"),_=document.querySelectorAll(".shadow-block"),R=p(_,!1),H=document.getElementById("accordion-two"),z=N(H.querySelectorAll("a[data-parent='#accordion-two']")).map((function(e){return e.closest(".panel-heading")})),G=H.querySelectorAll(".panel-collapse");C(H,G);var J=document.getElementById("accordion"),Q=N(J.querySelectorAll("a[data-parent='#accordion'][role='button']")).map((function(e){return e.closest(".panel-heading")})),W=J.querySelectorAll(".panel-collapse"),Y=J.querySelectorAll("a.construct-btn[data-parent='#accordion']");F(J,W);var K=document.querySelector(".constructor .panel-four p"),U=document.getElementById("collapseOne").querySelector(".onoffswitch");P(),E();var V=document.querySelectorAll(".phone-user"),X=document.querySelectorAll('input[id^="calc-"]'),Z=document.querySelectorAll('input[id^="name_"]'),$=document.getElementById("user_quest"),ee=function(t,n,o){o!==n&&o!==n.querySelector(".popup-close")||(t.preventDefault(),s(n),e=null)};document.addEventListener("click",(function(t){var E,x=t.target;if(N(l).includes(x)&&(t.preventDefault(),a(n)),ee(t,n,x),[].concat(N(f),[q]).includes(x)&&(a(u),q.contains(x)?((E=[]).push({diameter:parseFloat(h[h.options.selectedIndex].textContent),countRings:parseFloat(g[g.options.selectedIndex].textContent)}),y.checked||E.push({diameter:parseFloat(v[v.options.selectedIndex].textContent),countRings:parseFloat(b[b.options.selectedIndex].textContent)}),e={septic:{countSumps:y.checked?1:2,sumps:E,useBottom:S.checked,distance:w.value,prePrice:A.value}}):e=null),ee(t,u,x),x===I&&(t.preventDefault(),a(T)),ee(t,T,x),x===B&&(t.preventDefault(),D.value?(D.style.border="",a(O),e={userQuestion:D.value}):D.style.border="1px solid red"),ee(t,O,x),x===M){M.style.display="none";var C=p(_),F=R.filter((function(e){return!C.includes(e)}));F.forEach((function(e){return e.style.cssText="display: block !important;"})),function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:350,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:250,l=[];e.forEach((function(e){e.style.cssText="opacity: 0; display: block !important;",l.push(r.bind(null,e,0,1))}));var u=document.documentElement.clientHeight,a=window.pageYOffset,s=e[0].offsetTop,d=e[0].offsetHeight,m=null;d>u?s-a>30&&(m=c.bind(null,a,s-30)):s+d-u-a>30&&(m=c.bind(null,a,s+d-u+30)),m&&i({timing:o,draw:m,duration:500});var f=0;l.forEach((function(e){setTimeout((function(){i({timing:o,draw:e,duration:t})}),f),f+=n}))}(C)}if(z.includes(x.closest(".panel-heading"))){t.preventDefault();var H=x.closest(".panel-heading").querySelector("h4>a").getAttribute("href").slice(1),J=document.getElementById(H);if(J.classList.contains("in"))return;var V=L(G,"in");d(V,"in",V.style.height),m(J,"in",j[J.getAttribute("id")])}if(Q.includes(x.closest(".panel-heading"))||N(Y).includes(x.closest("a"))){var X;t.preventDefault(),X=x.closest("a.construct-btn")?x.closest("a.construct-btn").getAttribute("href").slice(1):x.closest(".panel-heading").querySelector("h4>a").getAttribute("href").slice(1);var Z=document.getElementById(X);if(Z.classList.contains("in"))return;var $=L(W,"in");Z.contains(K)&&a(K,600),$.contains(K)&&s(K,200),d($,"in",$.style.height),m(Z,"in",k[Z.getAttribute("id")])}U.contains(x)&&P()})),J.addEventListener("change",(function(){E()})),document.addEventListener("submit",(function(n){var o=n.target.closest("form");o&&(n.preventDefault(),o.contains(t)||x(o,o.closest(".popup")?e:null))})),document.addEventListener("input",(function(e){var t,n=e.target;[].concat(N(V),N(X)).includes(n)&&(t=n).value.match(/[^\d]/)&&(t.value=t.value.replace(/[^\d]/,"")),[].concat(N(Z),[$]).includes(n)&&function(e){e.value.match(/[^А-Яа-яЁе ]/)&&(e.value=e.value.replace(/[^А-Яа-яЁе ]/,""))}(n)}))}))}]);