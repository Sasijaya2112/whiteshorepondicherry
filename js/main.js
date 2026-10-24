/* ===== OWNER-EDITABLE ===== */
const PHONE="919597310075";
const ADDR="White Shore Homestay, 23 Sardar Vallabhbhai Patel Salai, White Town, Puducherry 605001";
/* Property photos: put files in images/ and uncomment/edit. Keys: intro, room1, room2, g0..g7 (gallery) */
const IMAGES={
   intro:"images/stay/intro.webp",
   room1:"images/stay/room1.webp",
   room2:"images/stay/room2.webp",
  // g0:"images/exterior.jpg", g1:"images/rooms.jpg", g2:"images/bathroom.jpg", g3:"images/living.jpg",
  // g4:"images/terrace.jpg", g5:"images/surroundings.jpg", g6:"images/white-town.jpg", g7:"images/beach.jpg"
};
const REVIEWS=[ /* add REAL Google reviews: {name:"Guest name", text:"Review text"} */ ];
/* Destination photos: replace the file in images/destinations/ (same name) or change the path here */
const DESTIMG={
  "Sri Aurobindo Ashram": "images/destinations/sri-aurobindo-ashram.webp",
  "Manakula Vinayagar Temple": "images/destinations/manakula-vinayagar-temple.webp",
  "Rock Beach": "images/destinations/rock-beach.webp",
  "Promenade Beach": "images/destinations/promenade-beach.webp",
  "Pondicherry Museum": "images/destinations/pondicherry-museum.webp",
  "Bharathi Park": "images/destinations/bharathi-park.webp",
  "French War Memorial": "images/destinations/french-war-memorial.webp",
  "Serenity Beach": "images/destinations/serenity-beach.webp"
};
const INSTAGRAM=""; /* official URL only */
/* ========================== */
const $=s=>document.querySelector(s),q=encodeURIComponent;
const msg=q("Hi White Shore, I would like to check room availability for my Pondicherry stay.");
document.querySelectorAll(".wa-link").forEach(a=>{a.href=`https://wa.me/${PHONE}?text=${msg}`;a.target="_blank";a.rel="noopener"});
const maps=`https://www.google.com/maps/search/?api=1&query=${q(ADDR)}`;
$("#dir").href=`https://www.google.com/maps/dir/?api=1&destination=${q(ADDR)}`;
$("#fm").href=maps;$("#gr").href=$("#fr").href=maps;
$("#map").src=`https://www.google.com/maps?q=${q(ADDR)}&output=embed`;
if(INSTAGRAM){const a=document.createElement("a");a.href=INSTAGRAM;a.textContent="Instagram";a.target="_blank";a.rel="noopener";$(".fl").append(a)}
const bg=$("#bg"),mn=$("#menu");
bg.onclick=()=>{const o=mn.classList.toggle("open");bg.setAttribute("aria-expanded",o)};
mn.onclick=e=>{if(e.target.tagName=="A"){mn.classList.remove("open");bg.setAttribute("aria-expanded","false")}};
function img(el,k){const u=IMAGES[k];if(u){const i=new Image();i.src=u;i.alt="White Shore Homestay";i.loading="lazy";i.decoding="async";el.prepend(i)}}
document.querySelectorAll("[data-img]").forEach(e=>img(e,e.dataset.img));
const D=[["Sri Aurobindo Ashram","A spiritual landmark and one of Pondicherry’s most visited places."],["Manakula Vinayagar Temple","A well-known temple dedicated to Lord Ganesha."],["Rock Beach","The seafront promenade, popular for sunrise walks."],["Promenade Beach","A pleasant stretch of seaside for an evening stroll."],["Pondicherry Museum","Local history, art and heritage in a French-era setting."],["Bharathi Park","A calm green space in the heart of the French Quarter."],["French War Memorial","A memorial on the seafront, close to the beach."],["Serenity Beach","A quieter beach, a short drive from town."]];
$("#dest").innerHTML=D.map(([n,d])=>`<article class="dest rv"><div class="ph">${DESTIMG[n]?`<img src="${DESTIMG[n]}" alt="${n}, Pondicherry" loading="lazy" decoding="async" width="640" height="420">`:""}</div><div class="in"><h3>${n}</h3><p>${d}</p><a href="https://www.google.com/maps/dir/?api=1&origin=${q(ADDR)}&destination=${q(n+" Puducherry")}" target="_blank" rel="noopener">View distance on Maps →</a></div></article>`).join("");
const C=["All","Exterior","Rooms","Bathroom","Living Areas","Terrace","Surroundings","White Town","Nearby Beach"];
const H=[200,260,220,280,200,250,230,270];
$("#gal").innerHTML=C.slice(1).map((c,i)=>`<div class="ph" data-c="${c}" data-img="g${i}" style="height:${H[i]}px"><span>${c}</span></div>`).join("");
document.querySelectorAll("#gal .ph").forEach(e=>img(e,e.dataset.img));
$("#flt").innerHTML=C.map((c,i)=>`<button class="${i?"":"on"}" data-f="${c}">${c}</button>`).join("");
$("#flt").onclick=e=>{const f=e.target.dataset.f;if(!f)return;document.querySelectorAll("#flt button").forEach(b=>b.classList.toggle("on",b===e.target));document.querySelectorAll("#gal .ph").forEach(p=>p.style.display=f=="All"||p.dataset.c==f?"":"none")};
$("#rev").innerHTML=REVIEWS.length?REVIEWS.map(r=>`<div class="card"><span class="stars">★★★★★</span><p></p><b>${r.name}</b></div>`).join(""):[1,2,3].map(()=>`<div class="card edit"><span class="stars">★★★★★</span><p>Owner: add a real, publicly posted Google review here (REVIEWS list in the code).</p></div>`).join("");
if(REVIEWS.length)document.querySelectorAll("#rev .card p").forEach((p,i)=>p.textContent="“"+REVIEWS[i].text+"”");
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}}),{threshold:.1});
document.querySelectorAll(".rv").forEach(e=>io.observe(e));
