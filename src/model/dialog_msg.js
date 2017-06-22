import Map from './Map';

let dialog = {
    getData(data) {
        let map = new Map();
        let target = data.get('target');
        let coord = target.geometry.getCoordinates();
        let msgs = map.get_comment(coord,
            data.get('domEvent').originalEvent.offsetX,
            data.get('domEvent').originalEvent.offsetY);

        return {
            'adress': msgs.adress,
            'coord': coord,
            'pos_x': data.get('domEvent').originalEvent.offsetX,
            'pos_y': data.get('domEvent').originalEvent.offsetY,
            'comments': msgs.comments
        };
    },

    get_data_classter(data) {
        let coord = (data.target.dataset.coord).split(',');
        let map = new Map();
        let msgs = map.get_comment(coord, data.screenX, data.screenY);

        return {
            'adress': msgs.adress,
            'coord': coord,
            'pos_x': data.screenX,
            'pos_y': data.screenY,
            'comments': msgs.comments
        };
    }
};

export default dialog;