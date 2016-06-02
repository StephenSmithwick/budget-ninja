import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';

import TransactionActions from '../actions/TransactionActions';
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

  account(transaction) {
    const {accounts} = this.props;
    return accounts.find((a) => a.id == transaction.account_id)
  }

  render() {
    const {transactions, dispatch, accounts} = this.props;

    return (
      <List>
      <Subheader>Transactions</Subheader>
        {(transactions||[]).map((transaction, i) => {
          const account = this.account(transaction);
          const currency = <span className='currency'>{account.currency}</span>;
          const selectTransaction = () => { dispatch.selectTransaction(transaction) };
          const avatar = <Avatar icon={this.mainCategoryIcon(transaction)}
            style={{top: '50%', transform: 'translateY(-50%)'}} />

          return (<ListItem key={i} className='transaction'
            leftAvatar={avatar}
            onClick={selectTransaction}>
            <span className='row'>
              <span className='col-xs-12 col-sm-6'>
                <span className="row">
                  <span className='col-xs-6'>
                    <span className="date">{transaction.date}</span>
                  </span>
                  <span className='col-xs-6'>
                    <span className="payee">{transaction.payee}</span>
                  </span>
                </span>
              </span>
              <span className='col-xs-12 col-sm-6'>
                <span className="row">
                  <span className='col-xs-6'>
                    <span className="description">{transaction.description}</span>
                  </span>
                  <span className='col-xs-6'>
                    <span className="total">{transaction.total} {currency}</span>
                  </span>
                </span>
              </span>
            </span>
          </ListItem>)
        })}
      </List>)
  }
}

Transactions.propTypes = {
  accounts: PropTypes.arrayOf(PropTypes.object).isRequired,
  transactions: PropTypes.arrayOf(PropTypes.object).isRequired,
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  dispatch: PropTypes.object.isRequired
};

export default connect(
  state => ({
    accounts: state.accounts,
    transactions: state.transactions.collection,
    categories: state.categories
  }),
  dispatch => ({
    dispatch: bindActionCreators(TransactionActions, dispatch)
  })
)(Transactions)
