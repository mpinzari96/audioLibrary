import { observable, computed, action, runInAction } from "mobx"
import { serializable, identifier, update, deserialize, serialize, object, list } from "serializr"
import NewOrdersResource from "./new-orders-resource"
import moment from "moment"

export default class NewOrdersStore {

    newOrderResource

    constructor(appStore) {
        this.appStore = appStore
        this.newOrderResource = new NewOrdersResource()

    }
    @observable newOrders = []

    @computed get newOrdersData() {
        return this.newOrders.slice()
    }

    @action.bound getAllOrders() {
        return this.newOrderResource.getAllOrders()
            .then(tr => {
                this.newOrders.replace(tr)
            })
            .catch(err => {
                console.log("Failed to load all Orders." + err)
            })
    }
    @action.bound createOrder(customerId, customerName, orderSummary) {
        var date = moment().format();
        return this.newOrderResource.createOrder(customerId, customerName, orderSummary, date);

    }
    @action.bound updateStatus(customerId, status) {
        return this.newOrderResource.updateStatus(customerId, status);

    }
    @action.bound streamOrders(data) {
        const copyNewOrders = this.newOrders;
        const result = copyNewOrders.find(item => item.id == data.data.id)
        result.orderStatus = data.data.orderStatus;
        this.newOrders.replace(copyNewOrders)
    }
    startStream() {
        this.newOrderResource.streamOrders();
    }
}
