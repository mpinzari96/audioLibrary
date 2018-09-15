'use strict'
//const logger = require('./../modules/logger'),
  const _ = require('lodash'),
  ServerUtils = require("./../modules/server-utils")

module.exports = (app, done) => {
    // let ds = app.datasources['audioLibrary'],
    //   models = ServerUtils.attachedModels(app),
    //   modelNames = models.map((model) => model.modelName)
    // ds.autoupdate(modelNames, (err, results) => {
    // //  logger.debug("AutoUpdate Results: " + JSON.stringify(results))
    //   done(err ? err : null)
    // })
    done()
  }
