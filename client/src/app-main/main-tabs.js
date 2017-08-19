import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import Cons from "./../cons.js"

@inject( 'appStore' ) @observer
export default class MainTabs extends Component {

	constructor( props ) {
		super( props )

	}

	render() {
		return (
			<ul className="nav nav-tabs bundle-tab nav-tabs-fillup" role="tablist"
			    data-init-reponsive-tabs="collapse">
			<li className={appStore.viewStore.selectedTab === Cons.pages.reports ? "active" : ""}>
					<a href="/Reports" onClick={( e ) => {
						e.preventDefault()
						appStore.viewStore.selectReportsTab()
						return false
					}}>Reports</a>
				</li>
				<li className={ appStore.viewStore.selectedTab === Cons.pages.testDetails ? "active" : ""}>
					<a href="/test-details" onClick={( e ) => {
						e.preventDefault()
						appStore.viewStore.selectTestDetailsTab()
						return false
					}}>TestDetails</a>
				</li>
				<li className={ appStore.viewStore.selectedTab === Cons.pages.newOrders ? "active" : ""}>
					<a href="/new-orders" onClick={( e ) => {
						e.preventDefault()
						appStore.viewStore.selectNewOrdersTab()
						return false
					}}>New Orders</a>
				</li>
		</ul>

		)
	}
}