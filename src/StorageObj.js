export default class StorageObj {
    constructor(name) {
        localStorage.setItem(this._name, JSON.stringify(null));

        this._name = name;
        this._obj =  JSON.parse(localStorage.getItem(this._name));
        this._is_storage = false;

        if(this._obj) {
            this._is_storage = true;
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
}