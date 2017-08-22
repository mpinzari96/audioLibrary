import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Dropdown } from 'react-bootstrap-dropdown';
import { BootstrapTable, TableHeaderColumn, InsertButton } from 'react-bootstrap-table';
import {
  Button, Glyphicon, DropdownButton, MenuItem, Modal, FormGroup,
  OverlayTrigger, Tooltip, FormControl, ControlLabel
} from 'react-bootstrap';
var DatePicker = require("react-bootstrap-date-picker");

// var Modal = require('react-bootstrap-modal')

@inject('appStore') @observer
export default class NewOrdersView extends Component {

  constructor(props) {
    super(props)

  }
  OpenCustomerDialog() {
    appStore.viewStore.hideNewOrderDialog()
    appStore.viewStore.showAddCustomerDialog()
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
        <Modal
          show={appStore.viewStore.addNewOrderDialogOpen}
          onHide={appStore.viewStore.hideNewOrderDialog}>
          {/*//   onEntered={ this.onModalEntered.bind(this) }>*/}
          <Modal.Header closeButton >
            <Modal.Title id="contained-modal-title-lg">Create New Order</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <FormGroup >
                <ControlLabel>Customer Name</ControlLabel>
                <FormControl
                  type="text" placeholder="Customer Name" />
                <Button className='btn btn-primary' onClick={this.OpenCustomerDialog}>
                  <Glyphicon glyph="plus" /> New Customer</Button>
              </FormGroup>
              <FormGroup>
                <ControlLabel>Ordered Date</ControlLabel>
                <DatePicker id="ordered-datepicker" />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Expected Date</ControlLabel>
                <DatePicker id="completed-datepicker" />
              </FormGroup>
              <ControlLabel>Order Summary</ControlLabel>
              <FormGroup
                bsSize="large">
                <FormControl type="text" placeholder="Order Summary" />
              </FormGroup>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <button className='btn btn-default' onClick={appStore.viewStore.hideNewOrderDialog}>Cancel</button>
            <button className='btn btn-primary'> Save </button>
          </Modal.Footer>
        </Modal>
        <Modal
          show={appStore.viewStore.addCustomerDialogOpen}
          onHide={appStore.viewStore.hideAddCustomerDialog}>
          {/*//   onEntered={ this.onModalEntered.bind(this) }>*/}
          <Modal.Header closeButton >
            <Modal.Title id="contained-modal-title-lg">Add New Customer</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <FormGroup >
                <ControlLabel>First Name</ControlLabel>
                <FormControl
                  type="text" placeholder="first Name" />
              </FormGroup>
              <FormGroup >
                <ControlLabel>Last Name</ControlLabel>
                <FormControl
                  type="text" placeholder="last Name" />
              </FormGroup>
              <FormGroup >
                <ControlLabel>Email</ControlLabel>
                <FormControl
                  type="email" placeholder="email" />
              </FormGroup>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <button className='btn btn-default' onClick={appStore.viewStore.hideAddCustomerDialog}>Cancel</button>
            <button className='btn btn-primary'> Save </button>
          </Modal.Footer>
        </Modal>
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
