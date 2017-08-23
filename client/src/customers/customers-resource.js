
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
    debugger
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
}
