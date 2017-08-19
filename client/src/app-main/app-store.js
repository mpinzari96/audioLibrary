import ReportStore from './../reports/report-store'
import ViewStore from './view-store'
import NewOrdersStore from './../new-orders/new-orders-store'
import TestDetailsStore from './../test-details/test-details-store'

export default class AppStore {
	reportStore
	viewStore
	testDetailsStore
	newOrdersStore

	constructor() {
		this.reportStore = new ReportStore(this)
		this.testDetailsStore = new TestDetailsStore(this)
		this.viewStore = new ViewStore(this)
		this.newOrdersStore = new NewOrdersStore(this)
	}

	get isLoading() {
		return false //this.tcFileStore.isLoading // make this an or for all the stores?
	}
}