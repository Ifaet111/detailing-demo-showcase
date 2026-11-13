/* AURUM — progressive enhancement: reveals, accessible interactions, comparison slider */
(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const elements = document.querySelectorAll('.promise-head,.service-card,.work-copy,.compare,.process>h2,.steps article,.contact>div,.contact>.primary');
  if ('IntersectionObserver' in window && !reduced.matches) {
    const io = new IntersectionObserver((entries) => {
      for (const entry of entries) if (entry.isIntersecting) { entry.target.classList.add('is-visible'); io.unobserve(entry.target); }
    }, {threshold:.08,rootMargin:'0px 0px -20px 0px'});
    for (const element of elements) { element.classList.add('reveal'); io.observe(element); }
  }
  const compare = document.querySelector('.compare');
  if (compare) {
    const before = compare.querySelector('.compare-before');
    const divider = compare.querySelector('.compare-line');
    let position = 50;
    compare.setAttribute('role','slider');
    compare.setAttribute('tabindex','0');
    compare.setAttribute('aria-valuemin','0');
    compare.setAttribute('aria-valuemax','100');
    compare.setAttribute('aria-valuenow','50');
    compare.setAttribute('aria-valuetext',document.documentElement.lang==='en'?'50 percent before':'50 процентов до');
    function setPosition(value) {
      position = Math.min(100,Math.max(0,value));
      before.style.clipPath = 'inset(0 '+(100-position)+'% 0 0)';
      divider.style.left = position+'%';
      compare.setAttribute('aria-valuenow',String(Math.round(position)));
      compare.setAttribute('aria-valuetext',Math.round(position)+(document.documentElement.lang==='en'?' percent before':' процентов до'));
    }
    function pointValue(e) {const rect=compare.getBoundingClientRect();return (e.clientX-rect.left)/rect.width*100;}
    compare.addEventListener('pointerdown',(e)=>{ if(e.button!==0 && e.pointerType==='mouse')return; compare.setPointerCapture(e.pointerId);setPosition(pointValue(e));});
    compare.addEventListener('pointermove',(e)=>{if(compare.hasPointerCapture(e.pointerId))setPosition(pointValue(e));});
    compare.addEventListener('keydown',(e)=>{
      const delta=e.shiftKey?10:2;
      if(e.key==='ArrowLeft'||e.key==='ArrowDown'){e.preventDefault();setPosition(position-delta);}
      else if(e.key==='ArrowRight'||e.key==='ArrowUp'){e.preventDefault();setPosition(position+delta);}
      else if(e.key==='Home'){e.preventDefault();setPosition(0);}
      else if(e.key==='End'){e.preventDefault();setPosition(100);}
    });
  }
  const menu=document.querySelector('.menu'), nav=document.querySelector('.nav');
  if(menu&&nav){
    menu.setAttribute('aria-expanded',String(nav.classList.contains('mobile-open')));
    menu.setAttribute('aria-controls','primary-navigation');
    nav.id='primary-navigation';
    menu.addEventListener('click',()=>menu.setAttribute('aria-expanded',String(nav.classList.contains('mobile-open'))));
    nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{nav.classList.remove('mobile-open');menu.setAttribute('aria-expanded','false');}));
    document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav.classList.contains('mobile-open')){nav.classList.remove('mobile-open');menu.setAttribute('aria-expanded','false');menu.focus();}});
    document.addEventListener('click',e=>{if(!nav.contains(e.target)&&!menu.contains(e.target)){nav.classList.remove('mobile-open');menu.setAttribute('aria-expanded','false');}});
  }
  // Demo form never sends or stores user data: transparently label the interaction.
  const modal=document.getElementById('booking'),form=document.getElementById('booking-form');
  if(modal&&form){
    modal.setAttribute('aria-labelledby','booking-heading');
    const heading=modal.querySelector('h2');if(heading)heading.id='booking-heading';
    modal.addEventListener('close',()=>{form.reset();form.hidden=false;const success=modal.querySelector('.success');if(success)success.hidden=true;});
    const note=form.querySelector('small');
    if(note) note.textContent=document.documentElement.lang==='en'?'Demo only: no information is submitted or stored.':'Демо: данные никуда не отправляются и не сохраняются.';
    const enObserver=new MutationObserver(()=>{if(note)note.textContent=document.documentElement.lang==='en'?'Demo only: no information is submitted or stored.':'Демо: данные никуда не отправляются и не сохраняются.';});
    enObserver.observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  }
  // Switch between concepts without unnecessary motion for visitors requesting reduced motion.
  if(reduced.matches){
    document.querySelectorAll('.concept-tab').forEach(tab=>tab.addEventListener('click',()=>document.querySelector('.hero').getAnimations().forEach(a=>a.cancel())));
  }
})();
