/* ДЗ 3 - работа с массивами и объеектами */

/*
 Задача 1:
 Напишите аналог встроенного метода forEach для работы с массивами
 */
function forEach(array, fn, oThis) {

    for (let i=0; i<array.length; ++i) {
        if (oThis) {
            fn.call(oThis, array[i], i, array);
        } else {
            fn(array[i], i, array);
        }
    }
}

/*
 Задача 2:
 Напишите аналог встроенного метода map для работы с массивами
 */
function map(array, fn, oThis) {

    let aNewArray = Array(array.length);

    for (let i=0; i<array.length; ++i) {
        if (oThis) {
            aNewArray[i] = fn.call(oThis, array[i], i, array);
        } else {
            aNewArray[i] = fn(array[i], i, array);
        }
    }

    return aNewArray;
}

/*
 Задача 3:
 Напишите аналог встроенного метода reduce для работы с массивами
 */
function reduce(array, fn, initial) {

    if (array.length == 0) { // обрабатывам случай когда пришёл пустой массив
        if (initial) {

            return initial;
        }

        throw new Error('Reduce of empty array with no initial value');
    }

    // основаня логика
    let i = 1,
        oValue = array[0];

    if (initial) {
        oValue = initial;
        i = 0;
    }

    for (; i<array.length; ++i) {
        oValue = fn(oValue, array[i], i, array);
    }

    return oValue;
}

/*
 Задача 4:
 Функция принимает объект и имя свойства, которое необходиом удалить из объекта
 Функция должна удалить указанное свойство из указанного объекта
 */
function deleteProperty(obj, prop) {
    delete obj[prop];
}

/*
 Задача 5:
 Функция принимает объект и имя свойства и возвращает true или false
 Функция должна проверить существует ли укзаанное свойство в указанном объекте
 */
function hasProperty(obj, prop) {

    return obj.hasOwnProperty(prop);
}

/*
 Задача 6:
 Функция должна получить все перечисляемые свойства объекта и вернуть их в виде массива
 */
function getEnumProps(obj) {

    return Object.keys(obj);
}

/*
 Задача 7:
 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистра и вернуть в виде массива
 */
function upperProps(obj) {
    let aResult = [];

    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            aResult.push(key.toUpperCase());
        }
    }

    return aResult;
}

/*
 Задача 8 *:
 Напишите аналог встроенного метода slice для работы с массивами
 */
function slice(array, from, to) {
    let iLeft = 0,
        iRight = array.length;

    // вычисляем смещение слева
    if (from) {
        if (from > 0) {
            if (from >= array.length) { // если больше или равен дллинне массива то вернуть пустой массив

                return [];
            }
            iLeft = from;
        } else {
            let iDelta = array.length + from;

            if (iDelta > 0) {
                iLeft = iDelta;
            }
        }
    }

    // вычисляем смещение справа
    if (to == 0) {

        return [];
    }

    if (to) {
        if (to > 0) {
            if (to < array.length) { // если больше или равен дллинне массива то вернуть пустой массив
                iRight = to;
            }
        } else {
            let iDelta = array.length + to;

            if (iDelta > 0) {
                iRight = iDelta;
            } else {

                return [];
            }
        }
    }

    if ((iRight - iLeft) < 1) {
        return [];
    }

    let aResult = Array(iRight - iLeft);

    // создаём результирующий массив
    for (let i = iLeft; i<iRight; ++i) {
        aResult[i - iLeft] = array[i];
    }

    return aResult;
}

/*
 Задача 9 *:
 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {

    return new Proxy(obj, {
        set(obj, name, val) {
            obj[name] = val * val;

            return true;
        }
    });
}

export {
    forEach,
    map,
    reduce,
    deleteProperty,
    hasProperty,
    getEnumProps,
    upperProps,
    slice,
    createProxy
};
