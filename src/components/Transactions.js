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
    const {transactions, actions, accounts} = this.props;

    return (
      <List>
      <Subheader>Transactions</Subheader>
        {(transactions||[]).map((transaction, i) => {
          const account = this.account(transaction);
          const currency = <span className='currency'>{account.currency}</span>;
          const selectTransaction = () => { actions.selectTransaction(transaction) };

          return (<ListItem key={i} className='transaction'
            leftAvatar={<Avatar icon={this.mainCategoryIcon(transaction)} />}
            onClick={selectTransaction}>
            <span className='row'>
              <span className='six columns'>
                <span className='date'>{transaction.date}</span>
                <span className='payee'>{transaction.payee}</span>
              </span>
              <span className='six columns'>
                <span className='description'>{transaction.description}</span>
                <span className='total'>{transaction.total} {currency}</span>
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
  actions: PropTypes.object.isRequired
};

export default connect(
  state => ({
    accounts: state.accounts,
    transactions: state.transactions.collection,
    categories: state.categories
  }),
  dispatch => ({
    actions: bindActionCreators(TransactionActions, dispatch)
  })
)(Transactions)
