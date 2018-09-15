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
import { date } from '../../node_modules/serializr';
import { debug } from 'util';


@inject('appStore') @observer
export default class NewOrdersView extends Component {

  constructor(props) {
    super(props)

  }
  dateFormat(cell) {
    
    var dat = new Date(cell);
    return dat.toLocaleDateString()
  }

  columnClassNameFormat(fieldValue, row, rowIdx, colIdx) {
    debugger
    // fieldValue is column value
    // row is whole row object
    // rowIdx is index of row
    // colIdx is index of column
    //return fieldValue=="Recieved"? <div class="label label-warning">{fieldValue}</div> : <div class="label label-success">{fieldValue}</div>
    return <span>
      <select onChange={() => this.selectNewStatus}>
        <option>{fieldValue}</option>
        <option>Completed</option>

      </select>
    </span>
  }
  valueFormatter(cell, row) {
    return (
      <ValueFormatter data={row} />
    );
  }
  rowFormater(row, rowIdx) {
    // row is whole row object
    // rowIdx is index of row

    var color='blue'
    if(row.orderStatus==='Recieved'){
      color="white"
    }
    if(row.orderStatus==='Completed'){
      color="green"
    }
    if(row.orderStatus==='InProgress'){
      color="yellow"
    }
    return { backgroundColor: color };
  }
  render() {

    return (
     //  <div className="tab-pane active customer-view">
      //   <div className="col-sm-2">
      //     <Button bsStyle="primary" className="btn-block"
      //       onClick={() => {
      //         this.props.appStore.viewStore.showNewOrderDialog()
      //       }}>
      //       <Glyphicon glyph="plus" /> New Order
      //  </Button>
      //   </div>
       // <AddOrderModal
        //   show={appStore.viewStore.addNewOrderDialogOpen}
        //   onHide={appStore.viewStore.hideNewOrderDialog} />
        // <AddCustomerModal show={appStore.viewStore.addCustomerModalOpen}
        //   onHide={appStore.viewStore.hideAddCustomerDialog} />
        <div>
          <BootstrapTable
            data={appStore.newOrdersStore.newOrders}
            search={true}
            searchPlaceholder="type to search for new orders"
            
            trStyle={this.rowFormater}>
            <TableHeaderColumn dataField="id" expandable={false} hidden={true} isKey >Id</TableHeaderColumn>
            <TableHeaderColumn dataField="customerName" headerAlign="center" dataAlign="left" dataSort>Costumer Name</TableHeaderColumn>
            <TableHeaderColumn dataField="orderSummary" headerAlign="center" searchable={false} dataAlign="left">Order Name </TableHeaderColumn>
            <TableHeaderColumn dataField="orderDate" searchable={false} dataFormat={this.dateFormat.bind(this)} dataSort>Order Date</TableHeaderColumn>
            <TableHeaderColumn dataField="orderStatus" editable={{ type: 'select' }} dataFormat={this.valueFormatter.bind(this)} searchable={false} dataSort>Status</TableHeaderColumn>
          </BootstrapTable>
        </div>
      //</div>
    )
  }
}
class ValueFormatter extends React.Component {

  updateStatus(cell,data) {
    appStore.newOrdersStore.updateStatus(cell,data.target.value)
        console.log('updated order status');
  }

  render() {
    let opt = [{
        name:"Completed",
        id:'1'
    },
    {
      name:"Recieved",
      id:'2'
  },
  {
    name:"InProgress",
    id:'3'
} ]
opt = opt.filter((e)=>{return e.name!=this.props.data.orderStatus;})
    return (
      <span>
        <select onChange={this.updateStatus.bind(this,this.props.data)}>
          <option>{this.props.data.orderStatus}</option>
          {            
            opt.map(function (status) {
              return <option key={status.id}
                value={status.name}>{status.name}</option>;
            })
          }
        </select>
      </span>
    );
  }
};


