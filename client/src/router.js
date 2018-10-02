import { Router } from 'director/build/director'
import { reaction } from 'mobx'
import queryString from 'query-string'

export default class SkyTCAdminRouter {
	appStore
	router

	constructor(appStore) {
		this.appStore = appStore
	}

	init() {
		this.router = new Router({
			"/files": this.appStore.viewStore.openFilesPage,
			"/filedetail/:fileId": (fileId) => this.appStore.viewStore.openFileDetailPageById(fileId),
			"/new-orders": this.appStore.viewStore.openNewOrdersPage,
			"/completed-orders": this.appStore.viewStore.openCompletedOrdersPage,
			"/customers": this.appStore.viewStore.openCustomersPage,
			"/coordinators": this.appStore.viewStore.openCoordinatorsPage,
			"/callback": () => {
				let parsedQueryString = queryString.parse(window.location.hash.split('?')[1])
				this.appStore.viewStore.handleAuth(parsedQueryString)
			},
			"/auth": () => {
				window.location.href = "/signin"
				//	this.appStore.authStore.signIn()
			}
		})
			.configure({
				// notfound: this.appStore.viewStore.openFilesPage,
				html5history: false
			})
			.init()

		reaction(
			() => this.appStore.viewStore.currentUrl,
			(path) => {
				if (path === '/') {
					this.appStore.viewStore.openCustomersPage()
				}
			}, { fireImmediately: true }
		)
	}
}
