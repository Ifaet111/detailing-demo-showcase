(() => {
  const treatments = {
    paint: {tag:'Кузов / Коррекция',title:'Деликатная полировка',description:'Удаляем загрязнения, оцениваем лак при направленном свете и выбираем степень коррекции. Начинаем с тестового участка, чтобы не снимать лишний слой.',list:['Мойка и очистка от стойких загрязнений','Осмотр покрытия и тестовый участок','Полировка с учётом состояния лака'],time:'На осмотре: состояние лака и допустимая глубина коррекции',select:'Деликатная полировка'},
    protect: {tag:'Кузов / Защита',title:'Защита под ваш маршрут',description:'Для города, трассы и сезонных поездок нужны разные решения. Обсуждаем зоны риска и подбираем защитное покрытие или плёнку без лишнего объёма работ.',list:['Подготовка и обезжиривание поверхности','Выбор покрытия или зон оклейки плёнкой','Рекомендации по мойке и дальнейшему уходу'],time:'На осмотре: состояние покрытия и зоны повышенного риска',select:'Защита кузова'},
    interior: {tag:'Интерьер / Материалы',title:'Бережный уход за салоном',description:'Очищаем текстиль, кожу и пластик с учётом материала. На деликатных участках проверяем состав и метод, затем работаем с загрязнением поэтапно.',list:['Осмотр кожи, текстиля и декоративных вставок','Локальная или комплексная очистка','Сушка и уход за материалами по необходимости'],time:'На осмотре: типы материалов и характер загрязнений',select:'Уход за салоном'}
  };
  let current = treatments.paint;
  document.getElementById('treatment-request').addEventListener('click', () => { document.getElementById('procedure-select').value = current.select; });
  document.querySelectorAll('[data-treatment]').forEach(button => button.addEventListener('click', () => {
    const item = treatments[button.dataset.treatment];
    current = item;
    document.querySelectorAll('[data-treatment]').forEach(control => control.setAttribute('aria-pressed', String(control === button)));
    document.getElementById('treatment-tag').textContent = item.tag;
    document.getElementById('treatment-title').textContent = item.title;
    document.getElementById('treatment-description').textContent = item.description;
    document.getElementById('treatment-time').textContent = item.time;
    const list = document.getElementById('treatment-list'); list.replaceChildren(...item.list.map(text => { const li = document.createElement('li'); li.textContent = text; return li; }));
    document.getElementById('procedure-select').value = item.select;
  }));
})();
