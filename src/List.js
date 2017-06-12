export default class List{
    constructor(data, template_item, parent) {
        this._model = data;
        this._mode_obj = this._model.reduce((prev, item, index)=>{

            prev['' + item.id] = index;

            return prev;
        }, {});

        this._tmp_item = template_item;
        this._parent = parent;
        this.reDraw(this._model);
        this._filter = false;
    }

    setModel(model) {
        this._mode = model;
    }

    add_item(item) {
        this._model.push(item);
        if(this._filter) {
            this._filter_list.pusht(item);
            this.reDraw(this._filter_list, false);

            return;
        }

        this.reDraw(this._model, false);
    }

    item_by_btn(btn) {

        return btn.parentNode;
    }

    index_by_btn(btn) {

        return btn.parentNode.dataset.name;
    }

    index_by_item(item) {

        return item.dataset.name;
    }

    delete_item(dom_item) {

        let index = dom_item.dataset.name;
        let del_obj = {};

        if(this._filter) {
            let item_id = this._filter_list[index].id;

            this._model = this._model.filter((item)=>{

                return (item.id == item_id)? false : true;
            });

            this._filter_list.splice(index, 1);
            this.reDraw(this._filter_list, false);
        } else {

            delete this._mode_obj[this._model[index].id];
            del_obj = this._model[index];
            this._model.splice(index, 1);
            this.reDraw(this._model, false);
        }

        return del_obj;
    }

    get_model() {

        return this._model;
    }

    get_parent() {

        return this._parent;
    }

    reDraw(oData, all=true) {

        if(all) {
            this._view = this._tmp_item(oData).html;
        } else {
            this._view.innerHTML = this._tmp_item(oData).str;

            return;
        }
        this._parent.parentNode.replaceChild(this._view, this._parent);
        this._parent = this._view;
    }

    filter(feilds, text, join = false) {

        if(text == '') {

            this.reDraw(this._model, false);
            this._filter = false;

            return;
        }
        this._filter = true;
        this._filter_list = this._model.filter((item)=>{

            if(!join) {
                return feilds.some((f_item) => {

                    return (item[f_item].indexOf(text) != -1) ? true : false;
                });
            } else {
                let item_text = feilds.reduce((prev, f_item) => {
                    if(prev != '') {
                        prev += ' ';
                    }
                    return prev +=  item[f_item];
                },'');

                return (item_text.indexOf(text) != -1) ? true : false;
            }
        });
        this.reDraw(this._filter_list, false);
    }
}