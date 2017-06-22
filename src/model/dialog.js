import YaMap from './YaMap'

let dialog = {
    getData(data) {
        let possition_x = data.get('domEvent').originalEvent.offsetX;
        let possition_y = data.get('domEvent').originalEvent.offsetY;
        let coord = data.get('coords');
        let ya_map = new YaMap();

        return new Promise((resolve, reject) => {
            ya_map.geocode_coord(coord, resolve, reject).then((result)=> {
                resolve({ 'adress': result,
                    'coord': coord,
                    'pos_x': possition_x,
                    'pos_y': possition_y });
            });
        })
    }
};

export default dialog