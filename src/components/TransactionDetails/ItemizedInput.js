import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Actions from '../../actions/Actions';

import TextField from 'material-ui/TextField';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

import CategoryRowColumn from './CategoryRowColumn';
import * as Icons from '../Icons';

class ItemizedInput extends Component {
  static propTypes = {
    transaction: PropTypes.object.isRequired,
    label: PropTypes.string.isRequired,
    property: PropTypes.string.isRequired,
    categories: PropTypes.arrayOf(PropTypes.object).isRequired
  }

  render() {
    const {transaction, categories, label, property, className, dispatch} = this.props;
    const items = transaction[property];

    return (
      <span className={`itemized-field ${property} ${className}`}>
        <h3>{label}</h3>
        <Table selectable={false} >
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn>Category</TableHeaderColumn>
              <TableHeaderColumn>Amount</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>{_.map(items, (item) => (
            <TableRow key={item.category_slug}>
              <CategoryRowColumn slug={item.category_slug}/>
              <TableRowColumn>{item.amount}</TableRowColumn>
            </TableRow>
          ))}</TableBody>
        </Table>
      </span>
    )
  }
}

export default connect(
  state => ({
    transaction: state.transactions[state.views.selected.account_slug][state.views.selected.transaction_id],
    categories: state.categories
  }),
  dispatch => ({
    dispatch: bindActionCreators(Actions, dispatch)
  })
)(ItemizedInput)
