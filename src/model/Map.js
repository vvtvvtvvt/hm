import Local_store from './StorageObj';

let instanse;

export default class Map {

    constructor() {

        if (instanse) {
            return instanse;
        }

        this._local_data = new Local_store('map');
        this._data = this._local_data.get_obj();

        this._coments = false;

        if (!this._data.coords) {
            this._data.coords = this._local_data.create_list('coords');
            this._local_data.save_obj(this._data);
        }

        this.get_all_comments();

        instanse = this;
    }

    add_comment(comment) {

        let coord_name = `n_${comment.coord[0]}_${comment.coord[1]}`;

        if (!this._data.coords.list_val[coord_name]) {
            this._local_data.add_list(this._data.coords, [comment], coord_name);
            this._coments[coord_name] = [comment];
        } else {
            let arr = this._local_data.get_from_list(coord_name);

            arr.push(comment);
            this._local_data.update_from_list(coord_name, arr);
            this._coments[coord_name] = arr;
        }
        this._local_data.save_obj(this._data);

    }

    get_comment(coord, pos_x, pos_y) {
        let coord_name = `n_${coord[0].toString()}_${coord[1].toString()}`;
        let arr = this._local_data.get_from_list(coord_name);

        return { 'comments': arr,
            'coord': coord,
            'adress': arr[0].adress,
            'pos_x': parseInt(pos_x),
            'pos_y': parseInt(pos_y)
        };
    }

    get_all_comments() {
        if (!this._coments) {
            this._coments = {};
            let items = this._data.coords.list_val;

            for (let key in items) {
                this._coments[key] = this._local_data.get_from_list(key);
            }

            let items_itog = [];

            for (let key in this._coments) {
                for (let i=0; i<this._coments[key].length; ++i) {
                    items_itog.push(this._coments[key][i]);
                }
            }

            this._coments = items_itog;
        }

        return this._coments;
    }
}