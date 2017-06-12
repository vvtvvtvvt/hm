export default {
    delete_double: function(target, obrazec) {

        return target.filter( function(item) {
            let item_target = item;

            return !obrazec.some((item_obr)=> {

                return item_obr.id == item_target.id;
            });
        });

    },

    delete_unic: function(target, obrazec) {

        return target.filter( function(item) {
            let item_target = item;

            return obrazec.some((item_obr)=> {

                return item_obr.id == item_target.id;
            });
        });
    }
}