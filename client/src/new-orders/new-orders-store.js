import { observable, computed, action, runInAction } from "mobx"
import { serializable, identifier, update, deserialize, serialize, object, list } from "serializr"
import NewOrdersResource from "./new-orders-resource"

export default class NewOrdersStore {

newOrderResource

    constructor(appStore) {
        this.appStore = appStore
            this.newOrderResource=new NewOrdersResource()

    }
    @observable newOrders = []

 @computed get newOrdersData(){
   return this.newOrders.slice()
}


@action.bound getAllOrders(){
        return this.newOrderResource.getAllOrders()
            .then(tr => {
                this.newOrders.replace(tr)
            })
            .catch(err => {
                console.log("Failed to load all Orders." + err)
            })
}
}
