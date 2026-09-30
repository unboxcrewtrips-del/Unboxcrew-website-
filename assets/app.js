
const WA = "919625131595";

function waLink(trip="UnboxCrew"){
  return `https://wa.me/${WA}?text=${encodeURIComponent(`Hi UnboxCrew, I'm interested in the ${trip}. Please share the details.`)}`;
}

const trips = {
  rishikesh: {
    name:"Rishikesh Adventure",
    destination:"Rishikesh, Uttarakhand",
    dates:"2 Days / 1 Night",
    price:"₹3,000",
    image:"https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1800&q=85",
    description:"A high-energy escape built around river, mountains, adventure and the spirit of Rishikesh.",
    highlights:["River adventure","Ganga Aarti","Local exploration","Group experiences"],
    itinerary:[
      ["Day 01","Delhi → Rishikesh","Travel to Rishikesh, check-in, explore the local area and enjoy the evening around the Ganga."],
      ["Day 02","Adventure → Delhi","Morning experience, local exploration and Triveni Ghat Ganga Aarti before returning towards Delhi."]
    ],
    inclusions:["AC transportation","Hotel stay","Trip Captain","Planned sightseeing","Group coordination"],
    exclusions:["Personal expenses","Optional adventure activities","Anything not specifically listed under inclusions"]
  },
  mussoorie: {
    name:"Mussoorie • Landour • Rishikesh",
    destination:"Uttarakhand",
    dates:"9–12 October 2026 • 3 Days / 2 Nights",
    price:"₹4,700",
    image:"https://images.unsplash.com/photo-1597074866923-dc0589150358?auto=format&fit=crop&w=1800&q=85",
    description:"Mountain roads, misty viewpoints, old-world Landour and an evening by the Ganga.",
    highlights:["Kempty Falls","Landour","Lal Tibba","Triveni Ghat Aarti"],
    itinerary:[
      ["Day 01","Delhi → Mussoorie","Friday night departure from Delhi by AC Tempo Traveller. Overnight journey towards the hills."],
      ["Day 02","Mussoorie","Kempty Falls, Company Garden, George Everest, Library Chowk area, Gun Hill, Camel’s Back Road and Mall Road."],
      ["Day 03","Landour → Rishikesh","Char Dukan, Lal Tibba, Landour Church, Sisters’ Bazaar, then Rishikesh and Triveni Ghat Ganga Aarti. Late-night return to Delhi."],
      ["Day 04","Reach Delhi","Early morning arrival in Delhi."]
    ],
    inclusions:["AC Tempo Traveller","1 night hotel stay","1 dinner + 1 breakfast","Mussoorie & Landour exploration","Rishikesh & Ganga Aarti","Trip Captain"],
    exclusions:["Personal expenses","Optional activities","Anything not listed in inclusions"]
  },
  braj: {
    name:"Braj Darshan",
    destination:"Barsana • Vrindavan",
    dates:"2 Days / 1 Night",
    price:"₹3,999",
    image:"https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1800&q=85",
    description:"A culture-rich journey through the spiritual heart of Braj, built around temples, stories and local experiences.",
    highlights:["Radha Rani Temple","Banke Bihari Mandir","Nidhivan","Prem Mandir"],
    itinerary:[
      ["Day 01","Barsana","Radha Rani Temple, Man Mandir and Ghevar Kund with guided group exploration."],
      ["Day 02","Vrindavan","Banke Bihari Mandir, Nidhivan, Kesi Ghat and Prem Mandir before the return journey."]
    ],
    inclusions:["Transportation","Stay","Trip Captain","Planned sightseeing","Group coordination"],
    exclusions:["Personal expenses","Optional activities","Anything not specifically listed"]
  },
  manali: {
    name:"Manali Escape",
    destination:"Manali, Himachal Pradesh",
    dates:"Coming Soon",
    price:"From ₹5,999",
    image:"https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1800&q=85",
    description:"A cinematic mountain escape for people who want road, altitude and a crew to share it with.",
    highlights:["Mountain roads","Local experiences","Scenic viewpoints","Crew activities"],
    itinerary:[
      ["Coming Soon","Trip plan","Detailed itinerary and dates will be announced soon."]
    ],
    inclusions:["To be announced"],
    exclusions:["To be announced"]
  }
};

