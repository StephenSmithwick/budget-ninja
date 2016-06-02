import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import TransactionActions from '../../actions/TransactionActions';

import TextField from 'material-ui/TextField';

function TextInput(props) {
  const {transaction, label, property, dispatch} = props

  return (
    <span className="text-field {property} col-xs">
      <TextField hintText={label}
             floatingLabelText={label}
             style={{width: '100%'}}
             value={transaction[property]}
             onChange={e => dispatch.updateTransaction(transaction, {[property]: e.target.value})}/>
    </span>
  )
}

TextInput.propTypes = {
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
)(TextInput)
