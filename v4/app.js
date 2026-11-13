
const dialog=document.getElementById('quoteDialog');
document.querySelectorAll('[data-open-dialog]').forEach(btn=>btn.addEventListener('click',()=>dialog?.showModal()));
document.querySelector('.quote-close')?.addEventListener('click',()=>dialog?.close());
document.getElementById('fakeSubmit')?.addEventListener('click',e=>{e.preventDefault();const s=document.getElementById('formSuccess');if(s)s.hidden=false;});
dialog?.addEventListener('click',e=>{const rect=e.currentTarget.querySelector('.quote-box').getBoundingClientRect();const inside=e.clientX>=rect.left&&e.clientX<=rect.right&&e.clientY>=rect.top&&e.clientY<=rect.bottom;if(!inside)e.currentTarget.close();});
const io=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting)entry.target.classList.add('is-visible');});},{threshold:.15});
document.querySelectorAll('[data-reveal]').forEach(el=>io.observe(el));
const switcher=document.querySelector('.lab-switcher');
document.querySelector('.lab-mobile-toggle')?.addEventListener('click',()=>{switcher.classList.toggle('is-open');const btn=document.querySelector('.lab-mobile-toggle');btn.setAttribute('aria-expanded', String(switcher.classList.contains('is-open')));});