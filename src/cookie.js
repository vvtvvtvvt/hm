/**
 * ДЗ 7.2 - Создать редактор cookie с возможностью фильтрации
 *
 * На странице должна быть таблица со списком имеющихся cookie:
 * - имя
 * - значение
 * - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)
 *
 * На странице должна быть форма для добавления новой cookie:
 * - имя
 * - значение
 * - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)
 *
 * Если добавляется cookie с именем уже существующией cookie, то ее значение в браузере и таблице должно быть обновлено
 *
 * На странице должно быть текстовое поле для фильтрации cookie
 * В таблице должны быть только те cookie, в имени или значении которых есть введенное значение
 * Если в поле фильтра пусто, то должны выводиться все доступные cookie
 * Если дабавляемая cookie не соответсвуте фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 * Если добавляется cookie, с именем уже существующией cookie и ее новое значение не соответствует фильтру,
 * то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена
 *
 * Для более подробной информации можно изучить код тестов
 *
 * Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/**
 * homeworkContainer - это контейнер для всех ваших домашних заданий
 * Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер
 *
 * @example
 * homeworkContainer.appendChild(...);
 */
let homeworkContainer = document.querySelector('#homework-container');
let filterNameInput = homeworkContainer.querySelector('#filter-name-input');
let addNameInput = homeworkContainer.querySelector('#add-name-input');
let addValueInput = homeworkContainer.querySelector('#add-value-input');
let addButton = homeworkContainer.querySelector('#add-button');
let listTable = homeworkContainer.querySelector('#list-table tbody');

let oCookie = {};
let sSearchCookie = '';

function isMatching(full, chunk) {

    if (full.toUpperCase().indexOf(chunk.toUpperCase()) == -1) {
        return false;
    }

    return true;
}

function addCookie(sName, sValue, sSearch){
  if (!oCookie.hasOwnProperty(sName)) {
      let sTemplate =  `<td>${sName}</td>
                    <td class="val">${sValue}</td>
                    <td>
                        <button class="delete" data-name="${sName}">Удалить</button>
                    </td>`;
      let tr = document.createElement('TR');

      tr.innerHTML = sTemplate;
      oCookie[sName] = {
          'value': sValue,
          'view': tr
      };

      if (sSearch=='' || isMatching(sName, sSearch)) {

          listTable.appendChild(oCookie[sName].view);
      }
  }
  else{
      oCookie[sName].value = sValue;
      if (sSearch=='' || isMatching(sName, sSearch)) {
          oCookie[sName].view.querySelector(".val").innerText = sValue;
      }
  }

  document.cookie = `${sName} = ${sValue}`;

};

function deleteCookie(sName, sSearch){
    if (sSearch=='' || isMatching(sName, sSearch)) {
        listTable.removeChild(oCookie[sName].view);
    }

    delete oCookie[sName];

    document.cookie = `${sName}=; expires=${(new Date(0)).toGMTString()}`;
};

function updateCookieList(sSearch){
    listTable.innerHTML = "";
    let oFragment = document.createDocumentFragment();

    for(let key in oCookie) {
        if (sSearch=='' || isMatching(key, sSearch)) {
            oFragment.appendChild(oCookie[key].view);
        }

        listTable.appendChild(oFragment);
    }
}


filterNameInput.addEventListener('keyup', function() {

    sSearchCookie = filterNameInput.value;
    updateCookieList(sSearchCookie);
});

addButton.addEventListener('click', () => {
    console.log("CLICK");
    addCookie(addNameInput.value, addValueInput.value, sSearchCookie);
    console.log(oCookie);
});

listTable.addEventListener('click', (event)=>{
    if(event.target.classList.contains('delete')) {
        console.log(event.target);
        console.log(event.target.getAttribute('data-name'));
        deleteCookie(event.target.getAttribute('data-name'), sSearchCookie);
    }
});
