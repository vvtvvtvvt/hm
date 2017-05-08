/* ДЗ 1 - Функции */

/*
 Задание 1:

 Функция должна принимать один аргумент и возвращать его
 */
function returnFirstArgument(arg) {
    return arg;
}

/*
 Задание 2:

 Функция должна принимать два аргумента и возвращать сумму переданных значений
 Значение по умолчанию второго аргумента должно быть 100
 */
function defaultParameterValue(a, b) {
    return a + (b||100);
}

/*
 Задание 3:

 Функция должна возвращать все переданные в нее аргументы в виде массива
 Количество переданных аргументов заранее неизвестно
 */
function returnArgumentsArray() {
    var aArguments = [];

    for (var i=0; i < arguments.length; ++i) {
        aArguments[i] = arguments[i];
    }

    return aArguments;
}

/*
 Задание 4:

 Функция должна принимать другую функцию и возвращать результат вызова переданной функции
 */
function returnFnResult(fn) {
    return fn();
}

/*
 Задание 5:

 Функция должна принимать число (значение по умолчанию - 0) и возвращать функцию (F)
 При вызове F, переданное число должно быть увеличено на единицу и возвращено из F
 */
function returnCounter(number) {
    number = (number)? number : 0;

    return function () {
        return ++number
    }
}

/*
 Задание 6 *:

 Функция должна принимать другую функцию (F) и некоторое количество дополнительных аргументов
 Функция должна привязать переданные аргументы к функции F и вернуть получившуюся функцию
 */
function bindFunction(fn) {
    var aBindArguments = {};

    aBindArguments.length = arguments.length-1;
    for (var i=0; i<aBindArguments.length; ++i) {
        aBindArguments[i] = arguments[i+1];
    }

    return function() {
        var aResultArguments = {};

        for (var i=0; i<aBindArguments.length; ++i) {
            aResultArguments[i] = aBindArguments[i];
        }
        aResultArguments.length = aBindArguments.length;

        for (i=0; i<arguments.length; ++i) {
            aResultArguments[aResultArguments.length] = arguments[i];
            ++aResultArguments.length;
        }

        return fn.apply(this, aResultArguments);
    };
}

export {
    returnFirstArgument,
    defaultParameterValue,
    returnArgumentsArray,
    returnFnResult,
    returnCounter,
    bindFunction
}
