
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

 createOrder(customerId,customerName,orderSummary,orderDate) {
    return new Promise((resolve, reject) => {
      request
        .post(`api/orders`)
        .send({
          "customerId": customerId,
          "customerName": customerName,
          "orderSummary": orderSummary,
          "orderDate":orderDate,
          "orderStatus":"Recieved"
        })
        .then(({ body }) => {
          resolve(body)
        })
        .catch(reject)
    })
  }
  updateStatus(orderData,status){
    return new Promise((resolve, reject) => {
      request
        .put(`api/orders/${orderData.id}`)
        .send({
          "customerId": orderData.customerId,
          "customerName": orderData.customerName,
          "orderSummary": orderData.orderSummary,
          "orderDate":orderData.orderDate,
          "orderStatus":status
        })
        .then(({ body }) => {
          resolve(body)
        })
        .catch(reject)
    })
  }
  streamOrders() {
    var urlToChangeStream = '/api/Orders/change-stream?_format=event-stream';
    var src = new EventSource(urlToChangeStream);
    src.addEventListener('data', function (msg) {
        var data = JSON.parse(msg.data);
        appStore.newOrdersStore.streamOrders(data)
    });
}
}
