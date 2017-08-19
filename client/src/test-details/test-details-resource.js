let request = require('superagent-use')(require('superagent'));
import testDetailsStore from "./test-details-store"
import {observable, computed, action, runInAction} from "mobx"
import {serializable, identifier, update, deserialize, serialize, object, list} from "serializr"

export default class TestDetailsResource {

    getTestDetailsByTestName(testName) {
        return new Promise((resolve, reject) => {
            request
                .get(`api/TestResults?filter[testName]=${testName}`)
                .then(({ body }) => {
                    resolve(body)
                })
                .catch(reject)
        })
    }

    getAllTests() {
        return new Promise((resolve, reject) => {
            request
                .get(`api/TestResults`)
                .then(({ body }) => {
                    resolve(body)
                })
                .catch(reject)
        })
    }
    getAllTestsByEnvironmentId(id) {
        var getRequest = null;
        if (testDetailsStore.testRunsSelected == null) {
            getRequest = `api/TestResults?filter[where][environmentId]=${id}`
        }
        else {
            getRequest = `api/TestResults?filter[where][environmentId]=${id}&filter[where][projectId]=${testDetailsStore.testRunsSelected}`
        }

        return new Promise((resolve, reject) => {
            request
                .get(`api/TestResults?filter[where][environmentId]=${id}`)
                .then(({ body }) => {
                    resolve(body)
                })
                .catch(reject)
        })
    }
    getAllTestsByTestRunId(id) {
        var getRequest = null;
        if (testDetailsStore.testRunsSelected == null) {
            getRequest = `api/TestResults?filter[where][testRunId]=${id}`
        }
        else {
            getRequest = `api/TestResults?filter[where][testRunId]=${id}&filter[where][projectId]=${testDetailsStore.testRunsSelected}`
        }
        return new Promise((resolve, reject) => {
            request
                .get(getRequest)
                .then(({ body }) => {
                    resolve(body)
                })
                .catch(reject)
        })
    }
    getResultsByProjectId(projectId, runId) {
        var getRequest = null;
        var project = "";
        if (projectId != 'All') {
            project = `&filter[where][projectId]=${parseInt(projectId)}`;
        }
        else { project = "" }
        if (appStore.testDetailsStore.testRunsSelected == null) {
            getRequest = `api/TestResults?filter[where][environmentId]=${appStore.testDetailsStore.environmentSelected}${project}`
        }
        else {
            getRequest = `api/TestResults?filter[where][testRunId]=${runId}${project}`
        }
        return new Promise((resolve, reject) => {
            request
                .get(getRequest)
                .then(({ body }) => {
                    resolve(body)
                })
                .catch(reject)
        })
    }
    listenTestResults() {
        var urlToChangeStream = '/api/TestResults/change-stream?_format=event-stream';
        var src = new EventSource(urlToChangeStream);
        src.addEventListener('data', function (msg) {
            var data = JSON.parse(msg.data);
            appStore.testDetailsStore.listenTestResults(data)
        });
    }


    //updated/POST requests
    updateTestReviewedByTestId(testId, reviewed,name) {
        return new Promise((resolve, reject) => {
            request
                .patch(`api/TestResults/${testId}`)
                .send({
                    "reviewed": reviewed,
                    "userDisplayName":name
                })
                .then(({ body }) => {
                    resolve(body)
                })
                .catch(reject)
        })
    }
    startJenkinsJob() {
        return new Promise((resolve, reject) => {
            request
                .post(`http://52.8.145.21:8080/view/Test%20Suites/job/Bvt%20Tests/buildWithParameters?token=123`)
                .set({'Access-Control-Allow-Credentials': true,
                      'Access-Control-Allow-Origin': "*",'Origin': 'http://52.8.145.21:8080'})
                .withCredentials()
                .set({'Authorization': `basic ${new Buffer("ssadmin:tPVYvP3yM3PenVAc").toString("base64")}`} )
                .send({
                    Browser: 'CH',
                    Environment: 'Integ'
                })
                .catch(reject)
        })
    }
}

