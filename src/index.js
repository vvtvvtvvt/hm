import Data_map from './model/Map';
import Ya_map from './model/YaMap';
import rout from './route/main_route';

window.addEventListener('load', main);

function main() {

    let data_map = new Data_map();
    let ya_map = false;
    let map_id = 'map';
    let wrapp = document.querySelector('.j-wrapp');

    new Promise((resolve, reject) =>{
        ya_map = new Ya_map (resolve, reject);
    }).then(()=>{
        ya_map.create_map(map_id);
        ya_map.create_classter(map_id);
        ya_map.add_metka_to_map(map_id, data_map.get_all_comments());

        ya_map.add_event_on_map(map_id, 'click', function(event) {
            rout('new_point', event);
        });
        ya_map.add_event_on_metka(map_id, 'click', function(event) {
            rout('open_msg', event);

        });

        wrapp.addEventListener('click', function(event) {
            event.preventDefault();

            if (event.target.classList.contains('j-close')) {
                rout('close_window');
            }

            if (event.target.classList.contains('j-send-btn')) {
                rout('add_msg', data_map)
            }

            if (event.target.classList.contains('j-link')) {
                rout('open_msg_classter', event);
            }
        });

    }).catch((result) => console.log(result));
}
