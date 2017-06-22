import tmp_dialog from '../template/dialog.hbs';
import base from './base';

export default class dialogView extends base{
    constructor(model) {
        let tmp = tmp_dialog(model);

        super(tmp);
    }

}