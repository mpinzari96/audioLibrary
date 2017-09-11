import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Dropdown } from 'react-bootstrap-dropdown';
import { BootstrapTable, TableHeaderColumn, InsertButton } from 'react-bootstrap-table';
import {
  Button, Glyphicon, DropdownButton, MenuItem, Modal, FormGroup,
  OverlayTrigger, Tooltip, FormControl, ControlLabel
} from 'react-bootstrap';
var DatePicker = require("react-bootstrap-date-picker");
import AddOrderModal from './../shared/add-order-modal'
import AddCustomerModal from './../shared/add-customer-modal';


@inject('appStore') @observer
export default class NewOrdersView extends Component {

  constructor(props) {
    super(props)

  }
  render() {
    return (
      <div className="tab-pane active customer-view">
        <div className="col-sm-2">
          <Button bsStyle="primary" className="btn-block"
            onClick={() => {
              this.props.appStore.viewStore.showNewOrderDialog()
            }}>
            <Glyphicon glyph="plus" /> New Order
       </Button>
        </div>
        <AddOrderModal
          show={appStore.viewStore.addNewOrderDialogOpen}
          onHide={appStore.viewStore.hideNewOrderDialog} />
        <AddCustomerModal show={appStore.viewStore.addCustomerModalOpen}
          onHide={appStore.viewStore.hideAddCustomerDialog} />
        <div>
          <BootstrapTable
            data={appStore.newOrdersStore.newOrders}
            search={true}
            searchPlaceholder="type to search for new orders">
            <TableHeaderColumn dataField="id" expandable={false} hidden={true} isKey >Id</TableHeaderColumn>
            <TableHeaderColumn dataField="customerName" headerAlign="center" dataAlign="left" dataSort>Costumer Name</TableHeaderColumn>
            <TableHeaderColumn dataField="orderSummary" headerAlign="center" searchable={false} dataAlign="left">Order Name </TableHeaderColumn>
            <TableHeaderColumn dataField="orderDate" searchable={false} dataSort>Order Date</TableHeaderColumn>
            <TableHeaderColumn dataField="orderStatus" searchable={false} dataSort>Status</TableHeaderColumn>
          </BootstrapTable>
        </div>
      </div>
    )
  }
}
