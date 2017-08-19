import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Dropdown } from 'react-bootstrap-dropdown';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import {
	Button, DropdownButton, MenuItem, Modal, FormGroup,
	OverlayTrigger, Tooltip,
} from 'react-bootstrap';


@inject('appStore') @observer
export default class CustomersView extends Component{

	constructor(props) {
		super(props)

	}

render(){

  return(
	<div className="tab-pane active customer-view">
                        <div className="col-sm-2">
                        <Button bsStyle="primary" className="btn-block"
                                onClick={() => {
                                    this.props.appStore.viewStore.showAddCustomerDialog()
                                }}>New Order
                        </Button>
                    </div>
				<div>
					<BootstrapTable
						data={appStore.customersStore.allCustomersData}
						search={true}
						searchPlaceholder="type to search for new orders">
						<TableHeaderColumn dataField="id" expandable={false} hidden={true} isKey >Id</TableHeaderColumn>
						<TableHeaderColumn dataField="firstName" headerAlign="center" dataAlign="left" dataSort>First Name</TableHeaderColumn>
            <TableHeaderColumn dataField="lastName" headerAlign="center" dataAlign="left" dataSort>Last Name</TableHeaderColumn>
						<TableHeaderColumn dataField="phoneNumber" headerAlign="center" searchable={false} dataAlign="left">Phone Number</TableHeaderColumn>
						<TableHeaderColumn dataField="numberOfOrders" searchable={false} dataSort>Total Orders</TableHeaderColumn>
					</BootstrapTable>
				</div>
			</div>
  )
}


}
