
let request = require('superagent-use')(require('superagent'));
import { observable, computed, action, runInAction } from "mobx"
import { serializable, identifier, update, deserialize, serialize, object, list } from "serializr"



export default class CustomersResource {


  getAllCustomers() {
    return new Promise((resolve, reject) => {
      request
        .get(`api/customers`)
        .then(({ body }) => {
          resolve(body)
        })
        .catch(reject)
    })
  }
  createNewCustomer(newCustomer,createdDate) {
    return new Promise((resolve, reject) => {
      request
        .post(`api/customers`)
        .send({
          "lastName": newCustomer.lastName,
          "email": newCustomer.email,
          "address": "",
          "phoneNumber": newCustomer.phoneNumber,
          "createdDate": createdDate,
          "firstName": newCustomer.firstName
        })
        .then(({ body }) => {
          resolve(body)
        })
        .catch(reject)
    })
  }
  streamOrders() {
    var urlToChangeStream = '/api/Customers/change-stream?_format=event-stream';
    var src = new EventSource(urlToChangeStream);
    src.addEventListener('data', function (msg) {
        var data = JSON.parse(msg.data);
        appStore.customersStore.streamOrders(data)
    });
}
}
