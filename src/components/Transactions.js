import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';

import Actions from '../actions/Actions';
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
    const {transactions, dispatch, accounts, account} = this.props;

    return (
      <List>
        {_.map(transactions, (transaction, i) => {
          const currency = <span className='currency'>{account.currency}</span>;
          const selectTransaction = () => { dispatch.selectTransaction(transaction.id) };
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
  account: PropTypes.object.isRequired,
  accounts: PropTypes.object.isRequired,
  transactions: PropTypes.object.isRequired,
  categories: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default connect(
  state => ({
    account: state.accounts[state.views.selected.account_slug],
    accounts: state.accounts,
    transactions: state.transactions[state.views.selected.account_slug] || [],
    categories: state.categories
  }),
  dispatch => ({
    dispatch: bindActionCreators(Actions, dispatch)
  })
)(Transactions)
