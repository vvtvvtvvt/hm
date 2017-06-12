import Vk from '../src/vk';
import StorageObj from '../src/StorageObj';
import helper from '../src/helper';
import List from '../src/List';
import Template from '../src/Tmp';
import Source_receiver from '../src/source_receiver';

window.addEventListener('load', main);

function main() {

    let vk_api = [];
    let storage_obj = new StorageObj('my_friend');
    let my_list_friend = (storage_obj.is_storage()) ? storage_obj.get_obj() : [];
    let vk_list_friend = [];
    let tmp = new Template();

    let main = document.querySelector('#j-window');
    let name = main.querySelector('.j-name');
    let move_area = main.querySelector('.j-move-area');
    let vk_list_parent = move_area.querySelector('.j-vk-friend__list');
    let my_list_parent = move_area.querySelector('.j-my-friend__list');
    let vk_searsh = main.querySelector('.j-vk-friend__find');
    let my_searsh = main.querySelector('.j-my-friend__find');
    let save = main.querySelector('.footer__btn');

    new Promise((resolve, reject) => vk_api = new Vk(6066877, resolve, reject))
        .then(() => new Promise((resolve, reject) => vk_api.get_user_info({name_case: 'gen'}, resolve, reject)))
        .then((data) => {name.textContent = `Друзья ${data[0].first_name} ${data[0].last_name}`})
        .then(() => new Promise((resolve, reject) => vk_api.get_frieds_of_this_user({fields: 'photo_50'},resolve, reject)))
        .then((data) => {
            vk_list_friend = data.items;
            my_list_friend = helper.delete_unic(my_list_friend, vk_list_friend);
            vk_list_friend = helper.delete_double(vk_list_friend, my_list_friend);

            let vk_list_obj = new List(vk_list_friend, tmp.vk_list, vk_list_parent);
            let my_list_obj = new List(my_list_friend, tmp.my_list, my_list_parent);
            let source_receiver = new Source_receiver(move_area, vk_list_obj, my_list_obj, 'list-item__button', 'list-item' );

            vk_searsh.addEventListener('keyup', function () {
                vk_list_obj.filter(['first_name', 'last_name'], vk_searsh.value, true);
            });

            my_searsh.addEventListener('keyup', function () {
                my_list_obj.filter(['first_name', 'last_name'], my_searsh.value, true);
            });

            save.addEventListener('click', ()=>{storage_obj.save_obj(my_list_obj.get_model())});
            window.addEventListener('beforeunload', () => {storage_obj.save_obj(my_list_obj.get_model());});
        });
}

