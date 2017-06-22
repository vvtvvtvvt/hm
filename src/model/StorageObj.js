export default class StorageObj {
    constructor(name) {
        this._name = name;
        this._obj = JSON.parse(localStorage.getItem(this._name));
        this._is_storage = false;

        if (!this._obj) {
            this._obj = {};
        }

    }

    is_storage() {
        return this._is_storage;
    }

    get_obj() {
        return this._obj;
    }

    save_obj(obj) {
        this._obj = obj;
        localStorage.setItem(this._name, JSON.stringify(this._obj));
    }

    create_list(item_name) {
        let name = item_name + '_list';

        localStorage.setItem(name, JSON.stringify({}));

        return { 'list_name': name, 'list_val': {} };
    }

    add_list(list, item, name) {
        let obj = JSON.parse(localStorage.getItem(list.list_name));

        obj[name] = {};

        if (item) {
            localStorage.setItem(name, JSON.stringify(item));
        }

        localStorage.setItem(list.list_name, JSON.stringify(obj));
        list.list_val = obj;

        return obj;
    }

    update_from_list(name, obj) {
        localStorage.setItem(name, JSON.stringify(obj));
    }

    get_from_list(name) {

        return JSON.parse(localStorage.getItem(name));
    }
}