function renderTripCards(selector){
  const el=document.querySelector(selector);
  if(!el)return;
  el.innerHTML=Object.entries(trips).map(([slug,t])=>`
    <a class="card reveal" href="trip.html?trip=${slug}">
      <img src="${t.image}" alt="${t.name}">
      <div class="card-body">
        <div class="eyebrow">${t.destination}</div>
        <h3>${t.name}</h3>
        <div class="meta"><span>${t.dates}</span></div>
        <div class="price">${t.price}</div>
      </div>
    </a>`).join("");
  observeReveals();
}

function renderTrip(){
  const slug=new URLSearchParams(location.search).get("trip") || "rishikesh";
  const t=trips[slug] || trips.rishikesh;
  document.title=`${t.name} | UnboxCrew`;
  document.querySelectorAll("[data-trip-name]").forEach(e=>e.textContent=t.name);
  document.querySelectorAll("[data-trip-destination]").forEach(e=>e.textContent=t.destination);
  document.querySelectorAll("[data-trip-dates]").forEach(e=>e.textContent=t.dates);
  document.querySelectorAll("[data-trip-price]").forEach(e=>e.textContent=t.price);
  document.querySelectorAll("[data-trip-description]").forEach(e=>e.textContent=t.description);
  const hero=document.querySelector("[data-trip-hero]");
  if(hero) hero.style.backgroundImage=`url("${t.image}")`;
  const high=document.querySelector("[data-highlights]");
  if(high) high.innerHTML=t.highlights.map(x=>`<li>${x}</li>`).join("");
  const itin=document.querySelector("[data-itinerary]");
  if(itin) itin.innerHTML=t.itinerary.map(d=>`<article class="day reveal"><b>${d[0]}</b><h3>${d[1]}</h3><p>${d[2]}</p></article>`).join("");
  const inc=document.querySelector("[data-inclusions]");
  if(inc) inc.innerHTML=t.inclusions.map(x=>`<li>${x}</li>`).join("");
  const exc=document.querySelector("[data-exclusions]");
  if(exc) exc.innerHTML=t.exclusions.map(x=>`<li>${x}</li>`).join("");
  document.querySelectorAll("[data-wa]").forEach(a=>a.href=waLink(t.name));
  observeReveals();
}

function observeReveals(){
  const els=document.querySelectorAll(".reveal:not(.visible)");
  if(!("IntersectionObserver" in window)){els.forEach(e=>e.classList.add("visible"));return}
  const io=new IntersectionObserver(entries=>{
    entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");io.unobserve(e.target)}})
  },{threshold:.12});
  els.forEach(e=>io.observe(e));
}

document.addEventListener("DOMContentLoaded",()=>{
  const nav=document.querySelector(".nav");
  const menu=document.querySelector(".menu-btn");
  menu?.addEventListener("click",()=>nav.classList.toggle("open"));
  window.addEventListener("scroll",()=>nav?.classList.toggle("scrolled",scrollY>40),{passive:true});
  document.querySelectorAll("[data-wa]").forEach(a=>a.href=waLink(a.dataset.trip || "UnboxCrew"));
  if(document.querySelector("[data-trip-grid]")) renderTripCards("[data-trip-grid]");
  if(document.querySelector("[data-trip-hero]")) renderTrip();
  observeReveals();
});


function addTilt(selector){
  if (window.matchMedia('(pointer:coarse)').matches) return;
  document.querySelectorAll(selector).forEach(card=>{
    card.addEventListener('pointermove', e=>{
      const r=card.getBoundingClientRect();
      const x=(e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5;
      card.style.transform=`perspective(900px) rotateX(${(-y*4).toFixed(2)}deg) rotateY(${(x*5).toFixed(2)}deg) translateY(-6px)`;
    });
    card.addEventListener('pointerleave', ()=>card.style.transform='');
  });
}
document.addEventListener('DOMContentLoaded',()=>{ addTilt('.card'); addTilt('.experience'); });
