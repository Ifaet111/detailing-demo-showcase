(() => {
  const symptoms = {
    light:{code:'01',title:'Индикатор на панели',list:['Зафиксировать цвет и символ индикатора, условия появления.','Считать коды неисправностей и сопутствующие параметры.','Проверить причину по результатам диагностики, прежде чем менять детали.'],note:'Если индикатор красный или есть признаки перегрева, безопасно остановитесь и следуйте руководству автомобиля.'},
    noise:{code:'02',title:'Посторонний звук',list:['Уточнить, когда возникает звук: на холодную, при торможении, разгоне или повороте.','Осмотреть связанные узлы и крепления, при необходимости выполнить проверку на подъёмнике.','Сопоставить наблюдения с результатами осмотра и определить следующий шаг.'],note:'При резком изменении звука вместе с вибрацией или ухудшением управляемости остановитесь в безопасном месте.'},
    drive:{code:'03',title:'Изменилось поведение',list:['Описать изменение: вибрация, увод в сторону, потеря тяги или неравномерная работа.','Проверить состояние шин и узлов, связанных с симптомом.','При необходимости согласовать инструментальную проверку и безопасный дорожный тест.'],note:'Если автомобиль плохо тормозит или не слушается руля, прекратите движение и организуйте безопасную доставку.'},
    schedule:{code:'04',title:'Плановое обслуживание',list:['Сверить модель, пробег, дату последнего ТО и историю работ.','Определить регламентные операции для конкретной модификации и условий эксплуатации.','Согласовать расходные материалы, состав проверки и перечень работ.'],note:'Подготовьте сервисную историю или список последних замен. Это поможет избежать повторных операций.'}
  };
  let current = symptoms.light;
  document.getElementById('symptom-booking').addEventListener('click', () => {document.getElementById('service-select').value=current.title;});
  document.querySelectorAll('[data-symptom]').forEach(button => button.addEventListener('click', () => {
    const item=symptoms[button.dataset.symptom];
    current=item;
    document.querySelectorAll('[data-symptom]').forEach(control=>control.setAttribute('aria-pressed',String(control===button)));
    document.getElementById('symptom-code').textContent=item.code;
    document.getElementById('symptom-title').textContent=item.title;
    document.getElementById('symptom-note').textContent=item.note;
    document.getElementById('symptom-list').replaceChildren(...item.list.map(text=>{const li=document.createElement('li');li.textContent=text;return li;}));
    document.getElementById('service-select').value=item.title;
  }));
  const date = document.getElementById('visit-date');
  if(date){const now=new Date();date.min=`${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`;}
})();
