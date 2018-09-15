import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Dropdown } from 'react-bootstrap-dropdown';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import {
  Button, Glyphicon, DropdownButton, MenuItem, Modal, FormGroup,
  OverlayTrigger, Tooltip,
} from 'react-bootstrap';
import AddCustomerModal from './../shared/add-customer-modal';
import form from "./../shared/add-customer-component"
import AddOrderModal from './../shared/add-order-modal';

@inject('appStore') @observer
export default class CustomersView extends Component {
  constructor(props) {
    super(props)
    this.form = form
  }
customerName=null
  onRowSelect(row, isSelected) {
    var rowStr = "";
    for (var prop in row) {
      rowStr += prop + ": '" + row[prop] + "' ";
    }

  };
  formatSelectedCustomer(row) {

  }
  addButtons(cell, row) {
    return <div> <Button bsStyle="primary"
      onClick={() => {
        this.props.appStore.viewStore.showNewOrderDialog(),
        this.customerName=`${row.firstName} ${row.lastName}`,
        appStore.viewStore.selectedCustomerId = cell
      }}>
      <Glyphicon glyph="plus small" />
    </Button>
      <span> </span>
      <Button bsStyle="primary"
        onClick={() => {
          this.props.appStore.viewStore.showAddCustomerDialog(),
            appStore.viewStore.selectedCustomerId = row
        }}>
        <Glyphicon glyph="edit small" />
      </Button>
    </div>
  }


  render() {

    const selectRow = {
      mode: "checkbox",
      clickToSelect: true,
      bgColor: '#fefefe',
      onSelect: this.onRowSelect

    };
    return (

      <div className="tab-pane active customer-view">

        <div className="col-sm-2">
          <Button bsStyle="primary" className="btn-block"
            onClick={() => {
              this.props.appStore.viewStore.showAddCustomerDialog()
            }}>
            <Glyphicon glyph="plus" /> New Customer</Button>
        </div>
        <div>
          <AddCustomerModal show={appStore.viewStore.addCustomerModalOpen}
            onHide={appStore.viewStore.hideAddCustomerDialog} />

          <AddOrderModal show={appStore.viewStore.addNewOrderDialogOpen}
            onHide={appStore.viewStore.hideNewOrderDialog}
            customerName={this.customerName}
            customerId={appStore.viewStore.selectedCustomerId}
             />
          <BootstrapTable
            data={appStore.customersStore.allCustomersData}
            search={true}
            searchPlaceholder="type to search for new orders">
            <TableHeaderColumn dataField="id" expandable={false} hidden={true} isKey >Id</TableHeaderColumn>
            <TableHeaderColumn dataField="firstName" headerAlign="center" dataAlign="left" dataSort>First Name</TableHeaderColumn>
            <TableHeaderColumn dataField="lastName" headerAlign="center" dataAlign="left" dataSort>Last Name</TableHeaderColumn>
            <TableHeaderColumn dataField="phoneNumber" headerAlign="center" searchable={true} dataAlign="left">Phone Number</TableHeaderColumn>
            <TableHeaderColumn dataField="numberOfOrders" searchable={false} dataSort>Total Orders</TableHeaderColumn>
            <TableHeaderColumn dataField="id" dataFormat={this.addButtons.bind(this)}> </TableHeaderColumn>
          </BootstrapTable>
        </div>
      </div>
    )
  }


}
