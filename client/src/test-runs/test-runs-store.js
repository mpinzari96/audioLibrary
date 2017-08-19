    import { observable, computed, action, runInAction } from "mobx"
    import TestRunsResource from "../test-runs/test-runs-resource"


export default class TestRunsStore {
    testRunsResource


    constructor(appStore) {
        this.appStore = appStore
        this.testRunsResource = new TestRunsResource()
    }
    @observable testRuns=[]
    
    
    @action.bound getTestRunDetailsByRunId(runid) {
        
        return this.testRunsResource.getTestRunDetailsByRunId(runid)
            .then(tr => {
                this.testRuns.replace(tr)
            })
            .catch(err => {
                console.log("Failed to load test Runs." + err)
            })
    }
}