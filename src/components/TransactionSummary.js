import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import {ListItem} from 'material-ui/List';

import Actions from '../actions/Actions';
import TransactionAvatar from './TransactionAvatar';

const Group = (props) => (
  <span className='col-xs-12 col-sm-6'><span className="row">
    {props.children}
  </span></span>
)

const Cell = (props) => (
  <span className='col-xs'><span className={props.type}>
    {props.children}
  </span></span>
)

function TransactionSummary(props) {
  const {currency, transaction, selectTransaction} = props;


  return (
    <ListItem key={transaction.id} className='transaction'
      leftAvatar={<TransactionAvatar transaction={transaction}/>}
      onClick={() => { selectTransaction(transaction.id) }}>
      <span className='row'>
        <Group>
          <Cell type="date">{transaction.date}</Cell>
          <Cell type="payee">{transaction.payee}</Cell>
        </Group>
        <Group>
          <Cell type="description">{transaction.description}</Cell>
          <Cell type="total">
            {transaction.total} <span className='currency'>{currency}</span>
          </Cell>
        </Group>
      </span>
    </ListItem>
  )
}

TransactionSummary.propTypes = {
  currency: PropTypes.string.isRequired,
  transaction: PropTypes.object.isRequired,
};

export default connect(
  state => ({
    currency: state.accounts[state.views.selected.account_slug].currency,
    categories: state.categories
  }),
  Actions
)(TransactionSummary)
