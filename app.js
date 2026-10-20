const concepts={
  obsidian:{eyebrow:'Premium automotive care · London',title:'Gloss,<br><i>refined</i><br>to perfection.',text:'We restore the depth of your paintwork and protect the finish for years. Every vehicle is treated like a collectible.',section:'Beyond clean.<br><i>Immaculate.</i>',copy:'A disciplined process, premium products and complete confidence in the result — from initial inspection to final handover.'},
  clinical:{eyebrow:'Detailing lab · precision in every layer',title:'The clean<br>science of<br><i>protection.</i>',text:'Diagnosis, a controlled environment and advanced formulas. A transparent result measured by the condition of every surface.',section:'Technology<br><i>made visible.</i>',copy:'Inspection lighting, a documented defect map and a precise process for owners who value certainty.'},
  atelier:{eyebrow:'Automotive atelier · finished by hand',title:'The art<br><i>of preserving</i><br>character.',text:'A calm space, an individual approach and respect for every material. We reveal the finest version of your vehicle.',section:'Care as<br><i>a rare craft.</i>',copy:'Every surface demands its own rhythm, tool and formula. Here, speed never comes before quality.'},
  velocity:{eyebrow:'Performance detailing · protection without compromise',title:'Ready<br><i>for every</i><br>road.',text:'Serious protection for vehicles that are truly driven. Film, ceramic and care engineered for the real world.',section:'Protection at<br><i>full velocity.</i>',copy:'We preserve crisp reflections, rich colour and complete confidence — in the city, on the motorway and at the track.'},
  editorial:{eyebrow:'Aurum journal · the culture of the automobile',title:'Beauty<br><i>in every</i><br>detail.',text:'A contemporary view of automotive care: tactile materials, restrained aesthetics and a result worth lingering over.',section:'Considered.<br><i>Delicate.</i>',copy:'We unite technical precision with visual culture, making every drive feel quietly exceptional.'}
};
const tabs=[...document.querySelectorAll('.concept-tab')];
tabs.forEach(tab=>tab.addEventListener('click',()=>{
  const key=tab.dataset.concept,c=concepts[key];document.body.dataset.concept=key;
  document.querySelector('#eyebrow').textContent=c.eyebrow;document.querySelector('#hero-title').innerHTML=c.title;
  document.querySelector('#hero-text').textContent=c.text;document.querySelector('#section-title').innerHTML=c.section;document.querySelector('#section-copy').textContent=c.copy;
  tabs.forEach(t=>{const on=t===tab;t.classList.toggle('active',on);t.setAttribute('aria-selected',String(on))});
  document.querySelector('.hero').animate([{opacity:.65},{opacity:1}],{duration:420,easing:'ease-out'});
}));
const modal=document.querySelector('#booking');document.querySelectorAll('.open-booking').forEach(b=>b.addEventListener('click',()=>modal.showModal()));document.querySelector('.modal-close').addEventListener('click',()=>modal.close());modal.addEventListener('click',e=>{if(e.target===modal)modal.close()});
document.querySelector('#booking-form').addEventListener('submit',e=>{e.preventDefault();e.currentTarget.hidden=true;document.querySelector('.success').hidden=false});
document.querySelector('.menu').addEventListener('click',()=>document.querySelector('.nav').classList.toggle('mobile-open'));
