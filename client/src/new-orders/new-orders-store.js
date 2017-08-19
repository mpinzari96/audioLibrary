import { observable, computed, action, runInAction } from "mobx"
import { serializable, identifier, update, deserialize, serialize, object, list } from "serializr"

export default class NewOrdersStore {
    constructor(appStore) {
        this.appStore = appStore
    }
    @observable newOrders = []




}