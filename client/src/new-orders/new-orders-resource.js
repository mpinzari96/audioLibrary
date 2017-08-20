
let request = require('superagent-use')(require('superagent'));
import {observable, computed, action, runInAction} from "mobx"
import {serializable, identifier, update, deserialize, serialize, object, list} from "serializr"

export default class NewOrdersResource{

getAllOrders(){
        return new Promise((resolve, reject) => {
            request
                .get(`api/orders`)
                .then(({ body }) => {
                    resolve(body)
                })
                .catch(reject)
        })
}



}
