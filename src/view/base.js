export default class View {

    constructor(template) {
        this._str = template;
        this._html = null;
    }

    get_str() {

        return this._str;
    }

    get_html() {
        if (!this._html) {
            let div = document.createElement('DIV');

            div.innerHTML = this._str;
            this._html = div.children[0];
        }

        return this._html;
    }

    change_template(str) {
        this._str = str;
        this._html = null;
    }

    append(parent) {
        parent.appendChild(this.get_Html());
    }
}