import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import TransactionActions from '../../actions/TransactionActions';

import TextField from 'material-ui/TextField';

function AmountInput(props) {
  const {currency, transaction, account, label, property, dispatch} = props;

  return (
    <span className="amount-field {property} col-xs">
      <TextField hintText={label}
           floatingLabelText={label}
           style={{width: '80%'}}
           value={transaction[property]}
           onChange={e => dispatch.updateTransaction(transaction, {[property]: e.target.value})}/>
      <span className='currency'>{currency}</span>
    </span>
  )
}

AmountInput.propTypes = {
  transaction: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  property: PropTypes.string.isRequired
};

export default connect(
  state => ({
    transaction: state.transactions.selected
  }),
  dispatch => ({
    dispatch: bindActionCreators(TransactionActions, dispatch)
  })
)(AmountInput)
