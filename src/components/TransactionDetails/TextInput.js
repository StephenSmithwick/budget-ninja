import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Actions from '../../actions/Actions';

import TextField from 'material-ui/TextField';

function TextInput(props) {
  const {account_slug, transaction, label, property, dispatch, className} = props

  return (
    <span className={`text-field ${property} ${className}`}>
      <TextField hintText={label}
             floatingLabelText={label}
             style={{width: '100%'}}
             value={transaction[property]}
             onChange={e => dispatch.updateTransaction(account_slug, transaction.id, {[property]: e.target.value})}/>
    </span>
  )
}

TextInput.propTypes = {
  transaction: PropTypes.object.isRequired,
  account_slug: PropTypes.string.isRequired,
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
)(TextInput)
