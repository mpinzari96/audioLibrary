var es = require('event-stream');
module.exports = function(app) {
  var Orders = app.models.Orders;
  Orders.createChangeStream(function(err, changes) {
    changes.pipe(es.stringify()).pipe(process.stdout);
  });
  var Customers = app.models.Customers;
  Customers.createChangeStream(function(err, changes) {
    changes.pipe(es.stringify()).pipe(process.stdout);
  });
}
