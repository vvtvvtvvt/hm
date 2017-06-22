import controller from '../controller/controller'

export default function route(name, data) {
   controller[name + '_rout'](data);
}