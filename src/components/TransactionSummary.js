import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import {ListItem} from 'material-ui/List';

import Actions from '../actions/Actions';
import TransactionAvatar from './TransactionAvatar';

const RowHalf = (props) => (
  <span className='col-xs-12 col-sm-6'><span className="row">
    {props.children}
  </span></span>
)

const Col = (props) => (
  <span className='col-xs-6'><span className={props.type}>
    {props.children}
  </span></span>
)

function TransactionSummary(props) {
  const {currency, transaction, key, selectTransaction} = props;


  return (
    <ListItem key={key} className='transaction'
      leftAvatar={<TransactionAvatar transaction={transaction}/>}
      onClick={() => { selectTransaction(transaction.id) }}>
      <span className='row'>
        <RowHalf>
          <Col type="date">{transaction.date}</Col>
          <Col type="payee">{transaction.payee}</Col>
        </RowHalf>
        <RowHalf>
          <Col type="description">{transaction.description}</Col>
          <Col type="total">
            {transaction.total} <span className='currency'>{currency}</span>
          </Col>
        </RowHalf>
      </span>
    </ListItem>
  )
}

TransactionSummary.propTypes = {
  currency: PropTypes.object.isRequired,
  transaction: PropTypes.object.isRequired,
  key: PropTypes.object.isRequired
};

export default connect(
  state => ({
    currency: state.accounts[state.views.selected.account_slug].currency,
    categories: state.categories
  }),
  Actions
)(TransactionSummary)
