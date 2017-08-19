let request = require('superagent-use')(require('superagent'));


export default class TestRunsResource{

getLastRunsByEnvironmentId(envId){
    return new Promise((resolve,reject)=>{
        request
        .get(`api/TestRuns?filter[where][environmentId]=${envId}&filter[order]=id desc&filter[limit]=5`)
        .then(({body})=>{
            resolve(body)
        })
        .catch(reject)
    })
}
getTestRunDetailsByRunId(runId){
    return new Promise((resolve,reject)=>{
        request
        .get(`api/TestRuns?filter[where][id]=${runId}`)
        .then(({body})=>{
            resolve(body)
        })
        .catch(reject)
    })
}
}