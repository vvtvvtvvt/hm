let instances;

export default class VkApi{
    constructor(api_id, good, bad, version=5.64) {
        if(instances){
            return instances;
        }

        if(!VK){
            bad(new Error('Не одключена библиотека Вконтакте'));
            return;
        }

        VK.init({
            apiId: api_id
        });

        this._version = version;

        VK.Auth.login(data => {
            if (data.session) {
                good(data);
            } else {
                bad(new Error('Не удалось авторизоваться'));
            }
        }, 2);

        instances = this;

    }

    vk_method(method, options, good, bad){

        if (!options.v) {
            options.v = this._version;
        }

        VK.api(method, options, data => {

            if (data.error) {
                bad(data.error.error_msg);
            } else {
                good(data.response);
            }
        });
    }

    get_user_info(oData, good, bad){
        this.vk_method('users.get',oData, good, bad);
    }

    get_frieds_of_this_user(oData, good, bad) {
        this.vk_method('friends.get',oData , good, bad);
    }

}