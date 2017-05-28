/* ДЗ 6.1 - Асинхронность и работа с сетью */

/**
 * Функция должна создавать Promise, который должен быть resolved через seconds секунду после создания
 *
 * @param {number} seconds - количество секунд, через которое Promise должен быть resolved
 * @return {Promise}
 */
function delayPromise(seconds) {

    return new Promise(function(resolv) {
        setTimeout(() => {
            resolv();
        }, seconds*1000);
    });
}

/**
 * Функция должна вернуть Promise, который должен быть разрешен массивом городов, загруженным из
 * https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 * Элементы полученного массива должны быть отсортированы по имени города
 *
 * @return {Promise<Array<{name: String}>>}
 */
function loadAndSortTowns() {

    function compare(a, b) {
        if (a.name < b.name) {
            return -1;
        }
        if (a.name > b.name) {
            return 1;
        }

        return 0;
    }

    return new Promise(function(resolv, regect) {

        let xhr = new XMLHttpRequest();
        let url = 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json';

        xhr.open('GET', url);
        xhr.send();
        xhr.addEventListener('load', ()=>{
            if (xhr.status>=200 && xhr.status<400) {
                resolv(JSON.parse(xhr.responseText).sort(compare));
            } else {
                regect(xhr.status);
            }

        });

        xhr.addEventListener('error', ()=>{
            regect(xhr.status);
        });
    });

}

export {
    delayPromise,
    loadAndSortTowns
};
