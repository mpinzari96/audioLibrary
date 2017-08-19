import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { action, observable } from 'mobx'
import testDetailsStore from "../test-details/test-details-store"
import { Dropdown } from 'react-bootstrap-dropdown';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import {Button, DropdownButton, MenuItem, Modal,
    OverlayTrigger, Tooltip} from 'react-bootstrap';

@inject('appStore')
@observer class BootstrapTableObservable extends React.Component {

  @action checkboxchecked(row) {
    var name = window.config.displayName;
    if (typeof row == 'undefined')
    { }
    else {
      appStore.testDetailsStore.updateTestReviewedByTestId(row.id, row.reviewed, name);
    }
  };
  columnClassNameFormat(fieldValue, row, rowIdx, colIdx) {
    // fieldValue is column value
    // row is whole row object
    // rowIdx is index of row
    // colIdx is index of column
    if (fieldValue == "Failed") {
      return `<div class="label label-danger">Failed</div> `;
    }
    if (fieldValue == "Skipped") {
      return `<div class="label label-info">Skipped</div> `;
    }
    return `<div class ="label label-success">Pass</div> `;
  }
  addCheckBoxe(cell, row) {
    row.reviewed = row.reviewed || false
    return (
      <div>
        <input
        data-toggle="tooltip" 
        data-placement="top"
         title={row.userDisplayName}
          type="checkbox"
          checked={row.reviewed}
          onClick={this.checkboxchecked.bind(this, row)}
        />
      </div>);
  }
  isExpandableRow(row) {
    if (row.message != null & row.stackTrace != null) {
      return true
    }
    else {
      return false;
    }

  }
  expandComponent(row) {
    return (
      <div>
        <table className="table">
          <thead className="thead-default">
            <tr>
              <th>Message</th>
              <th>StackTrace</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ whiteSpace: 'pre-wrap' }} className="text"
              >{row.message}</td>
              <td style={{ whiteSpace: 'pre-wrap' }}>{row.stackTrace}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );

  }
  render() {
    const options = {
      sizePerPage: 25,
      expandBy: 'column',
    };
    const selectRowProp = {
      mode: 'checkbox',
      clickToSelect: true,
      hideSelectColumn: true,
      clickToExpand: true   // Trigger expand and selection together
    };
    return (
      <div>
        <BootstrapTable
          data={appStore.testDetailsStore.testResultsArray}
          options={options}
          expandableRow={this.isExpandableRow}
          expandComponent={this.expandComponent}
          selectRow={selectRowProp}
          search
          hover={true}
          pagination={true}
        >
          <TableHeaderColumn dataField="id" expandable={false} hidden={true} isKey>Id</TableHeaderColumn>
          <TableHeaderColumn width='25%' dataField="testName" headerAlign="center" dataAlign="left" expandable={false} dataSort>Test Name</TableHeaderColumn>
          <TableHeaderColumn width='8%' dataField="browserId" headerAlign="center" searchable={false} dataAlign="left">Browser </TableHeaderColumn>
          <TableHeaderColumn width='8%' dataField="date" searchable={false} dataSort>Date</TableHeaderColumn>
          <TableHeaderColumn width='10%' dataField="startTime" searchable={false} dataSort>Start Time</TableHeaderColumn>
          <TableHeaderColumn width='10%' dataField="endTime" searchable={false} dataSort>End Time</TableHeaderColumn>
          <TableHeaderColumn width='6%' dataField="result" searchable={false}
            dataSort
            dataFormat={this.columnClassNameFormat}>Results</TableHeaderColumn>
          <TableHeaderColumn width='8%' dataField="duration" searchable={false} headerAlign="center" dataAlign="left" dataSort>Duration </TableHeaderColumn>
          <TableHeaderColumn dataField="message" headerAlign="center" dataAlign="left" dataSort>Message </TableHeaderColumn>
          <TableHeaderColumn width='4%' dataField="reviewed"
            expandable={false}
            className="checkbox-cell"
            dataFormat={this.addCheckBoxe.bind(this)}
            headerAlign="center"
            dataSort></TableHeaderColumn>
        </BootstrapTable>
      </div>
    )
  }
}
@inject('appStore')
@observer export default class TestDetailsView extends React.Component {
  constructor(props) {
    super(props)

  }
  render() {
    return (
      <div>
    <div className="row">
        <div className="form-group col-lg-2">
          <label>FirstDropDown</label>
          <select className="form-control" onChange={this.doSometing} maxLength="20px">
            <option value="-1">Select a Test Run</option>
                <option key="1"
                  value="2">"testing"
                </option>
          </select>
        </div>
        <div className="form-group col-lg-2">
          <label>SecondDropDow</label>
          <select className="form-control" onChange={this.doSometing} maxLength="20px">
            <option value={null}>All</option>
                <option key="1"
                  value="testing">"tester"
                </option>
          </select>
        </div>
        <div>
        </div>
        < BootstrapTableObservable
        />
      </div>
    </div>
    )
  }
}