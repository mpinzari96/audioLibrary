import { observable, computed, action, runInAction, autorun } from "mobx"
import _ from "lodash"
import Cons from "./../cons.js"
import FilterOptions from "../shared/filter-options"


export default class ViewStore {
  @observable page = ""
  @observable selectedTab = ""
  @observable selectedFileId = null
  @observable addFileDialogOpen = false
  @observable fileTableViewOptions = new FilterOptions()// { order: " " }appStore

  constructor(appstore) {
    this.appStore = appstore
  }

  @computed get isLoading() {
    return this.appStore.isLoading
  }

  @computed get currentUrl() {
    switch (this.page) {
        case "":
        return "/"
      case Cons.pages.reports:
        return "#/reports"
              case Cons.pages.newOrders:
        return "#/new-orders"
      case Cons.pages.customers:
        return "#/customers"
      default:
        return "#/404"
    }
  }

  @action.bound showAddFileDialog() {
    this.addFileDialogOpen = true;
  }

  @action.bound hideAddFileDialog() {
    this.addFileDialogOpen = false;
  }
  @action.bound openNewOrdersPage() {
    this.page = Cons.pages.newOrders
    this.selectNewOrdersTab()
  }
  @action.bound openCustomersPage() {
    this.page = Cons.pages.customers
    this.selectCustomersTab()
  }

  @action.bound selectTab(tabName) {
    this.selectedTab = tabName
  }

  @action.bound selectFilesTab() {
    this.appStore.tcFileStore.loadFiles()
    this.selectedTab = Cons.pages.files
    this.page = Cons.pages.files
  }

  @action.bound selectNewOrdersTab() {
    this.selectedTab = Cons.pages.newOrders
    this.page = Cons.pages.newOrders
  }
  @action.bound selectCustomersTab() {
    //to do when clicked
    this.selectedTab = Cons.pages.customers
    this.page = Cons.pages.customers

  }

  @action.bound handleAuth(query) {
    this.page = ""
    appStore.authStore.setAuthData(query)
    this.page = Cons.pages.files
  }



  @action.bound showErrorNotification(message) {
    alert("There was an error")
    // $( 'body' ).pgNotification( {
    // 	message: message,
    // 	type: 'danger'
    // } ).show();
    console.log(message)
  }

  @action.bound showInfoNotification(message) {
    // $( 'body' ).pgNotification( {
    // 	message: message,
    // 	type: 'info'
    // } ).show();
  }


  foo = autorun(() => {
    console.log(this.fileTableViewOptions.filter)
    //debugger
    if (this.appStore)
      this.appStore.testDetailsStore.getAllEnvironments()
  }
  )
}
