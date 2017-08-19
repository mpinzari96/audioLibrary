import { observable, computed, action, runInAction } from "mobx"
import { serializable, identifier, update, deserialize, serialize, object, list } from "serializr"
import TestDetailsResource from "./test-details-resource"

export default class TestDetailsStore {

    testDetailsResource
    environmentResource
    testRunsResource

    constructor(appStore) {
        this.appStore = appStore
        this.testDetailsResource = new TestDetailsResource()

    }
    @observable testResults = []
    @observable browserType = []
    @observable environmentType = []
    @observable testRuns = []
    environmentSelected
    testRunsSelected


    @computed get testResultsArray() {
        return this.testResults.slice()
    }


    @action.bound getAllTests() {
        debugger
        return this.testDetailsResource.getAllTests()

            .then(tr => {
                debugger
                this.testResults.replace(tr)
            })
            .catch(err => {
                console.log("Failed to load test results." + err)
            })
    }
    @action.bound getAllTestsByEnvironmentId(id) {
        return this.testDetailsResource.getAllTestsByEnvironmentId(id)
            .then(tr => {
                this.testResults.replace(tr)
            })
            .catch(err => {
                //console.log("Failed to load test results." + err)
                throw err;
            })
    }
    @action.bound getAllEnvironments() {
        return this.environmentResource.getAllEnvironments()
            .then(env => {
                this.environmentType.replace(env)
            })
            .catch(err => {
                console.log("Failed to load environment type." + err)
            })
    }
    @action.bound getLastRunsByEnvironmentId(environmentId) {
        return this.testRunsResource.getLastRunsByEnvironmentId(environmentId)
            .then(env => {
                this.testRuns.replace(env)
            })
            .catch(err => {
                console.log("Failed to load test runs ." + err)
            })
    }
    @action.bound getAllTestsByTestRunId(runId) {
        return this.testDetailsResource.getAllTestsByTestRunId(runId)
            .then(env => {
                this.testResults.replace(env)
            })
            .catch(err => {
                console.log("Failed to load test runs ." + err)
            })
    }
    @action.bound getResultsByProjectId(projectId) {
        return this.testDetailsResource.getResultsByProjectId(projectId, this.testRunsSelected)
            .then(tr => {
                this.testResults.replace(tr)
            })
            .catch(err => {
                console.log("Failed to load test runs ." + err)
            })
    }
    @action.bound updateTestReviewedByTestId(testId, reviewed,name) {
        const resultsItem = appStore.testDetailsStore.testResults.find(item => {
            return item.id === testId;
        })
        resultsItem.reviewed = !resultsItem.reviewed;
        return this.testDetailsResource.updateTestReviewedByTestId(testId, resultsItem.reviewed,name)

            .catch(err => {
                console.log("Failed to load test runs ." + err)
            })
    }
    @action.bound listenTestResults(data) {
        const copyResults = this.testResults;
        const result = copyResults.find(item => item.id == data.data.id)
        result.reviewed = data.data.reviewed;
        result.userDisplayName =data.data.userDisplayName;
        this.testResults.replace(copyResults)
    }
    startStream() {
        this.testDetailsResource.listenTestResults();
    }

}


