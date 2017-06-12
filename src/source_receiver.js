export default class Source_reciver{
    constructor(parent, source, reciver, btn_class, item_class) {
        this._parent = parent;
        this._source = source;
        this._reciver = reciver;
        this._btn_class = btn_class;
        this._item_class = item_class;
        this._add = false;
        this._delete = false;
        this._move_at = this._move_at.bind(this);
        this._mouse_up = this._mouse_up.bind(this);

        reciver.get_parent().addEventListener('click', (event)=> {
            event.stopPropagation();

            if(event.target.classList.contains(this._btn_class)) {
                let del_data = this._reciver.delete_item(this._reciver.item_by_btn(event.target));
                this._source.add_item(del_data);
            }
        });

        source.get_parent().addEventListener('click', (event)=> {
            event.stopPropagation();
            if(event.target.classList.contains(this._btn_class)) {
                let del_data = this._source.delete_item(this._source.item_by_btn(event.target));
                this._reciver.add_item(del_data);
            }
        });

        source.get_parent().addEventListener('mousedown', (event) => {
            if(event.target.classList.contains(this._item_class)){
                this._send_list = this._source;
                this._listen_list = this._reciver;
                this._move(event);
            }
        });

        reciver.get_parent().addEventListener('mousedown', (event) => {
            if(event.target.classList.contains(this._item_class)){
                this._send_list = this._reciver;
                this._listen_list = this._source;
                this._move(event);
            }
        });


    }

    _move(event){
        this._delete_dom_item = event.target;

        this._move_item_data = this._send_list.get_model()[this._send_list.index_by_item(this._delete_dom_item)];

        this._temp_move_item = this._delete_dom_item.cloneNode(true);
        this._temp_move_item.classList.remove(this._item_class);
        this._temp_move_item.classList.add('move-item');

        let coords = this._get_coords( event.target);
        this._shiftX = event.pageX - coords.left;
        this._shiftY = event.pageY - coords.top;

        this._temp_move_item.style.position = 'absolute';
        document.body.appendChild(this._temp_move_item);
        this._move_at(event);

        this._temp_move_item.style.zIndex = 300; // над другими элементами

        document.addEventListener('mousemove', this._move_at);
        document.addEventListener('mouseup', this._mouse_up);

        this._temp_move_item.ondragstart = () => {

            return false;
        };
    }

    _mouse_up(event) {
        document.removeEventListener('mousemove', this._move_at);

        this._temp_move_item.parentNode.removeChild(this._temp_move_item);

        let rect = this._listen_list.get_parent().getBoundingClientRect();
        if(rect.left <= event.screenX && rect.right >= event.screenX && rect.top <= event.screenY && rect.bottom >= event.screenY) {
            this._send_list.delete_item(this._delete_dom_item);
            this._listen_list.add_item(this._move_item_data);
        }
        document.removeEventListener('mouseup', this._mouse_up);
    }

    _move_at(e) {
        this._temp_move_item.style.left = e.pageX - this._shiftX + 'px';
        this._temp_move_item.style.top = e.pageY - this._shiftY + 'px';
    }

    _get_coords(elem) {

        let box = elem.getBoundingClientRect();

        let body = document.body;
        let doc_el = document.documentElement;

        let scroll_top = window.pageYOffset || doc_el.scrollTop || body.scrollTop;
        let scroll_left = window.pageXOffset || doc_el.scrollLeft || body.scrollLeft;

        let client_top = doc_el.clientTop || body.clientTop || 0;
        let client_left = doc_el.clientLeft || body.clientLeft || 0;

        let top  = box.top +  scroll_top - client_top;
        let left = box.left + scroll_left - client_left;

        return { top: Math.round(top), left: Math.round(left) };
    }
}