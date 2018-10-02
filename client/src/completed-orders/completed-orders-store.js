import { observable, computed, action, runInAction } from "mobx"
import { serializable, identifier, update, deserialize, serialize, object, list } from "serializr"
import CompletedOrdersResource from "./completed-orders-resource"
import moment from "moment"

export default class completedOrdersStore {

    completedOrderResource

    constructor(appStore) {
        this.appStore = appStore
        this.completedOrderResource = new CompletedOrdersResource()

    }
    @observable completedOrders = []

    @computed get completedOrdersData() {
        return this.completedOrders.filter(x=>x.orderStatus=="Completed").slice()
    }

    @action.bound getAllOrders() {
        return this.completedOrderResource.getAllOrders()
            .then(tr => {
                this.completedOrders.replace(tr)
            })
            .catch(err => {
                console.log("Failed to load all Orders." + err)
            })
    }
    @action.bound createOrder(customerId, customerName, orderSummary) {
        var date = moment().format();
        return this.completedOrderResource.createOrder(customerId, customerName, orderSummary, date);

    }
    @action.bound updateStatus(customerId, status) {
        return this.completedOrderResource.updateStatus(customerId, status);

    }
    @action.bound streamOrders(data) {
        const copycompletedOrders = this.completedOrders;
        const result = copycompletedOrders.find(item => item.id == data.data.id)
        result.orderStatus = data.data.orderStatus;
        this.completedOrders.replace(copycompletedOrders)
    }
    startStream() {
        this.completedOrderResource.streamOrders();
    }
}
