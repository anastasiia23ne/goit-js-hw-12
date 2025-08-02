import{i as g,a as m,S as y}from"./assets/vendor-BK_rxH-O.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function n(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function a(e){if(e.ep)return;e.ep=!0;const t=n(e);fetch(e.href,t)}})();const s={info:"Please enter a value in the search field!",warning:"Sorry, there are no images matching your search query. Please try again!",error:"Sorry, there are no connection to the server. Please try again later! ",exception:"Exception: We have some issue with connection. Please try again later! "},l={blue:"#abd4f8",orange:"#f28111",red:"#e97782"};function c(o,r){g.info({position:"topRight",backgroundColor:`${r}`,message:`${o}`})}const h="42598065-1779ad5a953180c3fe77c2809",S="https://pixabay.com/api/";async function b(o){try{return(await m.get(S,{params:{key:h,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0}})).data.hits}catch(r){throw c(`${s.exception} ERROR: ${r.message}`,l.orange),r}}const p=document.querySelector(".gallery"),f=document.querySelector(".loader");let w=new y(".gallery a",{captionsData:"alt",captionDelay:250});function L(o){return o.map(({webformatURL:r,largeImageURL:n,tags:a,likes:e,views:t,comments:i,downloads:d})=>`
        <li class="gallery-item hvr-grow">
          <a class="gallery-link" href="${n}">
            <figure class="gallery-figure">
              <img class="gallery-image" src="${r}" alt="${a}" loading="lazy" />
              <figcaption class="gallery-figcaption">
                <ul class="img-content-wrapper">
                  <li>Likes<span>${e}</span></li>
                  <li>Views<span>${t}</span></li>
                  <li>Comments<span>${i}</span></li>
                  <li>Downloads<span>${d}</span></li>
                </ul>
              </figcaption>
            </figure>
          </a>
        </li>
      `).join("")}function $(o){p.insertAdjacentHTML("beforeend",L(o)),w.refresh()}function u(){p.innerHTML=""}function E(){f&&(f.style.display="block")}function O(){f&&(f.style.display="none")}const P=document.querySelector(".search-form");P.addEventListener("submit",x);async function x(o){o.preventDefault(),g.destroy();const r=new FormData(o.target),{search:n}=Object.fromEntries(r.entries());if(!n.trim()){c(s.info,l.blue),u();return}u(),E();try{const a=await b(n.trim());if(!a||a.length===0){c(s.warning,l.red);return}$(a)}catch(a){c(`${s.exception} ${a.message}`,l.orange)}finally{O(),o.target.reset()}}
//# sourceMappingURL=index.js.map
