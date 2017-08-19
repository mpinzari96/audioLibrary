// module.exports = function(app) {
//   app.dataSources.testresults.automigrate('TestRun', function(err) {
//     if (err) throw err;

//     app.models.TestRun.get([{
//       id: 2240,
//       testName: 'Vancouver'
//     },  ], function(err, TestRun) {
//       if (err) throw err;
//       console.log('Models created: \n', TestRun);
//     });
//   });
// };