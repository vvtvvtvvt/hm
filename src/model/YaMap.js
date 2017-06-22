let instances;

export default class YaMap {
    constructor(good, bad) {
        if (instances) {
            return instances;
        }

        this._init = false;
        this._maps = {};

        if (ymaps) {
            ymaps.ready( ()=> { this._init = true; good()} );
        } else {
            bad();
        }

        this._good = good;
        this._bad = bad;

        instances = this;
    }

    /**
     * Получен ли api яндекс карт
     * @param bad
     * @returns {boolean}
     * @private
     */
    _is_init(bad) {

        if (!this._init) {
            bad('Не проинициализировано API яндекс карт');

            return false;
        }

        return true;
    }

    /**
     * создание карты
     * @param id
     * @param center
     * @param zoom
     * @param search
     * @param good
     * @param bad
     */
    create_map(id = 'map',
               center = [55.76, 37.64],
               zoom = 5,
               search = 'yandex#search',
               good = this._good,
               bad = this._bad) {
        this._is_init(bad);

        this._maps[id] = { 'map':
            new ymaps.Map('map', {
                center: center, // Москва
                zoom: zoom
            }, {
                searchControlProvider: search
            })
        };
        this._maps[id]['metka'] = [];
        good(true);
    }

    /**
     * Добавление кластера
     * @param id_map
     * @param option
     * @param good
     * @param bad
     */
    create_classter(id_map, option = {
        preset: 'islands#invertedVioletClusterIcons',
        groupByCoordinates: false,
        clusterDisableClickZoom: true,
        clusterHideIconOnBalloonOpen: false,
        geoObjectHideIconOnBalloonOpen: false,
        clusterBalloonContentLayout: 'cluster#balloonCarousel',
    }, good = this._good, bad = this._bad) {

        this._is_init(bad);
        let classter = new ymaps.Clusterer(option);

        this._maps[id_map]['map'].geoObjects.add(classter);
        this._maps[id_map]['classter'] = classter;
        good(true);
    }

    add_event_on_map(map_id, name, funk) {
        this._maps[map_id]['map'].events.add(name, funk);
    }

    add_event_on_metka(map_id, name, funk) {
        this._maps[map_id]['map'].geoObjects.events.add(name, funk);
    }

    geocode_address(address, good = this._good, bad = this._bad) {
        this._is_init(bad);

        return ymaps.geocode(address).then(result => {
            var points = result.geoObjects.toArray();

            if (points.length) {
                return points[0].geometry.getCoordinates();
            }
        });
    }

    geocode_coord(coord, good = this._good, bad = this._bad) {
        this._is_init(bad);

        return ymaps.geocode(coord)
            .then(result => {

                return result.geoObjects.get(0).properties.get('text');
            });
    }
    close_balun(map_id) {
        this._maps[map_id].classter.balloon.close();
    }

    /**
     * Добавление метки на карту
     * @param coords
     */
    add_metka_to_map(map_id, items) {

        var placemarks = items.map(item => {

            let placemark = new ymaps.Placemark(item.coord, {
                'hasBalloon' : false,
                'clusterCaption': `<div class="balun-item">
                        ${item.plase}
                        <a class="balun-link j-link" data-coord="${item.coord}">${item.adress}</a>
                        <div class="balun-text">${item.text}</div>
                        <div class="balun-date">${item.date}</div>
                    </div>`,
                }
            );

            return placemark;
        });

        this._maps[map_id]['metka'] = this._maps[map_id]['metka'].concat(placemarks);
        this._maps[map_id]['classter'].add(placemarks);
    }

    event_to_plecemark(funk) {
        ymaps.Events.observe(placemark, placemark.Events.Click, funk);
    }
}