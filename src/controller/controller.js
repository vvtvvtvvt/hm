import dialog_model from '../model/dialog';
import dialog_comment_model from '../model/dialog_msg';
import Dialog_view from '../view/Dialog';
import map_on_of from '../view/map';
import Map from '../model/Map';
import Ya_map from '../model/YaMap';

let controller = {
    _parent: document.querySelector('.j-wrapp'),
    _window: null,

    new_point_rout(data) {
        dialog_model.getData(data).then((result) => {
            this._window = (new Dialog_view(result)).get_html();
            this._parent.appendChild(this._window);
            this.map_of_click_route(false);
        });
    },

    open_msg_rout(data) {
        if (!data.get('target').properties.get('clusterCaption')) {
            return;
        }
        this._window = (new Dialog_view(dialog_comment_model.getData(data))).get_html();
        this._parent.appendChild(this._window);
        this.map_of_click_route(false);
    },

    open_msg_classter_rout(data) {

        this._window = (new Dialog_view(dialog_comment_model.get_data_classter(data))).get_html();
        this._parent.appendChild(this._window);
        this.map_of_click_route(false);
        let ya_map = new Ya_map();

        ya_map.close_balun('map');
    },

    map_of_click_route(status) {
        map_on_of(status);
    },

    close_window_rout() {
        this._parent.removeChild(this._window);
        this.map_of_click_route(true);
    },

    add_msg_rout() {
        let msg = {};

        msg.autor = this._window.querySelector('.j-name').value;
        msg.plase = this._window.querySelector('.j-plase').value;
        msg.text = this._window.querySelector('.j-text').value;
        msg.adress = this._window.querySelector('.j-title').innerText;
        msg.coord = (this._window.dataset.coord).split(',');
        msg.date = (new Date()).toLocaleDateString();

        let ya_map = new Ya_map();

        ya_map.add_metka_to_map('map', [msg]);

        let pos_x = this._window.style.left;
        let pos_y = this._window.style.top;
        let map = new Map();

        map.add_comment(msg);

        let msgs = map.get_comment(msg.coord, pos_x, pos_y);

        this._parent.removeChild(this._window);
        this._window = (new Dialog_view(msgs)).get_html();
        this._parent.appendChild(this._window);
    }
};

export default controller;