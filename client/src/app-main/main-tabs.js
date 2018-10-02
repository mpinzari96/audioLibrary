import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import Cons from "./../cons.js"

@inject('appStore') @observer
export default class MainTabs extends Component {

	constructor(props) {
		super(props)

	}

	render() {
		return (
			<ul className="nav nav-tabs bundle-tab nav-tabs-fillup" role="tablist"
				data-init-reponsive-tabs="collapse">
				<li className={appStore.viewStore.selectedTab === Cons.pages.customers ? "active" : ""}>
					<a href="/customers" onClick={(e) => {
						e.preventDefault()
						appStore.viewStore.selectCustomersTab()
						return false
					}}>Customers</a>
				</li>
				<li className={appStore.viewStore.selectedTab === Cons.pages.newOrders ? "active" : ""}>
					<a href="/new-orders" onClick={(e) => {
						e.preventDefault()
						appStore.viewStore.selectNewOrdersTab()
						return false
					}}>Recieved</a>
				</li>
				<li className={appStore.viewStore.selectedTab === Cons.pages.completedOrders ? "active" : ""}>
					<a href="/completed-orders" onClick={(e) => {
						e.preventDefault()
						appStore.viewStore.selectCompletedOrdersTab()
						return false
					}}>Completed</a>
				</li>

			</ul>

		)
	}
}
