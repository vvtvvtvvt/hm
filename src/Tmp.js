export default class Template{
    constructor(){
        this._str = null;
        this._html = null;
        this.vk_list = this.vk_list.bind(this);
        this.my_list = this.my_list.bind(this);
    }

    str(){
        return this._str;
    }

    toHtml(){
        let div = document.createElement("DIV");
        div.innerHTML = this._str;

        return div.children[0];
    }

    vk_list(items, all=true) {
        let root = ``;

        if(all) {
            root = `<ul class="friend-list j-vk-friend__list">`;
        }

        if(items.length == 0) {
            root +=`<li> Список пуст </li>`;

        } else {
            root = items.reduce((prev, item, index) => {

                return prev + `<li class="list-item" data-name="${index}">
                    <img class="list-item__img" src = "${item.photo_50}" />
                    <p class="list-item__name">${item.first_name} ${item.last_name}</p>
                    <button class="list-item__button j-vk-list-btn"></button>
                </li>`;

            }, root);
        }

        if(all) {
            root += `</ul>`;
        }

        this._str = root;


        this._html = this.toHtml();

        return  {
            'str': this._str,
            'html': this._html
        };
    }

    my_list(items, all=true) {
        let root = ``;

        if(all) {
            root = `<ul class="friend-list j-vk-friend__list">`;
        }

        if(items.length == 0) {
            root +=`<li> Список пуст </li>`;

        } else {
            root = items.reduce((prev, item, index) => {

                return prev + `<li class="list-item" data-name="${index}">
                    <img class="list-item__img" src = "${item.photo_50}" />
                    <p class="list-item__name">${item.first_name} ${item.last_name}</p>
                    <button class="list-item__button list-item__button_del j-my-list-btn"></button>
                </li>`;

            }, root);
        }

        if(all) {
            root += `</ul>`;
        }

        this._str = root;


        this._html = this.toHtml();

        return  {
            'str': this._str,
            'html': this._html
        };
    }
}