(() => {
  const cars = {
    porsche: {name:'Porsche 911',image:'drive-blue.webp',alt:'Синий Porsche 911 на открытой площадке',kind:'НА КАЖДЫЙ ПОВОРОТ',copy:'Для тех, кому важен сам маршрут. Собранный характер и узнаваемый силуэт — повод выбрать дорогу подлиннее.',purpose:'Поездка за город',before:'Знакомство с управлением и маршрутом'},
    ferrari: {name:'Ferrari',image:'drive-red.webp',alt:'Красный Ferrari, вид спереди в тёмном гараже',kind:'ДЛЯ ОСОБОГО ДНЯ',copy:'Когда автомобиль становится частью события. Выберите красивую дорогу, оставьте время на остановки и не спешите возвращаться.',purpose:'Событие или съёмка',before:'Согласование сценария и места выдачи'},
    lamborghini: {name:'Lamborghini',image:'drive-hero.webp',alt:'Серебристый Lamborghini в экспозиции, вид сбоку',kind:'ЯРКИЙ ВЫХОД',copy:'Выразительная геометрия, низкая посадка и внимание к каждой детали. Для знакомства с необычным автомобилем без спешки.',purpose:'Знакомство со спорткаром',before:'Инструктаж и проверка маршрута'}
  };
  const tabs = [...document.querySelectorAll('[data-car]')];
  function select(key,focus=false) {
    const car=cars[key];if(!car)return;
    tabs.forEach(tab=>{const active=tab.dataset.car===key;tab.setAttribute('aria-selected',String(active));tab.tabIndex=active?0:-1;if(active&&focus)tab.focus();});
    document.getElementById('car-panel').setAttribute('aria-labelledby',tabs.find(t=>t.dataset.car===key).id);
    const image=document.getElementById('car-image');image.src='../assets/'+car.image;image.alt=car.alt;
    ['name','kind','copy','purpose','before'].forEach(field=>document.getElementById('car-'+field).textContent=car[field]);
    document.getElementById('select-car').innerHTML='Выбрать '+car.name+' <span aria-hidden="true">↗</span>';
    document.getElementById('booking-car').value=key;document.getElementById('summary-car').textContent=car.name;
  }
  tabs.forEach((tab,index)=>{tab.addEventListener('click',()=>select(tab.dataset.car));tab.addEventListener('keydown',event=>{let next;if(event.key==='ArrowRight')next=(index+1)%tabs.length;if(event.key==='ArrowLeft')next=(index+tabs.length-1)%tabs.length;if(event.key==='Home')next=0;if(event.key==='End')next=tabs.length-1;if(next!==undefined){event.preventDefault();select(tabs[next].dataset.car,true);}});});
  document.getElementById('booking-car').addEventListener('change',event=>select(event.target.value));
  const start=document.getElementById('date-start'),end=document.getElementById('date-end');
  function dates(){end.min=start.value||start.min;end.setCustomValidity(end.value&&start.value&&end.value<start.value?'Дата возврата должна быть не раньше даты начала.':'');const fmt=value=>new Intl.DateTimeFormat('ru',{day:'numeric',month:'long'}).format(new Date(value+'T12:00:00'));document.getElementById('summary-dates').textContent=start.value&&end.value?fmt(start.value)+' — '+fmt(end.value):'Выберите даты справа';}
  start.addEventListener('change',dates);end.addEventListener('change',dates);
})();
