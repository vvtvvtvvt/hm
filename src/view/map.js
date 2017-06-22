let map = document.querySelector('#map');

export default function map_status(status) {
    if (status) {
        map.classList.remove('disable');
    } else {
        map.classList.add('disable');
    }
}