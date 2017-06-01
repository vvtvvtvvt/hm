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

function parseCookie() {

    return document.cookie
        .split('; ')
        .filter(Boolean)
        .map(cookie => cookie.match(/^([^=]+)=(.+)/))
        .reduce((obj, [, name, value]) => {
            obj[name] = value;

            return obj;
        }, {});
}

function getView(sName, sValue) {
    let sTemplate = `<td>${sName}</td>
                    <td id='${sName}' >${sValue}</td>
                    <td>
                        <button class='delete' data-name='${sName}'>Удалить</button>
                    </td>`;
    let tr = document.createElement('TR');

    tr.setAttribute('id', 'all'+sName);
    tr.innerHTML = sTemplate;

    return tr;
}

function addCookie(sName, sValue, sSearch) {
    oCookie = parseCookie();

    if (!oCookie.hasOwnProperty(sName)) {

        if (sSearch=='' || isMatching(sName, sSearch)||isMatching(sValue, sSearch)) {
            listTable.appendChild(getView(sName, sValue));
        }
    } else {
        if (sSearch=='' || isMatching(sName, sSearch)||isMatching(sValue, sSearch)) {
            listTable.querySelector('#' +sName).innerText = sValue;
        } else {
            listTable.removeChild(listTable.querySelector('#all'+sName));
        }
    }

    document.cookie = `${sName}=${sValue}`;
}

function deleteCookie(sName) {

    listTable.removeChild(listTable.querySelector('#all'+sName));
    document.cookie = `${sName}=; expires=${(new Date(0)).toGMTString()}`;
}

function updateCookieList(sSearch) {

    oCookie = parseCookie();
    listTable.innerHTML = '';
    let oFragment = document.createDocumentFragment();

    for (let key in oCookie) {
        if (sSearch=='' || isMatching(key, sSearch)||isMatching(oCookie[key], sSearch)) {
            oFragment.appendChild(getView(key, oCookie[key]));
        }

        listTable.appendChild(oFragment);
    }
}

filterNameInput.addEventListener('keyup', function() {

    sSearchCookie = filterNameInput.value;
    updateCookieList(sSearchCookie);
});

addButton.addEventListener('click', () => {
    addCookie(addNameInput.value, addValueInput.value, sSearchCookie);
});

listTable.addEventListener('click', (event)=>{
    if (event.target.classList.contains('delete')) {

        deleteCookie(event.target.getAttribute('data-name'), sSearchCookie);
    }
});
