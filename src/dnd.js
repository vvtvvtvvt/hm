/** Со звездочкой */
/**
 * Создать страницу с кнопкой
 * При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией
 * Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 * Запрощено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/**
 * homeworkContainer - это контейнер для всех ваших домашних заданий
 * Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер
 *
 * @example
 * homeworkContainer.appendChild(...);
 */
let homeworkContainer = document.querySelector('#homework-container');

/**
 * Функция должна создавать и возвращать новый div с классом draggable-div и случайными размерами/цветом/позицией
 * Функция должна только создавать элемент и задвать ему случайные размер/позицию/цвет
 * Функция НЕ должна добавлять элемент на страницу
 *
 * @return {Element}
 */
function createDiv(container = homeworkContainer) {

    let oDiv = document.createElement('DIV');

    oDiv.classList.add('draggable-div');
    oDiv.style.position = 'absolute';

    // вычисляем размеры контейнера
    let oParent = container;

    let iMaxX = oParent.offsetWidth;
    let iMaxY = oParent.offsetHeight;

    oDiv.style.height = randomInteger(0, iMaxY) + 'px'; // размеры и позиция не превышают размеры контейнера
    oDiv.style.width = randomInteger(0, iMaxX) + 'px';

    oDiv.style.left = randomInteger(0, iMaxX - parseInt(oDiv.style.width)) + 'px';
    oDiv.style.top = randomInteger(0, iMaxY - parseInt(oDiv.style.height)) + 'px';

    oDiv.style.backgroundColor = `rgb(${ randomInteger(0, 255)},${ randomInteger(0, 255)},${ randomInteger(0, 255)})`;

    return oDiv;
}

// генерирует случайное число в диапазоне от min до max
function randomInteger(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);

    rand = Math.round(rand);

    return rand;
}

/**
 * Функция должна добавлять обработчики событий для перетаскивания элемента при помощи drag and drop
 *
 * @param {Element} target
 */
function addListeners(target) {

    let oMoveObj = {
        'iPrevX': 0,
        'iPrevY': 0,
        'iLeft': parseInt(target.style.left),
        'iTop': parseInt(target.style.top),
    };

    let moveHandler = function(event) {

        event.stopPropagation();
        oMoveObj.iLeft += (event.clientX - oMoveObj.iPrevX);
        oMoveObj.iTop += (event.clientY - oMoveObj.iPrevY);

        target.style.left = oMoveObj.iLeft + 'px';
        target.style.top = oMoveObj.iTop + 'px';

        oMoveObj.iPrevX = event.clientX;
        oMoveObj.iPrevY = event.clientY;
    };

    target.addEventListener('mousedown',
        (event) => {
            event.stopPropagation();

            oMoveObj.iPrevX = event.clientX;
            oMoveObj.iPrevY = event.clientY;
            oMoveObj.iLeft = parseInt(target.style.left);
            oMoveObj.iTop = parseInt(target.style.top);

            event.target.addEventListener('mousemove', moveHandler);
        }
    );

    target.addEventListener('mouseup',
        (event) => {
            event.stopPropagation();
            event.target.removeEventListener('mousemove', moveHandler)
        }
    );

    target.addEventListener('mouseout',
        (event) => {
            event.stopPropagation();
            event.target.removeEventListener('mousemove', moveHandler)
        }
    );
}

let addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function() {
    // создать новый div
    let div = createDiv();

    // добавить на страницу
    homeworkContainer.appendChild(div);
    // назначить обработчики событий мыши для реализации d&d
    addListeners(div);
    // можно не назначать обработчики событий каждому div в отдельности, а использовать делегирование
    // или использовать HTML5 D&D - https://www.html5rocks.com/ru/tutorials/dnd/basics/
});

export {
    createDiv
};
