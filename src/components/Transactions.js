import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';

import Actions from '../actions/Actions';
import TransactionSummary from './TransactionSummary';
import * as Icons from './Icons';

class Transactions extends Component {
  constructor(props, context) {
    super(props, context);
  }

  mainCategory(transaction) {
    const max = transaction.itemized.reduce(
      (x,y) => x.amount > y.amount ? x : y,
      {amount: 0}
    )
    return this.lookupCategory(max);
  }

  mainCategoryIcon(transaction) {
    const category = this.mainCategory(transaction)
    const Icon = Icons[category.icon]
    return <Icon />
  }

  lookupCategory(item) {
    const {categories} = this.props;
    return categories.find(c => c.id === item.category_id) || {icon: 'Problem'};
  }

  render() {
    const {transactions, selectTransaction} = this.props;

    return (
      <List>{_.map( transactions,
        (transaction, i) => <TransactionSummary transaction={transaction} key={i}/>
      )}</List>
    )
  }
}

Transactions.propTypes = {
  transactions: PropTypes.object.isRequired
};

export default connect(
  state => ({
    transactions: state.transactions[state.views.selected.account_slug] || [],
  }),
  Actions
)(Transactions)
