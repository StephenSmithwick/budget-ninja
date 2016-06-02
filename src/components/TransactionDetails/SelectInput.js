import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import TransactionActions from '../../actions/TransactionActions';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

function SelectInput(props) {
  const {transaction, label, property, options, dispatch} = props

  return (
    <span className="select-field {property} six columns">
      <SelectField hintText={label}
                   floatingLabelText={label}
                   style={{width: '100%'}}
                   value={transaction.account_id}
                   onChange={(e, i, value) => dispatch.updateTransaction(transaction, {[property]: value})}>
        {options.map(options =>
          <MenuItem key={options.id} value={options.id} primaryText={options.name}/>
        )}
      </SelectField>
    </span>
  )
}

SelectInput.propTypes = {
  transaction: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  property: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default connect(
  state => ({
    transaction: state.transactions.selected
  }),
  dispatch => ({
    dispatch: bindActionCreators(TransactionActions, dispatch)
  })
)(SelectInput)
