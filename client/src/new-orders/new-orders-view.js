import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Dropdown } from 'react-bootstrap-dropdown';
import { BootstrapTable, TableHeaderColumn, InsertButton } from 'react-bootstrap-table';
import {
  Button, DropdownButton, MenuItem, Modal, FormGroup,
  OverlayTrigger, Tooltip, FormControl, ControlLabel
} from 'react-bootstrap';
var DatePicker = require("react-bootstrap-date-picker");

// var Modal = require('react-bootstrap-modal')

@inject('appStore') @observer
export default class NewOrdersView extends Component {

  constructor(props) {
    super(props)

  }
  handleInsertButtonClick = (onClick) => {
    // Custom your onClick event here,
    // it's not necessary to implement this function if you have no any process before onClick
    console.log('This is my custom function for InserButton click event');
    onClick();
  }
  createCustomInsertButton = (onClick) => {
    return (
      <InsertButton
        btnText='New Order'
        btnContextual='btn-primary'
        className='my-custom-class'
        btnGlyphicon='glyphicon-edit'
        onClick={() => this.handleInsertButtonClick(onClick)} />
    );
  }
  render() {

    return (
      <div className="tab-pane active customer-view">
        <div className="col-sm-2">
          <Button bsStyle="primary" className="btn-block"
            onClick={() => {
              this.props.appStore.viewStore.showAddCustomerDialog()
            }}>New Order
                        </Button>
        </div>
        <Modal
          show={appStore.viewStore.addCustomerDialogOpen}
          onHide={appStore.viewStore.hideAddCustomerDialog}>
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
                <Button className='btn btn-primary'>Add New Customer</Button>
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
