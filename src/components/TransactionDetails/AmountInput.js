import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Actions from '../../actions/Actions';

import TextField from 'material-ui/TextField';

function AmountInput(props) {
  const {currency, account_slug, transaction, account, label, property, dispatch} = props;

  return (
    <span className="amount-field {property} col-xs">
      <TextField hintText={label}
           floatingLabelText={label}
           style={{width: '80%'}}
           value={transaction[property]}
           onChange={e => dispatch.updateTransaction(account_slug, transaction.id, {[property]: e.target.value})}/>
      <span className='currency'>{currency}</span>
    </span>
  )
}

AmountInput.propTypes = {
  account_slug: PropTypes.string.isRequired,
  transaction: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  property: PropTypes.string.isRequired
};

export default connect(
  state => ({
    account_slug: state.views.selected.account_slug,
    transaction: state.transactions[state.views.selected.account_slug][state.views.selected.transaction_id]
  }),
  dispatch => ({
    dispatch: bindActionCreators(Actions, dispatch)
  })
)(AmountInput)
