import { observable, computed, action, runInAction } from "mobx"
import { serializable, identifier, update, deserialize, serialize, object, list } from "serializr"
import CustomersResource from "./customers-resource"
import moment from "moment"

export default class CustomersStore{

  customersResource
  constructor(appStore) {
    this.appStore=appStore
    this.customersResource=new CustomersResource()
  }
    @observable allCustomers = []

        @computed get allCustomersData() {
        return this.allCustomers.slice()
    }

@action.bound getAllCustomers(){
        return this.customersResource.getAllCustomers()

            .then(tr => {
                this.allCustomers.replace(tr)
            })
            .catch(err => {
                console.log("Failed to load all customers." + err)
            })
}

@action.bound createNewCustomer(newCustomer){
var date = moment().format();
return this.customersResource.createNewCustomer(newCustomer,date);
}

}
